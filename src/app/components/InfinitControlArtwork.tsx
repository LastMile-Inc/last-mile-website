const mobileControl = (title: string, items: readonly (readonly string[])[]) => <div className="lm-product-art__mobile">
  <strong className="lm-mobile-art__title">{title}</strong>
  <div className="lm-mobile-art__sequence">{items.map(([label,heading,detail]) => <article key={heading}><span>{label}</span><strong>{heading}</strong><small>{detail}</small></article>)}</div>
</div>;

const commandItems = [["ENTERPRISE","Portfolio status","All sites in scope"],["SITE","Phoenix needs attention","Cooling redundancy reduced"],["CASE","Owner and response","Critical Facilities is active"],["RETURN","Current machine state","Measurements remain visible"]] as const;

export function ControlCommandCenterVisual() {
  return <figure className="lm-product-art lm-product-art--command" aria-labelledby="control-command-caption">
    <svg className="lm-product-art__desktop" viewBox="0 0 1400 790" aria-hidden="true">
      <defs>
        <linearGradient id="controlShell" x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--lm-surface)" /><stop offset="1" stopColor="var(--lm-wash)" /></linearGradient>
        <linearGradient id="controlPulse" x1="0" x2="1"><stop stopColor="var(--lm-blue-dark)" /><stop offset=".55" stopColor="var(--lm-blue)" /><stop offset="1" stopColor="var(--lm-mint)" /></linearGradient>
        <filter id="controlShadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#263244" floodOpacity=".14" /></filter>
        <clipPath id="feedOne" clipPathUnits="userSpaceOnUse"><rect x="8" y="26" width="174" height="121" rx="14" /></clipPath><clipPath id="feedTwo" clipPathUnits="userSpaceOnUse"><rect x="196" y="26" width="174" height="121" rx="14" /></clipPath>
      </defs>
      <rect x="1" y="1" width="1398" height="788" rx="30" fill="url(#controlShell)" stroke="var(--lm-blue)" strokeOpacity=".55" />
      <rect x="1" y="1" width="1398" height="66" rx="30" fill="var(--lm-surface)" /><rect x="1" y="38" width="1398" height="28" fill="var(--lm-surface)" /><path d="M1 66H1399" stroke="var(--lm-steel)" />
      <circle cx="31" cy="33" r="7" fill="var(--lm-blue)" /><text x="52" y="39" className="lm-svg-title">GLOBAL OPERATIONS</text>
      <g className="lm-svg-tabs"><rect x="480" y="17" width="126" height="34" rx="17" /><text x="543" y="39">ENTERPRISE</text><text x="654" y="39">REGION</text><text x="758" y="39">SITE</text><text x="842" y="39">LINE</text></g>
      <circle cx="1248" cy="33" r="5" fill="var(--lm-blue)" /><text x="1264" y="38" className="lm-svg-state">CURRENT SOURCES</text>

      {["SITES REPORTING|8 / 8|Current scope","PRODUCTION STATE|VISIBLE|Normal + constrained","ACTIVE CONDITIONS|7|Prioritized by impact","RESPONSE OWNER|ASSIGNED|Next action is clear"].map((item,i) => { const [label,value,detail]=item.split("|"); const x=28+i*338; return <g key={item} transform={`translate(${x} 88)`} filter="url(#controlShadow)"><rect width="316" height="106" rx="18" fill="var(--lm-surface)" stroke="var(--lm-steel)" /><text x="20" y="28" className="lm-svg-field-label">{label}</text><text x="20" y="66" className="lm-svg-metric">{value}</text><text x="20" y="88" className="lm-svg-field-value">{detail}</text><path d="M275 25h18v58h-18" fill="none" stroke="var(--lm-blue)" strokeWidth="4" /></g>; })}

      <g transform="translate(28 220)">
        <rect width="740" height="352" rx="22" fill="var(--lm-surface)" stroke="var(--lm-steel)" />
        <text x="24" y="34" className="lm-svg-kicker">OPERATING FOOTPRINT</text><text x="588" y="34" className="lm-svg-meta">NORTH AMERICA / 8 SITES</text>
        <path d="M83 123 151 73l86 8 55 35 83 5 42 45 85 21 65-17 91 38 35 56-50 43-105 6-66-20-88 27-83-21-61-40-90-21-54-56Z" fill="var(--lm-wash)" stroke="var(--lm-steel)" strokeWidth="2" />
        <path d="M164 163C250 68 380 96 432 172S552 278 646 210M164 163c92 132 225 130 308 94" fill="none" stroke="var(--lm-blue)" strokeWidth="3" strokeDasharray="7 8" />
        {[[164,163],[281,121],[432,172],[472,257],[566,271],[646,210]].map(([x,y],i) => <g key={x}><circle cx={x} cy={y} r={i===2?17:12} fill="var(--lm-surface)" stroke={i===2?"var(--lm-blue-dark)":"var(--lm-blue)"} strokeWidth="4" /><circle cx={x} cy={y} r="4" fill={i===2?"var(--lm-blue-dark)":"var(--lm-blue)"} /></g>)}
        <g transform="translate(38 304)"><rect width="664" height="31" rx="15" fill="var(--lm-canvas)" /><circle cx="22" cy="15" r="5" fill="var(--lm-blue)" /><text x="36" y="20" className="lm-svg-state">DENVER NORMAL</text><circle cx="238" cy="15" r="5" fill="var(--lm-blue-dark)" /><text x="252" y="20" className="lm-svg-state">PHOENIX ACTION</text><circle cx="475" cy="15" r="5" fill="var(--lm-blue)" /><text x="489" y="20" className="lm-svg-state">DALLAS NORMAL</text></g>
      </g>

      <g transform="translate(790 220)">
        <rect width="582" height="352" rx="22" fill="var(--lm-surface)" stroke="var(--lm-steel)" />
        <text x="22" y="34" className="lm-svg-kicker">PHOENIX / DATA HALL 3</text><rect x="432" y="15" width="126" height="30" rx="15" fill="var(--lm-wash)" stroke="var(--lm-blue)" /><text x="495" y="35" textAnchor="middle" className="lm-svg-state">ACTION ACTIVE</text>
        <image href="/images/use-cases/data-center-cooling-v2.webp" x="8" y="26" width="174" height="121" preserveAspectRatio="xMidYMid slice" clipPath="url(#feedOne)" opacity=".82" /><image href="/images/chuck-operator-pale-4k-960.webp" x="196" y="26" width="174" height="121" preserveAspectRatio="xMidYMid slice" clipPath="url(#feedTwo)" opacity=".82" />
        <rect x="8" y="26" width="174" height="121" rx="14" fill="var(--lm-blue-dark)" opacity=".28" /><rect x="196" y="26" width="174" height="121" rx="14" fill="var(--lm-blue)" opacity=".16" />
        <g transform="translate(8 26)"><rect x="12" y="12" width="72" height="24" rx="12" fill="var(--lm-surface)" opacity=".92" /><circle cx="27" cy="24" r="4" fill="var(--lm-blue)" /><text x="38" y="28" className="lm-svg-state">CURRENT</text></g>
        <g transform="translate(388 64)"><text className="lm-svg-field-label">ACTIVE CONDITION</text><text y="31" className="lm-svg-panel-title">Cooling redundancy</text><text y="55" className="lm-svg-panel-title">reduced</text><text y="88" className="lm-svg-copy">Owner</text><text y="110" className="lm-svg-field-value-lg">Critical Facilities</text><text y="143" className="lm-svg-copy">Next action</text><text y="165" className="lm-svg-field-value-lg">Return readings</text></g>
        <g transform="translate(18 181)"><text className="lm-svg-field-label">RACK INLET TEMPERATURE</text><text y="40" className="lm-svg-metric">73.6°F</text><path d="M150 31 190 25 224 28 258 14 294 19 331 7" fill="none" stroke="var(--lm-blue)" strokeWidth="4" /><path d="M150 52H342" stroke="var(--lm-steel)" strokeDasharray="5 6" /><text x="150" y="74" className="lm-svg-field-value">Inside approved band</text></g>
      </g>

      <g transform="translate(28 596)"><rect width="1344" height="160" rx="20" fill="var(--lm-surface)" stroke="var(--lm-steel)" /><text x="24" y="33" className="lm-svg-kicker">OPERATING HEARTBEAT</text><path d="M220 28h1084" stroke="var(--lm-steel)" />
        {["COOLING|Normal|82","POWER|Normal|76","PRODUCTION|Constrained|63","RESPONSE|Active|88"].map((item,i) => { const [label,state,width]=item.split("|"); const y=54+i*25; return <g key={item}><text x="24" y={y+8} className="lm-svg-field-value-lg">{label}</text><rect x="220" y={y} width="890" height="10" rx="5" fill="var(--lm-wash)" /><rect x="220" y={y} width={Number(width)*8.9} height="10" rx="5" fill="url(#controlPulse)" /><text x="1140" y={y+9} className="lm-svg-state">{state.toUpperCase()}</text><text x="1280" y={y+9} className="lm-svg-field-value">{width}%</text></g>; })}
      </g>
    </svg>
    {mobileControl("One current operating picture",commandItems)}
    <figcaption id="control-command-caption" className="lm-visually-hidden">A command center combines portfolio status, operating footprint, current site condition, assigned response, current measurements, and system heartbeat in one role-based view.</figcaption>
  </figure>;
}

