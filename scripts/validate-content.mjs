import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const control = JSON.parse(await readFile(path.join(root, "content-source", "control.json"), "utf8"));
const claims = JSON.parse(await readFile(path.join(root, "content-source", "public-claims.json"), "utf8"));
const errors = [];

const isAllowed = (file, entries) => entries.some((entry) => entry.endsWith("/") ? file.startsWith(entry) : file === entry);
const textExtensions = new Set([".css", ".html", ".js", ".json", ".md", ".mjs", ".ts", ".tsx", ".txt", ".xml"]);
const scanRoots = ["src", "public", "data", "scripts", "content-source"];

async function collect(relative) {
  const absolute = path.join(root, relative);
  const entries = await readdir(absolute, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const next = path.posix.join(relative.replaceAll(path.sep, "/"), entry.name);
    if (entry.isDirectory()) files.push(...await collect(next));
    else if (textExtensions.has(path.extname(entry.name).toLowerCase())) files.push(next);
  }
  return files;
}

const files = (await Promise.all(scanRoots.map(collect))).flat().concat(["README.md", "index.html"]);
for (const file of files) {
  const text = await readFile(path.join(root, file), "utf8");
  if (!["content-source/control.json", "scripts/validate-content.mjs"].includes(file)) {
    for (const term of control.retiredTerms) {
      if (text.toLowerCase().includes(term.toLowerCase())) errors.push(`${file}: retired term \"${term}\"`);
    }
  }
  if (/service\s*now/i.test(text) && !isAllowed(file, control.serviceNowArchiveAllowlist)) {
    errors.push(`${file}: ServiceNow-era content is not classified as historical/archive material`);
  }
}

for (const required of ["Infinit-Signal", "Singularity", "Infinit-Flow", "Infinit-Control"]) {
  if (!control.canonicalProducts.includes(required)) errors.push(`control.json: missing canonical product ${required}`);
}
if (control.canonicalProducts.length !== 4) errors.push("control.json: expected exactly four canonical products");

const ids = new Set();
for (const claim of claims.claims ?? []) {
  if (!claim.contentId || !claim.claim || !claim.status) errors.push("public-claims.json: every claim needs contentId, status, and claim");
  if (ids.has(claim.contentId)) errors.push(`public-claims.json: duplicate contentId ${claim.contentId}`);
  ids.add(claim.contentId);
}
if (claims.releaseStatus !== "UNDER_REVIEW") errors.push("public-claims.json: r1.3 must remain UNDER_REVIEW until founder approval");

async function exists(relative) {
  try { await readFile(path.join(root, relative)); return true; } catch { return false; }
}
if (await exists(".github/workflows/daily-integrations-sync.yml")) errors.push("legacy daily integration workflow still exists");

const retiredCatalogPaths = [
  "data/integration-details",
  "data/integrations.csv",
  "data/integrations-source.json",
  "public/integration-details",
  "public/manufactured-openapi",
  "public/integrations.json",
  "public/integrations.md",
  "src/app/pages/IntegrationDetailPage.tsx",
  "src/app/pages/OurIntegrationsPage.tsx",
  "scripts/generate-integrations-json.mjs",
  "scripts/vendor_portal_scraper.py",
];
for (const retiredPath of retiredCatalogPaths) {
  try {
    await readdir(path.join(root, retiredPath));
    errors.push(`${retiredPath}: retired integration catalog path still exists`);
  } catch {
    if (await exists(retiredPath)) errors.push(`${retiredPath}: retired integration catalog path still exists`);
  }
}

const workflows = await readdir(path.join(root, ".github", "workflows"), { withFileTypes: true }).catch(() => []);
for (const workflow of workflows.filter((entry) => entry.isFile())) {
  const text = await readFile(path.join(root, ".github", "workflows", workflow.name), "utf8");
  if (/lftp|ftp:|mirror\s+--reverse|deploy built site|workflow_dispatch/i.test(text)) errors.push(`${workflow.name}: deployment or manual-dispatch behavior is prohibited during reconciliation`);
}

const rootEntries = await readdir(root, { withFileTypes: true });
if (rootEntries.some((entry) => entry.name === "tmp")) errors.push("tmp/: committed QA artifacts must not remain in the active tree");
const zipFiles = [];
async function collectZips(relative = "") {
  for (const entry of await readdir(path.join(root, relative), { withFileTypes: true })) {
    if ([".git", "node_modules", "dist"].includes(entry.name)) continue;
    const next = path.join(relative, entry.name);
    if (entry.isDirectory()) await collectZips(next);
    else if (entry.name.toLowerCase().endsWith(".zip")) zipFiles.push(next);
  }
}
await collectZips();
if (zipFiles.length) errors.push(`committed ZIP artifacts are prohibited: ${zipFiles.join(", ")}`);

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed: ${files.length} text files, ${ids.size} registered public claims, four canonical products.`);
