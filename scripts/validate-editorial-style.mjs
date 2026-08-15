import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const roots = [
  "AGENTS.md",
  "docs/design",
  "content-source/pages",
  "content-source/products",
  "content-source/use-cases",
  "content-source/concepts",
  "content-source/governance",
  "src/app",
];

const ignored = new Set([
  path.normalize("src/app/content/newsroom.generated.ts"),
]);

const extensions = new Set([".md", ".ts", ".tsx"]);
const failures = [];
const prohibitedMarketingCallouts = ["lm-v2-caveat", "lm-reference-disclosure", "lm-platform-qualification", "lm-validation-label", "lm-catalog-disclosure", "lm-scenario-proof"];

async function collect(target) {
  const stat = await import("node:fs/promises").then(({ stat }) => stat(target));
  if (stat.isFile()) return [target];
  const entries = await readdir(target, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => collect(path.join(target, entry.name))));
  return nested.flat();
}

for (const root of roots) {
  for (const file of await collect(root)) {
    if (!extensions.has(path.extname(file)) || ignored.has(path.normalize(file))) continue;
    const lines = (await readFile(file, "utf8")).split(/\r?\n/);
    lines.forEach((line, index) => {
      if (line.includes("\u2014")) failures.push(`${file}:${index + 1}: em dash`);
      if (file.startsWith(path.normalize("src/app"))) {
        prohibitedMarketingCallouts.forEach((marker) => {
          if (line.includes(marker)) failures.push(`${file}:${index + 1}: prohibited marketing disclaimer callout ${marker}`);
        });
      }
    });
  }
}

if (failures.length) {
  console.error("Editorial style violations found:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Editorial style validation passed: no em dashes or standalone marketing disclaimer callouts in active public copy.");
