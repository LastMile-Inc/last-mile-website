export type RagStatus = "critical" | "warning" | "normal" | "unknown" | "info";

type Rule =
  | { type: "informational" }
  | { type: "equals"; expected: string; mismatch: "critical" | "warning" }
  | { type: "band"; min: number; max: number; outside: "critical" | "warning" }
  | { type: "minimum"; min: number; below: "critical" | "warning" }
  | { type: "maximum"; max: number; above: "critical" | "warning" }
  | { type: "withinMaximum"; max: number; within: "critical" | "warning" };

export type ReferenceMeasurement = {
  id: string;
  name: string;
  value: string;
  numericValue?: number;
  unit?: string;
  reference: string;
  trend?: string;
  freshness?: string;
  valid?: boolean;
  rule: Rule;
  statusLabel?: "Normal" | "Accepted" | "Commanded" | "Informational";
  analog?: boolean;
};

export type ReferenceOutcome = {
  key: ResultKey;
  label: string;
  measurements: ReferenceMeasurement[];
  reason: string;
  workStatus?: string;
  operatingResult?: string;
  priorRecoveryAt?: string;
  recurrenceElapsed?: string;
  resultBasis: "qualified_measurements";
};

export type ResultKey = "recovery" | "partial" | "failed" | "recurrence" | "insufficient";

export const referenceDisclosure = "Reference values describe a controlled Last Mile demonstration. External guidance is identified where applicable; equipment limits, commissioned setpoints, operating bands, response authority, and acceptance criteria remain customer- and site-specific.";

export const coolingReference = {
  identity: {
    issue: "LM-CHWP-02-0471",
    facility: "Reference Site DC-03",
    location: "Hall 3",
    system: "Cooling Loop B",
    asset: "CHWP-02",
    assetType: "Secondary chilled-water pump",
    redundancyRole: "N+1 secondary pumping path",
    owner: "Maya Chen",
    team: "Critical Facilities",
    affiliation: "DC-03 / Hall 3",
    sapEquipment: "CHWP-02",
    sapFunctionalLocation: "DC-03-H3-CHW-LB",
    sapWorkOrder: "WO-18427",
    providerDispatch: "M-88214",
    acknowledgementTarget: "05:00",
    requiredStability: "15:00",
    recurrenceWindow: "24 hours",
  },
  timeline: [
    ["14:32:18", "RUN command issued"],
    ["14:32:23", "Pump status remains Stopped"],
    ["14:32:26", "Infinit-Signal accepts the qualified mismatch"],
    ["14:34:07", "Maya Chen acknowledges the response"],
    ["14:35:10", "SAP WO-18427 created"],
    ["14:39:28", "Mechanical service dispatch M-88214 accepted"],
    ["15:02:41", "Field work marked complete in SAP"],
    ["15:17:41", "Fifteen-minute measurement window completes"],
    ["15:17:42", "Recovery established when recovery criteria are met"],
  ],
  incident: [
    measurement("command", "Commanded state", "RUN", undefined, undefined, "Requested at 14:32:18", { type: "informational" }),
    measurement("pump_status", "Pump status", "Stopped", undefined, undefined, "Expected: Running", { type: "equals", expected: "Running", mismatch: "critical" }),
    measurement("motor_current", "Motor current", "0.6 A", 0.6, "A", "Running baseline*: 17.5–20.5 A", { type: "band", min: 17.5, max: 20.5, outside: "critical" }, undefined, undefined, true),
    measurement("loop_dp", "Loop differential pressure", "4.2 psid", 4.2, "psid", "Approved band*: 9.0–15.0 psid", { type: "band", min: 9, max: 15, outside: "critical" }, "↓ 2.1 psid/5 min", "Fresh 1.8 sec", true),
    measurement("rack_temp", "Rack inlet temperature", "73.6°F", 73.6, "°F", "ASHRAE recommended: 64.4–80.6°F", { type: "band", min: 64.4, max: 80.6, outside: "warning" }, "↑ 0.3°F/5 min", "Fresh 1.6 sec", true),
  ],
  qualification: [
    measurement("source", "Source authority", "BMS-DC03-01", undefined, undefined, "Approved source: BMS-DC03-01", { type: "equals", expected: "BMS-DC03-01", mismatch: "critical" }, undefined, undefined, false, "Accepted"),
    measurement("event_time", "Event time", "14:32:23.184 local", undefined, undefined, "Expected event clock: local", { type: "equals", expected: "14:32:23.184 local", mismatch: "critical" }, undefined, undefined, false, "Accepted"),
    measurement("latency", "Ingest latency", "1.8 sec", 1.8, "sec", "Normal limit*: ≤5 sec", { type: "maximum", max: 5, above: "warning" }, undefined, undefined, true),
    measurement("quality", "Source quality score", "98 / 100", 98, "score", "Approved minimum*: 95", { type: "minimum", min: 95, below: "critical" }),
    measurement("duplicates", "Duplicate check", "0 accepted duplicates", 0, "records", "Required: 0 accepted duplicates", { type: "maximum", max: 0, above: "critical" }),
    measurement("replay", "Replay classification", "Live event", undefined, undefined, "Expected: Live event", { type: "equals", expected: "Live event", mismatch: "warning" }),
    measurement("mapping", "Asset mapping confidence", "1.00", 1, "confidence", "Approved minimum*: 1.00", { type: "minimum", min: 1, below: "critical" }),
    measurement("accepted", "Accepted records", "5", 5, "records", "Required for issue*: ≥5", { type: "minimum", min: 5, below: "critical" }),
    measurement("quarantined", "Quarantined records", "2", 2, "records", "Reference expectation*: 0", { type: "maximum", max: 0, above: "warning" }),
  ],
  quarantine: ["1 duplicate event rejected.", "1 stale pressure sample rejected at 47 seconds old.", "Neither rejected record contributes to the issue decision."],
  sourceReferences: [
    ["Rockwell tag", "B3_CHW_P02_CMD"],
    ["BMS status", "B3_CHW_P02_STS"],
    ["Ignition path", "[DC03]CHW/LoopB/CHWP-02"],
    ["HighByte instance", "dc03.loop_b.chwp_02"],
    ["MQTT topic", "dc03/chw/loop-b/chwp-02/state"],
    ["Historian point", "DC03_CHWP02_AMPS"],
    ["SAP equipment", "CHWP-02"],
    ["Functional location", "DC-03-H3-CHW-LB"],
  ],
  coordination: {
    owner: "Maya Chen · Critical Facilities · DC-03 / Hall 3",
    acknowledged: "01:49 after issue creation",
    target: "≤05:00",
    sapWork: "WO-18427 · In progress",
    providerDispatch: "M-88214 · Accepted",
    providerEta: "18 min",
    approval: "Mechanical isolation authorized",
    fieldAuthority: "Retained by DC-03 Critical Facilities",
  },
} as const;

