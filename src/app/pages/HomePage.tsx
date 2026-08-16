import { ArrowRight } from "lucide-react";
import { AccountableOperationsLoop } from "@/app/components/AccountableOperationsLoop";
import { CtaLink } from "@/app/components/MarketingComponents";
import { OperationalIcon, type OperationalIconKind } from "@/app/components/OperationalIcon";
import { SEO } from "@/app/components/SEO";
import { TrackedLink } from "@/app/components/TrackedLink";
import { createOrganizationSchema, createWebsiteSchema } from "@/app/lib/structuredData";

const productRoles: ReadonlyArray<{ name: string; role: string; copy: string; route: string; kind: OperationalIconKind }> = [
  { name: "Infinit-Signal", role: "Observe", copy: "Brings current readings in with their source, time, quality, and equipment identity intact.", route: "/infinit-signal", kind: "signal" },
  { name: "Singularity", role: "Understand", copy: "Builds a durable record of the equipment, history, decisions, and measured results.", route: "/singularity", kind: "context" },
  { name: "Infinit-Flow", role: "Decide · Coordinate · Act", copy: "Moves the response across people, approvals, work systems, providers, and authorized actions.", route: "/infinit-flow", kind: "flow" },
  { name: "Infinit-Control", role: "See · Govern", copy: "Gives each authorized role the current condition, owner, work, measurements, and result in one view.", route: "/infinit-control", kind: "command" },
] as const;

const loopIntro = "A response is not finished when the task closes. The Accountable Operations Loop keeps the issue, decision, work, and return readings connected until the equipment is stable again.";
const loopLearningCopy = "Because Last Mile sees the full lifecycle from first signal through verified recovery, AI can compare the decisions, handoffs, actions, delays, and return readings that shaped the result. No useful learning is lost, successful resolution steps do not have to be rediscovered, and approved improvements can be applied automatically the next time a similar issue appears.";

export function HomePage() {
  const description = "Industrial orchestration from the first warning through a stable, measured recovery.";
  return <>
    <SEO title="Last Mile | The Physical Operations Platform" description={description} canonicalPath="/" markdownPath="/index.md" keywords="physical operations platform, industrial operations, accountable operations loop, connected work systems, verified fixes" jsonLd={[createOrganizationSchema(), createWebsiteSchema()]} />
    <div className="lm-v2-page lm-home-page lm-home-v5"><HomepageHero /><IndustryProblem /><LastMileSolution /><AccountableOperationsLoop introCopy={loopIntro} learningCopy={loopLearningCopy} /><IndustryValue /></div>
  </>;
}

function HomepageHero() {
  return <header className="lm-enterprise-hero lm-enterprise-hero--home">
    <div className="lm-enterprise-hero__media" aria-hidden="true"><img src="/images/home/industrial-orchestration-hero-v3.png" alt="" width="1672" height="941" fetchPriority="high" /></div>
    <div className="lm-v2-container lm-enterprise-hero__content"><div className="lm-enterprise-hero__copy">
      <h1>Everything was green. The line still failed.</h1>
      <p>A new bottling line cleared its startup checks. When product reached the capper, the bottles collapsed and cough syrup covered the floor. Every system showed its part. Nothing connected the settings, the work, and the physical result.</p>
      <strong>That was not a dashboard problem. It was a missing orchestration layer.</strong>
      <div className="lm-actions"><CtaLink to="/platform" eventName="cta_explore_platform_click">Explore the Platform Architecture</CtaLink><CtaLink to="/contact?intent=architecture" variant="secondary" eventName="cta_explore_platform_click">Assess Your Operations Loop</CtaLink></div>
    </div></div>
  </header>;
}

