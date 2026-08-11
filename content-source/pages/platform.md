---
content_id: PAGE-PLATFORM-001
status: approved
owner: Platform Product Marketing
last_reviewed: 2026-08-06
claim_maturity: [designed, demonstrated]
depends_on: [GOV-DOCTRINE-001, USECASE-DC-COOLING-001, CLAIMS-REGISTRY-001]
used_by: [/platform]
---

# Platform Page Contract and Copy

## Job

Show how the four products preserve one operating condition from evidence through verified outcome. Use the data-center cooling reference scenario to demonstrate measurement integrity. Do not turn the page into a general product directory or redesign the approved structure.

## Hero

**Eyebrow:** LAST MILE PLATFORM

**H1:** One accountable operating condition—from first evidence to verified outcome.

**Body:** Last Mile sits above the systems that already run, record, and service physical operations. It qualifies their evidence, resolves one operational identity, coordinates the governed response, and proves recovery from live return measurements.

### Operating-state panel

**Cooling Loop B · Reduced redundancy**
**Critical · Pump CHWP-02 did not start**
**Maya Chen · Critical Facilities · DC-03 / Hall 3**

| Measurement | Current | Reference | State |
|---|---:|---:|---|
| Commanded state | RUN | Requested at 14:32:18 | Commanded |
| Pump status | Stopped | Expected: Running | Critical |
| Motor current | 0.6 A | Running baseline*: 17.5-20.5 A | Critical |
| Loop differential pressure | 4.2 psid | Approved band*: 9.0-15.0 psid | Critical · down 2.1 psid/5 min |
| Rack inlet temperature | 73.6°F | Recommended: 64.4-80.6°F | Normal · up 0.3°F/5 min |

**Footer:** CHWP-02 is commanded to run but remains stopped. Cooling Loop B has lost its secondary pumping path; Hall 3 temperatures remain inside their current range.

## Ownership comparison

### What the Existing Stack Retains

- BMS/SCADA commands, status, measurements, and alarms.
- Historian trends and retained operating data.
- SAP work order and equipment records.
- Provider dispatch and field-service updates.
- Facilities, IT, and field operating authority.

### What Last Mile Adds

- One canonical asset and topology across source identities.
- One qualified Condition instead of disconnected alarms.
- One case across teams, systems, and providers.
- One time-correct evidence chain from source to result.
- One operating result established from return telemetry.

## Animated outcome loop

### 1. Detect - Infinit-Signal

Display exact values from `USECASE-DC-COOLING-001`; do not use ON/OFF, near zero, stable, or declining as standalone measurements.

### 2. Qualify - Infinit-Signal and Singularity

Show source authority, event time, 1.8-second latency, 98/100 quality, live-event classification, mapping confidence 1.00, five accepted records, and two quarantined records. Explain the duplicate and 47-second-stale pressure sample.

### 3. Resolve - Singularity / SSOM

Show the representative source references and resolved topology. Label all named source products and paths as representative; do not imply validated integrations.

### 4. Coordinate - Infinit-Flow

Show Maya Chen; acknowledgement 01:49 / 05:00 Normal; SAP `WO-18427` In progress; dispatch `M-88214` Accepted; ETA 18 min; mechanical isolation authorized; field authority retained by DC-03 Critical Facilities.

### 5. Track - Infinit-Control

Persistent panel: issue `LM-CHWP-02-0471`; Critical; CHWP-02; Reduced redundancy; Maya Chen; Critical Facilities · DC-03 / Hall 3; acknowledgement complete; SAP work and provider dispatch; current state Pump stopped; result Awaiting qualified return measurements.

### 6. Verify - Singularity / SSOM and Infinit-Control

Provide controls for five coherent datasets: Recovery established, Partial recovery, Failed intervention, Recurrence detected, and Insufficient return data. Changing the heading without changing telemetry is prohibited.

## Outcome principle section

**Heading:** The work order can close before the operating condition is recovered.

**Body:** In the reference timeline, SAP work closes at 15:02:41. Recovery is not established until 15:17:42, after the complete fifteen-minute measurement window proves the pump is running, current and differential pressure are in band, rack inlet temperature remains in range, and pressure is stable.

## Industry use-case viewer

Keep the four supplied process-map images unchanged. Under each modal image, render the corresponding compact numerical snapshot from the use-case contract with named owner, units, bands, state text/icons, and result summary.

## Reference disclosure

Reference values describe a controlled Last Mile demonstration. External guidance is identified where applicable; equipment limits, commissioned setpoints, operating bands, response authority, and acceptance criteria remain customer- and site-specific.

## CTA

**Heading:** See one physical operation from signal to proof.

**CTA:** Explore the operating use cases

## Route scope

Change only the Platform route, its exclusive components, data, styles, and tests. Preserve navigation stacking. Do not use this contract as permission to redesign Home, Products, or dedicated use-case pages.
