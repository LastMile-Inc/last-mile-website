import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { SiteHeader, SiteFooter } from "./SiteShell";
import "@/styles/website-review.css";

export function ReviewRoot() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    document.body.classList.add("lm-makeover");
    document.documentElement.classList.add("lm-makeover-document");
    return () => {
      document.body.classList.remove("lm-makeover");
      document.documentElement.classList.remove("lm-makeover-document");
    };
  }, []);
  useLayoutEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" }));
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return <><SiteHeader/><Outlet/><SiteFooter/></>;
}
