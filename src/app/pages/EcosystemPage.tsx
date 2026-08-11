import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import { AccessibleDataTable } from "@/app/components/OperatingScenarioComponents";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

const categories = [
  {
    title: "Industrial messaging, brokers, and Unified Namespace",
    copy: "MQTT brokers, Sparkplug infrastructure, OPC UA sources, and customer UNS architectures retain transport, topic, session, information-model, and distribution responsibilities. Last Mile consumes configured source outputs and does not replace the broker or claim ownership of the customer's namespace.",
    link: ["Understand the UNS and SSOM boundary", "/resources/industrial-concepts/uns-and-ssom"],
  },
  {
    title: "Control, SCADA, BMS, and MES",
    copy: "These systems retain local monitoring, control, production, and safety responsibilities. Last Mile consumes authorized evidence and does not bypass deterministic control or site authority.",
  },
  {
    title: "Historians and industrial data platforms",
    copy: "These systems retain source and historical-data responsibilities. Last Mile preserves point identity, time, quality, revision, and lineage while adding cross-system Conditions and Outcomes.",
  },
  {
    title: "Work, facilities, and enterprise systems",
    copy: "Enterprise asset, work, CMMS, facilities, and related platforms retain their records and lifecycle responsibilities. Last Mile coordinates one operating case and distinguishes record closure from physical recovery.",
  },
  {
    title: "Industrial service execution",
    copy: "Integrators, OEMs, maintenance providers, and field teams retain execution and safety authority. Last Mile routes complete evidence, maintains a shared timeline, and verifies the return measurements after work.",
  },
] as const;

const handoffs = [
  ["MQTT transport and customer UNS", "HiveMQ", "Configured MQTT/Sparkplug subscriptions, topic/session metadata, QoS, retain state", "Qualifies evidence and maps source addresses to governed operational identity", "Does not replace the broker or treat delivery as truth"],
  ["Industrial DataOps and source modeling", "HighByte Intelligence Hub", "Modeled MQTT, Sparkplug, OPC UA, REST, or approved outputs", "Preserves source references and creates SSOM-conformant records", "Representative pathway; not a validated connector claim"],
  ["SCADA/HMI and gateway execution", "Ignition", "Approved tags, alarms, events, paths, timestamps, and quality", "Connects source evidence to one Condition and outcome thread", "Does not replace visualization or supervisory control"],
  ["PLC and machine control", "Rockwell Automation", "Customer-approved equipment state and alarms through an established boundary", "Retains the source identity and operating context", "Does not alter PLC or safety logic"],
  ["Historian and operations applications", "AVEVA", "Approved history, event, asset, and status interfaces", "Preserves time, revision, lineage, and cross-system context", "Does not replace historian, engineering, or process applications"],
  ["Industrial data contextualization", "Cognite Data Fusion", "Approved assets, relationships, events, time series, quality, and history", "Adds accountable Conditions, work, and verified Outcomes", "Does not replace Cognite or claim ownership of its records"],
  ["Enterprise asset maintenance", "SAP EAM / S/4HANA Maintenance Management", "Equipment, notification, work-order, status, and responsible-party records", "Coordinates the case and separates work closure from physical recovery", "SAP remains the maintenance system of record"],
  ["Optional external work management", "Customer-selected CMMS or EAM", "Approved record creation, status, assignment, and receipt interfaces", "Carries one operating case across the optional system", "No provider is privileged, required, or a platform foundation"],
] as const;

export function EcosystemPage() {
  const description = "See what existing industrial systems retain and how Last Mile adds one governed condition-to-outcome thread across them.";
  return <>
    <SEO title="Ecosystem | Keep the Systems That Run Your Operation" description={description} canonicalPath="/ecosystem" jsonLd={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Ecosystem", path: "/ecosystem" }])} />
    <div className="lm-v2-page">
      <EditorialHero eyebrow="OPEN INDUSTRIAL ECOSYSTEM" title="Keep the systems that run your operation. Connect the accountability between them." intro="Last Mile consumes configured outputs from existing OT, data, work, facilities, and service platforms. It preserves their identities and responsibilities while creating one condition-to-outcome thread across them." primary={{ label: "Discuss Your Operational Stack", to: "/contact?intent=architecture" }} secondary={{ label: "Inspect the Platform", to: "/platform" }} />

      <EditorialSection title="Each system keeps its proper responsibility." tone="grid">
        <div className="lm-ecosystem-grid">{categories.map((category) => <article key={category.title}><h3>{category.title}</h3><p>{category.copy}</p>{"link" in category ? <InlineLink to={category.link[1]}>{category.link[0]}</InlineLink> : null}</article>)}</div>
      </EditorialSection>

      <EditorialSection eyebrow="TECHNOLOGY HANDOFFS" title="Make the boundary concrete at every interface.">
        <AccessibleDataTable caption="Representative industrial technology handoffs" headers={["Existing responsibility", "Representative systems", "Representative handoff", "What Last Mile adds", "Explicit boundary"]} rows={handoffs} />
        <p className="lm-v2-caveat">Every row is a representative integration pathway with validation status to be confirmed. Product names do not imply certification, partnership, endorsement, or completed production integration.</p>
      </EditorialSection>

      <EditorialSection eyebrow="Representative ecosystems" title="Names illustrate where the operating thread crosses—not a privileged architecture.">
        <p className="lm-v2-large-copy">Product and company names illustrate representative industrial ecosystems. Inclusion does not imply partnership, certification, or a validated production integration. Last Mile is designed to operate without requiring one automation, broker, historian, work, facilities, or service platform.</p>
        <p className="lm-v2-caveat">Every named work system remains an optional external system of record; none is a platform foundation or prerequisite.</p>
        <div className="lm-concept-links"><InlineLink to="/resources/industrial-concepts/semantic-interoperability">Connected is not yet interoperable</InlineLink><InlineLink to="/resources/industrial-concepts/opc-ua">OPC UA and Companion Specifications</InlineLink><InlineLink to="/resources/industrial-concepts/ot-security">OT security and explicit trust boundaries</InlineLink></div>
      </EditorialSection>

      <NextStep title="See how source evidence becomes one governed operating model." copy="Infinit-Signal preserves each source's evidence and authority before creating canonical operational records for Singularity." label="Explore Infinit-Signal" to="/infinit-signal" secondary={{ label: "Discuss Your Operational Stack", to: "/contact?intent=architecture" }} />
    </div>
  </>;
}
