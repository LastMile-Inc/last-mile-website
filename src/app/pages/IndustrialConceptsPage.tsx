import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import { industrialConcepts } from "@/app/content/industrialConcepts.generated";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

const families = [
  { title: "Data, identity, and interoperability", ids: ["CONCEPT-UNS-001", "CONCEPT-SEMANTIC-001", "CONCEPT-OPCUA-001", "CONCEPT-TWIN-001", "CONCEPT-THREAD-001"] },
  { title: "Response, authority, and industrial AI", ids: ["CONCEPT-INDUSTRIAL-AI-001", "CONCEPT-I50-001", "CONCEPT-OTSEC-001"] },
  { title: "Sovereignty and future operating models", ids: ["CONCEPT-DATASPACE-001", "CONCEPT-COMPOSABLE-001", "CONCEPT-LIGHTSOUT-001"] },
] as const;

export function IndustrialConceptsPage() {
  const description = "Clear explanations of industrial standards, operating models, and ideas that influence Last Mile, including their boundaries and relationship to verified outcomes.";
  return <>
    <SEO title="Industrial Concepts | Last Mile" description={description} canonicalPath="/resources/industrial-concepts" jsonLd={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "Industrial Concepts", path: "/resources/industrial-concepts" }])} />
    <div className="lm-v2-page">
      <EditorialHero eyebrow="INDUSTRIAL CONCEPTS" title="The architectures shaping connected, intelligent, accountable operations." intro="Clear explanations of the standards, operating models, and industrial ideas that influence Last Mile—where they help, where their boundaries remain, and how they connect to verified physical outcomes." primary={{ label: "Explore the Last Mile Platform", to: "/platform" }} secondary={{ label: "Browse Resources", to: "/resources" }} />
      <EditorialSection title="Eleven concepts. One canonical explanation for each." tone="grid">
        <div className="lm-concept-families">{families.map((family) => <section key={family.title}><h3>{family.title}</h3><div className="lm-concept-grid">{industrialConcepts.filter((concept) => family.ids.some((contentId) => contentId === concept.contentId)).map((concept) => <article key={concept.contentId}><span>{String(industrialConcepts.indexOf(concept) + 1).padStart(2, "0")}</span><h4>{concept.cardTitle}</h4><p>{concept.cardCopy}</p><InlineLink to={concept.route}>Read the concept</InlineLink></article>)}</div></section>)}</div>
      </EditorialSection>
      <NextStep title="See how these concepts become one operating architecture." copy="The Last Mile Platform applies explicit identity, evidence, authority, work, return measurement, and outcome boundaries across existing industrial systems." label="Explore the Last Mile Platform" to="/platform" secondary={{ label: "Discuss Your Architecture", to: "/contact?intent=architecture" }} />
    </div>
  </>;
}
