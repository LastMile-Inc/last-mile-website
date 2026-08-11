---
content_id: USECASE-DC-COOLING-001
status: approved
owner: Use-Case Product and Domain Review
last_reviewed: 2026-08-06
claim_maturity: [demonstrated]
depends_on: [PROD-SIGNAL-001, PROD-SINGULARITY-001, PROD-FLOW-001, PROD-CONTROL-001]
used_by: [/platform, /use-cases/data-center-cooling, demos]
---

# Data Center Cooling Redundancy - Reference Scenario

## Public thesis

**Cooling redundancy, verified.** One accountable cooling event—from first evidence to proven restoration of protection.

## Scenario identity

| Field | Value |
|---|---|
| Issue | `LM-CHWP-02-0471` |
| Facility | Reference Site `DC-03` |
| Location | Hall 3 |
| System | Cooling Loop B |
| Asset | `CHWP-02` |
| Asset type | Secondary chilled-water pump |
| Redundancy role | N+1 secondary pumping path |
| Owner | Maya Chen |
| Team/location | Critical Facilities · DC-03 / Hall 3 |
| SAP equipment | `CHWP-02` |
| SAP functional location | `DC-03-H3-CHW-LB` |
| SAP work order | `WO-18427` |
| Provider dispatch | `M-88214` |
| Acknowledgement target | 05:00 |
| Required recovery stability | 15:00 |
| Recurrence window | 24 hours |

All names, identifiers, values, and systems form a controlled reference scenario. They do not represent a customer or validated integration.

## Incident snapshot

| Measurement | Current value | Reference | State |
|---|---:|---:|---|
| Commanded state | RUN | Requested at 14:32:18 | Commanded |
| Pump status | Stopped | Expected: Running | Critical |
| Motor current | 0.6 A | Running baseline*: 17.5-20.5 A | Critical |
| Loop differential pressure | 4.2 psid | Approved band*: 9.0-15.0 psid | Critical · down 2.1 psid/5 min |
| Rack inlet temperature | 73.6°F | ASHRAE recommended: 64.4-80.6°F | Normal · up 0.3°F/5 min |

**Condition:** Cooling Loop B · Reduced redundancy
**Overall state:** Critical · Pump CHWP-02 did not start
**Interpretation:** CHWP-02 is commanded to run but remains stopped. Cooling Loop B has lost its secondary pumping path; Hall 3 temperatures remain inside their current range.

## Qualification snapshot

| Qualification | Value | State |
|---|---:|---|
| Source authority | `BMS-DC03-01` | Accepted |
| Event time | 14:32:23.184 local | Accepted |
| Ingest latency | 1.8 sec | Normal · limit <=5 sec |
| Source quality score | 98 / 100 | Normal · minimum 95 |
| Duplicate check | 0 accepted duplicates | Normal |
| Replay classification | Live event | Normal |
| Asset mapping confidence | 1.00 | Normal |
| Accepted records | 5 | Normal |
| Quarantined records | 2 | Warning |

Quarantine detail: one duplicate event and one pressure sample stale by 47 seconds were rejected. Neither contributes to the Condition decision.

## Source references and resolved topology

- Rockwell tag: `B3_CHW_P02_CMD`
- BMS status: `B3_CHW_P02_STS`
- Ignition path: `[DC03]CHW/LoopB/CHWP-02`
- HighByte instance: `dc03.loop_b.chwp_02`
- MQTT topic: `dc03/chw/loop-b/chwp-02/state`
- Historian point: `DC03_CHWP02_AMPS`
- SAP equipment: `CHWP-02`
- Functional location: `DC-03-H3-CHW-LB`

**Topology:** CHWP-02 -> Cooling Loop B -> Hall 3 -> N+1 secondary pumping path.

## Reference timeline

- 14:32:18 - RUN command issued.
- 14:32:23 - Pump status remains Stopped.
- 14:32:26 - Infinit-Signal accepts the qualified mismatch.
- 14:34:07 - Maya Chen acknowledges the response, 01:49 after issue creation.
- 14:35:10 - SAP `WO-18427` created.
- 14:39:28 - Provider dispatch `M-88214` accepted.
- 15:02:41 - Field work marked complete in SAP.
- 15:17:41 - Fifteen-minute measurement window completes.
- 15:17:42 - Recovery established if the recovery dataset is selected.

Work completion occurs 15 minutes before operating recovery is established.

## Outcome datasets

### Recovery established

| Measurement | Value | Requirement | State |
|---|---:|---:|---|
| Pump status | Running | Running | Normal |
| Motor current | 18.7 A | 17.5-20.5 A | Normal |
| Loop differential pressure | 12.4 psid | 9.0-15.0 psid | Normal |
| Rack inlet temperature | 73.6°F | 64.4-80.6°F | Normal |
| Pressure variation | ±0.2 psid / 15 min | <=±0.5 psid | Normal |
| Stability window | 15:00 / 15:00 | 15:00 required | Normal |

SAP `WO-18427` closed at 15:02:41; operating recovery established at 15:17:42.

### Partial recovery

Pump Running; current 18.5 A Normal; differential pressure 8.3 psid Warning; rack inlet 77.0°F Normal and rising 0.4°F/5 min; pressure variation ±0.9 psid over 6 min Warning; stability 06:20 / 15:00 Warning. The pump is running, but pressure and stability criteria are not yet satisfied.

### Failed intervention

Pump Stopped Critical; current 0.7 A Critical; differential pressure 4.8 psid Critical; rack inlet 79.5°F Warning and rising 1.1°F/5 min; stability 00:00 / 15:00 Critical. SAP work is closed, but CHWP-02 remains stopped and pressure has not returned.

### Recurrence detected

Pump Stopped Critical; current 0.8 A Critical; differential pressure 5.1 psid Critical; rack inlet 78.8°F Warning and rising 0.9°F/5 min; recurrence at 11:32 inside the 24-hour window. The response reopens.

### Insufficient return data

Pump status Unknown; motor current last value 18.6 A stale 07:42; differential pressure last value 12.1 psid stale 07:40; rack inlet 74.1°F fresh 1.6 sec and Normal; stability not calculated. No result may be established.

## Reference basis

ASHRAE identifies 18-27°C / 64.4-80.6°F as the recommended inlet-temperature range for Classes A1-A4. Differential-pressure bands are facility-specific; the 9-15 psid range is a demonstration assumption around a 12 psid reference setpoint and must be replaced by commissioned criteria.

- ASHRAE reference card: https://www.ashrae.org/file%20library/technical%20resources/bookstore/supplemental%20files/therm-gdlns-5th-r-e-refcard.pdf
