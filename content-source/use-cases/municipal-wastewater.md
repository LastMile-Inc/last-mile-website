---
content_id: USECASE-WW-001
status: approved
owner: Use-Case Product and Domain Review
last_reviewed: 2026-08-06
claim_maturity: [demonstrated]
depends_on: [PROD-SIGNAL-001, PROD-SINGULARITY-001, PROD-FLOW-001, PROD-CONTROL-001]
used_by: [/platform, /use-cases/municipal-wastewater, demos]
---

# Municipal Wastewater Pumping - Reference Scenario

## Public thesis

**Stop the overflow before it starts.** One accountable station event—from developing impairment to verified pumping capacity.

## Identity and ownership

- Station: `LS-07`
- Wet well: `WW-07`
- Duty pump: `P-102`
- Standby pump: `P-103`
- Owner: **Luis Ortega · Collection Systems · North District / LS-07**

## Incident snapshot

| Measurement | Current value | Reference | State |
|---|---:|---:|---|
| Wet-well level | 7.8 ft | Normal operating band*: 4.0-6.0 ft; high-high: 9.0 ft | Warning |
| Level rate of change | +0.18 ft/min | Effective pumping should produce a negative rate | Critical · rising |
| Pump P-102 status | Running | Running | Normal |
| Motor current | 42.7 A | Running baseline*: 31.0-36.0 A | Critical |
| Shaft speed | 1,762 RPM | 1,740-1,780 RPM | Normal |
| Discharge flow | 310 GPM | Expected*: 760-840 GPM | Critical |
| Standby capacity | 0 GPM | Required*: >=760 GPM | Critical |

**Current-rate estimate to high-high:** `(9.0 - 7.8) / 0.18 = 6.67 minutes`, displayed as approximately **06:40**. This is a linear estimate at the current rate, not a predictive model.

## Accountable Condition

P-102 reports Running, but high current, normal speed, low discharge flow, and a rising wet-well level show that commanded/running state is not producing required pumping capacity. Standby capacity is unavailable, increasing overflow risk.

## Condition-to-outcome response

- **Evidence / Infinit-Signal / AUTO:** continuously time-align wet-well level, rate of change, run state, current, speed, flow, standby state, and overflow state.
- **Qualify / Singularity / AUTO + ASSIST:** qualify “Pumping capacity degraded” when the evidence combination and high-high/standby policy are satisfied; preserve suspected cause and uncertainty.
- **Coordinate / Infinit-Flow / AUTO:** create one case; resolve pump -> wet well -> force main -> service area; notify duty operator; route safe field response; preserve evidence.
- **Work / Infinit-Flow + Control / ASSIST + HUMAN AUTHORITY:** present approved SOP, coordinate standby capacity, dispatch qualified crew, retain isolation/LOTO authority, and capture readings/photos.
- **Verify / Singularity + Control / AUTO:** require restored drawdown across multiple complete cycles, current and flow inside reference bands, no high-high event, and recurrence monitoring.

## Reference recovery

- Wet-well level: **5.1 ft · falling 0.26 ft/min**
- Pump current: **34.2 A**
- Discharge flow: **804 GPM**
- Drawdown cycles passed: **3 / 3**
- High-high events: **0**
- SSO volume: **0 gal**
- Detection-to-dispatch: **04:12**

**Reference result:** Pumping capacity restored over three complete wet-well cycles; no overflow occurred in the reference event.

## Program metrics versus event proof

SSO frequency, SSO volume, spill response time, and pump-station failure rate are program metrics. The event is proved by current valid level, rate, current, flow, cycle, high-high, and recurrence evidence. Do not claim regulatory compliance or customer performance from the reference scenario.

## Reference basis

Xylem describes wastewater clog detection using shaft behavior, motor current, and speed. This supports evidence correlation; Last Mile reference bands remain assumptions requiring site validation.

- Xylem integrated wastewater pumping intelligence: https://www.xylem.com/siteassets/support/tekniska-rapporter/white-papers-pdf/integrated_intelligence_white_paper.pdf
