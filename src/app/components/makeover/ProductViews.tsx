import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { audienceCaptions, type ProductView, type ProductViewImage } from "@/app/content/productViews";
import { trackEvent } from "@/app/lib/analytics";
import "@/styles/product-views.css";

const defaultSizes = "(max-width: 800px) calc(100vw - 42px), (max-width: 1150px) calc(100vw - 74px), 1326px";

function srcSet(image: ProductViewImage, extension: "avif" | "webp") {
  return image.widths.map((width) => `${image.basePath}-${width}.${extension} ${width}w`).join(", ");
}

function ViewPicture({ view, sizes, priority = false }: { view: ProductView; sizes: string; priority?: boolean }) {
  const { image } = view;
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(image, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image, "webp")} sizes={sizes} />
      <img
        src={`${image.basePath}.jpg`}
        alt={view.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

function EnlargedView({ view }: { view: ProductView }) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const { image } = view;
  const largestWidth = image.widths[image.widths.length - 1];

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) trackEvent("product_view_enlarge", { view: view.id });
        else setZoomed(false);
      }}
    >
      <DialogTrigger asChild>
        <button type="button" className="lm-shot-enlarge">
          <Maximize2 size={15} aria-hidden="true" />
          Enlarge screenshot
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="lm-shot-overlay" />
        <DialogPrimitive.Content className="lm-shot-dialog" style={{ "--lm-shot-ratio": image.width / image.height } as CSSProperties}>
          <div className="lm-shot-dialog-bar">
            <div className="lm-shot-dialog-heading">
              <DialogTitle className="lm-shot-dialog-title">{view.label}</DialogTitle>
              <DialogDescription className="lm-shot-dialog-note">{audienceCaptions[view.audience]}</DialogDescription>
            </div>
            <div className="lm-shot-dialog-actions">
              <button type="button" className="lm-shot-dialog-button" aria-pressed={zoomed} onClick={() => setZoomed((value) => !value)}>
                {zoomed ? <ZoomOut size={16} aria-hidden="true" /> : <ZoomIn size={16} aria-hidden="true" />}
                {zoomed ? "Fit to window" : "Zoom in"}
              </button>
              <DialogClose asChild>
                <button type="button" className="lm-shot-dialog-button lm-shot-dialog-close">
                  <X size={16} aria-hidden="true" />
                  Close
                </button>
              </DialogClose>
            </div>
          </div>
          <div className="lm-shot-dialog-scroll" data-zoomed={zoomed} tabIndex={0} role="group" aria-label="Enlarged screenshot. Scroll or drag to move around it.">
            <ViewPicture view={view} sizes={zoomed ? `${largestWidth}px` : "(max-width: 1040px) 1000px, 96vw"} priority />
          </div>
          <p className="lm-shot-dialog-hint">Scroll or drag to move around the screenshot.</p>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

type ProductViewFigureProps = {
  view: ProductView;
  /** Overrides the view's default caption. Pass null to show only the audience line. */
  caption?: string | null;
  /** Set for a screenshot visible on first paint. Everything else is lazy-loaded. */
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/** One framed screenshot with its caption, audience line and an Enlarge control. */
export function ProductViewFigure({ view, caption, priority = false, sizes = defaultSizes, className }: ProductViewFigureProps) {
  if (!view.published) return null;
  const captionText = caption === undefined ? view.caption : caption;
  const { image } = view;

  return (
    <figure className={["lm-shot", className].filter(Boolean).join(" ")} data-audience={view.audience}>
      <div className="lm-shot-frame" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
        <ViewPicture view={view} sizes={sizes} priority={priority} />
      </div>
      <div className="lm-shot-meta">
        <figcaption className="lm-shot-captions">
          {captionText && <span className="lm-shot-caption">{captionText}</span>}
          <span className="lm-shot-audience">{audienceCaptions[view.audience]}</span>
        </figcaption>
        <EnlargedView view={view} />
      </div>
    </figure>
  );
}

type ProductViewExplorerProps = {
  views: readonly ProductView[];
  /** Accessible name for the selector group. */
  label: string;
  /** Optional visible line above the selectors, such as an audience designation. */
  groupLabel?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Selectable screenshots, one shown at a time. Unpublished views are left out.
 * Selection is manual: arrow keys move focus between selectors, and Enter,
 * Space or a click chooses one. Nothing rotates on its own.
 */
export function ProductViewExplorer({ views, label, groupLabel, priority = false, sizes, className }: ProductViewExplorerProps) {
  const published = views.filter((view) => view.published);
  const [selectedId, setSelectedId] = useState(published[0]?.id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  if (!published.length) return null;
  const active = published.find((view) => view.id === selectedId) ?? published[0];
  const hasCopy = published.some((view) => view.heading || view.description);
  const tabId = (view: ProductView) => `${baseId}-tab-${view.id}`;
  const panelId = `${baseId}-panel`;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % published.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + published.length) % published.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = published.length - 1;
    if (next !== null) {
      event.preventDefault();
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className={["lm-shot-explorer", className].filter(Boolean).join(" ")}>
      {groupLabel && <p className="lm-shot-group-label">{groupLabel}</p>}
      {published.length > 1 && (
        <div className="lm-shot-tabs" role="tablist" aria-label={label}>
          {published.map((view, index) => {
            const selected = view.id === active.id;
            return (
              <button
                key={view.id}
                ref={(element) => { tabRefs.current[index] = element; }}
                type="button"
                role="tab"
                id={tabId(view)}
                className="lm-shot-tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onKeyDown={(event) => onKeyDown(event, index)}
                onClick={() => {
                  if (selected) return;
                  setSelectedId(view.id);
                  trackEvent("product_view_select", { view: view.id });
                }}
              >
                {view.label}
              </button>
            );
          })}
        </div>
      )}
      <div
        className="lm-shot-panel"
        id={panelId}
        role={published.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={published.length > 1 ? tabId(active) : undefined}
      >
        {hasCopy && (
          // Every view's copy shares one grid cell so the tallest reserves the height
          // and the screenshot below does not move when the selection changes.
          <div className="lm-shot-copy-stack">
            {published.map((view) => {
              const current = view.id === active.id;
              return (
                <div key={view.id} className="lm-shot-copy" data-current={current} aria-hidden={current ? undefined : true}>
                  {view.heading && <h3>{view.heading}</h3>}
                  {view.description && <p>{view.description}</p>}
                </div>
              );
            })}
          </div>
        )}
        <ProductViewFigure key={active.id} view={active} caption={hasCopy ? null : undefined} priority={priority && active.id === published[0].id} sizes={sizes} />
      </div>
    </div>
  );
}
