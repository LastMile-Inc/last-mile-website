import { ArrowRight } from "lucide-react";
import { AccountableOperationsLoop } from "@/app/components/AccountableOperationsLoop";
import { OperationalIcon, type OperationalIconKind } from "@/app/components/OperationalIcon";
import { PlatformArchitectureGraphic } from "@/app/components/PlatformArchitectureGraphic";
import { SEO } from "@/app/components/SEO";
import { TrackedLink } from "@/app/components/TrackedLink";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

const products: ReadonlyArray<{ name: string; role: string; copy: string; route: string; kind: OperationalIconKind }> = [
  { name: "Infinit-Signal", role: "Observe", copy: "Qualifies current readings with their source, time, quality, and equipment identity intact.", route: "/infinit-signal", kind: "signal" },
  { name: "Singularity", role: "Understand", copy: "Keeps durable operating identity, context, history, and measured results together.", route: "/singularity", kind: "context" },
  { name: "Infinit-Flow", role: "Decide · Coordinate · Act", copy: "Carries the response through policy, people, work systems, providers, approvals, and authorized action.", route: "/infinit-flow", kind: "flow" },
  { name: "Infinit-Control", role: "See · Govern", copy: "Shows authorized roles the current problem, owner, work, measurements, authority, and result.", route: "/infinit-control", kind: "command" },
];

const accountabilityGaps: ReadonlyArray<{ title: string; copy: string; kind: OperationalIconKind }> = [
  { title: "One machine, several identities", copy: "Controls, historians, work systems, and providers often describe the same equipment differently.", kind: "context" },
  { title: "Many signals, one real condition", copy: "People are left to assemble separate alarms and readings into the actual equipment problem.", kind: "signal" },
  { title: "A task without operating context", copy: "The next team may receive work without the consequence, decision, or measurement that created it.", kind: "people-authority" },
  { title: "A closed task without a stable machine", copy: "Work status can end before return readings show that the equipment is healthy.", kind: "verification" },
];

const retained: ReadonlyArray<{ label: string; kind: OperationalIconKind }> = [
  { label: "Control and safety authority", kind: "security" },
  { label: "Source data and operating history", kind: "operational-data" },
  { label: "Work and asset records", kind: "work" },
  { label: "Provider and field execution", kind: "people-authority" },
];

const added: ReadonlyArray<{ label: string; kind: OperationalIconKind }> = [
  { label: "One current operating problem", kind: "context" },
  { label: "One visible owner and timeline", kind: "people-authority" },
  { label: "One response across every handoff", kind: "flow" },
  { label: "One measured result", kind: "verification" },
];

const platformLearningCopy = "Because Last Mile sees the full lifecycle from first signal through verified recovery, AI can compare the decisions, handoffs, actions, delays, and return readings that shaped the result. No useful learning is lost, successful resolution steps do not have to be rediscovered, and approved improvements can be applied automatically the next time a similar issue appears.";

