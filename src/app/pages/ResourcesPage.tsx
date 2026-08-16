import { ArrowRight, BookOpen, Headphones, Rss, ShieldCheck } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { CtaLink } from "@/app/components/MarketingComponents";
import { TrackedAnchor, TrackedLink } from "@/app/components/TrackedLink";
import { createBreadcrumbSchema } from "@/app/lib/structuredData";

const conceptBriefs = [
  {
    label: "UNS + SSOM",
    title: "Moving data is not the same as making it accountable.",
    copy: "The customer Unified Namespace remains the real-time communication and discovery fabric. Infinit-Signal preserves that source context, while the Standardized Semantic Object Model gives Singularity durable identity, meaning, evidence, and history.",
    to: "/resources/industrial-concepts/uns-and-ssom",
    link: "Read the UNS and SSOM brief",
  },
  {
    label: "Semantic interoperability",
    title: "Connected is not yet interoperable.",
    copy: "A value still needs an asset identity, unit, time basis, quality state, source authority, and relationship to the operation. Last Mile keeps the source model visible while connecting it to shared operating context.",
    to: "/resources/industrial-concepts/semantic-interoperability",
    link: "Read the interoperability brief",
  },
  {
    label: "Open protocols",
    title: "Keep the meaning that came with the source.",
    copy: "Configured OPC UA, Modbus, BACnet, MQTT, and Sparkplug sources can enter through governed profiles or customer-approved adapters. Naming the source family does not imply a certified connector.",
    to: "/resources/industrial-concepts/opc-ua",
    link: "Read the OPC UA brief",
  },
] as const;

const engineeringProofs = [
  {
    icon: BookOpen,
    eyebrow: "Declared workload profile",
    title: "Inspect the load the intake must carry.",
    copy: "Sustained rate, bursts, payload size, source concurrency, recovery, and store-and-forward behavior are tested as an explicit deployment profile.",
    evidence: "Sustained · burst · payload · concurrency · recovery",
    to: "/infinit-signal",
    link: "Inspect Infinit-Signal",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Governed security controls",
    title: "Connect without flattening the OT boundary.",
    copy: "Tenant isolation, workload identity, encryption, audit, policy, least privilege, and segmentation-aware deployment govern access without pretending plant networks are ordinary IT.",
    evidence: "Identity · policy · encryption · audit · safe degradation",
    to: "/resources/industrial-concepts/ot-security",
    link: "Read the OT security brief",
  },
  {
    icon: ArrowRight,
    eyebrow: "Cooling redundancy reference",
    title: "Work closure is not the recovery test.",
    copy: "The governed cooling reference keeps pump state, motor current, differential pressure, rack temperature, and the stability window visible after work is complete.",
    evidence: "Status · current · pressure · temperature · 15-minute stability",
    to: "/use-cases/data-center-cooling",
    link: "Inspect the cooling reference",
  },
] as const;

const waveform = [18, 38, 26, 54, 42, 72, 34, 62, 48, 84, 44, 68, 30, 58, 76, 40, 64, 28, 52, 36, 70, 46, 82, 32, 60, 24, 48, 66, 38, 56, 30, 44];

