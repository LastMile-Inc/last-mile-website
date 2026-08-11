import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const conceptsDirectory = path.join(root, "content-source", "concepts");
const outputPath = path.join(root, "src", "app", "content", "industrialConcepts.generated.ts");

const collectionFiles = [
  "unified-namespace.md",
  "semantic-interoperability.md",
  "opc-ua-and-companion-specifications.md",
  "digital-twins-and-aas.md",
  "digital-thread-and-operational-outcome-thread.md",
  "industrial-ai-and-semi-autonomous-operations.md",
  "industry-5-0-and-human-authority.md",
  "ot-cybersecurity-and-zero-trust.md",
  "industrial-data-spaces-and-sovereignty.md",
  "plug-and-produce-and-composable-manufacturing.md",
  "lights-out-and-autonomous-operations.md",
];
const collectionContract = fs.readFileSync(path.join(root, "content-source", "pages", "resources-industrial-concepts.md"), "utf8").replace(/\r\n/g, "\n");
const collectionCards = [...collectionContract.matchAll(/^\d+\. \*\*(.+?)\*\*\s*\n\s+(.+)$/gm)].map((match) => [match[1].trim(), match[2].trim()]);
if (collectionCards.length !== collectionFiles.length) throw new Error(`Expected ${collectionFiles.length} Industrial Concepts cards, found ${collectionCards.length}`);
const collection = collectionFiles.map((fileName, index) => [fileName, ...collectionCards[index]]);

const fallbackBoundaries = {
  "CONCEPT-THREAD-001": "Do not imply that the operational outcome thread replaces PLM, MES, QMS, CMMS, historian, digital-thread, or digital-twin systems. Work status may be linked to an Outcome but cannot define it.",
  "CONCEPT-DATASPACE-001": "Do not imply that Last Mile currently implements a data-space protocol, that technically compatible records are available for shared learning, or that SSOM conformance grants contribution consent.",
  "CONCEPT-I50-001": "Do not use Industry 5.0 as a synonym for more automation, claim compliance, or imply that customer safety and physical-work authority have transferred to Last Mile.",
  "CONCEPT-LIGHTSOUT-001": "Do not imply that Last Mile currently operates factories autonomously or that less routine human presence removes responsibility, safety authority, exception handling, or recovery requirements.",
  "CONCEPT-SEMANTIC-001": "Do not imply that connectivity alone establishes interoperability, that source semantics should be erased, or that every source can be flattened into one taxonomy without preserving evidence and uncertainty.",
  "CONCEPT-COMPOSABLE-001": "Do not imply instantaneous plug-and-produce, mechanical compatibility, automatic safety approval, generated PLC logic, eliminated commissioning, or implemented Last Mile composable-manufacturing capability.",
};

const routePattern = /\/resources\/industrial-concepts\/[a-z0-9-]+/;

function section(markdown, heading, nextHeadingLevel = "##") {
  const start = markdown.indexOf(`${heading}\n`);
  if (start < 0) return "";
  const bodyStart = start + heading.length + 1;
  const rest = markdown.slice(bodyStart);
  const next = rest.search(new RegExp(`^${nextHeadingLevel} `, "m"));
  return (next < 0 ? rest : rest.slice(0, next)).trim();
}

function frontMatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error("Missing front matter");
  const values = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon > 0) values[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return values;
}

function parseSource(line) {
  const url = line.match(/https?:\/\/\S+/)?.[0];
  if (!url) return null;
  return { label: line.slice(2, line.indexOf(url)).replace(/:\s*$/, "").trim(), url };
}

function parseConcept([fileName, cardTitle, cardCopy]) {
  const markdown = fs.readFileSync(path.join(conceptsDirectory, fileName), "utf8").replace(/\r\n/g, "\n");
  const meta = frontMatter(markdown);
  const route = meta.used_by.match(routePattern)?.[0];
  if (!route) throw new Error(`${fileName} is missing its canonical article route`);
  const publication = section(markdown, "## Publication-ready article");
  const boundaryStart = publication.indexOf("\n### Boundary summary");
  const articleBody = boundaryStart < 0 ? publication : publication.slice(0, boundaryStart);
  const boundaryBody = boundaryStart < 0 ? "" : publication.slice(boundaryStart).replace(/^\n### Boundary summary\n+/, "");
  const articleLines = articleBody.split("\n");
  const articleTitle = articleLines.shift()?.replace(/^###\s+/, "").trim();
  const paragraphs = articleLines.join("\n").split(/\n\s*\n/).map((value) => value.replace(/\n/g, " ").trim()).filter(Boolean);
  const sources = section(markdown, "## Sources").split("\n").filter((line) => line.startsWith("- ")).map(parseSource).filter(Boolean);
  const explicitBoundary = section(markdown, "## Prohibited implications").replace(/\n/g, " ").trim();
  return {
    contentId: meta.content_id,
    route,
    slug: route.split("/").at(-1),
    cardTitle,
    cardCopy,
    articleTitle,
    canonicalPosition: section(markdown, "## Canonical position").replace(/\n/g, " ").trim(),
    paragraphs,
    operatingResponse: section(markdown, "## What this looks like in an operating response").split(/\n\s*\n/).map((value) => value.replace(/\n/g, " ").trim()).filter(Boolean),
    comparison: boundaryBody.split("\n").filter((line) => /^\|.+\|$/.test(line) && !/^\|\s*---/.test(line)).map((line) => line.slice(1, -1).split("|").map((cell) => cell.trim())),
    sources,
    boundary: explicitBoundary || fallbackBoundaries[meta.content_id],
  };
}

const concepts = collection.map(parseConcept);
for (const concept of concepts) {
  if (!concept.articleTitle || !concept.paragraphs.length || !concept.operatingResponse.length || !concept.sources.length || !concept.boundary) throw new Error(`${concept.contentId} is incomplete`);
}

const output = `// Generated from canonical Industrial Concepts objects.\n// Do not edit this file directly.\n\nexport const industrialConcepts = ${JSON.stringify(concepts, null, 2)} as const;\n`;

if (process.argv.includes("--check")) {
  const existing = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
  if (existing !== output) {
    console.error("Industrial Concepts generated data is out of date. Run npm run concepts:generate.");
    process.exit(1);
  }
  console.log(`Industrial Concepts generated data is current (${concepts.length} articles).`);
} else {
  fs.writeFileSync(outputPath, output, "utf8");
  console.log(`Generated ${path.relative(root, outputPath)} with ${concepts.length} articles.`);
}
