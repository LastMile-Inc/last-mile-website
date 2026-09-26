import { SEO } from "@/app/components/SEO";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageIntro, ClosingCTA } from "@/app/components/makeover/SiteShell";


const reasons = [
  {n: "01", title: "The result is the point.", text: "A useful warning is the beginning. Last Mile is designed to connect the next steps all the way to evidence that the equipment is performing as expected.", question: "Show me how we know the response worked."},
  {n: "02", title: "The response has an owner.", text: "Understanding an issue should lead to a clear next move. Bring the people, decisions, and work together so everyone can see who is responsible and where things stand.", question: "Show me who owns the next step."},
  {n: "03", title: "Your people keep their authority.", text: "Your operating rules guide what happens. Consequential actions follow the permissions and approvals your organization sets.", question: "Show me where our approval is required."},
  {n: "04", title: "The relationship is personal.", text: "Named operations engineers, direct two-way chat, and proactive contact make service part of the Last Mile experience from the start.", question: "Show me how your team will work with ours."},
];

export function WhyLastMilePage() {
  return <><SEO title={"Why Last Mile | Accountable Operations"} description={"Evaluate a platform by the response it helps your team complete, the result it can demonstrate, and the people who stand behind it."} canonicalPath="/why-last-mile" robots="noindex, nofollow" /><main id="main"><PageIntro label="WHY LAST MILE" title="Choose the follow-through." accent="Expect it from everyone." description="From the platform to the people behind it, Last Mile is built around a higher expectation: carry the work through to a result you can see."><div className="hero-actions"><a className="button" href="/demo">Put us to the test <ArrowUpRight size={18}/></a><a className="text-link" href="/how-it-works">Explore Accountable Operations <ArrowRight size={18}/></a></div></PageIntro>
    <section className="category-statement band"><div className="wrap editorial-split"><div><p className="eyebrow">INTRODUCING ACCOUNTABLE OPERATIONS</p><h2>A complete response<br/>deserves its own category.</h2></div><div><p className="large-copy">Your operation needs a connected path from “something changed” to “we know it’s right.”</p><p>That is the idea behind Accountable Operations. Connect the evidence, the decisions, the people, and the work. Then use the evidence from the operation to check the outcome.</p><p>It’s the standard we’re building Last Mile to deliver.</p></div></div></section>
    <section className="reasons wrap section-space"><div className="section-top"><div><p className="eyebrow">FOUR REASONS TO TAKE A CLOSER LOOK</p><h2>Ask more of your next platform.</h2></div></div>{reasons.map(reason => <article className="reason-row" key={reason.n}><span className="item-number">{reason.n}</span><h3>{reason.title}</h3><div><p>{reason.text}</p><div className="demo-question"><span>ASK US IN YOUR DEMO</span><strong>“{reason.question}”</strong></div>{reason.n === "04" && <a className="text-link reason-service-link" href="/our-service">Read our service promise <ArrowRight size={17}/></a>}</div></article>)}</section>
    
    <section className="decision-panel wrap"><div><p className="eyebrow">START WITH SOMETHING THAT MATTERS</p><h2>Bring one problem.<br/>Follow the whole response.</h2><p>Choose an issue your team regularly has to chase. We’ll use it to discuss the fit, walk through the product, and make the next step clear.</p></div><div><span className="item-number">A USEFUL CONVERSATION COVERS</span><ul className="check-list"><li>What your team sees today</li><li>Where the response gets stuck</li><li>Who needs to make the next decision</li><li>What evidence would prove success</li></ul></div></section>
    <ClosingCTA title="See what the last mile could look like."/>
  </main></>;
}
