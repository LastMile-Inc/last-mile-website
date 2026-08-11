---
content_id: USECASE-COLD-001
status: approved
owner: Use-Case Product and Domain Review
last_reviewed: 2026-08-06
claim_maturity: [demonstrated]
depends_on: [PROD-SIGNAL-001, PROD-SINGULARITY-001, PROD-FLOW-001, PROD-CONTROL-001]
used_by: [/platform, /use-cases/cold-storage-refrigeration, demos]
---

# Cold-Storage Refrigeration - Reference Scenario

## Public thesis

**Protect product, prove recovery.** One accountable refrigeration event—from early capacity loss to verified product protection.

## Identity and ownership

- Freezer: `Freezer 2`
- Evaporator: `EVAP-02`
- Refrigerant: `R-448A`
- Product class: `Frozen packaged food`
- Owner: **Sofia Martinez · Refrigeration Operations · Distribution Center 4 / Freezer 2**

## Incident snapshot

| Measurement | Current value | Reference | State |
|---|---:|---:|---|
| Freezer room air | 1.0°F | Approved band*: -10.0 to 0.0°F | Critical · up 1.1°F/15 min |
| Product probe | -3.1°F | Product-protection threshold*: <=0.0°F | Normal |
| Suction pressure | 11.8 psig | Approved R-448A operating band*: 15.0-19.0 psig | Critical |
| Superheat | 29.5°F / 16.4 K | Approved band*: 9-18°F / 5-10 K | Critical |
| Evaporator fan current | 2.1 A | Running baseline*: 3.2-3.8 A | Critical |
| Time since defrost | 8 h 47 min | Reference schedule*: 6 h | Warning |

## Accountable Condition

Room temperature is a late symptom. Low suction pressure, excessive superheat, low fan current, delayed defrost, airflow, door state, and cooling demand together qualify “Refrigeration capacity degraded - Freezer 2” while preserving diagnostic uncertainty among icing, airflow, charge, valve, fan, and door causes.

## Condition-to-outcome response

- **Evidence:** room temperature/setpoint/rate, product probe, evaporator temperature, suction pressure, superheat, fan state/current, defrost state/duration, door state, and cooling demand.
- **Qualify:** require evidence beyond one room-temperature alarm and retain suspected-cause uncertainty.
- **Coordinate:** create one case; resolve evaporator -> freezer zone -> affected inventory; notify refrigeration operations, warehouse, and QA.
- **Work:** present response playbook; protect or relocate product; inspect door, fans, coil, drain, defrost, TXV/EEV, and charge symptoms; route qualified contractor under customer authority.
- **Verify:** contractor completion does not close the case. Require room recovery, stable pull-down, suction/superheat bands, normal next defrost, product protection, and recurrence monitoring.

## Reference recovery

- Room air: **-4.2°F · falling 0.6°F/15 min**
- Product probe: **-4.0°F**
- Suction pressure: **16.6 psig**
- Superheat: **13.0°F / 7.2 K**
- Evaporator fan current: **3.5 A**
- Next defrost duration: **22 min · approved band*: 18-25 min**
- Recovery stability: **45:00 / 45:00**

Reference event evidence:

- Product exposure above 0°F: **0 min**
- Pull-down recovery time: **34 min**
- Recurrence: **Not detected during 24-hour reference window**

OTIF is a downstream logistics KPI. Do not claim that this single event changed OTIF.

## Reference basis

FDA public guidance identifies 0°F / -18°C as the freezer temperature. The tighter -10°F to 0°F room-air band is a Last Mile demonstration assumption. Superheat depends on installed equipment, valve, refrigerant, and design. Displaying suction pressure or calculating superheat requires the refrigerant identity.

- FDA food storage guidance: https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely
- Danfoss TE2 documentation: https://assets.danfoss.com/documents/latest/469584/AI241486443133en-001404.pdf
- Honeywell R-448A pressure-temperature reference: https://prod-edam.honeywell.com/content/dam/honeywell-edam/pmt/oneam/en-us/refrigerants/documents/pmt-am-refrigeration-ac-pressure-temp-charts-tech-tool1.pdf
