"""Preserve original approved imagery and generate responsive WebP/AVIF delivery sets."""

from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
STAGING_DIR = ROOT / "public" / "images" / "updated"
ORIGINALS_DIR = ROOT / "assets" / "originals" / "2026-10-approved"
HOME_OUT_DIR = ROOT / "public" / "images" / "home"
PLATFORM_OUT_DIR = ROOT / "public" / "images" / "platform"
INVENTORY_PATH = ROOT / "content-source" / "image-inventory.json"

ACTIVE_ASSETS = [
    {
        "sourceFilename": "Picture10.jpg",
        "canonicalSpecName": "Picture10(1).jpg",
        "deliveryBasename": "home-chuck-hero",
        "outputDir": "public/images/home",
        "route": "/",
        "placement": "Home hero",
        "widths": [443],
        "fallbackExt": "jpg",
        "alt": "Industrial worker in hard hat, safety glasses, and high-visibility vest on a factory floor",
        "caption": None,
        "notes": "Native 443x540 portrait; not upscaled. At 340-400 CSS px desktop width, 2x Retina displays have a ~1.11x-1.30x pixel-density ratio.",
    },
    {
        "sourceFilename": "Industrial Inspection Team at Work.png",
        "canonicalSpecName": "Industrial Inspection Team at Work.png",
        "deliveryBasename": "platform-inspection-team",
        "outputDir": "public/images/platform",
        "route": "/platform",
        "placement": "Platform hero",
        "widths": [640, 960, 1280, 1536],
        "fallbackExt": "png",
        "alt": "Two industrial workers in safety gear reviewing equipment information on a tablet beside plant machinery",
        "caption": None,
        "notes": "3:2 aspect ratio (1536x1024 native).",
    },
    {
        "sourceFilename": "AI-Powered Factory Inspection Line.png",
        "canonicalSpecName": "AI-Powered Factory Inspection Line(1).png",
        "deliveryBasename": "platform-infinit-signal",
        "outputDir": "public/images/platform",
        "route": "/platform",
        "placement": "Platform Infinit-Signal section",
        "widths": [640, 960, 1280, 1448],
        "fallbackExt": "png",
        "alt": "Concept illustration of factory operators and equipment connected to incoming equipment readings",
        "caption": "Concept illustration",
        "notes": "4:3 aspect ratio (1448x1086 native).",
    },
    {
        "sourceFilename": "Smart Water Treatment Plant Monitoring.png",
        "canonicalSpecName": "Smart Water Treatment Plant Monitoring(1).png",
        "deliveryBasename": "platform-singularity",
        "outputDir": "public/images/platform",
        "route": "/platform",
        "placement": "Platform Singularity section",
        "widths": [640, 960, 1280, 1448],
        "fallbackExt": "png",
        "alt": "Concept illustration of water facility engineers reviewing how equipment, systems, and readings relate",
        "caption": "Concept illustration",
        "notes": "4:3 aspect ratio (1448x1086 native).",
    },
    {
        "sourceFilename": "Precision Agriculture Teamwork at Golden Hour.png",
        "canonicalSpecName": "Precision Agriculture Teamwork at Golden Hour(1).png",
        "deliveryBasename": "platform-infinit-flow",
        "outputDir": "public/images/platform",
        "route": "/platform",
        "placement": "Platform Infinit-Flow section",
        "widths": [640, 960, 1280, 1448],
        "fallbackExt": "png",
        "alt": "Concept illustration of field operators coordinating work across equipment and systems",
        "caption": "Concept illustration",
        "notes": "4:3 aspect ratio (1448x1086 native).",
    },
    {
        "sourceFilename": "Golden-Hour Oilfield Inspection.png",
        "canonicalSpecName": "Golden-Hour Oilfield Inspection(1).png",
        "deliveryBasename": "platform-infinit-control",
        "outputDir": "public/images/platform",
        "route": "/platform",
        "placement": "Platform Infinit-Control section",
        "widths": [640, 960, 1280, 1448],
        "fallbackExt": "png",
        "alt": "Concept illustration of an oilfield technician reviewing equipment status and operational readings on a tablet",
        "caption": "Concept illustration",
        "notes": "4:3 aspect ratio (1448x1086 native).",
    },
]

RESERVED_ASSETS = [
    "Factory Worker Adjusting Control Panel.png",
    "Confident Industrial Worker Portrait.png",
    "Maritime Worker Beside Massive Ship Hull.png",
    "Container Wall and Yard Worker.png",
    "Cold Storage Warehouse Inspection.png",
    "Solar Farm Inspection Team.png",
]

SUPERSEDED_ASSETS = [
    "Connected Automotive Assembly Line.png",
]


def sha256_short(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:16]


def preserve_originals() -> None:
    ORIGINALS_DIR.mkdir(parents=True, exist_ok=True)
    if STAGING_DIR.exists():
        for item in list(STAGING_DIR.iterdir()):
            if "Zone.Identifier" in item.name:
                item.unlink()
                continue
            target = ORIGINALS_DIR / item.name
            shutil.copy2(item, target)
            item.unlink()
        try:
            STAGING_DIR.rmdir()
        except OSError:
            pass


