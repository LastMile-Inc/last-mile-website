import type { ComponentType } from "react";
import { ArrowRight, ArrowUpRight, Check, LayoutDashboard, Network, RadioTower, Workflow } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { trackEvent } from "@/app/lib/analytics";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";
import "@/styles/platform-page.css";

const demoUrl = "/demo";
const description = "Last Mile's four products bring equipment information, AI assistance, and everyday work into one platform, so teams can spot issues, organize the response, and check the result.";

const protocolLogos = [
  {
    name: "OPC UA",
    href: "https://opcfoundation.org/about/opc-technologies/opc-ua/",
    src: "/images/platform/logos/opc-foundation-logo.jpg",
    alt: "OPC Foundation",
    width: 241,
    height: 88,
  },
  {
    name: "Modbus",
    href: "https://www.modbus.org/",
    src: "/images/platform/logos/modbus-logo.svg",
    alt: "Modbus",
    width: 653,
    height: 220,
  },
  {
    name: "Rockwell",
    href: "https://www.rockwellautomation.com/",
    src: "/images/platform/logos/rockwell-automation-logo.svg",
    alt: "Rockwell Automation",
    width: 1615,
    height: 378,
  },
  {
    name: "DNP3",
    href: "https://www.dnp.org/",
    src: "/images/platform/logos/dnp-logo.jpg",
    alt: "DNP",
    width: 270,
    height: 145,
  },
] as const;

type Product = {
  id: string;
  name: string;
  optional?: boolean;
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean | "true" }>;
  headline: string;
  body: string;
  capabilities: string[];
  href: string;
  linkLabel: string;
  imageBasename: string;
  imageAlt: string;
};

type OverviewProductCaption = {
  id: string;
  name: string;
  optional?: boolean;
  summary: string;
  href: string;
  cropBasename: string;
  cropWidth: number;
  cropHeight: number;
  cropAlt: string;
  cropLead?: string;
};

const overviewProducts: OverviewProductCaption[] = [
  {
    id: "infinit-signal",
    name: "Infinit-Signal",
    summary: "Reliable data from your existing systems.",
    href: "/infinit-signal",
    cropBasename: "platform-overview-crop-signal",
    cropWidth: 384,
    cropHeight: 312,
    cropAlt: "Existing plant equipment and PLC cabinets sending readings into Infinit-Signal intake and verification.",
    cropLead: "Your existing systems",
  },
  {
    id: "singularity",
    name: "Singularity",
    summary: "Understand your equipment in context.",
    href: "/singularity",
    cropBasename: "platform-overview-crop-singularity",
    cropWidth: 300,
    cropHeight: 312,
    cropAlt: "Singularity shared operational model connecting equipment, site context, and operating history.",
  },
  {
    id: "infinit-flow",
    name: "Infinit-Flow",
    optional: true,
    summary: "Keep work moving across teams and systems.",
    href: "/infinit-flow",
    cropBasename: "platform-overview-crop-flow",
    cropWidth: 192,
    cropHeight: 306,
    cropAlt: "Infinit-Flow workflow sequence showing vibration alert, approval required, work order creation, and authorized action.",
  },
  {
    id: "infinit-control",
    name: "Infinit-Control",
    summary: "See what needs attention and what changed.",
    href: "/infinit-control",
    cropBasename: "platform-overview-crop-control",
    cropWidth: 232,
    cropHeight: 376,
    cropAlt: "Operator reviewing P-101 Feed Pump operating measurements and confirmed recovery in Infinit-Control.",
  },
];

