import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink } from "@/app/components/NarrativeComponents";
import { FlowArchitectureVisual, FlowImprovementVisual, FlowMeasurementVisual, FlowRecoveryVisual, FlowStudioVisual } from "@/app/components/InfinitFlowExperience";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

export function InfinitFlowPage() {
  const description = "Infinit-Flow keeps operating context intact as work crosses systems, approvals, people, and authorized digital actions.";
  return <>
    <SEO title="Infinit-Flow | Closed-Loop Industrial Orchestration" description={description} canonicalPath="/infinit-flow" jsonLd={[createProductSchema("Infinit-Flow", "/infinit-flow", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Infinit-Flow", path: "/infinit-flow" }])]} />
    <div className="lm-v2-page lm-product-story-page lm-product-story-page--flow lm-flow-v5">
      <EditorialHero
        eyebrow="INFINIT-FLOW · EXECUTION + ORCHESTRATION"
        title="Closed-loop accountability across disconnected systems."
        intro="At Last Mile, manual is a dirty word. If a response lives in someone's head, inbox, spreadsheet, or whiteboard, it is hard to run the same way twice. Infinit-Flow maps the real work and keeps its context attached as the response crosses systems and teams."
        support="Policy, ownership, timing, approvals, digital actions, receipts, exceptions, and return readings remain part of one governed path."
        visual={<FlowArchitectureHero />}
      />

      <EditorialSection
        id="workflow-model"
        eyebrow="SEE THE WHOLE RESPONSE"
        title="Put the work on one page before you try to automate it."
        intro="Map the condition, operating context, decision, owner, work system, deadline, approval, and return reading in one visible path. When a workflow needs an asset, owner, or reading, Infinit-Flow shows only the choices that match the site, role, data quality, and current operating state. Your controls, work systems, and people keep doing their jobs. Infinit-Flow makes the work between them visible."
      >
        <FlowStudioVisual />
      </EditorialSection>

      <EditorialSection
        eyebrow="DOCUMENT ONCE. MEASURE EVERY RUN."
        title="Find the waits and repeated work that stretch the response."
        intro="Use your own operation as the baseline. Infinit-Flow can measure manual touches, time waiting for the next owner, total cycle time, exceptions, rework, completion against target, and the time from first condition to stable operation. That gives the team a practical answer to three questions: Where did the response stop? What had to be done twice? Did the change make the next run faster or cleaner?"
        tone="grid"
      >
        <FlowMeasurementVisual />
      </EditorialSection>

      <EditorialSection
        eyebrow="GIVE THE CREW THE CONTEXT FIRST"
        title="Spend the recovery window fixing the issue, not reconstructing it."
        intro="Operators, work systems, service providers, and approvers share one case. Infinit-Flow automates only the steps policy allows, leaves physical authority with the right people, and follows the work through the return readings. The crew receives the asset, condition, recent readings, operating impact, owner, timing, and required return check together. They can focus on the equipment instead of chasing the story across calls, notes, and screens."
      >
        <FlowRecoveryVisual />
      </EditorialSection>

      <EditorialSection
        id="orchestration-architecture"
        eyebrow="ORCHESTRATE ACROSS WHAT YOU ALREADY RUN"
        title="Keep your systems in place. Connect the work between them."
        intro="Infinit-Flow coordinates the approved response across qualified signals, asset context, work systems, service providers, approvals, and return telemetry. It can qualify inputs, assign the owner, enforce timing, route approved digital work, request approval, record receipts, and raise exceptions. Consequential physical actions remain governed by customer policy and human authority."
        tone="grid"
      >
        <FlowArchitectureVisual />
      </EditorialSection>

      <EditorialSection
        eyebrow="IMPROVE THE NEXT RESPONSE"
        title="Every completed workflow leaves a better starting point."
        intro="A closed work order is not the same as a stable operation. Infinit-Flow keeps the actual path, waits, decisions, exceptions, actions, and return readings together. Last Mile can use that record to find recurring delays, failed handoffs, unnecessary steps, and candidates for approved automation. Teams can compare the current run with the baseline, make one controlled change, and see whether MTTR, rework, or on-time completion improved."
      >
        <FlowImprovementVisual />
        <InlineLink to="/resources/industrial-concepts/industrial-ai">See how governed industrial AI supports continuous improvement</InlineLink>
      </EditorialSection>
    </div>
  </>;
}

function FlowArchitectureHero() {
  return <figure className="lm-enterprise-product-hero-image lm-enterprise-product-hero-image--flow"><img src="/images/products/infinit-flow/orchestration-routing-v3.png" alt="One operating record passes through policy and decision logic, crosses plant, work, and human approval paths, then converges on a measured result." width="1672" height="941" fetchPriority="high" /></figure>;
}
