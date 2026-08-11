import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleCheck,
  CircleAlert,
  CircleHelp,
  CircleX,
  Expand,
  Gauge,
  Info,
  Network,
  Pause,
  Play,
  Radio,
  RefreshCw,
  RotateCcw,
  Route,
  ShieldCheck,
  TriangleAlert,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { TrackedLink } from "@/app/components/TrackedLink";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";
import {
  coolingReference,
  deriveRag,
  deriveOutcomeStatus,
  industrySnapshots,
  operatingScenarios,
  measurementAriaLabel,
  outcomes,
  ragLabel,
  referenceDisclosure,
  type RagStatus,
  type ReferenceMeasurement,
  type ResultKey,
} from "./platformReferenceData";

const stages = [
  { short: "Evidence", title: "Know what happened", duration: 1700, summary: "Existing systems expose the qualified measurements that show reduced cooling redundancy." },
  { short: "Understand", title: "Understand it in context", duration: 1900, summary: "Singularity connects retained source evidence to CHWP-02, its topology, history, and redundancy role." },
  { short: "Decide", title: "Determine what happens next", duration: 1700, summary: "Infinit-Flow evaluates context, policy, consequences, and available governed responses." },
  { short: "Coordinate", title: "Coordinate the response", duration: 2200, summary: "Infinit-Flow connects ownership, timers, approvals, SAP, the provider, and authorized people." },
  { short: "Act", title: "Execute the approved response", duration: 1800, summary: "Customer-authorized people and systems perform the appropriate digital and physical work." },
  { short: "Verify", title: "Verify the physical outcome", duration: 2300, summary: "Return telemetry re-enters through Infinit-Signal and determines the result independently of SAP closure." },
] as const;

const vendors = [
  {
    name: "HiveMQ",
    owns: "Reliable MQTT transport, sessions, topics, QoS behavior, retained messages, and Sparkplug-compatible messaging.",
    role: "Last Mile consumes configured topic subscriptions, payloads, source metadata, connection state, and broker-originated events.",
    handoff: "MQTT over TLS, Sparkplug B, approved broker metadata, or an approved Pub/Sub extension pattern.",
    boundary: "Last Mile does not replace HiveMQ as the customer’s broker or treat broker delivery as proof of recovery.",
  },
  {
    name: "HighByte Intelligence Hub",
    owns: "Industrial DataOps connections, models, instances, transformations, and flows between industrial sources and destinations.",
    role: "Last Mile consumes configured modeled outputs, retains source references, and maps them into SSOM-conformant canonical operational records.",
    handoff: "MQTT, Sparkplug B, OPC UA, REST, webhook, or approved modeled output.",
    boundary: "Last Mile does not replace HighByte’s industrial integration and modeling role.",
  },
  {
    name: "Ignition",
    owns: "SCADA/HMI applications, OPC UA access, tags, alarms, local visualization, historian functions, and installed MES capabilities.",
    role: "Last Mile consumes approved tags, alarms, events, equipment states, and source references.",
    handoff: "OPC UA, MQTT/Sparkplug through approved modules, REST, webhook, event stream, or approved database/API access.",
    boundary: "Last Mile does not replace Ignition visualization, local supervisory control, gateway execution, or alarm ownership.",
  },
  {
    name: "Rockwell Automation",
    owns: "PLC logic, machine control, FactoryTalk operating applications, HMI, equipment state, and associated automation functions.",
    role: "Last Mile consumes approved equipment state, alarm, production, and operating data exposed through customer-approved systems.",
    handoff: "FactoryTalk Optix OPC UA, MQTT, REST, Ignition, HighByte, historian, or another approved integration boundary.",
    boundary: "Last Mile does not write unrestricted PLC commands, alter safety logic, or replace FactoryTalk applications.",
  },
  {
    name: "Cognite Data Fusion",
    owns: "Industrial-data ingestion, contextualization, models, time series, events, files, and analytical access in the customer’s Cognite environment.",
    role: "Last Mile consumes approved assets, relationships, events, time series, quality fields, and history while retaining Cognite references.",
    handoff: "Cognite APIs, data-point subscriptions, approved extractors, events, time-series services, or governed exports.",
    boundary: "Last Mile does not replace Cognite’s industrial-data platform or claim ownership of Cognite source records.",
  },
  {
    name: "AVEVA",
    owns: "Industrial information, historians, engineering context, operations applications, visualization, and CONNECT services in the customer environment.",
    role: "Last Mile consumes approved operational events, histories, asset references, and status needed for the response.",
    handoff: "Approved AVEVA APIs, historian interfaces, OPC UA, MQTT, event services, or governed exports according to the deployed product.",
    boundary: "Last Mile does not replace AVEVA historian, engineering, visualization, or process applications.",
  },
  {
    name: "SAP EAM / S/4HANA Maintenance Management",
    owns: "Maintenance notifications, orders, planning, task records, materials, cost, and enterprise asset-management records.",
    role: "Last Mile coordinates approved work creation or updates, status retrieval, work references, and responsible-party information.",
    handoff: "SAP maintenance APIs, OData, REST, webhook, integration middleware, or approved event patterns.",
    boundary: "Last Mile does not replace SAP as the maintenance system of record or treat order closure as proof of operating recovery.",
  },
] as const;

