import { ArrowRight } from "lucide-react";
import { OperationalIcon, type OperationalIconKind } from "@/app/components/OperationalIcon";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink } from "@/app/components/NarrativeComponents";
import { SingularityLearningCurve } from "@/app/components/SingularityLearningCurve";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

const platformLearningCopy = "Because Last Mile sees the full lifecycle from first signal through verified recovery, AI can compare the decisions, handoffs, actions, delays, and return readings that shaped the result. No useful learning is lost, proven resolution steps do not have to be rediscovered, and approved improvements can be applied automatically the next time a similar issue appears.";

const memorySequence: ReadonlyArray<{ label: string; copy: string; kind: OperationalIconKind }> = [
  { label: "What happened", copy: "Source, time, quality, asset, and operating condition", kind: "signal" },
  { label: "What people decided", copy: "Context, recommendation, authority, and chosen response", kind: "decision" },
  { label: "What the operation did", copy: "Work, approvals, digital actions, handoffs, and delays", kind: "flow" },
  { label: "What actually worked", copy: "Return readings, stability, recurrence, and measured result", kind: "verification" },
];

const authorityModes: ReadonlyArray<{ name: string; copy: string; kind: OperationalIconKind }> = [
  { name: "ASSIST", copy: "AI assembles context, finds similar history, and recommends a response. A person decides.", kind: "context" },
  { name: "AUTO", copy: "Infinit-Flow executes only the bounded digital steps already authorized by customer policy.", kind: "flow" },
  { name: "HUMAN AUTHORITY", copy: "People retain control of safety, isolation, physical work, and customer-governed changes.", kind: "people-authority" },
];