export function ResourcesPage() {
  const description = "Technical briefs, Signal 2 Action conversations, engineering proof, and historical context for accountable physical operations.";

  return (
    <>
      <SEO
        title="The Intelligence Hub for Physical Operations | Last Mile"
        description={description}
        canonicalPath="/resources"
        jsonLd={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }])}
      />

      <main className="lm-v2-page lm-resources-hub">
        <header className="lm-resources-hero" aria-labelledby="resources-heading">
          <div className="lm-v2-container lm-resources-hero__layout">
            <div className="lm-resources-hero__copy">
              <p className="lm-eyebrow">Resources</p>
              <h1 id="resources-heading">The Intelligence Hub for Physical Operations</h1>
              <p>
                Industrial teams do not need more IIoT hype. They need clear explanations of how source data keeps its meaning, how operating context survives system boundaries, and how work is tied back to the physical result. This hub collects the Last Mile conversations, architecture briefs, and reference work that address those questions directly.
              </p>
              <div className="lm-actions">
                <TrackedLink to="/signal-to-action" eventName="cta_podcast_click" className="lm-button lm-button--primary"><span>Explore Signal 2 Action</span><ArrowRight aria-hidden="true" /></TrackedLink>
                <CtaLink to="/resources/industrial-concepts" variant="secondary" eventName="cta_explore_platform_click">Read Industrial Concepts</CtaLink>
              </div>
            </div>

            <figure className="lm-resources-hero__visual">
              <img
                src="/images/resources/intelligence-hub-hero-v1.png"
                alt="Industrial utility equipment intersected by a precise source and relationship schematic"
                fetchPriority="high"
              />
              <figcaption>Physical equipment first. Architecture that preserves what the signals mean.</figcaption>
            </figure>
          </div>
        </header>

        <section className="lm-resources-podcast" aria-labelledby="resources-podcast-heading">
          <div className="lm-v2-container">
            <div className="lm-resources-section-heading">
              <div>
                <p className="lm-eyebrow">Featured Editorial Property</p>
                <h2 id="resources-podcast-heading">Signal 2 Action</h2>
              </div>
              <p>
                Conversations with operators, engineers, integrators, builders, and enterprise leaders about signal trust, authority, workflow design, governed automation, and the measurements that show whether the operation recovered.
              </p>
            </div>

            <article className="lm-resources-player">
              <div className="lm-resources-player__cover">
                <img src="/signal_2_action.jpg" alt="Official Signal 2 Action podcast cover art" loading="lazy" />
              </div>

              <div className="lm-resources-player__console">
                <div className="lm-resources-player__status">
                  <span><Headphones aria-hidden="true" /> Last Mile original series</span>
                  <small>Operational intelligence in practice</small>
                </div>
                <h3>The conversation starts where the signal becomes work.</h3>
                <p>
                  What makes a reading trustworthy? When should automation act? When must a person decide? Each discussion stays with the real operating response instead of stopping at the technology trend.
                </p>
                <div className="lm-resources-waveform" aria-hidden="true">
                  {waveform.map((height, index) => <span key={index} style={{ "--wave-height": `${height}%` } as React.CSSProperties} />)}
                </div>
                <div className="lm-resources-player__actions">
                  <TrackedLink to="/signal-to-action" eventName="cta_podcast_click">
                    Open Signal 2 Action <ArrowRight aria-hidden="true" />
                  </TrackedLink>
                  <TrackedAnchor href="/podcast-feed.xml" eventName="podcast_subscribe_click">
                    <Rss aria-hidden="true" /> Subscribe by RSS
                  </TrackedAnchor>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="lm-resources-concepts" aria-labelledby="resources-concepts-heading">
          <div className="lm-v2-container">
            <div className="lm-resources-concepts__layout">
              <div className="lm-resources-concepts__lead">
                <p className="lm-eyebrow">The New Industrial Architecture</p>
                <h2 id="resources-concepts-heading">Standards matter most at the handoff.</h2>
                <p>
                  Protocols can move values. A Unified Namespace can make current information easier to find. The harder job is preserving identity, time, quality, lineage, and authority as that information crosses systems and becomes part of an operating decision.
                </p>
                <figure>
                  <img
                    src="/images/resources/semantic-architecture-v1.png"
                    alt="Industrial source information progressing into an organized network of assets, relationships, and operating history"
                    loading="lazy"
                  />
                </figure>
              </div>

              <div className="lm-resources-concepts__briefs">
                {conceptBriefs.map((brief) => (
                  <article key={brief.label}>
                    <span>{brief.label}</span>
                    <h3>{brief.title}</h3>
                    <p>{brief.copy}</p>
                    <TrackedLink to={brief.to} eventName="cta_explore_platform_click">
                      {brief.link} <ArrowRight aria-hidden="true" />
                    </TrackedLink>
                  </article>
                ))}
                <TrackedLink className="lm-resources-concepts__all" to="/resources/industrial-concepts" eventName="cta_explore_platform_click">
                  Explore all Industrial Concepts <ArrowRight aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section className="lm-resources-proof" aria-labelledby="resources-proof-heading">
          <div className="lm-v2-container">
            <div className="lm-resources-section-heading">
              <div>
                <p className="lm-eyebrow">Engineering and Proof</p>
                <h2 id="resources-proof-heading">Show the architecture. Show the test.</h2>
              </div>
              <p>
                Open the architecture, test profile, or operating reference behind each claim. Targets stay labeled as targets until repeatable benchmark evidence is approved.
              </p>
            </div>

            <div className="lm-resources-proof__visual">
              <figure>
                <img
                  src="/images/resources/protocol-proof-v1.png"
                  alt="Industrial controllers, drives, and sensors feeding a governed qualification core and source-linked records"
                  loading="lazy"
                />
              </figure>
              <div className="lm-resources-proof__path" aria-label="Configured source-to-record path">
                <span>Configured sources</span>
                <b aria-hidden="true" />
                <span>Preserve</span>
                <b aria-hidden="true" />
                <span>Qualify</span>
                <b aria-hidden="true" />
                <span>Map</span>
                <b aria-hidden="true" />
                <span>Source-linked record</span>
              </div>
            </div>

            <div className="lm-resources-proof__ledger">
              {engineeringProofs.map(({ icon: Icon, ...proof }) => (
                <article key={proof.title}>
                  <div className="lm-resources-proof__icon"><Icon aria-hidden="true" /></div>
                  <p className="lm-eyebrow">{proof.eyebrow}</p>
                  <h3>{proof.title}</h3>
                  <p>{proof.copy}</p>
                  <strong>{proof.evidence}</strong>
                  <TrackedLink to={proof.to} eventName="cta_explore_platform_click">
                    {proof.link} <ArrowRight aria-hidden="true" />
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lm-resources-archive" aria-labelledby="resources-archive-heading">
          <div className="lm-v2-container">
            <div className="lm-resources-archive__header">
              <div>
                <p className="lm-eyebrow">Historical Context &amp; Archives</p>
                <h2 id="resources-archive-heading">The public record remains available.</h2>
              </div>
              <p>
                Prior ServiceNow chapters, Knowledge Conference material, and older company updates are preserved for continuity. They are historical records, not evidence of the current independent Last Mile Platform.
              </p>
            </div>

            <nav className="lm-resources-archive__links" aria-label="Historical Last Mile resources">
              <TrackedLink to="/signal-to-action#latest-episode" eventName="cta_podcast_click">
                <span>Podcast archive</span><strong>Prior chapters and Knowledge Conference conversations</strong><ArrowRight aria-hidden="true" />
              </TrackedLink>
              <TrackedLink to="/company/newsroom" eventName="cta_explore_platform_click">
                <span>Company newsroom</span><strong>Historical releases and corporate updates</strong><ArrowRight aria-hidden="true" />
              </TrackedLink>
            </nav>

            <div className="lm-resources-subscribe">
              <div>
                <p className="lm-eyebrow">Stay With the Work</p>
                <h2>Subscribe to our architectural briefs and podcast.</h2>
              </div>
              <div className="lm-resources-subscribe__actions">
                <TrackedAnchor href="/podcast-feed.xml" eventName="podcast_subscribe_click" className="lm-button lm-button--primary">
                  <Rss aria-hidden="true" /> Subscribe to the Podcast
                </TrackedAnchor>
                <CtaLink to="/contact?intent=architecture" variant="secondary">Request Architecture Briefs</CtaLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
