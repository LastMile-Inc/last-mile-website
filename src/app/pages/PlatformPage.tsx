import type { ComponentType } from "react";
import { ArrowRight, ArrowUpRight, Check, LayoutDashboard, Network, RadioTower, Workflow } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { trackEvent } from "@/app/lib/analytics";
import { createBreadcrumbSchema, createProductSchema } from "@/app/lib/structuredData";
import "@/styles/platform-page.css";

const demoUrl = "/demo";
const description = "Last Mile's four products bring equipment information, AI assistance, and everyday work into one platform, so teams can spot issues, organize the response, and check the result.";

type Product = {
  id: string;
  name: string;
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean | "true" }>;
  headline: string;
  body: string;
  capabilities: string[];
  href: string;
  linkLabel: string;
  imageBasename: string;
  imageAlt: string;
};

function PlatformHeroMedia() {
  return (
    <figure className="pf-hero-media">
      <picture>
        <source
          type="image/avif"
          srcSet="/images/platform/platform-inspection-team-640.avif 640w, /images/platform/platform-inspection-team-960.avif 960w, /images/platform/platform-inspection-team-1280.avif 1280w, /images/platform/platform-inspection-team-1536.avif 1536w"
          sizes="(max-width: 1020px) calc(100vw - 40px), 680px"
        />
        <source
          type="image/webp"
          srcSet="/images/platform/platform-inspection-team-640.webp 640w, /images/platform/platform-inspection-team-960.webp 960w, /images/platform/platform-inspection-team-1280.webp 1280w, /images/platform/platform-inspection-team-1536.webp 1536w"
          sizes="(max-width: 1020px) calc(100vw - 40px), 680px"
        />
        <img
          src="/images/platform/platform-inspection-team.png"
          alt="Two industrial workers in safety gear reviewing equipment information on a tablet beside plant machinery"
          width={1536}
          height={1024}
          loading="eager"
          fetchPriority="high"
        />
      </picture>
    </figure>
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

const systemFit = [
  { title: "Equipment and controls", text: "Readings, operating status, and warnings." },
  { title: "Business and maintenance systems", text: "Equipment records, work orders, and updates." },
  { title: "People and service teams", text: "Responsibilities, approvals, and progress." },
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
            <h1 id="pf-hero-title">We bring your systems and your team together.</h1>
            <p className="pf-lead">Last Mile brings equipment information, AI assistance, and everyday work into one connected platform. See what needs attention, organize the response, and check the result.</p>
            <div className="pf-actions">
              <a className="button" href={demoUrl} onClick={() => trackEvent("cta_demo_click", { placement: "platform_hero", destination: demoUrl })}>Request a demo <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="text-link" href="#products">Explore the four products <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <PlatformHeroMedia />
        </section>

        <section className="band section-space">
          <div className="wrap">
            <p className="eyebrow">THE PRODUCT FAMILY</p>
            <h2>
              Four products.
              <br />
              <span>One connected response.</span>
            </h2>
            <div className="product-family">
              <article>
                <span>01</span>
                <h3>Infinit-Signal</h3>
                <p>Reliable data from your existing systems.</p>
                <a className="text-link" href="/infinit-signal">
                  Explore Infinit-Signal <ArrowRight size={16} />
                </a>
              </article>
              <article>
                <span>02</span>
                <h3>Singularity</h3>
                <p>Understand your equipment in context.</p>
                <a className="text-link" href="/singularity">
                  Explore Singularity <ArrowRight size={16} />
                </a>
              </article>
              <article>
                <span>03</span>
                <h3>Infinit-Flow</h3>
                <p>Keep work moving across teams and systems.</p>
                <a className="text-link" href="/infinit-flow">
                  Explore Infinit-Flow <ArrowRight size={16} />
                </a>
              </article>
              <article>
                <span>04</span>
                <h3>Infinit-Control</h3>
                <p>See what needs attention and what changed.</p>
                <a className="text-link" href="/infinit-control">
                  Explore Infinit-Control <ArrowRight size={16} />
                </a>
              </article>
            </div>
            <p className="plain-note">
              We’ll discuss the right starting point for your operation in the
              demo.
            </p>
          </div>
        </section>

        <section className="pf-products" id="products" aria-labelledby="pf-products-title">
          <div className="wrap">
            <header className="pf-products-header">
              <h2 id="pf-products-title">Four products. One connected operation.</h2>
              <p>Each part has a clear job. Together, they help your team work with the same information and keep the response moving.</p>
            </header>
            {products.map(({ id, name, icon: Icon, headline, body, capabilities, href, linkLabel, imageBasename, imageAlt }) => (
              <article key={id} className="pf-product" aria-labelledby={`pf-${id}-title`}>
                <div className="pf-product-copy">
                  <p className="pf-product-name"><Icon size={20} aria-hidden="true" /> {name}</p>
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

        <section className="pf-fit wrap" aria-labelledby="pf-fit-title">
          <div className="pf-fit-intro">
            <h2 id="pf-fit-title">Work with the systems you already use.</h2>
            <p>Last Mile connects information and work across your existing equipment and business software. We’ll review your systems with you to confirm the connections and starting scope.</p>
            <a className="text-link pf-fit-link" href="/resources/industrial-concepts/uns-and-ssom" onClick={() => trackEvent("cta_explore_platform_click", { placement: "platform_fit", destination: "/resources/industrial-concepts/uns-and-ssom" })}>Explore technical details <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <ul className="pf-fit-list">
            {systemFit.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}
          </ul>
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
