import { ArrowRight } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, NextStep } from "@/app/components/NarrativeComponents";
import { TrackedLink } from "@/app/components/TrackedLink";
import { operatingScenarioList } from "@/app/pages/platformReferenceData";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

export function UseCasesPage() {
  const description =
    "Four operating scenarios showing how equipment readings, responsible teams, coordinated work, and post-work recovery checks stay connected.";
  return (
    <>
      <SEO
        title="Operating Scenarios | Last Mile"
        description={description}
        canonicalPath="/use-cases"
        keywords="chilled-water pump redundancy, wastewater lift-station pumping capacity, compressed-air abnormal demand, cold-storage refrigeration capacity"
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Use Cases", path: "/use-cases" },
        ])}
      />
      <div className="lm-v2-page lm-use-cases-page">
        <EditorialHero
          eyebrow="OPERATING SCENARIOS"
          title="See how Accountable Operations connects an issue from warning to recovery."
          intro="Each scenario starts with a recognizable operating problem, shows who needs to respond across systems, and explains how post-work equipment readings check the result."
          primary={{ label: "Discuss your operation", to: "/contact?intent=operation" }}
          secondary={{ label: "Explore the Platform", to: "/platform" }}
        />

        <EditorialSection title="Four operating scenarios." tone="grid">
          <div className="lm-use-case-collection">
            {operatingScenarioList.map((scenario) => (
              <article key={scenario.key}>
                <header>
                  <span>{scenario.industry}</span>
                </header>
                <h3>{scenario.operatingProblem}</h3>
                <p>{scenario.conditionDetail}</p>
                <strong>{scenario.context}</strong>
                <TrackedLink to={scenario.route} eventName="cta_explore_platform_click">
                  Explore {scenario.menuLabel}
                  <ArrowRight aria-hidden="true" />
                </TrackedLink>
              </article>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection title="A response is complete only when the operating result has been checked.">
          <ol className="lm-five-stage-summary">
            {["Evidence", "Understand", "Decide", "Coordinate", "Act", "Verify"].map((stage, index) => (
              <li key={stage}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stage}</strong>
              </li>
            ))}
          </ol>
        </EditorialSection>

        <NextStep
          title="Start with one operating challenge."
          copy="Tell us what happens today, which systems are involved, and where the response loses continuity."
          label="Discuss your operation"
          to="/contact?intent=operation"
          secondary={{ label: "Explore the Platform", to: "/platform" }}
        />
      </div>
    </>
  );
}
