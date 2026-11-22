/**
 * Product screenshot configuration.
 *
 * To add a screen:
 *   1. Save the original capture in assets/originals/ and add it to
 *      scripts/prepare-product-screenshots.py, then run that script to write
 *      the delivery files to public/images/product-views/.
 *   2. Add an entry to `productViews` below.
 *   3. Add its id to a set in `productViewSets`, or pass it to
 *      <ProductViewFigure> / <ProductViewExplorer>.
 *
 * `published: false` keeps a view out of every page. Its tab is not rendered
 * and its image is never requested.
 */

export type ProductViewAudience = "customer" | "internal-team";

export type ProductViewImage = {
  /** Path without width suffix or extension: `${basePath}-${width}.avif|webp`, `${basePath}.jpg`. */
  basePath: string;
  width: number;
  height: number;
  /** Delivered widths, ascending. The largest is used by the enlarged viewer. */
  widths: readonly number[];
};

export type ProductView = {
  id: string;
  /** Short selector label. */
  label: string;
  heading?: string;
  description?: string;
  /** Default caption shown beneath the image. A placement may override it. */
  caption?: string;
  alt: string;
  audience: ProductViewAudience;
  published: boolean;
  image: ProductViewImage;
};

export const audienceCaptions: Record<ProductViewAudience, string> = {
  customer: "Product screenshot · Example operating data.",
  "internal-team": "Last Mile Cloud Operations team view · Example operating data.",
};

const deliveredWidths = [640, 960, 1280, 1920, 2880] as const;
const imageRoot = "/images/product-views";

export const productViews = {
  operationsOverview: {
    id: "operations-overview",
    label: "Operations overview",
    heading: "Know where to focus.",
    description: "See sites, operating conditions and incoming data in a shared view, with site details and contacts close at hand.",
    caption: "Operations overview: site status, incoming data and selected-site context in one place.",
    alt: "Last Mile operations overview showing a global site map, site status, selected-site details and contacts.",
    audience: "customer",
    published: true,
    image: { basePath: `${imageRoot}/operations-overview`, width: 2880, height: 1800, widths: deliveredWidths },
  },
  operationsOverviewMap: {
    id: "operations-overview-map",
    label: "Operations overview, map view",
    caption: "Operations overview · Map view with selected-site context.",
    alt: "Last Mile operations overview in map view showing site status across a world map with the selected site’s details and contacts.",
    audience: "customer",
    published: true,
    image: { basePath: `${imageRoot}/operations-overview-map`, width: 2880, height: 1800, widths: deliveredWidths },
  },
  assetDetail: {
    id: "asset-detail",
    label: "Asset detail",
    heading: "Give every reading its context.",
    description: "Review current readings alongside equipment details, active conditions and replacement history.",
    caption: "Current readings, equipment details, active conditions and replacement history—together in the asset view.",
    alt: "Last Mile asset detail showing transformer readings, operating conditions, equipment information and replacement history.",
    audience: "customer",
    published: true,
    image: { basePath: `${imageRoot}/asset-detail`, width: 2880, height: 1800, widths: deliveredWidths },
  },
  // Unpublished until a corrected capture arrives: the supplied capture's summary
  // values and reported conditions are inconsistent. When it does, add the file to
  // scripts/prepare-product-screenshots.py, run it, and set `published: true`.
  equipmentTrends: {
    id: "equipment-trends",
    label: "Equipment trends",
    heading: "See what changed over time.",
    description: "Compare equipment readings with warning limits and events to understand when conditions changed.",
    alt: "Last Mile equipment trend chart showing readings over time, warning thresholds and reported conditions.",
    audience: "customer",
    published: false,
    image: { basePath: `${imageRoot}/equipment-trends`, width: 2880, height: 1800, widths: deliveredWidths },
  },
  cloudOperationsSiteContext: {
    id: "cloud-operations-site-context",
    label: "Site context",
    caption: "Site connectivity, incoming data, named contacts and recent interactions in one working view.",
    alt: "Last Mile Cloud Operations view showing one connected site’s connectivity, incoming data, support contacts and recent interactions.",
    audience: "internal-team",
    published: true,
    image: { basePath: `${imageRoot}/cloud-operations-site-context`, width: 2880, height: 1692, widths: deliveredWidths },
  },
  cloudOperationsConnectedSites: {
    id: "cloud-operations-connected-sites",
    label: "Connected sites",
    caption: "A shared view of connected sites, open issues and platform telemetry.",
    alt: "Last Mile Cloud Operations view showing connected-site health, open issues and incoming data.",
    audience: "internal-team",
    published: true,
    image: { basePath: `${imageRoot}/cloud-operations-connected-sites`, width: 2880, height: 1692, widths: deliveredWidths },
  },
} as const satisfies Record<string, ProductView>;

/** Ordered sets for the explorers. The first published view is selected by default. */
export const productViewSets = {
  platformTour: [productViews.operationsOverview, productViews.assetDetail, productViews.equipmentTrends],
  cloudOperations: [productViews.cloudOperationsSiteContext, productViews.cloudOperationsConnectedSites],
} as const satisfies Record<string, readonly ProductView[]>;
