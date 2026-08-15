import { SEO } from "@/app/components/SEO";
import { AccountableOperationsLoop } from "@/app/components/AccountableOperationsLoop";
import { CtaLink } from "@/app/components/MarketingComponents";
import { OperationalIcon, type OperationalIconKind } from "@/app/components/OperationalIcon";
import { createOrganizationSchema, createWebsiteSchema } from "@/app/lib/structuredData";

const systemGroups: ReadonlyArray<{ label: string; systems: string; kind: OperationalIconKind; position: string }> = [
  { label: "Control systems", systems: "PLC · DCS · SCADA · BMS", kind: "control-system", position: "control" },
  { label: "Operational data", systems: "Historians · MQTT · UNS · OPC UA", kind: "operational-data", position: "data" },
  { label: "Execution systems", systems: "CMMS · EAM · MES · QMS · ERP", kind: "execution-system", position: "execution" },
  { label: "People & authority", systems: "Operators · Maintenance · Engineering", kind: "people-authority", position: "people" },
] as const;

const loopIntro = "A closed ticket only says the task ended. The loop keeps the problem, response, work, and return readings connected until the operation is stable again.";
const loopLearningCopy = "Because Last Mile sees the full lifecycle from first signal through verified recovery, AI can compare the decisions, handoffs, actions, delays, and return readings that shaped the result. No useful learning is lost, proven resolution steps do not have to be rediscovered, and approved improvements can be applied automatically the next time a similar issue appears.";

export function HomePage() {
  const description = "Industrial orchestration from first alarm through confirmed machine recovery.";

  return <>
    <SEO
      title="Last Mile | The Physical Operations Platform"
      description={description}
      canonicalPath="/"
      markdownPath="/index.md"
      keywords="physical operations platform, industrial operations, accountable operations loop, connected work systems, verified fixes"
      jsonLd={[createOrganizationSchema(), createWebsiteSchema()]}
    />
    <div className="lm-v2-page lm-home-page lm-home-v3">
      <HomepageHero />
      <IndustryProblem />
      <MissingLastMile />
      <AccountableOperationsLoop introCopy={loopIntro} learningCopy={loopLearningCopy} />
      <IndustryValue />
    </div>
  </>;
}

function HomepageHero() {
  return <header className="lm-home-hero-v3">
    <div className="lm-v2-container lm-home-hero-v3__layout">
      <div className="lm-home-hero-v3__copy">
        <h1>When operations break, Last Mile keeps the response from breaking with them.</h1>
        <p>Last Mile sits across the systems already running your plant and turns scattered alarms, readings, work updates, and decisions into one accountable operating picture.</p>
        <strong>Know what changed. Put the right people in motion. Confirm the machine recovered.</strong>
        <div className="lm-actions">
          <CtaLink to="/#industry-problem" eventName="cta_explore_platform_click">See the Problem</CtaLink>
          <CtaLink to="/platform" variant="secondary" eventName="cta_explore_platform_click">Explore the Platform</CtaLink>
        </div>
      </div>
      <figure className="lm-home-hero-v3__visual">
        <div className="lm-home-hero-v3__image">
          <picture>
            <source media="(max-width: 720px)" srcSet="/images/Hero/last-mile-operations-hero-v2-960.webp" type="image/webp" />
            <source srcSet="/images/Hero/last-mile-operations-hero-v2.webp" type="image/webp" />
            <img src="/images/Hero/last-mile-operations-hero-v2.png" width="1536" height="1024" alt="Industrial operations engineer surveying a working process facility." fetchPriority="high" />
          </picture>
          <div className="lm-home-hero-v3__frame" aria-hidden="true"><i /><i /><i /><i /></div>
        </div>
        <figcaption><span>BUILT FOR EXISTING OPERATIONS</span><strong>Keep the systems, controls, and people you already trust.</strong></figcaption>
      </figure>
    </div>
  </header>;
}

