import { useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { SEO } from "../components/SEO";
import { trackEvent } from "../lib/analytics";
import { createBreadcrumbSchema, createProductSchema } from "../lib/structuredData";
import "@/styles/infinit-signal-page.css";

const demoUrl = "/demo";
const pageDescription =
  "Infinit-Signal brings information from your existing equipment and systems into Last Mile, checks its quality, and preserves where it came from.";

const qualificationLabels = [
  { number: "1.", label: "Preserve source identity" },
  { number: "2.", label: "Preserve event time" },
  { number: "3.", label: "Check data quality" },
  { number: "4.", label: "Recognize repeated delivery" },
  { number: "5.", label: "Structure consistent records" },
] as const;

type RecordConditionExample = {
  id: string;
  tabLabel: string;
  classification: string;
  summary: string;
  sourceIdentity: string;
  eventTime: string;
  arrivalTime: string;
  payloadSummary: string;
  handlingBehavior: string;
  downstreamEffect: string;
};

const recordHandlingExamples: readonly RecordConditionExample[] = [
  {
    id: "current",
    tabLabel: "Current information",
    classification: "Accepted",
    summary:
      "A current reading arrives from an approved source with valid structure, identity, and timing.",
    sourceIdentity: "BMS-DC03-01 · Point B3_CHW_P02_DP",
    eventTime: "14:32:23.184 local (measured at equipment)",
    arrivalTime: "14:32:24.984 local (received by Infinit-Signal)",
    payloadSummary: "Differential pressure · 11.6 psid · Quality: Good",
    handlingBehavior:
      "Infinit-Signal preserves the original source identity, records both the source event time and the arrival time, checks data quality against the configured profile, and structures a consistent operational record.",
    downstreamEffect:
      "Accepted into Singularity so current operational context, coordinated workflows in Infinit-Flow, and views in Infinit-Control reflect the reading and where the information came from.",
  },
  {
    id: "repeated",
    tabLabel: "Repeated delivery",
    classification: "Duplicate",
    summary:
      "A network retry or second connection path delivers the same equipment reading again.",
    sourceIdentity: "BMS-DC03-01 · Point B3_CHW_P02_DP (redelivery)",
    eventTime: "14:32:23.184 local (same source event timestamp)",
    arrivalTime: "14:32:25.612 local (second arrival)",
    payloadSummary: "Differential pressure · 11.6 psid · Sequence match",
    handlingBehavior:
      "Infinit-Signal recognizes the repeated delivery using source identity, event time, and delivery keys. The duplicate arrival is counted and preserved as a record rather than silently dropped.",
    downstreamEffect:
      "Prevented from being applied a second time to current equipment state in Singularity, avoiding duplicate alerts or repeated follow-up.",
  },
  {
    id: "delayed",
    tabLabel: "Delayed information",
    classification: "Replay / backfill",
    summary:
      "Buffered readings arrive after a temporary connection interruption has recovered.",
    sourceIdentity: "HIST-DC03-01 · Point DC03_CHWP02_AMPS (recovered buffer)",
    eventTime: "14:18:10.000 local (earlier operating event)",
    arrivalTime: "14:32:28.420 local (arrived after reconnect)",
    payloadSummary: "Motor current · 18.4 A · Buffered historical sample",
    handlingBehavior:
      "Infinit-Signal preserves the distinction between when the reading occurred (event time) and when it arrived (arrival time), classifying the record as replay/backfill rather than a new live event.",
    downstreamEffect:
      "Event-time history in Singularity is updated accurately while live operational status and decisions follow your replay rules instead of treating older readings as a new change.",
  },
  {
    id: "incomplete",
    tabLabel: "Incomplete information",
    classification: "Quarantined",
    summary:
      "An incoming reading is missing required engineering units or cannot be matched to an approved source definition.",
    sourceIdentity: "GW-DC03-AUX · Unmapped tag AUX_P02_RAW",
    eventTime: "14:32:29.050 local (reported by gateway)",
    arrivalTime: "14:32:29.910 local (received by Infinit-Signal)",
    payloadSummary: "Value: 11.6 · Engineering unit missing · Unresolved mapping",
    handlingBehavior:
      "Infinit-Signal preserves the raw record, source details, event time, and arrival time, and places the record in quarantine with the reason it was held rather than discarding it or guessing missing fields.",
    downstreamEffect:
      "Held for review and correction; quarantined records do not change the live equipment state in Singularity.",
  },
];

const existingSystemsPoints = [
  "Continue running equipment, monitoring, building, historian, and maintenance systems.",
  "Remain the source of original operating records.",
  "Work with your site’s security and access requirements.",
];

const infinitSignalPoints = [
  "Receives configured operational inputs.",
  "Checks timing, completeness, and consistency.",
  "Preserves source details for review.",
  "Passes reliable information into Singularity.",
];

const platformCards = [
  {
    name: "Infinit-Signal",
    href: "/infinit-signal",
    current: true,
    badge: "Current page",
    description: "Reliable data from your existing systems.",
    cta: "Viewing Infinit-Signal",
  },
  {
    name: "Singularity",
    href: "/singularity",
    current: false,
    badge: "Shared context",
    description: "Understand your equipment in context.",
    cta: "Explore Singularity",
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

export function InfinitSignalPage() {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeExample = recordHandlingExamples[selectedExampleIndex];

  const handleExampleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const count = recordHandlingExamples.length;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % count;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + count) % count;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      setSelectedExampleIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <main className="lm-product-detail lm-infinit-signal" id="main">
      <SEO
        title="Infinit-Signal | Make Operational Data Dependable"
        description={pageDescription}
        canonicalPath="/infinit-signal"
        jsonLd={[
          createProductSchema("Infinit-Signal", "/infinit-signal", pageDescription),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Platform", path: "/platform" },
            { name: "Infinit-Signal", path: "/infinit-signal" },
          ]),
        ]}
      />

      {/* A. Hero */}
      <section className="signal-hero wrap" aria-labelledby="signal-hero-title">
        <div className="signal-hero-copy">
          <p className="eyebrow">
            <span className="little-line" />
            INFINIT-SIGNAL
          </p>
          <h1 id="signal-hero-title">Make operational data dependable.</h1>
          <p className="signal-hero-lead">
            Capture operational information, check its quality, and preserve its
            source, so downstream decisions and workflows start with a dependable
            foundation.
          </p>
          <div className="hero-actions">
            <a
              className="button"
              href={demoUrl}
              onClick={() =>
                trackEvent("cta_demo_click", {
                  placement: "infinit_signal_hero",
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

        <figure className="signal-hero-figure">
          <div className="signal-hero-media">
            <picture>
              <source
                type="image/avif"
                srcSet="/images/platform/platform-infinit-signal-640.avif 640w, /images/platform/platform-infinit-signal-960.avif 960w, /images/platform/platform-infinit-signal-1280.avif 1280w, /images/platform/platform-infinit-signal-1448.avif 1448w"
                sizes="(max-width: 1080px) calc(100vw - 64px), 580px"
              />
              <source
                type="image/webp"
                srcSet="/images/platform/platform-infinit-signal-640.webp 640w, /images/platform/platform-infinit-signal-960.webp 960w, /images/platform/platform-infinit-signal-1280.webp 1280w, /images/platform/platform-infinit-signal-1448.webp 1448w"
                sizes="(max-width: 1080px) calc(100vw - 64px), 580px"
              />
              <img
                src="/images/platform/platform-infinit-signal.png"
                alt="Packaging-line cameras and sensors with graphics showing organized operating information."
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

      {/* B. Main Explanatory Image + Record-Handling Example */}
      <section
        className="signal-section signal-section--canvas"
        aria-labelledby="signal-handoff-title"
      >
        <div className="wrap">
          <div className="signal-section-header signal-section-header--wide">
            <p className="eyebrow">
              <span className="little-line" />
              FROM SOURCE TO SHARED CONTEXT
            </p>
            <h2 id="signal-handoff-title">
              From incoming signals to usable operational context.
            </h2>
            <p className="signal-section-lead">
              Infinit-Signal prepares incoming information for use. Singularity
              connects it to operational context. Infinit-Flow and
              Infinit-Control use that context to support coordinated work and
              oversight.
            </p>
          </div>

          <figure
            className="signal-pipeline-figure"
            aria-label="Diagram of Infinit-Signal qualification, Singularity shared operational context, and connected work and oversight"
          >
            <div className="signal-pipeline-canvas">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/platform/signal-handoff-web-v3-640.avif 640w, /images/platform/signal-handoff-web-v3-960.avif 960w, /images/platform/signal-handoff-web-v3-1280.avif 1280w, /images/platform/signal-handoff-web-v3-1672.avif 1672w"
                  sizes="(max-width: 1320px) calc(100vw - 48px), 1260px"
                />
                <source
                  type="image/webp"
                  srcSet="/images/platform/signal-handoff-web-v3-640.webp 640w, /images/platform/signal-handoff-web-v3-960.webp 960w, /images/platform/signal-handoff-web-v3-1280.webp 1280w, /images/platform/signal-handoff-web-v3-1672.webp 1672w"
                  sizes="(max-width: 1320px) calc(100vw - 48px), 1260px"
                />
                <img
                  className="signal-pipeline-img"
                  src="/images/platform/signal-handoff-web-v3.png"
                  alt="Diagram showing factory equipment signals entering Infinit-Signal for five qualification checks, connecting into Singularity for shared operational context, and supporting coordinated work and oversight in Infinit-Flow and Infinit-Control."
                  width={1672}
                  height={941}
                  loading="eager"
                  decoding="async"
                />
              </picture>

              {/* Subtle SVG leader lines connecting the top region headings to the 3 regions on desktop */}
              <svg
                className="signal-pipeline-leaders"
                viewBox="0 0 1672 941"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="802" y1="145" x2="802" y2="192" />
                <circle cx="802" cy="192" r="4" />
                <line x1="1190" y1="145" x2="1190" y2="196" />
                <circle cx="1190" cy="196" r="4" />
                <line x1="1532" y1="168" x2="1532" y2="224" />
                <circle cx="1532" cy="224" r="4" />
              </svg>

              {/* Desktop live region headings aligned to the three regions */}
              <div className="signal-pipeline-regions-overlay">
                <div className="signal-region-tag signal-region-tag--left">
                  <span className="signal-region-product">Infinit-Signal</span>
                  <strong>Qualify incoming information</strong>
                </div>
                <div className="signal-region-tag signal-region-tag--center">
                  <span className="signal-region-product">Singularity</span>
                  <strong>Connect operational context</strong>
                </div>
                <div className="signal-region-tag signal-region-tag--right">
                  <span className="signal-region-product">
                    Infinit-Flow + Infinit-Control
                  </span>
                  <strong>Coordinate work and oversight</strong>
                </div>
              </div>

              {/* Desktop five live qualification row labels aligned inside the five qualification rows */}
              <ol
                className="signal-pipeline-rows-overlay"
                aria-label="Infinit-Signal qualification checks"
              >
                {qualificationLabels.map((item, idx) => (
                  <li
                    key={item.label}
                    className={`signal-row-label signal-row-label--${idx + 1}`}
                  >
                    <span className="signal-row-num">{item.number}</span>
                    <span className="signal-row-text">{item.label}</span>
                  </li>
                ))}
              </ol>

              {/* Collective label in the right-hand card header area on desktop */}
              <div
                className="signal-pipeline-right-collective"
                aria-hidden="true"
              >
                <span>Coordinated workflows &amp; operational views</span>
              </div>

              {/* Compact numbered markers on tablet/mobile where full text moves below the image */}
              <div
                className="signal-pipeline-mobile-markers"
                aria-hidden="true"
              >
                <span className="signal-mobile-row-badge signal-mobile-row-badge--1">
                  1
                </span>
                <span className="signal-mobile-row-badge signal-mobile-row-badge--2">
                  2
                </span>
                <span className="signal-mobile-row-badge signal-mobile-row-badge--3">
                  3
                </span>
                <span className="signal-mobile-row-badge signal-mobile-row-badge--4">
                  4
                </span>
                <span className="signal-mobile-row-badge signal-mobile-row-badge--5">
                  5
                </span>
              </div>
            </div>

            <figcaption className="signal-pipeline-caption">
              <span>
                Connected software capabilities across the Last Mile platform, not
                a physical appliance or isolated data silos.
              </span>
            </figcaption>

            {/* Simple editorial columns below the illustration */}
            <div
              className="signal-regions-breakdown"
              aria-label="Connected capability stages"
            >
              <div className="signal-region-column">
                <h3>Qualify incoming information</h3>
                <p>
                  Preserve source identity and timing, check quality, recognize
                  repeated delivery, and prepare consistent records for use
                  across Last Mile.
                </p>
              </div>

              <div className="signal-region-column">
                <h3>Connect operational context</h3>
                <p>
                  Singularity connects qualified records to equipment,
                  dependencies, operating history, and ongoing work while
                  retaining their source references.
                </p>
                <a href="/singularity" className="text-link">
                  Explore Singularity <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>

              <div className="signal-region-column">
                <h3>Coordinate work and oversight</h3>
                <p>
                  Infinit-Flow coordinates approved work across people and
                  systems. Infinit-Control keeps conditions, responsibilities,
                  progress, and results visible.
                </p>
              </div>
            </div>
          </figure>

          {/* C. Compact Selectable Record-Handling Example */}
          <div
            className="signal-record-example"
            aria-labelledby="signal-record-example-title"
          >
            <div className="signal-record-example-header">
              <div>
                <h3 id="signal-record-example-title">
                  How Infinit-Signal handles incoming operational records
                </h3>
                <p>
                  Select a condition to see how Infinit-Signal preserves the
                  distinction between when an event occurred at the source
                  (event time) and when it arrived (arrival time).
                </p>
              </div>
            </div>

            <div
              className="signal-record-tabs"
              role="tablist"
              aria-label="Incoming operational record conditions"
            >
              {recordHandlingExamples.map((example, idx) => {
                const isSelected = idx === selectedExampleIndex;
                return (
                  <button
                    key={example.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    id={`signal-record-tab-${example.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="signal-record-panel"
                    tabIndex={isSelected ? 0 : -1}
                    className={`signal-record-tab${isSelected ? " is-active" : ""}`}
                    onClick={() => setSelectedExampleIndex(idx)}
                    onKeyDown={(e) => handleExampleKeyDown(e, idx)}
                  >
                    <span className="signal-record-tab-title">
                      {example.tabLabel}
                    </span>
                    <span className="signal-record-tab-state">
                      {example.classification}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              id="signal-record-panel"
              role="tabpanel"
              aria-labelledby={`signal-record-tab-${activeExample.id}`}
              className="signal-record-panel"
            >
              <div className="signal-record-panel-top">
                <div>
                  <span className="signal-record-classification">
                    Documented state: {activeExample.classification}
                  </span>
                  <h4>{activeExample.tabLabel}</h4>
                  <p className="signal-record-summary">
                    {activeExample.summary}
                  </p>
                </div>
              </div>

              <div className="signal-record-grid">
                <div className="signal-record-envelope">
                  <h5>Source &amp; timing fields</h5>
                  <dl className="signal-record-dl">
                    <div>
                      <dt>Source identity</dt>
                      <dd>{activeExample.sourceIdentity}</dd>
                    </div>
                    <div>
                      <dt>Event time</dt>
                      <dd>{activeExample.eventTime}</dd>
                    </div>
                    <div>
                      <dt>Arrival time</dt>
                      <dd>{activeExample.arrivalTime}</dd>
                    </div>
                    <div>
                      <dt>Observed payload</dt>
                      <dd>{activeExample.payloadSummary}</dd>
                    </div>
                  </dl>
                </div>

                <div className="signal-record-behavior">
                  <div className="signal-record-behavior-block">
                    <h5>How Infinit-Signal handles it</h5>
                    <p>{activeExample.handlingBehavior}</p>
                  </div>
                  <div className="signal-record-behavior-block">
                    <h5>Downstream effect in Singularity</h5>
                    <p>{activeExample.downstreamEffect}</p>
                  </div>
                </div>
              </div>

              <p className="signal-record-boundary">
                <strong>Product boundary:</strong> Infinit-Signal qualifies
                incoming records and preserves source and timing evidence. It
                does not independently diagnose equipment problems, authorize
                actions, or verify operational recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* D. Fit With Existing Systems */}
      <section
        className="signal-section"
        aria-labelledby="signal-fit-title"
      >
        <div className="wrap">
          <div className="signal-section-header">
            <p className="eyebrow">
              <span className="little-line" />
              BUILT AROUND YOUR EXISTING OPERATIONS
            </p>
            <h2 id="signal-fit-title">
              Keep the systems you rely on. Make their information more useful.
            </h2>
            <p className="signal-section-lead">
              Infinit-Signal brings information from your existing equipment and
              systems into Last Mile, checks its quality, and preserves where it
              came from.
            </p>
          </div>

          <div className="signal-fit-grid">
            <div className="signal-fit-column">
              <h3>Your existing systems</h3>
              <ul className="signal-fit-list">
                {existingSystemsPoints.map((point) => (
                  <li key={point}>
                    <ShieldCheck size={19} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="signal-fit-column signal-fit-column--highlight">
              <h3>Infinit-Signal</h3>
              <ul className="signal-fit-list">
                {infinitSignalPoints.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={19} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="signal-qualification-note">
            Connections are configured around your environment and approved
            during implementation.
          </p>
        </div>
      </section>

      {/* E. Connected Platform and Closing CTA */}
      <section
        className="signal-section signal-section--canvas"
        aria-labelledby="signal-connected-platform-title"
      >
        <div className="wrap">
          <div className="signal-section-header">
            <p className="eyebrow">
              <span className="little-line" />
              CONNECTED PLATFORM
            </p>
            <h2 id="signal-connected-platform-title">
              One connected platform, built on dependable information.
            </h2>
          </div>

          <div className="signal-platform-grid">
            {platformCards.map((card) => (
              <a
                key={card.name}
                href={card.href}
                className={`signal-platform-card${card.current ? " signal-platform-card--current" : ""}`}
                aria-current={card.current ? "page" : undefined}
              >
                <div>
                  <span className="signal-platform-badge">{card.badge}</span>
                  <h3>{card.name}</h3>
                  <p>{card.description}</p>
                </div>
                <span className="signal-platform-card-link">
                  {card.cta}{" "}
                  {!card.current && <ArrowRight size={15} aria-hidden="true" />}
                </span>
              </a>
            ))}
          </div>

          <div className="signal-closing-panel">
            <div className="signal-closing-copy">
              <h2>
                See how your operating information becomes a foundation for
                action.
              </h2>
            </div>
            <div className="signal-closing-actions">
              <a
                className="button"
                href={demoUrl}
                onClick={() =>
                  trackEvent("cta_demo_click", {
                    placement: "infinit_signal_closing",
                    destination: demoUrl,
                  })
                }
              >
                Request a demo <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href="/singularity" className="text-link">
                Explore Singularity <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
