import { SEO } from "@/app/components/SEO";
import { CtaLink } from "@/app/components/MarketingComponents";
import { EditorialSection } from "@/app/components/NarrativeComponents";
import { ControlCommandCenterVisual, ControlPortalExperience, ControlPriorityVisual, ControlRoleVisual } from "@/app/components/InfinitControlExperience";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

export function InfinitControlPage() {
  const description = "Infinit-Control gives authorized teams one current view of operating impact, ownership, work, exceptions, and return telemetry.";
  return <><SEO title="Infinit-Control | Operating State Governance" description={description} canonicalPath="/infinit-control" jsonLd={[createProductSchema("Infinit-Control", "/infinit-control", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Infinit-Control", path: "/infinit-control" }])]} /><div className="lm-v2-page lm-product-story-page lm-product-story-page--control lm-control-v5">
    <ControlMissionHero />
    <FragmentedResponse />
    <EditorialSection eyebrow="ONE CASE. EVERY DECISION LEVEL." title="One operating context, tuned for every role." intro="The C-suite sees enterprise exposure. Plant managers see the affected area, capacity, and owner. Supervisors see the current response. Shift workers see the exact asset, readings, assigned work, and next action. The view changes with the job, while the facts, ownership, and status remain the same." tone="grid"><ControlRoleVisual /></EditorialSection>
    <SignalPicture />
    <EditorialSection eyebrow="GOVERN BY STATE, NOT SCREEN" title="Keep the issue open until the plant is stable." intro="Infinit-Control keeps the current condition, owner, work state, approvals, exceptions, and return measurements in view. Stale, quarantined, unresolved, or missing inputs are shown as No valid data and cannot support a recovered result. PLCs, DCS, SIS, SCADA, BMS, and local HMIs retain deterministic control and safety responsibilities." tone="grid"><ControlCommandCenterVisual /></EditorialSection>
  </div></>;
}

function ControlMissionHero() {
  return <header className="lm-control-mission-hero" aria-labelledby="control-mission-heading"><div className="lm-v2-container"><div className="lm-control-mission-hero__copy"><p className="lm-eyebrow">INFINIT-CONTROL · OPERATIONS COMMAND PORTAL</p><h1 id="control-mission-heading">One operating truth. Tuned for every role.</h1><p>Infinit-Control gives authorized teams one live view of operating impact, ownership, work, exceptions, and return measurements. Everyone sees the same case, from the C-suite to the shift worker, with only the detail their decision requires.</p><p>Current impact, owner, authority, work, exceptions, and return readings stay together as the case changes.</p><strong>Stale or missing readings stay visible and cannot close the case.</strong><div className="lm-actions"><CtaLink to="#control-role-panel">Explore the Role Views</CtaLink><CtaLink to="#operating-state" variant="secondary">Review the Operating State</CtaLink></div></div><ControlPortalExperience /></div></header>;
}


function FragmentedResponse() {
  return <EditorialSection eyebrow="END THE SWIVEL-CHAIR RESPONSE" title="Stop rebuilding the same issue across separate screens." intro="An alarm can show that something changed without showing the affected production, current owner, work already underway, or whether the equipment later recovered. Infinit-Control brings those pieces together around the issue instead of making the operator act as the integration layer."><ControlPriorityVisual /></EditorialSection>;
}

function SignalPicture() {
  return <EditorialSection id="operating-state" eyebrow="BRING THE SIGNALS TO THE ISSUE" title="Alerts, maps, approved media, work, and telemetry belong in the same response." intro="A useful command view organizes only the information needed for the current decision. Location, trends, operating consequence, ownership, work, and approved media remain tied to the equipment condition. Each measurement shows its value, unit, expected range, status, and freshness."><div className="lm-enterprise-split-story lm-enterprise-split-story--reverse"><figure className="lm-enterprise-story-image"><img src="/images/products/infinit-control/field-command-v2.png" alt="A plant supervisor reviews equipment measurements, ownership, work status, and return readings beside the physical asset." width="1536" height="1024" loading="lazy" /></figure><div className="lm-enterprise-split-story__points"><article><span>01</span><div><h3>See the equipment in context</h3><p>Connect the alert to the asset, site, process, and current operating consequence.</p></div></article><article><span>02</span><div><h3>See who owns the response</h3><p>Keep the assigned team, current work, next action, and elapsed time together.</p></div></article><article><span>03</span><div><h3>See the return reading</h3><p>Keep the issue open until current measurements show that the equipment is stable.</p></div></article></div></div></EditorialSection>;
}
