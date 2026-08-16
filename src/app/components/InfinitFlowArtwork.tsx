const sequenceFallback = (title: string, items: readonly (readonly string[])[]) => <div className="lm-product-art__mobile">
  <strong className="lm-mobile-art__title">{title}</strong>
  <div className="lm-mobile-art__sequence">{items.map(([label, heading, detail]) => <article key={heading}><span>{label}</span><strong>{heading}</strong><small>{detail}</small></article>)}</div>
</div>;

const studioSteps = [["CONDITION","Pressure drift","Current plant signal"],["CONTEXT","Resolve the operation","Site, line and asset"],["DECISION","Production at risk?","Rules and timing"],["RESPONSE","Inspect compressor","Owner and work system"],["RETURN","Measure recovery","Pressure and flow"]] as const;

export function FlowStudioVisual() {
  return <figure className="lm-product-art lm-product-art--studio" aria-labelledby="flow-studio-caption">
    <svg className="lm-product-art__desktop" viewBox="0 0 1320 700" aria-hidden="true">
      <defs>
        <pattern id="flowGrid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="var(--lm-steel)" strokeOpacity=".22" /></pattern>
        <linearGradient id="flowShell" x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--lm-surface)" /><stop offset="1" stopColor="var(--lm-wash)" /></linearGradient>
        <filter id="flowShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#263244" floodOpacity=".13" /></filter>
        <marker id="flowArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="var(--lm-blue)" /></marker>
      </defs>
      <rect x="1" y="1" width="1318" height="698" rx="28" fill="url(#flowShell)" stroke="var(--lm-blue)" strokeOpacity=".5" />
      <path d="M1 62H1319" stroke="var(--lm-steel)" /><circle cx="31" cy="31" r="6" fill="var(--lm-steel)" /><circle cx="51" cy="31" r="6" fill="var(--lm-mint)" /><circle cx="71" cy="31" r="6" fill="var(--lm-blue)" />
      <text x="102" y="37" className="lm-svg-title">INFINIT-FLOW STUDIO</text><text x="310" y="37" className="lm-svg-meta">COMPRESSED AIR RESPONSE</text>
      <rect x="1110" y="18" width="176" height="28" rx="14" fill="var(--lm-surface)" stroke="var(--lm-blue)" /><circle cx="1131" cy="32" r="5" fill="var(--lm-blue)" /><text x="1146" y="36" className="lm-svg-state">VALIDATED MODEL</text>

      <rect x="1" y="62" width="154" height="637" fill="var(--lm-canvas)" /><text x="28" y="100" className="lm-svg-kicker">BUILDING BLOCKS</text>
      {["CONDITION","DECISION","PEOPLE","WORK","TIMER","RESULT"].map((label,i) => { const y=116+i*78; return <g key={label}><rect x="24" y={y} width="106" height="58" rx="12" fill="var(--lm-surface)" stroke="var(--lm-steel)" filter="url(#flowShadow)" /><path d={`M42 ${y+19}h19M42 ${y+29}h30M42 ${y+39}h15`} stroke={i===1||i===4?"var(--lm-blue)":"var(--lm-blue-dark)"} strokeWidth="3" strokeLinecap="round" /><text x="86" y={y+34} textAnchor="middle" className="lm-svg-small-title">{label}</text></g>; })}

      <rect x="155" y="62" width="846" height="637" fill="var(--lm-surface)" /><rect x="155" y="62" width="846" height="637" fill="url(#flowGrid)" />
      <text x="188" y="100" className="lm-svg-kicker">OPERATING SCOPE</text><g className="lm-svg-scope"><rect x="188" y="116" width="138" height="34" rx="17" /><text x="257" y="138">DENVER SITE</text><rect x="338" y="116" width="132" height="34" rx="17" /><text x="404" y="138">UTILITIES</text><rect x="482" y="116" width="180" height="34" rx="17" /><text x="572" y="138">COMPRESSOR C-04</text></g>
      <path d="M286 294C340 294 338 224 398 224M286 294C340 294 338 396 398 396M552 224C608 224 606 294 660 294M552 396C608 396 606 294 660 294M814 294H876" fill="none" stroke="var(--lm-blue)" strokeWidth="4" markerEnd="url(#flowArrow)" /><path d="M738 345v102H522" fill="none" stroke="var(--lm-mint)" strokeWidth="3" strokeDasharray="7 8" markerEnd="url(#flowArrow)" /><text x="588" y="472" className="lm-svg-return">RETURN MEASUREMENT</text>
      <g filter="url(#flowShadow)">
        <rect x="188" y="244" width="98" height="100" rx="18" fill="var(--lm-blue-dark)" /><path d="M216 281h41M216 294h28M216 307h35" stroke="var(--lm-surface)" strokeWidth="4" strokeLinecap="round" /><text x="237" y="329" textAnchor="middle" className="lm-svg-node-invert">SIGNAL</text>
        <rect x="398" y="177" width="154" height="94" rx="18" fill="var(--lm-surface)" stroke="var(--lm-blue)" strokeWidth="2" /><text x="420" y="205" className="lm-svg-node-kicker">CONTEXT</text><text x="420" y="231" className="lm-svg-node-title">Resolve operation</text><text x="420" y="251" className="lm-svg-node-meta">Asset + line + schedule</text>
        <rect x="398" y="349" width="154" height="94" rx="18" fill="var(--lm-surface)" stroke="var(--lm-blue)" strokeWidth="2" /><text x="420" y="377" className="lm-svg-node-kicker">CURRENT STATE</text><text x="420" y="403" className="lm-svg-node-title">Check exposure</text><text x="420" y="423" className="lm-svg-node-meta">Capacity + production plan</text>
        <path d="M660 224h106l48 70-48 70H660l-48-70Z" fill="var(--lm-wash)" stroke="var(--lm-blue-dark)" strokeWidth="2" /><text x="713" y="271" textAnchor="middle" className="lm-svg-node-kicker">DECISION</text><text x="713" y="299" textAnchor="middle" className="lm-svg-node-title">Production at risk?</text><text x="713" y="324" textAnchor="middle" className="lm-svg-node-meta">Policy + 90 second gate</text>
        <rect x="876" y="244" width="96" height="100" rx="18" fill="var(--lm-blue)" /><path d="M902 278h42v31h-42zM912 270v8M934 270v8" fill="none" stroke="var(--lm-surface)" strokeWidth="3" /><text x="924" y="329" textAnchor="middle" className="lm-svg-node-invert">WORK</text>
      </g>
      <rect x="182" y="536" width="792" height="126" rx="18" fill="var(--lm-wash)" stroke="var(--lm-steel)" /><text x="208" y="566" className="lm-svg-kicker">RUN CONDITIONS</text>
      {["OWNER|Mechanical Reliability","SYSTEM|CMMS + Infinit-Signal","TIMING|30 min / escalate at 20","OUTPUT|Inspection + return readings"].map((item,i) => { const split=item.indexOf("|"); const label=item.slice(0,split); const value=item.slice(split+1); return <g key={item} transform={`translate(${208+i*190} 586)`}><text className="lm-svg-field-label">{label}</text><text y="27" className="lm-svg-field-value">{value}</text></g>; })}

      <rect x="1001" y="62" width="318" height="637" fill="var(--lm-canvas)" /><text x="1033" y="104" className="lm-svg-kicker">SELECTED STEP</text><text x="1033" y="143" className="lm-svg-inspector-title">Inspect compressor</text><text x="1033" y="170" className="lm-svg-copy">The work step carries everything</text><text x="1033" y="191" className="lm-svg-copy">needed to run it correctly.</text>
      {["WHERE|Denver / Utility Bay","WHO|Mechanical Reliability","SYSTEM|CMMS work request","INPUT|Qualified pressure drift","DUE|09:30 / escalate at 09:20"].map((item,i) => { const split=item.indexOf("|"); const label=item.slice(0,split); const value=item.slice(split+1); return <g key={item} transform={`translate(1033 ${226+i*76})`}><rect width="252" height="60" rx="11" fill="var(--lm-surface)" stroke="var(--lm-steel)" /><text x="16" y="23" className="lm-svg-field-label">{label}</text><text x="16" y="45" className="lm-svg-field-value-lg">{value}</text></g>; })}
    </svg>
    {sequenceFallback("A complete operating workflow",studioSteps)}
    <figcaption id="flow-studio-caption" className="lm-visually-hidden">A visual workflow studio connects a plant signal to operating context, a decision, assigned work, and a return measurement. The selected step carries its site, owner, system, input, deadline, and required output.</figcaption>
  </figure>;
}

