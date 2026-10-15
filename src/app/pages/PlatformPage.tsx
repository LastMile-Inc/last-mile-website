import type { ComponentType } from "react";
import { ArrowRight, ArrowUpRight, Check, ClipboardList, Factory, LayoutDashboard, Network, RadioTower, Users, Workflow } from "lucide-react";
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
  Visual: ComponentType;
};

function ConceptCaption() {
  return <figcaption className="pf-caption">Concept illustration</figcaption>;
}

function PlatformMap() {
  return (
    <figure className="pf-map" aria-labelledby="pf-map-title">
      <p id="pf-map-title" className="pf-sr-only">How Last Mile sits between your existing systems and your team</p>
      <div className="pf-map-tier">
        <p className="pf-map-tier-label">Your existing systems</p>
        <ul className="pf-map-chips">
          <li><Factory size={18} aria-hidden="true" /> Equipment and controls</li>
          <li><ClipboardList size={18} aria-hidden="true" /> Business and maintenance software</li>
        </ul>
      </div>
      <div className="pf-map-link" aria-hidden="true" />
      <div className="pf-map-platform">
        <p className="pf-map-platform-label">Last Mile platform</p>
        <div className="pf-map-node pf-map-signal"><RadioTower size={20} aria-hidden="true" /><div><strong>Infinit-Signal</strong><span>Bring information together</span></div></div>
        <div className="pf-map-core"><Network size={22} aria-hidden="true" /><div><strong>Singularity</strong><span>Understand your operation</span><em>Shared information used across the platform</em></div></div>
        <div className="pf-map-pair">
          <div className="pf-map-node pf-map-uses"><Workflow size={20} aria-hidden="true" /><div><strong>Infinit-Flow</strong><span>Organize the work</span></div></div>
          <div className="pf-map-node pf-map-uses"><LayoutDashboard size={20} aria-hidden="true" /><div><strong>Infinit-Control</strong><span>See and manage what matters</span></div></div>
        </div>
      </div>
      <div className="pf-map-link" aria-hidden="true" />
      <div className="pf-map-tier">
        <p className="pf-map-tier-label">Your team</p>
        <ul className="pf-map-chips">
          <li><Users size={18} aria-hidden="true" /> Understand issues</li>
          <li><Check size={18} aria-hidden="true" /> Manage work</li>
        </ul>
      </div>
      <ConceptCaption />
    </figure>
  );
}

function SignalVisual() {
  return (
    <figure className="pf-visual pf-signal">
      <div className="pf-signal-grid">
        <div>
          <p className="pf-visual-label">Arriving from different systems</p>
          <ul className="pf-signal-raw">
            <li>pump2.motor_amps</li>
            <li>Pump 2 – Motor Current</li>
            <li className="is-set-aside">P2/AMPS<span>Repeated reading · set aside</span></li>
          </ul>
        </div>
        <span className="pf-signal-arrow" aria-hidden="true"><ArrowRight size={22} /></span>
        <div>
          <p className="pf-visual-label">Ready to use across Last Mile</p>
          <div className="pf-signal-record">
            <strong>Pump 2 · Motor current</strong>
            <ul>
              <li><Check size={16} aria-hidden="true" /> Source recorded</li>
              <li><Check size={16} aria-hidden="true" /> Checked for gaps and repeats</li>
              <li><Check size={16} aria-hidden="true" /> Up to date</li>
            </ul>
          </div>
        </div>
      </div>
      <ConceptCaption />
    </figure>
  );
}

function SingularityVisual() {
  return (
    <figure className="pf-visual pf-sing">
      <div className="pf-sing-grid">
        <div className="pf-sing-graph">
          <ul className="pf-sing-readings" aria-label="Readings connected to Pump 2">
            <li>Motor current</li>
            <li>Pressure</li>
          </ul>
          <div className="pf-sing-node is-selected"><span>Selected equipment</span><strong>Pump 2</strong></div>
          <p className="pf-sing-edge">supports</p>
          <div className="pf-sing-node"><span>System</span><strong>Cooling system</strong></div>
        </div>
        <div className="pf-sing-history">
          <p className="pf-visual-label">History for Pump 2</p>
          <ol>
            <li><strong>Warning</strong>Motor current dropped</li>
            <li><strong>Work</strong>Seal inspected and replaced</li>
            <li><strong>Result</strong>Readings back in expected range</li>
          </ol>
        </div>
      </div>
      <ConceptCaption />
    </figure>
  );
}

