import fs from "node:fs";
import path from "node:path";

const routeConsumers = new Map([
  ["/", "src/app/pages/HomePage.tsx"],
  ["/platform", "src/app/pages/PlatformOverviewPage.tsx"],
  ["/ecosystem", "src/app/pages/EcosystemPage.tsx"],
  ["/infinit-signal", "src/app/pages/InfinitSignalPage.tsx"],
  ["/singularity", "src/app/pages/SSOMPage.tsx"],
  ["/infinit-flow", "src/app/pages/InfinitFlowPage.tsx"],
  ["/infinit-control", "src/app/pages/InfinitControlPage.tsx"],
  ["/resources/pmo-implementation-hub", "src/app/pages/PmoImplementationHubPage.tsx"],
]);

function expectedConsumer(route) {
  if (route.startsWith("/use-cases/")) return "src/app/pages/platformReferenceData.ts";
  if (route.startsWith("/resources/industrial-concepts/")) return "src/app/content/industrialConcepts.generated.ts";
  return routeConsumers.get(route);
}

function normalizedRenderedText(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&apos;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function validateClaimUseTraceability({ root, claimId, use }) {
  const errors = [];
  const label = `${claimId} on ${use.route}`;
  const sourceFile = use.sourceFile?.trim();
  const wording = use.wording?.trim();
  const expected = expectedConsumer(use.route);

  if (!sourceFile) return [`${label} does not identify a rendered source consumer`];
  if (!expected) errors.push(`${label} has no registered rendered source consumer`);
  else if (sourceFile !== expected) errors.push(`${label} must use rendered source consumer ${expected}, not ${sourceFile}`);

  const appRoot = path.resolve(root, "src", "app");
  const sourcePath = path.resolve(root, sourceFile);
  if (sourcePath !== appRoot && !sourcePath.startsWith(`${appRoot}${path.sep}`)) {
    errors.push(`${label} source consumer must remain inside src/app`);
    return errors;
  }
  if (!fs.existsSync(sourcePath)) {
    errors.push(`${label} source consumer is missing: ${sourceFile}`);
    return errors;
  }
  if (!wording) return [...errors, `${label} has empty rendered wording`];

  const source = fs.readFileSync(sourcePath, "utf8");
  const exactMatch = source.includes(wording);
  const jsxTextMatch = normalizedRenderedText(source).includes(normalizedRenderedText(wording));
  if (!exactMatch && !jsxTextMatch) errors.push(`${label} wording does not exactly match its rendered source consumer ${sourceFile}`);
  return errors;
}