const products = [
  { name: "Infinit-Signal", copy: "Consumes configured operational sources, preserves source evidence, qualifies time and quality, resolves mappings, and creates SSOM-conformant canonical operational records.", to: "/infinit-signal", icon: Radio },
  { name: "Singularity", copy: "Maintains governed operational memory, canonical identity, topology, Conditions, evidence, time, and verified Outcomes while implementing the SSOM contract.", to: "/singularity", icon: Network },
  { name: "Infinit-Flow", copy: "Acts as the operational decision and orchestration engine across cases, work, approvals, providers, and authority.", to: "/infinit-flow", icon: Route },
  { name: "Infinit-Control", copy: "Provides role-based command surfaces for operating state, evidence, ownership, work, authority, and verified Outcomes.", to: "/infinit-control", icon: Gauge },
] as const;

type UseCase = {
  id: string;
  selector: string;
  problem: string;
  process: string[];
  measurements: string[];
  result: string;
  image: string;
  imageAlt: string;
};

const useCases: UseCase[] = [
  {
    id: "cooling",
    selector: "Data center cooling",
    problem: "A secondary chilled-water pump is commanded on, but run feedback and amperage do not confirm operation. Differential pressure falls while rack inlet temperature remains within band, leaving Cooling Loop B with reduced redundancy.",
    process: ["Pump state and loop measurements", "Connect the mismatch to CHWP-02 and Cooling Loop B", "Determine the governed facilities response", "Assign facilities and engage the provider", "Inspect and repair under customer authority", "Evaluate pressure, temperature, and stability"],
    measurements: ["Command and run feedback", "Motor amperage", "Loop differential pressure", "Rack inlet temperature", "Stability and recurrence windows"],
    result: "The response remains open until pump state, amperage, pressure, temperature, and stability criteria establish the result.",
    image: "/images/reference/data-center-cooling-condition-to-outcome.png",
    imageAlt: "Data center cooling condition-to-outcome process map from cooling evidence through qualification, coordinated work, and verified recovery",
  },
  {
    id: "wastewater",
    selector: "Municipal wastewater",
    problem: "A high-level alarm shows the symptom, but current, speed, flow, and drawdown determine whether pumping capacity is impaired and overflow risk will recur.",
    process: ["Wet-well and pump measurements", "Connect level, flow, current, and pumping context", "Determine whether capacity intervention is required", "Notify the duty operator and field crew", "Execute isolation, LOTO, and approved repair", "Verify drawdown across multiple cycles"],
    measurements: ["Wet-well level and rate", "Pump command and run state", "Motor current and shaft speed", "Discharge flow", "Standby capacity"],
    result: "The alarm clearing is not the result. Restored drawdown and pumping capacity are the result.",
    image: "/images/reference/municipal-wastewater-condition-to-outcome.png",
    imageAlt: "Municipal wastewater condition-to-outcome process map from pumping evidence through qualified response and verified capacity",
  },
  {
    id: "air",
    selector: "Manufacturing compressed air",
    problem: "The compressor room sees kilowatts, the line sees low pressure, and maintenance sees leak tickets. Without one operating issue across them, operators may raise pressure without correcting the loss.",
    process: ["Supply, zone, energy, and production data", "Separate expected demand from loss", "Determine the appropriate utilities response", "Assign utilities and maintenance", "Inspect and repair the affected zone", "Compare post-work flow, pressure, and power"],
    measurements: ["Header and discharge pressure", "Flow in SCFM", "Compressor kW and loading", "Zone valve state", "Production state"],
    result: "A repaired fitting is not enough. Off-shift flow, pressure stability, and compressor loading must improve.",
    image: "/images/reference/manufacturing-compressed-air-condition-to-outcome.png",
    imageAlt: "Manufacturing compressed-air condition-to-outcome process map from abnormal demand through repair and verified utility performance",
  },
  {
    id: "refrigeration",
    selector: "Cold-storage refrigeration",
    problem: "Room temperature is a late symptom. Airflow, icing, defrost, suction pressure, superheat, doors, and refrigerant feed may expose a capacity problem before product is compromised.",
    process: ["Room, evaporator, and refrigeration data", "Connect degraded capacity to product and equipment context", "Determine the product-protection response", "Notify refrigeration, warehouse, QA, and the contractor", "Execute authorized protection and repair", "Verify pull-down and the next defrost cycle"],
    measurements: ["Room temperature and rate", "Suction pressure", "Superheat", "Fan state and current", "Defrost state and duration"],
    result: "Contractor completion does not close the response. Stable refrigeration and product-protection criteria do.",
    image: "/images/reference/cold-storage-refrigeration-condition-to-outcome.png",
    imageAlt: "Cold-storage refrigeration condition-to-outcome process map from capacity-loss evidence through product protection and verified recovery",
  },
];

const startSteps = [
  "Choose one consequential operating issue.",
  "Identify the systems and people already involved.",
  "Define the measurement contract.",
  "Build and simulate the response.",
  "Evaluate it in the operating environment.",
] as const;

