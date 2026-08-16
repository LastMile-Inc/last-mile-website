import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection } from "@/app/components/NarrativeComponents";
import { ControlCommandCenterVisual, ControlContinuityVisual, ControlPriorityVisual, ControlRoleVisual } from "@/app/components/InfinitControlExperience";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

export function InfinitControlPage() {
  const description = "Infinit-Control gives authorized teams one current view of operating impact, ownership, work, exceptions, and return telemetry.";
  return <><SEO title="Infinit-Control | Operating State Governance" description={description} canonicalPath="/infinit-control" jsonLd={[createProductSchema("Infinit-Control", "/infinit-control", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Infinit-Control", path: "/infinit-control" }])]} /><div className="lm-v2-page lm-product-story-page lm-product-story-page--control lm-control-v5">
    <EditorialHero eyebrow="INFINIT-CONTROL · GOVERNANCE + VALIDATION" title="See one live operating state from first signal to stable equipment." intro="This is not another dashboard. Current impact, owner, authority, work, exceptions, and return readings stay together as the case changes." support="Executives, site leaders, and crews receive the detail appropriate to their decisions. No stale or missing reading can close the case." visual={<ControlContinuityVisual />} />
    <FragmentedResponse />
    <EditorialSection eyebrow="ONE CASE. THREE DECISION LEVELS." title="One case. The right operating detail for every role." intro="Executives see operating exposure. Site leaders see the affected area, capacity, and owner. Supervisors see the exact asset, current readings, assigned work, and next action. The view changes with the decision, while ownership and status remain connected." tone="grid"><ControlRoleVisual /></EditorialSection>
    <SignalPicture />
    <EditorialSection eyebrow="GOVERN BY STATE, NOT SCREEN" title="Keep the issue open until the plant is stable." intro="Infinit-Control keeps the current condition, owner, work state, approvals, exceptions, and return measurements in view. Stale, quarantined, unresolved, or missing inputs are shown as No valid data and cannot support a recovered result. PLCs, DCS, SIS, SCADA, BMS, and local HMIs retain deterministic control and safety responsibilities." tone="grid"><ControlCommandCenterVisual /></EditorialSection>
  </div></>;
}


function FragmentedResponse() {
  return <EditorialSection eyebrow="END THE SWIVEL-CHAIR RESPONSE" title="Stop rebuilding the same issue across separate screens." intro="An alarm can show that something changed without showing the affected production, current owner, work already underway, or whether the equipment later recovered. Infinit-Control brings those pieces together around the issue instead of making the operator act as the integration layer."><ControlPriorityVisual /></EditorialSection>;
}

function SignalPicture() {
  return <EditorialSection eyebrow="BRING THE SIGNALS TO THE ISSUE" title="Alerts, maps, approved media, work, and telemetry belong in the same response." intro="A useful command view organizes only the information needed for the current decision. Location, trends, operating consequence, ownership, work, and approved media remain tied to the equipment condition. Each measurement shows its value, unit, expected range, status, and freshness."><div className="lm-enterprise-split-story lm-enterprise-split-story--reverse"><figure className="lm-enterprise-story-image"><img src="/images/products/infinit-control/field-command-v2.png" alt="A plant supervisor reviews equipment measurements, ownership, work status, and return readings beside the physical asset." width="1536" height="1024" loading="lazy" /></figure><div className="lm-enterprise-split-story__points"><article><span>01</span><div><h3>See the equipment in context</h3><p>Connect the alert to the asset, site, process, and current operating consequence.</p></div></article><article><span>02</span><div><h3>See who owns the response</h3><p>Keep the assigned team, current work, next action, and elapsed time together.</p></div></article><article><span>03</span><div><h3>See the return reading</h3><p>Keep the issue open until current measurements show that the equipment is stable.</p></div></article></div></div></EditorialSection>;
}
