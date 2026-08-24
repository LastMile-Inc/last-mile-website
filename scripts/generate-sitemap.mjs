import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lastModified = new Date().toISOString().slice(0, 10);
const routes = [
  ["/", "weekly", "1.0"], ["/platform", "weekly", "0.9"], ["/use-cases", "weekly", "0.9"],
  ["/use-cases/data-center-cooling", "weekly", "0.9"], ["/use-cases/municipal-wastewater", "weekly", "0.9"],
  ["/use-cases/manufacturing-compressed-air", "weekly", "0.9"], ["/use-cases/cold-storage-refrigeration", "weekly", "0.9"],
  ["/infinit-signal", "weekly", "0.8"], ["/singularity", "weekly", "0.8"], ["/infinit-flow", "weekly", "0.8"], ["/infinit-control", "weekly", "0.8"],
  ["/ecosystem", "monthly", "0.7"], ["/resources", "monthly", "0.7"], ["/resources/pmo-implementation-hub", "monthly", "0.7"], ["/resources/architect-reference-center", "monthly", "0.7"], ["/about", "monthly", "0.7"], ["/contact", "monthly", "0.8"], ["/signal-to-action", "monthly", "0.7"], ["/company/newsroom", "monthly", "0.6"], ["/privacy", "yearly", "0.2"], ["/terms", "yearly", "0.2"],
];
routes.push(["/resources/industrial-concepts", "monthly", "0.8"]);
const conceptDirectory = path.join(root, "content-source", "concepts");
for (const fileName of (await readdir(conceptDirectory)).sort()) {
  const markdown = await readFile(path.join(conceptDirectory, fileName), "utf8");
  const route = markdown.match(/\/resources\/industrial-concepts\/[a-z0-9-]+/)?.[0];
  if (route) routes.push([route, "yearly", "0.6"]);
}
const urls = routes.map(([route, frequency, priority]) => `  <url>\n    <loc>https://lastmileinc.ai${route}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>${frequency}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join("\n");
await writeFile(path.join(root, "public", "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, "utf8");
console.log(`Generated sitemap.xml with ${routes.length} routes.`);
