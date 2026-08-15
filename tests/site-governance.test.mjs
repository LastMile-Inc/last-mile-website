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

test("all use-case details share the compact story deck and scenario-specific photography", () => {
  const page = read("src/app/pages/OperatingUseCasePage.tsx");
  const visuals = read("src/app/pages/useCaseVisuals.ts");
  const styles = read("src/styles/site-v2.css");
  assert.equal([...page.matchAll(/<StoryCard/g)].length, 5);
  for (const chapter of ["operating-condition", "response-map", "work-path", "recovery-contract", "measurements"]) {
    assert.match(page, new RegExp(`id="${chapter}"`));
  }
  for (const component of ["SystemResponsibilityMap", "AccountableResponseRail", "OutcomeEvidenceMap", "StoryDetails"]) {
    assert.match(page, new RegExp(component));
  }
  assert.doesNotMatch(page, /EditorialSection/);
  assert.doesNotMatch(page, /lm-story-cue|storySteps/);
  assert.doesNotMatch(page, /NextStep|Map the .* response in your environment/);
  assert.match(page, /Keep scrolling to follow the entire resolution/);
  assert.ok(styles.includes("position: sticky;"));
  assert.ok(styles.includes("top: calc(126px + (var(--lm-card-index) * 7px));"));
  assert.ok(styles.includes("min-height: 0;"));
  assert.ok(styles.includes(".lm-scenario-measurements.is-compact { grid-template-columns: repeat(5"));
  assert.ok(styles.includes(".lm-use-case-story-card { position: relative; top: auto; }"));
  for (const asset of ["data-center-cooling-v2.webp", "municipal-wastewater-v2.webp", "manufacturing-compressed-air-v2.webp", "cold-storage-refrigeration-v2.webp"]) {
    assert.match(visuals, new RegExp(asset.replace(".", "\\.")));
  }
  assert.deepEqual(operatingScenarioList.map((scenario) => scenario.thesis), [
    "The Thermal Threat",
    "Stop the Overflow Before It Starts",
    "Find the Air Loss Before Production Does",
    "Protect the Product Before Temperatures Rise",
  ]);
});

