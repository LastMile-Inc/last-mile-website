import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { coolingReference, operatingScenarioList, operatingScenarios } from "../src/app/pages/platformReferenceData.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

test("municipal wastewater current-rate estimate is 06:40 and is labeled as arithmetic", () => {
  const level = operatingScenarios.wastewater.incident.find((item) => item.id === "ww_level").numericValue;
  const rate = operatingScenarios.wastewater.incident.find((item) => item.id === "ww_rate").numericValue;
  assert.equal(Math.round(((9 - level) / rate) * 60), 400);
  assert.match(operatingScenarios.wastewater.proofPosture.join(" "), /current-rate linear estimate, not a predictive model/i);
});

test("compressed-air calculations and disclosed deltas remain exact", () => {
  assert.equal(Math.round((355 / 1860) * 1000) / 10, 19.1);
  assert.equal(Math.round((241 / 1260) * 1000) / 10, 19.1);
  assert.equal(Math.round((104 - 88.6) * 10) / 10, 15.4);
  assert.equal(Math.round(((15.4 / 104) * 100) * 10) / 10, 14.8);
  assert.equal(Math.round((103 - 97.1) * 10) / 10, 5.9);
  assert.equal(Math.round(((5.9 / 103) * 100) * 10) / 10, 5.7);
  assert.match(operatingScenarios.air.recovery.join(" "), /−600 SCFM · −114 kW/);
  assert.match(operatingScenarios.air.proofPosture.join(" "), /not savings/i);
});

test("cold-storage superheat differences preserve Fahrenheit and kelvin representations", () => {
  assert.equal(Math.round((29.5 * 5 / 9) * 10) / 10, 16.4);
  assert.equal(Math.round((13 * 5 / 9) * 10) / 10, 7.2);
  assert.ok(operatingScenarios.refrigeration.incident.some((item) => item.value === "29.5°F / 16.4 K"));
  assert.ok(operatingScenarios.refrigeration.recovery.includes("Superheat · 13.0°F / 7.2 K"));
});

test("cooling work closure, stability completion, and recovery timestamps stay separate", () => {
  assert.deepEqual(coolingReference.timeline.slice(6, 9), [
    ["15:02:41", "Field work marked complete in SAP"],
    ["15:17:41", "Fifteen-minute measurement window completes"],
    ["15:17:42", "Recovery established when recovery criteria are met"],
  ]);
  assert.equal(coolingReference.identity.requiredStability, "15:00");
  assert.equal(coolingReference.identity.recurrenceWindow, "24 hours");
});

test("use-case routes are canonical, legacy aliases redirect permanently, and sitemap excludes aliases", () => {
  const routes = read("src/app/routes.ts");
  const sitemap = read("public/sitemap.xml");
  assert.match(routes, /path: "use-cases\/:useCaseSlug"/);
  for (const scenario of operatingScenarioList) {
    assert.match(sitemap, new RegExp(`<loc>https://lastmileinc\\.ai${scenario.route}</loc>`));
    for (const legacyRoute of scenario.legacyRoutes) {
      assert.ok(routes.includes(`path: "${legacyRoute.slice(1)}"`));
      assert.ok(routes.includes(`redirectTo("${scenario.route}", 301)`));
      assert.ok(!sitemap.includes(`<loc>https://lastmileinc.ai${legacyRoute}</loc>`));
    }
  }
});

test("every use case uses the code-native governed process map and required disclosure", () => {
  const components = read("src/app/components/OperatingScenarioComponents.tsx");
  for (const stage of ["Evidence", "Qualify", "Coordinate", "Work", "Verify"]) assert.match(components, new RegExp(`name: "${stage}"`));
  assert.doesNotMatch(components, /<img|processMap\.src|condition-to-outcome\.png/i);
  for (const scenario of operatingScenarioList) {
    assert.match(scenario.disclosure, /controlled Last Mile demonstration/i);
  }
});

test("homepage proof is code-native and public concepts hide governance enums", () => {
  const home = read("src/app/pages/HomePage.tsx");
  const article = read("src/app/pages/IndustrialConceptArticlePage.tsx");
  assert.match(home, /PrecisionLoopGraphic/);
  assert.match(home, /Accountable Operations Loop/);
  assert.equal((home.match(/<EditorialSection/g) ?? []).length + (home.match(/<HomepageHero/g) ?? []).length + (home.match(/<AccountableOperationsLoop/g) ?? []).length + (home.match(/<NextStep/g) ?? []).length, 7);
  assert.doesNotMatch(home, /platform-core-blueprint|generic.*network.*hero/i);
  assert.doesNotMatch(article, /claimMaturity|reference_architecture|perspective\s*\//i);
});

test("primary navigation includes keyboard, outside-click, escape, and mobile disclosure behavior", () => {
  const navigation = read("src/app/components/Navbar.tsx");
  assert.match(navigation, /aria-haspopup="menu"/);
  assert.match(navigation, /ArrowDown/);
  assert.match(navigation, /ArrowUp/);
  assert.match(navigation, /event\.key === "Escape"/);
  assert.match(navigation, /pointerdown/);
  assert.match(navigation, /MobileGroup/);
  for (const scenario of operatingScenarioList) assert.ok(navigation.includes(scenario.route));
});
