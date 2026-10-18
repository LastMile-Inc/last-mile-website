import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { SEO } from "@/app/components/SEO";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageIntro, ClosingCTA } from "@/app/components/makeover/SiteShell";
import "@/styles/how-it-works-ring.css";
import "@/styles/supporting-pages.css";

type RingStage = {
  number: string;
  id: string;
  name: string;
  explanation: string;
  anchorX: number;
  anchorY: number;
  lineEndX: number;
  lineEndY: number;
  labelX: string;
  labelY: string;
  labelTransform: string;
  mobileX: string;
  mobileY: string;
  hitPolygon: string;
};

const ringStages: RingStage[] = [
  {
    number: "1",
    id: "evidence",
    name: "Evidence",
    explanation:
      "Capture the signals, observations, and records that show what is happening.",
    anchorX: 783,
    anchorY: 208,
    lineEndX: 695,
    lineEndY: 112,
    labelX: "34.07%",
    labelY: "9.66%",
    labelTransform: "translate(-50%, -100%)",
    mobileX: "36.5%",
    mobileY: "12.0%",
    hitPolygon: "620,250 1020,145 1020,375 740,430",
  },
  {
    number: "2",
    id: "understand",
    name: "Understand",
    explanation:
      "Connect the evidence to the equipment, dependencies, and operating history.",
    anchorX: 1255,
    anchorY: 211,
    lineEndX: 1345,
    lineEndY: 112,
    labelX: "65.93%",
    labelY: "9.66%",
    labelTransform: "translate(-50%, -100%)",
    mobileX: "63.5%",
    mobileY: "12.0%",
    hitPolygon: "1020,145 1440,260 1300,435 1020,375",
  },
  {
    number: "3",
    id: "decide",
    name: "Decide",
    explanation:
      "Determine the appropriate response and the authority required.",
    anchorX: 1596,
    anchorY: 580,
    lineEndX: 1676,
    lineEndY: 580,
    labelX: "82.16%",
    labelY: "50.0%",
    labelTransform: "translate(0%, -50%)",
    mobileX: "84.5%",
    mobileY: "50.0%",
    hitPolygon: "1450,275 1615,580 1445,885 1295,720 1320,580 1300,440",
  },
  {
    number: "4",
    id: "coordinate",
    name: "Coordinate",
    explanation:
      "Align responsibilities, approvals, and work across people and systems.",
    anchorX: 1257,
    anchorY: 952,
    lineEndX: 1345,
    lineEndY: 1048,
    labelX: "65.93%",
    labelY: "90.34%",
    labelTransform: "translate(-50%, 0%)",
    mobileX: "63.5%",
    mobileY: "88.5%",
    hitPolygon: "1020,785 1300,725 1435,900 1020,1015",
  },
  {
    number: "5",
    id: "act",
    name: "Act",
    explanation:
      "Carry out the authorized response and record what was done.",
    anchorX: 785,
    anchorY: 948,
    lineEndX: 695,
    lineEndY: 1048,
    labelX: "34.07%",
    labelY: "90.34%",
    labelTransform: "translate(-50%, 0%)",
    mobileX: "36.5%",
    mobileY: "88.5%",
    hitPolygon: "740,725 1020,785 1020,1015 620,900",
  },
  {
    number: "6",
    id: "verify",
    name: "Verify",
    explanation:
      "Check operating evidence to determine whether the intended result was achieved.",
    anchorX: 466,
    anchorY: 580,
    lineEndX: 386,
    lineEndY: 580,
    labelX: "18.92%",
    labelY: "50.0%",
    labelTransform: "translate(-100%, -50%)",
    mobileX: "16.5%",
    mobileY: "50.0%",
    hitPolygon: "610,275 740,440 720,580 740,720 610,885 445,580",
  },
];