export function PlatformOverviewPage() {
  const description = "See how Last Mile connects industrial data, asset context, people, enterprise work, and return measurements across the systems already operating a facility.";
  return <>
    <SEO title="Last Mile Platform | Connect Operational Response Across Systems" description={description} canonicalPath="/platform" jsonLd={[createProductSchema("Last Mile Platform", "/platform", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform" }])]} />
    <main className="lm-platform-page">
      <PlatformHero />
      <PlatformNavigator />
      <OwnershipComparison />
      <HowItWorks />
      <OutcomePrinciple />
      <VendorHandoffs />
      <ProductDirectory />
      <IndustryUseCases />
      <ClosingSection />
    </main>
  </>;
}

function PlatformHero() {
  return <header className="lm-platform-hero">
    <div className="lm-platform-hero__copy">
      <p className="lm-eyebrow">LAST MILE PLATFORM</p>
      <h1>One accountable operating condition—from first evidence to verified outcome.</h1>
      <p className="lm-platform-lede">Last Mile sits above the systems that already run, record, and service physical operations. It qualifies their evidence, resolves one operational identity, coordinates the governed response, and proves recovery from live return measurements.</p>
      <div className="lm-platform-actions"><a className="lm-platform-button lm-platform-button--primary" href="#how-it-works">Watch How It Works <ArrowRight aria-hidden="true" /></a><a className="lm-platform-button lm-platform-button--secondary" href="#industry-use-cases">See Industry Examples</a></div>
    </div>
    <aside className="lm-operating-preview" aria-label="Cooling Loop B operating state preview">
      <div className="lm-operating-preview__head"><span>Operating state</span><strong>Cooling Loop B · Reduced redundancy</strong><StatusBadge status="critical" label="Critical · Pump CHWP-02 did not start" /><small>{coolingReference.identity.owner} · {coolingReference.identity.team} · {coolingReference.identity.affiliation}</small></div>
      <MeasurementList measurements={coolingReference.incident} compact />
      <p><CircleAlert aria-hidden="true" />CHWP-02 is commanded to run but remains stopped. Cooling Loop B has lost its secondary pumping path; Hall 3 temperatures remain inside their current range.</p>
    </aside>
  </header>;
}

function PlatformNavigator() {
  return <nav className="lm-platform-navigator" aria-label="Platform page sections"><a href="#accountability-gap">Accountability gap</a><a href="#how-it-works">Interactive response</a><a href="#work-vs-recovery">Work vs. recovery</a><a href="#system-handoffs">System handoffs</a><a href="#platform-products">Products</a><a href="#industry-use-cases">Use cases</a></nav>;
}

function OwnershipComparison() {
  const retained = ["BMS/SCADA commands, status, measurements, and alarms", "Historian trends and retained operating data", "SAP work order and equipment records", "Provider dispatch and field-service updates", "Facilities, IT, and field operating authority"];
  const connected = ["One canonical asset and topology across source identities", "One qualified Condition instead of disconnected alarms", "One case across teams, systems, and providers", "One time-correct evidence chain from source to result", "One operating result established from return telemetry"];
  return <section id="accountability-gap" className="lm-ownership-section" aria-labelledby="ownership-title"><h2 id="ownership-title" className="lm-platform-sr-only">Ownership comparison</h2><div className="lm-ownership-comparison"><OwnershipColumn title="What the Existing Stack Retains" items={retained} icon={Check} /><OwnershipColumn title="What Last Mile Adds" items={connected} icon={ArrowRight} emphasized /></div></section>;
}

function OwnershipColumn({ title, items, icon: Icon, emphasized = false }: { title: string; items: string[]; icon: LucideIcon; emphasized?: boolean }) {
  return <article className={emphasized ? "is-emphasized" : ""}><h3>{title}</h3><ul>{items.map((item) => <li key={item}><Icon aria-hidden="true" />{item}</li>)}</ul></article>;
}

function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const [autoPlayed, setAutoPlayed] = useState(false);
  const [resultKey, setResultKey] = useState<ResultKey>("recovery");

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && !autoPlayed) {
        setAutoPlayed(true);
        setStage(0);
        setResultKey("recovery");
        setPlaying(true);
      }
    }, { rootMargin: "-30% 0px -30% 0px", threshold: 0.01 });
    observer.observe(root);
    return () => observer.disconnect();
  }, [autoPlayed]);

  useEffect(() => {
    if (!playing || !inView) return;
    const timer = window.setTimeout(() => {
      setStage((current) => {
        if (current >= stages.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, stages[stage].duration);
    return () => window.clearTimeout(timer);
  }, [inView, playing, stage]);

  const play = () => {
    if (stage === stages.length - 1) {
      setStage(0);
      setResultKey("recovery");
    }
    setPlaying(true);
  };
  const replay = () => {
    setStage(0);
    setResultKey("recovery");
    setPlaying(true);
  };
  const chooseResult = (value: ResultKey) => {
    setResultKey(value);
    setStage(stages.length - 1);
    setPlaying(false);
  };

  return <PlatformSection sectionRef={sectionRef} id="how-it-works" eyebrow="The platform at work" title="Follow the Cooling Loop B response." tone="wash" wide>
    <div className="lm-animation" data-stage={stage}>
      <div className="lm-animation__topline"><div><span>Persistent issue</span><strong>{coolingReference.identity.issue}</strong></div><label>Result demonstration<select value={resultKey} onChange={(event) => chooseResult(event.target.value as ResultKey)}>{(Object.keys(outcomes) as ResultKey[]).map((key) => <option key={key} value={key}>{outcomes[key].label}</option>)}</select></label></div>
      <div className="lm-animation__controls" aria-label="Animation controls">
        <button type="button" onClick={play} disabled={playing} aria-label="Play animation"><Play aria-hidden="true" />Play</button>
        <button type="button" onClick={() => setPlaying(false)} disabled={!playing} aria-label="Pause animation"><Pause aria-hidden="true" />Pause</button>
        <button type="button" onClick={() => { setPlaying(false); setStage((value) => Math.max(0, value - 1)); }} disabled={stage === 0} aria-label="Previous stage"><ArrowLeft aria-hidden="true" />Previous</button>
        <button type="button" onClick={() => { setPlaying(false); setStage((value) => Math.min(stages.length - 1, value + 1)); }} disabled={stage === stages.length - 1} aria-label="Next stage">Next<ArrowRight aria-hidden="true" /></button>
        <button type="button" onClick={replay} aria-label="Replay animation"><RotateCcw aria-hidden="true" />Replay</button>
      </div>
      <div className="lm-animation__rail" aria-label={`Stage progress: ${stage + 1} of ${stages.length}`}>{stages.map((item, index) => <button key={item.short} type="button" className={index === stage ? "is-current" : index < stage ? "is-complete" : ""} onClick={() => { setPlaying(false); setStage(index); }} aria-label={`Go to stage ${index + 1}: ${item.title}`} aria-current={index === stage ? "step" : undefined}><span>{index + 1}</span><strong>{item.short}</strong></button>)}</div>
      <p className="lm-animation__live" aria-live="polite"><strong>Stage {stage + 1} of {stages.length}.</strong> {stages[stage].summary}</p>
      <div className="lm-animation__workspace">
        <StageDetails activeStage={stage} resultKey={resultKey} />
        <ResponseSnapshot activeStage={stage} resultKey={resultKey} />
      </div>
    </div>
    <p className="lm-reference-disclosure">{referenceDisclosure}</p>
    <p className="lm-platform-qualification">Representative integration pathway · validation status to be confirmed. Vendor names do not imply certification, partnership, endorsement, or a completed production deployment.</p>
  </PlatformSection>;
}

function StageDetails({ activeStage, resultKey }: { activeStage: number; resultKey: ResultKey }) {
  const coordination = coolingReference.coordination;
  const outcome = outcomes[resultKey];
  const details: Array<{ eyebrow: string; title: string; icon: LucideIcon; body: ReactNode }> = [
    { eyebrow: "Customer systems", title: "Existing systems expose the relevant measurements.", icon: Workflow, body: <><div className="lm-stage-path"><span>Rockwell / BMS</span><ArrowRight aria-hidden="true" /><span>Ignition or HighByte</span><ArrowRight aria-hidden="true" /><span>HiveMQ</span></div><MeasurementList measurements={coolingReference.incident} columns={2} /><p className="lm-stage-note"><Check aria-hidden="true" />Controls, SCADA, BMS, brokers, and historians continue creating and retaining their established operational data.</p></> },
    { eyebrow: "Infinit-Signal", title: "Qualify the data before creating the issue.", icon: Radio, body: <><MeasurementList measurements={coolingReference.qualification} columns={3} qualification /><div className="lm-quarantine-detail"><StatusBadge status="warning" label="2 quarantined records" /><ul>{coolingReference.quarantine.map((item) => <li key={item}>{item}</li>)}</ul></div></> },
    { eyebrow: "Singularity · SSOM", title: "Resolve every source reference to one asset.", icon: Network, body: <><div className="lm-stage-references">{coolingReference.sourceReferences.map(([label, value]) => <span key={label}><small>{label}</small><code>{value}</code></span>)}</div><div className="lm-stage-identity"><strong>{coolingReference.identity.asset} · {coolingReference.identity.assetType}</strong><p>CHWP-02 → Cooling Loop B → Hall 3 → N+1 secondary pumping path</p><small>One asset identity. Every source reference retained.</small></div></> },
    { eyebrow: "Infinit-Flow", title: "Coordinate the work without taking field authority.", icon: Route, body: <><dl className="lm-stage-coordination"><div><dt>Owner</dt><dd>{coordination.owner}</dd></div><div><dt>Acknowledgement</dt><dd>{coordination.acknowledged} · Target {coordination.target} <StatusBadge status="normal" label="Normal" /></dd></div><div><dt>SAP work</dt><dd>{coordination.sapWork}</dd></div><div><dt>Provider dispatch</dt><dd>{coordination.providerDispatch} · ETA {coordination.providerEta}</dd></div><div><dt>Approval</dt><dd>{coordination.approval}</dd></div><div><dt>Field authority</dt><dd>{coordination.fieldAuthority}</dd></div></dl><p className="lm-stage-note"><Check aria-hidden="true" />SAP remains the maintenance system of record. Physical work and consequential control actions remain governed by customer procedures and authorized personnel.</p></> },
    { eyebrow: "Infinit-Control", title: "Track the complete operating response.", icon: Gauge, body: <><dl className="lm-stage-tracking"><div><dt>Issue</dt><dd>{coolingReference.identity.issue}</dd></div><div><dt>Severity</dt><dd><StatusBadge status="critical" label="Critical" /></dd></div><div><dt>Equipment</dt><dd>{coolingReference.identity.asset}</dd></div><div><dt>Protection</dt><dd>Reduced redundancy</dd></div><div><dt>Owner</dt><dd>{coolingReference.identity.owner}</dd></div><div><dt>Team / location</dt><dd>{coolingReference.identity.team} · {coolingReference.identity.affiliation}</dd></div><div><dt>Acknowledgement</dt><dd>Complete · {coordination.acknowledged} / {coolingReference.identity.acknowledgementTarget}</dd></div><div><dt>SAP / provider</dt><dd>{coolingReference.identity.sapWorkOrder} · {coolingReference.identity.providerDispatch}</dd></div><div><dt>Operating state</dt><dd>Pump stopped</dd></div><div><dt>Result</dt><dd>Awaiting qualified return measurements</dd></div></dl><p className="lm-stage-note"><CircleAlert aria-hidden="true" />SAP work closes at {coolingReference.timeline[6][0]}. Operating recovery cannot be established before the full measurement window completes at {coolingReference.timeline[7][0]}.</p></> },
    { eyebrow: "Qualified return telemetry", title: "Measure the result from operating data.", icon: RefreshCw, body: <><div className="lm-return-route"><span>Customer measurements</span><ArrowRight aria-hidden="true" /><strong>Infinit-Signal</strong><ArrowRight aria-hidden="true" /><span>Result criteria</span></div><MeasurementList measurements={outcome.measurements} columns={2} /><div className="lm-stage-result" aria-live="polite"><RagIcon status={resultStatus(resultKey)} /><div><span>{outcome.label}</span><strong>{outcome.reason}</strong>{outcome.workStatus ? <small>{outcome.workStatus}</small> : null}{outcome.operatingResult ? <small>{outcome.operatingResult}</small> : null}{outcome.priorRecoveryAt ? <small>Prior recovery: {outcome.priorRecoveryAt} · Recurrence elapsed: {outcome.recurrenceElapsed}</small> : null}</div></div></> },
  ];
  return <section className="lm-stage-detail" aria-label="Active animation stage">{details.map(({ eyebrow, title, icon: Icon, body }, index) => <article key={eyebrow} hidden={index !== activeStage}><header><Icon aria-hidden="true" /><div><span>{eyebrow}</span><h3>{title}</h3></div></header><div className="lm-stage-detail__body">{body}</div></article>)}</section>;
}

function ResponseSnapshot({ activeStage, resultKey }: { activeStage: number; resultKey: ResultKey }) {
  const outcome = outcomes[resultKey];
  const pump = outcome.measurements.find((item) => item.id === "pump_status");
  const sapStatus = activeStage < 3 ? "Not created · system of record is SAP" : activeStage < 5 ? `${coolingReference.identity.sapWorkOrder} · In progress` : outcome.workStatus ?? `${coolingReference.identity.sapWorkOrder} · Closed`;
  const providerStatus = activeStage < 3 ? "Not engaged" : `${coolingReference.identity.providerDispatch} · Accepted`;
  return <aside className="lm-response-snapshot" aria-label="Current operating response"><header><span>Operating response</span><strong>{coolingReference.identity.system}</strong></header><dl><div><dt>Issue</dt><dd>{coolingReference.identity.issue}</dd></div><div><dt>Severity</dt><dd><StatusBadge status="critical" label="Critical" /></dd></div><div><dt>Equipment</dt><dd>{coolingReference.identity.asset}</dd></div><div><dt>Protection</dt><dd>Reduced redundancy</dd></div><div><dt>Owner</dt><dd>{coolingReference.identity.owner}</dd></div><div><dt>Team / location</dt><dd>{coolingReference.identity.team} · {coolingReference.identity.affiliation}</dd></div><div><dt>Acknowledgement</dt><dd>{activeStage < 3 ? "Target · ≤05:00" : "Complete · 01:49 / 05:00"}</dd></div><div><dt>SAP work</dt><dd>{sapStatus}</dd></div><div><dt>Provider dispatch</dt><dd>{providerStatus}</dd></div><div><dt>Operating state</dt><dd>{activeStage < 5 ? "Pump stopped" : `Pump ${pump?.value.toLowerCase() ?? "state unavailable"}`}</dd></div><div className="lm-response-snapshot__result"><dt>Result</dt><dd>{activeStage < 5 ? "Awaiting qualified return measurements" : outcome.label}</dd></div></dl><p><CircleAlert aria-hidden="true" />Work closure and operating recovery are separate states.</p></aside>;
}

function MeasurementList({ measurements, columns = 1, compact = false, qualification = false }: { measurements: readonly ReferenceMeasurement[]; columns?: 1 | 2 | 3; compact?: boolean; qualification?: boolean }) {
  return <div className={`lm-measurement-list lm-measurement-list--${columns}${compact ? " is-compact" : ""}${qualification ? " is-qualification" : ""}`}>{measurements.map((measurement) => <MeasurementRow key={measurement.id} measurement={measurement} />)}</div>;
}

function MeasurementRow({ measurement }: { measurement: ReferenceMeasurement }) {
  const status = deriveRag(measurement);
  return <article className={`lm-measurement-row is-${status}`} aria-label={measurementAriaLabel(measurement)}><div className="lm-measurement-row__name"><strong>{measurement.name}</strong><StatusBadge status={status} label={ragLabel(measurement)} /></div><div className="lm-measurement-row__reading"><strong>{measurement.value}</strong><span>{measurement.reference}</span></div>{measurement.trend || measurement.freshness ? <p>{measurement.trend ? <span>{measurement.trend}</span> : null}{measurement.freshness ? <span>{measurement.freshness}</span> : null}</p> : null}</article>;
}

function StatusBadge({ status, label }: { status: RagStatus; label: string }) {
  return <span className={`lm-status-badge is-${status}`}><RagIcon status={status} /><span>{label}</span></span>;
}

function RagIcon({ status }: { status: RagStatus }) {
  if (status === "critical") return <CircleX aria-hidden="true" />;
  if (status === "warning") return <TriangleAlert aria-hidden="true" />;
  if (status === "normal") return <CircleCheck aria-hidden="true" />;
  if (status === "unknown") return <CircleHelp aria-hidden="true" />;
  return <Info aria-hidden="true" />;
}

function resultStatus(key: ResultKey): RagStatus {
  return deriveOutcomeStatus(outcomes[key]);
}

function OutcomePrinciple() {
  const workClose = coolingReference.timeline[6][0];
  const recoveryEstablished = coolingReference.timeline[8][0];
  return <PlatformSection id="work-vs-recovery" eyebrow="Outcome principle" title="The work order can close before the operating condition is recovered." intro={`In the reference timeline, SAP work closes at ${workClose}. Recovery is not established until ${recoveryEstablished}, after the complete ${coolingReference.identity.requiredStability} measurement window proves the pump is running, current and differential pressure are in band, rack inlet temperature remains in range, and pressure is stable.`} tone="white">
    <p className="lm-threshold-note"><CircleAlert aria-hidden="true" />Ticket closure, workflow completion, command acknowledgement, alarm clearance, and work-order closure cannot independently prove physical recovery.</p>
    <TrackedLink to="/resources/industrial-concepts/operational-outcome-thread" eventName="cta_explore_platform_click">Read about the operational outcome thread <ArrowRight aria-hidden="true" /></TrackedLink>
  </PlatformSection>;
}

function VendorHandoffs() {
  const [selected, setSelected] = useState<string>(vendors[0].name);
  const [architectureOpen, setArchitectureOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const active = vendors.find((vendor) => vendor.name === selected) ?? vendors[0];
  useModalFocus(architectureOpen, setArchitectureOpen, openButtonRef, closeButtonRef);

  return <PlatformSection id="system-handoffs" eyebrow="How Last Mile works with the systems you already run" title="Keep each system in its lane." intro="Select a system to see its established responsibility, representative handoff, Last Mile role, and explicit boundary." tone="white" wide>
    <p className="lm-validation-label">Representative integration pathway · validation status to be confirmed</p>
    <div className="lm-vendor-selector">
      <div className="lm-vendor-rows" role="list" aria-label="Existing systems">{vendors.map((vendor) => <button key={vendor.name} type="button" onClick={() => setSelected(vendor.name)} aria-pressed={selected === vendor.name}><span>{vendor.name}</span><ArrowRight aria-hidden="true" /></button>)}</div>
      <article className="lm-vendor-detail" aria-live="polite"><h3>{active.name}</h3><dl><div><dt>Responsibility retained</dt><dd>{active.owns}</dd></div><div><dt>Representative handoff</dt><dd>{active.handoff}</dd></div><div><dt>Last Mile role</dt><dd>{active.role}</dd></div><div><dt>Does not replace</dt><dd>{active.boundary}</dd></div></dl></article>
    </div>
    <div className="lm-vendor-disclosures">{vendors.map((vendor, index) => <details key={vendor.name} open={index === 0}><summary>{vendor.name}<ChevronDown aria-hidden="true" /></summary><dl><div><dt>Responsibility retained</dt><dd>{vendor.owns}</dd></div><div><dt>Representative handoff</dt><dd>{vendor.handoff}</dd></div><div><dt>Last Mile role</dt><dd>{vendor.role}</dd></div><div><dt>Does not replace</dt><dd>{vendor.boundary}</dd></div></dl></details>)}</div>
    <div className="lm-architecture-link"><p>Last Mile preserves each system’s authority while carrying one operating issue across their boundaries.</p><button ref={openButtonRef} type="button" onClick={() => setArchitectureOpen(true)}>View the complete technical architecture <Expand aria-hidden="true" /></button></div>
    {architectureOpen ? <Modal title="Last Mile Platform architecture" closeRef={closeButtonRef} onClose={() => setArchitectureOpen(false)}><div className="lm-architecture-text"><h3>Accessible architecture explanation</h3><ol><li>Existing OT, industrial data, work, facilities, and service systems provide source evidence and retain their established responsibilities.</li><li>Infinit-Signal preserves and qualifies configured source evidence before creating SSOM-conformant canonical operational records.</li><li>Singularity implements SSOM to maintain canonical identity, topology, Conditions, evidence, history, and Outcomes.</li><li>Infinit-Flow coordinates work, providers, approvals, timers, and explicit AUTO, ASSIST, and HUMAN AUTHORITY steps.</li><li>Infinit-Control presents the governed operating case while current valid return measurements establish the result.</li></ol></div><figure className="lm-architecture-modal"><img src="/images/reference/last-mile-platform-architecture.png" width="1920" height="1080" loading="lazy" alt="Last Mile Platform architecture showing Infinit-Signal, Singularity and SSOM, Infinit-Flow, and Infinit-Control above existing operational systems" /><figcaption>Canonical Last Mile Platform architecture. Existing controls, data, work, and service systems retain their established responsibilities.</figcaption></figure></Modal> : null}
  </PlatformSection>;
}

function ProductDirectory() {
  return <PlatformSection id="platform-products" eyebrow="Inside the platform" title="Four products, each with a specific responsibility." tone="wash" wide><div className="lm-product-directory">{products.map(({ name, copy, to, icon: Icon }) => <article key={name}><Icon aria-hidden="true" /><div><h3>{name}</h3><p>{copy}</p><TrackedLink to={to} eventName="cta_product_click" eventData={{ product: name }}>Explore {name} <ArrowRight aria-hidden="true" /></TrackedLink></div></article>)}</div></PlatformSection>;
}

function IndustryUseCases() {
  const [activeId, setActiveId] = useState(useCases[0].id);
  const [mapOpen, setMapOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const active = useCases.find((item) => item.id === activeId) ?? useCases[0];
  const snapshot = industrySnapshots[active.id as keyof typeof industrySnapshots];
  useModalFocus(mapOpen, setMapOpen, openButtonRef, closeButtonRef);

  return <PlatformSection id="industry-use-cases" eyebrow="See your operation" title="The equipment changes. The operating discipline remains the same." tone="white" wide>
    <div className="lm-usecase-tabs" role="tablist" aria-label="Industry examples">{useCases.map((item, index) => <button key={item.id} type="button" id={`usecase-tab-${item.id}`} role="tab" aria-selected={item.id === activeId} aria-controls="active-usecase" tabIndex={item.id === activeId ? 0 : -1} onClick={() => setActiveId(item.id)} onKeyDown={(event) => { if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return; event.preventDefault(); const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? useCases.length - 1 : event.key === "ArrowRight" ? (index + 1) % useCases.length : (index - 1 + useCases.length) % useCases.length; const next = useCases[nextIndex]; setActiveId(next.id); window.requestAnimationFrame(() => document.getElementById(`usecase-tab-${next.id}`)?.focus()); }}>{item.selector}</button>)}</div>
    <label className="lm-usecase-select">Industry example<select value={activeId} onChange={(event) => setActiveId(event.target.value)}>{useCases.map((item) => <option key={item.id} value={item.id}>{item.selector}</option>)}</select></label>
    <p className="lm-reference-disclosure">{referenceDisclosure}</p>
    <article id="active-usecase" className="lm-usecase-viewer" role="tabpanel" aria-labelledby={`usecase-tab-${active.id}`}>
      <div className="lm-usecase-problem"><span>Operating problem</span><h3>{active.selector}</h3><p>{active.problem}</p><div className="lm-usecase-process"><h4>The Accountable Operations Loop</h4><ol>{["Evidence", "Understand", "Decide", "Coordinate", "Act", "Verify"].map((label, index) => <li key={label}><span>{index + 1}</span><div><strong>{label}</strong><p>{active.process[index]}</p></div></li>)}</ol></div><blockquote>{active.result}</blockquote><div className="lm-usecase-actions"><TrackedLink to={operatingScenarios[active.id as keyof typeof operatingScenarios].route} eventName="cta_explore_platform_click">Open complete use case <ArrowRight aria-hidden="true" /></TrackedLink><button ref={openButtonRef} type="button" onClick={() => setMapOpen(true)}>Open complete process map <Expand aria-hidden="true" /></button></div></div>
      <ReferenceSnapshot snapshot={snapshot} />
    </article>
    <ReferenceBasis />
    {mapOpen ? <Modal title={`${active.selector} process map`} closeRef={closeButtonRef} onClose={() => setMapOpen(false)}><div className="lm-process-modal"><span>{active.selector}</span><h3>{active.problem}</h3><figure className="lm-canonical-process-map"><img src={active.image} width="1920" height="1080" loading="lazy" alt={active.imageAlt} /><figcaption>Canonical condition-to-outcome reference process map. Numerical operating criteria are shown below from the matching use-case contract.</figcaption></figure><p className="lm-reference-disclosure">{referenceDisclosure}</p><ReferenceSnapshot snapshot={snapshot} /><p>{active.result}</p></div></Modal> : null}
  </PlatformSection>;
}

function ReferenceSnapshot({ snapshot }: { snapshot: (typeof industrySnapshots)[keyof typeof industrySnapshots] }) {
  return <section className="lm-reference-snapshot" aria-label="Illustrative reference operating snapshot"><header><span>Reference operating snapshot</span><strong>{snapshot.owner}</strong><small>{snapshot.context}</small></header><MeasurementList measurements={snapshot.incident} columns={2} />{"derived" in snapshot ? <p className="lm-reference-derived"><Info aria-hidden="true" />{snapshot.derived}</p> : null}<div className="lm-reference-recovery"><h4>Reference recovery</h4><ul>{snapshot.recovery.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div><blockquote>{snapshot.result}</blockquote></section>;
}

function ReferenceBasis() {
  return <details className="lm-reference-basis"><summary>Reference data basis <ChevronDown aria-hidden="true" /></summary><div><p>Published sources support technical reasonableness; asterisked bands and criteria remain illustrative configuration assumptions requiring customer approval.</p><ul><li><a href="https://www.ashrae.org/file%20library/technical%20resources/bookstore/supplemental%20files/therm-gdlns-5th-r-e-refcard.pdf" target="_blank" rel="noreferrer">ASHRAE equipment thermal guidelines</a></li><li><a href="https://www.facilities.vt.edu/content/dam/facilities_vt_edu/design-and-construction-standards/appendices/app-j-bas-standards-sequence-of-operations.pdf" target="_blank" rel="noreferrer">Virginia Tech BAS standards</a></li><li><a href="https://www.energy.gov/sites/default/files/2016/03/f30/Improving%20Compressed%20Air%20Sourcebook%20version%203.pdf" target="_blank" rel="noreferrer">U.S. DOE Compressed Air Sourcebook</a></li><li><a href="https://www.xylem.com/siteassets/support/tekniska-rapporter/white-papers-pdf/integrated_intelligence_white_paper.pdf" target="_blank" rel="noreferrer">Xylem wastewater pumping reference</a></li><li><a href="https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely" target="_blank" rel="noreferrer">FDA food-storage guidance</a></li><li><a href="https://assets.danfoss.com/documents/latest/469584/AI241486443133en-001404.pdf" target="_blank" rel="noreferrer">Danfoss superheat reference</a></li><li><a href="https://prod-edam.honeywell.com/content/dam/honeywell-edam/pmt/oneam/en-us/refrigerants/documents/pmt-am-refrigeration-ac-pressure-temp-charts-tech-tool1.pdf" target="_blank" rel="noreferrer">Honeywell R-448A pressure-temperature reference</a></li></ul></div></details>;
}

function ClosingSection() {
  return <section className="lm-platform-closing"><div><header><p className="lm-eyebrow">Bring one operating response into view</p><h2>Show us where the response breaks between systems.</h2><p>Choose one operating issue, identify the systems and people it crosses, and define the measurements that would establish the result. That is enough to begin a focused Last Mile reference design.</p></header><ol>{startSteps.map((item, index) => <li key={item}><span>{index + 1}</span><strong>{item}</strong></li>)}</ol><p className="lm-threshold-note"><ShieldCheck aria-hidden="true" />Last Mile does not invent the customer’s operating thresholds. The operating team defines the acceptable bands, authority boundaries, and proof criteria.</p><div className="lm-platform-actions"><TrackedLink className="lm-platform-button lm-platform-button--primary" to="/contact?intent=operation" eventName="cta_contact_click">Discuss Your Operation <ArrowRight aria-hidden="true" /></TrackedLink><TrackedLink className="lm-platform-button lm-platform-button--secondary" to="/use-cases/data-center-cooling" eventName="cta_explore_platform_click">Explore Data Center Cooling</TrackedLink></div></div></section>;
}

function PlatformSection({ eyebrow, title, intro, tone, id, wide = false, sectionRef, children }: { eyebrow: string; title: string; intro?: string; tone: "white" | "wash"; id?: string; wide?: boolean; sectionRef?: React.RefObject<HTMLElement | null>; children: ReactNode }) {
  return <section ref={sectionRef} id={id} className={`lm-platform-section lm-platform-section--${tone}`}><div className={`lm-platform-container${wide ? " lm-platform-container--wide" : ""}`}><header className="lm-platform-section__head"><p className="lm-eyebrow">{eyebrow}</p><h2>{title}</h2>{intro ? <p>{intro}</p> : null}</header>{children}</div></section>;
}

function useModalFocus(open: boolean, setOpen: (open: boolean) => void, triggerRef: React.RefObject<HTMLButtonElement | null>, closeRef: React.RefObject<HTMLButtonElement | null>) {
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const dialog = closeRef.current?.closest<HTMLElement>("[role='dialog']");
        const focusable = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>("button, a[href], select, [tabindex]:not([tabindex='-1'])")).filter((element) => !element.hasAttribute("disabled")) : [];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.body.classList.add("lm-modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("lm-modal-open");
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [closeRef, open, setOpen, triggerRef]);
}

function Modal({ title, closeRef, onClose, children }: { title: string; closeRef: React.RefObject<HTMLButtonElement | null>; onClose: () => void; children: ReactNode }) {
  return <div className="lm-platform-modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="lm-platform-modal__panel"><header><strong>{title}</strong><button ref={closeRef} type="button" onClick={onClose} aria-label={`Close ${title}`}><X aria-hidden="true" /></button></header>{children}</div></div>;
}
