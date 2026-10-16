import { ContactLastMileForm } from "@/app/components/ContactLastMileForm";
import { SEO } from "@/app/components/SEO";
import { ArrowRight } from "lucide-react";
import { ServiceNote } from "@/app/components/makeover/SiteShell";

export function DemoPage() {
  return (
    <>
      <SEO
        title={"Request a demo | Last Mile"}
        description={"Walk through an example, explore how the platform fits your systems, and ask the questions that matter to your team. Bring a use case—or start with one of ours."}
        canonicalPath="/demo"
        robots="noindex, nofollow"
      />
      <main id="main">
        <section className="conversion-hero wrap">
          <div>
            <p className="eyebrow">SEE LAST MILE IN ACTION</p>
            <h1>
              See Last Mile take an operating issue{" "}
              <span>from warning to verified recovery.</span>
            </h1>
            <p className="page-lead">
              Walk through an example, explore how the platform fits your systems, and ask the questions that matter to your team. Bring a use case—or start with one of ours.
            </p>
          </div>
          <aside className="request-panel" id="request">
            <ContactLastMileForm mode="demo" />
          </aside>
        </section>
        <section className="band section-space">
          <div className="wrap">
            <p className="eyebrow">WHAT WE’LL EXPLORE TOGETHER</p>
            <h2>A useful demo goes all the way.</h2>
            <div className="principles">
              <article>
                <span>01</span>
                <h3>The issue in context.</h3>
                <p>
                  What changed? What does the equipment tell us? What does your team need to understand before taking action?
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>The complete response.</h3>
                <p>
                  Who owns the next step? What requires approval? How do people stay coordinated as the work moves forward?
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>The evidence of recovery.</h3>
                <p>
                  What readings would show the response worked? How does the team see the outcome and the work behind it?
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="wrap section-space">
          <ServiceNote />
        </section>
        <section className="demo-prep wrap section-bottom">
          <div>
            <p className="eyebrow">ONE THING TO BRING</p>
            <h2>Bring a question. We’ll bring an example.</h2>
            <p>
              You do not need a prepared project or presentation. Start with a recent operating issue, a question about your systems, or one of our reference scenarios.
            </p>
            <p style={{ marginTop: "20px" }}>
              <a className="text-link" href="/infinit-control#work-completion-vs-recovery">
                Explore an operating example <ArrowRight size={18} />
              </a>
            </p>
          </div>
          <div>
            <p className="large-copy">
              Interested in working with us as the product develops?
            </p>
            <p>
              Our Private Beta Release is a closer collaboration with the people doing the real work.
            </p>
            <a className="text-link" href="/private-beta">
              Explore the private beta <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