test("Home owns the company story, Platform owns architecture, and public concepts hide governance enums", () => {
  const home = read("src/app/pages/HomePage.tsx");
  const platform = read("src/app/pages/PlatformOverviewPage.tsx");
  const architecture = read("src/app/components/PlatformArchitectureGraphic.tsx");
  const accountableLoop = read("src/app/components/AccountableOperationsLoop.tsx");
  const article = read("src/app/pages/IndustrialConceptArticlePage.tsx");

  assert.match(home, /AccountableOperationsLoop/);
  const homepageSections = ["HomepageHero", "IndustryProblem", "MissingLastMile", "AccountableOperationsLoop", "IndustryValue"];
  for (const section of homepageSections) assert.match(home, new RegExp("<" + section));
  assert.equal(homepageSections.length, 5);
  assert.doesNotMatch(home, /PlatformLoopMapping|IndustryUseCases|operatingScenarioList|CompanyClose|<NextStep|Brownfield by Design/);

  const platformSections = ["PlatformHero", "AccountabilityGap", "ProductSystem", "AccountableOperationsLoop"];
  for (const section of platformSections) assert.match(platform, new RegExp("<" + section));
  assert.match(platform, /PlatformArchitectureGraphic/);
  assert.match(platform, /const products/);
  assert.doesNotMatch(platform, /OperatingArchitecture|PlatformNextStep|START WITH THE GAP|platformReferenceData|operatingScenarioList|Cooling Loop|USECASE-/);
  for (const layer of ["LAST MILE PLATFORM", "EXISTING OT, DATA, WORK & SERVICE ECOSYSTEM", "PLANT \/ SITE \/ OT ENVIRONMENT"]) {
    assert.match(architecture, new RegExp(layer));
  }
  assert.doesNotMatch(architecture, /WHAT LAST MILE ADDS|MISSING CONDITION-TO-OUTCOME ACCOUNTABILITY LAYER/i);
  assert.match(accountableLoop, /PrecisionLoopGraphic/);
  assert.match(accountableLoop, /Four products\. One Accountable Operations Loop\./);

  assert.doesNotMatch(home, /platform-core-blueprint|generic.*network.*hero/i);
  assert.doesNotMatch(article, /claimMaturity|reference_architecture|perspective\s*\//i);
});
test("Singularity centers persistent learning and a governed automation continuum", () => {
  const singularity = read("src/app/pages/SSOMPage.tsx");
  const curve = read("src/app/components/SingularityLearningCurve.tsx");

  for (const section of ["EditorialHero", "SingularityLearningCurve", "PERSISTENT OPERATIONAL MEMORY", "AUTOMATION MUST EARN ITS TRUST"]) {
    assert.match(singularity, new RegExp(section));
  }
  assert.doesNotMatch(singularity, /NextStep|NEXT LOGICAL STEP|IdentityCrosswalk|lm-concept-comparison|lm-result-states/);
  for (const stage of ["Manual Reaction", "Connected Visibility", "Contextual Assistance", "Governed Prediction", "Proactive Automation", "Lights-Out Manufacturing"]) {
    assert.match(curve, new RegExp(stage));
  }
  assert.match(curve, /VALUE CAPTURE/);
  assert.match(curve, /DEGREE OF AUTOMATION/);
  assert.match(curve, /not a current Last Mile autonomous-plant capability/);
  assert.match(curve, /L1072 620 H120 Z/);
  for (const connector of ["M170 450 V507", "M340 391 V447", "M520 303 V359", "M705 335 V381", "M885 243 V289", "M1050 153 V199"]) assert.match(curve, new RegExp(connector));
});
test("Infinit-Signal centers existing-source compatibility and governed scale", () => {
  const signal = read("src/app/pages/InfinitSignalPage.tsx");
  const unsStart = signal.indexOf("function SignalUnsProgression");
  const unsEnd = signal.indexOf("function SignalScaleRunway");
  const unsVisual = signal.slice(unsStart, unsEnd);

  for (const section of ["SPEED + SCALE", "THE FASTEST SAFE PATH IN", "YOUR UNS STAYS YOURS", "KEEP CURRENT OPERATIONS AHEAD OF BACKLOG", "SignalScaleRunway"]) {
    assert.match(signal, new RegExp(section.replace(/[+]/g, "\\+")));
  }
  assert.match(signal, /priority-aware 24x7 ingestion and backpressure isolation/);
  for (const source of ["MQTT + UNS", "INDUSTRIAL OT", "DATA PLATFORMS", "GOVERNED FILES"]) assert.match(signal, new RegExp(source.replace(/[+]/g, "\\+")));
  assert.match(signal, /JSON, repository-managed files, and spreadsheets/);
  assert.doesNotMatch(signal, /EvidenceEnvelope|Cooling Use Case|lm-signal-states|What enters\. What is checked\. What leaves\.|NextStep|START WITH ONE LIVE SOURCE/);
  assert.doesNotMatch(signal, /LIVE SOURCE INTAKE|PRIORITY-AWARE INTAKE/);
  assert.match(unsVisual, /viewBox="0 0 1000 560"/);
  assert.match(unsVisual, /THE PLANT MODEL/);
  assert.match(unsVisual, /PRESERVE/);
  assert.match(unsVisual, /QUALIFY/);
  assert.match(unsVisual, /DURABLE OPERATING/);
  assert.doesNotMatch(unsVisual, /OperationalIcon|lm-signal-uns-journey/);
});
test("primary navigation includes keyboard, outside-click, escape, mobile disclosure behavior, and a direct use-case catalog link", () => {
  const navigation = read("src/app/components/Navbar.tsx");
  assert.match(navigation, /aria-haspopup="menu"/);
  assert.match(navigation, /ArrowDown/);
  assert.match(navigation, /ArrowUp/);
  assert.match(navigation, /event\.key === "Escape"/);
  assert.match(navigation, /pointerdown/);
  assert.match(navigation, /MobileGroup/);
  assert.match(navigation, /NavLink to="\/use-cases" label="Use Cases"/);
  assert.doesNotMatch(navigation, /Open Use Cases scenario menu/);
  for (const scenario of operatingScenarioList) assert.ok(!navigation.includes(scenario.route));
});
