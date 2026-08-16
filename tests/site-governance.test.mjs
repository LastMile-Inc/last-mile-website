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

test("active public pages do not use generic closing or next-step sections", () => {
  const pageRoot = path.join(root, "src/app/pages");
  const pages = fs.readdirSync(pageRoot).filter((file) => file.endsWith(".tsx"));
  for (const page of pages) {
    const source = read(path.join("src/app/pages", page));
    assert.doesNotMatch(source, /<NextStep|lm-v2-next/);
  }
  const components = read("src/app/components/NarrativeComponents.tsx");
  assert.doesNotMatch(components, /export function NextStep/);
});

test("Home owns the company story, Platform owns architecture, and public concepts hide governance enums", () => {
  const home = read("src/app/pages/HomePage.tsx");
  const platform = read("src/app/pages/PlatformOverviewPage.tsx");
  const accountableLoop = read("src/app/components/AccountableOperationsLoop.tsx");
  const article = read("src/app/pages/IndustrialConceptArticlePage.tsx");
  const styles = read("src/styles/technical-journal-refresh.css");

  assert.match(home, /AccountableOperationsLoop/);
  const homepageSections = ["HomepageHero", "IndustryProblem", "LastMileSolution", "AccountableOperationsLoop", "IndustryValue"];
  for (const section of homepageSections) assert.match(home, new RegExp("<" + section));
  assert.equal(homepageSections.length, 5);
  assert.doesNotMatch(home, /PlatformLoopMapping|IndustryUseCases|operatingScenarioList|CompanyClose|<NextStep|Brownfield by Design/);

  const platformSections = ["PlatformHero", "DataPressure", "AccountabilityGap", "ProductSystem"];
  for (const section of platformSections) assert.match(platform, new RegExp("<" + section));
  assert.match(platform, /accountability-gap-v2\.png/);
  assert.match(platform, /const products/);
  assert.doesNotMatch(platform, /AccountableOperationsLoop|THE LEARNING OPERATIONS PLATFORM|OperatingArchitecture|PlatformNextStep|START WITH THE GAP|platformReferenceData|operatingScenarioList|Cooling Loop|USECASE-/);
  assert.match(accountableLoop, /PrecisionLoopGraphic/);
  assert.match(accountableLoop, /lm-premium-loop-composition--three-column/);
  assert.match(accountableLoop, /accountable-operations-loop-v3\.png/);
  assert.doesNotMatch(accountableLoop, /accountable-operations-loop-v4\.png/);
  assert.match(accountableLoop, /lm-premium-loop-center/);
  assert.doesNotMatch(accountableLoop, /lm-precision-loop__generated-core|One accountable operational cycle/);
  assert.match(styles, /\.lm-premium-loop-composition--three-column \.lm-premium-loop-center \{[\s\S]*?display: flex;[\s\S]*?align-items: center;[\s\S]*?justify-content: center;/);
  assert.match(styles, /\.lm-premium-loop-section \.lm-precision-loop--generated \{[\s\S]*?border: 0;[\s\S]*?background: transparent;[\s\S]*?box-shadow: none;/);

  assert.doesNotMatch(home, /platform-core-blueprint|generic.*network.*hero/i);
  assert.doesNotMatch(article, /claimMaturity|reference_architecture|perspective\s*\//i);
});
test("Singularity centers persistent learning and a governed automation continuum", () => {
  const singularity = read("src/app/pages/SSOMPage.tsx");
  const curve = read("src/app/components/SingularityLearningCurve.tsx");

  for (const section of ["EditorialHero", "THE THREAT OF OPERATIONAL AMNESIA", "SingularityLearningCurve", "RECOGNIZE THE PATTERN BEFORE THE FAILURE", "AUTOMATION MUST EARN ITS TRUST"]) {
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
test("Infinit-Signal preserves source meaning while making scale targets explicit", () => {
  const signal = read("src/app/pages/InfinitSignalPage.tsx");
  const unsStart = signal.indexOf("function SignalUnsProgression");
  const unsEnd = signal.indexOf("function SignalScaleRunway");
  const unsVisual = signal.slice(unsStart, unsEnd);

  for (const section of ["Keep telemetry intact from the edge to the enterprise.", "THE DATA-VOLUME PROBLEM", "PRIORITY ROUTING WITHOUT DELAYS", "AI-READY HANDOFF", "YOUR UNS STAYS YOURS", "UNRELENTING SCALE ENGINEERING", "SignalScaleRunway"]) {
    assert.match(signal, new RegExp(section.replace(/[+]/g, "\\+")));
  }
  assert.match(signal, /priority-aware 24x7 ingestion and backpressure isolation/);
  assert.match(signal, /priority-aware continuous 24x7x365 intake with backpressure isolation and controlled recovery/);
  for (const source of ["MQTT + SPARKPLUG", "OPC UA", "BACNET + MODBUS", "HISTORIANS + APIs", "GOVERNED FILES"]) assert.match(signal, new RegExp(source.replace(/[+]/g, "\\+")));
  for (const figure of ["79.4 ZB", "41.6 billion", "millions of events per second", "zero data loss for accepted P0 critical records"]) assert.match(signal, new RegExp(figure.replace(/[.]/g, "\\.")));
  for (const asset of ["hyperscale-ingestion-hero-v2.png", "zero-block-priority-routing-v2.png", "ai-ready-handoff-v2.png"]) assert.match(signal, new RegExp(asset.replace(/[.]/g, "\\.")));
  assert.match(signal, /JSON, repository-managed files, and spreadsheets/);
  assert.doesNotMatch(signal, /EvidenceEnvelope|Cooling Use Case|lm-signal-states|What enters\. What is checked\. What leaves\.|NextStep|START WITH ONE LIVE SOURCE/);
  assert.doesNotMatch(signal, /ServiceNow|#1D7CD8|achieved production benchmark/);
  assert.match(unsVisual, /viewBox="0 0 1000 560"/);
  assert.match(unsVisual, /THE PLANT MODEL/);
  assert.match(unsVisual, /PRESERVE/);
  assert.match(unsVisual, /QUALIFY/);
  assert.match(unsVisual, /DURABLE OPERATING/);
  assert.doesNotMatch(unsVisual, /OperationalIcon|lm-signal-uns-journey/);
});

test("main product workflow keeps retired specialist wording out of primary explanations", () => {
  const primaryCopy = [
    read("src/app/pages/InfinitSignalPage.tsx"),
    read("src/app/pages/ResourcesPage.tsx"),
    read("src/app/components/InfinitControlExperience.tsx"),
    read("src/app/components/InfinitControlArtwork.tsx"),
  ].join("\n");

  for (const retiredPhrase of [
    "hyperscale industrial intake",
    "zero-block priority routing",
    "schemas, mappings, and crosswalks",
    "tenant isolation",
    "payload size",
    "deterministic control",
  ]) {
    assert.ok(!primaryCopy.toLowerCase().includes(retiredPhrase), `Retired phrase returned: ${retiredPhrase}`);
  }
  const singularity = read("src/app/pages/SSOMPage.tsx");
  assert.doesNotMatch(singularity, /bounded digital steps/i);
  assert.match(singularity, /The Standard Semantic Object Model for Physical Operations\./);
  assert.match(singularity, /aligns with Unified Namespace/);
  assert.match(singularity, /Unified Namespace, or UNS, architectures/);
});
test("Infinit-Flow quantifies workflow value without repeating process diagrams", () => {
  const page = read("src/app/pages/InfinitFlowPage.tsx");
  const visuals = read("src/app/components/InfinitFlowExperience.tsx");
  const styles = read("src/styles/flow-control-redesign.css");
  for (const section of ["execution engine for closed-loop accountability across disconnected systems", "SEE THE WHOLE RESPONSE", "DOCUMENT ONCE", "GIVE THE CREW THE CONTEXT FIRST", "ORCHESTRATE ACROSS WHAT YOU ALREADY RUN", "IMPROVE THE NEXT RESPONSE"]) assert.match(page, new RegExp(section));
  assert.match(page, /Two-way connections with customer-approved CMMS and EAM work systems/);
  for (const visual of ["FlowArchitectureHero", "FlowStudioVisual", "FlowMeasurementVisual", "FlowRecoveryVisual", "FlowArchitectureVisual", "FlowImprovementVisual"]) assert.match(page, new RegExp(visual));
  for (const asset of ["infinit-flow-control-room.png", "infinit-flow-reliability-engineer.png", "infinit-flow-orchestration-architecture.png"]) assert.match(visuals, new RegExp(asset.replace(/[.]/g, "\\.")));
  for (const measure of ["MANUAL TOUCHES", "HANDOFF DELAY", "CYCLE TIME", "REWORK", "ON-TIME RATE", "MTTR"]) assert.match(visuals, new RegExp(measure));
  assert.match(styles, /grid-template-columns: minmax\(380px,.78fr\) minmax\(600px,1.22fr\)/);
  assert.doesNotMatch(page, /FlowManualReductionVisual|Map Your Workflow|NextStep|START WITH ONE WORKFLOW|MODEL THE REAL OPERATION|FROM MODEL TO EXECUTION|AUTOMATE THE ROUTINE/);
  assert.doesNotMatch(page, /Synapse|99\.9%|6 to 18 months|2 to 4 hours/);
});

test("Infinit-Control uses an interactive light command portal and clear operating priorities", () => {
  const page = read("src/app/pages/InfinitControlPage.tsx");
  const visuals = read("src/app/components/InfinitControlExperience.tsx");
  const styles = read("src/styles/technical-journal-refresh.css");
  for (const section of ["One operating truth. Tuned for every role", "END THE SWIVEL-CHAIR RESPONSE", "ONE CASE. EVERY DECISION LEVELS?", "BRING THE SIGNALS TO THE ISSUE", "GOVERN BY STATE, NOT SCREEN"]) assert.match(page, new RegExp(section));
  assert.match(page, /ControlPortalExperience/);
  assert.doesNotMatch(page, /mission-control-portal-v2\.png/);
  for (const tab of ["EXEC", "PLANT MGR", "OPERATOR"]) assert.match(visuals, new RegExp(`tab: "${tab}"`));
  for (const asset of ["portal-executive-v3.png", "portal-plant-manager-v3.png", "portal-operator-v3.png"]) {
    assert.match(visuals, new RegExp(asset.replace(/[.]/g, "\\.")));
    assert.ok(fs.existsSync(path.join(root, "public/images/products/infinit-control", asset)), `${asset} must remain in the published asset set`);
  }
  for (const component of ["RoleVisualization", "MetricSparkline"]) assert.match(visuals, new RegExp(`function ${component}`));
  assert.doesNotMatch(visuals, /function ExecutiveMap|function PlantSchematic|function OperatorLine/);
  for (const metric of ["PORTFOLIO ASSET HEALTH", "REGIONAL THROUGHPUT (MT/h)", "SUPPLY CHAIN LATENCY", "ACTIVE PROCESS ALARMS", "LINE 4 OEE", "FACILITY MTTR", "FILLER STATION TEMP", "UNITS/MIN", "CURRENT SHIFT YIELD"]) assert.ok(visuals.includes(metric));
  for (const fact of ["Filler pressure variance", "FIL-04 · Bottling Line 4", "Line Operations · WO-18427", "Return check pending"]) assert.match(visuals, new RegExp(fact));
  assert.match(visuals, /role="tablist"/);
  assert.match(visuals, /role="tabpanel"/);
  assert.match(visuals, /aria-live="polite"/);
  assert.match(visuals, /ArrowRight/);
  assert.equal((visuals.match(/label: "SELECTED SITE"/g) || []).length, 1);
  assert.match(styles, /--lm-control-blue: #1d7cd8/);
  assert.match(styles, /background: #fff/);
  for (const role of ["C-SUITE", "PLANT MANAGER", "SUPERVISOR", "SHIFT WORKER"]) assert.match(visuals, new RegExp(role));
  for (const visual of ["ControlRoleVisual", "ControlPriorityVisual", "ControlCommandCenterVisual", "field-command-v2.png"]) assert.match(page, new RegExp(visual.replace(/[.]/g, "\\.")));
  for (const scope of ["UTILITY PLANT", "ELECTRICAL SERVICE", "DATA HALL 1", "DATA HALL 2", "DATA HALL 3", "CHILLED WATER LOOP B"]) assert.match(visuals, new RegExp(scope));
  assert.doesNotMatch(visuals, /<image|avatar|OPERATING FOOTPRINT|NORTH AMERICA|chuck-operator/);
  assert.doesNotMatch(page, /Design Your Operating View|NextStep|BUILD THE RIGHT VIEW|ONE OPERATION, EVERY ALTITUDE|NOTHING IMPORTANT GOES UNSEEN|A VIEW TEAMS CAN TRUST/);
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
  assert.match(navigation, /Infinit-Control · Observe/);
  assert.doesNotMatch(navigation, /Infinit-Control · Govern/);
  assert.doesNotMatch(navigation, /Open Use Cases scenario menu/);
  for (const scenario of operatingScenarioList.filter((scenario) => scenario.route !== "/use-cases/data-center-cooling")) assert.ok(!navigation.includes(scenario.route));
  assert.match(navigation, /Cooling Redundancy Proof/);
});

test("Resources is a podcast-led technical intelligence hub with governed proof boundaries", () => {
  const page = read("src/app/pages/ResourcesPage.tsx");
  const styles = read("src/styles/resources-intelligence-hub.css");
  for (const section of ["The Intelligence Hub for Physical Operations", "Signal 2 Action", "The New Industrial Architecture", "Engineering and Proof", "Historical Context &amp; Archives"]) assert.match(page, new RegExp(section));
  for (const asset of ["signal_2_action.jpg", "intelligence-hub-hero-v1.png", "semantic-architecture-v1.png", "protocol-proof-v1.png"]) assert.match(page, new RegExp(asset.replace(/[.]/g, "\\.")));
  for (const concept of ["Standardized Semantic Object Model", "OPC UA", "Modbus", "BACnet", "MQTT", "Sparkplug"]) assert.match(page, new RegExp(concept));
  assert.match(page, /Targets stay labeled as targets until repeatable benchmark evidence is approved/);
  assert.match(page, /Prior ServiceNow chapters/);
  assert.doesNotMatch(page, /Choose the kind of evidence you need|Last Mile Synapse|private cloud data vault|99\.999%/);
  assert.doesNotMatch(styles, /#1D7CD8|#[0-9A-Fa-f]{6}/);
});
