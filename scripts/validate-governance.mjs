import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const requiredFiles = [
  "AGENTS.md",
  ".github/pull_request_template.md",
  "content-source/control.json",
  "content-source/public-claims.json",
  "content-source/claims/claims-registry.md",
  "content-source/repository-governance.json",
  "data/content-control/route-claims.json",
  "docs/founder-os/CURRENT_STATE.md",
  "docs/founder-os/IP_REGISTER.md",
  "docs/founder-os/DECISION_LOG.md",
  "docs/founder-os/LATEST_HANDOFF.md",
];
const errors = [];
const contents = new Map();

for (const file of requiredFiles) {
  try {
    contents.set(file, await readFile(path.join(root, file), "utf8"));
  } catch {
    errors.push(`${file}: required governance file is missing`);
  }
}

const governanceText = contents.get("content-source/repository-governance.json");
if (governanceText) {
  try {
    const governance = JSON.parse(governanceText);
    if (governance.repository?.stableId !== 1147329489) errors.push("repository-governance.json: unexpected stable repository ID");
    if (governance.repository?.fullName !== "LastMile-Inc/last-mile-website") errors.push("repository-governance.json: repository identity must match stable ID 1147329489");
    if (governance.repository?.defaultBranch !== "main") errors.push("repository-governance.json: expected protected default branch main");
    for (const [gate, state] of Object.entries(governance.approvalGates ?? {})) {
      if (state !== "FOUNDER_APPROVAL_REQUIRED") errors.push(`repository-governance.json: ${gate} must require founder approval`);
    }
    if (Object.keys(governance.approvalGates ?? {}).length !== 6) errors.push("repository-governance.json: expected six approval gates");
    for (const file of requiredFiles.filter((file) => file.includes("content-source/") || file.includes("data/content-control/") || file.includes("docs/founder-os/"))) {
      if (!governance.canonicalSources?.includes(file)) errors.push(`repository-governance.json: missing canonical source ${file}`);
    }
  } catch (error) {
    errors.push(`repository-governance.json: invalid JSON (${error.message})`);
  }
}

const agents = contents.get("AGENTS.md") ?? "";
for (const phrase of ["CURRENT_STATE.md", "IP_REGISTER.md", "DECISION_LOG.md", "LATEST_HANDOFF.md", "Founder approval is required"]) {
  if (!agents.includes(phrase)) errors.push(`AGENTS.md: missing Founder OS rule ${phrase}`);
}

const template = contents.get(".github/pull_request_template.md") ?? "";
for (const phrase of ["canonical source", "npm run validate", "No production deployment", "No GCP", "UNDER_REVIEW"]) {
  if (!template.includes(phrase)) errors.push(`pull request template: missing control ${phrase}`);
}

if (errors.length) {
  console.error(`Governance validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Governance validation passed: ${requiredFiles.length} required files, six founder approval gates.`);
