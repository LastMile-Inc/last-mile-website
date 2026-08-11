import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, CheckCircle2, CircleDot, Database, Gauge, Network, Radio, RefreshCw, Route, ShieldCheck, Users, type LucideIcon } from "lucide-react";
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

const loopStages: readonly LoopStage[] = [
  { number: "01", name: "Evidence", headline: "Know what actually happened.", copy: "Establish trustworthy physical evidence with source, time, quality, lineage and provenance." },
  { number: "02", name: "Understand", headline: "Know what it means here.", copy: "Connect the Condition to the relevant assets, process, topology, history and current operating state." },
  { number: "03", name: "Decide", headline: "Determine what should happen next.", copy: "Evaluate context, policy and consequence to determine the appropriate response: AUTO, ASSIST or no action.", note: "Not every Condition requires maintenance. Not every Condition requires action." },
  { number: "04", name: "Coordinate", headline: "Bring the right participants together.", copy: "Orchestrate the required response across operators, controls, CMMS, MES, QMS, ERP and other systems already in place." },
  { number: "05", name: "Act", headline: "Execute through the right system.", copy: "Initiate maintenance, inspection, operator action, production change, approved control action or another governed response." },
  { number: "06", name: "Verify", headline: "Prove that it worked.", copy: "Continue observing the physical operation until evidence confirms whether the intended outcome was actually achieved.", note: "Work completed is not the same as problem solved." },
] as const;

const systemGroups: ReadonlyArray<{ label: string; systems: string; icon: LucideIcon }> = [
  { label: "Control", systems: "PLC · DCS · SCADA · BMS", icon: Gauge },
  { label: "Operational data", systems: "Historians · MQTT · UNS · OPC UA", icon: Database },
  { label: "Execution", systems: "CMMS · EAM · MES · QMS · ERP", icon: Route },
  { label: "People", systems: "Operators · Maintenance · Engineering · Management", icon: Users },
] as const;

const products: ReadonlyArray<{ name: string; role: string; copy: string; detail: string; route: string; icon: LucideIcon }> = [
  { name: "Infinit-Signal", role: "Observe", copy: "Acquire, normalize and preserve trustworthy operational evidence across existing industrial systems.", detail: "MQTT · Sparkplug B · OPC UA · UNS · historians · edge platforms", route: "/infinit-signal", icon: Radio },
  { name: "Singularity", role: "Understand", copy: "Create the shared operational world model connecting equipment, processes, observations, Conditions, history, Responses and Outcomes.", detail: "Shared operational context implemented through SSOM", route: "/singularity", icon: Network },
  { name: "Infinit-Flow", role: "Decide · Coordinate · Act", copy: "Apply operational context and policy to determine the appropriate response and coordinate governed execution across systems and people.", detail: "AUTO | ASSIST", route: "/infinit-flow", icon: Route },
  { name: "Infinit-Control", role: "See · Govern", copy: "Give operators and leaders one role-based operational surface for active Conditions, coordinated Responses and verified Outcomes across sites.", detail: "Role-based operating command surface", route: "/infinit-control", icon: Gauge },
] as const;

const enterpriseSystems = [
  "SCADA / DCS / PLC / BMS",
  "MQTT / OPC UA / UNS / Historians",
  "Fiix / MaintainX / eMaint / Maximo / ServiceNow",
  "MES / QMS / ERP",
] as const;

const trustCapabilities = ["Evidence lineage", "Replay / deduplication", "Policy", "AUTO / ASSIST", "Human authorization", "Audit", "Multi-tenant isolation", "Verified outcome"] as const;

export function HomePage() {
  const description = "Last Mile closes the gap between operational evidence and verified outcomes across the industrial systems an enterprise already operates.";

  return <>
    <SEO
      title="Last Mile | The Physical Operations Platform"
      description={description}
      canonicalPath="/"
      markdownPath="/index.md"
      keywords="physical operations platform, operational intelligence, accountable operations loop, industrial systems orchestration, verified outcomes"
      jsonLd={[createOrganizationSchema(), createWebsiteSchema()]}
    />
    <div className="lm-v2-page lm-home-page lm-home-corrective">
      <HomepageHero />
      <MissingLastMile />
      <AccountableOperationsLoop />
      <PlatformLoopMapping />
      <IndustryUseCases />
      <EnterpriseTrust />
      <NextStep
        eyebrow="THE PHYSICAL OPERATIONS PLATFORM"
        title="You already built the operation. Close the Last Mile."
        copy="Turn fragmented operational evidence into coordinated action and verified outcomes without replacing the systems already running your business."
        label="See Last Mile in Action"
        to="/contact?intent=operation"
        secondary={{ label: "Explore the Platform", to: "/platform" }}
      />
    </div>
  </>;
}

function HomepageHero() {
  return <header className="lm-corrective-hero">
    <div className="lm-v2-container">
      <p className="lm-eyebrow">THE PHYSICAL OPERATIONS PLATFORM</p>
      <h1>Close the Last Mile between operational evidence and verified outcomes.</h1>
      <p>Your operation already runs on SCADA, DCS, BMS, historians, CMMS, MES, controls and enterprise systems. Last Mile connects the operational context across them, determines what should happen next, coordinates the right response, and keeps watching until the physical outcome is verified.</p>
      <strong>Keep the systems you trust. Add the operational intelligence between them.</strong>
      <div className="lm-actions">
        <CtaLink to="/#accountable-operations-loop" eventName="cta_explore_platform_click">See the Accountable Operations Loop</CtaLink>
        <CtaLink to="/platform" variant="secondary" eventName="cta_explore_platform_click">Explore the Platform</CtaLink>
      </div>
    </div>
  </header>;
}

