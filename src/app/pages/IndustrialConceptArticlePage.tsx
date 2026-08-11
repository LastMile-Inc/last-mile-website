import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import { industrialConcepts } from "@/app/content/industrialConcepts.generated";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

export function IndustrialConceptArticlePage() {
  const { conceptSlug } = useParams();
  const concept = industrialConcepts.find((item) => item.slug === conceptSlug);
  if (!concept) return <Navigate to="/resources/industrial-concepts" replace />;

  const description = concept.cardCopy;
  const isIndustryFive = concept.contentId === "CONCEPT-I50-001";
  return <>
    <SEO title={`${concept.cardTitle} | Last Mile Industrial Concepts`} description={description} canonicalPath={concept.route} jsonLd={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "Industrial Concepts", path: "/resources/industrial-concepts" }, { name: concept.cardTitle, path: concept.route }])} />
    <article className="lm-v2-page lm-concept-article">
      <EditorialHero eyebrow="INDUSTRIAL CONCEPTS" title={concept.articleTitle} intro={concept.canonicalPosition} />

      <EditorialSection title="The concept and the operating boundary">
        <div className="lm-concept-prose">{concept.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        {concept.comparison.length ? <div className="lm-concept-table" role="table" aria-label={`${concept.cardTitle} boundary summary`}>{concept.comparison.map((row, rowIndex) => <div key={row.join("|")} role="row" className={rowIndex === 0 ? "is-heading" : ""}>{row.map((cell) => rowIndex === 0 ? <strong key={cell} role="columnheader">{cell}</strong> : <span key={cell} role="cell">{cell}</span>)}</div>)}</div> : null}
      </EditorialSection>

      <EditorialSection eyebrow="OPERATING RESPONSE" title="What this looks like in an operating response" tone="grid">
        <div className="lm-concept-example">{concept.operatingResponse.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </EditorialSection>

      <EditorialSection eyebrow="BOUNDARY" title="What this article does not imply" tone="grid">
        <p className="lm-v2-large-copy">{concept.boundary}</p>
        <p className="lm-v2-caveat">This article explains Last Mile&apos;s position and governed reference architecture. It does not claim that every described capability is implemented in customer production.</p>
      </EditorialSection>

      <EditorialSection title="Sources">
        <ul className="lm-concept-sources">{concept.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink aria-hidden="true" /></a></li>)}</ul>
        {isIndustryFive ? <InlineLink to="/about">How human authority connects to why Last Mile was built</InlineLink> : null}
      </EditorialSection>

      <NextStep title="Connect the concept to the operating architecture." copy="See the product boundaries, evidence path, authority model, and verified-outcome rules that turn these ideas into a governed reference architecture." label="Explore the Last Mile Platform" to="/platform" />
      <Link className="lm-concept-back" to="/resources/industrial-concepts"><ArrowLeft aria-hidden="true" />All Industrial Concepts</Link>
    </article>
  </>;
}
