import { SEO } from "@/app/components/SEO";
import { ConnectedResponseStrip, EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import { ResponseTimeline } from "@/app/components/OperatingScenarioComponents";
import { operatingScenarios } from "@/app/pages/platformReferenceData";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

const runtimeCapabilities = ["Durable timers", "Acknowledgement targets", "Approvals", "Retries and idempotency", "External commands and receipts", "Provider handoffs", "Compensation and exceptions", "Pinned workflow versions"] as const;
const resultStates = ["Recovery established", "Partial recovery", "Failed intervention", "Recurrence detected", "Insufficient return data"] as const;

export function InfinitFlowPage() {
  const description = "Infinit-Flow coordinates durable, asset-aware condition-to-work-to-verified-outcome response while preserving customer authority.";
  return <>
    <SEO title="Infinit-Flow | Coordinate the Operating Response" description={description} canonicalPath="/infinit-flow" jsonLd={[createProductSchema("Infinit-Flow", "/infinit-flow", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Infinit-Flow", path: "/infinit-flow" }])]} />
    <div className="lm-v2-page">
      <EditorialHero eyebrow="INFINIT-FLOW · ORCHESTRATE + EXECUTE" title="Orchestrate the operating response without losing the condition." intro="Infinit-Flow determines what should happen next and creates one durable Response across operators, work systems, providers, approvals, evidence, and return measurements. It executes only the digital steps policy allows and keeps physical authority where operations require it." support="Connected response role: carry one accountable case across people, systems, providers, approvals, and return-measurement verification." primary={{ label: "Discuss Your Response Path", to: "/contact?intent=operation" }} secondary={{ label: "See the Cooling Use Case", to: "/use-cases/data-center-cooling" }} visual={<div className="lm-product-artifact"><span>Cooling Loop B response</span><ResponseTimeline scenario={operatingScenarios.cooling} /></div>} />
      <ConnectedResponseStrip activeProduct="Infinit-Flow" intro="Infinit-Flow is the orchestration engine inside the loop, but it still depends on qualified evidence, governed context, and explicit outcome verification." />

      <EditorialSection title="Start with the kind of asset and response—not an empty box." tone="grid">
        <p className="lm-v2-large-copy">Choose an operational object type and intent. Infinit-Flow returns only assets compatible with the required SSOM class, capability, tenant, site, role, quality, and freshness. Simple controls appear first; expert semantic and lineage detail remains available when needed.</p>
        <InlineLink to="/resources/industrial-concepts/semantic-interoperability">Why semantic interoperability matters for governed workflow binding</InlineLink>
      </EditorialSection>

      <EditorialSection title="Built for the hours, days, retries, and handoffs of real work.">
        <p className="lm-v2-large-copy">Durable execution preserves timers, acknowledgement targets, approvals, retries, idempotency, external commands, receipts, provider handoffs, and exceptions. Workflow versions stay pinned so a live response does not change underneath the operator.</p>
        <div className="lm-planned"><ul className="lm-v2-list lm-planned-grid">{runtimeCapabilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </EditorialSection>

      <EditorialSection eyebrow="AUTHORITY" title="The response advances only as far as customer policy allows." tone="grid">
        <div className="lm-authority-modes"><article><span>01</span><h3>AUTO</h3><p>Execute an authorized digital step.</p></article><article><span>02</span><h3>ASSIST</h3><p>Assemble evidence or recommend the response.</p></article><article><span>03</span><h3>HUMAN AUTHORITY</h3><p>Retain physical-work, safety, LOTO, and control authority under customer policy.</p></article></div>
        <InlineLink to="/resources/industrial-concepts/industrial-ai">Industrial AI must know what it is allowed to do—and whether it worked</InlineLink>
      </EditorialSection>

      <EditorialSection title="Work completed is not the same as problem solved.">
        <p className="lm-v2-large-copy">When the field task or work order closes, Infinit-Flow asks Singularity to evaluate the configured return measurements. Work-system state is contextual evidence only; it cannot set the physical result.</p>
        <div className="lm-result-states">{resultStates.map((state, index) => <article key={state}><span>{String(index + 1).padStart(2, "0")}</span><h3>{state}</h3></article>)}</div>
      </EditorialSection>

      <NextStep title="Put one accountable case in front of every role." copy="Infinit-Control presents the current state, evidence, ownership, authority, work, and verified outcome without becoming a second truth store." label="Explore Infinit-Control" to="/infinit-control" secondary={{ label: "Discuss Your Response Path", to: "/contact?intent=operation" }} />
    </div>
  </>;
}
