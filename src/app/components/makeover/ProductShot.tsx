
import { useState } from "react";
import { ArrowUpRight, Check, Image as ImageIcon, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";

import { screenshots } from "@/app/content/productScreenshots";

export function Screenshot({index, hero = false}: {index: number; hero?: boolean}) {
  const [open, setOpen] = useState(false);
  const shot = screenshots[index];
  return <><button className={`screenshot ${hero ? "screenshot-hero" : ""}`} onClick={() => setOpen(true)} aria-label={`Screenshot Placeholder ${shot.id}: ${shot.title}. View image brief`}><span className="shot-bar"><span>PRODUCT VIEW / {shot.id}</span><Plus size={16}/></span><span className="shot-center"><span className="shot-icon"><ImageIcon size={32} strokeWidth={1}/></span><strong>Screenshot Placeholder</strong><span>{shot.title}</span></span><span className="shot-brief"><span>{shot.detail}</span><span className="brief-link">View image brief <ArrowUpRight size={15}/></span></span></button><Dialog open={open} onOpenChange={setOpen}><DialogContent className="image-dialog"><DialogHeader><p className="eyebrow">PRODUCT IMAGE / {shot.id}</p><DialogTitle className="dialog-heading">{shot.title}</DialogTitle><DialogDescription className="dialog-description">{shot.need}</DialogDescription></DialogHeader><div className="image-requirements"><p><Check size={17}/>{shot.aspect}</p><p><Check size={17}/>A real product capture with readable text</p><p><Check size={17}/>Remove sensitive customer or personal details</p></div><p className="dialog-footnote">Supply the original image. We’ll fit it into this space and refine the accompanying copy to match what the product shows.</p></DialogContent></Dialog></>;
}
