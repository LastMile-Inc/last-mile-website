import { SEO } from "@/app/components/SEO";
import { IndustryExplorer } from "@/app/components/makeover/IndustryExplorer";
import { PageIntro, ClosingCTA } from "@/app/components/makeover/SiteShell";


export function IndustriesPage() {
  return <><SEO title={"Your industry | Last Mile"} description={"Explore Accountable Operations for manufacturing, data center facilities, and cold storage teams."} canonicalPath="/industries" robots="noindex, nofollow" /><main id="main"><PageIntro label="YOUR WORLD. YOUR LAST MILE." title="Your operation is specific." accent="Your response should be, too." description="Start with the equipment you depend on, the people responsible for it, and the outcome you need. Explore what connected follow-through could mean in your world."/><section className="wrap section-bottom"><IndustryExplorer/></section><section className="fit-section band section-space"><div className="wrap editorial-split"><div><p className="eyebrow">LET’S ESTABLISH THE FIT</p><h2>Bring your reality<br/>into the conversation.</h2><p>We’ll explore your equipment, available operating information, existing systems, and approval needs before agreeing on a starting point.</p></div><ul className="fit-questions"><li><span>01</span>What does your team need to see sooner?</li><li><span>02</span>Where does the response lose momentum?</li><li><span>03</span>Who needs to own or approve the next step?</li><li><span>04</span>What would a verified result look like?</li></ul></div></section><ClosingCTA title="Let’s start with your operation."/></main></>;
}
