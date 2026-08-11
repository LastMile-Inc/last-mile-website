import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const allowedMaturities = new Set(["implemented", "demonstrated", "designed", "reference_architecture", "customer_specific", "perspective", "do_not_publish"]);
const allowedStatuses = new Set(["draft", "in_review", "approved", "retired", "archived"]);
const allowedUsedByTokens = new Set(["all", "concepts", "use-cases", "resources", "demos"]);

function fail(message) { failures.push(message); }
function relative(filePath) { return path.relative(root, filePath).replaceAll("\\", "/"); }
function walk(directory, predicate = () => true) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath, predicate));
    else if (predicate(fullPath)) files.push(fullPath);
  }
  return files;
}
function parseArray(value) {
  const trimmed = value.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return null;
  const body = trimmed.slice(1, -1).trim();
  return body ? body.split(",").map((item) => item.trim().replace(/^['"]|['"]$/g, "")) : [];
}
function parseFrontMatter(markdown, filePath) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) { fail(`${relative(filePath)} is missing front matter`); return null; }
  const values = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon <= 0) { fail(`${relative(filePath)} has unreadable front matter: ${line}`); continue; }
    values[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return values;
}

const contentRoot = path.join(root, "content-source");
const markdownFiles = walk(contentRoot, (filePath) => filePath.endsWith(".md"));
if (!markdownFiles.length) fail("content-source is missing or empty");
const objects = [];
for (const filePath of markdownFiles) {
  const markdown = fs.readFileSync(filePath, "utf8");
  if (!markdown.endsWith("\n")) fail(`${relative(filePath)} is missing a final newline`);
  if (markdown.includes("\0") || !/^#\s+/m.test(markdown)) fail(`${relative(filePath)} is not readable Markdown`);
  const rel = relative(filePath);
  if (rel.endsWith("/README.md") || rel === "content-source/README.md" || rel.endsWith("governance/content-object-template.md")) continue;
  const meta = parseFrontMatter(markdown, filePath);
  if (!meta) continue;
  const maturity = parseArray(meta.claim_maturity ?? "");
  const dependsOn = parseArray(meta.depends_on ?? "");
  const usedBy = parseArray(meta.used_by ?? "");
  if (!meta.content_id) fail(`${rel} has no content_id`);
  if (!allowedStatuses.has(meta.status)) fail(`${rel} has invalid status ${meta.status ?? "(missing)"}`);
  if (!meta.owner?.trim()) fail(`${rel} has no owner`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.last_reviewed ?? "") || Number.isNaN(Date.parse(`${meta.last_reviewed}T00:00:00Z`))) fail(`${rel} has invalid last_reviewed ${meta.last_reviewed ?? "(missing)"}`);
  if (!maturity?.length || maturity.some((value) => !allowedMaturities.has(value))) fail(`${rel} has invalid claim_maturity`);
  if (!dependsOn) fail(`${rel} has invalid depends_on`);
  if (!usedBy?.length || usedBy.some((value) => !allowedUsedByTokens.has(value) && value !== "/" && !/^\/[a-z0-9][a-z0-9/-]*$/.test(value))) fail(`${rel} has invalid used_by`);
  objects.push({ filePath, rel, meta, maturity: maturity ?? [], dependsOn: dependsOn ?? [], usedBy: usedBy ?? [], markdown });
}

const byId = new Map();
for (const object of objects) {
  if (byId.has(object.meta.content_id)) fail(`Duplicate content_id ${object.meta.content_id} in ${byId.get(object.meta.content_id).rel} and ${object.rel}`);
  byId.set(object.meta.content_id, object);
}
for (const object of objects) {
  for (const dependency of object.dependsOn) if (!byId.has(dependency)) fail(`${object.rel} depends on missing content_id ${dependency}`);
}
const visiting = new Set();
const visited = new Set();
function visit(contentId, chain = []) {
  if (visiting.has(contentId)) { fail(`Circular governing dependency: ${[...chain, contentId].join(" -> ")}`); return; }
  if (visited.has(contentId)) return;
  visiting.add(contentId);
  for (const dependency of byId.get(contentId)?.dependsOn ?? []) visit(dependency, [...chain, contentId]);
  visiting.delete(contentId);
  visited.add(contentId);
}
for (const contentId of byId.keys()) visit(contentId);

const enforcementExceptions = new Set([
  "content-source/control.json",
  "content-source/governance/canonical-vocabulary.md",
  "content-source/claims/claims-registry.md",
  "content-source/products/infinit-signal.md",
  "scripts/validate-content-control.mjs",
]);
const historicalPrefixes = [
  "archive/",
  "src/app/content/newsroom.generated.ts",
  "public/press-releases/",
  "public/podcast-feed.xml",
  "public/integrations.md",
  "public/integration-details/",
  "public/manufactured-openapi/",
  "src/app/pages/OurIntegrationsPage.tsx",
];
const scanExtensions = new Set([".css", ".html", ".js", ".json", ".jsx", ".md", ".mjs", ".ts", ".tsx", ".txt", ".xml"]);
const scanRoots = ["src", "public", "scripts", "content-source", "data/content-control"].flatMap((directory) => walk(path.join(root, directory), (filePath) => scanExtensions.has(path.extname(filePath).toLowerCase())));
const retiredTerms = ["Infinit", "Code"].join("-");
const legacyWorkPlatformPattern = ["service", "now"].join("\\s*");
const retiredUnsPhrase = ["approved", "UNS", "topics"].join(" ");
const doNotPublishPhrases = ["global leader in operational intelligence", "autonomously operates customer plants", "reference bands are universal industrial standards"];
for (const filePath of scanRoots) {
  const rel = relative(filePath);
  if (historicalPrefixes.some((prefix) => rel.startsWith(prefix))) continue;
  const text = fs.readFileSync(filePath, "utf8");
  if (!enforcementExceptions.has(rel)) {
    if (text.toLowerCase().includes(retiredTerms.toLowerCase())) fail(`${rel} contains retired terminology ${retiredTerms}`);
    if (text.toLowerCase().includes(retiredUnsPhrase.toLowerCase())) fail(`${rel} contains prohibited terminology ${retiredUnsPhrase}`);
    const lower = text.toLowerCase();
    for (const phrase of doNotPublishPhrases) if (lower.includes(phrase)) fail(`${rel} contains a do-not-publish claim: ${phrase}`);
  }
  if (enforcementExceptions.has(rel)) continue;
  const dependencyPattern = new RegExp(`(?:${legacyWorkPlatformPattern}.{0,80}(?:required|requirement|foundation|prerequisite|dependency|privileged)|(?:requires?|depends? on|foundation|prerequisite|built on|must use).{0,80}${legacyWorkPlatformPattern})`, "gi");
  for (const match of text.matchAll(dependencyPattern)) {
    const context = text.slice(Math.max(0, match.index - 60), Math.min(text.length, match.index + match[0].length + 60));
    if (!/(?:not required|does not depend|without depending|no privileged|none is|not a prerequisite|not dependent|not the foundation|no architectural dependency)/i.test(context)) fail(`${rel} describes a legacy work platform as required or privileged: ${match[0]}`);
  }
}

const claimsRegistry = fs.readFileSync(path.join(contentRoot, "claims", "claims-registry.md"), "utf8");
const registryClaims = new Map();
for (const line of claimsRegistry.split(/\r?\n/)) {
  const cells = line.split("|").map((cell) => cell.trim());
  if (/^CLM-[A-Z0-9-]+$/.test(cells[1] ?? "")) registryClaims.set(cells[1], { wording: cells[2], maturity: cells[3].toLowerCase().replaceAll(" ", "_") });
}
const routeClaims = JSON.parse(fs.readFileSync(path.join(root, "data", "content-control", "route-claims.json"), "utf8"));
const claimIds = new Set();
const staticRoutes = new Set(["/", "/platform", "/use-cases", "/use-cases/data-center-cooling", "/use-cases/municipal-wastewater", "/use-cases/manufacturing-compressed-air", "/use-cases/cold-storage-refrigeration", "/infinit-signal", "/singularity", "/infinit-flow", "/infinit-control", "/ecosystem", "/about", "/resources", "/resources/industrial-concepts", "/contact", "/signal-to-action", "/company/newsroom"]);
for (const object of objects.filter((item) => item.rel.startsWith("content-source/concepts/"))) {
  const articleRoute = object.usedBy.find((value) => value.startsWith("/resources/industrial-concepts/"));
  if (articleRoute) staticRoutes.add(articleRoute);
}
for (const claim of routeClaims.claims ?? []) {
  if (claimIds.has(claim.claimId)) fail(`Duplicate route claim entry ${claim.claimId}`);
  claimIds.add(claim.claimId);
  const registry = registryClaims.get(claim.claimId);
  if (!registry) { fail(`Route claim ${claim.claimId} is missing from the canonical claims registry`); continue; }
  if (!allowedMaturities.has(claim.approvedMaturity) || claim.approvedMaturity === "do_not_publish") fail(`${claim.claimId} has invalid public maturity ${claim.approvedMaturity}`);
  if (!registry.maturity.includes(claim.approvedMaturity)) fail(`${claim.claimId} elevates maturity above registry value ${registry.maturity}`);
  const allowedRoutes = new Set(claim.allowedRoutes ?? []);
  for (const use of claim.uses ?? []) {
    if (!allowedRoutes.has(use.route)) fail(`${claim.claimId} is used on disallowed route ${use.route}`);
    if (!staticRoutes.has(use.route)) fail(`${claim.claimId} refers to unresolved route ${use.route}`);
    if (!use.wording?.trim()) fail(`${claim.claimId} has empty rendered wording on ${use.route}`);
    if (["designed", "reference_architecture", "perspective"].includes(claim.approvedMaturity) && /\b(?:implemented|certified|production[- ]proven|validated connector|currently operates)\b/i.test(use.wording)) fail(`${claim.claimId} wording elevates ${claim.approvedMaturity} maturity on ${use.route}`);
  }
}

const conceptMap = JSON.parse(fs.readFileSync(path.join(root, "data", "content-control", "route-concepts.json"), "utf8"));
const canonicalConcepts = objects.filter((item) => item.rel.startsWith("content-source/concepts/"));
const mappedConceptIds = new Set();
const articleRoutes = new Set();
const collectionIndexes = new Set();
for (const concept of conceptMap.concepts ?? []) {
  const canonical = byId.get(concept.contentId);
  if (!canonical || !canonical.rel.startsWith("content-source/concepts/")) { fail(`Concept map references missing concept ${concept.contentId}`); continue; }
  if (mappedConceptIds.has(concept.contentId)) fail(`Concept ${concept.contentId} is mapped more than once`);
  mappedConceptIds.add(concept.contentId);
  const declaredArticle = canonical.usedBy.find((value) => value.startsWith("/resources/industrial-concepts/"));
  if (declaredArticle !== concept.articleRoute) fail(`${concept.contentId} article route does not match used_by metadata`);
  if (articleRoutes.has(concept.articleRoute)) fail(`Multiple concepts use full article route ${concept.articleRoute}`);
  articleRoutes.add(concept.articleRoute);
  if (collectionIndexes.has(concept.collectionIndex) || !Number.isInteger(concept.collectionIndex)) fail(`${concept.contentId} has invalid or duplicate collection index`);
  collectionIndexes.add(concept.collectionIndex);
  for (const usage of concept.usages ?? []) {
    if (!["compact_summary", "link_only"].includes(usage.mode)) fail(`${concept.contentId} has invalid usage mode ${usage.mode}`);
    const sourcePath = path.join(root, usage.sourceFile);
    if (!fs.existsSync(sourcePath)) { fail(`${concept.contentId} usage source is missing: ${usage.sourceFile}`); continue; }
    const source = fs.readFileSync(sourcePath, "utf8");
    if (!source.includes(concept.articleRoute)) fail(`${usage.route} does not link to ${concept.articleRoute}`);
    if (usage.mode === "link_only") {
      const longParagraphs = canonical.markdown.split(/\r?\n\r?\n/).map((value) => value.replace(/\s+/g, " ").trim()).filter((value) => value.length > 180 && !value.startsWith("---"));
      if (longParagraphs.some((paragraph) => source.includes(paragraph))) fail(`${usage.route} republishes a full ${concept.contentId} explanation despite link_only mode`);
    }
  }
}
if (mappedConceptIds.size !== canonicalConcepts.length) fail(`Concept map covers ${mappedConceptIds.size} of ${canonicalConcepts.length} canonical concepts`);
if ([...collectionIndexes].sort((a, b) => a - b).join(",") !== "1,2,3,4,5,6,7,8,9,10,11") fail("Industrial Concepts collection order is incomplete");
const generatorCheck = spawnSync(process.execPath, [path.join(root, "scripts", "generate-industrial-concepts.mjs"), "--check"], { cwd: root, encoding: "utf8" });
if (generatorCheck.status !== 0) fail(generatorCheck.stderr.trim() || generatorCheck.stdout.trim() || "Industrial Concepts generated data check failed");

const platformData = await import(`${pathToFileURL(path.join(root, "src", "app", "pages", "platformReferenceData.ts")).href}?validation=${Date.now()}`);
try { platformData.runPlatformReferenceAssertions(); } catch (error) { fail(`Platform measurement assertion failed: ${error.message}`); }
const scenarioRoutes = new Set();
const routeSource = fs.readFileSync(path.join(root, "src", "app", "routes.ts"), "utf8");
const sitemapSource = fs.readFileSync(path.join(root, "public", "sitemap.xml"), "utf8");
const scenarioComponentSource = fs.readFileSync(path.join(root, "src", "app", "components", "OperatingScenarioComponents.tsx"), "utf8");
for (const stage of ["Evidence", "Qualify", "Coordinate", "Work", "Verify"]) if (!scenarioComponentSource.includes(`name: "${stage}"`)) fail(`Code-native process map is missing ${stage}`);
if (/<img|processMap\.src|condition-to-outcome\.png/i.test(scenarioComponentSource)) fail("Code-native process map must not depend on superseded public imagery");
const useCaseContracts = new Map(objects.filter((item) => item.rel.startsWith("content-source/use-cases/")).map((item) => [item.meta.content_id, item]));
const scenarioContractIds = { cooling: "USECASE-DC-COOLING-001", wastewater: "USECASE-WW-001", air: "USECASE-AIR-001", refrigeration: "USECASE-COLD-001" };
for (const scenario of platformData.operatingScenarioList) {
  if (scenarioRoutes.has(scenario.route)) fail(`Duplicate canonical scenario route ${scenario.route}`);
  scenarioRoutes.add(scenario.route);
  if (!scenario.route.startsWith("/use-cases/") || scenario.route === "/use-cases") fail(`${scenario.key} has invalid canonical use-case route ${scenario.route}`);
  if (!sitemapSource.includes(`<loc>https://lastmileinc.ai${scenario.route}</loc>`)) fail(`${scenario.route} is missing from sitemap.xml`);
  if (!scenario.disclosure?.includes("controlled Last Mile demonstration")) fail(`${scenario.route} is missing the required reference-scenario disclosure`);
  if (scenario.claimMaturity !== "demonstrated") fail(`${scenario.route} elevates or changes canonical scenario maturity`);
  if (!scenario.incident?.length || !scenario.recovery?.length || !scenario.recoveryCriteria?.length) fail(`${scenario.route} is missing incident or recovery data`);
  const contract = useCaseContracts.get(scenarioContractIds[scenario.key]);
  if (!contract?.usedBy.includes(scenario.route)) fail(`${scenario.route} is not declared by its canonical use-case contract`);
  for (const legacyRoute of scenario.legacyRoutes) {
    if (sitemapSource.includes(`<loc>https://lastmileinc.ai${legacyRoute}</loc>`)) fail(`Legacy use-case route ${legacyRoute} appears as a canonical sitemap destination`);
    const routeToken = legacyRoute.replace(/^\//, "");
    if (!routeSource.includes(`path: "${routeToken}"`) || !routeSource.includes(`redirectTo("${scenario.route}", 301)`)) fail(`Legacy route ${legacyRoute} is missing its permanent redirect to ${scenario.route}`);
  }
}
if (scenarioRoutes.size !== 4) fail(`Expected four canonical operating scenarios, found ${scenarioRoutes.size}`);

const numericDriftSentinels = ["0.6 A", "4.2 psid", "7.8 ft", "+0.18 ft/min", "1,860 SCFM", "355 kW", "29.5°F / 16.4 K", "15:02:41", "15:17:42"];
for (const filePath of walk(path.join(root, "src", "app"), (candidate) => [".ts", ".tsx"].includes(path.extname(candidate)))) {
  const rel = relative(filePath);
  if (rel === "src/app/pages/platformReferenceData.ts" || rel === "src/app/content/industrialConcepts.generated.ts") continue;
  const source = fs.readFileSync(filePath, "utf8");
  for (const sentinel of numericDriftSentinels) if (source.includes(sentinel)) fail(`${rel} duplicates governed scenario value ${sentinel}; consume the scenario registry instead`);
  if (/\b(?:perspective|designed|reference_architecture)\s*\/\s*(?:perspective|designed|reference_architecture)\b/i.test(source)) fail(`${rel} exposes a raw governance maturity enum`);
  if (/platform-core-blueprint\.png|generic.*(?:network|AI).*hero/i.test(source)) fail(`${rel} retains a generic or obsolete primary hero asset`);
}
const measurements = [
  ...platformData.coolingReference.incident,
  ...platformData.coolingReference.qualification,
  ...Object.values(platformData.outcomes).flatMap((outcome) => outcome.measurements),
  ...Object.values(platformData.industrySnapshots).flatMap((snapshot) => snapshot.incident),
];
for (const measurement of measurements) {
  if (!measurement.value?.trim()) fail(`Measurement ${measurement.id} has no displayed value`);
  if (measurement.analog && !measurement.unit?.trim()) fail(`Analog measurement ${measurement.id} has no unit`);
  if (!measurement.reference?.trim()) fail(`Measurement ${measurement.id} has no reference basis`);
  if (!platformData.ragLabel(measurement)?.trim()) fail(`Measurement ${measurement.id} has no text status`);
  if (measurement.valid === false && platformData.deriveRag(measurement) !== "unknown") fail(`Invalid measurement ${measurement.id} appears healthy`);
}

const clientFiles = walk(path.join(root, "src"), (filePath) => [".ts", ".tsx", ".css"].includes(path.extname(filePath)));
for (const filePath of clientFiles) {
  const text = fs.readFileSync(filePath, "utf8");
  if (/content-source|(?:^|["'/(])archive(?:["'/)]|$)|\.pptx|OneDrive|Content Control/i.test(text)) fail(`${relative(filePath)} could expose excluded source, archive, presentation, or local-path material in the client bundle`);
}
if (fs.existsSync(path.join(root, "public", "archive")) || fs.existsSync(path.join(root, "public", "content-source"))) fail("Archive or raw content-source is inside public");
const publicFiles = walk(path.join(root, "public"));
for (const filePath of publicFiles) {
  const rel = relative(filePath);
  if (/\.(?:pptx?|docx?)$/i.test(rel) && !rel.startsWith("public/press-releases/")) fail(`${rel} is an excluded project document in public output`);
}

if (failures.length) {
  console.error(`Canonical content validation failed with ${failures.length} issue(s):`);
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}
console.log(`Canonical content validation passed: ${objects.length} objects, ${registryClaims.size} claims, ${canonicalConcepts.length} concepts, ${platformData.operatingScenarioList.length} scenarios, and ${measurements.length} rendered measurements checked.`);
