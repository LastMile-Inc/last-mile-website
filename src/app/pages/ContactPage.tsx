import { SEO } from "@/app/components/SEO";
import { ContactLastMileForm } from "@/app/components/ContactLastMileForm";
import { EditorialHero, InlineLink } from "@/app/components/NarrativeComponents";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

export function ContactPage() {
  const description =
    "Start with one operating issue that crosses teams or systems. Last Mile will help map the response and the readings that matter.";
  return (
    <>
      <SEO
        title="Discuss Your Operation | Last Mile"
        description={description}
        canonicalPath="/contact"
        markdownPath="/contact.md"
        jsonLd={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])}
      />
      <div className="lm-v2-page">
        <EditorialHero
          eyebrow="Discuss your operation"
          title="Show us where the response breaks."
          intro="Describe one operating problem, where it starts, who responds, and which return reading tells you the equipment is back to normal."
        />

        <section className="lm-contact lm-contact-v2">
          <div className="lm-v2-container">
            <aside className="lm-contact__context">
              <p className="lm-eyebrow">A practical starting point</p>
              <h2>You do not need to learn our terminology first.</h2>
              <p>
                Tell us what changes, where the signal and work live, who responds, and what the operation must do after intervention.
                We will map that chain with you.
              </p>
              <div className="lm-contact__links">
                <InlineLink to="/platform">Explore the Platform</InlineLink>
                <InlineLink to="/use-cases/data-center-cooling">See a complete example</InlineLink>
              </div>
            </aside>
            <div className="lm-form-panel">
              <ContactLastMileForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}