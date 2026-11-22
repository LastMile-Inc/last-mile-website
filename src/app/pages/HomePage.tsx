import { SEO } from "@/app/components/SEO";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Factory, Server, Snowflake } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs";
import { ProductViewFigure } from "@/app/components/makeover/ProductViews";
import { ServiceTeaser } from "@/app/components/makeover/SiteShell";
import { productViews } from "@/app/content/productViews";
import { trackEvent } from "@/app/lib/analytics";

const demoUrl = "/demo";
const productTourUrl = "/platform#product-tour";
const industries = [
  { name: "Manufacturing", icon: Factory, title: "Keep the line moving.", text: "When a machine shows signs of trouble, help production and maintenance see the same information, agree on the next step, and keep each other informed.", challenge: "Equipment condition · Production uptime · Clear responsibilities" },
  { name: "Data centers", icon: Server, title: "Keep cooling problems from escalating.", text: "When temperatures rise or cooling equipment needs attention, help the team see what changed, organize the response, and check that temperatures return to the expected range.", challenge: "Cooling performance · Temperature checks · Clear responsibilities" },
  { name: "Cold storage", icon: Snowflake, title: "Keep stored goods at the right temperature.", text: "When storage temperatures move outside the expected range, help the team investigate, organize the work, and check that cooling has recovered.", challenge: "Storage temperatures · Cooling equipment · Clear responsibilities" },
];

export function HomePage() {
  const [industry, setIndustry] = useState("Manufacturing");
  return <>
    <SEO title="Operational Intelligence for Industrial Teams | Last Mile" description="Last Mile connects industrial and enterprise system data and coordinates people, workflows, and authorized automation through to a verified result." canonicalPath="/" markdownPath="/index.md" />
    <main id="main" className="lm-home">
      <section className="hero wrap" aria-labelledby="home-hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="little-line" /> SOFTWARE FOR INDUSTRIAL OPERATIONS</p>
          <h1 id="home-hero-title">Run your operation <span>as one.</span></h1>
          <p className="hero-description">Last Mile brings information from your equipment and business systems into one place. It uses AI to help your team spot problems and decide what to do next. Your team can assign work, automate approved tasks, and check that the equipment is working as expected afterward.</p>
          <div className="hero-actions">
            <a className="button" href={demoUrl} onClick={() => trackEvent("cta_demo_click", { placement: "home_hero", destination: demoUrl })}>Request a demo <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="text-link" href="/platform" onClick={() => trackEvent("cta_explore_platform_click", { placement: "home_hero", destination: "/platform" })}>Explore the platform <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="industrial-image home-hero-image">
            <picture>
              <source
                srcSet="/images/home/home-chuck-hero-400.avif 400w, /images/home/home-chuck-hero-600.avif 600w, /images/home/home-chuck-hero-800.avif 800w, /images/home/home-chuck-hero-1086.avif 1086w"
                sizes="(max-width: 580px) calc(100vw - 60px), (max-width: 1020px) 420px, 448px"
                type="image/avif"
              />
              <source
                srcSet="/images/home/home-chuck-hero-400.webp 400w, /images/home/home-chuck-hero-600.webp 600w, /images/home/home-chuck-hero-800.webp 800w, /images/home/home-chuck-hero-1086.webp 1086w"
                sizes="(max-width: 580px) calc(100vw - 60px), (max-width: 1020px) 420px, 448px"
                type="image/webp"
              />
              <img
                src="/images/home/home-chuck-hero.jpg"
                alt="Chuck wearing a blue hard hat and safety glasses on a factory floor."
                width={1086}
                height={1448}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="home-response wrap" aria-labelledby="product-title">
        <div className="home-response-header">
          <p className="eyebrow"><span className="little-line" /> INSIDE LAST MILE</p>
          <h2 id="product-title">See the whole operation. Know where to look next.</h2>
          <p className="home-response-lead">Bring site status, equipment information and the right contacts into one connected view. Start with the wider operation, then look more closely at the assets that need attention.</p>
        </div>

        <ProductViewFigure view={productViews.operationsOverview} />

        <div className="home-response-links">
          <a className="button" href={demoUrl} onClick={() => trackEvent("cta_demo_click", { placement: "home_product", destination: demoUrl })}>Request a demo <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a
            href={productTourUrl}
            className="text-link"
            onClick={() => trackEvent("cta_explore_platform_click", { placement: "home_product", destination: productTourUrl })}
          >
            Explore the product views <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="industries-section" id="your-industry" aria-labelledby="industries-title">
        <div className="wrap industries-layout">
          <div>
            <p className="eyebrow">YOUR WORLD. YOUR LAST MILE.</p>
            <h2 id="industries-title">Built for the operations you’re responsible for.</h2>
            <p className="industry-intro">Keep production moving, keep cooling equipment working, and get the right people involved when something needs attention.</p>
            <a className="text-link" href="/industries">Explore your industry <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <Tabs value={industry} onValueChange={setIndustry} className="industry-tabs">
            <TabsList className="industry-list" aria-label="Industry examples">{industries.map((item) => <TabsTrigger className="industry-trigger" key={item.name} value={item.name}><item.icon size={18} aria-hidden="true" />{item.name}</TabsTrigger>)}</TabsList>
            {industries.map((item) => <TabsContent value={item.name} key={item.name} className="industry-panel"><span className="industry-icon" aria-hidden="true"><item.icon size={35} strokeWidth={1.1} /></span><h3>{item.title}</h3><p>{item.text}</p><div className="industry-challenges">{item.challenge}</div></TabsContent>)}
          </Tabs>
        </div>
      </section>

      <ServiceTeaser />

      <section className="closing wrap" aria-labelledby="closing-title">
        <div>
          <p className="eyebrow">LET’S GO THE LAST MILE</p>
          <h2 id="closing-title">Bring us the problem you’re tired of chasing.</h2>
          <p>Show us where your team loses time chasing information or getting problems resolved. We’ll show you how Last Mile could help.</p>
        </div>
        <a className="button closing-button" href={demoUrl} onClick={() => trackEvent("cta_demo_click", { placement: "home_closing", destination: demoUrl })}>Request a demo <ArrowUpRight size={16} aria-hidden="true" /></a>
      </section>
    </main>
  </>;
}
