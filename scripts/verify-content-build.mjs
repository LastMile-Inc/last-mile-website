import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const failures = [];
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name));
}
if (!fs.existsSync(dist)) failures.push("dist does not exist");
else {
  for (const filePath of walk(dist)) {
    const rel = path.relative(dist, filePath).replaceAll("\\", "/");
    if (rel.startsWith("archive/") || rel.startsWith("content-source/") || /\.(?:pptx?|docx?)$/i.test(rel)) failures.push(`${rel} must not be published`);
    if ([".html", ".js", ".css", ".json", ".md", ".xml", ".txt"].includes(path.extname(filePath).toLowerCase())) {
      const text = fs.readFileSync(filePath, "utf8");
      if (/C:\\Users\\|OneDrive|Content Control\\site-repo|\/mnt\/c\/Users\//i.test(text)) failures.push(`${rel} exposes a local machine path`);
      if (/content-source\/(?:governance|claims|products|pages|concepts|use-cases)/i.test(text)) failures.push(`${rel} exposes raw canonical Markdown paths`);
    }
  }
}
if (failures.length) {
  console.error("Published-output verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Published-output verification passed: no archive, raw canonical Markdown, project documents, or local paths were emitted.");
