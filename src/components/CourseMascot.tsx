"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mascotWardrobe } from "@/data/mascot-wardrobe";
import Image from "next/image";
import { registrationUrl } from "@/data/course";
export default function CourseMascot(){
 const pathname=usePathname();
 const outfit=mascotWardrobe[pathname.replace(/\/$/, "") || "/"];
 const [open,setOpen]=useState(false);
 const [motionPaused,setMotionPaused]=useState(false);
 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  const hero=document.querySelector(".course-hero");
  if(!hero) return;
  let pastHero=false;
  let atRegistration=false;
  const update=()=>setVisible(pastHero && !atRegistration);
  const observer=new IntersectionObserver(([entry])=>{
   pastHero=!entry.isIntersecting && entry.boundingClientRect.bottom<=0;
   update();
  },{threshold:0});
  const registrationObserver=new IntersectionObserver(([entry])=>{
   atRegistration=entry.isIntersecting;
   update();
  },{threshold:0});
  observer.observe(hero);
  const registration=document.querySelector("#registration");
  if(registration) registrationObserver.observe(registration);
  return ()=>{observer.disconnect();registrationObserver.disconnect();};
 },[pathname]);
 if(!outfit || (pathname==="/" && !visible)) return null;
 return <aside className="course-mascot" data-motion-paused={motionPaused} aria-label="白白邀你報名">{open?<><Image className="mascot-figure" src={outfit.src} alt={outfit.alt} width={112} height={168}/><div className="mascot-panel"><button type="button" className="mascot-close" aria-label="收合公仔報名框" onClick={()=>setOpen(false)}>×</button><p>一起做出你的<br/>第一支行銷影片</p><a className="cta" href={registrationUrl}>立即報名</a><button type="button" className="mascot-motion-toggle" aria-pressed={motionPaused} onClick={()=>setMotionPaused(!motionPaused)}>{motionPaused?"播放公仔動作":"暫停公仔動作"}</button></div></>:<button className="mascot-reopen" type="button" onClick={()=>setOpen(true)} aria-label="展開公仔報名框" aria-expanded={false}><Image src={outfit.src} alt="" width={40} height={60}/>報名資訊</button>}</aside>;
}
