import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Database,
  Gauge,
  Network,
  Radio,
  RefreshCw,
  Route,
  ShieldCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { CtaLink } from "@/app/components/MarketingComponents";
import { EditorialSection, NextStep } from "@/app/components/NarrativeComponents";
import { TrackedLink } from "@/app/components/TrackedLink";
import { operatingScenarioList } from "@/app/pages/platformReferenceData";
import { createOrganizationSchema, createWebsiteSchema } from "@/app/lib/structuredData";

type LoopStage = {
  number: string;
  name: string;
  headline: string;
  copy: string;
  note?: string;
};

const audiencePaths = [
  {
    role: "Enterprise Architects",
    label: "Technical briefing",
    to: "/platform",
    copy: "See the four-product contract, system boundaries, and governed handoffs first.",
  },
  {
    role: "Plant Managers",
    label: "Operating references",
    to: "/use-cases",
    copy: "Start with recognizable failures, ownership, escalation, and proof criteria.",
  },
  {
    role: "OT Engineers",
    label: "Evidence and data handoffs",
    to: "/infinit-signal",
    copy: "Inspect how source evidence is qualified before orchestration and operator views begin.",
  },
] as const;

const loopStages: readonly LoopStage[] = [
  { number: "01", name: "Evidence", headline: "Know what actually happened.", copy: "Establish trustworthy physical evidence with source, time, quality, lineage, and provenance." },
  { number: "02", name: "Understand", headline: "Know what it means here.", copy: "Connect the Condition to the relevant assets, process, topology, history, and current operating state." },
  { number: "03", name: "Decide", headline: "Determine what should happen next.", copy: "Evaluate context, policy, and consequence to determine the appropriate response: AUTO, ASSIST, or no action.", note: "Not every Condition requires maintenance. Not every Condition requires action." },
  { number: "04", name: "Coordinate", headline: "Bring the right participants together.", copy: "Orchestrate the required response across operators, controls, CMMS, MES, QMS, ERP, and other systems already in place." },
  { number: "05", name: "Act", headline: "Execute through the right system.", copy: "Initiate maintenance, inspection, operator action, production change, approved control action, or another governed response." },
  { number: "06", name: "Verify", headline: "Prove that it worked.", copy: "Continue observing the physical operation until evidence confirms whether the intended outcome was actually achieved.", note: "Work completed is not the same as problem solved." },
] as const;

const systemGroups: ReadonlyArray<{ label: string; systems: string; icon: LucideIcon }> = [
  { label: "Control", systems: "PLC · DCS · SCADA · BMS", icon: Gauge },
  { label: "Operational data", systems: "Historians · MQTT · UNS · OPC UA", icon: Database },
  { label: "Execution", systems: "CMMS · EAM · MES · QMS · ERP", icon: Route },
  { label: "People", systems: "Operators · Maintenance · Engineering · Management", icon: Users },
] as const;

const products: ReadonlyArray<{ name: string; role: string; copy: string; detail: string; route: string; icon: LucideIcon }> = [
  { name: "Infinit-Signal", role: "Observe + qualify", copy: "Qualifies operational evidence before the rest of the platform uses it.", detail: "Source authority, time, quality, replay, and mapping before canonical acceptance.", route: "/infinit-signal", icon: Radio },
  { name: "Singularity", role: "Understand + connect", copy: "Creates the shared operational memory for identity, topology, Conditions, and Outcomes.", detail: "One durable operational context across OT, data, work, and provider systems.", route: "/singularity", icon: Network },
  { name: "Infinit-Flow", role: "Orchestrate + execute", copy: "Carries one accountable case across people, approvals, systems, providers, and return checks.", detail: "The orchestration engine for governed action without taking customer authority away.", route: "/infinit-flow", icon: Workflow },
  { name: "Infinit-Control", role: "See + govern", copy: "Puts the active condition, response, authority, and resulting state in front of every role.", detail: "Visibility is the final presentation layer, not the source of truth on its own.", route: "/infinit-control", icon: ShieldCheck },
] as const;

const enterpriseSystems = [
  "SCADA / DCS / PLC / BMS",
  "MQTT / OPC UA / UNS / Historians",
  "CMMS / EAM / work-management platforms",
  "MES / QMS / ERP",
  "Service providers and field crews",
] as const;