const altitudeItems = [["EXECUTIVE","Where is risk increasing?","Enterprise and region"],["SITE LEADER","What area is constrained?","Site, line and process"],["CREW","What needs action now?","Asset, case and owner"]] as const;

export function ControlAltitudeVisual() {
  return <figure className="lm-product-art lm-product-art--altitude" aria-labelledby="control-altitude-caption">
    <svg className="lm-product-art__desktop" viewBox="0 0 1200 520" aria-hidden="true">
      <defs><linearGradient id="altitudeRail" x1="0" x2="1"><stop stopColor="var(--lm-blue-dark)" /><stop offset="1" stopColor="var(--lm-mint)" /></linearGradient><filter id="altitudeShadow"><feDropShadow dx="0" dy="14" stdDeviation="13" floodColor="#263244" floodOpacity=".13" /></filter></defs>
      <rect x="1" y="1" width="1198" height="518" rx="30" fill="var(--lm-surface)" stroke="var(--lm-steel)" /><path d="M174 255H1026" stroke="url(#altitudeRail)" strokeWidth="7" strokeLinecap="round" /><path d="m1008 241 20 14-20 14" fill="none" stroke="var(--lm-mint)" strokeWidth="5" />
      {[[70,98,0],[432,128,1],[794,158,2]].map(([x,y,i]) => <g key={x} transform={`translate(${x} ${y})`} filter="url(#altitudeShadow)"><rect width="336" height="270" rx="24" fill="var(--lm-surface)" stroke={i===1?"var(--lm-blue-dark)":"var(--lm-blue)"} strokeWidth="2" /><text x="24" y="34" className="lm-svg-node-kicker">{altitudeItems[i][0]}</text><text x="24" y="68" className="lm-svg-panel-title">{altitudeItems[i][1]}</text><text x="24" y="94" className="lm-svg-field-value">{altitudeItems[i][2]}</text><rect x="24" y="121" width="288" height="118" rx="14" fill="var(--lm-wash)" />{i===0?<><path d="M46 210V146h21v64M84 210v-42h21v42M122 210v-75h21v75M160 210v-54h21v54" fill="var(--lm-blue)" opacity=".7" /><path d="M203 190c23-38 48-34 80-62" fill="none" stroke="var(--lm-blue-dark)" strokeWidth="4" /></>:i===1?<><path d="M48 156 90 136l46 14 38-8 53 30 60-10v50H48Z" fill="var(--lm-mint)" opacity=".5" /><circle cx="174" cy="142" r="12" fill="var(--lm-surface)" stroke="var(--lm-blue-dark)" strokeWidth="4" /><path d="M72 219h214" stroke="var(--lm-steel)" /></>:<><rect x="45" y="144" width="116" height="72" rx="10" fill="var(--lm-surface)" stroke="var(--lm-blue)" /><text x="59" y="169" className="lm-svg-field-label">CURRENT STATE</text><text x="59" y="198" className="lm-svg-panel-title">CONSTRAINED</text><path d="M184 151h101M184 172h72M184 193h89M184 214h54" stroke="var(--lm-blue)" strokeWidth="5" strokeLinecap="round" /></>}</g>)}
      <g transform="translate(338 438)"><rect width="524" height="50" rx="25" fill="var(--lm-wash)" stroke="var(--lm-steel)" /><text x="262" y="31" textAnchor="middle" className="lm-svg-state">SAME ISSUE / OWNER / WORK / READINGS / RESULT</text></g>
    </svg>
    {mobileControl("The view changes. The case stays connected.",altitudeItems)}
    <figcaption id="control-altitude-caption" className="lm-visually-hidden">Executive, site, and crew views show the appropriate operating detail while the issue, owner, work, readings, and result remain connected.</figcaption>
  </figure>;
}

