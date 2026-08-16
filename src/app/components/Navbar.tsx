import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";

const products = [
  ["/infinit-signal", "Infinit-Signal · Capture"],
  ["/singularity", "Singularity · Remember"],
  ["/infinit-flow", "Infinit-Flow · Coordinate"],
  ["/infinit-control", "Infinit-Control · Observe"],
] as const;

const explore = [
  ["/resources", "Engineering Briefs"],
  ["/use-cases", "Reference Architectures"],
  ["/use-cases/data-center-cooling", "Cooling Redundancy Proof"],
  ["/resources/industrial-concepts", "Industrial Concepts"],
  ["/ecosystem", "Ecosystem Integrations"],
  ["/signal-to-action", "Signal 2 Action"],
] as const;

type MenuItems = readonly (readonly [string, string])[];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const active = (to: string) => location.pathname === to;

  useEffect(() => { setMobileOpen(false); setOpenMenu(null); }, [location.pathname]);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => { if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null); };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <nav ref={navRef} className="lm-nav" aria-label="Primary navigation" onMouseLeave={() => setOpenMenu(null)} onKeyDown={(event) => { if (event.key === "Escape" && mobileOpen) { event.preventDefault(); setMobileOpen(false); window.requestAnimationFrame(() => mobileToggleRef.current?.focus()); } }}>
      <div className="lm-nav__inner">
        <Link to="/" className="lm-nav__brand">
          <span className="lm-nav__brand-name"><img src="/logo.png" width="64" height="41" alt="" /><strong><span>Last</span> <span>Mile</span></strong></span>
          <em>The Physical Operations Platform</em>
        </Link>
        <div className="lm-nav__links">
          <NavLink to="/" label="Home" active={active("/")} />
          <NavLink to="/platform" label="Platform" active={active("/platform")} />
          <Dropdown id="products" label="Products" active={products.some(([to]) => active(to))} open={openMenu === "products"} setOpen={(open) => setOpenMenu(open ? "products" : null)} items={products} isActive={active} />
          <NavLink to="/use-cases" label="Use Cases" active={location.pathname.startsWith("/use-cases")} />
          <Dropdown id="explore" label="Explore" active={explore.some(([to]) => active(to)) || location.pathname.startsWith("/resources/")} open={openMenu === "explore"} setOpen={(open) => setOpenMenu(open ? "explore" : null)} items={explore} isActive={active} />
          <NavLink to="/about" label="About" active={active("/about")} />
        </div>
        <Link to="/contact?intent=architecture" className="lm-nav__cta">Assess Your Operations Loop</Link>
        <button ref={mobileToggleRef} type="button" className="lm-nav__toggle" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="primary-mobile-menu" onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        {mobileOpen ? <div id="primary-mobile-menu" className="lm-nav__mobile">
          <NavLink to="/" label="Home" active={active("/")} /><NavLink to="/platform" label="Platform" active={active("/platform")} />
          <MobileGroup label="Products" items={products} isActive={active} />
          <NavLink to="/use-cases" label="Use Cases" active={location.pathname.startsWith("/use-cases")} />
          <MobileGroup label="Explore" items={explore} isActive={active} />
          <NavLink to="/about" label="About" active={active("/about")} /><NavLink to="/contact?intent=architecture" label="Assess Your Operations Loop" active={active("/contact")} />
        </div> : null}
      </div>
    </nav>
  );
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return <div className="lm-nav__item"><Link to={to} aria-current={active ? "page" : undefined} className={active ? "is-active" : ""}>{label}</Link></div>;
}

function Dropdown({ id, label, items, open, setOpen, active, isActive }: { id: string; label: string; items: MenuItems; open: boolean; setOpen: (open: boolean) => void; active: boolean; isActive: (to: string) => boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const focusItem = (index: number) => window.requestAnimationFrame(() => itemRefs.current[index]?.focus());
  const openAndFocus = (index: number) => { setOpen(true); focusItem(index); };
  const onButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") { event.preventDefault(); openAndFocus(0); }
    if (event.key === "ArrowUp") { event.preventDefault(); openAndFocus(items.length - 1); }
    if (event.key === "Escape" && open) { event.preventDefault(); setOpen(false); }
  };
  const onItemKeyDown = (event: ReactKeyboardEvent<HTMLAnchorElement>, index: number) => {
    let target = index;
    if (event.key === "ArrowDown") target = (index + 1) % items.length;
    else if (event.key === "ArrowUp") target = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = items.length - 1;
    else if (event.key === "Escape") { event.preventDefault(); setOpen(false); buttonRef.current?.focus(); return; }
    else return;
    event.preventDefault();
    itemRefs.current[target]?.focus();
  };

  return <div className="lm-nav__item" onMouseEnter={() => setOpen(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false); }}>
    <button ref={buttonRef} type="button" className={active ? "is-active" : ""} aria-haspopup="menu" aria-expanded={open} aria-controls={`${id}-menu`} onClick={() => setOpen(!open)} onKeyDown={onButtonKeyDown}>{label}<ChevronDown aria-hidden="true" /></button>
    {open ? <div id={`${id}-menu`} className="lm-nav__dropdown" role="menu" aria-label={label}>{items.map(([to, item], index) => <Link ref={(element) => { itemRefs.current[index] = element; }} role="menuitem" key={`${to}-${item}`} to={to} aria-current={isActive(to) ? "page" : undefined} className={isActive(to) ? "is-active" : ""} onClick={() => setOpen(false)} onKeyDown={(event) => onItemKeyDown(event, index)}>{item}</Link>)}</div> : null}
  </div>;
}

function MobileGroup({ label, items, isActive }: { label: string; items: MenuItems; isActive: (to: string) => boolean }) {
  const [open, setOpen] = useState(items.some(([to]) => isActive(to)));
  const id = `mobile-${label.toLowerCase().replace(/ /g, "-")}`;
  return <section className="lm-nav__mobile-group"><button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>{label}<ChevronDown aria-hidden="true" /></button>{open ? <div id={id}>{items.map(([to, item]) => <NavLink key={`${to}-${item}`} to={to} label={item} active={isActive(to)} />)}</div> : null}</section>;
}