const steps = [
  {
    id: "01",
    stages: "EVIDENCE + UNDERSTAND",
    title: "Start with the whole story.",
    text: "A reading has changed. What does it mean for the equipment, the people, and the work depending on it? Bring the current conditions and useful history together before choosing the next step.",
    example: "A required cooling pump has not started, even though room temperature remains within range. Your team connects the pump readings, cooling dependencies, and recent service history to understand the loss of protection.",
    proof: "The question: What needs our attention, and why?",
    card: {
      bar: "OPERATING RECORD · COOLING LOOP B",
      badge: "1. Evidence · 2. Understand",
      heading: "Connect the warning to the equipment and history",
      rows: [
        ["Signal source", "BMS and historian pump readings checked by Infinit-Signal"],
        ["Equipment context", "Cooling Loop B secondary chilled-water pump (CHWP-02) and protected room"],
        ["Operating history", "Recent valve and pump activity linked in Singularity"],
      ],
      footerLabel: "Products in play:",
      footerValue: "Infinit-Signal + Singularity",
    },
  },
  {
    id: "02",
    stages: "DECIDE + COORDINATE + ACT",
    title: "Make the next move clear.",
    text: "Agree on the response. Give it an owner. Carry it out within your operating rules, with the right approvals and a shared view of progress.",
    example: "The responsible person reviews the proposed cooling response. The team knows who is taking action, what has been approved, and what happens next.",
    proof: "The question: Who is doing what, with whose approval?",
    card: {
      bar: "COORDINATED RESPONSE · OWNER & APPROVALS",
      badge: "3. Decide · 4. Coordinate · 5. Act",
      heading: "Route the work while keeping responsibility and approvals clear",
      rows: [
        ["Responsible owner", "Shift facilities lead assigned to the active response"],
        ["Required approval", "Physical equipment work held for facility authorization"],
        ["Connected systems", "Work order and service dispatch updates synchronized with the maintenance record"],
      ],
      footerLabel: "Products in play:",
      footerValue: "Infinit-Flow + Infinit-Control",
    },
  },
  {
    id: "03",
    stages: "VERIFY",
    title: "Let the operation prove the result.",
    text: "After the action, check the operating evidence. The result should be visible in the equipment’s performance, with a clear record of the response that led there.",
    example: "After the work, the team checks pump operation, pressure, temperature, and the required stability period to establish whether cooling protection has been restored.",
    proof: "The question: What tells us the response worked?",
    card: {
      bar: "OUTCOME VERIFICATION · EQUIPMENT READINGS",
      badge: "6. Verify",
      heading: "Separate work completion from confirmed recovery",
      rows: [
        ["Work milestone", "Pump inspection and service work recorded as complete"],
        ["Readings after work", "Pump operation, flow, differential pressure, and supply temperature checked over the stability period"],
        ["Recorded outcome", "Cooling protection confirmed only when current valid readings stay in range"],
      ],
      footerLabel: "Reference scenario:",
      footerValue: "Data Center Cooling Redundancy",
    },
  },
];

