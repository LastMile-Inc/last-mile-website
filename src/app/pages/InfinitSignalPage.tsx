import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { OperationalIcon, type OperationalIconKind } from "@/app/components/OperationalIcon";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink } from "@/app/components/NarrativeComponents";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

const sourceFamilies: ReadonlyArray<{ label: string; detail: string; kind: OperationalIconKind }> = [
  { label: "MQTT + UNS", detail: "Brokers, topics, sessions, and publisher context", kind: "signal" },
  { label: "INDUSTRIAL OT", detail: "SCADA, BMS, MES, Sparkplug, and OPC UA", kind: "control-system" },
  { label: "DATA PLATFORMS", detail: "Historians, Industrial IoT, APIs, and services", kind: "operational-data" },
  { label: "GOVERNED FILES", detail: "JSON, repository-managed files, and spreadsheets", kind: "resource" },
];

const implementationSteps: ReadonlyArray<{ label: string; title: string; copy: string; kind: OperationalIconKind }> = [
  { label: "UNDERSTAND", title: "Learn how the source works.", copy: "Start with the broker, platform, file, tag, topic, timing, and quality rules already in use.", kind: "context" },
  { label: "MAP", title: "Keep the meaning you trust.", copy: "Preserve the source identity and map it through a governed, versioned profile instead of flattening it away.", kind: "evidence" },
  { label: "MOVE", title: "Begin with the smallest useful path.", copy: "Connect one approved scope, confirm the flow, then expand without forcing a plant-wide rebuild.", kind: "flow" },
];

const priorityLanes = [
  { label: "P0", name: "Critical events", copy: "Advance immediately", action: "MOVE NOW", progress: "92%" },
  { label: "P1", name: "Operating state", copy: "Preserve complete state changes", action: "FOLLOW", progress: "74%" },
  { label: "P2", name: "Standard telemetry", copy: "Control batching and pressure", action: "REGULATE", progress: "52%" },
  { label: "P3", name: "High-rate + backfill", copy: "Buffer and recover by policy", action: "WAIT SAFELY", progress: "28%" },
] as const;

