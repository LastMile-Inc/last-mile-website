import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import { industrialConcepts } from "@/app/content/industrialConcepts.generated";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

export function IndustrialConceptsPage() {
  const description = "Three plain-English articles explaining how Accountable Operations connects equipment context, human authority, and verified recovery.";
  return (
    <>
      <SEO
        title="Accountable Operations, explained | Last Mile"
        description={description}
        canonicalPath="/resources/industrial-concepts"
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Accountable Operations, explained", path: "/resources/industrial-concepts" },
        ])}
      />
      <div className="lm-v2-page">
        <EditorialHero
          eyebrow="RESOURCES"
          title="Accountable Operations, explained"
          intro="Practical explanations of how equipment context, human authority, and post-work verification fit together across existing industrial systems."
          primary={{ label: "See Resources", to: "/resources" }}
          secondary={{ label: "Explore the Platform", to: "/platform" }}
        />
        <EditorialSection title="Three core ideas behind the approach." tone="grid">
          <div className="lm-concept-grid">
            {industrialConcepts.map((concept, index) => (
              <article key={concept.contentId}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{concept.cardTitle}</h3>
                <p>{concept.cardCopy}</p>
                <InlineLink to={concept.route}>Read the article</InlineLink>
              </article>
            ))}
          </div>
        </EditorialSection>
        <NextStep
          title="Start with one operating challenge."
          copy="Tell us what happens today, which systems are involved, and where the response loses continuity."
          label="Discuss your operating challenge"
          to="/contact?intent=operation"
        />
      </div>
    </>
  );
}
