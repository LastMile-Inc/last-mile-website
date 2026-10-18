import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

const articleRows = [
  {
    title: "A closed work order doesn’t prove the problem is fixed.",
    description:
      "Why completing a maintenance task and confirming that normal operation has returned require separate checks.",
    route: "/resources/industrial-concepts/operational-outcome-thread",
  },
  {
    title: "Where people stay in control.",
    description:
      "How automatic, assisted, and human-approved steps keep responsibility and operating limits explicit.",
    route: "/resources/industrial-concepts/industrial-ai",
  },
  {
    title: "Connected data needs operating context.",
    description:
      "How asset identity, timing, data quality, and equipment relationships make raw readings usable across teams and systems.",
    route: "/resources/industrial-concepts/uns-and-ssom",
  },
] as const;

const additionalExamples = [
  {
    label: "Compressed-air response",
    route: "/use-cases/manufacturing-compressed-air",
    note: "Manufacturing scenario",
  },
  {
    label: "Lift-station response",
    route: "/use-cases/municipal-wastewater",
    note: "Municipal wastewater scenario",
  },
  {
    label: "Refrigeration response",
    route: "/use-cases/cold-storage-refrigeration",
    note: "Cold-storage scenario",
  },
] as const;

export function ResourcesPage() {
  const description =
    "Explore practical examples of how operating signals, responsible teams, and follow-up evidence fit together, from the first sign of a problem to a checked result.";
  return (
    <>
      <SEO
        title="Resources | Last Mile"
        description={description}
        canonicalPath="/resources"
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />
      <div className="lm-v2-page lm-resources-page">
        <EditorialHero
          eyebrow="RESOURCES"
          title="See Accountable Operations in practice."
          intro={description}
          primary={{ label: "Explore the cooling scenario", to: "/use-cases/data-center-cooling" }}
          secondary={{ label: "Discuss your operation", to: "/contact?intent=operation" }}
        />

        <EditorialSection eyebrow="FEATURED OPERATING EXAMPLE" title="When a normal temperature hides a cooling problem.">
          <div className="lm-resources-featured">
            <div className="lm-resources-featured__copy">
              <p>
                This cooling scenario shows why equipment status, team response, and recovery checks need to stay connected.
              </p>
              <p className="lm-resources-featured__detail">
                A backup chilled-water pump fails to start while room temperature remains inside its normal range. Follow how the warning is checked, assigned to the facilities lead, coordinated through maintenance, and verified against post-work pump and pressure readings.
              </p>
              <InlineLink to="/use-cases/data-center-cooling">
                Explore the cooling scenario
              </InlineLink>
            </div>
            <figure className="lm-resources-featured__media">
              <img
                src="/images/platform/accountable-operations-loop-v3.png"
                alt="Accountable Operations Loop diagram showing Evidence, Understand, Decide, Coordinate, Act, and Verify."
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </EditorialSection>

        <EditorialSection
          eyebrow="ACCOUNTABLE OPERATIONS, EXPLAINED"
          title="Three practical guides to the approach."
          tone="grid"
        >
          <div className="lm-resources-article-rows">
            {articleRows.map((article) => (
              <div key={article.route} className="lm-resources-article-row">
                <div className="lm-resources-article-row__text">
                  <h3>
                    <Link to={article.route}>{article.title}</Link>
                  </h3>
                  <p>{article.description}</p>
                </div>
                <Link to={article.route} className="lm-v2-inline-link">
                  Read article <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection
          eyebrow="ADDITIONAL OPERATING EXAMPLES"
          title="Explore how the same response structure applies across operations."
        >
          <ul className="lm-resources-example-links">
            {additionalExamples.map((example) => (
              <li key={example.route}>
                <Link to={example.route} className="lm-v2-inline-link">
                  {example.label} <ArrowRight aria-hidden="true" />
                </Link>
                <span>{example.note}</span>
              </li>
            ))}
          </ul>
        </EditorialSection>

        <NextStep
          title="Start with one operating challenge."
          copy="Tell us what happens today, which systems are involved, and where the response loses continuity."
          label="Discuss your operation"
          to="/contact?intent=operation"
        />
      </div>
    </>
  );
}