const outcomeMeasurements: Record<ResultKey, ReferenceMeasurement[]> = {
  recovery: [
    measurement("pump_status", "Pump status", "Running", undefined, undefined, "Required: Running", { type: "equals", expected: "Running", mismatch: "critical" }),
    measurement("motor_current", "Motor current", "18.7 A", 18.7, "A", "Approved band*: 17.5–20.5 A", { type: "band", min: 17.5, max: 20.5, outside: "critical" }, undefined, "Fresh 1.4 sec", true),
    measurement("loop_dp", "Loop differential pressure", "12.4 psid", 12.4, "psid", "Approved band*: 9.0–15.0 psid", { type: "band", min: 9, max: 15, outside: "critical" }, undefined, "Fresh 1.2 sec", true),
    measurement("rack_temp", "Rack inlet temperature", "73.6°F", 73.6, "°F", "ASHRAE recommended: 64.4–80.6°F", { type: "band", min: 64.4, max: 80.6, outside: "warning" }, undefined, "Fresh 1.6 sec", true),
    measurement("pressure_variation", "Pressure variation", "±0.2 psid / 15 min", 0.2, "psid", "Approved maximum*: ≤±0.5 psid", { type: "maximum", max: 0.5, above: "warning" }, undefined, undefined, true),
    measurement("stability", "Stability window", "15:00 / 15:00", 900, "sec", "Required*: 15:00", { type: "minimum", min: 900, below: "warning" }),
  ],
  partial: [
    measurement("pump_status", "Pump status", "Running", undefined, undefined, "Required: Running", { type: "equals", expected: "Running", mismatch: "critical" }),
    measurement("motor_current", "Motor current", "18.5 A", 18.5, "A", "Approved band*: 17.5–20.5 A", { type: "band", min: 17.5, max: 20.5, outside: "critical" }, undefined, "Fresh 1.3 sec", true),
    measurement("loop_dp", "Loop differential pressure", "8.3 psid", 8.3, "psid", "Approved band*: 9.0–15.0 psid", { type: "band", min: 9, max: 15, outside: "warning" }, undefined, "Fresh 1.5 sec", true),
    measurement("rack_temp", "Rack inlet temperature", "77.0°F", 77, "°F", "ASHRAE recommended: 64.4–80.6°F", { type: "band", min: 64.4, max: 80.6, outside: "warning" }, "↑ 0.4°F/5 min", "Fresh 1.7 sec", true),
    measurement("pressure_variation", "Pressure variation", "±0.9 psid / 6 min", 0.9, "psid", "Approved maximum*: ≤±0.5 psid", { type: "maximum", max: 0.5, above: "warning" }, undefined, undefined, true),
    measurement("stability", "Stability window", "06:20 / 15:00", 380, "sec", "Required*: 15:00", { type: "minimum", min: 900, below: "warning" }),
  ],
  failed: [
    measurement("pump_status", "Pump status", "Stopped", undefined, undefined, "Required: Running", { type: "equals", expected: "Running", mismatch: "critical" }),
    measurement("motor_current", "Motor current", "0.7 A", 0.7, "A", "Approved band*: 17.5–20.5 A", { type: "band", min: 17.5, max: 20.5, outside: "critical" }, undefined, "Fresh 1.8 sec", true),
    measurement("loop_dp", "Loop differential pressure", "4.8 psid", 4.8, "psid", "Approved band*: 9.0–15.0 psid", { type: "band", min: 9, max: 15, outside: "critical" }, undefined, "Fresh 1.5 sec", true),
    measurement("rack_temp", "Rack inlet temperature", "79.5°F", 79.5, "°F", "Customer warning threshold*: 79.0°F; recommended range 64.4–80.6°F", { type: "band", min: 64.4, max: 79, outside: "warning" }, "↑ 1.1°F/5 min", "Fresh 1.6 sec", true),
    measurement("stability", "Stability window", "00:00 / 15:00", 0, "sec", "Required*: 15:00", { type: "minimum", min: 900, below: "critical" }),
  ],
  recurrence: [
    measurement("pump_status", "Pump status", "Stopped", undefined, undefined, "Required: Running", { type: "equals", expected: "Running", mismatch: "critical" }),
    measurement("motor_current", "Motor current", "0.8 A", 0.8, "A", "Approved band*: 17.5–20.5 A", { type: "band", min: 17.5, max: 20.5, outside: "critical" }, undefined, "Fresh 1.9 sec", true),
    measurement("loop_dp", "Loop differential pressure", "5.1 psid", 5.1, "psid", "Approved band*: 9.0–15.0 psid", { type: "band", min: 9, max: 15, outside: "critical" }, undefined, "Fresh 1.4 sec", true),
    measurement("rack_temp", "Rack inlet temperature", "78.8°F", 78.8, "°F", "Customer warning threshold*: 78.0°F; recommended range 64.4–80.6°F", { type: "band", min: 64.4, max: 78, outside: "warning" }, "↑ 0.9°F/5 min", "Fresh 1.6 sec", true),
    measurement("recurrence_elapsed", "Time since recovery", "11:32", 692, "sec", "Configured recurrence window*: 24 hours", { type: "withinMaximum", max: 86400, within: "critical" }),
  ],
  insufficient: [
    measurement("pump_status", "Pump status", "Unknown", undefined, undefined, "Current valid state required", { type: "equals", expected: "Running", mismatch: "critical" }, undefined, undefined, false, undefined, false),
    measurement("motor_current", "Motor current", "Last value 18.6 A", 18.6, "A", "Required freshness*: ≤5 sec", { type: "band", min: 17.5, max: 20.5, outside: "critical" }, undefined, "Stale 07:42", true, undefined, false),
    measurement("loop_dp", "Loop differential pressure", "Last value 12.1 psid", 12.1, "psid", "Required freshness*: ≤5 sec", { type: "band", min: 9, max: 15, outside: "critical" }, undefined, "Stale 07:40", true, undefined, false),
    measurement("rack_temp", "Rack inlet temperature", "74.1°F", 74.1, "°F", "ASHRAE recommended: 64.4–80.6°F", { type: "band", min: 64.4, max: 80.6, outside: "warning" }, undefined, "Fresh 1.6 sec", true),
    measurement("stability", "Stability window", "Not calculated", undefined, undefined, "All required inputs valid", { type: "equals", expected: "15:00 / 15:00", mismatch: "critical" }, undefined, undefined, false, undefined, false),
  ],
};

