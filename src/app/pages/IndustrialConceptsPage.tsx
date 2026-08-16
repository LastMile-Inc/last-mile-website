import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink } from "@/app/components/NarrativeComponents";
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
      <EditorialHero eyebrow="INDUSTRIAL CONCEPTS" title="Understand what belongs where." intro="Plain-language guides explain the standards and operating models behind Last Mile, where each one helps, and where its responsibility ends." primary={{ label: "Explore the Last Mile Platform", to: "/platform" }} secondary={{ label: "Browse Resources", to: "/resources" }} />
      <EditorialSection title="Eleven concepts. One canonical explanation for each." tone="grid">
        <div className="lm-concept-families">{families.map((family) => <section key={family.title}><h3>{family.title}</h3><div className="lm-concept-grid">{industrialConcepts.filter((concept) => family.ids.some((contentId) => contentId === concept.contentId)).map((concept) => <article key={concept.contentId}><span>{String(industrialConcepts.indexOf(concept) + 1).padStart(2, "0")}</span><h4>{concept.cardTitle}</h4><p>{concept.cardCopy}</p><InlineLink to={concept.route}>Read the concept</InlineLink></article>)}</div></section>)}</div>
      </EditorialSection>
    </div>
  </>;
}