const contextSteps = [["QUALIFY","Know what changed","Pressure drift"],["DECIDE","Read the operation","Schedule and capacity"],["COORDINATE","Put the team in motion","Owner and work system"],["MEASURE","Read the machine again","Pressure and flow"]] as const;

export function WorkflowContextVisual() {
  return <figure className="lm-product-art lm-product-art--context" aria-labelledby="workflow-context-caption">
    <svg className="lm-product-art__desktop" viewBox="0 0 1200 560" aria-hidden="true">
      <defs><linearGradient id="contextRibbon" x1="0" x2="1"><stop stopColor="var(--lm-blue-dark)" /><stop offset=".52" stopColor="var(--lm-blue)" /><stop offset="1" stopColor="var(--lm-mint)" /></linearGradient><filter id="contextShadow"><feDropShadow dx="0" dy="12" stdDeviation="13" floodColor="#263244" floodOpacity=".12" /></filter></defs>
      <rect x="1" y="1" width="1198" height="558" rx="30" fill="var(--lm-surface)" stroke="var(--lm-steel)" /><path d="M0 90H1200M0 468H1200" stroke="var(--lm-steel)" strokeOpacity=".45" />
      <g className="lm-svg-scope"><rect x="216" y="28" width="164" height="36" rx="18" /><text x="298" y="51">DENVER SITE</text><rect x="420" y="28" width="158" height="36" rx="18" /><text x="499" y="51">UTILITY PLANT</text><rect x="618" y="28" width="166" height="36" rx="18" /><text x="701" y="51">AIR SYSTEM</text><rect x="824" y="28" width="180" height="36" rx="18" /><text x="914" y="51">COMPRESSOR C-04</text></g>
      <text x="64" y="137" className="lm-svg-kicker">EVERY STEP KEEPS ITS OPERATING CONTEXT</text><path d="M118 284C220 164 350 164 451 284S680 404 782 284 1007 164 1082 284" fill="none" stroke="url(#contextRibbon)" strokeWidth="18" strokeLinecap="round" opacity=".18" /><path d="M118 284C220 164 350 164 451 284S680 404 782 284 1007 164 1082 284" fill="none" stroke="url(#contextRibbon)" strokeWidth="5" strokeLinecap="round" />
      {[[150,244],[390,244],[630,324],[870,244]].map(([x,y],i) => <g key={x} filter="url(#contextShadow)"><rect x={x-80} y={y-60} width="160" height="120" rx="20" fill="var(--lm-surface)" stroke={i===2?"var(--lm-blue-dark)":"var(--lm-blue)"} strokeWidth="2" /><text x={x} y={y-20} textAnchor="middle" className="lm-svg-node-kicker">{contextSteps[i][0]}</text><text x={x} y={y+8} textAnchor="middle" className="lm-svg-stage-title">{contextSteps[i][1]}</text><text x={x} y={y+35} textAnchor="middle" className="lm-svg-node-meta">{contextSteps[i][2]}</text></g>)}
      {["PEOPLE|Operator / Reliability / Provider","SYSTEMS|MQTT / CMMS / Scheduling","TIMING|Deadline / Escalation / Shift","INPUT + OUTPUT|Readings / Work / Return data"].map((item,i) => { const split=item.indexOf("|"); return <g key={item} transform={`translate(${70+i*285} 482)`}><rect width="250" height="54" rx="12" fill="var(--lm-wash)" stroke="var(--lm-steel)" /><text x="16" y="21" className="lm-svg-field-label">{item.slice(0,split)}</text><text x="16" y="41" className="lm-svg-field-value">{item.slice(split+1)}</text></g>; })}
    </svg>
    {sequenceFallback("The workflow carries its context",contextSteps)}
    <figcaption id="workflow-context-caption" className="lm-visually-hidden">A continuous operating workflow stays tied to its site, plant, system, asset, people, production systems, timing, inputs, and outputs.</figcaption>
  </figure>;
}