export const outcomes: Record<ResultKey, ReferenceOutcome> = {
  recovery: { key: "recovery", label: "Recovery established", measurements: outcomeMeasurements.recovery, reason: "All required inputs are current and valid, the pump is running, current and pressure are inside their approved bands, rack temperature remains in range, and the full stability window has elapsed.", workStatus: "SAP WO-18427 · Closed at 15:02:41", operatingResult: "Established at 15:17:42", resultBasis: "qualified_measurements" },
  partial: { key: "partial", label: "Partial recovery", measurements: outcomeMeasurements.partial, reason: "The pump is running, but loop pressure and stability criteria are not yet satisfied.", workStatus: "SAP WO-18427 · Closed at 15:02:41", resultBasis: "qualified_measurements" },
  failed: { key: "failed", label: "Failed intervention", measurements: outcomeMeasurements.failed, reason: "SAP WO-18427 is closed, but CHWP-02 remains stopped and the required pressure has not returned.", workStatus: "SAP WO-18427 · Closed at 15:02:41", resultBasis: "qualified_measurements" },
  recurrence: { key: "recurrence", label: "Recurrence detected", measurements: outcomeMeasurements.recurrence, reason: "The same pump-status mismatch returned 11 minutes and 32 seconds after recovery was first established.", workStatus: "WO-18427 closed · Response reopened", priorRecoveryAt: "15:17:42", recurrenceElapsed: "11:32", resultBasis: "qualified_measurements" },
  insufficient: { key: "insufficient", label: "Insufficient return data", measurements: outcomeMeasurements.insufficient, reason: "Pump status, current, and pressure are stale. No operating result can be established from the available measurements.", workStatus: "SAP WO-18427 · Closed at 15:02:41", resultBasis: "qualified_measurements" },
};

const wastewaterEstimateSeconds = Math.round(((9 - 7.8) / 0.18) * 60);
const initialSpecificPower = round1((355 / 1860) * 100);
const recoverySpecificPower = round1((241 / 1260) * 100);
const initialPressureDrop = round1(104 - 88.6);
const initialPressureDropPercent = round1((initialPressureDrop / 104) * 100);
const recoveryPressureDrop = round1(103 - 97.1);
const recoveryPressureDropPercent = round1((recoveryPressureDrop / 103) * 100);

export const industrySnapshots = {
  cooling: {
    owner: "Maya Chen · Critical Facilities · DC-03 / Hall 3",
    context: "CHWP-02 · Cooling Loop B · N+1 secondary pumping path",
    incident: [...coolingReference.incident.slice(1), measurement("reduced_time", "Time on reduced protection", "45:24", 2724, "sec", "Reference event duration*", { type: "informational" }, undefined, undefined, false, "Informational"), measurement("required_stability", "Required recovery stability", "15:00", 900, "sec", "Customer-approved result criterion*", { type: "informational" }, undefined, undefined, false, "Informational")],
    recovery: ["Pump status · Running", "Motor current · 18.7 A", "Differential pressure · 12.4 psid", "Stability · 15:00 / 15:00", "Recurrence window · 24 hours"],
    result: "Recovery requires Running status, 17.5–20.5 A motor current, 9.0–15.0 psid pressure, temperature in range, and a complete 15-minute stability window.",
  },
  wastewater: {
    owner: "Luis Ortega · Collection Systems · North District / LS-07",
    context: "LS-07 · WW-07 · Duty pump P-102 · Standby pump P-103",
    incident: [
      measurement("ww_level", "Wet-well level", "7.8 ft", 7.8, "ft", "Normal band*: 4.0–6.0 ft; high-high 9.0 ft", { type: "band", min: 4, max: 6, outside: "warning" }, undefined, "Fresh 1.2 sec", true),
      measurement("ww_rate", "Level rate of change", "+0.18 ft/min", 0.18, "ft/min", "Expected while pumping*: negative", { type: "maximum", max: 0, above: "critical" }, "↑ adverse", "Fresh 1.3 sec", true),
      measurement("ww_status", "Pump P-102 status", "Running", undefined, undefined, "Required: Running", { type: "equals", expected: "Running", mismatch: "critical" }),
      measurement("ww_current", "Motor current", "42.7 A", 42.7, "A", "Running baseline*: 31.0–36.0 A", { type: "band", min: 31, max: 36, outside: "critical" }, undefined, "Fresh 1.4 sec", true),
      measurement("ww_flow", "Discharge flow", "310 GPM", 310, "GPM", "Expected*: 760–840 GPM", { type: "band", min: 760, max: 840, outside: "critical" }, undefined, "Fresh 1.6 sec", true),
      measurement("ww_standby", "Standby capacity", "0 GPM", 0, "GPM", "Required*: ≥760 GPM", { type: "minimum", min: 760, below: "critical" }, undefined, "Fresh 1.7 sec", true),
    ],
    derived: `Current-rate estimate · approximately ${formatDuration(wastewaterEstimateSeconds)} to 9.0 ft high-high level`,
    recovery: ["Wet-well level · 5.1 ft · ↓0.26 ft/min", "Pump current · 34.2 A", "Discharge flow · 804 GPM", "Drawdown cycles · 3 / 3", "High-high events · 0", "SSO volume · 0 gal", "Detection-to-dispatch · 04:12"],
    result: "Pumping capacity restored over three complete wet-well cycles; no overflow occurred in the reference event.",
  },
  air: {
    owner: "Priya Nair · Utilities & Reliability · Assembly Plant 2 / Zone 4",
    context: "AH-01 · Zone 4 · Scheduled off shift",
    incident: [
      measurement("air_discharge", "Compressor discharge pressure", "104.0 psig", 104, "psig", "Reference operating point*", { type: "informational" }, undefined, "Fresh 1.1 sec", true, "Informational"),
      measurement("air_header", "Zone 4 header pressure", "88.6 psig", 88.6, "psig", "Approved band*: 95.0–100.0 psig", { type: "band", min: 95, max: 100, outside: "critical" }, "↓ adverse", "Fresh 1.3 sec", true),
      measurement("air_drop", "Distribution pressure drop", `${initialPressureDrop.toFixed(1)} psi / ${initialPressureDropPercent.toFixed(1)}%`, initialPressureDropPercent, "%", "Target*: <10% of discharge pressure", { type: "maximum", max: 10, above: "critical" }, undefined, "Fresh 1.3 sec", true),
      measurement("air_flow", "Off-shift flow", "1,860 SCFM", 1860, "SCFM", "Approved baseline*: 1,180–1,320 SCFM", { type: "band", min: 1180, max: 1320, outside: "critical" }, undefined, "Fresh 1.5 sec", true),
      measurement("air_power", "Compressor power", "355 kW", 355, "kW", "Baseline at approved flow*: 225–255 kW", { type: "band", min: 225, max: 255, outside: "critical" }, undefined, "Fresh 1.5 sec", true),
      measurement("air_specific", "Specific power", `${initialSpecificPower.toFixed(1)} kW/100 CFM`, initialSpecificPower, "kW/100 CFM", "Reference*: 18–22 kW/100 CFM", { type: "band", min: 18, max: 22, outside: "warning" }, undefined, "Fresh 1.5 sec", true),
    ],
    derived: "Specific power remains reasonable while total flow and power are excessive, indicating a demand-side loss in the reference scenario.",
    recovery: ["Discharge pressure · 103.0 psig", "Header pressure · 97.1 psig", `Distribution drop · ${recoveryPressureDrop.toFixed(1)} psi / ${recoveryPressureDropPercent.toFixed(1)}%`, "Off-shift flow · 1,260 SCFM", "Compressor power · 241 kW", `Specific power · ${recoverySpecificPower.toFixed(1)} kW/100 CFM`, "Stability · 30:00 / 30:00", "Reference delta · −600 SCFM · −114 kW"],
    result: "Flow and power return to the approved reference configuration while specific power remains 19.1 kW/100 CFM. OEE, MTBF, and MTTR remain affected program metrics, not proof criteria for this event.",
  },
  refrigeration: {
    owner: "Sofia Martinez · Refrigeration Operations · Distribution Center 4 / Freezer 2",
    context: "Freezer 2 · EVAP-02 · R-448A · Frozen packaged food",
    incident: [
      measurement("cold_air", "Freezer room air", "1.0°F", 1, "°F", "Approved band*: −10.0 to 0.0°F", { type: "band", min: -10, max: 0, outside: "critical" }, "↑ 1.1°F/15 min · adverse", "Fresh 1.2 sec", true),
      measurement("cold_product", "Product probe", "−3.1°F", -3.1, "°F", "Product-protection threshold*: ≤0.0°F", { type: "maximum", max: 0, above: "critical" }, undefined, "Fresh 1.3 sec", true),
      measurement("cold_suction", "Suction pressure · R-448A", "11.8 psig", 11.8, "psig", "Approved operating band*: 15.0–19.0 psig", { type: "band", min: 15, max: 19, outside: "critical" }, undefined, "Fresh 1.5 sec", true),
      measurement("cold_superheat", "Superheat", "29.5°F / 16.4 K", 29.5, "°F", "Approved band*: 9–18°F / 5–10 K", { type: "band", min: 9, max: 18, outside: "critical" }, undefined, "Fresh 1.6 sec", true),
      measurement("cold_fan", "Evaporator fan current", "2.1 A", 2.1, "A", "Running baseline*: 3.2–3.8 A", { type: "band", min: 3.2, max: 3.8, outside: "critical" }, undefined, "Fresh 1.4 sec", true),
      measurement("cold_defrost", "Time since defrost", "8 h 47 min", 8.783, "h", "Reference schedule*: 6 h", { type: "maximum", max: 6, above: "warning" }, undefined, undefined, true),
    ],
    recovery: ["Room air · −4.2°F · ↓0.6°F/15 min · desirable", "Product probe · −4.0°F", "Suction pressure · 16.6 psig", "Superheat · 13.0°F / 7.2 K", "Fan current · 3.5 A", "Next defrost · 22 min · band 18–25 min", "Stability · 45:00 / 45:00", "Product exposure above 0°F · 0 min", "Pull-down recovery · 34 min", "No recurrence during 24-hour reference window"],
    result: "Refrigeration and product-protection criteria recover in the reference event. OTIF remains a downstream logistics KPI, not a claimed result of this event.",
  },
} as const;