def main() -> None:
    preserve_originals()
    HOME_OUT_DIR.mkdir(parents=True, exist_ok=True)
    PLATFORM_OUT_DIR.mkdir(parents=True, exist_ok=True)

    inventory_active = []
    for spec in ACTIVE_ASSETS:
        src_path = ORIGINALS_DIR / spec["sourceFilename"]
        if not src_path.exists():
            raise FileNotFoundError(f"Missing original asset: {src_path}")

        out_dir = ROOT / spec["outputDir"]
        basename = spec["deliveryBasename"]
        delivery_files = []

        with Image.open(src_path) as img:
            rgb = img.convert("RGB")
            native_w, native_h = rgb.size

            for w in spec["widths"]:
                if w > native_w:
                    raise ValueError(f"Refusing to upscale {src_path.name} from {native_w} to {w}")
                h = native_h if w == native_w else round(w * native_h / native_w)
                resized = rgb if w == native_w else rgb.resize((w, h), Image.Resampling.LANCZOS)

                if len(spec["widths"]) == 1:
                    avif_name = f"{basename}.avif"
                    webp_name = f"{basename}.webp"
                else:
                    avif_name = f"{basename}-{w}.avif"
                    webp_name = f"{basename}-{w}.webp"

                avif_path = out_dir / avif_name
                webp_path = out_dir / webp_name
                resized.save(avif_path, format="AVIF", quality=80, speed=4)
                resized.save(webp_path, format="WEBP", quality=88, method=6)
                delivery_files.append(str(avif_path.relative_to(ROOT)).replace("\\", "/"))
                delivery_files.append(str(webp_path.relative_to(ROOT)).replace("\\", "/"))

            fallback_name = f"{basename}.{spec['fallbackExt']}"
            fallback_path = out_dir / fallback_name
            if spec["fallbackExt"] == "jpg":
                shutil.copy2(src_path, fallback_path)
            else:
                rgb.save(fallback_path, format="PNG", optimize=True)
            delivery_files.append(str(fallback_path.relative_to(ROOT)).replace("\\", "/"))

        inventory_active.append(
            {
                "status": "active",
                "deliveryBasename": basename,
                "sourceFilename": spec["sourceFilename"],
                "canonicalSpecName": spec["canonicalSpecName"],
                "preservedOriginalPath": str(src_path.relative_to(ROOT)).replace("\\", "/"),
                "originalDimensions": {"width": native_w, "height": native_h},
                "originalBytes": src_path.stat().st_size,
                "originalSha256": sha256_short(src_path),
                "route": spec["route"],
                "placement": spec["placement"],
                "alt": spec["alt"],
                "caption": spec["caption"],
                "deliveryFiles": delivery_files,
                "notes": spec["notes"],
            }
        )

    inventory_reserved = []
    for filename in RESERVED_ASSETS:
        src_path = ORIGINALS_DIR / filename
        if not src_path.exists():
            raise FileNotFoundError(f"Missing reserved asset: {src_path}")
        with Image.open(src_path) as img:
            w, h = img.size
        inventory_reserved.append(
            {
                "status": "reserved",
                "sourceFilename": filename,
                "preservedOriginalPath": str(src_path.relative_to(ROOT)).replace("\\", "/"),
                "originalDimensions": {"width": w, "height": h},
                "originalBytes": src_path.stat().st_size,
                "originalSha256": sha256_short(src_path),
                "displayedOn": [],
                "notes": "Reserved for upcoming supporting-page reviews. Do not display on Home or Platform.",
            }
        )

    inventory_superseded = []
    for filename in SUPERSEDED_ASSETS:
        src_path = ORIGINALS_DIR / filename
        if src_path.exists():
            with Image.open(src_path) as img:
                w, h = img.size
            inventory_superseded.append(
                {
                    "status": "superseded_not_displayed",
                    "sourceFilename": filename,
                    "preservedOriginalPath": str(src_path.relative_to(ROOT)).replace("\\", "/"),
                    "originalDimensions": {"width": w, "height": h},
                    "originalBytes": src_path.stat().st_size,
                    "originalSha256": sha256_short(src_path),
                    "displayedOn": [],
                    "notes": "Superseded candidate asset; preserved in originals only and not displayed on any route.",
                }
            )

    inventory = {
        "schemaVersion": 1,
        "lastUpdated": "2026-10-15",
        "scope": "Home (/) and Platform (/platform) approved imagery and reserved supporting-page assets",
        "activeAssets": inventory_active,
        "reservedAssets": inventory_reserved,
        "supersededAssets": inventory_superseded,
    }
    INVENTORY_PATH.write_text(json.dumps(inventory, indent=2) + "\n", encoding="utf-8")
    print(f"Processed {len(inventory_active)} active assets and {len(inventory_reserved)} reserved assets.")


if __name__ == "__main__":
    main()
