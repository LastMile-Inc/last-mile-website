import { ArrowRight } from "lucide-react";
import { AccountableOperationsLoop } from "@/app/components/AccountableOperationsLoop";
import { OperationalIcon, type OperationalIconKind } from "@/app/components/OperationalIcon";
import { PlatformArchitectureGraphic } from "@/app/components/PlatformArchitectureGraphic";
import { SEO } from "@/app/components/SEO";
import { TrackedLink } from "@/app/components/TrackedLink";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

const products: ReadonlyArray<{ name: string; role: string; copy: string; route: string; kind: OperationalIconKind }> = [
  { name: "Infinit-Signal", role: "Observe", copy: "Takes readings from existing industrial systems and checks source, time, quality, duplicates, and equipment identity before the response relies on them.", route: "/infinit-signal", kind: "signal" },
  { name: "Singularity", role: "Understand", copy: "Keeps one durable operating identity, history, and current state as the problem moves across systems and sites.", route: "/singularity", kind: "context" },
  { name: "Infinit-Flow", role: "Decide / Coordinate / Act", copy: "Carries one accountable case through policy, people, work systems, providers, approvals, and authorized action.", route: "/infinit-flow", kind: "flow" },
  { name: "Infinit-Control", role: "See / Govern", copy: "Shows operators and leaders the current problem, owner, work, authority, measurements, and result in one operating view.", route: "/infinit-control", kind: "command" },
];

const accountabilityGaps: ReadonlyArray<{ title: string; copy: string; kind: OperationalIconKind }> = [
  { title: "The same asset has different identities", copy: "Controls, historians, work systems, and providers often refer to the same machine in different ways.", kind: "context" },
  { title: "Signals fragment the real condition", copy: "Alarms and readings arrive separately, leaving people to assemble the operating problem by hand.", kind: "signal" },
  { title: "Operational impact is lost at handoff", copy: "The next team receives a task without the equipment context, consequence, or decision that created it.", kind: "people-authority" },
  { title: "Work status substitutes for physical recovery", copy: "A closed task says the work ended. It does not say the machine recovered or remained stable.", kind: "verification" },
  { title: "Evidence, recurrence, and learning disappear", copy: "The result is separated from the decisions and actions that produced it, so the next response starts over.", kind: "evidence" },
];

const retained: ReadonlyArray<{ label: string; kind: OperationalIconKind }> = [
  { label: "Control and safety authority", kind: "security" },
  { label: "Source data and operating history", kind: "operational-data" },
  { label: "Work and asset records", kind: "work" },
  { label: "Provider and field execution", kind: "people-authority" },
  { label: "Customer policy and approvals", kind: "decision" },
];

const platformLearningCopy = "Because Last Mile sees the full lifecycle from first signal through verified recovery, AI can compare the decisions, handoffs, actions, delays, and return readings that shaped the result. No useful learning is lost, proven resolution steps do not have to be rediscovered, and approved improvements can be applied automatically the next time a similar issue appears.";

const added: ReadonlyArray<{ label: string; kind: OperationalIconKind }> = [
  { label: "One current operating problem", kind: "context" },
  { label: "One visible owner and timeline", kind: "people-authority" },
  { label: "One case across every handoff", kind: "flow" },
  { label: "One connected view of work and state", kind: "command" },
  { label: "One result based on return readings", kind: "verification" },
];