export type OperatingScenarioKey = keyof typeof industrySnapshots;

export type OperatingScenario = {
  key: OperatingScenarioKey;
  slug: string;
  route: string;
  legacyRoutes: readonly string[];
  menuLabel: string;
  industry: string;
  operatingProblem: string;
  thesis: string;
  condition: string;
  conditionDetail: string;
  severity: RagStatus;
  owner: string;
  context: string;
  identity: ReadonlyArray<readonly [string, string]>;
  incident: readonly ReferenceMeasurement[];
  qualification?: readonly ReferenceMeasurement[];
  sourceReferences?: ReadonlyArray<readonly [string, string]>;
  systems: ReadonlyArray<{ name: string; evidence: string; retains: string }>;
  people: ReadonlyArray<{ role: string; authority: string }>;
  response: ReadonlyArray<{ stage: string; product: string; mode: "AUTO" | "ASSIST" | "HUMAN AUTHORITY"; detail: string }>;
  timeline: ReadonlyArray<readonly [string, string]>;
  workHandoffs: readonly string[];
  recovery: readonly string[];
  recoveryCriteria: readonly string[];
  stabilityPeriod: string;
  recurrenceWindow: string;
  resultSummary: string;
  programMetrics: readonly string[];
  eventProof: readonly string[];
  referenceBasis: ReadonlyArray<{ label: string; url: string; note: string }>;
  proofPosture: readonly string[];
  claimMaturity: "demonstrated";
  disclosure: string;
};

const sharedResultBranches = [
  "Recovery established: every required input is current and valid, every criterion passes, and the full stability period has elapsed.",
  "Partial recovery: at least one criterion or the required stability duration remains unsatisfied.",
  "Failed intervention: work is complete while core operating criteria remain unsatisfied.",
  "Recurrence detected: the same qualified impairment returns inside the configured recurrence window.",
  "Insufficient return data: a required input is missing, stale, quarantined, rejected, or unresolved.",
] as const;