function PlatformHeroIllustration() {
  return (
    <div className="pf-hero-showcase">
      <figure className="pf-hero-figure">
        <div className="pf-hero-canvas">
          <picture>
            <source
              type="image/avif"
              srcSet="/images/platform/platform-overview-illustration-640.avif 640w, /images/platform/platform-overview-illustration-800.avif 800w, /images/platform/platform-overview-illustration-1024.avif 1024w"
              sizes="(max-width: 1150px) calc(100vw - 72px), 1300px"
            />
            <source
              type="image/webp"
              srcSet="/images/platform/platform-overview-illustration-640.webp 640w, /images/platform/platform-overview-illustration-800.webp 800w, /images/platform/platform-overview-illustration-1024.webp 1024w"
              sizes="(max-width: 1150px) calc(100vw - 72px), 1300px"
            />
            <img
              src="/images/platform/platform-overview-illustration.jpg"
              alt="Illustration of the Last Mile platform connecting existing industrial equipment through Infinit-Signal, Singularity, Infinit-Flow, and Infinit-Control to verify equipment recovery."
              width={1024}
              height={470}
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>

        <div className="pf-hero-caption-strip" aria-label="Platform components shown in the illustration">
          <div className="pf-hero-caption-cell pf-hero-caption-origin">
            <span className="pf-hero-origin-label">Your existing systems</span>
          </div>
          {overviewProducts.map(({ id, name, optional, summary, href }) => (
            <div key={id} className="pf-hero-caption-cell">
              <div className="pf-hero-caption-heading">
                <a
                  className="pf-hero-caption-title"
                  href={href}
                  onClick={() => trackEvent("cta_product_click", { placement: "platform_hero_overview", destination: href, product: name })}
                >
                  {name}
                </a>
                {optional && <span className="pf-optional-label">Optional</span>}
              </div>
              <p>{summary}</p>
              <a
                className="pf-hero-caption-link"
                href={href}
                onClick={() => trackEvent("cta_product_click", { placement: "platform_hero_overview", destination: href, product: name })}
              >
                Explore {name} <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </figure>

      <div className="pf-hero-mobile-crops" aria-label="Platform overview in four stages">
        {overviewProducts.map(({ id, name, optional, summary, href, cropBasename, cropWidth, cropHeight, cropAlt, cropLead }) => (
          <article key={id} className="pf-hero-crop-card">
            <div className="pf-hero-crop-media">
              <picture>
                <source type="image/avif" srcSet={`/images/platform/${cropBasename}.avif`} />
                <source type="image/webp" srcSet={`/images/platform/${cropBasename}.webp`} />
                <img
                  src={`/images/platform/${cropBasename}.jpg`}
                  alt={cropAlt}
                  width={cropWidth}
                  height={cropHeight}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="pf-hero-crop-body">
              {cropLead && <span className="pf-hero-crop-lead">{cropLead}</span>}
              <div className="pf-hero-caption-heading">
                <a
                  className="pf-hero-caption-title"
                  href={href}
                  onClick={() => trackEvent("cta_product_click", { placement: "platform_hero_mobile_crop", destination: href, product: name })}
                >
                  {name}
                </a>
                {optional && <span className="pf-optional-label">Optional</span>}
              </div>
              <p>{summary}</p>
              <a
                className="pf-hero-caption-link"
                href={href}
                onClick={() => trackEvent("cta_product_click", { placement: "platform_hero_mobile_crop", destination: href, product: name })}
              >
                Explore {name} <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProductIllustration({ basename, alt }: { basename: string; alt: string }) {
  return (
    <figure className="pf-visual">
      <div className="pf-visual-frame">
        <picture>
          <source
            type="image/avif"
            srcSet={`/images/platform/${basename}-640.avif 640w, /images/platform/${basename}-960.avif 960w, /images/platform/${basename}-1280.avif 1280w, /images/platform/${basename}-1448.avif 1448w`}
            sizes="(max-width: 1020px) calc(100vw - 40px), 660px"
          />
          <source
            type="image/webp"
            srcSet={`/images/platform/${basename}-640.webp 640w, /images/platform/${basename}-960.webp 960w, /images/platform/${basename}-1280.webp 1280w, /images/platform/${basename}-1448.webp 1448w`}
            sizes="(max-width: 1020px) calc(100vw - 40px), 660px"
          />
          <img
            src={`/images/platform/${basename}.png`}
            alt={alt}
            width={1448}
            height={1086}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </figure>
  );
}

const products: Product[] = [
  {
    id: "infinit-signal",
    name: "Infinit-Signal",
    icon: RadioTower,
    headline: "Bring scattered information together.",
    body: "Equipment and business systems report information in different ways. Infinit-Signal brings that information together, checks it for problems, and prepares it for use across Last Mile.",
    capabilities: ["Collect information from connected systems.", "Check for missing, repeated, or outdated readings.", "Keep track of where information came from."],
    href: "/infinit-signal",
    linkLabel: "Explore Infinit-Signal",
    imageBasename: "platform-infinit-signal",
    imageAlt: "Factory operators and equipment connected to incoming equipment readings",
  },
  {
    id: "singularity",
    name: "Singularity",
    icon: Network,
    headline: "Give every reading its place in the bigger picture.",
    body: "A reading means more when you know which equipment it belongs to, what that equipment supports, and what happened before. Singularity connects those details so people and AI can work with a shared understanding of the operation.",
    capabilities: ["Connect readings to the right equipment.", "Show how equipment and systems relate.", "Keep the history of issues, work, and results."],
    href: "/singularity",
    linkLabel: "Explore Singularity",
    imageBasename: "platform-singularity",
    imageAlt: "Water facility engineers reviewing how equipment, systems, and readings relate",
  },
  {
    id: "infinit-flow",
    name: "Infinit-Flow",
    optional: true,
    icon: Workflow,
    headline: "Turn the next step into organized work.",
    body: "Infinit-Flow helps your team assign work, get approvals, and coordinate tasks across people and systems. Approved tasks can run automatically where configured, while your team stays informed.",
    capabilities: ["Give tasks a clear owner.", "Request approval where needed.", "Automate approved tasks and track progress."],
    href: "/infinit-flow",
    linkLabel: "Explore Infinit-Flow",
    imageBasename: "platform-infinit-flow",
    imageAlt: "Field operators coordinating work across equipment and systems",
  },
  {
    id: "infinit-control",
    name: "Infinit-Control",
    icon: LayoutDashboard,
    headline: "See what needs your attention.",
    body: "Infinit-Control gives each person a view of the issues, work, and equipment that matter to their role. See who is responding, what has changed, and whether the equipment is performing as expected.",
    capabilities: ["See current issues and equipment information.", "Follow work and responsibilities.", "Review readings after the response."],
    href: "/infinit-control",
    linkLabel: "Explore Infinit-Control",
    imageBasename: "platform-infinit-control",
    imageAlt: "Oilfield technician reviewing equipment status and operational readings on a tablet",
  },
];

export function PlatformPage() {
  return (
    <>
      <SEO
        title="Last Mile Platform | Four Products, One Connected Operation"
        description={description}
        canonicalPath="/platform"
        jsonLd={[createProductSchema("Last Mile Platform", "/platform", description), createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform" }])]}
      />
      <main id="main" className="lm-platform">
        <section className="pf-hero wrap" aria-labelledby="pf-hero-title">
          <div className="pf-hero-copy">
            <p className="eyebrow"><span className="little-line" /> THE LAST MILE PLATFORM</p>
            <h1 id="pf-hero-title">Turn operational complexity into proven outcomes.</h1>
            <p className="pf-lead">Last Mile brings equipment information, AI assistance, and everyday work into one connected platform. See what needs attention, organize the response, and check the result.</p>
            <div className="pf-actions">
              <a className="button" href={demoUrl} onClick={() => trackEvent("cta_demo_click", { placement: "platform_hero", destination: demoUrl })}>Request a demo <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="text-link" href="#products">Explore the four products <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <PlatformHeroIllustration />
        </section>

        <section className="pf-products" id="products" aria-labelledby="pf-products-title">
          <div className="wrap">
            <header className="pf-products-header">
              <h2 id="pf-products-title">
                Four products.<br />
                One connected operation.
              </h2>
            </header>
            {products.map(({ id, name, optional, icon: Icon, headline, body, capabilities, href, linkLabel, imageBasename, imageAlt }) => (
              <article key={id} className="pf-product" aria-labelledby={`pf-${id}-title`}>
                <div className="pf-product-copy">
                  <p className="pf-product-name">
                    <Icon size={20} aria-hidden="true" />
                    <span>{name}</span>
                    {optional && <span className="pf-optional-label">Optional</span>}
                  </p>
                  <h3 id={`pf-${id}-title`}>{headline}</h3>
                  <p>{body}</p>
                  <ul className="pf-capabilities">
                    {capabilities.map((capability) => <li key={capability}><Check size={16} aria-hidden="true" />{capability}</li>)}
                  </ul>
                  <a className="text-link" href={href} onClick={() => trackEvent("cta_product_click", { placement: "platform_products", destination: href, product: name })}>{linkLabel} <ArrowRight size={17} aria-hidden="true" /></a>
                </div>
                <ProductIllustration basename={imageBasename} alt={imageAlt} />
              </article>
            ))}
          </div>
        </section>

        <section className="pf-operation" id="built-for-your-operation" aria-labelledby="pf-operation-title">
          <div className="wrap">
            <header className="pf-operation-header">
              <p className="eyebrow"><span className="little-line" /> BUILT TO FIT YOUR OPERATION</p>
              <h2 id="pf-operation-title">Your systems. Your standards. We’ve got you.</h2>
              <p className="pf-operation-intro">
                You’ve invested in the equipment, software and standards that keep your business running. Last Mile builds on that foundation—connecting your existing systems, preserving the context your team relies on, and making operational information easier to use.
              </p>
            </header>

            <div className="pf-operation-grid">
              <article className="pf-op-panel">
                <div className="pf-op-visual pf-op-visual-logos">
                  <div className="pf-logo-row" aria-label="OPC UA, Modbus, Rockwell, and DNP3">
                    {protocolLogos.map((logo) => (
                      <a
                        key={logo.name}
                        className="pf-tech-logo-link"
                        href={logo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${logo.name} (opens in a new tab)`}
                      >
                        <img
                          className={`pf-partner-logo pf-partner-logo-${logo.name.toLowerCase().replace(/\s+/g, "-")}`}
                          src={logo.src}
                          alt={logo.alt}
                          width={logo.width}
                          height={logo.height}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    ))}
                  </div>
                </div>
                <h3>We speak your language.</h3>
                <p>
                  Your operation runs on technologies chosen for a reason. Last Mile connects to PLCs and industrial systems through supported{" "}
                  <a
                    className="pf-inline-link"
                    href="https://opcfoundation.org/about/opc-technologies/opc-ua/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="OPC UA specification at OPC Foundation (opens in a new tab)"
                  >
                    OPC UA
                  </a>
                  ,{" "}
                  <a
                    className="pf-inline-link"
                    href="https://www.modbus.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Modbus Organization official site (opens in a new tab)"
                  >
                    Modbus
                  </a>{" "}
                  and{" "}
                  <a
                    className="pf-inline-link"
                    href="https://www.dnp.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="DNP3 Users Group official site (opens in a new tab)"
                  >
                    DNP3
                  </a>{" "}
                  connections, bringing equipment information into a shared operational view.
                </p>
                <div className="pf-protocol-chips" aria-label="Supported industrial equipment category and protocols">
                  <span className="pf-protocol-chip pf-protocol-chip-static">PLCs</span>
                  <a
                    className="pf-protocol-chip pf-protocol-chip-link"
                    href="https://opcfoundation.org/about/opc-technologies/opc-ua/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="OPC UA specification at OPC Foundation (opens in a new tab)"
                  >
                    OPC UA
                  </a>
                  <a
                    className="pf-protocol-chip pf-protocol-chip-link"
                    href="https://www.modbus.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Modbus Organization official site (opens in a new tab)"
                  >
                    Modbus
                  </a>
                  <a
                    className="pf-protocol-chip pf-protocol-chip-link"
                    href="https://www.dnp.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="DNP3 Users Group official site (opens in a new tab)"
                  >
                    DNP3
                  </a>
                </div>
                <a
                  className="text-link pf-operation-link"
                  href="/infinit-signal"
                  onClick={() => trackEvent("cta_product_click", { placement: "platform_operation_signal", destination: "/infinit-signal", product: "Infinit-Signal" })}
                >
                  Explore Infinit-Signal <ArrowRight size={16} aria-hidden="true" />
                </a>
              </article>

              <article className="pf-op-panel">
                <div className="pf-op-visual pf-op-visual-logos">
                  <a
                    className="pf-tech-logo-link"
                    href="https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ISA-95 standard at the International Society of Automation (opens in a new tab)"
                  >
                    <img
                      className="pf-partner-logo pf-partner-logo-isa"
                      src="/images/platform/logos/isa-logo.svg"
                      alt="International Society of Automation"
                      width={565}
                      height={76}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
                <h3>Your names matter. Your context stays.</h3>
                <p>
                  Your team has invested time in naming equipment and organizing how your operation fits together. If you already use a Unified Namespace (UNS), Last Mile preserves those names and relationships as it maps your information into an{" "}
                  <a
                    className="pf-inline-link"
                    href="https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ISA-95 standard at the International Society of Automation (opens in a new tab)"
                  >
                    ISA-95
                  </a>
                  -aligned operational model.
                </p>
                <a
                  className="text-link pf-operation-link"
                  href="/singularity"
                  onClick={() => trackEvent("cta_product_click", { placement: "platform_operation_singularity", destination: "/singularity", product: "Singularity" })}
                >
                  Explore Singularity <ArrowRight size={16} aria-hidden="true" />
                </a>
              </article>

              <article className="pf-op-panel">
                <div className="pf-op-visual">
                  <a
                    className="pf-tech-logo-link"
                    href="https://n8n.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit n8n (opens in a new tab)"
                  >
                    <img
                      className="pf-tech-logo pf-tech-logo-n8n"
                      src="/images/platform/logos/n8n-logo-dark.svg"
                      alt="n8n"
                      width={296}
                      height={80}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
                <h3>Keep work moving with Infinit-Flow.</h3>
                <p>
                  Infinit-Flow uses embedded n8n technology to coordinate work across your people and systems. Add it when you want Last Mile to organize workflows, approvals and automated tasks.
                </p>
                <p className="pf-op-supporting pf-op-emphasis">
                  Infinit-Flow is an optional addition to the Last Mile platform.
                </p>
                <a
                  className="text-link pf-operation-link"
                  href="/infinit-flow"
                  onClick={() => trackEvent("cta_product_click", { placement: "platform_operation_flow", destination: "/infinit-flow", product: "Infinit-Flow" })}
                >
                  Explore Infinit-Flow <ArrowRight size={16} aria-hidden="true" />
                </a>
              </article>

              <article className="pf-op-panel">
                <div className="pf-op-visual">
                  <a
                    className="pf-tech-logo-link"
                    href="https://opentelemetry.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit OpenTelemetry (opens in a new tab)"
                  >
                    <img
                      className="pf-tech-logo pf-tech-logo-otel"
                      src="/images/platform/logos/opentelemetry-horizontal-color.svg"
                      alt="OpenTelemetry"
                      width={256}
                      height={96}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
                <h3>Visibility into the service you rely on.</h3>
                <p>
                  Last Mile uses OpenTelemetry to collect metrics, logs and traces from its cloud services, helping our team monitor performance and investigate problems.
                </p>
                <p className="pf-op-supporting pf-op-emphasis">
                  Platform monitoring is part of how we operate Last Mile.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="closing wrap pf-closing" aria-labelledby="pf-closing-title">
          <div>
            <h2 id="pf-closing-title">See how Last Mile could work in your operation.</h2>
            <p>Bring one problem your team spends too much time chasing. We’ll walk through the platform and discuss how it could fit your equipment, systems, and people.</p>
          </div>
          <a className="button closing-button" href={demoUrl} onClick={() => trackEvent("cta_demo_click", { placement: "platform_closing", destination: demoUrl })}>Request a demo <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
      </main>
    </>
  );
}