export function SSOMPage() {
  const description = "Singularity is Last Mile's governed operational-memory and OT world-model product implementing the open SSOM semantic and evidence contract.";

  return <>
    <SEO title="Singularity | Persistent Operational Memory and Learning" description={description} canonicalPath="/singularity" jsonLd={[createProductSchema("Singularity", "/singularity", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Singularity", path: "/singularity" }])]} />
    <main className="lm-v2-page lm-product-story-page lm-product-story-page--singularity lm-singularity-story">
      <EditorialHero
        title="Your best operating knowledge should never walk out the door."
        intro="People retire. Vendors change. Systems are replaced. Singularity keeps the history of what happened, what people decided, what fixed the problem, and whether the operation stayed healthy."
        support="Singularity preserves one durable identity for each asset, location, problem, response, and result as data and work move across sites."
        primary={{ label: "See the Learning Continuum", to: "/singularity#learning-continuum" }}
        secondary={{ label: "Explore the Platform", to: "/platform" }}
        visual={<PersistentMemoryHero />}
      />

      <EditorialSection
        id="learning-continuum"
        eyebrow="THE OPERATIONAL LEARNING CONTINUUM"
        title="Move from reacting by hand to anticipating what comes next."
        intro="Every complete operating response adds usable history. The longer Last Mile follows an operation end to end, the richer that record becomes and the stronger the foundation for earlier decisions, better response plans, and safely bounded automation."
        tone="grid"
        className="lm-singularity-continuum-section"
      >
        <SingularityLearningCurve />
        <div className="lm-singularity-learning-payoff">
          <OperationalIcon kind="context" size="large" />
          <div><strong>Every response should make the next response smarter.</strong><p>{platformLearningCopy}</p></div>
        </div>
      </EditorialSection>

      <EditorialSection
        eyebrow="PERSISTENT OPERATIONAL MEMORY"
        title="The operation remembers after people and systems change."
        intro="Tribal knowledge becomes durable corporate memory when the complete operating story stays connected. That memory does not retire, change jobs, or leave with a vendor. Singularity keeps the context that explains why a decision was made and the measurements that show what happened next, reducing the risk of losing years of hard-won operating knowledge."
      >
        <div className="lm-singularity-memory-spine">
          {memorySequence.map((item, index) => <article key={item.label}>
            <OperationalIcon kind={item.kind} size="medium" />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{item.label}</h3><p>{item.copy}</p></div>
            {index < memorySequence.length - 1 ? <ArrowRight aria-hidden="true" /> : null}
          </article>)}
          <div className="lm-singularity-memory-spine__retained"><OperationalIcon kind="operational-data" size="large" /><div><span>RETAINED OPERATING MEMORY</span><strong>Available for the next shift, the next team, and the next generation of the operation.</strong></div></div>
        </div>
        <div className="lm-singularity-foundation">
          <article><span>OPEN MEANING CONTRACT</span><h3>SSOM keeps the record portable.</h3><p>The Standardized Semantic Object Model defines portable operational meaning, identity, relationships, temporal semantics, quality, evidence, provenance, conformance, and profiles.</p></article>
          <article><span>GOVERNED LAST MILE RUNTIME</span><h3>Singularity keeps the memory usable.</h3><p>It preserves source identities, time-correct history, asset relationships, conditions, decisions, actions, and measured results without erasing where the information came from.</p></article>
        </div>
      </EditorialSection>

      <EditorialSection
        eyebrow="AUTOMATION MUST EARN ITS TRUST"
        title="Learning can advance the response without taking authority away."
        intro="The goal is not automation for its own sake. The goal is to use retained operating knowledge to see problems earlier, choose a stronger response, and prevent avoidable downtime while keeping clear authority over every consequential action."
        tone="grid"
        className="lm-singularity-governance-section"
      >
        <div className="lm-singularity-authority">
          {authorityModes.map((mode) => <article key={mode.name}><OperationalIcon kind={mode.kind} size="medium" /><div><span>{mode.name}</span><p>{mode.copy}</p></div></article>)}
        </div>
        <div className="lm-singularity-boundary">
          <div><OperationalIcon kind="security" size="large" /><span>THE NON-NEGOTIABLE BOUNDARY</span><h3>Current evidence and customer authority remain in control.</h3><p>Models can identify patterns, assemble context, and recommend a response. They do not become operating truth simply because software produced them. Physical recovery still depends on current valid measurements.</p></div>
          <div><span>DATA TRUST</span><h3>Learning persists. Customer facts stay protected.</h3><p>The architecture separates customer operations from cross-site learning. SSOM conformance does not grant contribution rights. Purpose, consent, minimization, transformation, provenance, retention, and model scope remain explicit, and aggregate learning cannot rewrite customer canonical facts.</p></div>
        </div>
        <nav className="lm-singularity-concept-links" aria-label="Related industrial concepts">
          <InlineLink to="/resources/industrial-concepts/industrial-ai">Read how governed industrial AI advances safely</InlineLink>
          <InlineLink to="/resources/industrial-concepts/lights-out-operations">Understand the lights-out manufacturing horizon</InlineLink>
          <InlineLink to="/resources/industrial-concepts/data-spaces">See how sovereign learning protects customer data</InlineLink>
        </nav>
      </EditorialSection>
    </main>
  </>;
}

function PersistentMemoryHero() {
  return <figure className="lm-singularity-memory-hero" aria-labelledby="memory-hero-caption">
    <div className="lm-singularity-memory-hero__heading">SINGULARITY · PERSIST + LEARN</div>
    <div className="lm-singularity-memory-hero__orbit" aria-hidden="true"><i /><i /><i /></div>
    <ol>
      <li><OperationalIcon kind="signal" size="medium" /><span>FIRST SIGNAL</span><strong>What changed?</strong></li>
      <li><OperationalIcon kind="decision" size="medium" /><span>DECISION + ACTION</span><strong>What did we do?</strong></li>
      <li><OperationalIcon kind="verification" size="medium" /><span>MEASURED RESULT</span><strong>Did it work?</strong></li>
    </ol>
    <div className="lm-singularity-memory-hero__core"><OperationalIcon kind="context" size="large" /><span>SINGULARITY</span><strong>One memory that keeps learning</strong><small>Asset · Condition · Decision · Action · Result</small></div>
    <figcaption id="memory-hero-caption">The complete response becomes durable operating knowledge instead of leaving with the person, project, or source system.</figcaption>
  </figure>;
}
