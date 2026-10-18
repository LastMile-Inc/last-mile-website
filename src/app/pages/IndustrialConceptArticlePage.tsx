import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, NextStep } from "@/app/components/NarrativeComponents";
import { industrialConcepts } from "@/app/content/industrialConcepts.generated";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";
import { NotFound } from "./NotFound";

export function IndustrialConceptArticlePage() {
  const { conceptSlug } = useParams();
  const concept = industrialConcepts.find((item) => item.slug === conceptSlug);
  if (!concept) return <NotFound />;

  const description = concept.canonicalPosition;
  return (
    <>
      <SEO
        title={`${concept.articleTitle} | Last Mile Resources`}
        description={description}
        canonicalPath={concept.route}
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Accountable Operations, explained", path: "/resources/industrial-concepts" },
          { name: concept.articleTitle, path: concept.route },
        ])}
      />
      <article className="lm-v2-page lm-concept-article">
        <EditorialHero
          eyebrow="ACCOUNTABLE OPERATIONS, EXPLAINED"
          title={concept.articleTitle}
          intro={concept.canonicalPosition}
        />

        {concept.sections.map((sec) => (
          <EditorialSection key={sec.heading} title={sec.heading}>
            <div className="lm-concept-prose">
              {sec.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </EditorialSection>
        ))}

        <EditorialSection
          eyebrow="IN PRACTICE"
          title="What this looks like in an operating response"
          tone="grid"
        >
          <div className="lm-concept-example">
            {concept.operatingResponse.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection title="Sources">
          <ul className="lm-concept-sources">
            {concept.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.label}
                  <ExternalLink aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </EditorialSection>

        <NextStep
          title="Start with one operating challenge."
          copy="Tell us what happens today, which systems are involved, and where the response loses continuity."
          label="Discuss your operating challenge"
          to="/contact?intent=operation"
        />
        <div className="lm-v2-container lm-concept-back-wrap">
          <Link className="lm-concept-back" to="/resources/industrial-concepts">
            <ArrowLeft aria-hidden="true" />
            Accountable Operations, explained
          </Link>
        </div>
      </article>
    </>
  );
}
