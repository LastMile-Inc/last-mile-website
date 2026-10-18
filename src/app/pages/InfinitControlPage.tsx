import { useState, useRef, type KeyboardEvent } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { trackEvent } from "@/app/lib/analytics";
import {
  createBreadcrumbSchema,
  createProductSchema,
} from "@/app/lib/structuredData";
import {
  coolingReference,
  outcomes,
  type ResultKey,
} from "@/app/pages/platformReferenceData";
import "@/styles/infinit-control-page.css";

const rolePerspectives = [
  {
    number: "01",
    role: "Operators",
    question: "What needs attention, and what can I do?",
    summary:
      "See the active operating issue, current equipment readings alongside their expected range, how recent each reading is, and the response steps permitted for your role and site.",
    details: [
      "Shows the affected equipment, connected dependencies, and recent service history in one view.",
      "Shows only the acknowledgements, task updates, and actions your organization permits for that role.",
    ],
  },
  {
    number: "02",
    role: "Shift leads",
    question: "Who owns the response, and where is progress blocked?",
    summary:
      "Track who owns each response, acknowledgement times, pending approvals, work orders, and service dispatches, so handoffs between shifts and teams stay clear.",
    details: [
      "Shows where a response is waiting on an approval, maintenance dispatch, or post-work stability period.",
      "Separates work-order progress from equipment readings so closed tickets are never mistaken for confirmed recovery.",
    ],
  },
  {
    number: "03",
    role: "Leaders",
    question:
      "Where is risk accumulating, and what results have been established?",
    summary:
      "Review operating conditions across systems, protection and capacity risks, recurring issues, and confirmed results backed by equipment readings after the work.",
    details: [
      "Connects site and portfolio summaries directly to the operating record, work history, and verification evidence.",
      "Separates confirmed recovery from partial recovery, failed work, recurring issues, or missing data.",
    ],
  },
] as const;

const milestoneStates: Array<{
  key: ResultKey;
  tabLabel: string;
  milestoneSummary: string;
}> = [
  {
    key: "partial",
    tabLabel: "Work complete · Stability in progress",
    milestoneSummary:
      "Field work is marked complete in the work system and the pump is running, but loop differential pressure and the required 15-minute stability window are not yet satisfied.",
  },
  {
    key: "recovery",
    tabLabel: "Work complete · Recovery established",
    milestoneSummary:
      "Field work is complete and post-work operating readings remain within their approved bands across the full 15-minute stability window.",
  },
  {
    key: "failed",
    tabLabel: "Work complete · Further response needed",
    milestoneSummary:
      "The external work order was closed, but operating readings show the pump remains stopped and differential pressure has not returned to the required band.",
  },
  {
    key: "insufficient",
    tabLabel: "Work complete · No valid data",
    milestoneSummary:
      "The work order is closed, but return readings are stale or unavailable, preventing the platform from declaring recovery until valid evidence arrives.",
  },
];

const connectedProducts = [
  {
    step: "01",
    name: "Infinit-Signal",
    role: "Reliable data from your existing systems",
    summary:
      "Collects operational information, checks its quality, and preserves where it came from and when it happened.",
    href: "/infinit-signal",
    current: false,
  },
  {
    step: "02",
    name: "Singularity",
    role: "Understand your equipment in context",
    summary:
      "Connects equipment, relationships, history, work, and outcome evidence in a shared operational world model.",
    href: "/singularity",
    current: false,
  },
  {
    step: "03",
    name: "Infinit-Flow",
    role: "Keep work moving across teams and systems",
    summary:
      "Coordinates tasks, approvals, and authorized automated steps across people and connected systems.",
    href: "/infinit-flow",
    current: false,
  },
  {
    step: "04",
    name: "Infinit-Control",
    role: "See what needs attention and what changed",
    summary:
      "Gives each role a clear view of operating conditions, responsibilities, work, and results.",
    href: "/infinit-control",
    current: true,
  },
] as const;

