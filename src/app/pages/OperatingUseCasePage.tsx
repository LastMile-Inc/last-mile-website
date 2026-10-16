import { ExternalLink } from "lucide-react";
import { Navigate, useParams } from "react-router";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import {
  AccessibleDataTable,
  AuthorityStrip,
  ExpandableProcessMap,
  MeasurementGrid,
  OperatingConditionPanel,
  RecoveryContractPanel,
  ResponseTimeline,
  ScenarioProofPanel,
} from "@/app/components/OperatingScenarioComponents";
import {
  getOperatingScenario,
  resultBranchDefinitions,
  type OperatingScenarioKey,
} from "@/app/pages/platformReferenceData";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";
import "@/styles/use-case-page.css";

type UseCaseIntroConfig = {
  headline: string;
  supportingCopy: string;
  imageBasename: string;
  imageWidth: number;
  imageHeight: number;
  aspect: "16-10" | "16-9";
  imageAlt: string;
  captionContext: string;
};

const useCaseIntroConfigs: Partial<Record<OperatingScenarioKey, UseCaseIntroConfig>> = {
  air: {
    headline: "Keep compressed-air issues connected to the response.",
    supportingCopy:
      "Bring operating signals, equipment context, and coordinated work together so teams can follow a pressure issue through investigation, action, and verification.",
    imageBasename: "manufacturing-compressed-air",
    imageWidth: 1024,
    imageHeight: 640,
    aspect: "16-10",
    imageAlt:
      "Concept illustration of an industrial compressor room with compressed-air header piping and pressure monitoring context",
    captionContext: "Compressed-air header and distribution context",
  },
  refrigeration: {
    headline: "Carry refrigeration issues through to verified recovery.",
    supportingCopy:
      "Connect abnormal conditions to the affected equipment, responsible teams, and follow-up evidence—so completed work can be checked against the operating result.",
    imageBasename: "cold-storage-refrigeration-v2",
    imageWidth: 1024,
    imageHeight: 576,
    aspect: "16-9",
    imageAlt:
      "Concept illustration of cold-storage refrigeration piping, insulated headers, and temperature-controlled facility equipment",
    captionContext: "Cold-storage refrigeration context",
  },
  wastewater: {
    headline: "Keep lift-station response coordinated.",
    supportingCopy:
      "Connect station conditions, equipment context, and response work so teams can understand what needs attention and track the result.",
    imageBasename: "municipal-wastewater",
    imageWidth: 1024,
    imageHeight: 640,
    aspect: "16-10",
    imageAlt:
      "Concept illustration of a municipal wastewater lift station with wet-well pumping infrastructure and control monitoring context",
    captionContext: "Lift-station pumping and wet-well context",
  },
};

function UseCaseIntroMedia({ config }: { config: UseCaseIntroConfig }) {
  const { imageBasename, imageWidth, imageHeight, aspect, imageAlt, captionContext } = config;
  return (
    <figure className="uc-intro-media">
      <div className="uc-intro-media__frame" data-aspect={aspect}>
        <picture>
          <source
            type="image/avif"
            srcSet={`/images/use-cases/${imageBasename}-640.avif 640w, /images/use-cases/${imageBasename}-800.avif 800w, /images/use-cases/${imageBasename}-1024.avif 1024w`}
            sizes="(max-width: 1020px) calc(100vw - 40px), 660px"
          />
          <source
            type="image/webp"
            srcSet={`/images/use-cases/${imageBasename}-640.webp 640w, /images/use-cases/${imageBasename}-800.webp 800w, /images/use-cases/${imageBasename}-1024.webp 1024w`}
            sizes="(max-width: 1020px) calc(100vw - 40px), 660px"
          />
          <img
            src={`/images/use-cases/${imageBasename}.webp`}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <figcaption className="uc-intro-media__caption">
        <span>{captionContext}</span>
        <span className="uc-intro-media__tag">Concept illustration</span>
      </figcaption>
    </figure>
  );
}

