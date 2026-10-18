import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ClipboardCheck,
  Clock,
  GitBranch,
  Users,
} from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { trackEvent } from "@/app/lib/analytics";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";
import "@/styles/singularity-page.css";

const demoUrl = "/demo";
const pageDescription =
  "Singularity is Last Mile's governed operational-memory and OT world-model product implementing the open SSOM semantic and evidence contract.";

const compositionRegions = [
  {
    number: "1.",
    label: "Source information",
    description:
      "Equipment readings, waveforms, engineering documents, asset hierarchies, timestamps, logs, and work records arrive in different formats from existing systems.",
  },
  {
    number: "2.",
    label: "Connected context",
    description:
      "Singularity aligns identities, relationships, and event timing across sources so related observations and records resolve to the same operation.",
  },
  {
    number: "3.",
    label: "Shared operating record",
    description:
      "People, workflows, and AI work from one connected operating record that preserves original source references, history, and verification evidence.",
  },
] as const;

const contextQuestions = [
  {
    question: "What equipment and processes does this issue affect?",
    answer:
      "Singularity gives each piece of equipment a consistent identity across systems and maps how physical, process, and control equipment depend on each other, so teams and AI can see upstream and downstream impact rather than isolated alarms.",
    platformRole: "Shared equipment & dependency context across the platform",
    icon: GitBranch,
  },
  {
    question: "What conditions and history help explain it?",
    answer:
      "Checked readings, alarms, and operating conditions from Infinit-Signal are connected in time order alongside operating history, earlier issues, and past repairs so teams can see what changed and what worked before.",
    platformRole: "Connected with Infinit-Signal intake & operating history",
    icon: Clock,
  },
  {
    question: "What work is underway, and who is responsible?",
    answer:
      "Singularity links the active issue to the responsible owner, approved decisions, and coordinated Infinit-Flow tasks, work orders, and service dispatches, keeping responsibility and progress visible across teams and systems.",
    platformRole: "Connected with Infinit-Flow response coordination",
    icon: Users,
  },
  {
    question: "What evidence will show whether the response worked?",
    answer:
      "Each response is checked against equipment readings after the work, operating ranges, and required stability windows, showing in Infinit-Control whether recovery is confirmed or further action is needed rather than treating a closed ticket as proof.",
    platformRole: "Connected with Infinit-Control outcome verification",
    icon: ClipboardCheck,
  },
] as const;

const identitySources = [
  { source: "Source tag", example: "B3_CHW_P02_STS" },
  { source: "MQTT topic", example: "dc03/chw/loop-b/chwp-02/state" },
  { source: "OPC UA NodeId", example: "ns=4;s=DC03.LoopB.CHWP02" },
  { source: "Historian point", example: "DC03_CHWP02_AMPS" },
  { source: "SAP equipment", example: "CHWP-02 (DC-03-H3-CHW-LB)" },
  { source: "Provider record", example: "Dispatch M-88214" },
] as const;

const outcomeStates = [
  "Recovery established",
  "Partial recovery",
  "Failed intervention",
  "Recurrence detected",
  "Insufficient return data",
] as const;

const platformCards = [
  {
    name: "Infinit-Signal",
    href: "/infinit-signal",
    current: false,
    badge: "Dependable inputs",
    description: "Reliable data from your existing systems.",
    cta: "Explore Infinit-Signal",
  },
  {
    name: "Singularity",
    href: "/singularity",
    current: true,
    badge: "Current page",
    description: "Understand your equipment in context.",
    cta: "Viewing Singularity",
  },
  {
    name: "Infinit-Flow",
    href: "/infinit-flow",
    current: false,
    badge: "Coordinated response",
    description: "Keep work moving across teams and systems.",
    cta: "Explore Infinit-Flow",
  },
  {
    name: "Infinit-Control",
    href: "/infinit-control",
    current: false,
    badge: "Operational visibility",
    description: "See what needs attention and what changed.",
    cta: "Explore Infinit-Control",
  },
];

