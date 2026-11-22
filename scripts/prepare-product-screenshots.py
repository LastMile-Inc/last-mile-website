#!/usr/bin/env python3
"""Prepare public delivery files for the supplied Last Mile product screenshots.

Usage:
    python3 scripts/prepare-product-screenshots.py [SOURCE_DIR]

SOURCE_DIR defaults to assets/originals/2026-11-product-screenshots/. Each
source is only resized (never upscaled) and, for the two Cloud Operations team
views, cropped from the bottom to remove the administrative shortcut and shell
bar. No pixels are redrawn, sharpened, or recoloured.

Only entries marked published are written to public/. An unpublished entry
(the trend chart awaiting a corrected capture) is skipped, so its file is never
reachable from the website.

Requires Pillow 11.3+ (built-in AVIF and WebP support).
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE_DIR = ROOT / "assets" / "originals" / "2026-11-product-screenshots"
OUTPUT_DIR = ROOT / "public" / "images" / "product-views"

WIDTHS = (640, 960, 1280, 1920, 2880)
FALLBACK_WIDTH = 1440

# crop_bottom is expressed as a fraction of the source height so a recapture at
# another resolution with the same layout is cropped at the same place.
# 1692 / 1800 is the first row below the main panels and above the shell bar.
CLOUD_OPERATIONS_KEEP_HEIGHT = 1692 / 1800

SCREENSHOTS = [
    {"source": "Ops.png", "basename": "operations-overview", "published": True},
    {"source": "hud.png", "basename": "operations-overview-map", "published": True},
    {"source": "Asset_detail.png", "basename": "asset-detail", "published": True},
    # Awaiting a corrected capture: summary values and reported conditions are inconsistent.
    {"source": "Asset_Trend.png", "basename": "equipment-trends", "published": False},
    {
        "source": "cloud_OPS_hud.png",
        "basename": "cloud-operations-site-context",
        "published": True,
        "keep_height": CLOUD_OPERATIONS_KEEP_HEIGHT,
    },
    {
        "source": "cloud_OPS_global.png",
        "basename": "cloud-operations-connected-sites",
        "published": True,
        "keep_height": CLOUD_OPERATIONS_KEEP_HEIGHT,
    },
]


def prepare(entry: dict, source_dir: Path) -> None:
    basename = entry["basename"]
    if not entry["published"]:
        stale = sorted(OUTPUT_DIR.glob(f"{basename}-*")) + sorted(OUTPUT_DIR.glob(f"{basename}.jpg"))
        for path in stale:
            path.unlink()
        print(f"skip   {entry['source']} (unpublished)")
        return

    image = Image.open(source_dir / entry["source"]).convert("RGB")
    if "keep_height" in entry:
        image = image.crop((0, 0, image.width, round(image.height * entry["keep_height"])))

    print(f"source {entry['source']} -> {basename} ({image.width}x{image.height})")
    for width in WIDTHS:
        if width > image.width:
            continue
        height = round(image.height * width / image.width)
        resized = image if width == image.width else image.resize((width, height), Image.LANCZOS)
        resized.save(OUTPUT_DIR / f"{basename}-{width}.avif", quality=72, subsampling="4:4:4", speed=3)
        resized.save(OUTPUT_DIR / f"{basename}-{width}.webp", quality=88, method=6, use_sharp_yuv=True)

    fallback_width = min(FALLBACK_WIDTH, image.width)
    fallback = image.resize((fallback_width, round(image.height * fallback_width / image.width)), Image.LANCZOS)
    fallback.save(OUTPUT_DIR / f"{basename}.jpg", quality=88, subsampling=0, optimize=True, progressive=True)


def main() -> None:
    source_dir = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else DEFAULT_SOURCE_DIR
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for entry in SCREENSHOTS:
        prepare(entry, source_dir)
    for path in sorted(OUTPUT_DIR.iterdir()):
        with Image.open(path) as image:
            print(f"{path.relative_to(ROOT)}  {image.width}x{image.height}  {path.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
