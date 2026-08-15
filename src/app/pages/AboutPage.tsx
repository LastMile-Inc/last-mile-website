import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink } from "@/app/components/NarrativeComponents";
import { companyStage } from "@/app/content/siteContent";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

const principles = [
  "Keep source authority visible.",
  "Create operational records once.",
  "Preserve uncertainty instead of hiding it.",
  "Put policy before consequential action.",
  "Treat work completion and physical recovery as different states.",
  "Make failure and degraded data visible.",
  "Earn the right to automate through evidence.",
] as const;

export function AboutPage() {
  const description = "Last Mile makes operational handoffs visible and accountable across the systems people already use.";
  return (
    <>
      <SEO
        title="About Last Mile | Built for the Operational Handoffs"
        description={description}
        canonicalPath="/about"
        markdownPath="/about.md"
        jsonLd={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])}
      />

      <div className="lm-v2-page">
        <EditorialHero
          eyebrow="About Last Mile"
          title="Physical operations break when the handoff disappears."
          intro="Operators, maintenance, and service teams already have good tools. Trouble starts when an alarm, work order, service call, and return reading stop connecting. Last Mile keeps that handoff together."
          primary={{ label: "Discuss Your Operation", to: "/contact?intent=operation" }}
        />

        <EditorialSection title="Built from platform experience and operator reality." tone="grid">
          <div className="lm-founder-v2">
            <div className="lm-founder-v2__identity">
              <span className="lm-v2-card-label">Founder and CEO</span>
              <h3>Rodney Runolfson</h3>
            </div>
            <div className="lm-founder-v2__copy">
              <p>
                Rodney Runolfson brings three decades of enterprise platform experience, including work in roles at ServiceNow and within
                Deloitte&apos;s U.S. ServiceNow practice. Those experiences showed what shared platforms can do well and where physical operations
                need a different operating model.
              </p>
              <p>
                Last Mile applies those lessons without dependence on a single vendor stack. We build an operations-native platform for
                cross-system work that remains unresolved by traditional enterprise software patterns.
              </p>
            </div>
          </div>
        </EditorialSection>

        <EditorialSection eyebrow="Working principles" title="Evidence earns authority." tone="grid">
          <ul className="lm-principles-v2">
            {principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
          <InlineLink to="/resources/industrial-concepts/industry-5-0">Industry 5.0 and human authority</InlineLink>
        </EditorialSection>

        <EditorialSection eyebrow={companyStage.label} title="Clear about the stage. Focused on what can be demonstrated.">
          <div className="lm-v2-columns-2">
            <p className="lm-v2-large-copy">{companyStage.summary}</p>
            <p className="lm-v2-large-copy">{companyStage.evidence}</p>
          </div>
        </EditorialSection>

      </div>
    </>
  );
}
