import type { OperatingScenario } from "@/app/pages/platformReferenceData";

export const useCaseVisuals: Record<OperatingScenario["key"], { src: string; alt: string }> = {
  cooling: {
    src: "/images/use-cases/data-center-cooling-v2.webp",
    alt: "Parallel chilled-water pumps and drive cabinets in a mission-critical data center cooling plant",
  },
  wastewater: {
    src: "/images/use-cases/municipal-wastewater-v2.webp",
    alt: "Redundant vertical pumps and discharge piping inside a municipal wastewater lift station",
  },
  air: {
    src: "/images/use-cases/manufacturing-compressed-air-v2.webp",
    alt: "Rotary-screw compressors, receiver tank, and distribution headers serving a manufacturing floor",
  },
  refrigeration: {
    src: "/images/use-cases/cold-storage-refrigeration-v2.webp",
    alt: "Industrial refrigeration compressor rack connected to a frozen-food cold-storage room",
  },
};
