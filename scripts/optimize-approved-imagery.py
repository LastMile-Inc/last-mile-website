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
        "sourceFilename": "chuck.png",
        "canonicalSpecName": "chuck.png",
        "deliveryBasename": "home-chuck-hero",
        "outputDir": "public/images/home",
        "route": "/",
        "placement": "Home hero",
        "widths": [400, 600, 800, 1086],
        "fallbackExt": "jpg",
        "alt": "Chuck wearing a blue hard hat and safety glasses on a factory floor.",
        "caption": None,
        "notes": "Native 1086x1448 portrait (3:4 aspect ratio); supersedes Picture10(1).jpg (443x540). Delivered at 400w, 600w, 800w, and 1086w in AVIF/WebP with an optimized JPEG fallback so the raw PNG is never served by default.",
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
        "route": "/platform, /infinit-signal",
        "routes": ["/platform", "/infinit-signal"],
        "placement": "Platform Infinit-Signal section and /infinit-signal hero",
        "widths": [640, 960, 1280, 1448],
        "fallbackExt": "png",
        "alt": "Packaging-line cameras and sensors with conceptual graphics showing organized operating information.",
        "caption": "Concept illustration",
        "notes": "4:3 aspect ratio (1448x1086 native). Shared across Platform Infinit-Signal section and /infinit-signal hero.",
    },
    {
        "sourceFilename": "Futuristic Factory-to-AI Data Pipeline.png",
        "canonicalSpecName": "Futuristic Factory-to-AI Data Pipeline.png",
        "deliveryBasename": "signal-handoff-web-v3",
        "outputDir": "public/images/platform",
        "route": "/infinit-signal",
        "routes": ["/infinit-signal"],
        "placement": "/infinit-signal main explanatory illustration",
        "widths": [640, 960, 1280, 1672],
        "fallbackExt": "png",
        "alt": "Conceptual illustration showing factory equipment signals entering Infinit-Signal for five qualification checks, connecting into Singularity for shared operational context, and supporting coordinated work and oversight in Infinit-Flow and Infinit-Control.",
        "caption": "Concept illustration",
        "notes": "16:9 aspect ratio (1672x941 native). Cleaned replacement for ai-ready-handoff-v2.png with live HTML/SVG region headings and qualification row labels.",
    },
    {
        "sourceFilename": "Smart Water Treatment Plant Monitoring.png",
        "canonicalSpecName": "Smart Water Treatment Plant Monitoring(1).png",
        "deliveryBasename": "platform-singularity",
        "outputDir": "public/images/platform",
        "route": "/platform, /singularity",
        "routes": ["/platform", "/singularity"],
        "placement": "Platform Singularity section and /singularity hero",
        "widths": [640, 960, 1280, 1448],
        "fallbackExt": "png",
        "alt": "Concept illustration of water facility engineers reviewing how equipment, systems, and readings relate",
        "caption": "Concept illustration",
        "notes": "4:3 aspect ratio (1448x1086 native). Shared across Platform Singularity section and /singularity hero.",
    },
    {
        "sourceFilename": "semantic-operating-record-v3.png",
        "canonicalSpecName": "semantic-operating-record-v3.png",
        "deliveryBasename": "semantic-operating-record-v3",
        "outputDir": "public/images/platform",
        "route": "/singularity",
        "routes": ["/singularity"],
        "placement": "/singularity main explanatory illustration",
        "widths": [640, 960, 1280, 1672],
        "fallbackExt": "png",
        "alt": "Conceptual illustration showing six disparate operational sources passing through a connected context layer into one shared operating record.",
        "caption": "Concept illustration",
        "notes": "16:9 aspect ratio (1672x941 native). Displayed with live HTML labels for Source information, Connected context, and Shared operating record.",
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
    {
        "sourceFilename": "infinit-flow-control-room.png",
        "canonicalSpecName": "infinit-flow-control-room.png",
        "deliveryBasename": "infinit-flow-control-room",
        "outputDir": "public/images/platform",
        "route": "/infinit-flow",
        "routes": ["/infinit-flow"],
        "placement": "/infinit-flow hero",
        "widths": [640, 960, 1280, 1672],
        "fallbackExt": "png",
        "alt": "Concept illustration of an industrial display showing a coordinated workflow diagram in front of a manufacturing facility.",
        "caption": "Concept illustration",
        "notes": "16:9 aspect ratio (1672x941 native). Treated as a conceptual product illustration.",
    },
    {
        "sourceFilename": "Industrial Data Flow Network.png",
        "canonicalSpecName": "Industrial Data Flow Network.png",
        "deliveryBasename": "orchestration-routing-web-v4",
        "outputDir": "public/images/platform",
        "route": "/infinit-flow",
        "routes": ["/infinit-flow"],
        "placement": "/infinit-flow main explanatory illustration",
        "widths": [640, 960, 1280, 1672],
        "fallbackExt": "png",
        "alt": "Conceptual illustration showing operating context routing through response rules and approvals to people and connected systems, with progress and return evidence converging at a right-hand return junction.",
        "caption": "Concept illustration",
        "notes": "16:9 aspect ratio (1672x941 native). Simplified replacement for orchestration-routing-v3.png with live HTML/SVG labels.",
    },
    {
        "sourceFilename": "field-command-v2.png",
        "canonicalSpecName": "field-command-v2.png",
        "deliveryBasename": "field-command-v2",
        "outputDir": "public/images/platform",
        "route": "/infinit-control",
        "routes": ["/infinit-control"],
        "placement": "/infinit-control hero",
        "widths": [640, 960, 1280, 1536],
        "fallbackExt": "png",
        "alt": "Concept illustration of a field technician beside a pump assembly reviewing operating conditions, ownership, work status, and trend data on a tablet.",
        "caption": "Concept illustration",
        "notes": "3:2 aspect ratio (1536x1024 native). Treated as a conceptual illustration.",
    },
    {
        "sourceFilename": "mission-control-v2.png",
        "canonicalSpecName": "mission-control-v2.png",
        "deliveryBasename": "mission-control-v2",
        "outputDir": "public/images/platform",
        "route": "/infinit-control",
        "routes": ["/infinit-control"],
        "placement": "/infinit-control supporting oversight illustration",
        "widths": [640, 960, 1280, 1672],
        "fallbackExt": "png",
        "alt": "Concept illustration of operations staff reviewing conditions, ongoing responses, and outcome evidence across a shared operational view.",
        "caption": "Concept illustration",
        "notes": "16:9 aspect ratio (1672x941 native). Presented as an illustration of broader oversight across the operation.",
    },
    {
        "sourceFilename": "manufacturing-compressed-air.webp",
        "canonicalSpecName": "manufacturing-compressed-air.webp",
        "deliveryBasename": "manufacturing-compressed-air",
        "outputDir": "public/images/use-cases",
        "route": "/use-cases/manufacturing-compressed-air",
        "routes": ["/use-cases/manufacturing-compressed-air"],
        "placement": "/use-cases/manufacturing-compressed-air introductory visual",
        "widths": [640, 800, 1024],
        "fallbackExt": "webp",
        "alt": "Concept illustration of a utilities technician holding a tablet and checking a pressure gauge on a vertical air receiver tank beside compressed-air dryers and compressor cabinets.",
        "caption": "Concept illustration",
        "notes": "16:10 aspect ratio (1024x640 native). Primary introductory visual for the compressed-air use case.",
    },
    {
        "sourceFilename": "cold-storage-refrigeration-v2.webp",
        "canonicalSpecName": "cold-storage-refrigeration-v2.webp",
        "deliveryBasename": "cold-storage-refrigeration-v2",
        "outputDir": "public/images/use-cases",
        "route": "/use-cases/cold-storage-refrigeration",
        "routes": ["/use-cases/cold-storage-refrigeration"],
        "placement": "/use-cases/cold-storage-refrigeration introductory visual",
        "widths": [640, 800, 1024],
        "fallbackExt": "webp",
        "alt": "Concept illustration of a refrigeration machinery room with compressor racks, insulated piping, and pressure gauges beside an open doorway into a palletized cold-storage freezer.",
        "caption": "Concept illustration",
        "notes": "16:9 aspect ratio (1024x576 native). Primary introductory visual for the cold-storage refrigeration use case; presented as refrigeration context rather than a documented customer installation.",
    },
    {
        "sourceFilename": "municipal-wastewater.webp",
        "canonicalSpecName": "municipal-wastewater.webp",
        "deliveryBasename": "municipal-wastewater",
        "outputDir": "public/images/use-cases",
        "route": "/use-cases/municipal-wastewater",
        "routes": ["/use-cases/municipal-wastewater"],
        "placement": "/use-cases/municipal-wastewater introductory visual",
        "widths": [640, 800, 1024],
        "fallbackExt": "webp",
        "alt": "Concept illustration of a wastewater operator in a hard hat overlooking a concrete lift-station wet well with vertical pumps, discharge piping, and isolation valves.",
        "caption": "Concept illustration",
        "notes": "16:10 aspect ratio (1024x640 native). Primary introductory visual for the municipal wastewater lift-station use case.",
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
    "Picture10.jpg",
    "Connected Automotive Assembly Line.png",
    "ai-ready-handoff-v2.png",
    "orchestration-routing-v3.png",
]


def sha256_short(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:16]


def preserve_originals() -> None:
    ORIGINALS_DIR.mkdir(parents=True, exist_ok=True)
    if STAGING_DIR.exists():
        for item in sorted(STAGING_DIR.rglob("*")):
            if item.is_dir():
                continue
            if "Zone.Identifier" in item.name:
                item.unlink()
                continue
            if item.name == "Smart Water Treatment Plant Monitoring(1).png":
                target = ORIGINALS_DIR / "Smart Water Treatment Plant Monitoring.png"
            else:
                target = ORIGINALS_DIR / item.name
            shutil.copy2(item, target)
            item.unlink()
        shutil.rmtree(STAGING_DIR, ignore_errors=True)


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
        out_dir.mkdir(parents=True, exist_ok=True)
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
                if not avif_path.exists():
                    resized.save(avif_path, format="AVIF", quality=80, speed=4)
                if not webp_path.exists():
                    resized.save(webp_path, format="WEBP", quality=88, method=6)
                delivery_files.append(str(avif_path.relative_to(ROOT)).replace("\\", "/"))
                delivery_files.append(str(webp_path.relative_to(ROOT)).replace("\\", "/"))

            fallback_name = f"{basename}.{spec['fallbackExt']}"
            fallback_path = out_dir / fallback_name
            if not fallback_path.exists():
                if spec["fallbackExt"] == "jpg":
                    if src_path.suffix.lower() in (".jpg", ".jpeg"):
                        shutil.copy2(src_path, fallback_path)
                    else:
                        rgb.save(fallback_path, format="JPEG", quality=88, optimize=True, progressive=True)
                elif spec["fallbackExt"] == "webp":
                    if src_path.suffix.lower() == ".webp":
                        shutil.copy2(src_path, fallback_path)
                    else:
                        rgb.save(fallback_path, format="WEBP", quality=88, method=6)
                else:
                    rgb.save(fallback_path, format="PNG", optimize=True)
            delivery_files.append(str(fallback_path.relative_to(ROOT)).replace("\\", "/"))

        entry = {
            "status": "active",
            "deliveryBasename": basename,
            "sourceFilename": spec["sourceFilename"],
            "canonicalSpecName": spec["canonicalSpecName"],
            "preservedOriginalPath": str(src_path.relative_to(ROOT)).replace("\\", "/"),
            "originalDimensions": {"width": native_w, "height": native_h},
            "originalBytes": src_path.stat().st_size,
            "originalSha256": sha256_short(src_path),
            "route": spec["route"],
            "routes": spec.get("routes", [spec["route"]]),
            "placement": spec["placement"],
            "alt": spec["alt"],
            "caption": spec["caption"],
            "deliveryFiles": delivery_files,
            "notes": spec["notes"],
        }
        inventory_active.append(entry)

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
                "notes": "Reserved for upcoming supporting-page reviews. Do not display on Home, Platform, or Infinit-Signal.",
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
        "lastUpdated": "2026-10-16",
        "scope": "Home (/), Platform (/platform), Infinit-Signal (/infinit-signal), Singularity (/singularity), Infinit-Flow (/infinit-flow), Infinit-Control (/infinit-control), and Use Cases (/use-cases/*) approved imagery and reserved supporting-page assets",
        "activeAssets": inventory_active,
        "reservedAssets": inventory_reserved,
        "supersededAssets": inventory_superseded,
    }
    INVENTORY_PATH.write_text(json.dumps(inventory, indent=2) + "\n", encoding="utf-8")
    print(f"Processed {len(inventory_active)} active assets and {len(inventory_reserved)} reserved assets.")


if __name__ == "__main__":
    main()