export function InfinitControlPage() {
  const demoUrl = "/demo?source=infinit-control";
  const pageDescription =
    "Infinit-Control gives each role a clear view of operating conditions, responsibilities, work, and outcomes, with the context and authority needed to respond.";

  const [selectedIdx, setSelectedIdx] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeMilestone = milestoneStates[selectedIdx];
  const activeOutcome = outcomes[activeMilestone.key];

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % milestoneStates.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + milestoneStates.length) % milestoneStates.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = milestoneStates.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      setSelectedIdx(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <main className="lm-product-detail lm-infinit-control" id="main">
      <SEO
        title="Infinit-Control | Know What Needs Action. See What Changed."
        description={pageDescription}
        canonicalPath="/infinit-control"
        jsonLd={[
          createProductSchema(
            "Infinit-Control",
            "/infinit-control",
            pageDescription,
          ),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Platform", path: "/platform" },
            { name: "Infinit-Control", path: "/infinit-control" },
          ]),
        ]}
      />

      {/* A. Hero */}
      <section
        className="control-hero wrap"
        aria-labelledby="control-hero-title"
      >
        <div className="control-hero-copy">
          <p className="eyebrow">
            <span className="little-line" />
            INFINIT-CONTROL
          </p>
          <h1 id="control-hero-title">
            Know what needs action. See what changed.
          </h1>
          <p className="control-hero-lead">
            Give each role a clear view of operating conditions,
            responsibilities, work, and outcomes, with the context and authority
            needed to respond.
          </p>
          <div className="hero-actions">
            <a
              className="button"
              href={demoUrl}
              onClick={() =>
                trackEvent("cta_demo_click", {
                  placement: "infinit_control_hero",
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

        <figure className="control-hero-figure">
          <div className="control-hero-media">
            <picture>
              <source
                type="image/avif"
                srcSet="/images/platform/field-command-v2-640.avif 640w, /images/platform/field-command-v2-960.avif 960w, /images/platform/field-command-v2-1280.avif 1280w, /images/platform/field-command-v2-1536.avif 1536w"
                sizes="(max-width: 1080px) calc(100vw - 64px), 600px"
              />
              <source
                type="image/webp"
                srcSet="/images/platform/field-command-v2-640.webp 640w, /images/platform/field-command-v2-960.webp 960w, /images/platform/field-command-v2-1280.webp 1280w, /images/platform/field-command-v2-1536.webp 1536w"
                sizes="(max-width: 1080px) calc(100vw - 64px), 600px"
              />
              <img
                src="/images/platform/field-command-v2.png"
                alt="Field technician beside a pump assembly reviewing operating conditions, ownership, work status, and trend data on a tablet."
                width={1536}
                height={1024}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </figure>
      </section>

      {/* B. Role-Based Explanation */}
      <section
        className="control-section control-section--canvas"
        aria-labelledby="control-roles-title"
      >
        <div className="wrap">
          <div className="control-section-header control-section-header--wide">
            <p className="eyebrow">
              <span className="little-line" />
              ROLE-BASED OPERATIONAL VIEWS
            </p>
            <h2 id="control-roles-title">
              Built around the questions each role needs answered.
            </h2>
            <p className="control-section-lead">
              Give operators, shift leads, and leaders the information they need
              to act: what changed, who owns the response, where work is blocked,
              and what evidence shows the result.
            </p>
          </div>

          <div
            className="control-roles-grid"
            role="list"
            aria-label="Role-based questions answered by Infinit-Control"
          >
            {rolePerspectives.map((item) => (
              <article
                key={item.role}
                role="listitem"
                className="control-role-card"
              >
                <div className="control-role-card-top">
                  <span className="control-role-number">{item.number}</span>
                  <span className="control-role-tag">{item.role}</span>
                </div>
                <h3 className="control-role-question">“{item.question}”</h3>
                <p className="control-role-summary">{item.summary}</p>
                <ul className="control-role-list">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="control-authority-boundary">
            <div className="control-authority-boundary-block">
              <h3>Clear permissions, not unrestricted control</h3>
              <p>
                Each person sees the issues and actions relevant to their role
                and site. Existing control and safety systems, such as PLCs,
                SCADA, and BMS, keep local equipment control, while
                Infinit-Control coordinates the response across systems and
                shows only the actions your rules allow.
              </p>
            </div>
            <div className="control-authority-boundary-block">
              <h3>Know when readings need attention</h3>
              <p>
                Key equipment readings show the value, unit, expected range,
                current status, and how recent the reading is. Outdated,
                incomplete, or missing readings are labeled No valid data and
                cannot be used to confirm recovery.
              </p>
            </div>
          </div>

          <details className="control-tech-details">
            <summary>Technical details: Permissions, measurement rules, and scope</summary>
            <div className="control-tech-details-body">
              <p>
                Infinit-Control gives each role a governed operational command
                surface for current state, canonical topology, evidence,
                ownership, work, system participation, authority, return
                measurements, and verified Outcomes. It is more than a dashboard
                because it keeps the complete accountable response in view. Every
                view and action respects tenant, site, and role permissions.
                Important measurements show a numerical value, engineering unit,
                expected or reference band, state icon and text, and meaningful
                trend or freshness. Stale, quarantined, unresolved, or missing
                inputs are shown as No valid data and cannot support a recovered
                result.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* C. Supporting Oversight Image (mission-control-v2.png) */}
      <section
        className="control-section"
        aria-labelledby="control-oversight-title"
      >
        <div className="wrap">
          <div className="control-section-header control-section-header--wide">
            <p className="eyebrow">
              <span className="little-line" />
              SHARED OPERATIONAL OVERSIGHT
            </p>
            <h2 id="control-oversight-title">
              Keep the wider operation in view.
            </h2>
            <p className="control-section-lead">
              Bring conditions, ongoing responses, and outcome evidence into a
              shared view across the operation.
            </p>
          </div>

          <figure
            className="control-oversight-figure"
            aria-label="Illustration of shared operational oversight across conditions, ongoing responses, and outcome evidence"
          >
            <div className="control-oversight-media">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/platform/mission-control-v2-640.avif 640w, /images/platform/mission-control-v2-960.avif 960w, /images/platform/mission-control-v2-1280.avif 1280w, /images/platform/mission-control-v2-1672.avif 1672w"
                  sizes="(max-width: 1320px) calc(100vw - 48px), 1260px"
                />
                <source
                  type="image/webp"
                  srcSet="/images/platform/mission-control-v2-640.webp 640w, /images/platform/mission-control-v2-960.webp 960w, /images/platform/mission-control-v2-1280.webp 1280w, /images/platform/mission-control-v2-1672.webp 1672w"
                  sizes="(max-width: 1320px) calc(100vw - 48px), 1260px"
                />
                <img
                  src="/images/platform/mission-control-v2.png"
                  alt="Operations staff reviewing conditions, ongoing responses, and outcome evidence across a shared operational view."
                  width={1672}
                  height={941}
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>
            <figcaption className="control-oversight-caption">
              <span className="control-oversight-caption-note">
                Illustration of broader operational oversight across sites and
                teams. Last Mile delivers software views on your existing
                workstations, tablets, and operational displays; it does not
                require a dedicated physical control room or proprietary
                hardware.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* D. Work Status Versus Operating Result */}
      <section
        id="work-completion-vs-recovery"
        className="control-section control-section--canvas"
        aria-labelledby="control-milestone-title"
      >
        <div className="wrap">
          <div className="control-section-header control-section-header--wide">
            <p className="eyebrow">
              <span className="little-line" />
              WORK STATUS VS. OPERATING RESULT
            </p>
            <h2 id="control-milestone-title">
              The work is complete. Is the operation recovered?
            </h2>
            <p className="control-section-lead">
              Completed work is one milestone. Operating evidence determines
              whether recovery is established or further response is needed.
            </p>
          </div>

          <div
            className="control-example-shell"
            aria-labelledby="control-example-heading"
          >
            <div className="control-example-header">
              <div>
                <h3 id="control-example-heading">
                  {coolingReference.identity.system} (
                  {coolingReference.identity.asset}) · Work status vs. operating
                  evidence
                </h3>
              </div>
              <p className="control-example-context">
                Owner: {coolingReference.coordination.owner} · Work order:{" "}
                {coolingReference.identity.sapWorkOrder} · Required stability:{" "}
                {coolingReference.identity.requiredStability}
              </p>
            </div>

            <div
              className="control-example-tabs"
              role="tablist"
              aria-label="Outcomes after work order completion"
            >
              {milestoneStates.map((state, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={state.key}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    id={`control-tab-${state.key}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`control-panel-${state.key}`}
                    tabIndex={isSelected ? 0 : -1}
                    className={`control-example-tab${
                      isSelected ? " is-active" : ""
                    }`}
                    onClick={() => setSelectedIdx(idx)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  >
                    <span className="control-example-tab-num">
                      0{idx + 1}
                    </span>
                    <span className="control-example-tab-text">
                      {state.tabLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              id={`control-panel-${activeMilestone.key}`}
              role="tabpanel"
              aria-labelledby={`control-tab-${activeMilestone.key}`}
              className="control-example-panel"
            >
              <dl
                className="control-example-summary-rows"
                aria-label="Selected outcome summary"
              >
                <div className="control-summary-row">
                  <dt>Work:</dt>
                  <dd>
                    <strong>Complete</strong>{" "}
                    <span className="control-summary-meta">
                      ({activeOutcome.workStatus})
                    </span>
                  </dd>
                </div>
                <div className="control-summary-row">
                  <dt>Operating result:</dt>
                  <dd>
                    <strong>
                      {activeOutcome.key === "partial"
                        ? "Recovery not yet established"
                        : activeOutcome.key === "recovery"
                          ? activeOutcome.label
                          : activeOutcome.key === "failed"
                            ? "Further response needed"
                            : "No valid data · Insufficient return data"}
                    </strong>{" "}
                    <span className="control-summary-meta">
                      (
                      {activeOutcome.key === "recovery" &&
                      activeOutcome.operatingResult
                        ? `${activeOutcome.label} · ${activeOutcome.operatingResult}`
                        : activeOutcome.label}
                      )
                    </span>
                  </dd>
                </div>
                <div className="control-summary-row">
                  <dt>Why:</dt>
                  <dd>
                    {activeOutcome.key === "partial"
                      ? "Pressure and the required stability window have not met the recovery criteria."
                      : activeOutcome.reason}
                  </dd>
                </div>
              </dl>

              <div className="control-example-measurements">
                <p className="control-example-measurements-title">
                  Post-work operating readings evaluated for{" "}
                  {coolingReference.identity.asset}
                </p>
                <div className="control-measurements-grid" role="list">
                  {activeOutcome.measurements.map((m) => (
                    <div
                      key={m.id}
                      role="listitem"
                      className="control-measurement-item"
                    >
                      <span className="control-measurement-name">{m.name}</span>
                      <strong className="control-measurement-value">
                        {m.value}
                      </strong>
                      <span className="control-measurement-ref">
                        {m.reference}
                        {m.freshness ? ` · ${m.freshness}` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="control-example-disclosure">
                <a
                  href="/use-cases/data-center-cooling"
                  className="text-link control-inline-link"
                >
                  Explore the full Cooling Loop B use case{" "}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* E. Connected Platform Context & Closing CTA */}
      <section
        className="control-section"
        aria-labelledby="control-platform-title"
      >
        <div className="wrap">
          <div className="control-section-header">
            <p className="eyebrow">
              <span className="little-line" />
              CONNECTED PLATFORM
            </p>
            <h2 id="control-platform-title">
              Where Infinit-Control fits in Last Mile.
            </h2>
            <p className="control-section-lead">
              Infinit-Control brings qualified signals from Infinit-Signal,
              shared operational context from Singularity, and coordinated work
              from Infinit-Flow into role-specific views.
            </p>
          </div>

          <div
            className="control-platform-grid"
            role="list"
            aria-label="Last Mile platform products"
          >
            {connectedProducts.map((product) => (
              <article
                key={product.name}
                role="listitem"
                className={`control-platform-card${
                  product.current ? " is-current" : ""
                }`}
              >
                <div className="control-platform-card-top">
                  <span className="control-platform-step">{product.step}</span>
                  {product.current ? (
                    <span className="control-platform-badge">Current page</span>
                  ) : null}
                </div>
                <h3>{product.name}</h3>
                <p className="control-platform-role">{product.role}</p>
                <p className="control-platform-summary">{product.summary}</p>
                {!product.current ? (
                  <a href={product.href} className="text-link">
                    Explore {product.name}{" "}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>

          <div className="control-closing-panel">
            <div className="control-closing-copy">
              <p className="eyebrow">
                <span className="little-line" />
                NEXT STEP
              </p>
              <h2>See how every role stays aligned on the response.</h2>
              <p>
                Bring an operational challenge from your facility and see how
                conditions, ownership, work status, and outcome evidence connect.
              </p>
            </div>
            <div className="control-closing-actions">
              <a
                className="button"
                href={demoUrl}
                onClick={() =>
                  trackEvent("cta_demo_click", {
                    placement: "infinit_control_closing",
                    destination: demoUrl,
                  })
                }
              >
                Request a demo <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href="/use-cases" className="text-link">
                Explore operating use cases{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
