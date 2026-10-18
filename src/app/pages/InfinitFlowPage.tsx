import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { trackEvent } from "@/app/lib/analytics";
import {
  createBreadcrumbSchema,
  createProductSchema,
} from "@/app/lib/structuredData";
import "@/styles/infinit-flow-page.css";

const routingStages = [
  {
    id: "operating-context",
    label: "Operating context",
    summary:
      "Start with the affected equipment, relevant history, dependencies, and the issue that needs a response.",
  },
  {
    id: "rules-and-approvals",
    label: "Rules and approvals",
    summary:
      "Apply configured response rules and make required approvals clear before the next step proceeds.",
  },
  {
    id: "people-and-systems",
    label: "People and systems",
    summary:
      "Coordinate tasks and updates across the teams and connected systems involved.",
  },
  {
    id: "progress-and-evidence",
    label: "Progress and evidence",
    summary:
      "Keep work updates connected to the response, then check operating evidence to determine the result.",
  },
] as const;

const actionDistinctions = [
  {
    mode: "ASSIST",
    title: "A recommended action",
    summary:
      "Infinit-Flow brings together the relevant equipment context, operating history, and suggested next step for an operator or engineer to review. Nothing changes in your systems until an authorized person decides how to proceed.",
  },
  {
    mode: "HUMAN AUTHORITY",
    title: "An approved action",
    summary:
      "Steps that affect physical equipment, maintenance, or safety wait at clear approval checkpoints. The responsible person reviews the scope and records the decision before work proceeds.",
    canonicalRule:
      "Physical work, safety procedures, lockout/tagout, and equipment control remain under your team's authority.",
  },
  {
    mode: "AUTO",
    title: "An executed action",
    summary:
      "When your rules explicitly allow a specific digital step, such as opening a linked work request, sending a team notification, or updating a case record, Infinit-Flow runs that step and logs the confirmation.",
  },
] as const;

const handoffPreservedItems = [
  {
    term: "Responsibility",
    detail:
      "Who owns the overall response and who is responsible for the current step across operations, maintenance, or external service teams.",
  },
  {
    term: "Required approval",
    detail:
      "Which role or person must approve a step before work is dispatched, escalated, or closed.",
  },
  {
    term: "Work status",
    detail:
      "Whether a task or external work order is waiting, accepted, in progress, blocked, or marked complete, tracked with clear timing and follow-up.",
  },
  {
    term: "Return evidence for the next step",
    detail:
      "What equipment readings and stability checks must be reviewed after the work finishes. Closing a work order records that the task finished, while Singularity checks the equipment readings after the work to confirm whether the issue is resolved.",
  },
] as const;

const connectedProducts = [
  {
    step: "01",
    name: "Infinit-Signal",
    role: "Reliable data",
    summary: "Reliable data from your existing systems.",
    href: "/infinit-signal",
    current: false,
  },
  {
    step: "02",
    name: "Singularity",
    role: "The operational world model",
    summary: "Understand your equipment in context.",
    href: "/singularity",
    current: false,
  },
  {
    step: "03",
    name: "Infinit-Flow",
    role: "Coordinated work",
    summary: "Keep work moving across teams and systems.",
    href: "/infinit-flow",
    current: true,
  },
  {
    step: "04",
    name: "Infinit-Control",
    role: "Role-based visibility",
    summary: "See what needs attention and what changed.",
    href: "/infinit-control",
    current: false,
  },
] as const;

