import { ArrowRight } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { ConnectedResponseStrip, EditorialHero, EditorialSection, InlineLink, NextStep } from "@/app/components/NarrativeComponents";
import { IdentityCrosswalk } from "@/app/components/OperatingScenarioComponents";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";

const identitySources = ["Source tag", "MQTT topic", "OPC UA NodeId", "Historian point", "SAP equipment", "Provider record"] as const;
const outcomeStates = ["Recovery established", "Partial recovery", "Failed intervention", "Recurrence detected", "Insufficient return data"] as const;

export function SSOMPage() {
  const description = "Singularity is Last Mile's governed operational-memory and OT world-model product implementing the open SSOM semantic and evidence contract.";
  return <>
    <SEO title="Singularity | One Durable Memory for Physical Operations" description={description} canonicalPath="/singularity" jsonLd={[createProductSchema("Singularity", "/singularity", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Singularity", path: "/singularity" }])]} />
    <div className="lm-v2-page">
      <EditorialHero eyebrow="SINGULARITY · UNDERSTAND + CONNECT" title="Give the response one durable operational memory." intro="Singularity creates the operational world model connecting assets, processes, observations, Conditions, evidence, decisions, Responses, return measurements, and Outcomes across the systems and sites that each see only part of the story." support="Connected response role: turn qualified evidence into canonical identity, topology, and outcome context for the rest of the platform." primary={{ label: "Discuss Your Operational Model", to: "/contact?intent=architecture" }} secondary={{ label: "Explore the Platform", to: "/platform" }} visual={<IdentityCrosswalk />} />
      <ConnectedResponseStrip activeProduct="Singularity" intro="Singularity gives the response one durable operational memory so every downstream decision, action, and proof state resolves against the same governed context." />

      <EditorialSection title="An open semantic contract inside a governed Last Mile product." tone="grid">
        <div className="lm-v2-columns-2"><article><h3>SSOM</h3><p>The Standardized Semantic Object Model defines portable operational meaning, identity, relationships, temporal semantics, quality, evidence, provenance, conformance, and profiles.</p></article><article><h3>Singularity</h3><p>Singularity implements that contract through canonical journals, identity and topology services, current-state projections, Condition and Outcome services, evidence, replay, policy, and preserved decision history.</p></article></div>
        <InlineLink to="/resources/industrial-concepts/semantic-interoperability">Read the canonical semantic interoperability explanation</InlineLink>
      </EditorialSection>

      <EditorialSection title="One pump. Every scoped source identity. One shared operational asset.">
        <p className="lm-v2-large-copy">Source tags, MQTT topics, OPC UA NodeIds, historian points, SAP equipment, and provider records remain visible as scoped external identities. Singularity connects them to one canonical asset without erasing their source meaning or history.</p>
        <div className="lm-identity-map"><div className="lm-identity-map__sources">{identitySources.map((name) => <span key={name}>{name}</span>)}</div><ArrowRight aria-hidden="true" /><div className="lm-identity-map__resolved"><span>Canonical asset</span><strong>Cooling Loop B · CHWP-02</strong><p>Every source reference and validity period remains preserved.</p></div></div>
        <InlineLink to="/resources/industrial-concepts/digital-twins">How digital twins, AAS, and operational memory complement one another</InlineLink>
      </EditorialSection>

      <EditorialSection title="Distribution is not the same as meaning." tone="grid">
        <div className="lm-concept-comparison" role="table" aria-label="Unified Namespace and Singularity SSOM comparison">
          <div role="row"><strong role="columnheader">Unified Namespace</strong><strong role="columnheader">Singularity / SSOM</strong></div>
          <div role="row"><span>Distributes current information</span><span>Preserves governed operational memory</span></div>
          <div role="row"><span>Uses topics and source identifiers</span><span>Resolves canonical asset identity</span></div>
          <div role="row"><span>Carries payload and source metadata</span><span>Preserves quality, provenance, evidence, and lineage</span></div>
          <div role="row"><span>Exposes state changes</span><span>Connects Conditions, decisions, actions, and Outcomes</span></div>
          <div role="row"><span>Usually presents a navigable hierarchy</span><span>Represents many-to-many and time-varying relationships</span></div>
        </div>
        <p className="lm-v2-caveat">SSOM conformance and MQTT/Sparkplug compatibility are separate conformance domains.</p>
        <InlineLink to="/resources/industrial-concepts/uns-and-ssom">Read the complete UNS and SSOM explanation</InlineLink>
      </EditorialSection>

      <EditorialSection title="Remember what worked—not just what was attempted.">
        <p className="lm-v2-large-copy">Singularity preserves the difference between a recommendation, an authorized action, a work-system receipt, and a verified physical result. Required result states remain distinct and evidence-backed.</p>
        <div className="lm-result-states">{outcomeStates.map((state, index) => <article key={state}><span>{String(index + 1).padStart(2, "0")}</span><h3>{state}</h3></article>)}</div>
      </EditorialSection>

      <EditorialSection title="Inform future decisions without making consent implicit." tone="grid">
        <p className="lm-v2-large-copy">The architecture separates customer operations from cross-site learning. SSOM conformance does not grant contribution rights. Purpose, consent, minimization, transformation, provenance, retention, and model scope remain explicit, and aggregate learning cannot rewrite customer canonical facts.</p>
        <InlineLink to="/resources/industrial-concepts/data-spaces">Read about industrial data spaces and sovereign learning</InlineLink>
        <InlineLink to="/resources/industrial-concepts/industrial-ai">Read the industrial AI authority and outcome boundary</InlineLink>
      </EditorialSection>

      <NextStep title="See how governed meaning becomes coordinated response." copy="Infinit-Flow references canonical facts while preserving work, authority, timers, receipts, and the result contract." label="Explore Infinit-Flow" to="/infinit-flow" secondary={{ label: "Discuss Your Operational Model", to: "/contact?intent=architecture" }} />
    </div>
  </>;
}
