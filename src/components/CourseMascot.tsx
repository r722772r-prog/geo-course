"use client";
import { useState } from "react";
import Image from "next/image";
import { registrationUrl } from "@/data/course";
export default function CourseMascot(){
 const [open,setOpen]=useState(true);
 return <aside className="course-mascot" aria-label="白白邀你報名">{open?<><Image className="mascot-figure" src="/baibai-mascot.png" alt="白白 Q 版公仔" width={112} height={168}/><div className="mascot-panel"><button type="button" className="mascot-close" aria-label="收合公仔報名框" onClick={()=>setOpen(false)}>×</button><p>一起做出你的<br/>第一支行銷影片</p><a className="cta" href={registrationUrl}>立即報名</a></div></>:<button className="mascot-reopen" type="button" onClick={()=>setOpen(true)} aria-label="展開公仔報名框">白白邀你上課</button>}</aside>;
}