function FlowVisual() {
  const steps = [
    { title: "Issue reviewed", detail: "Shift supervisor", state: "Done" },
    { title: "Approval requested", detail: "Approved by operations manager", state: "Done" },
    { title: "Task assigned", detail: "Maintenance technician", state: "Done" },
    { title: "Progress recorded", detail: "Inspection under way", state: "In progress" },
  ];
  return (
    <figure className="pf-visual pf-flow">
      <ol className="pf-flow-steps">
        {steps.map((step) => (
          <li key={step.title} className={step.state === "Done" ? "is-done" : "is-active"}>
            <span className="pf-flow-dot" aria-hidden="true">{step.state === "Done" ? <Check size={14} /> : null}</span>
            <div><strong>{step.title}</strong><span>{step.detail}</span></div>
            <em>{step.state}</em>
          </li>
        ))}
      </ol>
      <p className="pf-flow-note">Finishing the task doesn’t prove the equipment has recovered. The team checks the readings afterward.</p>
      <ConceptCaption />
    </figure>
  );
}

function ControlVisual() {
  return (
    <figure className="pf-visual pf-control">
      <div className="pf-control-frame">
        <p className="pf-control-bar">My view · Maintenance</p>
        <div className="pf-control-body">
          <div className="pf-control-issue">
            <p className="pf-control-status">Needs attention</p>
            <strong>Pump 2 · Motor current low</strong>
            <dl>
              <div><dt>Responding</dt><dd>Maintenance technician</dd></div>
              <div><dt>Work</dt><dd>In progress</dd></div>
            </dl>
          </div>
          <div className="pf-control-chart">
            <p className="pf-visual-label">Motor current after the work</p>
            <svg viewBox="0 0 240 90" role="img" aria-label="Line showing readings returning into the shaded expected range">
              <rect x="0" y="22" width="240" height="30" className="pf-chart-band" />
              <polyline points="0,78 40,76 80,72 110,52 140,40 170,36 200,38 240,37" className="pf-chart-line" />
            </svg>
            <p className="pf-control-legend"><span aria-hidden="true" /> Expected range</p>
          </div>
        </div>
      </div>
      <figcaption className="pf-caption">Concept illustration · not a product screen</figcaption>
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
    Visual: SignalVisual,
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
    Visual: SingularityVisual,
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
    Visual: FlowVisual,
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
    Visual: ControlVisual,
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
            <h1 id="pf-hero-title">Bring your systems and your team together.</h1>
            <p className="pf-lead">Last Mile brings equipment information, AI assistance, and everyday work into one connected platform. See what needs attention, organize the response, and check the result.</p>
            <div className="pf-actions">
              <a className="button" href={demoUrl} onClick={() => trackEvent("cta_demo_click", { placement: "platform_hero", destination: demoUrl })}>Book a demo <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="text-link" href="#products">Explore the four products <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <PlatformMap />
        </section>

        <section className="pf-products" id="products" aria-labelledby="pf-products-title">
          <div className="wrap">
            <header className="pf-products-header">
              <h2 id="pf-products-title">Four products. One connected operation.</h2>
              <p>Each part has a clear job. Together, they help your team work with the same information and keep the response moving.</p>
            </header>
            {products.map(({ id, name, icon: Icon, headline, body, capabilities, href, linkLabel, Visual }) => (
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
                <Visual />
              </article>
            ))}
          </div>
        </section>

        <section className="pf-fit wrap" aria-labelledby="pf-fit-title">
          <div className="pf-fit-intro">
            <h2 id="pf-fit-title">Work with the systems you already use.</h2>
            <p>Last Mile connects information and work across your existing equipment and business software. We’ll review your systems with you to confirm the connections and starting scope.</p>
            <a className="text-link pf-fit-link" href="/resources/architect-reference-center" onClick={() => trackEvent("cta_explore_platform_click", { placement: "platform_fit", destination: "/resources/architect-reference-center" })}>Explore technical details <ArrowRight size={16} aria-hidden="true" /></a>
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
          <a className="button closing-button" href={demoUrl} onClick={() => trackEvent("cta_demo_click", { placement: "platform_closing", destination: demoUrl })}>Book a demo <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
      </main>
    </>
  );
}