export function InfinitSignalPage() {
  const description = "Infinit-Signal connects to existing industrial sources and provides a governed, scalable path for operational data to enter Last Mile.";

  return <>
    <SEO title="Infinit-Signal | Industrial Data Intake Built for Speed and Scale" description={description} canonicalPath="/infinit-signal" jsonLd={[createProductSchema("Infinit-Signal", "/infinit-signal", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Infinit-Signal", path: "/infinit-signal" }])]} />
    <main className="lm-v2-page lm-product-story-page lm-product-story-page--signal lm-signal-story">
      <EditorialHero
        eyebrow="INFINIT-SIGNAL · SPEED + SCALE"
        title="One fast path from your plant floor into Last Mile."
        intro="Infinit-Signal is built for the production ecosystem already in place. It learns how your sources are organized, connects through customer-approved paths, and gets useful data into Last Mile with as little disruption as your architecture allows."
        support="Infinit-Signal connects to the operational sources you already run, preserves where each reading came from, checks its time and quality, and prepares it for Singularity."
        primary={{ label: "Discuss Your Source Environment", to: "/contact?intent=architecture" }}
        secondary={{ label: "See How Singularity Learns", to: "/singularity" }}
        visual={<SignalIntakeHero />}
      />

      <EditorialSection
        eyebrow="THE FASTEST SAFE PATH IN"
        title="Start with the systems that already know the plant."
        intro="A faster implementation begins with understanding, not replacement. Infinit-Signal meets each source on its own terms, keeps its strongest meaning intact, and expands from a small approved scope as the architecture proves itself."
        className="lm-signal-onramp-section"
      >
        <div className="lm-signal-onramp">
          {implementationSteps.map((step, index) => <article key={step.label}>
            <OperationalIcon kind={step.kind} size="medium" />
            <div><span>{step.label}</span><h3>{step.title}</h3><p>{step.copy}</p></div>
            {index < implementationSteps.length - 1 ? <ArrowRight aria-hidden="true" /> : null}
          </article>)}
        </div>
        <InlineLink to="/resources/industrial-concepts/opc-ua">See how Infinit-Signal preserves OPC UA source meaning</InlineLink>
      </EditorialSection>

      <EditorialSection
        eyebrow="YOUR UNS STAYS YOURS"
        title="Read the live fabric without taking it over."
        intro="Building a useful UNS takes real time and hard-won plant knowledge. Teams learn the equipment, name the signals, establish topic structures, and keep that model working as the operation changes. Infinit-Signal is designed to respect that investment and carry it forward."
        tone="grid"
        className="lm-signal-uns-section"
      >
        <div className="lm-signal-uns-layout">
          <SignalUnsProgression />
          <div className="lm-signal-uns-copy">
            <span>LIVE DATA + GOVERNED MAPPING</span>
            <h3>The UNS remains the customer&apos;s communication and discovery fabric.</h3>
            <p>Infinit-Signal consumes only the subscriptions you configure and preserves the broker, publisher, topic, session, timestamp, quality, retained state, and replay context your teams worked to establish. JSON, repository-managed files, and spreadsheets can separately supply schemas, mappings, and crosswalks in the format your teams already maintain. The source stays recognizable, and the plant does not have to start over around Last Mile.</p>
            <div className="lm-signal-mapping-formats" aria-label="Supported mapping and configuration formats"><b>JSON</b><b>REPOSITORY</b><b>SPREADSHEET</b></div>
          </div>
        </div>
        <InlineLink to="/resources/industrial-concepts/uns-and-ssom">See how the UNS and Singularity work together</InlineLink>
      </EditorialSection>

      <EditorialSection
        eyebrow="KEEP CURRENT OPERATIONS AHEAD OF BACKLOG"
        title="Critical signals should never wait behind a data replay."
        intro="When alarms burst, connections recover, or historical data returns, Infinit-Signal moves the work that matters now ahead of traffic that can wait. Lower-priority data is controlled and recovered without blocking the current operating picture."
        className="lm-signal-scale-section"
      >
        <SignalScaleRunway />
        <div className="lm-signal-test-discipline">
          <OperationalIcon kind="command" size="large" />
          <div><span>TEST THE LOAD BEFORE IT BECOMES THE LOAD</span><h3>Scale is a continuing engineering discipline.</h3><p>We continuously stress-test and performance-test the intake path against declared sustained rate, burst rate, payload size, source concurrency, recovery, and store-and-forward profiles. That work is designed to keep data timely, accurate, and reliable as each customer&apos;s scope grows.</p></div>
        </div>
      </EditorialSection>

    </main>
  </>;
}

function SignalIntakeHero() {
  return <figure className="lm-signal-intake-hero" aria-labelledby="signal-intake-caption">
    <div className="lm-signal-intake-hero__sources">
      {sourceFamilies.map((source) => <article key={source.label}><OperationalIcon kind={source.kind} size="small" /><div><span>{source.label}</span><small>{source.detail}</small></div></article>)}
    </div>
    <div className="lm-signal-intake-hero__stream" aria-hidden="true"><i /><i /><i /><i /></div>
    <div className="lm-signal-intake-hero__engine">
      <OperationalIcon kind="signal" size="large" />
      <span>INFINIT-SIGNAL</span>
      <strong>Preserve the source. Qualify the flow.</strong>
      <div><b>SOURCE</b><b>TIME</b><b>QUALITY</b></div>
    </div>
    <div className="lm-signal-intake-hero__output"><span>SINGULARITY READY</span><strong>One governed stream keeps moving forward.</strong></div>
    <figcaption id="signal-intake-caption" className="lm-visually-hidden">Existing industrial sources flow through Infinit-Signal, where source, time, and quality are preserved before records move to Singularity.</figcaption>
  </figure>;
}

function SignalUnsProgression() {
  return <figure className="lm-signal-uns-architecture" tabIndex={0} aria-label="Customer UNS knowledge progression. Scroll horizontally to inspect the architecture on a small screen." aria-labelledby="signal-uns-caption">
    <svg viewBox="0 0 1000 560" role="img" aria-labelledby="signal-uns-title signal-uns-description">
      <title id="signal-uns-title">Customer UNS knowledge carried into durable operating memory</title>
      <desc id="signal-uns-description">A single architecture plate shows the customer's existing topic hierarchy entering Infinit-Signal. Infinit-Signal preserves source context, qualifies time and quality, and maps asset meaning before Singularity retains identity, relationships, history, and results.</desc>
      <defs>
        <linearGradient id="uns-plate" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#F1F3F6" /><stop offset="1" stopColor="#E7EDF3" /></linearGradient>
        <linearGradient id="uns-engine" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#FFFFFF" /><stop offset="1" stopColor="#E7EDF3" /></linearGradient>
        <linearGradient id="uns-memory" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#E7EDF3" /><stop offset="1" stopColor="#A8BCCB" /></linearGradient>
        <pattern id="uns-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#A8BCCB" strokeOpacity=".2" /></pattern>
        <filter id="uns-shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#263244" floodOpacity=".12" /></filter>
      </defs>

      <rect x="2" y="2" width="996" height="556" rx="30" fill="url(#uns-plate)" stroke="#8BB4CF" />
      <rect x="14" y="14" width="972" height="532" rx="23" fill="url(#uns-grid)" />
      <text className="lm-uns-svg__kicker" x="46" y="48">CUSTOMER KNOWLEDGE, PRESERVED</text>
      <line className="lm-uns-svg__rule" x1="46" y1="66" x2="954" y2="66" />

      <g className="lm-uns-svg__source" filter="url(#uns-shadow)">
        <rect x="38" y="92" width="290" height="410" rx="18" />
        <text className="lm-uns-svg__eyebrow" x="64" y="126">CUSTOMER UNS</text>
        <text className="lm-uns-svg__title" x="64" y="158"><tspan x="64">THE PLANT MODEL</tspan><tspan x="64" dy="25">YOU ALREADY BUILT</tspan></text>
        <text className="lm-uns-svg__copy" x="64" y="211">Years of naming, mapping, and operating context</text>

        <path className="lm-uns-svg__tree" d="M78 246V424M78 260H108M78 300H108M78 340H108M78 380H108M78 420H108" />
        <g className="lm-uns-svg__topic-row">
          <circle cx="78" cy="260" r="6" /><text x="108" y="256">SITE</text><text className="lm-uns-svg__value" x="184" y="256">DEN-01</text><text className="lm-uns-svg__detail" x="108" y="274">Operating boundary</text>
          <circle cx="78" cy="300" r="6" /><text x="108" y="296">AREA</text><text className="lm-uns-svg__value" x="184" y="296">UTILITIES</text><text className="lm-uns-svg__detail" x="108" y="314">Functional context</text>
          <circle cx="78" cy="340" r="6" /><text x="108" y="336">LINE</text><text className="lm-uns-svg__value" x="184" y="336">COOLING B</text><text className="lm-uns-svg__detail" x="108" y="354">Process relationship</text>
          <circle cx="78" cy="380" r="6" /><text x="108" y="376">ASSET</text><text className="lm-uns-svg__value" x="184" y="376">CHWP-02</text><text className="lm-uns-svg__detail" x="108" y="394">Equipment identity</text>
          <circle cx="78" cy="420" r="6" /><text x="108" y="416">METRIC</text><text className="lm-uns-svg__value" x="184" y="416">MOTOR_CURRENT</text><text className="lm-uns-svg__detail" x="108" y="434">Live measurement</text>
        </g>
        <rect className="lm-uns-svg__source-band" x="64" y="456" width="238" height="24" rx="12" />
        <text className="lm-uns-svg__band-text" x="183" y="472" textAnchor="middle">NAMES · TOPICS · CONTEXT · HISTORY</text>
      </g>

      <g className="lm-uns-svg__connector lm-uns-svg__connector--in" aria-hidden="true">
        <path d="M328 298H369" /><path d="m357 287 12 11-12 11" />
        <circle cx="339" cy="298" r="4" /><circle cx="350" cy="298" r="4" /><circle cx="361" cy="298" r="4" />
      </g>

      <g className="lm-uns-svg__engine" filter="url(#uns-shadow)">
        <rect x="370" y="92" width="260" height="410" rx="18" />
        <rect className="lm-uns-svg__engine-cap" x="370" y="92" width="260" height="64" rx="18" />
        <path className="lm-uns-svg__engine-cap-mask" d="M370 138H630V156H370z" />
        <text className="lm-uns-svg__engine-name" x="500" y="126" textAnchor="middle">INFINIT-SIGNAL</text>
        <text className="lm-uns-svg__engine-sub" x="500" y="145" textAnchor="middle">CARRY THE MEANING FORWARD</text>

        <g className="lm-uns-svg__stage">
          <rect x="394" y="181" width="212" height="76" rx="9" />
          <text className="lm-uns-svg__stage-index" x="414" y="207">01</text><text className="lm-uns-svg__stage-name" x="452" y="207">PRESERVE</text>
          <text className="lm-uns-svg__stage-copy" x="452" y="229">Publisher · topic · session</text><text className="lm-uns-svg__stage-copy" x="452" y="246">Source timestamp · payload</text>
          <rect className="lm-uns-svg__stage-meter" x="414" y="235" width="22" height="4" rx="2" />
        </g>
        <g className="lm-uns-svg__stage">
          <rect x="394" y="271" width="212" height="76" rx="9" />
          <text className="lm-uns-svg__stage-index" x="414" y="297">02</text><text className="lm-uns-svg__stage-name" x="452" y="297">QUALIFY</text>
          <text className="lm-uns-svg__stage-copy" x="452" y="319">Freshness · time · quality</text><text className="lm-uns-svg__stage-copy" x="452" y="336">Duplicate · replay · policy</text>
          <rect className="lm-uns-svg__stage-meter" x="414" y="325" width="22" height="4" rx="2" />
        </g>
        <g className="lm-uns-svg__stage">
          <rect x="394" y="361" width="212" height="76" rx="9" />
          <text className="lm-uns-svg__stage-index" x="414" y="387">03</text><text className="lm-uns-svg__stage-name" x="452" y="387">MAP</text>
          <text className="lm-uns-svg__stage-copy" x="452" y="409">Source identity · asset</text><text className="lm-uns-svg__stage-copy" x="452" y="426">Relationship · version</text>
          <rect className="lm-uns-svg__stage-meter" x="414" y="415" width="22" height="4" rx="2" />
        </g>
        <path className="lm-uns-svg__engine-spine" d="M382 156V468" />
        <circle className="lm-uns-svg__engine-pulse" cx="382" cy="468" r="7" />
        <text className="lm-uns-svg__engine-output" x="500" y="489" textAnchor="middle">ACCEPTED OPERATING RECORD</text>
      </g>

      <g className="lm-uns-svg__connector lm-uns-svg__connector--out" aria-hidden="true">
        <path d="M630 298H671" /><path d="m659 287 12 11-12 11" />
        <circle cx="641" cy="298" r="4" /><circle cx="652" cy="298" r="4" /><circle cx="663" cy="298" r="4" />
      </g>

      <g className="lm-uns-svg__memory" filter="url(#uns-shadow)">
        <rect x="672" y="92" width="290" height="410" rx="18" />
        <text className="lm-uns-svg__eyebrow" x="698" y="126">SINGULARITY</text>
        <text className="lm-uns-svg__title" x="698" y="158"><tspan x="698">DURABLE OPERATING</tspan><tspan x="698" dy="25">MEMORY</tspan></text>
        <text className="lm-uns-svg__copy" x="698" y="211">The source stays visible as knowledge accumulates</text>

        <g className="lm-uns-svg__memory-stack">
          <path d="M714 246H918L936 260 918 274H714L696 260z" /><text x="816" y="264" textAnchor="middle">ASSET IDENTITY</text>
          <path d="M714 286H918L936 300 918 314H714L696 300z" /><text x="816" y="304" textAnchor="middle">RELATIONSHIPS</text>
          <path d="M714 326H918L936 340 918 354H714L696 340z" /><text x="816" y="344" textAnchor="middle">TIME-CORRECT HISTORY</text>
          <path d="M714 366H918L936 380 918 394H714L696 380z" /><text x="816" y="384" textAnchor="middle">DECISIONS + ACTIONS</text>
          <path d="M714 406H918L936 420 918 434H714L696 420z" /><text x="816" y="424" textAnchor="middle">MEASURED RESULTS</text>
        </g>
        <path className="lm-uns-svg__memory-loop" d="M718 462H890c24 0 36-13 36-31" />
        <path className="lm-uns-svg__memory-arrow" d="m917 443 9-12 9 12" />
        <text className="lm-uns-svg__memory-foot" x="718" y="483">AVAILABLE TO THE NEXT RESPONSE</text>
      </g>
    </svg>
    <figcaption id="signal-uns-caption" className="lm-visually-hidden">The customer UNS remains intact. Infinit-Signal preserves, qualifies, and maps its source meaning before Singularity retains durable operating memory.</figcaption>
  </figure>;
}

function SignalScaleRunway() {
  return <figure className="lm-signal-scale-runway" aria-labelledby="signal-scale-caption">
    <div className="lm-signal-scale-runway__header"><span>WORKLOADS MOVE BY OPERATING PRIORITY</span><strong>Critical events move first. Backfill waits without blocking the plant.</strong></div>
    <div className="lm-signal-scale-runway__lanes">
      {priorityLanes.map((lane) => <article key={lane.label}>
        <span>{lane.label}</span>
        <div><strong>{lane.name}</strong><small>{lane.copy}</small></div>
        <i aria-hidden="true" style={{ "--lm-lane-progress": lane.progress } as CSSProperties} />
        <b>{lane.action}</b>
      </article>)}
    </div>
    <div className="lm-signal-scale-runway__result"><OperationalIcon kind="verification" size="medium" /><div><span>VISIBLE INTAKE DECISIONS</span><strong>Accepted · Warning · Quarantined · Rejected · Duplicate · Replay</strong></div></div>
    <figcaption id="signal-scale-caption">Infinit-Signal is designed for priority-aware 24x7 ingestion and backpressure isolation.</figcaption>
  </figure>;
}