function IndustryProblem() {
  const sources: ReadonlyArray<{ label: string; detail: string; kind: OperationalIconKind }> = [
    { label: "Machine signals", detail: "Alarms and sensor readings", kind: "signal" },
    { label: "Operating history", detail: "Trends and earlier events", kind: "operational-data" },
    { label: "Work activity", detail: "Tasks, owners, and status", kind: "work" },
    { label: "Human decisions", detail: "Calls, approvals, and handoffs", kind: "people-authority" },
  ];
  return <section id="industry-problem" className="lm-home-problem-section" aria-labelledby="industry-problem-heading"><div className="lm-v2-container">
    <header className="lm-home-section-head lm-home-section-head--centered"><p className="lm-eyebrow">THE PROBLEM WE SEE EVERY DAY</p><h2 id="industry-problem-heading">The plant produced the facts. Nobody had the whole answer.</h2><p>Modern operations create more alarms, readings, history, work, and service updates than any person can assemble while production is moving. The equipment problem crosses OT and IT boundaries, but the context, owner, and physical result rarely cross with it.</p></header>
    <div className="lm-home-problem-grid lm-home-problem-grid--v4">
      <article className="lm-home-signal-pressure"><header><span>WHY NOW</span><h3>More automation creates more signals, more handoffs, and less time to decide.</h3><p>People do not need another dashboard full of data. They need the affected asset, the consequence, the accountable person, and the immediate decision.</p></header><div className="lm-home-signal-field"><div className="lm-home-signal-field__sources">{sources.map((source) => <div key={source.label}><OperationalIcon kind={source.kind} size="medium" /><span><strong>{source.label}</strong><small>{source.detail}</small></span></div>)}</div><div className="lm-home-signal-field__focus"><OperationalIcon kind="context" size="large" /><span>ONE OPERATING PICTURE</span><strong>What changed? Who owns it? What happens next?</strong></div></div></article>
      <aside className="lm-home-plant-story"><span className="lm-home-plant-story__eyebrow">THE ARCHITECTURAL FAILURE</span><OperationalIcon kind="flow" size="large" label="Disconnected operating response" /><h3>No system owned the result across the boundaries.</h3><p>The control system knew the configuration. The work system knew the task. People knew what they had tried. The machine knew whether the response worked.</p><p>The operating story broke each time it crossed from one system or team to the next.</p><strong>Last Mile keeps that story intact.</strong></aside>
    </div>
  </div></section>;
}

function LastMileSolution() {
  return <section id="missing-last-mile" className="lm-home-solution-v4" aria-labelledby="missing-last-mile-heading"><div className="lm-v2-container">
    <header className="lm-home-section-head lm-home-section-head--centered"><p className="lm-eyebrow">THE MISSING ACCOUNTABLE LAYER</p><h2 id="missing-last-mile-heading">Keep the systems you trust. Keep the issue intact between them.</h2><p>Last Mile is the orchestration layer across the production systems already in place. It connects the alarm, equipment, readings, decisions, work, owner, and return telemetry so teams can act sooner and see whether the machine is actually running correctly again.</p></header>
    <figure className="lm-enterprise-story-image lm-enterprise-story-image--bridge"><img src="/images/home/accountability-bridge-v2.png" alt="A connected operating response links existing enterprise systems, people, and plant equipment." width="1672" height="941" loading="lazy" /><figcaption><span>EXISTING SYSTEMS</span><strong>Condition → Response → Measured result</strong><span>PHYSICAL OPERATION</span></figcaption></figure>
    <div className="lm-home-product-rail">{productRoles.map((product) => <article key={product.name}><OperationalIcon kind={product.kind} size="large" /><span>{product.role}</span><h3>{product.name}</h3><p>{product.copy}</p><TrackedLink to={product.route} eventName="cta_product_click" eventData={{ product: product.name }}>Explore {product.name}<ArrowRight aria-hidden="true" /></TrackedLink></article>)}</div>
  </div></section>;
}

function IndustryValue() {
  const values = [
    { title: "Keep ownership visible", copy: "The issue, current owner, next action, and elapsed time stay together as the response moves across teams.", kind: "people-authority" as const },
    { title: "Carry context across every handoff", copy: "Operators, maintenance, engineering, providers, and business systems work from the same equipment problem.", kind: "flow" as const },
    { title: "Stay with the equipment after the work ends", copy: "Return readings show whether the equipment recovered and remained stable. Work completed is not the same as problem solved.", kind: "verification" as const },
    { title: "Continuous improvement", copy: "AI compares decisions, handoffs, delays, actions, and return readings so teams can retain what worked and reduce MTTR on the next similar issue.", kind: "context" as const },
  ] as const;
  return <section className="lm-home-value-section" aria-labelledby="industry-value-heading"><div className="lm-v2-container"><header className="lm-home-section-head lm-home-section-head--centered"><p className="lm-eyebrow">WHAT LAST MILE BRINGS TO INDUSTRY</p><h2 id="industry-value-heading">A faster response today. A smarter operation tomorrow.</h2><p>Last Mile keeps the operating story intact so teams can resolve the current problem and improve how the next one is handled.</p></header><div className="lm-industry-value-path">{values.map((value) => <article key={value.title}><OperationalIcon kind={value.kind} size="large" /><div><h3>{value.title}</h3><p>{value.copy}</p></div></article>)}</div></div></section>;
}