export function OperatingUseCasePage() {
  const { useCaseSlug } = useParams();
  const scenario = getOperatingScenario(useCaseSlug ?? "");
  if (!scenario) return <Navigate to="/use-cases" replace />;

  const introConfig = useCaseIntroConfigs[scenario.key];
  const heroTitle = introConfig ? introConfig.headline : scenario.thesis;
  const heroIntro = introConfig
    ? introConfig.supportingCopy
    : `See how ${scenario.condition} becomes one accountable response across evidence, systems, people, work, authority, and verified return measurements.`;

  const operatorRealityTitle =
    scenario.key === "air"
      ? "Find the air loss before production does."
      : scenario.key === "cooling"
        ? "A normal temperature can hide a loss of cooling protection."
        : "The alarm is evidence. The operating Condition is the accountable object.";

  const operatorRealityIntro =
    scenario.key === "air"
      ? "Compressed-air demand stays high after production stops, while pressure falls in one zone. Bring the readings, production schedule, and maintenance response together to investigate the loss—and check that the repair restored performance."
      : scenario.key === "cooling"
        ? "The room is still within its temperature range, but a required pump has not started. Connect the equipment evidence, facilities response, and service work—and verify that redundancy has been restored."
        : introConfig
          ? `${scenario.thesis} See how ${scenario.condition} becomes one accountable response across evidence, systems, people, work, authority, and verified return measurements.`
          : undefined;

  const isConsolidatedLoop = scenario.key === "air" || scenario.key === "cooling";

  const description = `${scenario.operatingProblem}: a controlled Last Mile reference scenario connecting qualified evidence, accountable work, human authority, and telemetry-established recovery.`;
  return <>
    <SEO
      title={`${scenario.menuLabel} | Last Mile Use Case`}
      description={description}
      canonicalPath={scenario.route}
      keywords={`${scenario.operatingProblem}, industrial operational intelligence, work-order closure versus physical recovery, condition-to-outcome accountability`}
      jsonLd={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Use Cases", path: "/use-cases" }, { name: scenario.menuLabel, path: scenario.route }])}
    />
    <article className={`lm-v2-page lm-use-case-page${introConfig ? " lm-use-case-page--intro-updated" : ""}`}>
      <EditorialHero
        eyebrow={`${scenario.industry} · controlled reference scenario`}
        title={heroTitle}
        intro={heroIntro}
        primary={{ label: "Discuss This Operating Response", to: `/contact?intent=operation&scenario=${scenario.slug}` }}
        secondary={{ label: "All Operating Use Cases", to: "/use-cases" }}
        visual={introConfig ? <UseCaseIntroMedia config={introConfig} /> : <OperatingConditionPanel scenario={scenario} compact />}
      />

      <p className="lm-reference-disclosure lm-use-case-disclosure">{scenario.disclosure}</p>

      <EditorialSection eyebrow="OPERATOR'S REALITY" title={operatorRealityTitle} intro={operatorRealityIntro} tone="grid">
        <div className="lm-v2-columns-2">
          <article className="lm-v2-note"><span>Condition</span><h3>{scenario.condition}</h3><p>{scenario.conditionDetail}</p></article>
          <article className="lm-v2-note"><span>Ownership</span><h3>{scenario.owner}</h3><p>One named owner remains visible while control, work, provider, and safety responsibilities stay with their established systems and people.</p></article>
        </div>
        <dl className="lm-scenario-identity">{scenario.identity.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </EditorialSection>

      <EditorialSection eyebrow="INCIDENT SNAPSHOT" title="The measurements show why this is more than one alarm.">
        <MeasurementGrid measurements={scenario.incident} />
      </EditorialSection>

      <EditorialSection title="The response crosses systems that each retain a specific responsibility." tone="grid">
        <AccessibleDataTable
          caption={`${scenario.menuLabel} system and evidence handoffs`}
          headers={["System or role", "Evidence contributed", "Responsibility retained"]}
          rows={scenario.systems.map((system) => [system.name, system.evidence, system.retains])}
        />
      </EditorialSection>

      <EditorialSection title="People and authority remain explicit.">
        <div className="lm-people-authority">{scenario.people.map((person) => <article key={person.role}><h3>{person.role}</h3><p>{person.authority}</p></article>)}</div>
      </EditorialSection>

      <EditorialSection eyebrow="THE ACCOUNTABLE OPERATIONS LOOP" title="Evidence → Understand → Decide → Coordinate → Act → Verify ↻" tone="grid">
        <ol className="lm-response-stages" aria-label={isConsolidatedLoop ? "Accountable Operations stages, modes, and responsible parties" : undefined}>
          {scenario.response.map((step, index) => (
            <li key={step.stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.stage}</h3>
                <strong>{isConsolidatedLoop ? `${step.mode} · ${step.product}` : step.product}</strong>
                <p>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        {!isConsolidatedLoop ? <AuthorityStrip response={scenario.response} /> : null}
      </EditorialSection>

      <EditorialSection eyebrow="WORK AND HANDOFFS" title="Work state advances the response. It does not set the result.">
        <div className="lm-v2-columns-2"><ResponseTimeline scenario={scenario} /><article className="lm-v2-note"><span>Work-system and provider records</span><h3>Context retained with the Condition</h3><ul className="lm-v2-list">{scenario.workHandoffs.map((handoff) => <li key={handoff}>{handoff}</li>)}</ul></article></div>
      </EditorialSection>

      <EditorialSection eyebrow="RECOVERY CONTRACT" title="Define the return measurements before declaring recovery." tone="grid">
        <RecoveryContractPanel scenario={scenario} />
        <div className="lm-reference-recovery"><h3>Reference recovery dataset</h3><ul>{scenario.recovery.map((item) => <li key={item}>{item}</li>)}</ul><p>{scenario.resultSummary}</p></div>
        <InlineLink to="/resources/industrial-concepts/operational-outcome-thread">Why the operational outcome thread continues beyond work closure</InlineLink>
      </EditorialSection>

      <EditorialSection title="Every result branch remains visible and evidence-backed.">
        <div className="lm-result-branches">{resultBranchDefinitions.map((branch, index) => <article key={branch}><span>{String(index + 1).padStart(2, "0")}</span><p>{branch}</p></article>)}</div>
      </EditorialSection>

      <EditorialSection title="Program metrics are not event-proof criteria." tone="grid">
        <div className="lm-v2-columns-2"><article className="lm-v2-note"><span>Program metrics</span><h3>Useful over time—not proof of this event</h3><ul className="lm-v2-list">{scenario.programMetrics.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="lm-v2-note"><span>Event proof</span><h3>Measurements that establish this result</h3><ul className="lm-v2-list">{scenario.eventProof.map((item) => <li key={item}>{item}</li>)}</ul></article></div>
      </EditorialSection>

      <EditorialSection title="Reference basis and controlled assumptions.">
        <ul className="lm-reference-sources">{scenario.referenceBasis.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><strong>{source.label}</strong><ExternalLink aria-hidden="true" /></a><p>{source.note}</p></li>)}</ul>
        <p className="lm-v2-caveat">The cited sources support technical reasonableness. Equipment limits, commissioned setpoints, operating bands, response authority, and acceptance criteria remain customer- and site-specific.</p>
      </EditorialSection>

      <EditorialSection title="Inspect the complete condition-to-outcome process map." tone="grid">
        <ExpandableProcessMap scenario={scenario} textVersion={<ol className="lm-process-text-steps">{scenario.response.map((step) => <li key={step.stage}><strong>{step.stage} · {step.mode}</strong><span>{step.detail}</span></li>)}</ol>} />
      </EditorialSection>

      <EditorialSection eyebrow="PROOF STATUS" title="Demonstrable reference logic without a customer-production claim.">
        <ScenarioProofPanel scenario={scenario} />
      </EditorialSection>

      <NextStep title={`Map the ${scenario.operatingProblem.toLowerCase()} response in your environment.`} copy="Bring the source systems, identities, operating owner, work handoffs, authority rules, and return measurements. We will map where accountability currently breaks." label="Discuss This Operating Response" to={`/contact?intent=operation&scenario=${scenario.slug}`} secondary={{ label: "Explore the Platform", to: "/platform" }} />
    </article>
  </>;
}
