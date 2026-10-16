import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X, Phone, Users, MessageSquare, Activity } from "lucide-react";
import { trackEvent } from "@/app/lib/analytics";
import "@/styles/shared-chrome.css";

/** Internal review chrome stays off customer-facing pages unless ?review=1 is set. */
const routesWithoutReviewChrome = new Set([
  "/",
  "/platform",
  "/infinit-signal",
  "/singularity",
  "/infinit-flow",
  "/infinit-control",
  "/how-it-works",
  "/industries",
  "/why-last-mile",
  "/our-service",
  "/about",
  "/demo",
  "/private-beta",
  "/resources",
  "/resources/architect-reference-center",
  "/resources/pmo-implementation-hub",
  "/resources/industrial-concepts",
  "/signal-to-action",
  "/company/newsroom",
  "/contact",
  "/privacy",
  "/terms",
  "/use-cases",
  "/use-cases/manufacturing-compressed-air",
  "/use-cases/data-center-cooling",
  "/use-cases/cold-storage-refrigeration",
]);

function useShowReviewChrome() {
  const { pathname, search } = useLocation();
  return !routesWithoutReviewChrome.has(pathname) || new URLSearchParams(search).get("review") === "1";
}

const platformProducts = [
  { name: "Infinit-Signal", href: "/infinit-signal", summary: "Operational data qualification" },
  { name: "Singularity", href: "/singularity", summary: "Shared operational context" },
  { name: "Infinit-Flow", href: "/infinit-flow", summary: "Governed response coordination" },
  { name: "Infinit-Control", href: "/infinit-control", summary: "Operational visibility & oversight" },
] as const;

