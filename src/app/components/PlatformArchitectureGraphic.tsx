import type { ReactNode } from "react";
import { OperationalIcon, type OperationalIconKind } from "@/app/components/OperationalIcon";

const products: ReadonlyArray<{ name: string; role: string; kind: OperationalIconKind }> = [
  { name: "Infinit-Signal", role: "Observe and qualify", kind: "signal" },
  { name: "Singularity", role: "Understand and remember", kind: "context" },
  { name: "Infinit-Flow", role: "Decide, coordinate, act", kind: "flow" },
  { name: "Infinit-Control", role: "See and govern", kind: "command" },
];

const ecosystem: ReadonlyArray<{ name: string; systems: string; kind: OperationalIconKind }> = [
  { name: "Industrial data", systems: "MQTT / UNS / brokers", kind: "signal" },
  { name: "Control and production", systems: "PLC / DCS / SCADA / MES", kind: "control-system" },
  { name: "Historians and data", systems: "Time series / platforms", kind: "operational-data" },
  { name: "Work and facilities", systems: "CMMS / EAM / ERP", kind: "execution-system" },
  { name: "Industrial service", systems: "Providers / field teams", kind: "people-authority" },
];

const plant: ReadonlyArray<{ name: string; kind: OperationalIconKind }> = [
  { name: "Sensors and instrumentation", kind: "signal" },
  { name: "PLCs and controllers", kind: "control-system" },
  { name: "HMI and operator interfaces", kind: "command" },
  { name: "SCADA systems", kind: "control-system" },
  { name: "Safety systems", kind: "security" },
  { name: "MES systems", kind: "execution-system" },
  { name: "Historians and databases", kind: "operational-data" },
  { name: "Machines and equipment", kind: "production" },
  { name: "Site operations and maintenance", kind: "people-authority" },
];

export function PlatformArchitectureGraphic({ compact = false }: { compact?: boolean }) {
  return <figure className={"lm-platform-architecture-graphic" + (compact ? " is-compact" : "")} aria-labelledby={compact ? "platform-architecture-compact-title" : "platform-architecture-title"}>
    <figcaption className="lm-visually-hidden">
      <span>THE PHYSICAL OPERATIONS PLATFORM</span>
      <strong id={compact ? "platform-architecture-compact-title" : "platform-architecture-title"}>One accountable operating layer across the systems already running your plant.</strong>
    </figcaption>

    <ArchitectureLayer className="lm-platform-architecture-graphic__platform" label="LAST MILE PLATFORM">
      <div className="lm-platform-architecture-graphic__products">
        {products.map((product) => <article key={product.name}>
          <OperationalIcon kind={product.kind} size={compact ? "small" : "medium"} />
          <strong>{product.name}</strong>
          <small>{product.role}</small>
        </article>)}
      </div>
      <div className="lm-platform-architecture-graphic__learning"><span>Shared operating record</span><i /><span>Outcome learning</span></div>
    </ArchitectureLayer>

    <div className="lm-platform-architecture-graphic__exchange" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div>

    <ArchitectureLayer className="lm-platform-architecture-graphic__ecosystem" label="EXISTING OT, DATA, WORK & SERVICE ECOSYSTEM">
      <div className="lm-platform-architecture-graphic__ecosystem-grid">
        {ecosystem.map((item) => <article key={item.name}>
          <OperationalIcon kind={item.kind} size="small" />
          <span><strong>{item.name}</strong><small>{item.systems}</small></span>
        </article>)}
      </div>
    </ArchitectureLayer>

    <div className="lm-platform-architecture-graphic__exchange" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div>

    <ArchitectureLayer className="lm-platform-architecture-graphic__plant" label="PLANT / SITE / OT ENVIRONMENT">
      <div className="lm-platform-architecture-graphic__plant-grid">
        {plant.map((item) => <article key={item.name}>
          <OperationalIcon kind={item.kind} size="small" />
          <strong>{item.name}</strong>
        </article>)}
      </div>
    </ArchitectureLayer>
  </figure>;
}

function ArchitectureLayer({ className, label, children }: { className: string; label: string; children: ReactNode }) {
  return <section className={"lm-platform-architecture-graphic__layer " + className} aria-label={label}>
    <h3>{label}</h3>
    {children}
  </section>;
}