export function PlatformOverviewPage() {
  const description = "The accountable operating layer across the OT, data, work, service, and plant systems already in place.";
  return <><SEO title="Last Mile Platform | Orchestration Across Industrial Operations" description={description} canonicalPath="/platform" jsonLd={[createProductSchema("Last Mile Platform", "/platform", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform" }])]} /><main className="lm-platform-page lm-platform-story lm-platform-architecture-page lm-platform-v4"><PlatformHero /><DataPressure /><AccountabilityGap /><ProductSystem /><AccountableOperationsLoop context="platform" learningCopy={platformLearningCopy} /></main></>;
}

function PlatformHero() {
  return <header className="lm-enterprise-hero lm-enterprise-hero--platform"><div className="lm-enterprise-hero__media" aria-hidden="true"><img src="/images/platform/orchestration-stack-v2.png" alt="" width="1672" height="941" fetchPriority="high" /></div><div className="lm-platform-container lm-enterprise-hero__content"><div className="lm-enterprise-hero__copy"><p className="lm-eyebrow">LAST MILE: THE PHYSICAL OPERATIONS PLATFORM</p><h1>Industry is not failing at data collection. It is failing at orchestration.</h1><p>Plants already have capable control, data, work, and service systems. Last Mile connects the issue across those boundaries. It keeps the issue, owner, decisions, work, and physical result connected without taking control away from the systems and people that run the operation.</p><div className="lm-actions"><a className="lm-platform-button lm-platform-button--primary" href="#accountability-gap">See the Accountability Gap <ArrowRight aria-hidden="true" /></a><a className="lm-platform-button lm-platform-button--secondary" href="#platform-products">Meet the Products</a></div></div></div></header>;
}

function DataPressure() {
  return <section className="lm-enterprise-split-section" aria-labelledby="platform-data-pressure"><div className="lm-platform-container lm-platform-container--wide"><div className="lm-enterprise-split-section__copy"><p className="lm-eyebrow">MORE DATA IS NOT THE SAME AS MORE CONTROL</p><h2 id="platform-data-pressure">People cannot assemble the whole operation from hundreds of separate signals.</h2><p>During a live issue, the alarm, operating trend, equipment history, work status, provider update, and return reading may all live in different places. The operator becomes the integration layer, copying context between screens while the plant keeps moving.</p><p>Last Mile brings the few facts that matter into one response: what changed, what it affects, who owns it, what is happening now, and what the equipment says after the work is done.</p></div><figure className="lm-enterprise-story-image lm-enterprise-story-image--cropped"><img src="/images/platform/operator-response-v2.png" alt="An operator coordinates a plant response across source systems and field work." width="1536" height="1024" loading="lazy" /></figure></div></section>;
}

function AccountabilityGap() {
  return <section id="accountability-gap" className="lm-platform-gap-story" aria-labelledby="accountability-gap-heading"><div className="lm-platform-container lm-platform-container--wide">
    <header className="lm-platform-section__head"><p className="lm-eyebrow">THE ACCOUNTABILITY GAP</p><h2 id="accountability-gap-heading">The systems are connected. The operating result often is not.</h2><p>Your production systems stay in place. Last Mile supplies the connective operating layer across their boundaries and keeps the issue moving to a measured completion.</p></header>
    <div className="lm-platform-gap-story__composition"><PlatformArchitectureGraphic compact /><aside className="lm-platform-gap-sidecar" aria-label="What falls between otherwise capable systems"><header><span>WHAT FALLS BETWEEN SYSTEMS</span><strong>The missing operating context</strong></header><ol>{accountabilityGaps.map((gap) => <li key={gap.title}><OperationalIcon kind={gap.kind} size="small" /><div><strong>{gap.title}</strong><p>{gap.copy}</p></div></li>)}</ol></aside></div>
    <div className="lm-ownership-comparison lm-ownership-comparison--icons"><OwnershipColumn title="What stays with your systems and people" items={retained} /><OwnershipColumn title="What Last Mile adds" items={added} emphasized /></div>
  </div></section>;
}

function OwnershipColumn({ title, items, emphasized = false }: { title: string; items: ReadonlyArray<{ label: string; kind: OperationalIconKind }>; emphasized?: boolean }) {
  return <article className={emphasized ? "is-emphasized" : ""}><h3>{title}</h3><ul>{items.map((item) => <li key={item.label}><OperationalIcon kind={item.kind} size="small" /><span>{item.label}</span></li>)}</ul></article>;
}

function ProductSystem() {
  return <section id="platform-products" className="lm-platform-product-system" aria-labelledby="platform-products-heading"><div className="lm-platform-container lm-platform-container--wide"><header className="lm-platform-section__head"><p className="lm-eyebrow">ONE PLATFORM. FOUR RESPONSIBILITIES.</p><h2 id="platform-products-heading">Four Last Mile Products. One connected operating response.</h2><p>Every product works from the same equipment identity, current condition, owner, decisions, work, measurements, and result. Each has a clear responsibility, but none becomes another isolated application.</p></header><div className="lm-platform-product-system__grid">{products.map((product) => <article key={product.name}><OperationalIcon kind={product.kind} size="large" /><span>{product.role}</span><h3>{product.name}</h3><p>{product.copy}</p><TrackedLink to={product.route} eventName="cta_product_click" eventData={{ product: product.name }}>Explore {product.name}<ArrowRight aria-hidden="true" /></TrackedLink></article>)}</div></div></section>;
}
