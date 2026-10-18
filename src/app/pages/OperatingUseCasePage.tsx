import { ExternalLink } from "lucide-react";
import { useParams } from "react-router";
import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import { AccessibleDataTable } from "@/app/components/OperatingScenarioComponents";
import {
  getOperatingScenario,
  ragLabel,
  type OperatingScenario,
  type OperatingScenarioKey,
} from "@/app/pages/platformReferenceData";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";
import { NotFound } from "./NotFound";
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
      "Industrial compressor room with compressed-air header piping and pressure monitoring context",
    captionContext: "Compressed-air header and distribution context",
  },
  refrigeration: {
    headline: "Carry refrigeration issues through to verified recovery.",
    supportingCopy:
      "Connect abnormal conditions to the affected equipment, responsible teams, and follow-up evidence so completed work can be checked against the operating result.",
    imageBasename: "cold-storage-refrigeration-v2",
    imageWidth: 1024,
    imageHeight: 576,
    aspect: "16-9",
    imageAlt:
      "Cold-storage refrigeration piping, insulated headers, and temperature-controlled facility equipment",
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
      "Municipal wastewater lift station with wet-well pumping infrastructure and control monitoring context",
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
      </figcaption>
    </figure>
  );
}

function CoolingIntroSummary({ scenario }: { scenario: OperatingScenario }) {
  return (
    <section className="lm-v2-note" aria-label="Cooling scenario summary">
      <span>Operating scenario</span>
      <h3>{scenario.condition}</h3>
      <p>{scenario.conditionDetail}</p>
      <dl className="lm-scenario-identity">
        {scenario.identity.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function OperatingUseCasePage() {
  const { useCaseSlug } = useParams();
  const scenario = getOperatingScenario(useCaseSlug ?? "");
  if (!scenario) return <NotFound />;

  const introConfig = useCaseIntroConfigs[scenario.key];
  const heroTitle =
    scenario.key === "cooling"
      ? "When a normal temperature hides a cooling problem."
      : introConfig
        ? introConfig.headline
        : scenario.thesis;
  const heroIntro = introConfig
    ? introConfig.supportingCopy
    : "Connect equipment status, facilities response, and post-work checks so the team can verify that backup cooling protection has been restored.";

  const attentionTitle =
    scenario.key === "air"
      ? "Find the air loss before production does."
      : scenario.key === "cooling"
        ? "A normal room temperature can hide a loss of backup cooling capacity."
        : scenario.key === "wastewater"
          ? "Running status alone does not confirm pumping capacity."
          : "Room air temperature is often a late warning of refrigeration trouble.";

  const attentionIntro =
    scenario.key === "air"
      ? "Compressed-air demand stays higher than expected after production stops, while header pressure falls in one plant zone. Combining compressor output, zone pressure, and the production schedule points to a distribution or demand-side loss rather than compressor inefficiency."
      : scenario.key === "cooling"
        ? "Hall 3 remains within its recommended inlet temperature range for ASHRAE Class A1 to A4 equipment, but secondary pump CHWP-02 failed to start when commanded and loop differential pressure is falling."
        : scenario.key === "wastewater"
          ? "Duty pump P-102 reports running, but elevated motor current, low discharge flow, and a rising wet-well level show that pumping capacity is degraded while standby capacity is unavailable."
          : "Freezer room air is beginning to rise while low suction pressure, elevated superheat, low fan current, and a delayed defrost cycle point to degraded evaporator capacity before product temperature exceeds its site threshold.";

  const evidenceRows = scenario.incident.map((item) => [
    item.name,
    item.value,
    item.reference,
    ragLabel(item),
  ]);

  const description = `${scenario.operatingProblem}: a Last Mile operating scenario showing how equipment readings, team responsibilities, coordinated work, and recovery verification stay connected.`;

  return (
    <>
      <SEO
        title={`${scenario.menuLabel} | Last Mile`}
        description={description}
        canonicalPath={scenario.route}
        keywords={`${scenario.operatingProblem}, industrial operational intelligence, work-order closure versus physical recovery, condition-to-outcome accountability`}
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Use Cases", path: "/use-cases" },
          { name: scenario.menuLabel, path: scenario.route },
        ])}
      />
      <article className={`lm-v2-page lm-use-case-page${introConfig ? " lm-use-case-page--intro-updated" : ""}`}>
        <EditorialHero
          eyebrow={`${scenario.industry} · Operating scenario`}
          title={heroTitle}
          intro={heroIntro}
          primary={{ label: "Discuss your operation", to: `/contact?intent=operation&scenario=${scenario.slug}` }}
          secondary={{ label: "All operating scenarios", to: "/use-cases" }}
          visual={introConfig ? <UseCaseIntroMedia config={introConfig} /> : <CoolingIntroSummary scenario={scenario} />}
        />

        {/* 1. What needs attention */}
        <EditorialSection
          eyebrow="1. WHAT NEEDS ATTENTION"
          title={attentionTitle}
          intro={attentionIntro}
          tone="grid"
        >
          <div className="lm-v2-columns-2">
            <article className="lm-v2-note">
              <span>Operating issue</span>
              <h3>{scenario.condition}</h3>
              <p>{scenario.conditionDetail}</p>
            </article>
            <article className="lm-v2-note">
              <span>Responsible role</span>
              <h3>{scenario.owner}</h3>
              <p>
                One responsible role stays visible across the response while local control, maintenance records, and field safety remain with the customer&apos;s established systems and people.
              </p>
            </article>
          </div>
          <AccessibleDataTable
            caption={`${scenario.menuLabel}: incident evidence and site reference basis (snapshot at issue qualification)`}
            headers={["Measurement", "Observed reading", "Site reference basis", "Status"]}
            rows={evidenceRows}
          />
        </EditorialSection>

        {/* 2. Who needs to respond */}
        <EditorialSection
          eyebrow="2. WHO NEEDS TO RESPOND"
          title="Clear ownership across people and connected systems."
          intro="Each role and system contributes specific information while keeping its established operational and safety responsibilities."
        >
          <div className="lm-people-authority">
            {scenario.people.map((person) => (
              <article key={person.role}>
                <h3>{person.role}</h3>
                <p>{person.authority}</p>
              </article>
            ))}
          </div>
          <div className="lm-systems-retained">
            {scenario.systems.map((system) => (
              <article key={system.name} className="lm-v2-note">
                <span>{system.name}</span>
                <p>{system.evidence}</p>
                <small>Retains: {system.retains}</small>
              </article>
            ))}
          </div>
        </EditorialSection>

        {/* 3. How the response stays connected */}
        <EditorialSection
          eyebrow="3. HOW THE RESPONSE STAYS CONNECTED"
          title="Evidence → Understand → Decide → Coordinate → Act → Verify"
          intro="The Accountable Operations Loop keeps the issue, approvals, and work connected across teams from the initial warning through post-work verification."
          tone="grid"
        >
          <ol
            className="lm-response-stages"
            aria-label="Accountable Operations stages, modes, and responsible parties"
          >
            {scenario.response.map((step, index) => (
              <li key={step.stage}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.stage}</h3>
                  <strong>{`${step.mode} · ${step.product}`}</strong>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </EditorialSection>

        {/* 4. How recovery is checked */}
        <EditorialSection
          eyebrow="4. HOW RECOVERY IS CHECKED"
          title="Completed work records the task. Operating measurements check the result."
          intro="Closing a work order or contractor dispatch records that the field task finished. Recovery is checked against subsequent equipment readings across the site's agreed observation period, while authorized personnel retain acceptance responsibility."
        >
          <div className="lm-v2-columns-2">
            <article className="lm-v2-note">
              <span>Recovery criteria ({scenario.stabilityPeriod})</span>
              <h3>What is checked after the work</h3>
              <ul className="lm-v2-list">
                {scenario.recoveryCriteria.map((criterion) => (
                  <li key={criterion}>{criterion}</li>
                ))}
              </ul>
            </article>
            <article className="lm-v2-note">
              <span>Post-work evaluation</span>
              <h3>How the outcome is recorded</h3>
              <p>{scenario.resultSummary}</p>
              <p style={{ marginTop: "12px" }}>
                If required readings are missing, stale, or still outside the site&apos;s agreed range after the work order closes, the operating result remains unresolved. If the same abnormal condition returns within the configured follow-up window ({scenario.recurrenceWindow}), the issue can be reopened with its prior history intact.
              </p>
            </article>
          </div>
          <div style={{ marginTop: "20px" }}>
            <InlineLink to="/resources/industrial-concepts/operational-outcome-thread">
              Read why a closed work order doesn&apos;t prove the problem is fixed
            </InlineLink>
          </div>
          <ul className="lm-reference-sources" style={{ marginTop: "24px" }}>
            {scenario.referenceBasis.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  <strong>{source.label}</strong>
                  <ExternalLink aria-hidden="true" />
                </a>
                <p>{source.note}</p>
              </li>
            ))}
          </ul>
        </EditorialSection>

        {/* 5. One relevant CTA */}
        <NextStep
          title="Start with one operating challenge."
          copy="Tell us what happens today, which systems are involved, and where the response loses continuity."
          label="Discuss your operation"
          to={`/contact?intent=operation&scenario=${scenario.slug}`}
          secondary={{ label: "Explore Resources", to: "/resources" }}
        />
      </article>
    </>
  );
}