const trustPillars: ReadonlyArray<{ title: string; copy: string; icon: LucideIcon }> = [
  { title: "Evidence lineage", copy: "Every consequential state can be traced back to qualified source evidence and time context.", icon: Database },
  { title: "Replay and deduplication", copy: "Duplicate, stale, replayed, and quarantined records stay visible instead of silently shaping decisions.", icon: RefreshCw },
  { title: "Authority boundaries", copy: "AUTO, ASSIST, and HUMAN AUTHORITY stay explicit around every step that matters operationally.", icon: ShieldCheck },
  { title: "Tenant isolation and audit", copy: "Cross-site learning remains governed while customer truth, authority, and evidence boundaries stay separate.", icon: Users },
  { title: "Verified outcome", copy: "The loop closes only when return telemetry proves the physical result in the operating environment.", icon: CheckCircle2 },
] as const;

export function HomePage() {
  const description = "Last Mile is the orchestration layer for physical operations, connecting evidence, response, and verified outcomes across the systems an enterprise already runs.";

  return <>
    <SEO
      title="Last Mile | The Physical Operations Platform"
      description={description}
      canonicalPath="/"
      markdownPath="/index.md"
      keywords="physical operations platform, accountable operations loop, industrial orchestration layer, verified outcomes, enterprise OT orchestration"
      jsonLd={[createOrganizationSchema(), createWebsiteSchema()]}
    />
    <div className="lm-v2-page lm-home-repositioned">
      <HomepageHero />
      <AccountabilityGap />
      <AccountableOperationsLoop />
      <ProductMapping />
      <IndustryUseCases />
      <EnterpriseTrust />
      <NextStep
        eyebrow="START WITH ONE CONSEQUENTIAL FAILURE"
        title="Bring one operating breakdown into view."
        copy="Turn fragmented operational evidence into coordinated action and verified outcomes without replacing the systems already running your business."
        label="Discuss Your Operation"
        to="/contact?intent=operation"
        secondary={{ label: "Explore Operating Use Cases", to: "/use-cases" }}
      />
    </div>
  </>;
}

function HomepageHero() {
  return <header className="lm-home-new-hero">
    <div className="lm-v2-container lm-home-new-hero__grid">
      <div className="lm-home-new-hero__copy">
        <p className="lm-eyebrow">ENTERPRISE ORCHESTRATION FOR PHYSICAL OPERATIONS</p>
        <h1>Everything was green. <span>The line still failed.</span></h1>
        <p>Last Mile is the orchestration layer for physical operations across the OT, data, work, and service systems you already run.</p>
        <p>When a consequential operating condition crosses system boundaries, Last Mile keeps the evidence, context, response, authority, and proof connected until the physical outcome is established.</p>
        <strong>The Accountable Operations Loop turns fragmented signals into one accountable operating response.</strong>
        <div className="lm-actions">
          <CtaLink to="/#accountable-operations-loop" eventName="cta_explore_platform_click">See the Accountable Operations Loop</CtaLink>
          <CtaLink to="/contact?intent=operation" variant="secondary">Discuss Your Operation</CtaLink>
        </div>
      </div>
      <figure className="lm-hero-thread">
        <figcaption>Connected response architecture</figcaption>
        <div className="lm-hero-thread__systems">
          {systemGroups.map(({ label, systems }) => <div key={label}><span>{label}</span><strong>{systems}</strong></div>)}
        </div>
        <div className="lm-hero-thread__bus" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="lm-hero-thread__layer">
          <span>Last Mile orchestration layer</span>
          <strong>The Accountable Operations Loop</strong>
          <div>
            {loopStages.map((stage) => <em key={stage.name}>{stage.name}</em>)}
          </div>
        </div>
        <div className="lm-hero-thread__outcome">
          <CheckCircle2 aria-hidden="true" />
          <strong>Qualified condition - coordinated response - verified outcome</strong>
          <RefreshCw aria-hidden="true" />
        </div>
      </figure>
    </div>
    <div className="lm-v2-container">
      <div className="lm-audience-paths" aria-label="Audience pathways by technical depth">
        {audiencePaths.map((path) => <TrackedLink key={path.role} to={path.to} eventName="cta_explore_platform_click" className="lm-audience-path">
          <span>{path.role}</span>
          <strong>{path.label}</strong>
          <p>{path.copy}</p>
          <ArrowRight aria-hidden="true" />
        </TrackedLink>)}
      </div>
    </div>
    <p className="lm-home-new-hero__footer">Choose the operating story that matches your role. Technical depth stays explicit.</p>
  </header>;
}

