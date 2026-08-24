import type { ComponentType } from "react";
import { createBrowserRouter, redirect } from "react-router";
import { Root } from "./components/Root";
import { RouteLoading } from "./components/RouteLoading";

function lazyPage<T extends Record<string, unknown>>(
  loader: () => Promise<T>,
  exportName: keyof T,
) {
  return async () => {
    const module = await loader();
    const Component = module[exportName];

    if (typeof Component !== "function") {
      throw new Error(`Route export "${String(exportName)}" is not a component.`);
    }

    return { Component: Component as ComponentType };
  };
}

function redirectTo(path: string, status = 302) {
  return () => redirect(path, status);
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    HydrateFallback: RouteLoading,
    children: [
      { index: true, lazy: lazyPage(() => import("./pages/HomePage"), "HomePage") },
      { path: "platform", lazy: lazyPage(() => import("./pages/PlatformOverviewPage"), "PlatformOverviewPage") },
      { path: "use-cases", lazy: lazyPage(() => import("./pages/UseCasesPage"), "UseCasesPage") },
      { path: "use-cases/data-centers", loader: redirectTo("/use-cases/data-center-cooling", 301) },
      { path: "use-cases/manufacturing", loader: redirectTo("/use-cases/manufacturing-compressed-air", 301) },
      { path: "use-cases/cold-storage", loader: redirectTo("/use-cases/cold-storage-refrigeration", 301) },
      { path: "use-cases/:useCaseSlug", lazy: lazyPage(() => import("./pages/OperatingUseCasePage"), "OperatingUseCasePage") },
      { path: "data-center-cooling", loader: redirectTo("/use-cases/data-center-cooling", 301) },
      { path: "infinit-signal", lazy: lazyPage(() => import("./pages/InfinitSignalPage"), "InfinitSignalPage") },
      { path: "infinit-flow", lazy: lazyPage(() => import("./pages/InfinitFlowPage"), "InfinitFlowPage") },
      { path: "infinit-control", lazy: lazyPage(() => import("./pages/InfinitControlPage"), "InfinitControlPage") },
      { path: "singularity", lazy: lazyPage(() => import("./pages/SSOMPage"), "SSOMPage") },
      { path: "ssom", loader: redirectTo("/singularity") },
      { path: "solutions", loader: redirectTo("/platform") },
      { path: "ecosystem", lazy: lazyPage(() => import("./pages/EcosystemPage"), "EcosystemPage") },
      { path: "integrations", loader: redirectTo("/ecosystem") },
      { path: "integrations/:vendorSlug/:productSlug", loader: redirectTo("/ecosystem") },
      { path: "about", lazy: lazyPage(() => import("./pages/AboutPage"), "AboutPage") },
      { path: "company", loader: redirectTo("/about") },
      { path: "company/newsroom", lazy: lazyPage(() => import("./pages/NewsroomPage"), "NewsroomPage") },
      { path: "resources", lazy: lazyPage(() => import("./pages/ResourcesPage"), "ResourcesPage") },
      { path: "resources/pmo-implementation-hub", lazy: lazyPage(() => import("./pages/PmoImplementationHubPage"), "PmoImplementationHubPage") },
      { path: "resources/industrial-concepts", lazy: lazyPage(() => import("./pages/IndustrialConceptsPage"), "IndustrialConceptsPage") },
      { path: "resources/industrial-concepts/:conceptSlug", lazy: lazyPage(() => import("./pages/IndustrialConceptArticlePage"), "IndustrialConceptArticlePage") },
      {
        path: "company/newsroom/:slug",
        lazy: lazyPage(() => import("./pages/PressReleaseDetailPage"), "PressReleaseDetailPage"),
      },
      { path: "careers", loader: redirectTo("/about") },
      { path: "contact", lazy: lazyPage(() => import("./pages/ContactPage"), "ContactPage") },
      { path: "design-partner", loader: redirectTo("/contact?intent=operation", 301) },
      { path: "privacy", lazy: lazyPage(() => import("./pages/LegalPage"), "PrivacyPage") },
      { path: "terms", lazy: lazyPage(() => import("./pages/LegalPage"), "TermsPage") },
      { path: "signal-to-action", lazy: lazyPage(() => import("./pages/Signal2ActionPage"), "Signal2ActionPage") },
      { path: "signal-2-action", loader: redirectTo("/signal-to-action") },
      { path: "*", lazy: lazyPage(() => import("./pages/NotFound"), "NotFound") },
    ],
  },
]);