export function PlatformOverviewPage() {
  const description = "The accountable operating layer across the OT, data, work, service, and plant systems already in place.";
  return <>
    <SEO title="Last Mile Platform | The Accountable Layer Across Industrial Operations" description={description} canonicalPath="/platform" jsonLd={[createProductSchema("Last Mile Platform", "/platform", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform" }])]} />
    <main className="lm-platform-page lm-platform-story lm-platform-architecture-page">
      <PlatformHero />
      <AccountabilityGap />
      <ProductSystem />
      <AccountableOperationsLoop context="platform" learningCopy={platformLearningCopy} />
    </main>
  </>;
}

function PlatformHero() {
  return <header className="lm-platform-architecture-hero">
    <div className="lm-platform-container lm-platform-container--wide">
      <div className="lm-platform-architecture-hero__copy">
        <p className="lm-eyebrow">LAST MILE: THE PHYSICAL OPERATIONS PLATFORM</p>
        <h1>One accountable operating layer across the systems already running your plant.</h1>
        <p>Built for the part of industry where software handoffs become physical consequences, Last Mile sits above the OT, data, work, and service systems already in place. It keeps the issue, owner, decisions, work, and physical result connected without taking control away from the systems and people that run the operation.</p>
        <div className="lm-platform-actions"><a className="lm-platform-button lm-platform-button--primary" href="#accountability-gap">See the Accountability Gap <ArrowRight aria-hidden="true" /></a><a className="lm-platform-button lm-platform-button--secondary" href="#platform-products">Meet the Products</a></div>
      </div>
      <PlatformArchitectureGraphic compact />
    </div>
  </header>;
}

function AccountabilityGap() {
  return <section id="accountability-gap" className="lm-platform-gap-story" aria-labelledby="accountability-gap-heading">
    <div className="lm-platform-container lm-platform-container--wide">
      <header className="lm-platform-section__head">
        <p className="lm-eyebrow">THE ACCOUNTABILITY GAP</p>
        <h2 id="accountability-gap-heading">The systems are connected. The operating outcome often is not.</h2>
        <p>Industrial stacks move data and work very well inside their own boundaries. The gap appears between those boundaries, where identity, context, ownership, physical recovery, and useful learning can disappear.</p>
      </header>

      <div className="lm-platform-gap-story__composition">
        <PlatformArchitectureGraphic compact />
        <aside className="lm-platform-gap-sidecar" aria-label="The missing condition-to-outcome accountability layer">
          <header><span>THE MISSING CONDITION-TO-OUTCOME ACCOUNTABILITY LAYER</span><strong>What falls between otherwise capable systems</strong></header>
          <ol>{accountabilityGaps.map((gap) => <li key={gap.title}><OperationalIcon kind={gap.kind} size="small" /><div><strong>{gap.title}</strong><p>{gap.copy}</p></div></li>)}</ol>
        </aside>
      </div>

      <div className="lm-ownership-comparison lm-ownership-comparison--icons">
        <OwnershipColumn title="What stays with your systems and people" items={retained} />
        <OwnershipColumn title="What Last Mile adds" items={added} emphasized />
      </div>
    </div>
  </section>;
}

function OwnershipColumn({ title, items, emphasized = false }: { title: string; items: ReadonlyArray<{ label: string; kind: OperationalIconKind }>; emphasized?: boolean }) {
  return <article className={emphasized ? "is-emphasized" : ""}><h3>{title}</h3><ul>{items.map((item) => <li key={item.label}><OperationalIcon kind={item.kind} size="small" /><span>{item.label}</span></li>)}</ul></article>;
}

function ProductSystem() {
  return <section id="platform-products" className="lm-platform-product-system" aria-labelledby="platform-products-heading"><div className="lm-platform-container lm-platform-container--wide">
    <header className="lm-platform-section__head"><p className="lm-eyebrow">ONE PLATFORM. FOUR RESPONSIBILITIES.</p><h2 id="platform-products-heading">Each product advances the same operating response.</h2><p>The Last Mile Products share the same equipment identity, condition, owner, decisions, work, measurements, and result. Each product has a distinct responsibility, but none operates as a disconnected application.</p></header>
    <div className="lm-platform-product-system__grid">{products.map((product) => <article key={product.name}><OperationalIcon kind={product.kind} size="large" /><span>{product.role}</span><h3>{product.name}</h3><p>{product.copy}</p><TrackedLink to={product.route} eventName="cta_product_click" eventData={{ product: product.name }}>Explore {product.name}<ArrowRight aria-hidden="true" /></TrackedLink></article>)}</div>
  </div></section>;
}