export function SSOMPage() {
  return (
    <main className="lm-product-detail lm-singularity" id="main">
      <SEO
        title="Singularity | The Operational World Model"
        description={pageDescription}
        canonicalPath="/singularity"
        jsonLd={[
          createProductSchema("Singularity", "/singularity", pageDescription),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Platform", path: "/platform" },
            { name: "Singularity", path: "/singularity" },
          ]),
        ]}
      />

      {/* A. Hero */}
      <section
        className="singularity-hero wrap"
        aria-labelledby="singularity-hero-title"
      >
        <div className="singularity-hero-copy">
          <p className="eyebrow">
            <span className="little-line" />
            SINGULARITY · THE OPERATIONAL WORLD MODEL
          </p>
          <h1 id="singularity-hero-title">
            Give AI and your team the context to act.
          </h1>
          <p className="singularity-hero-lead">
            Singularity builds an operational world model, a connected
            understanding of your equipment, how it relates, what has happened,
            and what work is underway, so people and AI can understand an issue
            in context.
          </p>
          <div className="hero-actions">
            <a
              className="button"
              href={demoUrl}
              onClick={() =>
                trackEvent("cta_demo_click", {
                  placement: "singularity_hero",
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

        <figure className="singularity-hero-figure">
          <div className="singularity-hero-media">
            <picture>
              <source
                type="image/avif"
                srcSet="/images/platform/platform-singularity-640.avif 640w, /images/platform/platform-singularity-960.avif 960w, /images/platform/platform-singularity-1280.avif 1280w, /images/platform/platform-singularity-1448.avif 1448w"
                sizes="(max-width: 1080px) calc(100vw - 64px), 580px"
              />
              <source
                type="image/webp"
                srcSet="/images/platform/platform-singularity-640.webp 640w, /images/platform/platform-singularity-960.webp 960w, /images/platform/platform-singularity-1280.webp 1280w, /images/platform/platform-singularity-1448.webp 1448w"
                sizes="(max-width: 1080px) calc(100vw - 64px), 580px"
              />
              <img
                src="/images/platform/platform-singularity.png"
                alt="Water facility engineers reviewing how equipment, systems, and readings relate"
                width={1448}
                height={1086}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </figure>
      </section>

      {/* B. Main Explanatory Image */}
      <section
        className="singularity-section singularity-section--canvas"
        aria-labelledby="singularity-record-title"
      >
        <div className="wrap">
          <div className="singularity-section-header singularity-section-header--wide">
            <p className="eyebrow">
              <span className="little-line" />
              SHARED OPERATIONAL CONTEXT
            </p>
            <h2 id="singularity-record-title">
              Different sources. One connected understanding.
            </h2>
            <p className="singularity-section-lead">
              Bring equipment information, readings, relationships, time, and
              records into a connected view without losing where the information
              came from.
            </p>
          </div>

          <figure
            className="singularity-record-figure"
            aria-label="Diagram showing source information, connected context, and a shared operating record"
          >
            <div className="singularity-record-canvas">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/platform/semantic-operating-record-v3-640.avif 640w, /images/platform/semantic-operating-record-v3-960.avif 960w, /images/platform/semantic-operating-record-v3-1280.avif 1280w, /images/platform/semantic-operating-record-v3-1672.avif 1672w"
                  sizes="(max-width: 1320px) calc(100vw - 48px), 1260px"
                />
                <source
                  type="image/webp"
                  srcSet="/images/platform/semantic-operating-record-v3-640.webp 640w, /images/platform/semantic-operating-record-v3-960.webp 960w, /images/platform/semantic-operating-record-v3-1280.webp 1280w, /images/platform/semantic-operating-record-v3-1672.webp 1672w"
                  sizes="(max-width: 1320px) calc(100vw - 48px), 1260px"
                />
                <img
                  className="singularity-record-img"
                  src="/images/platform/semantic-operating-record-v3.png"
                  alt="Diagram showing six disparate operational sources passing through a connected context layer into one shared operating record."
                  width={1672}
                  height={941}
                  loading="eager"
                  decoding="async"
                />
              </picture>

              {/* Subtle SVG leader lines connecting the three live labels to the composition on desktop/tablet */}
              <svg
                className="singularity-record-leaders"
                viewBox="0 0 1672 941"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="388" y1="88" x2="388" y2="136" />
                <circle cx="388" cy="136" r="4" />
                <line x1="844" y1="88" x2="844" y2="118" />
                <circle cx="844" cy="118" r="4" />
                <line x1="1338" y1="88" x2="1338" y2="164" />
                <circle cx="1338" cy="164" r="4" />
              </svg>

              {/* Three live labels aligned to the composition */}
              <div className="singularity-record-labels">
                <div className="singularity-record-pill singularity-record-pill--left">
                  <span className="singularity-record-pill-num">1.</span>
                  <strong>Source information</strong>
                </div>
                <div className="singularity-record-pill singularity-record-pill--center">
                  <span className="singularity-record-pill-num">2.</span>
                  <strong>Connected context</strong>
                </div>
                <div className="singularity-record-pill singularity-record-pill--right">
                  <span className="singularity-record-pill-num">3.</span>
                  <strong>Shared operating record</strong>
                </div>
              </div>

              {/* Compact numbered markers on narrow mobile where full labels appear immediately below */}
              <div
                className="singularity-record-mobile-markers"
                aria-hidden="true"
              >
                <span className="singularity-mobile-marker singularity-mobile-marker--left">
                  1
                </span>
                <span className="singularity-mobile-marker singularity-mobile-marker--center">
                  2
                </span>
                <span className="singularity-mobile-marker singularity-mobile-marker--right">
                  3
                </span>
              </div>
            </div>

            <figcaption className="singularity-record-caption">
              <span>
                Original source identities and timestamps remain attached when
                records are connected in Singularity.
              </span>
            </figcaption>

            <div
              className="singularity-composition-grid"
              aria-label="How Singularity connects source information into a shared operating record"
            >
              {compositionRegions.map((region) => (
                <div key={region.label} className="singularity-composition-card">
                  <div className="singularity-composition-heading">
                    <span>{region.number}</span>
                    <h3>{region.label}</h3>
                  </div>
                  <p>{region.description}</p>
                </div>
              ))}
            </div>
          </figure>
        </div>
      </section>

      {/* C. Editorial Illustrative Example + Four Operational Questions */}
      <section
        className="singularity-section"
        aria-labelledby="singularity-questions-title"
      >
        <div className="wrap">
          <div
            className="singularity-editorial-example"
            aria-labelledby="singularity-example-heading"
          >
            <h2 id="singularity-example-heading">
              What does this pump failure put at risk?
            </h2>
            <p className="singularity-example-copy">
              An isolated alarm identifies the pump. Operational context
              connects it to the cooling loop, the area it protects, its
              redundancy role, recent work, and the team responsible for the
              response.
            </p>
            <p className="singularity-example-followup">
              That context helps people and AI assess what is affected and what
              to investigate next.
            </p>
          </div>

          <div className="singularity-section-header singularity-section-header--wide">
            <p className="eyebrow">
              <span className="little-line" />
              CONTEXT FOR PEOPLE AND AI
            </p>
            <h2 id="singularity-questions-title">
              Answer the questions that matter during an operating issue.
            </h2>
            <p className="singularity-section-lead">
              Singularity connects equipment, conditions, history, ongoing
              responses, and outcomes across the systems and sites that each see
              only part of the story.
            </p>
          </div>

          <div className="singularity-questions-grid">
            {contextQuestions.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.question}
                  className="singularity-question-card"
                >
                  <div className="singularity-question-top">
                    <span
                      className="singularity-question-icon"
                      aria-hidden="true"
                    >
                      <Icon size={20} />
                    </span>
                    <span className="singularity-question-role">
                      {item.platformRole}
                    </span>
                  </div>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* D. Optional Technical Section (SSOM, Identity Crosswalk, and Governance Boundaries) */}
      <section
        className="singularity-section singularity-section--canvas"
        aria-labelledby="singularity-technical-title"
      >
        <div className="wrap">
          <div className="singularity-tech-wrapper">
            <div className="singularity-tech-intro">
              <p className="eyebrow">
                <span className="little-line" />
                OPEN SEMANTIC CONTRACT &amp; TECHNICAL REFERENCE
              </p>
              <h2 id="singularity-technical-title">
                Built on the Standardized Semantic Object Model (SSOM).
              </h2>
              <p>
                Singularity is Last Mile&apos;s governed operational-memory and
                OT world-model product implementing the open SSOM semantic and
                evidence contract.
              </p>
            </div>

            <details className="singularity-tech-details">
              <summary className="singularity-tech-summary">
                <span>
                  View technical reference: SSOM schema entities, source-identity
                  crosswalk, UNS comparison, outcome states, and governance
                  boundaries
                </span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>

              <div className="singularity-tech-body">
                {/* 0. Schema Entity Scope */}
                <div className="singularity-tech-block">
                  <h3>Canonical SSOM entity and semantic scope</h3>
                  <p>
                    The Standardized Semantic Object Model defines portable
                    operational meaning, identity, relationships, temporal
                    semantics, quality, evidence, provenance, conformance, and
                    profiles. Singularity creates the operational world model
                    connecting assets, processes, observations, Conditions,
                    evidence, decisions, Responses, return measurements, and
                    Outcomes across the systems and sites that each see only
                    part of the story.
                  </p>
                </div>

                {/* 1. Scoped Source-Identity Crosswalk */}
                <div className="singularity-tech-block">
                  <h3>Scoped source-identity crosswalk</h3>
                  <p>
                    Source tags, MQTT topics, OPC UA NodeIds, historian points,
                    SAP equipment, and provider records remain visible as scoped
                    external identities. Singularity connects them to one
                    canonical operational asset without erasing their source
                    meaning, authority, or validity period.
                  </p>
                  <div className="singularity-crosswalk-grid">
                    <div className="singularity-crosswalk-sources">
                      {identitySources.map((item) => (
                        <div
                          key={item.source}
                          className="singularity-crosswalk-chip"
                        >
                          <strong>{item.source}</strong>
                          <span>{item.example}</span>
                        </div>
                      ))}
                    </div>
                    <div
                      className="singularity-crosswalk-arrow"
                      aria-hidden="true"
                    >
                      <ArrowRight size={20} />
                    </div>
                    <div className="singularity-crosswalk-target">
                      <span className="singularity-crosswalk-tag">
                        Canonical operational asset
                      </span>
                      <strong>Cooling Loop B · CHWP-02</strong>
                      <p>
                        Secondary chilled-water pump · Reference Site DC-03 ·
                        Every scoped source reference and validity period
                        remains preserved.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. UNS vs Singularity/SSOM */}
                <div className="singularity-tech-block">
                  <h3>Distribution vs. durable operational meaning</h3>
                  <div
                    className="singularity-comparison-table"
                    role="table"
                    aria-label="Unified Namespace and Singularity SSOM comparison"
                  >
                    <div
                      className="singularity-comparison-row singularity-comparison-row--head"
                      role="row"
                    >
                      <strong role="columnheader">Unified Namespace</strong>
                      <strong role="columnheader">Singularity / SSOM</strong>
                    </div>
                    <div className="singularity-comparison-row" role="row">
                      <span>Distributes current information</span>
                      <span>Preserves governed operational memory</span>
                    </div>
                    <div className="singularity-comparison-row" role="row">
                      <span>Uses topics and source identifiers</span>
                      <span>Resolves canonical asset identity</span>
                    </div>
                    <div className="singularity-comparison-row" role="row">
                      <span>Carries payload and source metadata</span>
                      <span>
                        Preserves quality, provenance, evidence, and lineage
                      </span>
                    </div>
                    <div className="singularity-comparison-row" role="row">
                      <span>Exposes state changes</span>
                      <span>
                        Connects Conditions, decisions, actions, and Outcomes
                      </span>
                    </div>
                    <div className="singularity-comparison-row" role="row">
                      <span>Usually presents a navigable hierarchy</span>
                      <span>
                        Represents many-to-many and time-varying relationships
                      </span>
                    </div>
                  </div>
                  <p className="singularity-tech-note">
                    SSOM conformance and MQTT/Sparkplug compatibility are
                    separate conformance domains.
                  </p>
                </div>

                {/* 3. Distinct Outcome States & Governance Boundaries */}
                <div className="singularity-tech-columns">
                  <div className="singularity-tech-block">
                    <h3>Evidence-backed outcome states</h3>
                    <p>
                      Singularity preserves the difference between a
                      recommendation, an authorized action, a work-system
                      receipt, and a verified physical result:
                    </p>
                    <ol className="singularity-outcome-pills">
                      {outcomeStates.map((state, index) => (
                        <li key={state}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <strong>{state}</strong>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="singularity-tech-block">
                    <h3>Operational context &amp; learning boundary</h3>
                    <p>
                      The architecture separates customer operations from
                      cross-site learning. SSOM conformance does not grant
                      contribution rights. Purpose, consent, minimization,
                      transformation, provenance, retention, and model scope
                      remain explicit, and aggregate learning cannot rewrite
                      customer canonical facts.
                    </p>
                  </div>
                </div>
              </div>
            </details>

            <div
              className="singularity-resource-links"
              aria-label="Related technical concept articles"
            >
              <a
                href="/resources/industrial-concepts/operational-outcome-thread"
                className="text-link"
              >
                From warning to confirmed result{" "}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href="/resources/industrial-concepts/uns-and-ssom"
                className="text-link"
              >
                Unified Namespace and SSOM <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href="/resources/industrial-concepts/industrial-ai"
                className="text-link"
              >
                How AI supports operations under your team&apos;s authority{" "}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* E. Connected Platform and Closing CTA */}
      <section
        className="singularity-section"
        aria-labelledby="singularity-connected-platform-title"
      >
        <div className="wrap">
          <div className="singularity-section-header">
            <p className="eyebrow">
              <span className="little-line" />
              CONNECTED PLATFORM
            </p>
            <h2 id="singularity-connected-platform-title">
              Shared context across every stage of the response.
            </h2>
          </div>

          <div className="singularity-platform-grid">
            {platformCards.map((card) => (
              <a
                key={card.name}
                href={card.href}
                className={`singularity-platform-card${card.current ? " singularity-platform-card--current" : ""}`}
                aria-current={card.current ? "page" : undefined}
              >
                <div>
                  <span className="singularity-platform-badge">
                    {card.badge}
                  </span>
                  <h3>{card.name}</h3>
                  <p>{card.description}</p>
                </div>
                <span className="singularity-platform-card-link">
                  {card.cta}{" "}
                  {!card.current && <ArrowRight size={15} aria-hidden="true" />}
                </span>
              </a>
            ))}
          </div>

          <div className="singularity-closing-panel">
            <div className="singularity-closing-copy">
              <h2>
                See how shared operational context guides coordinated action.
              </h2>
            </div>
            <div className="singularity-closing-actions">
              <a
                className="button"
                href={demoUrl}
                onClick={() =>
                  trackEvent("cta_demo_click", {
                    placement: "singularity_closing",
                    destination: demoUrl,
                  })
                }
              >
                Request a demo <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href="/infinit-flow" className="text-link">
                Explore Infinit-Flow <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