function MissingLastMile() {
  return <EditorialSection
    id="missing-last-mile"
    eyebrow="THE ARCHITECTURAL WHITE SPACE"
    title="Your systems know their part. Last Mile understands the operation."
    tone="grid"
  >
    <div className="lm-missing-architecture" aria-label="Last Mile spans control, operational data, execution systems, and people">
      <div className="lm-missing-architecture__systems">
        {systemGroups.map(({ label, systems, icon: Icon }) => <article key={label}><Icon aria-hidden="true" /><span>{label}</span><strong>{systems}</strong></article>)}
      </div>
      <div className="lm-missing-architecture__spine" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="lm-missing-architecture__layer"><span>LAST MILE</span><strong>Independent operational context and execution across the environment</strong></div>
    </div>
    <div className="lm-missing-copy">
      <p>Operational context fragments between systems. A physical condition can begin in controls, depend on history and operator judgment, create maintenance work, affect production, and ultimately require verification in the physical operation.</p>
      <p><strong>Last Mile provides the independent operational context and execution layer that carries that condition across the gaps.</strong></p>
    </div>
    <aside className="lm-cmms-once"><WrenchMark /><p><strong>A CMMS manages maintenance work.</strong> Last Mile determines when maintenance is the right response, coordinates everything else required, and verifies the operational outcome.</p></aside>
  </EditorialSection>;
}

function WrenchMark() {
  return <span aria-hidden="true"><CheckCircle2 /></span>;
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
        <p className="lm-eyebrow">THE OPERATING MODEL</p>
        <h2 id="premium-loop-heading">The Accountable Operations Loop</h2>
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
        <linearGradient id="loop-g0" x1="300" y1="120" x2="650" y2="170" gradientUnits="userSpaceOnUse"><stop stopColor="#315F91" /><stop offset="1" stopColor="#4C86C6" /></linearGradient>
        <linearGradient id="loop-g1" x1="680" y1="170" x2="820" y2="520" gradientUnits="userSpaceOnUse"><stop stopColor="#4C86C6" /><stop offset="1" stopColor="#5E8FAF" /></linearGradient>
        <linearGradient id="loop-g2" x1="820" y1="540" x2="620" y2="805" gradientUnits="userSpaceOnUse"><stop stopColor="#5E8FAF" /><stop offset="1" stopColor="#8BB4CF" /></linearGradient>
        <linearGradient id="loop-g3" x1="600" y1="805" x2="275" y2="770" gradientUnits="userSpaceOnUse"><stop stopColor="#8BB4CF" /><stop offset="1" stopColor="#A8BCCB" /></linearGradient>
        <linearGradient id="loop-g4" x1="240" y1="750" x2="105" y2="410" gradientUnits="userSpaceOnUse"><stop stopColor="#A8BCCB" /><stop offset="1" stopColor="#5E8FAF" /></linearGradient>
        <linearGradient id="loop-g5" x1="110" y1="375" x2="300" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#5E8FAF" /><stop offset="1" stopColor="#315F91" /></linearGradient>
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

function PlatformLoopMapping() {
  return <EditorialSection
    id="platform"
    eyebrow="THE LAST MILE PLATFORM"
    title="One platform closes the loop."
    intro="The four products share responsibility for evidence, operational understanding, governed execution, and resulting state. Verification is collective platform behavior—not a dashboard function."
    className="lm-loop-products-section"
  >
    <div className="lm-loop-products">
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
    id="use-cases"
    eyebrow="CONTROLLED INDUSTRIAL REFERENCES"
    title="Accountability in recognizable physical operations."
    intro="These governed references use internally consistent operational evidence and approved result criteria. They are not customer case studies, ROI claims, or production-performance claims."
    tone="grid"
    className="lm-concise-use-cases-section"
  >
    <div className="lm-concise-use-cases">
      {operatingScenarioList.map((scenario) => {
        const coordinate = scenario.response.find((step) => step.stage === "Coordinate")?.detail;
        return <article key={scenario.key}>
          <header><span>{scenario.industry}</span><CircleDot aria-hidden="true" /></header><h3>{scenario.operatingProblem}</h3>
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
    id="enterprise-trust"
    eyebrow="BROWNFIELD BY DESIGN"
    title="Built for the operation you already have."
    intro="Last Mile works across brownfield environments without requiring a standardized technology estate. Existing controls and systems of record remain authoritative while Last Mile supplies the shared context and coordination between them."
  >
    <div className="lm-enterprise-systems" aria-label="Representative technology categories">{enterpriseSystems.map((system) => <span key={system}>{system}</span>)}</div>
    <div className="lm-enterprise-trust" aria-label="Enterprise trust capabilities">{trustCapabilities.map((capability) => <span key={capability}><ShieldCheck aria-hidden="true" />{capability}</span>)}</div>
  </EditorialSection>;
}
