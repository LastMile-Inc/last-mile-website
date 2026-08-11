import { SEO } from "@/app/components/SEO";
import { EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import { EvidenceEnvelope } from "@/app/components/OperatingScenarioComponents";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

const pipeline = [
  {
    title: "What enters",
    items: [
      "MQTT and customer UNS subscriptions",
      "Sparkplug and OPC UA",
      "SCADA, BMS, and MES outputs",
      "Historians and industrial data platforms",
      "APIs, files, and service-system records",
    ],
  },
  {
    title: "What is checked",
    items: [
      "Source authority, schema, and evidence integrity",
      "Event time, receive time, freshness, and quality",
      "Units, retained-message context, duplication, and replay",
      "Asset mapping, policy, and destination eligibility",
    ],
  },
  {
    title: "What leaves",
    items: [
      "SSOM-conformant canonical operational records",
      "Original source identity, time, quality, and mapping version",
      "Lineage and evidence references accepted once for Singularity",
      "Explicit quarantine or rejection evidence when acceptance fails",
    ],
  },
] as const;

const qualityStates = ["Accepted", "Warning", "Quarantined", "Rejected", "Duplicate", "Replay / backfill"] as const;

export function InfinitSignalPage() {
  const description = "Infinit-Signal preserves and qualifies configured industrial evidence before creating SSOM-conformant canonical operational records for Singularity.";
  return <>
    <SEO title="Infinit-Signal | Know Which Industrial Evidence Is Fit to Act On" description={description} canonicalPath="/infinit-signal" jsonLd={[createProductSchema("Infinit-Signal", "/infinit-signal", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Infinit-Signal", path: "/infinit-signal" }])]} />
    <div className="lm-v2-page">
      <EditorialHero eyebrow="INFINIT-SIGNAL · OBSERVE" title="Know what actually happened—and which evidence is fit to act on." intro="Infinit-Signal continuously acquires configured outputs from the systems you already operate, preserves their original evidence, and classifies time, quality, duplication, replay, and identity before data enters the Last Mile operating model." primary={{ label: "Discuss Your Source Environment", to: "/contact?intent=architecture" }} secondary={{ label: "See the Cooling Use Case", to: "/use-cases/data-center-cooling" }} visual={<EvidenceEnvelope />} />

      <EditorialSection title="What enters. What is checked. What leaves." tone="grid">
        <div className="lm-pipeline">{pipeline.map((stage) => <article key={stage.title}><h3>{stage.title}</h3><ul className="lm-v2-list">{stage.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
        <p className="lm-v2-caveat">Source families and named products are representative architecture patterns, not claims of certified or validated production integrations.</p>
        <InlineLink to="/resources/industrial-concepts/opc-ua">How OPC UA and Companion Specification source meaning is preserved</InlineLink>
      </EditorialSection>

      <EditorialSection eyebrow="UNIFIED NAMESPACE" title="Keep the real-time fabric. Add the operational contract.">
        <p className="lm-v2-large-copy">A Unified Namespace makes current operational information discoverable and available across systems. Infinit-Signal consumes configured UNS subscriptions while preserving the original publisher, topic, timestamp, quality, QoS, retained-message flag, and session context. It then classifies freshness, duplicates, replay, and unresolved assets before the information enters Singularity.</p>
        <div className="lm-v2-note"><span>Boundary</span><h3>The UNS remains the customer&apos;s communication and discovery fabric.</h3><p>Singularity&apos;s SSOM contract supplies canonical identity, relationships, evidence, provenance, history, and lifecycle continuity. A topic path remains a source address—it does not automatically become the identity of the asset. MQTT is not synonymous with a UNS, and broker publication does not automatically constitute accepted operational truth.</p></div>
        <InlineLink to="/resources/industrial-concepts/uns-and-ssom">Read: UNS and SSOM—moving industrial data is not the same as making it accountable</InlineLink>
      </EditorialSection>

      <EditorialSection title="Preserve what arrived. Make every acceptance decision visible." tone="grid">
        <p className="lm-v2-large-copy">Accepted, warning, quarantined, rejected, duplicate, and replayed records retain reason codes and evidence. A stale or unresolved value may remain available for diagnosis without being allowed to influence a live Condition or verified Outcome.</p>
        <div className="lm-signal-states">{qualityStates.map((state, index) => <article key={state}><span>{String(index + 1).padStart(2, "0")}</span><h3>{state}</h3></article>)}</div>
      </EditorialSection>

      <EditorialSection title="Software-defined at the customer boundary.">
        <p className="lm-v2-large-copy">Where customer architecture requires local collection or store-and-forward, Infinit-Signal is designed to run as customer-approved software on a VM, container, Kubernetes/OpenShift environment, private cloud, or existing edge compute. Last Mile does not require proprietary hardware.</p>
      </EditorialSection>

      <NextStep title="Turn source data into governed operational evidence." copy="See how Singularity gives qualified records durable identity, meaning, evidence, and history." label="Explore Singularity" to="/singularity" secondary={{ label: "Discuss Your Source Environment", to: "/contact?intent=architecture" }} />
    </div>
  </>;
}
