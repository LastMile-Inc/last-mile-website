import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink } from "@/app/components/NarrativeComponents";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

const resourceGroups = [
  {
    title: "Build and proof",
    copy:
      "Demonstration milestones, architecture briefs, reference updates, and product status. We publish what is being tested so you can review the evidence trail.",
    link: ["Review the cooling proof", "/use-cases/data-center-cooling"],
  },
  {
    title: "Industrial concepts",
    copy:
      "Canonical explanations of UNS, SSOM, interoperability, operational memory, industrial AI, and OT security. Focus is on constraints and operational boundaries.",
    link: ["Explore industrial concepts", "/resources/industrial-concepts"],
  },
  {
    title: "Signal 2 Action",
    copy: "Editorial episodes and perspective on practical signals, authority, workflow design, and measurable operations.",
    link: ["Visit Signal 2 Action", "/signal-to-action"],
  },
  {
    title: "Company context",
    copy: "Milestones, partnerships, and corporate updates with clear separation between current platform status and historical record.",
    link: ["Read news archive", "/company/newsroom"],
  },
] as const;

export function ResourcesPage() {
  const description = "Explore Last Mile architecture, product progress, reference proof, operational perspectives, and current company context.";
  return (
    <>
      <SEO
        title="Resources | Last Mile Build, Proof, and Perspectives"
        description={description}
        canonicalPath="/resources"
        jsonLd={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }])}
      />
      <div className="lm-v2-page">
        <EditorialHero
          eyebrow="Resources"
          title="Start with what you can inspect today."
          intro="Review the current platform, use cases, and operating point of view. Historical material remains available as context, not as current claims."
          primary={{ label: "Inspect the Platform", to: "/platform" }}
          secondary={{ label: "Discuss Your Operation", to: "/contact?intent=operation" }}
        />

        <EditorialSection title="Choose the kind of evidence you need." tone="grid">
          <div className="lm-resource-grid">
            {resourceGroups.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
                <InlineLink to={group.link[1]}>{group.link[0]}</InlineLink>
              </article>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection eyebrow="Historical context" title="Prior strategic chapter.">
          <p className="lm-v2-large-copy">
            Older releases and episodes that foreground the company&apos;s former ServiceNow chapter remain in the public record for context.
            They are not presented as proof of the current independent Last Mile Platform.
          </p>
          <InlineLink to="/company/newsroom">Open the company news archive</InlineLink>
        </EditorialSection>

      </div>
    </>
  );
}
