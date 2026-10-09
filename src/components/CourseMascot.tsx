"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { registrationUrl } from "@/data/course";
export default function CourseMascot(){
 const [open,setOpen]=useState(false);
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
 },[]);
 if(!visible) return null;
 return <aside className="course-mascot" aria-label="白白邀你報名">{open?<><Image className="mascot-figure" src="/baibai-mascot.png" alt="白白 Q 版公仔" width={112} height={168}/><div className="mascot-panel"><button type="button" className="mascot-close" aria-label="收合公仔報名框" onClick={()=>setOpen(false)}>×</button><p>一起做出你的<br/>第一支行銷影片</p><a className="cta" href={registrationUrl}>立即報名</a></div></>:<button className="mascot-reopen" type="button" onClick={()=>setOpen(true)} aria-label="展開公仔報名框" aria-expanded={false}><Image src="/baibai-mascot.png" alt="" width={40} height={60}/>報名資訊</button>}</aside>;
}
