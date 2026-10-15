
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { ArrowRight, ArrowUpRight, Menu, X, Phone, Users, MessageSquare, Activity } from "lucide-react";
import { trackEvent } from "@/app/lib/analytics";

/** Internal review chrome stays off the customer-facing homepage unless ?review=1 is set; other routes keep the baseline review labels. */
function useShowReviewChrome() {
  const { pathname, search } = useLocation();
  return pathname !== "/" || new URLSearchParams(search).get("review") === "1";
}

const navigation = [["How it works", "/how-it-works"], ["Industries", "/industries"], ["Why Last Mile", "/why-last-mile"], ["Our service", "/our-service"], ["Private beta", "/private-beta"]];

export function Brand() {
  return <a className="brand" href="/" aria-label="Last Mile home"><img src="/logo.png" alt="" width="57" height="30" /><span>LAST MILE<span className="brand-period">.</span></span></a>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const showReviewChrome = useShowReviewChrome();
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setOpen(false); };
    const closeEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuRef.current?.focus(); } };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", closeEscape); };
  }, [open]);
  return <><a href="#main" className="skip-link">Skip to content</a>{showReviewChrome && <div className="concept-bar"><span>LAST MILE / WEBSITE CONCEPT</span><span>Team design review</span></div>}<header className="header" ref={headerRef}><Brand /><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([name, href]) => <a key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{name}</a>)}</nav><a className="button button-small header-demo" href="/demo" onClick={() => trackEvent("cta_demo_click", { placement: "header", destination: "/demo" })}>Book a demo <ArrowUpRight size={16}/></a><button ref={menuRef} className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[...navigation, ["About Last Mile", "/about"], ["Book a demo", "/demo"]].map(([name, href]) => <a key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? "page" : undefined}>{name}<ArrowUpRight size={18}/></a>)}</nav>}</header></>;
}

export function SiteFooter() {
  const showReviewChrome = useShowReviewChrome();
  return <><footer className="site-footer wrap"><div className="footer-top"><div><Brand /><p>From the first warning<br/>to a proven result.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="/how-it-works">How it works</a><a href="/industries">Industries</a><a href="/why-last-mile">Why Last Mile</a><a href="/platform">Platform details</a><a href="/resources">Resources</a></div><div><span>MEET LAST MILE</span><a href="/our-service">Our service promise</a><a href="/about">About us</a><a href="/private-beta">Private Beta Release</a></div><div><span>TAKE THE NEXT STEP</span><a href="/demo">Book a demo <ArrowUpRight size={15}/></a><a href="/private-beta">Explore the beta <ArrowUpRight size={15}/></a><a href="/contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Last Mile, Inc.</span><p>Good Service Remembers...Great Service Anticipates.</p></div></footer>{showReviewChrome && <div className="review-note wrap"><span>DESIGN REVIEW</span><p>Click a Screenshot Placeholder for its image brief. Demo and beta inquiries use the existing contact integration. Development review mode does not send requests.</p></div>}</>;
}

export function ServiceTeaser() {
  return <section className="service-teaser wrap" aria-labelledby="service-heading"><div className="service-teaser-title"><p className="eyebrow">THE PEOPLE BEHIND THE PLATFORM</p><h2 id="service-heading">Good Service Remembers...<br/><span>Great Service Anticipates.</span></h2><p>You should feel known, supported, and one step ahead. That’s the relationship we’re building into Last Mile from day one.</p><a className="text-link" href="/our-service">Explore our service approach <ArrowRight size={18}/></a></div><div className="service-teaser-details"><div><Users/><h3>People who know you.</h3><p>Named Cloud Operations engineers who get to know your team and operating priorities.</p></div><div><MessageSquare/><h3>A direct line, both ways.</h3><p>Built-in chat connects your team with our operations team.</p></div><div><Phone/><h3>We make the first call.</h3><p>When Last Mile platform health checks flag an issue, we reach out directly.</p></div></div></section>;
}

export function ServiceNote({beta = false, title, text}: {beta?: boolean; title?: string; text?: string}) {
  return <aside className="service-note"><Activity size={24}/><div><h3>{title ?? (beta ? "A close working relationship, from the start." : "Get to know the people behind the platform.")}</h3><p>{text ?? (beta ? "Named engineers, direct conversations, and proactive follow-through are part of the service experience we’re building." : "Ask us how named engineers, built-in chat, and proactive outreach will support your team.")}</p><a className="text-link" href="/our-service">Our service promise <ArrowRight size={16}/></a></div></aside>;
}

export function PageIntro({label, title, accent, description, children}: {label: string; title: string; accent?: string; description: string; children?: React.ReactNode}) {
  return <section className="page-intro wrap"><p className="eyebrow">{label}</p><h1>{title}{accent && <><br/><span>{accent}</span></>}</h1><p className="page-lead">{description}</p>{children}</section>;
}

export function ClosingCTA({title = "Let’s talk about your last mile.", text = "Bring us one operating challenge. We’ll explore what a complete response could look like.", beta = false}: {title?: string; text?: string; beta?: boolean}) {
  return <section className="closing route-closing wrap"><div><p className="eyebrow">LET’S GO THE LAST MILE</p><h2>{title}</h2><p>{text}</p></div><a className="button closing-button" href={beta ? "/private-beta" : "/demo"}>{beta ? "Explore the private beta" : "Book your demo"}<ArrowUpRight size={21}/></a></section>;
}