const spectrumItems = [["ALERTS","What changed?","Native events"],["MEASUREMENTS","What is it doing?","Value, unit and trend"],["MAPS","Where is it?","Site and topology"],["MEDIA","What can we see?","Authorized feeds"],["WORK","Who is responding?","Team and provider"],["AUTHORITY","Who can act?","Role and approval"]] as const;

export function ControlSignalSpectrum() {
  return <figure className="lm-product-art lm-product-art--spectrum" aria-labelledby="control-spectrum-caption">
    <svg className="lm-product-art__desktop" viewBox="0 0 1200 570" aria-hidden="true">
      <defs><linearGradient id="spectrumFlow" x1="0" x2="1"><stop stopColor="var(--lm-steel)" /><stop offset="1" stopColor="var(--lm-blue)" /></linearGradient><filter id="spectrumShadow"><feDropShadow dx="0" dy="12" stdDeviation="13" floodColor="#263244" floodOpacity=".12" /></filter></defs>
      <rect x="1" y="1" width="1198" height="568" rx="30" fill="var(--lm-surface)" stroke="var(--lm-steel)" /><text x="46" y="52" className="lm-svg-kicker">EVERY SOURCE KEEPS ITS TIME, QUALITY AND MEANING</text>
      {spectrumItems.map(([label,heading,detail],i) => { const x=i%2===0?46:318; const y=84+Math.floor(i/2)*142; return <g key={label} transform={`translate(${x} ${y})`}><rect width="236" height="112" rx="16" fill="var(--lm-wash)" stroke="var(--lm-steel)" /><path d="M18 22h46M18 38h28M18 54h38" stroke={i%2?"var(--lm-blue)":"var(--lm-blue-dark)"} strokeWidth="4" strokeLinecap="round" /><text x="82" y="30" className="lm-svg-node-kicker">{label}</text><text x="82" y="57" className="lm-svg-event-title">{heading}</text><text x="82" y="80" className="lm-svg-node-meta">{detail}</text></g>; })}
      <path d="M282 140C440 140 470 285 630 285M554 140C600 140 596 285 630 285M282 282H630M554 282H630M282 424C440 424 470 285 630 285M554 424C600 424 596 285 630 285" fill="none" stroke="url(#spectrumFlow)" strokeWidth="3" /><circle cx="630" cy="285" r="11" fill="var(--lm-surface)" stroke="var(--lm-blue)" strokeWidth="5" />
      <g transform="translate(665 90)" filter="url(#spectrumShadow)"><rect width="490" height="390" rx="24" fill="var(--lm-surface)" stroke="var(--lm-blue)" strokeWidth="2" /><rect width="490" height="58" rx="24" fill="var(--lm-wash)" /><rect y="34" width="490" height="24" fill="var(--lm-wash)" /><text x="22" y="36" className="lm-svg-title">ROLE-BASED COMMAND VIEW</text><circle cx="389" cy="29" r="5" fill="var(--lm-blue)" /><text x="404" y="34" className="lm-svg-state">CURRENT</text><text x="24" y="94" className="lm-svg-field-label">OPERATING STATE</text><text x="24" y="130" className="lm-svg-inspector-title">Cooling Loop B constrained</text><rect x="330" y="93" width="130" height="31" rx="15" fill="var(--lm-wash)" stroke="var(--lm-blue)" /><text x="395" y="113" textAnchor="middle" className="lm-svg-state">OWNER ASSIGNED</text>
        {["73.6°F|CURRENT READING","WO-18427|ACTIVE WORK","2 FEEDS|AUTHORIZED MEDIA","HALL 3|OPERATING SCOPE"].map((item,i) => { const [value,label]=item.split("|"); const x=24+(i%2)*223; const y=162+Math.floor(i/2)*92; return <g key={item} transform={`translate(${x} ${y})`}><rect width="199" height="72" rx="13" fill="var(--lm-canvas)" /><text x="15" y="29" className="lm-svg-panel-title">{value}</text><text x="15" y="52" className="lm-svg-field-label">{label}</text></g>; })}
        <path d="M24 358H466" stroke="var(--lm-steel)" /><text x="24" y="382" className="lm-svg-field-value">One current picture, assembled for the person using it.</text>
      </g>
    </svg>
    {mobileControl("Every useful signal in one view",spectrumItems)}
    <figcaption id="control-spectrum-caption" className="lm-visually-hidden">Alerts, measurements, maps, authorized media, work, and customer authority converge into one current role-based command view.</figcaption>
  </figure>;
}