export function HowItWorksPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const labelRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeStage = ringStages[selectedIndex];

  const handleStageKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % ringStages.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + ringStages.length) % ringStages.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = ringStages.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      setSelectedIndex(nextIndex);
      labelRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <>
      <SEO
        title={"How Last Mile works | From warning to result"}
        description={"Follow an issue through the Accountable Operations Loop: understand it, coordinate the response, and verify the physical outcome."}
        canonicalPath="/how-it-works"
        robots="noindex, nofollow"
      />
      <main id="main">
        <PageIntro
          label="HOW LAST MILE WORKS"
          title="A warning should"
          accent="start a response."
          description="We have developed a structured method to keep your teams in command and control of your complex operations.  We call it the Accountable Operations Loop."
        >
          <div className="hero-actions">
            <a className="button" href="/demo">
              Request a demo <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href="#follow-the-response">
              Follow one issue <ArrowRight size={18} />
            </a>
          </div>
        </PageIntro>

        <section
          className="ao-ring-section"
          aria-labelledby="accountable-operations-ring-title"
        >
          <div className="wrap ao-ring-layout">
            <div className="ao-ring-visual-col">
              <div
                className="ao-ring-stage"
                role="tablist"
                aria-label="Accountable Operations stages"
              >
                <img
                  className="ao-ring-artwork"
                  src="/images/platform/accountable-operations-loop-v3.png"
                  alt="Six-segment dimensional Accountable Operations ring"
                  width={1672}
                  height={941}
                />

                <svg
                  className="ao-ring-svg"
                  viewBox="0 0 2040 1160"
                  aria-hidden="true"
                >
                  {ringStages.map((stage, index) => {
                    const isActive = index === selectedIndex;
                    return (
                      <g key={stage.id}>
                        <polygon
                          className="ao-ring-hit-wedge"
                          points={stage.hitPolygon}
                          onClick={() => setSelectedIndex(index)}
                        />
                        <line
                          className={`ao-ring-leader${isActive ? " is-active" : ""}`}
                          x1={stage.anchorX}
                          y1={stage.anchorY}
                          x2={stage.lineEndX}
                          y2={stage.lineEndY}
                        />
                        <circle
                          className={`ao-ring-anchor-outer${isActive ? " is-active" : ""}`}
                          cx={stage.anchorX}
                          cy={stage.anchorY}
                          r={isActive ? 9 : 7}
                        />
                        <circle
                          className={`ao-ring-anchor-dot${isActive ? " is-active" : ""}`}
                          cx={stage.anchorX}
                          cy={stage.anchorY}
                          r={isActive ? 4.5 : 3.5}
                        />
                      </g>
                    );
                  })}
                </svg>

                <div className="ao-ring-center" aria-hidden="true">
                  <span className="ao-ring-center-title">
                    ACCOUNTABLE OPERATIONS
                  </span>
                  <span className="ao-ring-center-subtitle">
                    From first warning to verified result
                  </span>
                </div>

                {ringStages.map((stage, index) => {
                  const isActive = index === selectedIndex;
                  const style = {
                    "--label-x": stage.labelX,
                    "--label-y": stage.labelY,
                    "--label-transform": stage.labelTransform,
                    "--mobile-x": stage.mobileX,
                    "--mobile-y": stage.mobileY,
                  } as CSSProperties;

                  return (
                    <button
                      key={stage.id}
                      ref={(el) => {
                        labelRefs.current[index] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`ao-stage-tab-${stage.id}`}
                      aria-selected={isActive}
                      aria-controls={`ao-stage-panel-${stage.id}`}
                      className="ao-ring-label"
                      style={style}
                      onClick={() => setSelectedIndex(index)}
                      onKeyDown={(event) => handleStageKeyDown(event, index)}
                    >
                      <span className="ao-ring-label-num">{stage.number}.</span>
                      <span className="ao-ring-label-text">{stage.name}</span>
                    </button>
                  );
                })}
              </div>

              <p className="ao-ring-mobile-subtitle">
                From first warning to verified result
              </p>

              <div
                className="ao-ring-mobile-selector"
                role="group"
                aria-label="Select an Accountable Operations stage"
              >
                {ringStages.map((stage, index) => {
                  const isActive = index === selectedIndex;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      className="ao-ring-mobile-btn"
                      aria-pressed={isActive}
                      onClick={() => setSelectedIndex(index)}
                    >
                      <span className="ao-ring-mobile-btn-num">
                        {stage.number}.
                      </span>
                      <span>{stage.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="ao-ring-header">
              <h2 id="accountable-operations-ring-title">
                Accountable Operations
              </h2>
              <p className="ao-ring-supporting">
                Keep evidence, decisions, coordinated work, and verification
                connected throughout the response.
              </p>
            </div>

            <div className="ao-ring-copy-col">
              <div
                className="ao-ring-detail-card"
                role="tabpanel"
                id={`ao-stage-panel-${activeStage.id}`}
                aria-labelledby={`ao-stage-tab-${activeStage.id}`}
              >
                <div className="ao-ring-detail-top">
                  <span className="ao-ring-detail-step">
                    {activeStage.number}. {activeStage.name}
                  </span>
                </div>
                <h3>{activeStage.name}</h3>
                <p>{activeStage.explanation}</p>
              </div>

              <p className="ao-ring-milestone-note">
                Completed work is one milestone. Operating evidence determines
                whether recovery is established or further response is needed.
              </p>
            </div>
          </div>
        </section>

        <section id="follow-the-response" className="walkthrough wrap section-space">
          <div className="section-top">
            <div>
              <p className="eyebrow">WATCH THE AOL IN ACTION</p>
              <h2>Use Case: Follow this cooling issue.</h2>
            </div>
          </div>
          {steps.map((step) => (
            <article className="walkthrough-row" key={step.id}>
              <div>
                <p className="eyebrow">
                  {step.id} / {step.stages}
                </p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div className="scenario-note">
                  <span>IN THIS EXAMPLE</span>
                  <p>{step.example}</p>
                </div>
                <strong>{step.proof}</strong>
              </div>
              <div className="lm-supporting-card" aria-label={step.card.heading}>
                <div className="lm-supporting-card__bar">
                  <span>{step.card.bar}</span>
                  <span className="lm-supporting-card__badge">{step.card.badge}</span>
                </div>
                <div className="lm-supporting-card__body">
                  <h4 className="lm-supporting-card__title">{step.card.heading}</h4>
                  <ul className="lm-supporting-card__rows">
                    {step.card.rows.map(([label, value]) => (
                      <li key={label}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lm-supporting-card__footer">
                  <span>
                    <strong>{step.card.footerLabel}</strong> {step.card.footerValue}
                  </span>
                  <a className="text-link" href="/use-cases/data-center-cooling">
                    Explore cooling reference <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <ClosingCTA
          title="Bring your team’s next question."
          text="Let’s walk through how a response could work in your operation."
        />
      </main>
    </>
  );
}
