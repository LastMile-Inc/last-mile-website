import type { CSSProperties } from "react";
import { OperationalIcon, type OperationalIconKind } from "@/app/components/OperationalIcon";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink } from "@/app/components/NarrativeComponents";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

const sourceFamilies: ReadonlyArray<{ label: string; detail: string; kind: OperationalIconKind }> = [
  { label: "MQTT + SPARKPLUG", detail: "Message topics, contents, connection sessions, and sending-system context", kind: "signal" },
  { label: "OPC UA", detail: "Information models, events, history, and source quality", kind: "control-system" },
  { label: "BACNET + MODBUS", detail: "Customer-approved building and local connection outputs", kind: "production" },
  { label: "HISTORIANS + APIs", detail: "Time-series history, industrial platforms, and services", kind: "operational-data" },
  { label: "GOVERNED FILES", detail: "JSON, repository-managed files, and spreadsheets", kind: "resource" },
] as const;

const priorityLanes = [
  { label: "P0", name: "Critical events", copy: "Advance immediately", action: "MOVE NOW", progress: "92%" },
  { label: "P1", name: "Operating state", copy: "Preserve complete state changes", action: "FOLLOW", progress: "74%" },
  { label: "P2", name: "Standard telemetry", copy: "Control batching and pressure", action: "REGULATE", progress: "52%" },
  { label: "P3", name: "High-rate + backfill", copy: "Buffer and recover by policy", action: "WAIT SAFELY", progress: "28%" },
] as const;

const handoffSteps: ReadonlyArray<{ label: string; title: string; copy: string; kind: OperationalIconKind }> = [
  { label: "PRESERVE", title: "Keep the source identity", copy: "Retain the broker, topic, endpoint, point, device, register, timestamp, session, and original quality context.", kind: "evidence" },
  { label: "QUALIFY", title: "Check time and quality", copy: "Classify freshness, replay, duplicates, retained state, mapping status, and policy before a record can influence the operation.", kind: "signal" },
  { label: "STRUCTURE", title: "Prepare one operating record", copy: "Map the accepted record for Singularity while keeping a reversible crosswalk to the source that produced it.", kind: "context" },
] as const;

const testProfile = ["Sustained rate", "Burst rate", "Message size", "Connected sources", "Recovery time", "Offline storage window"] as const;

