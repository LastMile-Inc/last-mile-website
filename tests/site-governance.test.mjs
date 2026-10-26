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
  assert.match(operatingScenarios.wastewater.proofPosture.join(" "), /06:40 constant-rate level projection/i);
});

test("compressed-air calculations and disclosed deltas remain exact", () => {
  assert.equal(Math.round((355 / 1860) * 1000) / 10, 19.1);
  assert.equal(Math.round((241 / 1260) * 1000) / 10, 19.1);
  assert.equal(Math.round((104 - 88.6) * 10) / 10, 15.4);
  assert.equal(Math.round(((15.4 / 104) * 100) * 10) / 10, 14.8);
  assert.equal(Math.round((103 - 97.1) * 10) / 10, 5.9);
  assert.equal(Math.round(((5.9 / 103) * 100) * 10) / 10, 5.7);
  assert.match(operatingScenarios.air.recovery.join(" "), /−600 SCFM · −114 kW/);
  assert.match(operatingScenarios.air.proofPosture.join(" "), /measured-point deltas/i);
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

test("every use case uses the code-native governed process map and has no illustrative disclaimer", () => {
  const components = read("src/app/components/OperatingScenarioComponents.tsx");
  for (const stage of ["Evidence", "Understand", "Decide", "Coordinate", "Act", "Verify"]) assert.match(components, new RegExp(`name: "${stage}"`));
  assert.doesNotMatch(components, /<img|processMap\.src|condition-to-outcome\.png/i);
  for (const scenario of operatingScenarioList) {
    assert.equal(scenario.disclosure, "");
  }
});

test("homepage, platform, and infinit-signal use approved imagery and inventory while concepts hide governance enums", () => {
  const home = read("src/app/pages/HomePage.tsx");
  const platform = read("src/app/pages/PlatformPage.tsx");
  const infinitSignal = read("src/app/pages/InfinitSignalPage.tsx");
  const singularity = read("src/app/pages/SSOMPage.tsx");
  const infinitFlow = read("src/app/pages/InfinitFlowPage.tsx");
  const infinitControl = read("src/app/pages/InfinitControlPage.tsx");
  const howItWorks = read("src/app/pages/HowItWorksPage.tsx");
  const article = read("src/app/pages/IndustrialConceptArticlePage.tsx");
  const inventory = JSON.parse(read("content-source/image-inventory.json"));
  assert.match(home, /home-chuck-hero-(?:400|600|800|1086)\.(?:avif|webp)/);
  assert.match(home, /home-chuck-hero\.jpg/);
  assert.match(home, /width=\{1086\}[\s\S]*?height=\{1448\}[\s\S]*?loading="eager"[\s\S]*?fetchPriority="high"/);
  assert.match(home, /alt="Chuck wearing a blue hard hat and safety glasses on a factory floor\."/);
  assert.doesNotMatch(home, /image-caption/);
  assert.doesNotMatch(home, /<Screenshot\b/);
  assert.doesNotMatch(home, /robots="noindex,\s*nofollow"/);
  assert.doesNotMatch(home, /not a product screenshot|24\/7|response-time SLA/i);
  assert.match(home, /<ServiceTeaser/);
  assert.match(home, /platform-overview-illustration/);
  for (const basename of ["platform-overview-illustration", "platform-infinit-signal", "platform-singularity", "platform-infinit-flow", "platform-infinit-control"]) {
    assert.ok(platform.includes(basename), `PlatformPage missing ${basename}`);
  }
  assert.match(infinitSignal, /platform-infinit-signal/);
  assert.match(infinitSignal, /signal-handoff-web-v3/);
  assert.doesNotMatch(infinitSignal, /ai-ready-handoff-v2/);
  assert.match(infinitSignal, /Make operational data dependable\./);
  assert.match(infinitSignal, /From incoming signals to meaningful context\./);
  assert.match(infinitSignal, /alt="Packaging-line cameras and sensors with graphics showing organized operating information\."/);
  assert.doesNotMatch(infinitSignal, /Step 1 of 4|COR-DC-04182|NBIRTH|DBIRTH|NDEATH|DDEATH|NodeId|SSOM-conformant CORs|Kubernetes|OpenShift/);
  assert.match(singularity, /platform-singularity/);
  assert.match(singularity, /semantic-operating-record-v3/);
  assert.match(singularity, /Give your team the context they need\./);
  assert.match(singularity, /Different sources\. One connected understanding\./);
  assert.match(infinitFlow, /infinit-flow-control-room/);
  assert.match(infinitFlow, /orchestration-routing-web-v4/);
  assert.doesNotMatch(infinitFlow, /orchestration-routing-v3|Verified recovery/i);
  assert.match(infinitFlow, /Keep work moving across people and systems\./);
  assert.match(infinitFlow, /You got workflows\?\s+We do workflows\./);
  assert.match(infinitFlow, /Automate within the rules of your operation\./);
  for (const label of ["Operating context", "Rules and approvals", "People and systems", "Progress and evidence"]) {
    assert.ok(infinitFlow.includes(label), `InfinitFlowPage missing ${label}`);
  }
  assert.match(infinitControl, /field-command-v2/);
  assert.match(infinitControl, /mission-control-v2/);
  assert.match(infinitControl, /Know what needs action\. See what changed\./);
  assert.match(infinitControl, /Keep the wider operation in view\./);
  assert.match(infinitControl, /The work is complete but, is the operation recovered\?/);
  assert.match(infinitControl, /Completed work is one milestone\. Operating evidence determines\s+whether recovery is established or further response is needed\./);
  const useCasePage = read("src/app/pages/OperatingUseCasePage.tsx");
  assert.match(useCasePage, /manufacturing-compressed-air/);
  assert.match(useCasePage, /cold-storage-refrigeration-v2/);
  assert.match(useCasePage, /municipal-wastewater/);
  assert.match(useCasePage, /Keep compressed-air issues connected to the response\./);
  assert.match(useCasePage, /Carry refrigeration issues through to verified recovery\./);
  assert.match(useCasePage, /Keep lift-station response coordinated\./);
  assert.equal(inventory.activeAssets.length, 15);
  assert.equal(inventory.reservedAssets.length, 6);
  assert.match(howItWorks, /accountable-operations-loop-v3\.png/);
  assert.match(howItWorks, /Keep evidence, decisions, coordinated work, and verification\s+connected throughout the response\./);
  assert.match(howItWorks, /Completed work is one milestone\. Operating evidence determines\s+whether recovery is established or further response is needed\./);
  for (const stage of ["Evidence", "Understand", "Decide", "Coordinate", "Act", "Verify"]) {
    assert.match(howItWorks, new RegExp(`name:\\s*"${stage}"`));
  }
  const shot = read("src/app/components/makeover/ProductShot.tsx");
  assert.match(shot, /Screenshot Placeholder/);
  const ourService = read("src/app/pages/OurServicePage.tsx");
  const aboutPage = read("src/app/pages/AboutPage.tsx");
  const siteShell = read("src/app/components/makeover/SiteShell.tsx");
  assert.doesNotMatch(howItWorks, /<Screenshot\b/);
  assert.doesNotMatch(ourService, /<Screenshot\b/);
  assert.doesNotMatch(aboutPage, /industrial-orchestration-hero-v3\.png/);
  for (const cleanRoute of ["/how-it-works", "/industries", "/why-last-mile", "/our-service", "/about", "/demo", "/private-beta"]) {
    assert.ok(siteShell.includes(`"${cleanRoute}"`), `SiteShell routesWithoutReviewChrome missing ${cleanRoute}`);
  }
  for (const page of ["DemoPage", "PrivateBetaPage"]) {
    const content = read(`src/app/pages/${page}.tsx`);
    assert.match(content, /ContactLastMileForm/);
    assert.doesNotMatch(content, /href="https:\/\/preview\.lastmileinc\.ai\/(?:demo|private-beta)"/);
  }
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

test("withdrawn hubs, CSV downloads, and retired concept articles are removed from public routes and sitemap", () => {
  const routes = read("src/app/routes.ts");
  const sitemap = read("public/sitemap.xml");
  for (const withdrawn of [
    "/resources/architect-reference-center",
    "/resources/pmo-implementation-hub",
    "/resources/industrial-concepts/semantic-interoperability",
    "/resources/industrial-concepts/opc-ua",
    "/resources/industrial-concepts/digital-twins",
    "/resources/industrial-concepts/industry-5-0",
    "/resources/industrial-concepts/ot-cybersecurity",
    "/resources/industrial-concepts/data-spaces",
    "/resources/industrial-concepts/plug-and-produce",
    "/resources/industrial-concepts/autonomous-operations",
  ]) {
    assert.ok(!routes.includes(withdrawn.slice(1)), `routes.ts still includes withdrawn path ${withdrawn}`);
    assert.ok(!sitemap.includes(withdrawn), `sitemap.xml still includes withdrawn path ${withdrawn}`);
  }
  assert.equal(fs.existsSync(path.join(root, "public/downloads")), false);
});

