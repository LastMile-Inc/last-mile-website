---
content_id: USECASE-AIR-001
status: approved
owner: Use-Case Product and Domain Review
last_reviewed: 2026-08-13
claim_maturity: [demonstrated]
depends_on: [PROD-SIGNAL-001, PROD-SINGULARITY-001, PROD-FLOW-001, PROD-CONTROL-001]
used_by: [/platform, /use-cases/manufacturing-compressed-air, demos]
---

# Manufacturing Compressed Air - Reference Scenario

## Public thesis

**Find the Air Loss Before Production Does.** Off-shift demand and pressure loss expose the problem before the next production run.

## Identity and ownership

- Compressor header: `AH-01`
- Affected zone: `Zone 4`
- Production state: `Scheduled off shift`
- Owner: **Priya Nair · Utilities & Reliability · Assembly Plant 2 / Zone 4**

## Incident snapshot

| Measurement | Current value | Reference | State |
|---|---:|---:|---|
| Compressor discharge pressure | 104.0 psig | Reference operating point* | Informational |
| Zone 4 header pressure | 88.6 psig | Approved band*: 95.0-100.0 psig | Critical |
| Distribution pressure drop | 15.4 psi / 14.8% | Target*: <10% of discharge pressure | Critical |
| Off-shift flow | 1,860 SCFM | Approved baseline*: 1,180-1,320 SCFM | Critical |
| Compressor power | 355 kW | Baseline at approved flow*: 225-255 kW | Critical |
| Specific power | 19.1 kW/100 CFM | Reference*: 18-22 kW/100 CFM | Normal |
| Production state | Scheduled off shift | Off-shift baseline applies | Normal |

The combination is intentional: specific compressor efficiency remains reasonable while flow and total power are excessive. That points to a demand-side loss/distribution problem rather than simply an inefficient compressor.

## Calculations

- Initial specific power: `355 / 1,860 x 100 = 19.1 kW/100 CFM`.
- Initial pressure drop: `104.0 - 88.6 = 15.4 psi`; `15.4 / 104.0 = 14.8%`.

## Condition-to-outcome response

- **Evidence:** combine supply pressure, zone pressure, flow, power, loaded state, cycle time, valve state, dryer differential pressure, and production state.
- **Qualify:** separate scheduled demand from abnormal off-shift loss; exclude known blow-off events; qualify degraded service/abnormal demand.
- **Coordinate:** create one case; resolve compressor -> header -> zone -> affected lines; notify utilities and maintenance; prioritize operating impact.
- **Work:** recommend affected-zone survey and ultrasonic inspection; preserve customer authority for isolation and repair; capture leak class and evidence.
- **Verify:** compare off-shift flow, pressure, power, specific power, and stability with the reference configuration; monitor recurrence.

## Reference recovery

- Discharge pressure: **103.0 psig**
- Header pressure: **97.1 psig**
- Distribution drop: **5.9 psi / 5.7%**
- Off-shift flow: **1,260 SCFM**
- Compressor power: **241 kW**
- Specific power: **19.1 kW/100 CFM**
- Stability window: **30:00 / 30:00**

Calculations: `241 / 1,260 x 100 = 19.1 kW/100 CFM`; `103.0 - 97.1 = 5.9 psi`; `5.9 / 103.0 = 5.7%`.

Reference-scenario deltas only:

- Flow delta: **-600 SCFM**
- Power delta at the measured operating point: **-114 kW**

Do not convert these values into annual savings, cost avoidance, ROI, emissions, or customer claims. OEE, MTBF, and MTTR are affected program metrics, not proof criteria for this event.

## Reference basis

The U.S. Department of Energy recommends evaluating compressed-air pressure, pressure drop, specific power, flow, and production context together, and notes that demand-side improvements may reduce total energy without materially changing specific power.

- DOE Compressed Air Sourcebook: https://www.energy.gov/sites/default/files/2016/03/f30/Improving%20Compressed%20Air%20Sourcebook%20version%203.pdf