function AccountabilityGap() {
  return <EditorialSection
    eyebrow="THE ACCOUNTABILITY GAP"
    title="Everything was green. The line still failed."
    intro="That is what brownfield operations look like when every system reports its own state but no platform owns the accountable response across them."
  >
    <div className="lm-system-gap" aria-label="Existing systems and the Last Mile orchestration layer">
      <div className="lm-system-gap__families">
        {systemGroups.map(({ label, systems, icon: Icon }) => <article key={label}><Icon aria-hidden="true" /><span>{label}</span><strong>{systems}</strong></article>)}
      </div>
      <div className="lm-system-gap__connectors" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="lm-system-gap__layer">
        <span>Last Mile</span>
        <strong>The orchestration layer for physical operations keeps one condition, one response, and one proof boundary intact.</strong>
      </div>
    </div>
    <div className="lm-home-prose-pair">
      <p>Enterprise plants already run on a stack of control systems, historians, work platforms, enterprise systems, and provider relationships assembled over years. Each system is legitimate. Each one sees only part of the operating story.</p>
      <div>
        <strong>The gap is not missing telemetry. The gap is missing orchestration.</strong>
        <p>Last Mile closes that gap by carrying the same accountable condition across evidence qualification, context, governed action, and verified result without taking control away from the systems or people that retain authority.</p>
      </div>
    </div>
    <aside className="lm-cmms-once">
      <span aria-hidden="true"><CheckCircle2 /></span>
      <p><strong>A CMMS manages maintenance work.</strong> Last Mile determines when maintenance is the right response, coordinates what else must happen around it, and keeps watching until the operating outcome is proven.</p>
    </aside>
  </EditorialSection>;
}

function AccountableOperationsLoop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const [animatedStage, setAnimatedStage] = useState(-1);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    loopStages.forEach((_, index) => timersRef.current.push(window.setTimeout(() => setAnimatedStage(index), 240 + index * 520)));
    timersRef.current.push(window.setTimeout(() => setAnimatedStage(0), 240 + loopStages.length * 520));
    timersRef.current.push(window.setTimeout(() => setAnimatedStage(-1), 240 + loopStages.length * 520 + 420));
  }, [clearTimers]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!("IntersectionObserver" in window)) { play(); return clearTimers; }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      play();
      observer.disconnect();
    }, { threshold: .16, rootMargin: "0px 0px -8%" });
    observer.observe(root);
    return () => { observer.disconnect(); clearTimers(); };
  }, [clearTimers, play]);

  const activeStage = selectedStage ?? animatedStage;

  return <section id="accountable-operations-loop" className="lm-premium-loop-section" aria-labelledby="premium-loop-heading">
    <div className="lm-v2-container">
      <header className="lm-premium-loop-section__head">
        <p className="lm-eyebrow">THE ACCOUNTABLE OPERATIONS LOOP</p>
        <h2 id="premium-loop-heading">The operating model buyers can audit.</h2>
        <p><strong>From physical evidence to verified outcome. Then back to evidence.</strong></p>
        <div aria-label="Accountable Operations Loop stages">EVIDENCE → UNDERSTAND → DECIDE → COORDINATE → ACT → VERIFY ↻</div>
      </header>
      <div ref={rootRef} className="lm-premium-loop-composition">
        <PrecisionLoopGraphic activeStage={activeStage} onSelect={setSelectedStage} />
        <ol className="lm-premium-loop-definitions">
          {loopStages.map((stage, index) => <li key={stage.name} className={activeStage === index ? "is-active" : activeStage >= 0 ? "is-muted" : ""}>
            <button
              type="button"
              onMouseEnter={() => setSelectedStage(index)}
              onMouseLeave={() => setSelectedStage(null)}
              onFocus={() => setSelectedStage(index)}
              onBlur={() => setSelectedStage(null)}
              aria-label={`${stage.number} ${stage.name}: ${stage.headline}`}
            >
              <span>{stage.number}</span><div><em>{stage.name}</em><strong>{stage.headline}</strong><p>{stage.copy}</p>{stage.note ? <small>{stage.note}</small> : null}</div>
            </button>
          </li>)}
        </ol>
      </div>
      <div className="lm-premium-loop-payoff"><RefreshCw aria-hidden="true" /><div><strong>Every verified outcome becomes evidence for the next operational decision.</strong><p>Every operational decision should be better informed than the one before it.</p></div></div>
    </div>
  </section>;
}

