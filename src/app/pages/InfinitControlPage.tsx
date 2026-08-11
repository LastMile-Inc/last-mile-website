import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, NextStep } from "@/app/components/NarrativeComponents";
import { MeasurementGrid, OperatingConditionPanel, RecoveryContractPanel } from "@/app/components/OperatingScenarioComponents";
import { operatingScenarios } from "@/app/pages/platformReferenceData";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

const roleViews = [
  ["Operator case", "Current condition, owner, evidence, required action, and result."],
  ["Facility / site", "Protection, capacity, active Conditions, and coordination."],
  ["Reliability", "Topology, recurrence, history, work, and outcome patterns."],
  ["Executive", "Aggregated operating outcomes with drill-through to evidence."],
  ["Administrator", "Source, mapping, workflow, and product health kept separate from plant state."],
] as const;

export function InfinitControlPage() {
  const description = "Infinit-Control presents role-based operating state, evidence, ownership, work, authority, measurements, and verified outcomes.";
  const scenario = operatingScenarios.cooling;
  return <>
    <SEO title="Infinit-Control | See the Condition, Response, and Proof" description={description} canonicalPath="/infinit-control" jsonLd={[createProductSchema("Infinit-Control", "/infinit-control", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Infinit-Control", path: "/infinit-control" }])]} />
    <div className="lm-v2-page">
      <EditorialHero eyebrow="INFINIT-CONTROL · SEE + GOVERN" title="See the Condition, Response, and proof in one governed command surface." intro="Infinit-Control gives each role a governed operational command surface for current state, canonical topology, evidence, ownership, work, system participation, authority, return measurements, and verified Outcomes. It is more than a dashboard because it keeps the complete accountable response in view." primary={{ label: "Discuss Your Operating View", to: "/contact?intent=operation" }} secondary={{ label: "See the Cooling Use Case", to: scenario.route }} visual={<OperatingConditionPanel scenario={scenario} compact />} />

      <EditorialSection title="Every state explains itself." tone="grid">
        <p className="lm-v2-large-copy">Important measurements show a numerical value, engineering unit, expected or reference band, state icon and text, and meaningful trend or freshness. Stale, quarantined, unresolved, or missing inputs are shown as <strong>No valid data</strong> and cannot support a recovered result.</p>
        <MeasurementGrid measurements={scenario.incident} />
        <RecoveryContractPanel scenario={scenario} />
      </EditorialSection>

      <EditorialSection title="The same condition appears differently to each authorized role.">
        <div className="lm-role-views">{roleViews.map(([role, copy]) => <article key={role}><h3>{role}</h3><p>{copy}</p></article>)}</div>
      </EditorialSection>

      <EditorialSection title="A management surface above control—not a replacement HMI." tone="grid">
        <p className="lm-v2-large-copy">PLCs, DCS, SIS, SCADA, BMS, and local HMIs retain deterministic control and safety responsibilities. Infinit-Control presents the cross-system operating response and exposes customer-authorized actions without claiming independent field authority.</p>
        <p className="lm-v2-caveat">The screen renders governed projections and events; it is not a second operational truth store, and color is never the only way state is communicated.</p>
      </EditorialSection>

      <NextStep title="Follow a real operating condition from evidence to result." copy="The Data Center Cooling reference scenario shows each measurement, work state, authority boundary, and outcome branch." label="Explore Operating Use Cases" to="/use-cases" secondary={{ label: "Discuss Your Operating View", to: "/contact?intent=operation" }} />
    </div>
  </>;
}
