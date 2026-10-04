'use client';
import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import jsQR from 'jsqr';
import { deskRequest } from '@/lib/scanner/request';
type Ticket={regId:string;eventId:string;eventTitle:string;teamName:string;college:string;checkedIn:boolean;members:{name:string;rollNo:string;role:string}[]};
type Access={email:string;events:{id:string;title:string}[]};
type Result={success:boolean;code?:string;message?:string;ticket?:Ticket;email?:string;events?:Access['events']};
type GIS={accounts:{id:{initialize:(options:{client_id:string;hd:string;callback:(r:{credential:string})=>void})=>void;renderButton:(el:HTMLElement,options:{theme:string;size:string})=>void;disableAutoSelect:()=>void}}};
export default function Scanner({clientId}:{clientId:string}) {
 const [access,setAccess]=useState<Access|null>(null),[eventId,setEvent]=useState(''),[message,setMessage]=useState('Sign in with an approved HITAM organizer account.'),[ticket,setTicket]=useState<Ticket|null>(null),[identity,setIdentity]=useState(false),[active,setActive]=useState(false),[busy,setBusy]=useState(false),[reference,setReference]=useState(''),[googleReady,setGoogleReady]=useState(false);
 const video=useRef<HTMLVideoElement>(null),stream=useRef<MediaStream|null>(null),generation=useRef(0),timer=useRef<ReturnType<typeof setTimeout>|null>(null),scanTimer=useRef<ReturnType<typeof setTimeout>|null>(null),working=useRef(false),selectedEvent=useRef(''),resultPanel=useRef<HTMLElement>(null),loginButton=useRef<HTMLDivElement>(null);
 const stop=useCallback(()=>{generation.current++;stream.current?.getTracks().forEach(t=>t.stop());stream.current=null;if(video.current)video.current.srcObject=null;if(scanTimer.current)clearTimeout(scanTimer.current);setActive(false);},[]);
 const clear=useCallback(()=>{setTicket(null);setIdentity(false);setReference('');},[]);
 const acceptAccess=useCallback((r:Result)=>{if(r.success&&r.email&&r.events?.length){setAccess({email:r.email,events:r.events});setEvent(r.events[0].id);selectedEvent.current=r.events[0].id;setMessage('Select your event and start the camera.');}else{setAccess(null);setMessage(r.message||'Access denied.');}},[]);
 useEffect(()=>{fetch('/api/scanner',{cache:'no-store'}).then(r=>r.json()).then(acceptAccess).catch(()=>setMessage('Sign-in service unavailable. Try again.'));},[acceptAccess]);
 useEffect(()=>{
  if(!googleReady||!clientId||access||!loginButton.current)return;
  const google=(window as Window & {google?:GIS}).google;if(!google)return;
  google.accounts.id.initialize({client_id:clientId,hd:'hitam.org',callback:r=>{setBusy(true);setMessage('Checking organizer permissions…');fetch('/api/scanner/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({credential:r.credential})}).then(r=>r.json()).then(acceptAccess).catch(()=>setMessage('Sign-in failed. Try again.')).finally(()=>setBusy(false));}});
  google.accounts.id.renderButton(loginButton.current,{theme:'outline',size:'large'});
 },[googleReady,clientId,access,acceptAccess]);
 useEffect(()=>{
  const hidden=()=>{if(document.hidden){stop();clear();}};document.addEventListener('visibilitychange',hidden);
  return()=>{document.removeEventListener('visibilitychange',hidden);stop();if(timer.current)clearTimeout(timer.current);};
 },[stop,clear]);
 useEffect(()=>{if(timer.current)clearTimeout(timer.current);if(ticket)timer.current=setTimeout(()=>{clear();setMessage('Details cleared after inactivity. Scan again.');},90000);},[ticket,clear]);
 const lookup=useCallback(async(raw:string)=>{
  if(working.current)return;working.current=true;setBusy(true);stop();clear();setMessage('QR detected. Looking up ticket…');
  try{const {response,result:r}=await deskRequest<Result>({action:'lookup',reference:raw,eventId:selectedEvent.current},setMessage);if(response.status===401)setAccess(null);if(r.success&&r.ticket&&!document.hidden){setTicket(r.ticket);setMessage(r.ticket.checkedIn?'Already checked in. Do not admit a duplicate entry.':'Payment verified. Compare every participant with their college ID.');setTimeout(()=>resultPanel.current?.scrollIntoView({behavior:'smooth',block:'start'}),0);}else setMessage(r.message||'Ticket lookup failed.');}catch{setMessage('Connection failed. Scan again when connected.');}finally{working.current=false;setBusy(false);}
 },[clear,stop]);
 async function start(){
  if(working.current||stream.current)return;const run=++generation.current;working.current=true;setBusy(true);clear();setMessage('Requesting camera access…');
  try{
   if(!navigator.mediaDevices?.getUserMedia)throw Error('Camera requires HTTPS and a supported browser.');
   const acquired=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}},audio:false});
   if(run!==generation.current||document.hidden){acquired.getTracks().forEach(t=>t.stop());return;}
   stream.current=acquired;video.current!.srcObject=acquired;await video.current!.play();setActive(true);setMessage('Hold the ticket QR inside the camera view. Details open automatically.');
   const canvas=document.createElement('canvas'),context=canvas.getContext('2d',{willReadFrequently:true});
   function frame(){if(!stream.current||run!==generation.current)return;const v=video.current!;if(v.readyState>=2&&v.videoWidth&&context){const scale=Math.min(1,960/v.videoWidth);canvas.width=Math.round(v.videoWidth*scale);canvas.height=Math.round(v.videoHeight*scale);context.drawImage(v,0,0,canvas.width,canvas.height);const pixels=context.getImageData(0,0,canvas.width,canvas.height);const qr=jsQR(pixels.data,canvas.width,canvas.height,{inversionAttempts:'attemptBoth'});if(qr){working.current=false;void lookup(qr.data);return;}}scanTimer.current=setTimeout(frame,160);}
   working.current=false;scanTimer.current=setTimeout(frame,0);
  }catch(error){stop();setMessage(error instanceof DOMException&&error.name==='NotAllowedError'?'Camera permission denied. Allow camera access in browser site settings and try again.':'Camera could not start. Open this page directly in Chrome or Safari over HTTPS and check camera permissions.');}finally{working.current=false;setBusy(false);}
 }
 async function confirm(){if(!ticket||!identity||ticket.checkedIn||working.current)return;working.current=true;setBusy(true);const old=ticket;try{const {response,result:r}=await deskRequest<Result>({action:'confirm',reference:old.regId,eventId:old.eventId,identityChecked:true},setMessage);if(response.status===401)setAccess(null);if(r.success&&r.ticket&&!document.hidden){setTicket(r.ticket);setIdentity(false);setMessage(r.message||'Attendance recorded.');}else{clear();setMessage(r.message||'Look up the ticket again before retrying.');}}catch{clear();setMessage('Save outcome is uncertain. Look up the ticket again before retrying.');}finally{working.current=false;setBusy(false);}}
 async function logout(){stop();clear();await fetch('/api/scanner',{method:'DELETE'});setAccess(null);(window as Window & {google?:GIS}).google?.accounts.id.disableAutoSelect();setMessage('Signed out.');}
 return <main className="mx-auto max-w-5xl px-4 pb-16 pt-28 text-white">
  {clientId&&<Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={()=>setGoogleReady(true)} onReady={()=>setGoogleReady(true)}/>}
  <header className="mb-6 flex items-center gap-4"><Image src="/images/brand/esparto-logo.png" width={96} height={72} alt="ESPARTO"/><div><p className="text-xs tracking-widest text-orange-300">SSG · HITAM · ORGANIZER ACCESS</p><h1 className="text-3xl font-bold">Live ticket scanner</h1><p className="mt-1 text-sm text-slate-300">Point at the QR. Check college IDs. Confirm attendance.</p></div></header>
  <p role="status" aria-live="polite" className="mb-5 rounded-xl border border-white/15 bg-white/5 p-4">{message}</p>
  {!access?<section className="rounded-2xl border border-white/15 p-6"><h2 className="mb-3 text-xl font-semibold">Staff sign-in</h2>{clientId?<div ref={loginButton}/>:<p>Secure scanner sign-in is awaiting administrator setup. Participant records remain inaccessible.</p>}<p className="mt-4 text-sm text-slate-400">Only explicitly approved HITAM Google accounts can access this desk.</p></section>:<>
   <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm"><span>{access.email}</span><button className="rounded-lg border border-white/20 px-4 py-3" onClick={()=>void logout()} disabled={busy}>Sign out</button></div>
   <label className="mb-2 block" htmlFor="desk-event">Your event desk</label><select id="desk-event" value={eventId} disabled={busy||active} onChange={e=>{stop();clear();setEvent(e.target.value);selectedEvent.current=e.target.value;}} className="mb-5 min-h-12 w-full rounded-xl bg-slate-900 p-3 text-base">{access.events.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}</select>
   <section className="relative aspect-[3/4] max-h-[65vh] w-full overflow-hidden rounded-2xl border border-white/20 bg-black sm:aspect-video" aria-label="Live QR camera">
    <video ref={video} playsInline muted className="h-full w-full object-contain"/>
    {!active&&<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"><p className="text-xl">{busy?'Processing…':'Ready to scan a ticket'}</p><p className="text-sm text-slate-300">The camera stays inside this page.</p><button onClick={()=>void start()} disabled={busy} className="min-h-14 rounded-xl bg-orange-500 px-8 font-bold text-black disabled:opacity-50">Start camera</button></div>}
    {active&&<div className="pointer-events-none absolute inset-0 flex items-center justify-center"><div className="h-52 w-52 rounded-2xl border-4 border-orange-400 sm:h-64 sm:w-64"/></div>}
   </section>
   {active&&<button onClick={stop} className="mt-3 min-h-12 w-full rounded-xl border border-white/20">Stop camera</button>}
   <p className="my-3 text-sm text-slate-400">Keep the whole QR visible and hold steady. Detection automatically loads the ticket; camera frames stay on this device.</p>
   <details className="mb-6 rounded-xl border border-white/10 p-4"><summary>Camera unavailable? Enter ticket reference</summary><form onSubmit={e=>{e.preventDefault();void lookup(reference);}} className="mt-3 flex flex-wrap gap-2"><input aria-label="Ticket reference" value={reference} onChange={e=>setReference(e.target.value)} required maxLength={100} disabled={busy} placeholder="ESP26-HITM-E08-001" className="min-h-12 min-w-0 flex-1 rounded-lg bg-slate-900 px-3"/><button disabled={busy} className="rounded-lg bg-white px-4 py-3 text-black">Look up</button></form></details>
   {ticket&&<section ref={resultPanel} className="scroll-mt-24 rounded-2xl border border-white/20 bg-white/5 p-5"><h2 className="text-2xl font-bold">{ticket.checkedIn?'Already checked in':'Verified ticket'}</h2><p className="my-2 break-all font-mono text-orange-300">{ticket.regId}</p><p>{ticket.eventTitle}</p><p className="mt-2 text-sm text-slate-300">{ticket.teamName} · {ticket.college}</p><div className="my-4 space-y-3">{ticket.members.map((m,i)=><div key={i} className="rounded-xl border border-white/10 p-3"><strong>{m.name}</strong><p>{m.rollNo||'Roll number not provided'} · {m.role}</p></div>)}</div>{!ticket.checkedIn&&<><label className="flex gap-3"><input type="checkbox" checked={identity} disabled={busy} onChange={e=>setIdentity(e.target.checked)} className="mt-1 h-5 w-5 shrink-0"/><span>I compared every listed participant with their college ID and the whole registration is present.</span></label><button disabled={!identity||busy} onClick={()=>void confirm()} className="mt-4 min-h-14 w-full rounded-xl bg-emerald-500 font-bold text-black disabled:opacity-40">Confirm attendance</button></>}<button onClick={()=>{clear();setMessage('Ready for the next ticket.');void start();}} disabled={busy} className="mt-4 min-h-12 w-full rounded-xl border border-white/20">Scan next ticket</button><p className="mt-3 text-sm text-slate-400">Attendance covers the whole registration. QR possession alone is not identity verification. Payment status cannot be changed here.</p></section>}
  </>}
 </main>;
}