function PrecisionLoopGraphic({ activeStage, onSelect }: { activeStage: number; onSelect: (stage: number | null) => void }) {
  return <figure className="lm-precision-loop" style={{ "--active-stage": activeStage } as CSSProperties} aria-labelledby="precision-loop-caption">
    <svg viewBox="0 0 920 920" role="img" aria-labelledby="precision-loop-title precision-loop-desc">
      <title id="precision-loop-title">The Accountable Operations Loop</title>
      <desc id="precision-loop-desc">A continuous engineered ring moves clockwise through Evidence, Understand, Decide, Coordinate, Act, and Verify before returning to Evidence.</desc>
      <defs>
        <linearGradient id="loop-g0" x1="300" y1="120" x2="650" y2="170" gradientUnits="userSpaceOnUse"><stop stopColor="var(--lm-blue-dark)" /><stop offset="1" stopColor="var(--lm-blue)" /></linearGradient>
        <linearGradient id="loop-g1" x1="680" y1="170" x2="820" y2="520" gradientUnits="userSpaceOnUse"><stop stopColor="var(--lm-blue)" /><stop offset="1" stopColor="var(--lm-teal)" /></linearGradient>
        <linearGradient id="loop-g2" x1="820" y1="540" x2="620" y2="805" gradientUnits="userSpaceOnUse"><stop stopColor="var(--lm-teal)" /><stop offset="1" stopColor="var(--lm-mint)" /></linearGradient>
        <linearGradient id="loop-g3" x1="600" y1="805" x2="275" y2="770" gradientUnits="userSpaceOnUse"><stop stopColor="var(--lm-mint)" /><stop offset="1" stopColor="var(--lm-steel)" /></linearGradient>
        <linearGradient id="loop-g4" x1="240" y1="750" x2="105" y2="410" gradientUnits="userSpaceOnUse"><stop stopColor="var(--lm-steel)" /><stop offset="1" stopColor="var(--lm-teal)" /></linearGradient>
        <linearGradient id="loop-g5" x1="110" y1="375" x2="300" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="var(--lm-teal)" /><stop offset="1" stopColor="var(--lm-blue-dark)" /></linearGradient>
        <filter id="precision-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#263244" floodOpacity=".16" /></filter>
        <filter id="precision-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>
      <circle className="lm-precision-loop__grid" cx="460" cy="460" r="392" />
      <circle className="lm-precision-loop__glow" cx="460" cy="460" r="318" />
      <circle className="lm-precision-loop__rail" cx="460" cy="460" r="318" />
      {loopStages.map((stage, index) => {
        const start = -90 + index * 60;
        const end = start + 60;
        const a = polar(460, 460, 318, start);
        const b = polar(460, 460, 318, end);
        return <g key={stage.name} className={`lm-precision-segment lm-precision-segment--${index}${activeStage === index ? " is-active" : activeStage >= 0 ? " is-muted" : ""}`} onMouseEnter={() => onSelect(index)} onMouseLeave={() => onSelect(null)} onClick={() => onSelect(index)}>
          <path d={`M ${a.x} ${a.y} A 318 318 0 0 1 ${b.x} ${b.y}`} />
        </g>;
      })}
      {Array.from({ length: 6 }, (_, index) => {
        const angle = -30 + index * 60;
        const outerA = polar(460, 460, 357, angle - 2.4);
        const outerB = polar(460, 460, 357, angle + 2.4);
        const inner = polar(460, 460, 279, angle);
        return <path key={angle} className="lm-precision-loop__transition" d={`M ${outerA.x} ${outerA.y} L ${inner.x} ${inner.y} L ${outerB.x} ${outerB.y}`} />;
      })}
      <circle className="lm-precision-loop__center" cx="460" cy="460" r="222" />
      <text className="lm-precision-loop__eyebrow" x="460" y="425" textAnchor="middle">THE LAST MILE</text>
      <text className="lm-precision-loop__title" x="460" y="474" textAnchor="middle">Condition → Response → Outcome</text>
      <text className="lm-precision-loop__sub" x="460" y="513" textAnchor="middle">One accountable operational cycle</text>
      {loopStages.map((stage, index) => {
        const point = polar(460, 460, 318, -60 + index * 60);
        return <g key={stage.number} className={`lm-precision-label lm-precision-label--${index}${activeStage === index ? " is-active" : activeStage >= 0 ? " is-muted" : ""}`} transform={`translate(${point.x} ${point.y})`} onMouseEnter={() => onSelect(index)} onMouseLeave={() => onSelect(null)}>
          <rect x="-72" y="-20" width="144" height="40" rx="20" /><text textAnchor="middle" dominantBaseline="middle"><tspan>{stage.number}</tspan> {stage.name.toUpperCase()}</text>
        </g>;
      })}
      <path className="lm-precision-loop__return" d="M 279 180 C 360 110 560 105 650 173" />
    </svg>
    <figcaption id="precision-loop-caption">Verify returns directly to Evidence, keeping the operational cycle accountable.</figcaption>
  </figure>;
}