function IndustryProblem() {
  const signalSources: ReadonlyArray<{ label: string; detail: string; kind: OperationalIconKind }> = [
    { label: "Machine signals", detail: "Alarms and sensor readings", kind: "signal" },
    { label: "Operating history", detail: "Trends and prior events", kind: "operational-data" },
    { label: "Work activity", detail: "Tasks, owners, and status", kind: "work" },
    { label: "Human decisions", detail: "Calls, approvals, and handoffs", kind: "people-authority" },
  ];

  return <section id="industry-problem" className="lm-home-problem-section" aria-labelledby="industry-problem-heading">
    <div className="lm-v2-container">
      <header className="lm-home-section-head lm-home-section-head--centered">
        <p className="lm-eyebrow">THE PROBLEM WE SEE EVERY DAY</p>
        <h2 id="industry-problem-heading">Industrial teams are drowning in signals and still missing what matters.</h2>
        <p>An operator may need to reconcile an alarm in SCADA, a trend in a historian, a work order in the CMMS, and a provider update in email before anyone can see the full issue. By then, production has slowed, a fault has spread, or a fix has already failed.</p>
      </header>
      <div className="lm-home-problem-grid">
        <article className="lm-home-signal-pressure">
          <header><span>WHY NOW</span><h3>More automation. More data. Less time to make sense of it.</h3><p>People do not need another screen full of data. They need one operating view that connects what changed, what it affects, who owns the response, and whether the machine is truly running correctly again.</p></header>
          <div className="lm-home-signal-field">
            <div className="lm-home-signal-field__sources">{signalSources.map((source) => <div key={source.label}><OperationalIcon kind={source.kind} size="medium" /><span><strong>{source.label}</strong><small>{source.detail}</small></span></div>)}</div>
            <div className="lm-home-signal-field__focus"><OperationalIcon kind="context" size="large" /><span>ONE OPERATING PICTURE</span><strong>What changed? Who owns it? What happens next?</strong></div>
          </div>
        </article>
        <aside className="lm-home-plant-story">
          <span className="lm-home-plant-story__eyebrow">A REAL LESSON FROM THE PLANT FLOOR</span>
          <OperationalIcon kind="production" size="large" label="Bottling line startup" />
          <h3><q>Everything was green. The line still failed.</q></h3>
          <p>A new cough syrup bottling system was ready for its first product run. Every indicator looked right. When the line started, the capper tightened the caps hard enough to crush the bottles and send sticky syrup onto the floor.</p>
          <p>The configuration looked correct inside each system. The physical result was wrong. The team lost days to delay and cleanup because no single view connected the machine settings to what was actually happening on the line.</p>
          <strong>That is the gap Last Mile is built to close.</strong>
        </aside>
      </div>
    </div>
  </section>;
}

function MissingLastMile() {
  return <section id="missing-last-mile" className="lm-home-section lm-home-architecture-section" aria-labelledby="missing-last-mile-heading">
    <div className="lm-v2-container">
      <header className="lm-home-section-head lm-home-section-head--centered">
        <p className="lm-eyebrow">THE SOLUTION</p>
        <h2 id="missing-last-mile-heading">Your systems know their part. Last Mile connects the entire response.</h2>
        <p>Last Mile is the orchestration layer across the production systems already in place. It connects the alarm, equipment, readings, decisions, work, owner, and return telemetry so teams can act sooner and see whether the machine is actually running correctly again.</p>
      </header>

      <div className="lm-architecture-map" aria-label="Last Mile connects control systems, operational data, execution systems, and people around one operating condition.">
        <svg className="lm-architecture-map__connectors" viewBox="0 0 1000 620" aria-hidden="true">
          <path d="M250 152 C370 152 365 258 438 276" />
          <path d="M750 152 C630 152 635 258 562 276" />
          <path d="M250 468 C370 468 365 362 438 344" />
          <path d="M750 468 C630 468 635 362 562 344" />
          <circle cx="500" cy="310" r="178" />
          <circle cx="500" cy="310" r="214" />
        </svg>
        {systemGroups.map((group) => <article key={group.label} className={`lm-architecture-node lm-architecture-node--${group.position}`}>
          <OperationalIcon kind={group.kind} size="large" />
          <div><span>{group.label}</span><strong>{group.systems}</strong></div>
        </article>)}
        <div className="lm-architecture-core">
          <span>THE LAST MILE</span>
          <strong>One operating problem.<br />One connected response.</strong>
          <div aria-hidden="true"><i>Condition</i><b>→</b><i>Response</i><b>→</b><i>Outcome</i></div>
        </div>
      </div>
    </div>
  </section>;
}

function IndustryValue() {
  const values = [
    { title: "Keep ownership visible", copy: "The issue, current owner, next action, and elapsed time stay together while the response moves across teams." },
    { title: "Carry context across every handoff", copy: "Operators, maintenance, engineering, service providers, and business systems work from the same operating problem instead of separate fragments." },
    { title: "Stay with the operation after the work ends", copy: "Return readings show whether the equipment recovered and remained stable. Work completed is not the same as problem solved." },
    { title: "Continuous Improvement (Kaizen)", copy: "The platform retains what each response taught the organization, exposes where time was lost, and gives teams a practical path to lower MTTR on the next issue." },
  ] as const;

  return <section className="lm-home-value-section" aria-labelledby="industry-value-heading">
    <div className="lm-v2-container">
      <header className="lm-home-section-head lm-home-section-head--centered">
        <p className="lm-eyebrow">WHAT LAST MILE BRINGS TO INDUSTRY</p>
        <h2 id="industry-value-heading">A response that does not disappear between systems, teams, or shifts.</h2>
        <p>Last Mile turns scattered signals and handoffs into a response people can follow, manage, and improve.</p>
      </header>
      <div className="lm-industry-value-path">{values.map((value, index) => <article key={value.title}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{value.title}</h3><p>{value.copy}</p></div></article>)}</div>
    </div>
  </section>;
}
