import { SEO } from "@/app/components/SEO";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageIntro, ClosingCTA } from "@/app/components/makeover/SiteShell";
import "@/styles/supporting-pages.css";

const reasons = [
  {
    n: "01",
    title: "Keep your systems. Connect the work between them.",
    text: "Bring equipment information, maintenance work, and service updates into a coordinated response across your existing systems. Keep responsibility visible as the issue crosses teams and tools.",
    question: "Show me how the response stays connected across systems.",
  },
  {
    n: "02",
    title: "Give AI an understanding of your operation.",
    text: "Singularity connects readings to equipment, dependencies, history, and ongoing work, giving people and AI the context to assess what an issue means.",
    question: "Show me what this issue affects and why.",
  },
  {
    n: "03",
    title: "Automate the next step with clear authority.",
    text: "Move approved digital tasks forward under your operating rules. Make required approvals explicit and keep consequential action within the authority your organization defines.",
    question: "Show me what can run automatically and what needs approval.",
  },
  {
    n: "04",
    title: "Know whether the operation actually recovered.",
    text: "Check the operating evidence after the work. Keep completed tasks distinct from confirmed recovery, and make it clear when further action or evidence is needed.",
    question: "Show me how we know the response worked.",
  },
];

export function WhyLastMilePage() {
  return (
    <>
      <SEO
        title={"Why Last Mile | Accountable Operations"}
        description={
          "Equipment controls, historians, maintenance software, and service teams each hold part of the story. Last Mile connects their information and work around one operational issue."
        }
        canonicalPath="/why-last-mile"
        robots="noindex, nofollow"
      />
      <main id="main">
        <PageIntro
          label="WHY LAST MILE"
          title="The platform Industry has been waiting for."
          description="Equipment controls, historians, maintenance software, and service teams each hold part of the story. Last Mile connects their information and work around one operational issue, so your team can understand what changed, coordinate the response, and verify the result."
        >
          <div className="hero-actions">
            <a className="button" href="/demo">
              Request a demo <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href="/how-it-works">
              See Accountable Operations <ArrowRight size={18} />
            </a>
          </div>
        </PageIntro>

        <section
          className="why-now-section wrap"
          aria-labelledby="why-now-title"
        >
          <div className="why-now-header">
            <p className="eyebrow">Why Now?</p>
            <h2 id="why-now-title">
              Industry is moving fast. Give your team the capacity to keep pace.
            </h2>
            <p className="why-now-intro">
              More connected equipment means more signals to interpret and more
              responses to coordinate. Your team needs a practical way to turn
              that information into action, while keeping daily operations
              moving.
            </p>
          </div>

          <div className="why-now-columns">
            <div className="why-now-point">
              <h3>Your team already has a day job.</h3>
              <p>
                Keeping operations running takes expertise and attention.
                Building and maintaining the software that connects data,
                decisions, and response is another job entirely. Last Mile
                brings that coordination into one platform, helping your people
                focus on production, service, and the work that needs their
                judgment.
              </p>
            </div>

            <div className="why-now-point">
              <h3>More data should mean clearer decisions.</h3>
              <p>
                A temperature reading, an equipment alarm, and a maintenance
                record each tell part of the story. The challenge is
                understanding what they mean together, and what needs attention
                next. Last Mile applies AI to help connect operating signals
                with asset context and response history, so your team can move
                from scattered information to informed action.
              </p>
            </div>
          </div>

          <p className="why-now-closing">
            Put your existing systems, and your team’s expertise, to work
            together.
          </p>
        </section>

        <section className="category-statement band">
          <div className="wrap editorial-split">
            <div>
              <p className="eyebrow">ACCOUNTABLE OPERATIONS</p>
              <h2>Keep the response connected until the result is clear.</h2>
            </div>
            <div>
              <p className="large-copy">
                A warning can trigger work in several systems without giving
                anyone a complete view of the response. Accountable Operations
                connects the evidence, decisions, responsibilities, and work, and
                checks the result against what the equipment is actually doing.
              </p>
            </div>
          </div>
        </section>

        <section className="reasons wrap section-space">
          <div className="section-top">
            <div>
              <p className="eyebrow">FOUR REASONS TO TAKE A CLOSER LOOK</p>
              <h2>Ask more of your next platform.</h2>
            </div>
          </div>
          {reasons.map((reason) => (
            <article className="reason-row" key={reason.n}>
              <span className="item-number">{reason.n}</span>
              <h3>{reason.title}</h3>
              <div>
                <p>{reason.text}</p>
                <div className="demo-question">
                  <span>ASK US IN YOUR DEMO</span>
                  <strong>“{reason.question}”</strong>
                </div>
                {reason.n === "04" && (
                  <a
                    className="text-link reason-service-link"
                    href="/infinit-control#work-completion-vs-recovery"
                  >
                    See work completion versus recovery <ArrowRight size={17} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="decision-panel wrap">
          <div>
            <p className="eyebrow">SERVICE &amp; FOLLOW-THROUGH</p>
            <h2>A team that stays involved.</h2>
          </div>
          <div>
            <p>
              Named operations contacts, direct conversation, and proactive
              follow-through are central to the service relationship we’re
              building.
            </p>
            <p style={{ marginTop: "18px" }}>
              <a className="text-link" href="/our-service">
                Explore our service approach <ArrowRight size={17} />
              </a>
            </p>
          </div>
        </section>

        <ClosingCTA title="See what the last mile could look like." />
      </main>
    </>
  );
}