export function InfinitSignalPage() {
  const description = "Infinit-Signal is the high-velocity industrial intake engine that preserves source meaning, protects critical traffic, and prepares trusted records for Singularity.";
  return <>
    <SEO title="Infinit-Signal | Built for Volume and Industrial Data Velocity" description={description} canonicalPath="/infinit-signal" jsonLd={[createProductSchema("Infinit-Signal", "/infinit-signal", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Infinit-Signal", path: "/infinit-signal" }])]} />
    <main className="lm-v2-page lm-product-story-page lm-product-story-page--signal lm-signal-story lm-signal-v5">
      <EditorialHero
        eyebrow="INFINIT-SIGNAL · HIGH-VOLUME INDUSTRIAL INTAKE"
        title="Keep telemetry intact from the edge to the enterprise."
        intro="Infinit-Signal takes in alarms, measurements, state changes, history, and replay without flattening them into anonymous values. The original source, timestamp, equipment identity, and quality stay attached as traffic moves upstream."
        support="Configured OPC UA, Modbus, MQTT, Sparkplug, historian, API, and governed file sources enter one priority-aware intake path before accepted records move to Singularity."
        primary={{ label: "Review the Intake Architecture", to: "/infinit-signal#intake-architecture" }}
        secondary={{ label: "Review Engineering Targets", to: "/infinit-signal#scale-engineering" }}
        visual={<SignalHyperscaleHero />}
      />

      <EditorialSection
        id="intake-architecture"
        eyebrow="THE DATA-VOLUME PROBLEM"
        title="The plant is already producing the data. The hard part is moving it with meaning intact."
        intro="A high-rate stream is useful only when the receiver still knows which machine produced it, when it happened, whether the value is current, and whether replay or duplication changed the story. Infinit-Signal is built around that intake problem."
        className="lm-signal-zettabyte-section"
      >
        <div className="lm-signal-zettabyte-layout">
          <article className="lm-signal-zettabyte-stat"><span>IDC 2019 FORECAST FOR 2025</span><strong>79.4 ZB</strong><h3>Roughly 80 zettabytes across connected IoT devices.</h3><p>IDC forecast that 41.6 billion connected IoT devices would generate 79.4 ZB of data in 2025. The figure covers IoT broadly, not industrial IoT alone. The operating lesson is still clear: volume without source context, time, and quality is not ready for an industrial decision.</p><a href="https://www.telecomtv.com/content/iot/the-growth-in-connected-iot-devices-is-expected-to-generate-79-4zb-of-data-in-2025-according-to-a-new-idc-forecast-35522/" target="_blank" rel="noreferrer">Review the IDC forecast summary</a></article>
          <div className="lm-signal-source-matrix"><header><span>MEET THE SOURCES WHERE THEY ARE</span><strong>Keep the plant model. Check the incoming data.</strong></header>{sourceFamilies.map((source) => <article key={source.label}><OperationalIcon kind={source.kind} size="medium" /><div><h3>{source.label}</h3><p>{source.detail}</p></div></article>)}<p>These source types connect through customer-approved connection methods or versioned setup files. In exact product terms, Infinit-Signal is designed for configured MQTT, Sparkplug, OPC UA, BACnet, Modbus, historian, industrial platform, API, and governed file source families through customer-approved adapters or versioned Source Platform Profiles.</p></div>
        </div>
        <div className="lm-signal-source-link"><InlineLink to="/resources/industrial-concepts/opc-ua">See how Infinit-Signal preserves OPC UA source meaning</InlineLink></div>
      </EditorialSection>

      <EditorialSection
        eyebrow="PRIORITY ROUTING WITHOUT DELAYS"
        title="Critical events move now. Backfill waits without freezing the current picture."
        intro="A recovered connection can release a wall of historical traffic just as a new alarm arrives. Infinit-Signal separates those workloads so live critical records are not trapped behind replay."
        tone="grid"
        className="lm-signal-priority-section"
      >
        <figure className="lm-signal-priority-image">
          <img src="/images/products/infinit-signal/zero-block-priority-routing-v2.png" alt="Four industrial data lanes route critical events ahead of buffered historical backfill while the control room remains active." width="1672" height="941" loading="lazy" />
          <figcaption><span>P0 · CRITICAL</span><strong>Priority traffic bypasses the queue</strong><span>P3 · BACKFILL</span></figcaption>
        </figure>
        <SignalScaleRunway />
      </EditorialSection>

      <EditorialSection
        eyebrow="AI-READY HANDOFF"
        title="Industrial AI needs qualified operating records, not a larger pile of raw telemetry."
        intro="Infinit-Signal preserves source meaning, aligns time, applies the configured quality rules, and creates a record Singularity can use. Customer-authorized enterprise workflow destinations can receive governed outputs without becoming the source of plant truth."
        className="lm-signal-handoff-section"
      >
        <div className="lm-signal-handoff-layout">
          <figure className="lm-signal-handoff-image"><img src="/images/products/infinit-signal/ai-ready-handoff-v2.png" alt="Plant telemetry passes through a governed Infinit-Signal qualification engine before entering Singularity and customer-authorized enterprise workflows." width="1672" height="941" loading="lazy" /></figure>
          <div className="lm-signal-handoff-steps">{handoffSteps.map((step, index) => <article key={step.label}><span>{String(index + 1).padStart(2, "0")}</span><OperationalIcon kind={step.kind} size="medium" /><div><b>{step.label}</b><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
        </div>
      </EditorialSection>

      <EditorialSection
        eyebrow="YOUR UNS STAYS YOURS"
        title="Read the live fabric without taking it over."
        intro="Building a useful UNS takes real time and hard-won plant knowledge. Teams learn the equipment, name the signals, establish topic structures, and keep that model working as the operation changes. Infinit-Signal respects that investment and carries it forward."
        tone="grid"
        className="lm-signal-uns-section"
      >
        <div className="lm-signal-uns-layout">
          <SignalUnsProgression />
          <div className="lm-signal-uns-copy"><span>LIVE DATA + MANAGED MAPPING</span><h3>The UNS remains the customer&apos;s communication and discovery fabric.</h3><p>A Unified Namespace, or UNS, is the shared naming structure that makes current plant information easier to find. Infinit-Signal reads only the subscriptions you configure and keeps the broker, sending system, topic, connection session, timestamp, quality, saved state, and replay details your teams established. JSON, repository-managed files, and spreadsheets can separately supply data formats, mappings, and name matches. The source stays recognizable, and the plant does not have to start over around Last Mile.</p><div className="lm-signal-mapping-formats" aria-label="Mapping and setup file formats"><b>JSON</b><b>REPOSITORY</b><b>SPREADSHEET</b></div></div>
        </div>
        <InlineLink to="/resources/industrial-concepts/uns-and-ssom">See how the UNS and Singularity work together</InlineLink>
      </EditorialSection>

      <EditorialSection
        id="scale-engineering"
        eyebrow="UNRELENTING SCALE ENGINEERING"
        title="Know exactly what the intake path can carry."
        intro="Every deployment has a different mix of live traffic, bursts, and recovery load. The test plan must match that operation before the numbers mean anything."
        className="lm-signal-target-section"
      >
        <div className="lm-signal-target-layout">
          <div className="lm-signal-targets"><article><span>ENGINEERING TARGET</span><strong>Millions</strong><h3>Events per second</h3><p>The current engineering target is millions of events per second at global enterprise scale.</p></article><article><span>ENGINEERING OBJECTIVE</span><strong>Zero</strong><h3>Accepted P0 records lost</h3><p>The engineering objective is zero data loss for accepted P0 critical records inside a declared deployment profile.</p></article><article><span>DESIGN OBJECTIVE</span><strong>24×7×365</strong><h3>Continuous intake</h3><p>Infinit-Signal is designed for priority-aware continuous 24x7x365 intake with backpressure isolation and controlled recovery.</p></article></div>
          <div className="lm-signal-test-profile"><header><OperationalIcon kind="command" size="large" /><div><span>DECLARED WORKLOAD PROFILE</span><h3>Test the exact load the deployment must carry.</h3></div></header><ul>{testProfile.map((item) => <li key={item}>{item}</li>)}</ul><p>Target values remain targets until the matching workload profile and repeatable benchmark evidence are approved.</p></div>
        </div>
      </EditorialSection>
    </main>
  </>;
}

function SignalHyperscaleHero() {
  return <figure className="lm-signal-hyperscale-hero"><img src="/images/products/infinit-signal/hyperscale-ingestion-hero-v2.png" alt="A high-volume industrial signal stream enters an engineered intake ring and leaves as ordered operating data." width="1672" height="941" fetchPriority="high" /><figcaption><span>RAW INDUSTRIAL TRAFFIC</span><strong>Preserve · Qualify · Prioritize · Structure</strong><span>SINGULARITY READY</span></figcaption></figure>;
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