export function ControlBoundaryVisual() {
  const items = [["SCADA + BMS","Direct equipment control","Remain in place"],["SIS","Safety authority","Remains in place"],["WORK SYSTEMS","Records of work","Remain in place"],["MEDIA SYSTEMS","Authorized feeds","Remain in place"]] as const;
  return <figure className="lm-product-art lm-product-art--boundary" aria-labelledby="control-boundary-caption">
    <svg className="lm-product-art__desktop" viewBox="0 0 1200 480" aria-hidden="true">
      <defs><linearGradient id="boundaryLayer" x1="0" x2="1"><stop stopColor="var(--lm-blue-dark)" /><stop offset="1" stopColor="var(--lm-blue)" /></linearGradient></defs>
      <rect x="1" y="1" width="1198" height="478" rx="30" fill="var(--lm-surface)" stroke="var(--lm-steel)" />
      <g transform="translate(90 48)"><rect width="1020" height="116" rx="24" fill="url(#boundaryLayer)" /><text x="510" y="38" textAnchor="middle" className="lm-svg-kicker-invert">INFINIT-CONTROL</text><text x="510" y="76" textAnchor="middle" className="lm-svg-boundary-title">One governed view across the operating response</text><text x="510" y="101" textAnchor="middle" className="lm-svg-node-invert">Current state / owner / work / authorized action / measured result</text></g>
      <path d="M600 164V220M140 220H1060" stroke="var(--lm-blue)" strokeWidth="4" /><circle cx="600" cy="220" r="12" fill="var(--lm-surface)" stroke="var(--lm-blue)" strokeWidth="4" /><text x="600" y="252" textAnchor="middle" className="lm-svg-state">CUSTOMER AUTHORITY + GOVERNED PROJECTION</text>
      {items.map(([title,detail,state],i) => <g key={title} transform={`translate(${54+i*286} 292)`}><rect width="258" height="132" rx="18" fill="var(--lm-wash)" stroke="var(--lm-steel)" /><path d="M22 25h52M22 43h34M22 61h45" stroke="var(--lm-blue-dark)" strokeWidth="4" strokeLinecap="round" /><text x="92" y="34" className="lm-svg-node-kicker">{title}</text><text x="92" y="60" className="lm-svg-event-title">{detail}</text><text x="22" y="105" className="lm-svg-field-value">{state}</text></g>)}
    </svg>
    {mobileControl("Existing systems keep their authority",items)}
    <figcaption id="control-boundary-caption" className="lm-visually-hidden">Infinit-Control presents a governed view while existing control, safety, work, and media systems retain their responsibilities.</figcaption>
  </figure>;
}
