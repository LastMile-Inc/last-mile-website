import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";
import { Navigate, useParams } from "react-router";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, InlineLink } from "@/app/components/NarrativeComponents";
import {
  AccessibleDataTable,
  AccountableResponseRail,
  AuthorityStrip,
  ExpandableProcessMap,
  MeasurementGrid,
  OperatingConditionPanel,
  OutcomeEvidenceMap,
  RecoveryContractPanel,
  ResponseTimeline,
  SystemResponsibilityMap,
} from "@/app/components/OperatingScenarioComponents";
import { getOperatingScenario, resultBranchDefinitions } from "@/app/pages/platformReferenceData";
import { useCaseVisuals } from "@/app/pages/useCaseVisuals";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

export function OperatingUseCasePage() {
  const { useCaseSlug } = useParams();
  const scenario = getOperatingScenario(useCaseSlug ?? "");
  if (!scenario) return <Navigate to="/use-cases" replace />;

  const description = `${scenario.operatingProblem}: see the operating condition, coordinated response, and return readings in one Last Mile use case.`;
  const visual = useCaseVisuals[scenario.key];
  return <>
    <SEO
      title={`${scenario.menuLabel} | Last Mile Use Case`}
      description={description}
      canonicalPath={scenario.route}
      keywords={`${scenario.operatingProblem}, industrial operations, coordinated response, work-order closure versus physical recovery`}
      jsonLd={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Use Cases", path: "/use-cases" }, { name: scenario.menuLabel, path: scenario.route }])}
    />
    <article className="lm-v2-page lm-use-case-page">
      <EditorialHero
        eyebrow={`${scenario.industry} · Use Case`}
        title={scenario.thesis}
        intro={`Follow one ${scenario.operatingProblem.toLowerCase()} issue from the first warning through the work response and the readings that show the operation is stable again.`}
        primary={{ label: "Discuss This Operating Response", to: `/contact?intent=operation&scenario=${scenario.slug}` }}
        secondary={{ label: "All Use Cases", to: "/use-cases" }}
        visual={<figure className="lm-use-case-hero-photo"><img src={visual.src} alt={visual.alt} /></figure>}
      />

      <p className="lm-use-case-scroll-prompt"><ArrowDown aria-hidden="true" />Keep scrolling to follow the entire resolution</p>

      <div className="lm-use-case-story-deck">
        <StoryCard
          index={0}
          id="operating-condition"
          eyebrow="THE ISSUE"
          title="The first warning is not the whole problem."
          intro={scenario.conditionDetail}
        >
          <OperatingConditionPanel scenario={scenario} compact />
          <StoryDetails label="Inspect every incident reading and asset identity">
            <dl className="lm-scenario-identity">{scenario.identity.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <MeasurementGrid measurements={scenario.incident} />
          </StoryDetails>
        </StoryCard>

        <StoryCard
          index={1}
          id="response-map"
          eyebrow="THE TEAM"
          title="Every system contributes. One owner keeps the response moving."
          intro={`${scenario.owner} owns the operating response while each production system, work system, provider, and field team keeps its existing authority.`}
        >
          <SystemResponsibilityMap scenario={scenario} />
          <StoryDetails label="Inspect system evidence, retained responsibility, and human authority">
            <AccessibleDataTable
              caption={`${scenario.menuLabel} system and evidence handoffs`}
              headers={["System or role", "Evidence contributed", "Responsibility retained"]}
              rows={scenario.systems.map((system) => [system.name, system.evidence, system.retains])}
            />
            <div className="lm-people-authority">{scenario.people.map((person) => <article key={person.role}><h3>{person.role}</h3><p>{person.authority}</p></article>)}</div>
          </StoryDetails>
        </StoryCard>

        <StoryCard
          index={2}
          id="work-path"
          eyebrow="THE RESPONSE"
          title="One issue. One accountable path from signal to action."
          intro="The Accountable Operations Loop keeps the condition, decision, people, work, and return readings connected as the response moves forward."
        >
          <AccountableResponseRail scenario={scenario} />
          <StoryDetails label="Inspect authority, timing, and work handoffs">
            <AuthorityStrip response={scenario.response} />
            <div className="lm-use-case-detail-columns">
              <ResponseTimeline scenario={scenario} />
              <article className="lm-v2-note"><span>Work and provider handoffs</span><h3>Context stays with the issue</h3><ul className="lm-v2-list">{scenario.workHandoffs.map((handoff) => <li key={handoff}>{handoff}</li>)}</ul></article>
            </div>
          </StoryDetails>
        </StoryCard>

        <StoryCard
          index={3}
          id="recovery-contract"
          eyebrow="THE RECOVERY"
          title="Define a successful recovery before the work begins."
          intro="A completed work order is one input. The equipment and operating readings still have to return to the agreed range and remain there."
        >
          <div className="lm-use-case-recovery-layout">
            <RecoveryContractPanel scenario={scenario} />
            <article className="lm-reference-recovery"><span>Return readings</span><h3>What stable operation looks like</h3><ul>{scenario.recovery.map((item) => <li key={item}>{item}</li>)}</ul><p>{scenario.resultSummary}</p></article>
          </div>
          <StoryDetails label="Inspect every possible result branch">
            <div className="lm-result-branches">{resultBranchDefinitions.map((branch) => <article key={branch}><p>{branch}</p></article>)}</div>
            <InlineLink to="/resources/industrial-concepts/operational-outcome-thread">Why the operating record continues beyond work closure</InlineLink>
          </StoryDetails>
        </StoryCard>

        <StoryCard
          index={4}
          id="measurements"
          eyebrow="THE RESULT"
          title="Use the right readings for the event and the right metrics for the program."
          intro="Return readings answer whether this response restored the operation. Program metrics show whether performance improves across many responses over time."
        >
          <OutcomeEvidenceMap scenario={scenario} />
          <StoryDetails label="Inspect source material and the complete response map">
            <ul className="lm-reference-sources">{scenario.referenceBasis.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><strong>{source.label}</strong><ExternalLink aria-hidden="true" /></a><p>{source.note}</p></li>)}</ul>
            <ExpandableProcessMap scenario={scenario} textVersion={<ol className="lm-process-text-steps">{scenario.response.map((step) => <li key={step.stage}><strong>{step.stage} · {step.mode}</strong><span>{step.detail}</span></li>)}</ol>} />
          </StoryDetails>
        </StoryCard>
      </div>

    </article>
  </>;
}

function StoryCard({ index, id, eyebrow, title, intro, children }: { index: number; id: string; eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <section className="lm-use-case-story-card" id={id} style={{ "--lm-card-index": index } as CSSProperties}>
    <header className="lm-use-case-story-card__header">
      <p className="lm-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{intro}</p>
    </header>
    <div className="lm-use-case-story-card__body">{children}</div>
  </section>;
}

function StoryDetails({ label, children }: { label: string; children: ReactNode }) {
  return <details className="lm-use-case-details">
    <summary>{label}<span aria-hidden="true">+</span></summary>
    <div>{children}</div>
  </details>;
}