function polar(cx: number, cy: number, radius: number, angle: number) {
  const radians = angle * Math.PI / 180;
  return { x: Number((cx + radius * Math.cos(radians)).toFixed(2)), y: Number((cy + radius * Math.sin(radians)).toFixed(2)) };
}

function ProductMapping() {
  return <EditorialSection
    eyebrow="ONE CONNECTED RESPONSE"
    title="Four products. One accountable operational response."
    intro="Infinit-Signal, Singularity, Infinit-Flow, and Infinit-Control are not isolated applications. Together they keep one accountable case moving from evidence to verified outcome."
    className="lm-loop-products-section"
  >
    <div className="lm-home-products">
      {products.map(({ name, role, copy, detail, route, icon: Icon }, index) => <article key={name}>
        <header><span>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /></header>
        <p>{role}</p><h3>{name}</h3><strong>{copy}</strong><small>{detail}</small>
        <TrackedLink to={route} eventName="cta_product_click" eventData={{ product: name }}>Explore {name}<ArrowRight aria-hidden="true" /></TrackedLink>
      </article>)}
    </div>
  </EditorialSection>;
}

function IndustryUseCases() {
  return <EditorialSection
    eyebrow="CONTROLLED INDUSTRIAL REFERENCES"
    title="Recognizable operations. One disciplined response model."
    intro="These governed references show how the same accountable loop applies across different physical environments without inventing customer results or polished demo fiction."
    tone="grid"
  >
    <div className="lm-home-use-cases">
      {operatingScenarioList.map((scenario) => {
        const coordinate = scenario.response.find((step) => step.stage === "Coordinate")?.detail;
        return <article key={scenario.key}>
          <header><span>{scenario.industry}</span><CircleDot aria-hidden="true" /></header>
          <h3>{scenario.operatingProblem}</h3>
          <dl>
            <div><dt>Condition</dt><dd>{scenario.condition}</dd></div>
            <div><dt>Response</dt><dd>{coordinate}</dd></div>
            <div><dt>Verified outcome</dt><dd>{scenario.recoveryCriteria.slice(0, 3).join(" · ")}</dd></div>
            <div><dt>Business metric</dt><dd>{scenario.programMetrics.join(" · ")}</dd></div>
          </dl>
          <TrackedLink to={scenario.route} eventName="cta_explore_platform_click">Inspect the reference<ArrowRight aria-hidden="true" /></TrackedLink>
        </article>;
      })}
    </div>
  </EditorialSection>;
}

function EnterpriseTrust() {
  return <EditorialSection
    eyebrow="BROWNFIELD BY DESIGN"
    title="Designed for enterprise architecture, plant reality, and OT accountability."
    intro="Existing controls and systems of record stay authoritative. Last Mile supplies the orchestration, proof discipline, and role clarity between them."
  >
    <div className="lm-home-ecosystem" aria-label="Representative existing system categories">
      {enterpriseSystems.map((system) => <span key={system}>{system}</span>)}
    </div>
    <div className="lm-governance-strip" aria-label="Enterprise trust capabilities">
      {trustPillars.map(({ title, copy, icon: Icon }) => <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}
    </div>
  </EditorialSection>;
}
