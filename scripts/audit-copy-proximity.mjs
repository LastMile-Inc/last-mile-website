import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const roots = ["src/app/pages", "src/app/components", "content-source/pages"];
const ignored = new Set([
  path.normalize("src/app/pages/platformReferenceData.ts"),
]);
const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "because", "by", "can", "each", "for", "from", "has", "have", "in", "into", "is", "it", "its", "last", "mile", "not", "of", "on", "one", "or", "our", "that", "the", "their", "them", "these", "they", "this", "through", "to", "until", "use", "we", "what", "when", "where", "which", "while", "who", "with", "your",
]);
const rootAliases = new Map([
  ["proof", "prove"], ["proved", "prove"], ["proven", "prove"], ["proves", "prove"], ["proving", "prove"],
  ["verified", "verify"], ["verifies", "verify"], ["verification", "verify"],
  ["recovered", "recover"], ["recovery", "recover"], ["recovers", "recover"],
  ["fixed", "fix"], ["fixes", "fix"],
  ["connected", "connect"], ["connects", "connect"], ["connecting", "connect"],
  ["coordinated", "coordinate"], ["coordinates", "coordinate"], ["coordinating", "coordinate"],
  ["operating", "operation"], ["operational", "operation"], ["operations", "operation"],
  ["readings", "reading"], ["measurements", "measurement"], ["systems", "system"],
  ["responses", "response"], ["results", "result"], ["problems", "problem"],
]);

async function collect(target) {
  const entries = await readdir(target, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const child = path.join(target, entry.name);
    if (entry.isDirectory()) files.push(...await collect(child));
    else if (/\.(md|tsx)$/.test(entry.name) && !ignored.has(path.normalize(child))) files.push(child);
  }
  return files;
}

function normalizeWord(word) {
  const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
  return rootAliases.get(clean) ?? clean;
}

function terms(text) {
  return [...new Set(text.split(/\s+/).map(normalizeWord).filter((word) => word.length > 2 && !stopWords.has(word)))];
}

function extract(file, source) {
  const blocks = [];
  const lines = source.split(/\r?\n/);
  const add = (line, text) => {
    const clean = text.replace(/&apos;/g, "'").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (clean.length >= 28 && /[a-z]{3}/i.test(clean)) blocks.push({ line, text: clean, terms: terms(clean) });
  };

  lines.forEach((line, index) => {
    if (file.endsWith(".md")) {
      if (/^(---|content_|status:|owner:|last_reviewed:|claim_maturity:|depends_on:|used_by:|\|)/.test(line.trim())) return;
      add(index + 1, line.replace(/^#{1,6}\s+/, "").replace(/^\*\*[^*]+:\*\*\s*/, ""));
      return;
    }

    for (const match of line.matchAll(/(?:title|intro|copy|support|description|label|eyebrow)=\{?`?"([^"\n]{28,})"/g)) add(index + 1, match[1]);
    for (const match of line.matchAll(/>([^<>{}\n]{28,})</g)) add(index + 1, match[1]);
    for (const match of line.matchAll(/"([^"\n]{42,}[.!?])"/g)) add(index + 1, match[1]);
  });
  return blocks.filter((block, index) => !blocks.slice(0, index).some((prior) => prior.line === block.line && prior.text === block.text));
}

const findings = [];
for (const root of roots) {
  for (const file of await collect(root)) {
    const blocks = extract(file, await readFile(file, "utf8"));
    for (let index = 0; index < blocks.length; index += 1) {
      for (let next = index + 1; next <= Math.min(index + 3, blocks.length - 1); next += 1) {
        const left = blocks[index];
        const right = blocks[next];
        if (right.line - left.line > 35) continue;
        const shared = left.terms.filter((term) => right.terms.includes(term));
        const smaller = Math.max(1, Math.min(left.terms.length, right.terms.length));
        const overlap = shared.length / smaller;
        const repeatedOutcome = shared.some((term) => ["prove", "verify", "recover", "fix"].includes(term));
        if ((shared.length >= 3 && overlap >= 0.34) || (repeatedOutcome && shared.length >= 2)) {
          findings.push({ file, left, right, shared, overlap });
        }
      }
    }
  }
}

if (!findings.length) {
  console.log("Copy proximity audit found no likely neighboring-copy collisions.");
  process.exit(0);
}

console.log(`Copy proximity audit found ${findings.length} review candidate(s):`);
for (const finding of findings) {
  console.log(`\n${finding.file}:${finding.left.line} and :${finding.right.line}`);
  console.log(`Shared ideas: ${finding.shared.join(", ")} (${Math.round(finding.overlap * 100)}% overlap)`);
  console.log(`1. ${finding.left.text}`);
  console.log(`2. ${finding.right.text}`);
}
console.log("\nThis is a review report. It does not fail validation because intentional technical repetition can be valid.");