export function InfinitFlowPage() {
  const demoUrl = "/demo?source=infinit-flow";
  const pageDescription =
    "Infinit-Flow coordinates tasks, approvals, and approved automated actions around a shared operational issue, so responsibility, progress, and next steps stay connected.";

  return (
    <main className="lm-product-detail lm-infinit-flow" id="main">
      <SEO
        title="Infinit-Flow | Keep Work Moving Across People and Systems"
        description={pageDescription}
        canonicalPath="/infinit-flow"
        jsonLd={[
          createProductSchema("Infinit-Flow", "/infinit-flow", pageDescription),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Platform", path: "/platform" },
            { name: "Infinit-Flow", path: "/infinit-flow" },
          ]),
        ]}
      />

      {/* A. Hero */}
      <section className="flow-hero wrap" aria-labelledby="flow-hero-title">
        <div className="flow-hero-copy">
          <p className="eyebrow">
            <span className="little-line" />
            INFINIT-FLOW
          </p>
          <h1 id="flow-hero-title">
            Keep work moving across people and systems.
          </h1>
          <p className="flow-hero-lead">
            Coordinate tasks, approvals, and approved automated actions around a
            shared operational issue, so responsibility, progress, and next steps
            stay connected.
          </p>
          <div className="hero-actions">
            <a
              className="button"
              href={demoUrl}
              onClick={() =>
                trackEvent("cta_demo_click", {
                  placement: "infinit_flow_hero",
                  destination: demoUrl,
                })
              }
            >
              Request a demo <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="/platform" className="text-link">
              Explore the platform <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className="flow-hero-figure">
          <div className="flow-hero-media">
            <picture>
              <source
                type="image/avif"
                srcSet="/images/platform/infinit-flow-control-room-640.avif 640w, /images/platform/infinit-flow-control-room-960.avif 960w, /images/platform/infinit-flow-control-room-1280.avif 1280w, /images/platform/infinit-flow-control-room-1672.avif 1672w"
                sizes="(max-width: 1080px) calc(100vw - 64px), 620px"
              />
              <source
                type="image/webp"
                srcSet="/images/platform/infinit-flow-control-room-640.webp 640w, /images/platform/infinit-flow-control-room-960.webp 960w, /images/platform/infinit-flow-control-room-1280.webp 1280w, /images/platform/infinit-flow-control-room-1672.webp 1672w"
                sizes="(max-width: 1080px) calc(100vw - 64px), 620px"
              />
              <img
                src="/images/platform/infinit-flow-control-room.png"
                alt="Industrial display showing a coordinated workflow diagram in front of a manufacturing facility."
                width={1672}
                height={941}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </figure>
      </section>

      {/* B. Main Explanatory Image (Industrial Data Flow Network.png -> orchestration-routing-web-v4) */}
      <section
        className="flow-section flow-section--canvas"
        aria-labelledby="flow-routing-title"
      >
        <div className="wrap">
          <div className="flow-section-header flow-section-header--wide">
            <p className="eyebrow">
              <span className="little-line" />
              COORDINATED RESPONSE ROUTING
            </p>
            <h2 id="flow-routing-title">
              You got workflows?  We do workflows.
            </h2>
            <p className="flow-section-lead">
              When an issue crosses operations, maintenance, and service
              providers, responsibility can become unclear. Infinit-Flow keeps
              the owner, approvals, work, and next step connected.
            </p>
          </div>

          <figure
            className="flow-routing-figure"
            aria-label="Diagram of Infinit-Flow connecting operating context, rules and approvals, people and systems, and progress and evidence"
          >
            <div className="flow-routing-canvas">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/platform/orchestration-routing-web-v4-640.avif 640w, /images/platform/orchestration-routing-web-v4-960.avif 960w, /images/platform/orchestration-routing-web-v4-1280.avif 1280w, /images/platform/orchestration-routing-web-v4-1672.avif 1672w"
                  sizes="(max-width: 1320px) calc(100vw - 48px), 1260px"
                />
                <source
                  type="image/webp"
                  srcSet="/images/platform/orchestration-routing-web-v4-640.webp 640w, /images/platform/orchestration-routing-web-v4-960.webp 960w, /images/platform/orchestration-routing-web-v4-1280.webp 1280w, /images/platform/orchestration-routing-web-v4-1672.webp 1672w"
                  sizes="(max-width: 1320px) calc(100vw - 48px), 1260px"
                />
                <img
                  className="flow-routing-img"
                  src="/images/platform/orchestration-routing-web-v4.png"
                  alt="Diagram showing operating context routing through rules and approvals to people and systems, with progress and evidence connected across the response."
                  width={1672}
                  height={941}
                  loading="eager"
                  decoding="async"
                />
              </picture>

              {/* Desktop SVG leader lines connecting the four live labels to their exact regions */}
              <svg
                className="flow-routing-leaders"
                viewBox="0 0 1672 941"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* 1. Operating context */}
                <line x1="154" y1="226" x2="154" y2="380" />
                <circle cx="154" cy="380" r="4.5" />

                {/* 2. Rules and approvals */}
                <line x1="646" y1="154" x2="646" y2="286" />
                <circle cx="646" cy="286" r="4.5" />

                {/* 3. People and systems */}
                <polyline points="962,154 962,226 1066,226" fill="none" />
                <circle cx="1066" cy="226" r="4.5" />

                {/* 4. Progress and evidence */}
                <line x1="1485" y1="290" x2="1485" y2="478" />
                <circle cx="1485" cy="478" r="4.5" />
              </svg>

              {/* Desktop live HTML labels aligned to the four regions */}
              <div className="flow-routing-overlay">
                <div className="flow-routing-tag flow-routing-tag--left">
                  <strong>Operating context</strong>
                </div>
                <div className="flow-routing-tag flow-routing-tag--center">
                  <strong>Rules and approvals</strong>
                </div>
                <div className="flow-routing-tag flow-routing-tag--destinations">
                  <strong>People and systems</strong>
                </div>
                <div className="flow-routing-tag flow-routing-tag--return">
                  <strong>Progress and evidence</strong>
                </div>
              </div>
            </div>

            <figcaption className="flow-routing-caption">
              <span className="flow-routing-caption-note">
                Configured connections to your existing operational, work, and
                notification systems are scoped during implementation. Returned
                updates and completed work provide evidence for the next check; they
                do not automatically establish physical recovery.
              </span>
            </figcaption>

            {/* Simple editorial columns below the image */}
            <div
              className="flow-routing-breakdown"
              aria-label="Coordinated response stages in Infinit-Flow"
            >
              {routingStages.map((stage) => (
                <div key={stage.id} className="flow-routing-column">
                  <h3>{stage.label}</h3>
                  <p>{stage.summary}</p>
                </div>
              ))}
            </div>
          </figure>
        </div>
      </section>

      {/* C. Authority and Automation (Concise Editorial Layout) */}
      <section
        className="flow-section"
        aria-labelledby="flow-authority-title"
      >
        <div className="wrap">
          <div className="flow-section-header flow-section-header--wide">
            <p className="eyebrow">
              <span className="little-line" />
              AUTHORITY &amp; AUTOMATION
            </p>
            <h2 id="flow-authority-title">
              Automate within the rules of your operation.
            </h2>
            <p className="flow-section-lead">
              Apply your response rules, permissions, and approval requirements
              to each step. Automate authorized digital tasks while keeping the
              responsible people informed.
            </p>
          </div>

          <div className="flow-editorial-layout">
            {/* Left column: Distinguishing recommended, approved, and executed actions */}
            <div className="flow-editorial-column">
              <div className="flow-editorial-intro">
                <h3>Clear boundaries for every action</h3>
                <p>
                  Infinit-Flow helps your team decide what should happen next
                  and keeps operators, maintenance systems, service providers,
                  approvals, and equipment checks connected in one response. It
                  runs only the digital steps your rules allow and keeps
                  physical equipment authority with your team.
                </p>
              </div>

              <dl
                className="flow-action-ledger"
                aria-label="Distinction between recommended, approved, and executed actions"
              >
                {actionDistinctions.map((item) => (
                  <div key={item.title} className="flow-action-row">
                    <dt>
                      <span className="flow-action-mode">{item.mode}</span>
                      <strong>{item.title}</strong>
                    </dt>
                    <dd>
                      <p>{item.summary}</p>
                      {"canonicalRule" in item && item.canonicalRule ? (
                        <p className="flow-action-policy-rule">
                          {item.canonicalRule}
                        </p>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>

              <details className="flow-tech-details">
                <summary>
                  Technical details: Governance, authority, and asset selection
                </summary>
                <div className="flow-tech-details-body">
                  <p>
                    Infinit-Flow determines what should happen next and creates
                    one durable Response across operators, work systems,
                    providers, approvals, evidence, and return measurements. It
                    executes only the digital steps policy allows and keeps
                    physical authority where operations require it. Retain
                    physical-work, safety, LOTO, and control authority under
                    customer policy.
                  </p>
                  <p>
                    Choose an operational object type and intent. Infinit-Flow
                    returns only assets compatible with the required SSOM class,
                    capability, tenant, site, role, quality, and freshness.
                    Simple controls appear first; expert semantic and lineage
                    detail remains available when needed.
                  </p>
                  <p>
                    When the field task or work order closes, Infinit-Flow asks
                    Singularity to evaluate the configured return measurements.
                    Work-system state is contextual evidence only; it cannot set
                    the physical result.
                  </p>
                </div>
              </details>

              <p className="flow-editorial-concept-link">
                <a
                  href="/resources/industrial-concepts/industrial-ai"
                  className="text-link"
                >
                  Explore how Industrial AI stays bounded by operational
                  authority <ArrowRight size={16} aria-hidden="true" />
                </a>
              </p>
            </div>

            {/* Right column: What every handoff preserves */}
            <div className="flow-editorial-column flow-editorial-column--wash">
              <div className="flow-editorial-intro">
                <h3>What every handoff preserves</h3>
                <p>
                  Real operational responses cross shifts, teams, and software
                  boundaries. Instead of dropping context into disconnected
                  tickets or messages, each handoff carries four essentials
                  forward:
                </p>
              </div>

              <dl
                className="flow-handoff-ledger"
                aria-label="Four elements preserved across every Infinit-Flow handoff"
              >
                {handoffPreservedItems.map((item, idx) => (
                  <div key={item.term} className="flow-handoff-row">
                    <dt>
                      <span className="flow-handoff-index">
                        0{idx + 1}
                      </span>
                      <strong>{item.term}</strong>
                    </dt>
                    <dd>{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* D. Connected Platform Context & Closing CTA */}
      <section
        className="flow-section flow-section--canvas"
        aria-labelledby="flow-platform-title"
      >
        <div className="wrap">
          <div className="flow-section-header">
            <p className="eyebrow">
              <span className="little-line" />
              CONNECTED PLATFORM
            </p>
            <h2 id="flow-platform-title">
              Where Infinit-Flow fits in Last Mile.
            </h2>
            <p className="flow-section-lead">
              Infinit-Flow turns shared operational context from Singularity
              into coordinated work, and hands live response progress and outcome
              checks to Infinit-Control.
            </p>
          </div>

          <div
            className="flow-platform-grid"
            role="list"
            aria-label="Last Mile platform products"
          >
            {connectedProducts.map((product) => (
              <article
                key={product.name}
                role="listitem"
                className={`flow-platform-card${
                  product.current ? " is-current" : ""
                }`}
              >
                <div className="flow-platform-card-top">
                  <span className="flow-platform-step">{product.step}</span>
                  {product.current ? (
                    <span className="flow-platform-badge">Current page</span>
                  ) : null}
                </div>
                <h3>{product.name}</h3>
                <p className="flow-platform-role">{product.role}</p>
                <p className="flow-platform-summary">{product.summary}</p>
                {!product.current ? (
                  <a href={product.href} className="text-link">
                    Explore {product.name}{" "}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>

          <div className="flow-closing-panel">
            <div className="flow-closing-copy">
              <p className="eyebrow">
                <span className="little-line" />
                NEXT STEP
              </p>
              <h2>See how work and approvals stay connected.</h2>
              <p>
                Walk through an operational issue from initial context through
                routing, approvals, execution, and post-work verification.
              </p>
            </div>
            <div className="flow-closing-actions">
              <a
                className="button"
                href={demoUrl}
                onClick={() =>
                  trackEvent("cta_demo_click", {
                    placement: "infinit_flow_closing",
                    destination: demoUrl,
                  })
                }
              >
                Request a demo <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href="/infinit-control" className="text-link">
                Next: Explore Infinit-Control{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
