import { ArrowRight } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, NextStep } from "@/app/components/NarrativeComponents";
import { MeasurementGrid, StatusBadge } from "@/app/components/OperatingScenarioComponents";
import { TrackedLink } from "@/app/components/TrackedLink";
import { operatingScenarioList } from "@/app/pages/platformReferenceData";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

export function UseCasesPage() {
  const description = "Four controlled industrial reference scenarios showing how qualified evidence, accountable work, human authority, and return measurements connect to a verified physical outcome.";
  return <>
    <SEO title="Industrial Operating Use Cases | Last Mile" description={description} canonicalPath="/use-cases" keywords="chilled-water pump redundancy, wastewater lift-station pumping capacity, compressed-air abnormal demand, cold-storage refrigeration capacity" jsonLd={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Use Cases", path: "/use-cases" }])} />
    <div className="lm-v2-page lm-use-cases-page">
      <EditorialHero eyebrow="OPERATING USE CASES" title="Recognizable equipment. Governed response. Measured recovery." intro="Each controlled reference scenario starts with a specific operating Condition, shows the systems and people involved, and defines the current valid return measurements required to establish the result." primary={{ label: "Map One Operating Condition", to: "/contact?intent=operation" }} secondary={{ label: "Inspect the Platform", to: "/platform" }} />
      <EditorialSection title="Four operating problems. One accountability discipline." tone="grid">
        <div className="lm-use-case-collection">{operatingScenarioList.map((scenario) => <article key={scenario.key}>
          <header><span>{scenario.industry}</span><StatusBadge status={scenario.severity} label="Reference Condition" /></header>
          <h3>{scenario.operatingProblem}</h3><p>{scenario.conditionDetail}</p><strong>{scenario.context}</strong>
          <MeasurementGrid measurements={scenario.incident.slice(0, 4)} compact />
          <TrackedLink to={scenario.route} eventName="cta_explore_platform_click">Explore {scenario.menuLabel}<ArrowRight aria-hidden="true" /></TrackedLink>
        </article>)}</div>
      </EditorialSection>
      <EditorialSection title="A use case is complete only when the Accountable Operations Loop is complete.">
        <ol className="lm-five-stage-summary">{["Evidence", "Understand", "Decide", "Coordinate", "Act", "Verify"].map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong></li>)}</ol>
        <p className="lm-v2-caveat">Every scenario is a controlled Last Mile demonstration. It is not a customer case study, production deployment, savings claim, or regulatory-performance claim.</p>
      </EditorialSection>
      <NextStep title="Show us where one operating response breaks." copy="Start with the asset, measurements, owner, systems, work handoffs, authority boundaries, and criteria that would prove recovery." label="Discuss Your Operation" to="/contact?intent=operation" secondary={{ label: "Explore the Platform", to: "/platform" }} />
    </div>
  </>;
}