const primaryNavigation = [
  ["How it works", "/how-it-works"],
  ["Industries", "/industries"],
  ["Why Last Mile", "/why-last-mile"],
  ["Resources", "/resources"],
] as const;

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Last Mile home">
      <img src="/logo.png" alt="" width="57" height="30" />
      <span>
        LAST MILE<span className="brand-period">.</span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [platformMenuOpen, setPlatformMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const submenuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const showReviewChrome = useShowReviewChrome();

  const isPlatformRoute =
    pathname === "/platform" ||
    platformProducts.some((product) => pathname === product.href);

  useEffect(() => {
    setOpen(false);
    setPlatformMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open && !platformMenuOpen) return;
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (open && !headerRef.current?.contains(target)) {
        setOpen(false);
      }
      if (platformMenuOpen && !dropdownRef.current?.contains(target)) {
        setPlatformMenuOpen(false);
      }
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (platformMenuOpen) {
          setPlatformMenuOpen(false);
          dropdownButtonRef.current?.focus();
        }
        if (open) {
          setOpen(false);
          menuRef.current?.focus();
        }
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [open, platformMenuOpen]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setPlatformMenuOpen(true);
      window.requestAnimationFrame(() => submenuItemRefs.current[0]?.focus());
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setPlatformMenuOpen(true);
      window.requestAnimationFrame(() =>
        submenuItemRefs.current[platformProducts.length - 1]?.focus()
      );
    }
  };

  const handleSubmenuKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = (index + 1) % platformProducts.length;
      submenuItemRefs.current[next]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = (index - 1 + platformProducts.length) % platformProducts.length;
      submenuItemRefs.current[prev]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      submenuItemRefs.current[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      submenuItemRefs.current[platformProducts.length - 1]?.focus();
    }
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {showReviewChrome && (
        <div className="concept-bar">
          <span>LAST MILE / WEBSITE CONCEPT</span>
          <span>Team design review</span>
        </div>
      )}
      <header className="header" ref={headerRef}>
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <div
            className="nav-dropdown"
            ref={dropdownRef}
            onMouseEnter={() => setPlatformMenuOpen(true)}
            onMouseLeave={() => setPlatformMenuOpen(false)}
          >
            <a
              href="/platform"
              aria-current={pathname === "/platform" ? "page" : undefined}
              style={
                isPlatformRoute && pathname !== "/platform"
                  ? { color: "var(--lm-blue-dark)" }
                  : undefined
              }
            >
              Platform
            </a>
            <button
              ref={dropdownButtonRef}
              type="button"
              className="nav-dropdown-trigger"
              aria-label="Platform products menu"
              aria-haspopup="menu"
              aria-expanded={platformMenuOpen}
              aria-controls="platform-submenu"
              onClick={() => setPlatformMenuOpen((prev) => !prev)}
              onKeyDown={handleTriggerKeyDown}
            >
              <ChevronDown size={15} aria-hidden="true" />
            </button>
            {platformMenuOpen && (
              <div
                id="platform-submenu"
                className="platform-submenu"
                role="menu"
                aria-label="Platform products"
              >
                {platformProducts.map((product, index) => (
                  <a
                    key={product.href}
                    ref={(el) => {
                      submenuItemRefs.current[index] = el;
                    }}
                    href={product.href}
                    role="menuitem"
                    aria-current={pathname === product.href ? "page" : undefined}
                    onClick={() => setPlatformMenuOpen(false)}
                    onKeyDown={(e) => handleSubmenuKeyDown(e, index)}
                  >
                    {product.name}
                    <span>{product.summary}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          {primaryNavigation.map(([name, href]) => (
            <a
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              {name}
            </a>
          ))}
        </nav>
        <a
          className="button button-small header-demo"
          href="/demo"
          onClick={() =>
            trackEvent("cta_demo_click", {
              placement: "header",
              destination: "/demo",
            })
          }
        >
          Request a demo <ArrowUpRight size={16} />
        </a>
        <button
          ref={menuRef}
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            <a
              href="/platform"
              onClick={() => setOpen(false)}
              aria-current={pathname === "/platform" ? "page" : undefined}
            >
              Platform
              <ArrowUpRight size={18} />
            </a>
            <span className="mobile-nav-group-label">Platform products</span>
            {platformProducts.map((product) => (
              <a
                key={product.href}
                href={product.href}
                className="mobile-nav-sublink"
                onClick={() => setOpen(false)}
                aria-current={pathname === product.href ? "page" : undefined}
              >
                {product.name}
                <ArrowUpRight size={16} />
              </a>
            ))}
            {primaryNavigation.map(([name, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? "page" : undefined}
              >
                {name}
                <ArrowUpRight size={18} />
              </a>
            ))}
            <a
              href="/demo"
              onClick={() => setOpen(false)}
              aria-current={pathname === "/demo" ? "page" : undefined}
            >
              Request a demo
              <ArrowUpRight size={18} />
            </a>
          </nav>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  const showReviewChrome = useShowReviewChrome();
  return (
    <>
      <footer className="site-footer wrap">
        <div className="footer-top">
          <div>
            <Brand />
            <p>
              From the first warning
              <br />
              to a proven result.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span>PLATFORM</span>
              <a href="/platform">Platform overview</a>
              <a href="/infinit-signal">Infinit-Signal</a>
              <a href="/singularity">Singularity</a>
              <a href="/infinit-flow">Infinit-Flow</a>
              <a href="/infinit-control">Infinit-Control</a>
            </div>
            <div>
              <span>EXPLORE</span>
              <a href="/how-it-works">How it works</a>
              <a href="/industries">Industries</a>
              <a href="/why-last-mile">Why Last Mile</a>
              <a href="/resources">Resources</a>
            </div>
            <div>
              <span>MEET LAST MILE</span>
              <a href="/our-service">Our service</a>
              <a href="/about">About</a>
              <a href="/private-beta">Private beta</a>
              <a href="/contact">Contact</a>
            </div>
            <div>
              <span>TAKE THE NEXT STEP</span>
              <a href="/demo">
                Request a demo <ArrowUpRight size={15} />
              </a>
              <a href="/private-beta">
                Explore the beta <ArrowUpRight size={15} />
              </a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Last Mile, Inc.</span>
          <p>Good Service Remembers...Great Service Anticipates.</p>
        </div>
      </footer>
      {showReviewChrome && (
        <div className="review-note wrap">
          <span>DESIGN REVIEW</span>
          <p>
            Click a Screenshot Placeholder for its image brief. Demo and beta
            inquiries use the existing contact integration. Development review
            mode does not send requests.
          </p>
        </div>
      )}
    </>
  );
}

export function ServiceTeaser() {
  return (
    <section
      className="service-teaser wrap"
      aria-labelledby="service-heading"
    >
      <div className="service-teaser-title">
        <p className="eyebrow">THE PEOPLE BEHIND THE PLATFORM</p>
        <h2 id="service-heading">
          Good Service Remembers...
          <br />
          <span>Great Service Anticipates.</span>
        </h2>
        <p>
          You should feel known, supported, and one step ahead. That’s the
          relationship we’re building into Last Mile from day one.
        </p>
        <a className="text-link" href="/our-service">
          Explore our service approach <ArrowRight size={18} />
        </a>
      </div>
      <div className="service-teaser-details">
        <div>
          <Users />
          <h3>People who know you.</h3>
          <p>
            Named Cloud Operations engineers who get to know your team and
            operating priorities.
          </p>
        </div>
        <div>
          <MessageSquare />
          <h3>A direct line, both ways.</h3>
          <p>Built-in chat connects your team with our operations team.</p>
        </div>
        <div>
          <Phone />
          <h3>We make the first call.</h3>
          <p>
            When Last Mile platform health checks flag an issue, we reach out
            directly.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ServiceNote({
  beta = false,
  title,
  text,
}: {
  beta?: boolean;
  title?: string;
  text?: string;
}) {
  return (
    <aside className="service-note">
      <Activity size={24} />
      <div>
        <h3>
          {title ??
            (beta
              ? "A close working relationship, from the start."
              : "Get to know the people behind the platform.")}
        </h3>
        <p>
          {text ??
            (beta
              ? "Named engineers, direct conversations, and proactive follow-through are part of the service experience we’re building."
              : "Ask us how named engineers, built-in chat, and proactive outreach will support your team.")}
        </p>
        <a className="text-link" href="/our-service">
          Our service promise <ArrowRight size={16} />
        </a>
      </div>
    </aside>
  );
}

export function PageIntro({
  label,
  title,
  accent,
  description,
  children,
}: {
  label: string;
  title: string;
  accent?: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro wrap">
      <p className="eyebrow">{label}</p>
      <h1>
        {title}
        {accent && (
          <>
            <br />
            <span>{accent}</span>
          </>
        )}
      </h1>
      <p className="page-lead">{description}</p>
      {children}
    </section>
  );
}

export function ClosingCTA({
  title = "Let’s talk about your last mile.",
  text = "Bring us one operating challenge. We’ll explore what a complete response could look like.",
  beta = false,
}: {
  title?: string;
  text?: string;
  beta?: boolean;
}) {
  return (
    <section className="closing route-closing wrap">
      <div>
        <p className="eyebrow">LET’S GO THE LAST MILE</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <a
        className="button closing-button"
        href={beta ? "/private-beta" : "/demo"}
      >
        {beta ? "Explore the private beta" : "Request a demo"}
        <ArrowUpRight size={21} />
      </a>
    </section>
  );
}
