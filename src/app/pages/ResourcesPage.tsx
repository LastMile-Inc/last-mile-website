import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

const resourceGroups = [
  {
    title: "See an operating example",
    copy: "Follow an issue from the first operating evidence through coordinated work and verification.",
    link: ["See an operating example", "/use-cases"],
  },
  {
    title: "Evaluate the architecture",
    copy: "Review source connections, deployment boundaries, telemetry sizing, and technical reference material.",
    link: ["Evaluate the architecture", "/resources/architect-reference-center"],
  },
  {
    title: "Plan an implementation",
    copy: "Explore rollout considerations, responsibilities, and the criteria for a useful starting scope.",
    link: ["Plan an implementation", "/resources/pmo-implementation-hub"],
  },
  {
    title: "Explore industrial intelligence",
    copy: "Understand operational context, interoperability, industrial AI, and the concepts behind the platform.",
    link: ["Explore industrial intelligence", "/resources/industrial-concepts"],
  },
  {
    title: "Listen to Signal 2 Action",
    copy: "Explore practical perspectives on connecting industrial information, decisions, and action.",
    link: ["Listen to Signal 2 Action", "/signal-to-action"],
  },
  {
    title: "Company news",
    copy: "Read company updates and the historical archive.",
    link: ["Company news", "/company/newsroom"],
  },
] as const;

export function ResourcesPage() {
  const description = "Explore operating examples, architecture guidance, and practical explanations for evaluating Last Mile with your operations, engineering, and IT teams.";
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
      <div className="lm-v2-page">
        <EditorialHero
          eyebrow="Resources"
          title="See how Last Mile fits your operation."
          intro="Explore operating examples, architecture guidance, and practical explanations for evaluating Last Mile with your operations, engineering, and IT teams."
          primary={{ label: "Explore operating examples", to: "/use-cases" }}
          secondary={{ label: "Request a demo", to: "/demo" }}
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
        <NextStep
          title="Bring your operation into the conversation."
          copy="Explore the examples, review the architecture, and talk with us about a practical starting point for your team."
          label="Request a demo"
          to="/demo"
        />
      </div>
    </>
  );
}