export const operatingScenarios: Record<OperatingScenarioKey, OperatingScenario> = {
  cooling: {
    key: "cooling",
    slug: "data-center-cooling",
    route: "/use-cases/data-center-cooling",
    legacyRoutes: ["/data-center-cooling", "/use-cases/data-centers"],
    menuLabel: "Cooling Redundancy: Data Centers",
    industry: "Data centers",
    operatingProblem: "Chilled-water pump redundancy",
    thesis: "The Thermal Threat",
    condition: "Cooling Loop B · Reduced redundancy",
    conditionDetail: "CHWP-02 received a RUN command but remains Stopped. The secondary pumping path is unavailable while Hall 3 rack inlet temperature remains inside its current range.",
    severity: "critical",
    owner: industrySnapshots.cooling.owner,
    context: industrySnapshots.cooling.context,
    identity: [
      ["Issue", coolingReference.identity.issue], ["Facility", coolingReference.identity.facility], ["Location", coolingReference.identity.location],
      ["System", coolingReference.identity.system], ["Asset", coolingReference.identity.asset], ["Topology role", coolingReference.identity.redundancyRole],
    ],
    incident: industrySnapshots.cooling.incident,
    qualification: coolingReference.qualification,
    sourceReferences: coolingReference.sourceReferences,
    systems: [
      { name: "BMS / SCADA", evidence: "RUN command, run feedback, current, differential pressure, and alarms", retains: "Local monitoring and deterministic control" },
      { name: "Historian / DCIM", evidence: "Time-correct trends, rack inlet temperature, and retained operating data", retains: "Source history and facility context" },
      { name: "SAP EAM", evidence: "Equipment CHWP-02 and work order WO-18427", retains: "Maintenance system-of-record authority" },
      { name: "Mechanical provider", evidence: "Dispatch M-88214, ETA, field findings, and completion evidence", retains: "Field execution under customer authority" },
    ],
    people: [
      { role: "Maya Chen · Critical Facilities", authority: "Owns the response and acknowledges the Condition" },
      { role: "DC-03 Critical Facilities", authority: "Retains mechanical isolation, LOTO, and consequential control authority" },
      { role: "Mechanical service provider", authority: "Performs authorized inspection and repair; cannot declare recovery" },
    ],
    response: [
      { stage: "Evidence", product: "Infinit-Signal", mode: "AUTO", detail: "Preserve and qualify command, feedback, current, pressure, temperature, time, quality, and source authority." },
      { stage: "Understand", product: "Singularity", mode: "AUTO", detail: "Connect the qualified mismatch to CHWP-02, Cooling Loop B, the protected hall, redundancy role, and operating history." },
      { stage: "Decide", product: "Infinit-Flow", mode: "ASSIST", detail: "Evaluate cooling risk, current protection, policy, and available responses before determining that facilities intervention is appropriate." },
      { stage: "Coordinate", product: "Infinit-Flow", mode: "ASSIST", detail: "Assign Maya Chen, start the acknowledgement timer, create SAP work, and coordinate provider dispatch." },
      { stage: "Act", product: "Customer + provider", mode: "HUMAN AUTHORITY", detail: "Retain isolation, LOTO, field work, safety, and customer-governed control action." },
      { stage: "Verify", product: "Infinit-Signal + Singularity", mode: "AUTO", detail: "Infinit-Signal qualifies return evidence; Singularity establishes the canonical Outcome; Infinit-Control presents the live evidence and result independently of SAP closure." },
    ],
    timeline: coolingReference.timeline,
    workHandoffs: [coolingReference.coordination.sapWork, coolingReference.coordination.providerDispatch, coolingReference.coordination.approval, coolingReference.coordination.fieldAuthority],
    recovery: industrySnapshots.cooling.recovery,
    recoveryCriteria: ["Pump status Running", "Motor current 17.5–20.5 A", "Loop differential pressure 9.0–15.0 psid", "Rack inlet temperature 64.4–80.6°F", "Pressure variation ≤±0.5 psid", "Complete 15:00 stability window"],
    stabilityPeriod: coolingReference.identity.requiredStability,
    recurrenceWindow: coolingReference.identity.recurrenceWindow,
    resultSummary: industrySnapshots.cooling.result,
    programMetrics: ["Cooling availability", "Reduced-protection duration", "Maintenance response time", "Energy performance"],
    eventProof: ["Pump run feedback", "Motor current", "Loop differential pressure", "Rack inlet temperature", "Pressure stability", "Current data quality"],
    referenceBasis: [{ label: "ASHRAE thermal guidelines reference card", url: "https://www.ashrae.org/file%20library/technical%20resources/bookstore/supplemental%20files/therm-gdlns-5th-r-e-refcard.pdf", note: "Supports the 64.4–80.6°F recommended inlet-temperature range; pressure bands remain site-specific." }],
    proofPosture: ["Controlled Last Mile reference scenario", "Interactive outcome branches are demonstrable", "Production customer validation is not claimed"],
    claimMaturity: "demonstrated",
    disclosure: referenceDisclosure,
  },
  wastewater: {
    key: "wastewater",
    slug: "municipal-wastewater",
    route: "/use-cases/municipal-wastewater",
    legacyRoutes: [],
    menuLabel: "Pumping Capacity: Municipal Wastewater",
    industry: "Municipal wastewater",
    operatingProblem: "Lift-station pumping capacity",
    thesis: "Stop the Overflow Before It Starts",
    condition: "LS-07 · Pumping capacity degraded",
    conditionDetail: "P-102 reports Running, but high current, low discharge flow, and a rising wet well show that the commanded state is not producing required pumping capacity. Standby capacity is unavailable.",
    severity: "critical",
    owner: industrySnapshots.wastewater.owner,
    context: industrySnapshots.wastewater.context,
    identity: [["Station", "LS-07"], ["Wet well", "WW-07"], ["Duty pump", "P-102"], ["Standby pump", "P-103"], ["Force-main scope", "North District"], ["Owner", "Luis Ortega · Collection Systems"]],
    incident: industrySnapshots.wastewater.incident,
    systems: [
      { name: "SCADA", evidence: "Wet-well level, pump status, current, speed, discharge flow, and high-high state", retains: "Local monitoring and pump-control responsibilities" },
      { name: "Historian", evidence: "Level rate, drawdown cycles, starts, flow, and recurrence history", retains: "Source time series and retained station history" },
      { name: "CMMS / work system", evidence: "Pump work, crew assignment, inspection, and repair records", retains: "Maintenance record authority" },
      { name: "Collection Systems field response", evidence: "Isolation, LOTO, inspection, readings, and photos", retains: "Physical work and safety authority" },
    ],
    people: [
      { role: "Luis Ortega · Collection Systems", authority: "Owns the station response and operating decision" },
      { role: "Duty operator", authority: "Confirms station state and approved standby response" },
      { role: "Qualified field crew", authority: "Retains isolation, LOTO, and physical repair authority" },
    ],
    response: [
      { stage: "Evidence", product: "Infinit-Signal", mode: "AUTO", detail: "Preserve and time-align level, level rate, run state, current, shaft speed, flow, standby state, and overflow state." },
      { stage: "Understand", product: "Singularity", mode: "ASSIST", detail: "Connect degraded pumping capacity to the duty pump, wet well, force main, standby state, and service-area context while preserving cause uncertainty." },
      { stage: "Decide", product: "Infinit-Flow", mode: "ASSIST", detail: "Evaluate overflow risk, available standby capacity, site procedure, and response options before advancing field intervention." },
      { stage: "Coordinate", product: "Infinit-Flow", mode: "AUTO", detail: "Create one case across pump, wet well, force main, service area, duty operator, and qualified crew." },
      { stage: "Act", product: "Customer field response", mode: "HUMAN AUTHORITY", detail: "Apply the approved SOP, coordinate standby capacity, and retain isolation and LOTO authority." },
      { stage: "Verify", product: "Infinit-Signal + Singularity", mode: "AUTO", detail: "Infinit-Signal qualifies return evidence; Singularity establishes the canonical Outcome from restored drawdown, current, flow, and cycle criteria; Infinit-Control presents the live state." },
    ],
    timeline: [["00:00", "Capacity Condition qualified"], ["04:12", "Detection-to-dispatch complete"], ["06:40", "Current-rate estimate to high-high if the rate persists"], ["3 cycles", "Complete drawdown cycles required for recovery"]],
    workHandoffs: ["Duty operator notified", "Qualified crew dispatched", "Isolation and LOTO retained by Collection Systems", "Field readings and photos attached to the case"],
    recovery: industrySnapshots.wastewater.recovery,
    recoveryCriteria: ["Wet-well level 5.1 ft and falling 0.26 ft/min", "Pump current 34.2 A", "Discharge flow 804 GPM", "Three of three complete drawdown cycles", "No high-high event", "Current valid evidence"],
    stabilityPeriod: "3 / 3 complete drawdown cycles",
    recurrenceWindow: "Configured station recurrence window",
    resultSummary: industrySnapshots.wastewater.result,
    programMetrics: ["SSO frequency", "SSO volume", "Spill response time", "Pump-station failure rate"],
    eventProof: ["Wet-well level and rate", "Pump current", "Discharge flow", "Complete drawdown cycles", "High-high events", "Current data quality"],
    referenceBasis: [{ label: "Xylem integrated wastewater pumping intelligence", url: "https://www.xylem.com/siteassets/support/tekniska-rapporter/white-papers-pdf/integrated_intelligence_white_paper.pdf", note: "Supports correlating shaft behavior, motor current, and speed; scenario bands remain site-specific assumptions." }],
    proofPosture: ["Controlled Last Mile reference scenario", "06:40 is a current-rate linear estimate, not a predictive model", "No customer result or regulatory-compliance claim"],
    claimMaturity: "demonstrated",
    disclosure: referenceDisclosure,
  },
  air: {
    key: "air",
    slug: "manufacturing-compressed-air",
    route: "/use-cases/manufacturing-compressed-air",
    legacyRoutes: ["/use-cases/manufacturing"],
    menuLabel: "Compressed-Air Loss: Manufacturing",
    industry: "Manufacturing",
    operatingProblem: "Compressed-air loss and abnormal demand",
    thesis: "Find the Air Loss Before Production Does",
    condition: "AH-01 · Abnormal off-shift demand",
    conditionDetail: "Specific compressor efficiency remains reasonable while Zone 4 pressure is low and total off-shift flow and power are excessive, pointing to a demand-side loss in the reference scenario.",
    severity: "critical",
    owner: industrySnapshots.air.owner,
    context: industrySnapshots.air.context,
    identity: [["Compressor header", "AH-01"], ["Affected zone", "Zone 4"], ["Site", "Assembly Plant 2"], ["Production state", "Scheduled off shift"], ["Owner", "Priya Nair"], ["Team", "Utilities & Reliability"]],
    incident: industrySnapshots.air.incident,
    systems: [
      { name: "Compressor controls", evidence: "Discharge pressure, power, loaded state, cycle time, and dryer differential pressure", retains: "Compressor sequencing and local control" },
      { name: "Plant historian", evidence: "Header pressure, SCFM, power, valve state, and off-shift baseline", retains: "Source history and trend context" },
      { name: "MES / schedule", evidence: "Scheduled off-shift production state and known demand events", retains: "Production schedule authority" },
      { name: "Maintenance / reliability", evidence: "Leak survey, ultrasonic findings, isolation, and repair evidence", retains: "Physical-work authority and maintenance record" },
    ],
    people: [
      { role: "Priya Nair · Utilities & Reliability", authority: "Owns the utility response and affected-zone prioritization" },
      { role: "Production operations", authority: "Confirms production state and approved isolation window" },
      { role: "Maintenance technician", authority: "Performs ultrasonic inspection, isolation, and repair under site procedure" },
    ],
    response: [
      { stage: "Evidence", product: "Infinit-Signal", mode: "AUTO", detail: "Preserve and combine supply pressure, zone pressure, flow, power, loaded state, dryer differential pressure, valve state, and production state." },
      { stage: "Understand", product: "Singularity", mode: "ASSIST", detail: "Connect the utility Condition to compressor, header, affected zone, production state, and history while separating expected demand from loss." },
      { stage: "Decide", product: "Infinit-Flow", mode: "ASSIST", detail: "Evaluate pressure risk, production demand, energy context, isolation options, and policy before advancing inspection." },
      { stage: "Coordinate", product: "Infinit-Flow", mode: "AUTO", detail: "Create one case across compressor, header, Zone 4, affected lines, utilities, production, and maintenance." },
      { stage: "Act", product: "Maintenance + reliability", mode: "HUMAN AUTHORITY", detail: "Inspect the affected zone, classify leak evidence, authorize isolation, and repair under customer procedure." },
      { stage: "Verify", product: "Infinit-Signal + Singularity", mode: "AUTO", detail: "Infinit-Signal qualifies return evidence; Singularity establishes the canonical Outcome from flow, pressure, power, specific power, and stability; Infinit-Control presents the live state." },
    ],
    timeline: [["Initial", "88.6 psig header · 1,860 SCFM · 355 kW"], ["Work", "Ultrasonic inspection and customer-authorized repair"], ["Recovery", "97.1 psig header · 1,260 SCFM · 241 kW"], ["30:00", "Complete stability window"]],
    workHandoffs: ["Utilities owns the Condition", "Production confirms the off-shift baseline", "Maintenance receives affected-zone evidence", "Isolation and repair remain under customer authority"],
    recovery: industrySnapshots.air.recovery,
    recoveryCriteria: ["Header pressure 97.1 psig", "Distribution drop 5.9 psi / 5.7%", "Off-shift flow 1,260 SCFM", "Compressor power 241 kW", "Specific power 19.1 kW/100 CFM", "Complete 30:00 stability window"],
    stabilityPeriod: "30:00",
    recurrenceWindow: "Configured off-shift recurrence window",
    resultSummary: industrySnapshots.air.result,
    programMetrics: ["Energy use", "Utility cost", "OEE", "MTBF", "MTTR"],
    eventProof: ["Header and discharge pressure", "Off-shift flow", "Compressor power", "Specific power", "Production state", "Stability duration"],
    referenceBasis: [{ label: "U.S. DOE Compressed Air Sourcebook", url: "https://www.energy.gov/sites/default/files/2016/03/f30/Improving%20Compressed%20Air%20Sourcebook%20version%203.pdf", note: "Supports evaluating pressure, pressure drop, specific power, flow, and production context together." }],
    proofPosture: ["Controlled Last Mile reference scenario", "−600 SCFM and −114 kW are measured-point deltas, not savings", "No annualized, monetized, emissions, or customer-performance claim"],
    claimMaturity: "demonstrated",
    disclosure: referenceDisclosure,
  },
  refrigeration: {
    key: "refrigeration",
    slug: "cold-storage-refrigeration",
    route: "/use-cases/cold-storage-refrigeration",
    legacyRoutes: ["/use-cases/cold-storage"],
    menuLabel: "Refrigeration Capacity: Cold Storage",
    industry: "Cold storage",
    operatingProblem: "Refrigeration capacity loss",
    thesis: "Protect the Product Before Temperatures Rise",
    condition: "Freezer 2 · Refrigeration capacity degraded",
    conditionDetail: "Room air is a late symptom. Low suction pressure, excessive superheat, low evaporator-fan current, and delayed defrost qualify degraded capacity while the product probe remains protected.",
    severity: "critical",
    owner: industrySnapshots.refrigeration.owner,
    context: industrySnapshots.refrigeration.context,
    identity: [["Freezer", "Freezer 2"], ["Evaporator", "EVAP-02"], ["Refrigerant", "R-448A"], ["Product class", "Frozen packaged food"], ["Site", "Distribution Center 4"], ["Owner", "Sofia Martinez · Refrigeration Operations"]],
    incident: industrySnapshots.refrigeration.incident,
    systems: [
      { name: "Refrigeration controls", evidence: "Room air, suction pressure, superheat, fan state/current, and defrost state", retains: "Local refrigeration control and equipment protection" },
      { name: "Product monitoring", evidence: "Product probe and exposure above the product-protection threshold", retains: "Product temperature evidence and QA policy" },
      { name: "Warehouse operations", evidence: "Door state, inventory scope, relocation status, and operating demand", retains: "Inventory movement and warehouse authority" },
      { name: "Refrigeration provider", evidence: "Inspection, coil/fan/defrost/TXV/EEV findings, charge symptoms, and completion", retains: "Qualified field-service execution" },
    ],
    people: [
      { role: "Sofia Martinez · Refrigeration Operations", authority: "Owns the refrigeration response" },
      { role: "Warehouse + QA", authority: "Retain product-protection and relocation decisions" },
      { role: "Qualified refrigeration contractor", authority: "Performs authorized inspection and repair; cannot declare recovery" },
    ],
    response: [
      { stage: "Evidence", product: "Infinit-Signal", mode: "AUTO", detail: "Preserve and qualify room and product temperature, suction pressure, superheat, fan current, defrost, door, and demand evidence." },
      { stage: "Understand", product: "Singularity", mode: "ASSIST", detail: "Connect the Condition to EVAP-02, Freezer 2, affected product, refrigeration state, and history while preserving cause uncertainty." },
      { stage: "Decide", product: "Infinit-Flow", mode: "ASSIST", detail: "Evaluate product-protection policy, operating consequences, available responses, and authority before advancing action." },
      { stage: "Coordinate", product: "Infinit-Flow", mode: "AUTO", detail: "Create one case across EVAP-02, Freezer 2, affected inventory, refrigeration operations, warehouse, QA, and provider." },
      { stage: "Act", product: "Customer + contractor", mode: "HUMAN AUTHORITY", detail: "Protect or relocate product and inspect door, fans, coil, drain, defrost, TXV/EEV, and charge symptoms." },
      { stage: "Verify", product: "Infinit-Signal + Singularity", mode: "AUTO", detail: "Infinit-Signal qualifies return evidence; Singularity establishes the canonical Outcome from pull-down, refrigeration, product-protection, and stability criteria; Infinit-Control presents the live state." },
    ],
    timeline: [["Incident", "1.0°F room air · −3.1°F product probe"], ["Work", "Product protection and qualified refrigeration inspection"], ["34 min", "Reference pull-down recovery time"], ["45:00", "Complete recovery stability"], ["24 hours", "Reference recurrence window"]],
    workHandoffs: ["Refrigeration Operations owns the Condition", "Warehouse and QA receive affected-product context", "Qualified contractor receives diagnostic evidence", "Product and physical-work authority remain with the customer"],
    recovery: industrySnapshots.refrigeration.recovery,
    recoveryCriteria: ["Room air −4.2°F and falling 0.6°F/15 min", "Product probe −4.0°F", "Suction pressure 16.6 psig", "Superheat 13.0°F / 7.2 K", "Evaporator fan current 3.5 A", "Complete 45:00 stability window"],
    stabilityPeriod: "45:00",
    recurrenceWindow: "24 hours",
    resultSummary: industrySnapshots.refrigeration.result,
    programMetrics: ["Product loss", "OTIF", "Refrigeration energy", "Maintenance response time"],
    eventProof: ["Room-air pull-down", "Product probe", "Suction pressure", "Superheat", "Fan current", "Next defrost duration", "Product exposure above 0°F"],
    referenceBasis: [
      { label: "FDA food-storage guidance", url: "https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely", note: "Identifies 0°F / −18°C as the freezer temperature; the tighter room-air band remains a demonstration assumption." },
      { label: "Danfoss TE2 documentation", url: "https://assets.danfoss.com/documents/latest/469584/AI241486443133en-001404.pdf", note: "Supports equipment-specific superheat context." },
      { label: "Honeywell R-448A pressure-temperature reference", url: "https://prod-edam.honeywell.com/content/dam/honeywell-edam/pmt/oneam/en-us/refrigerants/documents/pmt-am-refrigeration-ac-pressure-temp-charts-tech-tool1.pdf", note: "Provides refrigerant-specific pressure-temperature reference context." },
    ],
    proofPosture: ["Controlled Last Mile reference scenario", "Temperature differences preserve both °F and kelvin representations", "No customer product-loss, OTIF, or production validation claim"],
    claimMaturity: "demonstrated",
    disclosure: referenceDisclosure,
  },
};