const runwaySteps = [["09:02","Signal qualified","Infinit-Signal"],["09:03","Impact assessed","Infinit-Flow"],["09:05","Owner accepts","Reliability"],["09:12","Work dispatched","CMMS"],["09:41","Reading returned","Field team"],["09:56","Recovery measured","Singularity"]] as const;

export function FlowExecutionRunway() {
  return <figure className="lm-product-art lm-product-art--runway" aria-labelledby="flow-runway-caption">
    <svg className="lm-product-art__desktop" viewBox="0 0 1200 570" aria-hidden="true">
      <defs><linearGradient id="runwayActive" x1="0" x2="1"><stop stopColor="var(--lm-blue-dark)" /><stop offset="1" stopColor="var(--lm-mint)" /></linearGradient><marker id="runwayArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10Z" fill="var(--lm-blue)" /></marker></defs>
      <rect x="1" y="1" width="1198" height="568" rx="30" fill="var(--lm-surface)" stroke="var(--lm-steel)" /><rect x="1" y="1" width="1198" height="72" rx="30" fill="var(--lm-wash)" /><rect x="1" y="44" width="1198" height="28" fill="var(--lm-wash)" />
      <text x="38" y="30" className="lm-svg-kicker">ACTIVE OPERATING CASE</text><text x="38" y="55" className="lm-svg-title">LM-FLOW-2841 / COMPRESSOR C-04</text><rect x="1003" y="21" width="158" height="32" rx="16" fill="var(--lm-surface)" stroke="var(--lm-blue)" /><circle cx="1025" cy="37" r="5" fill="var(--lm-blue)" /><text x="1041" y="41" className="lm-svg-state">ON SCHEDULE</text>
      {["SYSTEM|118","LAST MILE|205","PEOPLE|292","MEASUREMENT|379"].map(item => { const split=item.indexOf("|"); const y=Number(item.slice(split+1)); return <g key={item}><rect x="27" y={y} width="145" height="66" rx="12" fill="var(--lm-canvas)" /><text x="99" y={y+39} textAnchor="middle" className="lm-svg-lane">{item.slice(0,split)}</text><path d={`M188 ${y+33}H1166`} stroke="var(--lm-steel)" strokeOpacity=".35" /></g>; })}
      <path d="M214 150H348V238H500V325H652V238H804V325H956V412H1086" fill="none" stroke="url(#runwayActive)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#runwayArrow)" className="lm-svg-trace" />
      {[[214,150],[348,238],[500,325],[652,238],[804,325],[956,412]].map(([x,y],i) => <g key={x}><circle cx={x} cy={y} r="17" fill="var(--lm-surface)" stroke="var(--lm-blue)" strokeWidth="5" /><circle cx={x} cy={y} r="5" fill={i===5?"var(--lm-blue-dark)":"var(--lm-blue)"} /><text x={x} y={y-30} textAnchor="middle" className="lm-svg-time">{runwaySteps[i][0]}</text><text x={x} y={y+48} textAnchor="middle" className="lm-svg-event-title">{runwaySteps[i][1]}</text><text x={x} y={y+66} textAnchor="middle" className="lm-svg-event-meta">{runwaySteps[i][2]}</text></g>)}
      <g transform="translate(38 484)"><rect width="1124" height="56" rx="14" fill="var(--lm-canvas)" stroke="var(--lm-steel)" />{["AUTOMATE|Qualify / route / time","ASSIST|Assemble / recommend","HUMAN AUTHORITY|Inspect / isolate / approve","MEASURE|Read the machine again"].map((item,i) => { const split=item.indexOf("|"); return <g key={item} transform={`translate(${20+i*276} 0)`}><text y="22" className="lm-svg-field-label">{item.slice(0,split)}</text><text y="43" className="lm-svg-field-value-lg">{item.slice(split+1)}</text></g>; })}</g>
    </svg>
    {sequenceFallback("One case follows the work",runwaySteps)}
    <figcaption id="flow-runway-caption" className="lm-visually-hidden">One operating case follows the work from the first qualified signal through assessment, ownership, dispatch, field response, and a measured return.</figcaption>
  </figure>;
}

