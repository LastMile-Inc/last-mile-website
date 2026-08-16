# Feature 006: Dynamic portal density and loop animation

## Purpose

Complete the two remaining interaction and visual-fidelity corrections: translate the supplied dense Infinit-Control reference into the approved light system, and connect each Accountable Operations Loop phase to its physical image segment.

## Scope

- Preserve the existing Infinit-Control page, role tabs, central role images, shared operating case, and concept-interface label.
- Replace the sparse four-card portal treatment with a dense three-column command view modeled on the supplied reference structure.
- Update the central image, operating panels, measurements, work state, and summary strip for EXEC, PLANT MGR, and OPERATOR without a page refresh.
- Preserve the Home three-column phase definitions and unframed commissioned ring image.
- Add six inner-glass illumination paths and six matching image hit areas. Feature 007 supersedes the original clipped-raster technique after visual review found edge artifacts.
- Run one six-phase sequence when the loop first becomes visible, then return to neutral.
- After the sequence, link image hover, definition hover, and keyboard focus to the same physical segment and definition.
- Respect reduced-motion settings.

## Out of scope

- Rebuilding either page, changing controlled claims, using live customer data, changing calculations or saved data, changing customer boundaries or permissions, controlling equipment, merging, or deploying.

## Acceptance criteria

1. The portal uses white and light-grey panels, dark readable text, and Corporate Blue `#1D7CD8` for active marks and trends.
2. The portal shows seven panel families around the central image: operating condition, systems, alerts, KPI summary, scope, work, and live measurements.
3. PLANT MGR includes Plant Health at 92%, Process, Utilities, Electrical, 156 total work orders, and the requested plant KPI summary.
4. OPERATOR includes 180°C filler temperature, 450 units/min, 98.2% shift yield, two active line alarms, and a four-hour next maintenance cycle.
5. EXEC includes Portfolio Asset Health at 94%, Regional Throughput, 12ms Supply Chain Latency, and 88.4% High-Level OEE.
6. EXEC contains exactly one illuminated selected-site tag.
7. Each role changes its center image and surrounding data without a page refresh.
8. The loop contains six distinct inner-glass illumination paths and six matching pointer and keyboard targets.
9. The first visible sequence advances Evidence through Verify once, then returns to a neutral image.
10. Hovering or focusing either an image segment or its definition highlights both together.
11. Desktop and 390-pixel phone layouts have no horizontal overflow.
12. Repository and browser checks pass.