export const operatingScenarioList = [operatingScenarios.cooling, operatingScenarios.wastewater, operatingScenarios.air, operatingScenarios.refrigeration] as const;
export const resultBranchDefinitions = sharedResultBranches;

export function getOperatingScenario(slug: string) {
  return operatingScenarioList.find((scenario) => scenario.slug === slug);
}

export function deriveRag(measurement: ReferenceMeasurement): RagStatus {
  if (measurement.valid === false) return "unknown";
  const rule = measurement.rule;
  if (rule.type === "informational") return "info";
  if (rule.type === "equals") return measurement.value === rule.expected ? "normal" : rule.mismatch;
  const value = measurement.numericValue;
  if (value === undefined || Number.isNaN(value)) return "unknown";
  if (rule.type === "band") return value >= rule.min && value <= rule.max ? "normal" : rule.outside;
  if (rule.type === "minimum") return value >= rule.min ? "normal" : rule.below;
  if (rule.type === "withinMaximum") return value <= rule.max ? rule.within : "normal";
  return value <= rule.max ? "normal" : rule.above;
}

export function ragLabel(measurement: ReferenceMeasurement): string {
  const status = deriveRag(measurement);
  if (measurement.statusLabel && (status === "normal" || status === "info")) return measurement.statusLabel;
  return { critical: "Critical", warning: "Warning", normal: "Normal", unknown: "No valid data", info: "Commanded" }[status];
}