export function FlowAuthorityVisual() {
  const steps = [["AUTOMATE","Move approved digital work","Qualify, route and time"],["POLICY","Apply customer authority","Roles, approvals and limits"],["PEOPLE","Keep physical control","Inspect, isolate and restart"]] as const;
  return <figure className="lm-product-art lm-product-art--authority" aria-labelledby="flow-authority-caption">
    <svg className="lm-product-art__desktop" viewBox="0 0 1200 440" aria-hidden="true">
      <defs><linearGradient id="authorityBand" x1="0" x2="1"><stop stopColor="var(--lm-wash)" /><stop offset=".5" stopColor="var(--lm-blue)" /><stop offset="1" stopColor="var(--lm-wash)" /></linearGradient></defs>
      <rect x="1" y="1" width="1198" height="438" rx="30" fill="var(--lm-surface)" stroke="var(--lm-steel)" /><text x="600" y="52" textAnchor="middle" className="lm-svg-kicker">AUTOMATION STOPS WHERE CUSTOMER AUTHORITY BEGINS</text><path d="M165 218H1035" stroke="url(#authorityBand)" strokeWidth="12" strokeLinecap="round" opacity=".35" />
      {[[225,0],[600,1],[975,2]].map(([x,i]) => <g key={x}><circle cx={x} cy="218" r={i===1?92:76} fill={i===1?"var(--lm-blue)":"var(--lm-surface)"} stroke={i===1?"var(--lm-blue-dark)":"var(--lm-blue)"} strokeWidth="3" /><path d={`M${x-28} 203h56M${x-18} 218h36M${x-8} 233h16`} stroke={i===1?"var(--lm-surface)":"var(--lm-blue-dark)"} strokeWidth="5" strokeLinecap="round" /><text x={x} y={i===1?139:126} textAnchor="middle" className="lm-svg-node-kicker">{steps[i][0]}</text><text x={x} y={i===1?319:316} textAnchor="middle" className="lm-svg-authority-title">{steps[i][1]}</text><text x={x} y={i===1?344:341} textAnchor="middle" className="lm-svg-node-meta">{steps[i][2]}</text></g>)}
      <path d="M317 218H490M710 218H883" stroke="var(--lm-blue)" strokeWidth="3" strokeDasharray="7 7" />
    </svg>
    {sequenceFallback("Automation with clear authority",steps)}
    <figcaption id="flow-authority-caption" className="lm-visually-hidden">Approved digital work is automated, customer policy applies roles and limits, and authorized people retain physical control.</figcaption>
  </figure>;
}
