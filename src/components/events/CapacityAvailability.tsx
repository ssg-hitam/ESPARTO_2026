'use client';
import { useEffect, useState } from 'react';
type Availability={slug:string;capacity:number;registered:number;remaining:number;registrationOpen:boolean};
let pending:Promise<Availability[]>|undefined;
let cached:{expires:number;events:Availability[]}|undefined;
function readAvailability(){
 if(cached&&cached.expires>Date.now())return Promise.resolve(cached.events);
 if(pending)return pending;
 pending=fetch('/api/registration',{cache:'no-store'}).then(async response=>{const result=await response.json();if(!response.ok||!result.success)throw Error('Unavailable');const events=(result.events||[]).filter((e:Availability)=>Number.isInteger(e.capacity)&&e.capacity>0&&Number.isInteger(e.remaining)&&typeof e.registrationOpen==='boolean');cached={expires:Date.now()+15000,events};return events;}).finally(()=>{pending=undefined;});
 return pending;
}
export default function CapacityAvailability({slug,link=false}:{slug:string;link?:boolean}){
 const [availability,setAvailability]=useState<Availability>();
 const [failed,setFailed]=useState(false);
 useEffect(()=>{let active=true;const refresh=()=>{void readAvailability().then(events=>{if(active){const event=events.find(e=>e.slug===slug);setAvailability(event);setFailed(!event);}}).catch(()=>{if(active){setAvailability(undefined);setFailed(true);}});};refresh();const timer=setInterval(refresh,30000);return()=>{active=false;clearInterval(timer);};},[slug]);
 const open=availability?.registrationOpen===true&&availability.remaining>0;
 return <aside className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-center mb-4" aria-live="polite">
  <p className="font-bold text-amber-200">{availability?`${availability.remaining} participant spots left · ${availability.registered} / ${availability.capacity} registered`:failed?'Availability temporarily unavailable':'Checking remaining spots…'}</p>
  <p className="mt-1 text-xs text-text-secondary">Selected registration options only · Total payment below ₹150 · Availability refreshes every 30 seconds.</p>
  {link&&(open?<a href={`/events/${slug}/register`} className="inline-block mt-3 rounded-lg bg-brand-orange px-5 py-3 font-bold">Register for event →</a>:<p className="mt-3 font-bold">{availability?'Registration closed — target reached':'Registration availability not confirmed'}</p>)}
 </aside>;
}