export function deriveOutcomeStatus(outcome: ReferenceOutcome): RagStatus {
  const statuses = outcome.measurements.map(deriveRag);
  if (statuses.includes("unknown")) return "unknown";
  if (statuses.includes("critical")) return "critical";
  if (statuses.includes("warning")) return "warning";
  return "normal";
}

export function measurementAriaLabel(measurement: ReferenceMeasurement): string {
  return [ragLabel(measurement), `${measurement.name} is ${measurement.value}`, measurement.reference, measurement.trend, measurement.freshness].filter(Boolean).join("; ");
}

export function runPlatformReferenceAssertions() {
  const recovery = outcomes.recovery.measurements.map(deriveRag);
  if (recovery.some((status) => status !== "normal")) throw new Error("Recovery requires all measurements to be normal.");
  const failed = outcomes.failed.measurements.map(deriveRag);
  if (failed.every((status) => status === "normal")) throw new Error("Failed intervention cannot display all-normal required measurements.");
  if (!outcomes.recurrence.priorRecoveryAt || !outcomes.recurrence.recurrenceElapsed) throw new Error("Recurrence requires prior recovery and elapsed recurrence time.");
  if (!outcomes.insufficient.measurements.some((item) => deriveRag(item) === "unknown")) throw new Error("Insufficient data requires a missing, stale, quarantined, or unresolved input.");
  const stability = outcomes.recovery.measurements.find((item) => item.id === "stability");
  if (!stability || (stability.numericValue ?? 0) < 900) throw new Error("Recovery cannot appear before the full stability window.");
  if (Object.values(outcomes).some((outcome) => outcome.resultBasis !== "qualified_measurements")) throw new Error("SAP status cannot independently set the operating result.");
  const expectedOutcomeStates: Record<ResultKey, RagStatus> = { recovery: "normal", partial: "warning", failed: "critical", recurrence: "critical", insufficient: "unknown" };
  for (const [key, outcome] of Object.entries(outcomes) as [ResultKey, ReferenceOutcome][]) {
    if (deriveOutcomeStatus(outcome) !== expectedOutcomeStates[key]) throw new Error(`${key} outcome RAG does not agree with its measurements.`);
  }
  const telemetrySignatures = Object.values(outcomes).map((outcome) => outcome.measurements.map((item) => `${item.id}:${item.value}`).join("|"));
  if (new Set(telemetrySignatures).size !== telemetrySignatures.length) throw new Error("Every result state must use a distinct telemetry dataset.");
  const allMeasurements = [
    ...coolingReference.incident,
    ...coolingReference.qualification,
    ...Object.values(outcomes).flatMap((outcome) => outcome.measurements),
    ...Object.values(industrySnapshots).flatMap((snapshot) => [...snapshot.incident]),
  ];
  for (const item of allMeasurements) {
    if (item.analog && !item.unit) throw new Error(`Analog measurement ${item.id} is missing an engineering unit.`);
    if (!item.reference.trim()) throw new Error(`Measurement ${item.id} is missing a reference basis.`);
    if (!ragLabel(item)) throw new Error(`Measurement ${item.id} has no derived RAG label.`);
  }
  if (wastewaterEstimateSeconds !== 400) throw new Error("Wastewater current-rate estimate must equal 06:40.");
  if (initialSpecificPower !== 19.1 || recoverySpecificPower !== 19.1) throw new Error("Compressed-air specific-power calculation failed.");
  if (initialPressureDrop !== 15.4 || initialPressureDropPercent !== 14.8) throw new Error("Initial compressed-air pressure-drop calculation failed.");
  if (recoveryPressureDrop !== 5.9 || recoveryPressureDropPercent !== 5.7) throw new Error("Recovery compressed-air pressure-drop calculation failed.");
  if (!industrySnapshots.refrigeration.incident.some((item) => item.value === "29.5°F / 16.4 K") || !industrySnapshots.refrigeration.recovery.includes("Superheat · 13.0°F / 7.2 K")) throw new Error("Cold-storage superheat conversions drifted from the canonical contract.");
  if (coolingReference.timeline.find(([time]) => time === "15:02:41")?.[1] !== "Field work marked complete in SAP") throw new Error("Cooling work-close timestamp drifted from the canonical contract.");
  if (coolingReference.timeline.find(([time]) => time === "15:17:41")?.[1] !== "Fifteen-minute measurement window completes") throw new Error("Cooling stability-complete timestamp drifted from the canonical contract.");
  if (coolingReference.timeline.find(([time]) => time === "15:17:42")?.[1] !== "Recovery established when recovery criteria are met") throw new Error("Cooling recovery timestamp drifted from the canonical contract.");
  if (new Set(operatingScenarioList.map((scenario) => scenario.route)).size !== operatingScenarioList.length) throw new Error("Every use case requires one canonical route.");
  if (operatingScenarioList.some((scenario) => scenario.disclosure !== referenceDisclosure || scenario.claimMaturity !== "demonstrated")) throw new Error("Every scenario requires the controlled reference disclosure and demonstrated maturity.");
  return true;
}

function measurement(id: string, name: string, value: string, numericValue: number | undefined, unit: string | undefined, reference: string, rule: Rule, trend?: string, freshness?: string, analog = false, statusLabel?: ReferenceMeasurement["statusLabel"], valid = true): ReferenceMeasurement {
  return { id, name, value, numericValue, unit, reference, rule, trend, freshness, analog, statusLabel, valid };
}

function round1(value: number) { return Math.round(value * 10) / 10; }
function formatDuration(seconds: number) { return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`; }

runPlatformReferenceAssertions();
