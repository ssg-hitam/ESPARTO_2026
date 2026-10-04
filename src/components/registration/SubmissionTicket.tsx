'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Download, Printer, Mail, ArrowRight } from 'lucide-react';
import { BrandHeader, ticketBrands } from './BrandHeader';
import type { FestEventItem } from '@/data/events';
import { ticketSupport } from './ticketSupport';
export type SubmissionReceipt={regId:string;eventTitle:string;leadName:string;amount:number;status:string;replayed?:boolean;teamName?:string;teamSize?:number;utr?:string};
export type TicketMember={name:string;email:string;phone:string;rollNo:string;branch:string;year:string};
type Props={receipt:SubmissionReceipt;event:FestEventItem;teamName:string;institution:string;members:TicketMember[];utr:string;onRecover:()=>void;busy:boolean;googleTest?:boolean};
function loadImage(src:string):Promise<HTMLImageElement>{return new Promise((resolve,reject)=>{const image=new window.Image();image.onload=()=>resolve(image);image.onerror=()=>reject(Error('Logo could not load'));image.src=src;});}
export default function SubmissionTicket({receipt,event,teamName,institution,members,utr,onRecover,busy,googleTest=false}:Props) {
 const [downloading,setDownloading]=useState(false);const [error,setError]=useState('');
 async function download(){setDownloading(true);setError('');try{
  const logos=await Promise.all(ticketBrands.map(brand=>loadImage(brand.src)));
  const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=4000;
  const context=canvas.getContext('2d');if(!context)throw Error('Download unavailable');const ctx=context;
  ctx.fillStyle='#0c0720';ctx.fillRect(0,0,1000,4000);
  const center=(value:string,y:number,size:number,color='#ffffff',bold=false,x=500)=>{ctx.font=`${bold?'600':'400'} ${size}px Arial, sans-serif`;ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(value,x,y);};
  const wrap=(value:string,y:number,width:number,size=24,color='#ffffff',x=500,bold=false)=>{
    ctx.font=`${bold?'600':'400'} ${size}px Arial, sans-serif`;
    const lines:string[]=[];let line='';
    for(const word of value.split(/\s+/)){
      if(ctx.measureText(word).width>width){if(line){lines.push(line);line='';}for(const char of word){if(ctx.measureText(line+char).width>width){lines.push(line);line=char;}else line+=char;}}
      else if(line && ctx.measureText(line+' '+word).width>width){lines.push(line);line=word;}
      else line+=(line?' ':'')+word;
    }
    if(line)lines.push(line);
    lines.forEach((text,index)=>center(text,y+index*size*1.4,size,color,bold,x));
    return y+Math.max(lines.length,1)*size*1.4;
  };
  const divider=(y:number)=>{ctx.strokeStyle='#443754';ctx.lineWidth=2;ctx.setLineDash([9,9]);ctx.beginPath();ctx.moveTo(65,y);ctx.lineTo(935,y);ctx.stroke();ctx.setLineDash([]);};
  ctx.fillStyle='#ffffff';ctx.beginPath();ctx.roundRect(65,60,870,150,22);ctx.fill();
  logos.forEach((logo,index)=>{const limit=index===1?250:95;const scale=Math.min(limit/logo.width,105/logo.height);const width=logo.width*scale,height=logo.height*scale;ctx.drawImage(logo,[235,500,765][index]-width/2,135-height/2,width,height);});
  center('ESPARTO 2026 · SUBMISSION E-TICKET',260,22,'#ffad6a',true);
  let y=wrap(event.title,315,820,36,'#ffffff',500,true);
  center(googleTest?'GOOGLE SHEETS TEST — NOT VALID FOR ENTRY':'LOCAL TEST — NOT VALID FOR ENTRY',y+15,20,'#fbbf24');y+=65;
  center('REGISTRATION REFERENCE',y,17,'#b9afcc');center(receipt.regId,y+43,34,'#ffffff',true);y+=90;
  const perforation=y;divider(y);y+=55;
  center('REGISTRATION SUCCESSFUL',y,26,'#34d399',true);y+=50;
  y=wrap('Your registration and payment reference have been received. After payment verification, your event ticket, QR code and WhatsApp group link will arrive by email.',y,800,22,'#e3ddec');y+=30;
  y=wrap('Check payment status: https://www.espartohitam.com/payment-status',y,800,22,'#ffad6a');y+=45;
  center('YOUR REGISTRATION DETAILS',y,20,'#ffad6a',true);y+=55;
  const pair=(leftLabel:string,leftValue:string,rightLabel:string,rightValue:string)=>{center(leftLabel.toUpperCase(),y,16,'#b9afcc',false,280);center(rightLabel.toUpperCase(),y,16,'#b9afcc',false,720);const left=wrap(leftValue,y+34,380,24,'#ffffff',280,true);const right=wrap(rightValue,y+34,380,24,'#ffffff',720,true);y=Math.max(left,right)+35;};
  pair('Team / participant',teamName,'Lead participant',receipt.leadName);
  pair('Institution',institution,'Participants',String(members.length));
  pair('Submitted amount',`INR ${receipt.amount}`,'UPI reference',utr);
  pair('Event date',event.date,'Schedule',event.timings);
  center('VENUE',y,16,'#b9afcc');y=wrap(event.venue,y+34,800,24,'#ffffff',500,true)+35;
  divider(y);y+=45;center('PARTICIPANTS',y,20,'#ffad6a',true);y+=38;
  members.forEach((member,index)=>{y=wrap(`${index===0?'Team lead':'Member '+(index+1)} · ${member.name}`,y,800,23,'#ffffff',500,true);y=wrap([member.rollNo,member.branch,member.year?'Year '+member.year:''].filter(Boolean).join(' · '),y+4,800,20,'#b9afcc');if(member.email)y=wrap(member.email,y+4,800,20,'#b9afcc');y+=25;});
  divider(y);y+=45;center('WHAT HAPPENS NEXT?',y,20,'#ffad6a',true);y+=35;
  y=wrap('After organizer payment verification, your confirmed ticket, QR code and WhatsApp group link will be emailed from elysian@hitam.org.',y,800,22,'#e3ddec');y+=30;
  center('REGISTRATION SUPPORT',y,20,'#ffad6a',true);y+=36;
  center(`${ticketSupport.hemanth.name}: +91 ${ticketSupport.hemanth.phone}`,y,23);y+=35;
  center(`${ticketSupport.tejal.name}: +91 ${ticketSupport.tejal.phone}`,y,23);y+=35;center(ticketSupport.email,y,23,'#ffad6a');y+=55;
  y=wrap('Keep this submission e-ticket for your records. Payment is not yet verified. This local test makes no payment and sends no email.',y,800,20,'#fbbf24');
  const height=Math.ceil(y+55);const ticket=document.createElement('canvas');ticket.width=1000;ticket.height=height;const output=ticket.getContext('2d');if(!output)throw Error('Download unavailable');
  output.beginPath();output.roundRect(24,24,952,height-48,36);output.clip();output.drawImage(canvas,0,0);
  output.globalCompositeOperation='destination-out';[24,976].forEach(x=>{output.beginPath();output.arc(x,perforation,22,0,Math.PI*2);output.fill();});output.globalCompositeOperation='source-over';
  const blob=await new Promise<Blob>((resolve,reject)=>ticket.toBlob(value=>value?resolve(value):reject(Error('Could not create ticket')),'image/png'));
  const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`${receipt.regId}-${googleTest?'google-test':'local'}-submission-ticket.png`;link.click();window.setTimeout(()=>URL.revokeObjectURL(url),10000);
 }catch{setError('The ticket could not download. Please retry or use Print / Save PDF.');}finally{setDownloading(false);}}
 return <main id="main-content" className="max-w-3xl mx-auto px-5 py-10 sm:py-14">
  <div className="submission-ticket rounded-3xl border border-white/15 overflow-hidden shadow-[0_20px_80px_rgba(121,40,202,0.12)] bg-[#0c0720]">
   <div className="px-5 sm:px-9 pt-7 pb-8 bg-gradient-to-b from-brand-violet/15 to-transparent"><BrandHeader/>
    <p className="mt-6 text-center text-xs font-mono tracking-widest text-amber-300">{googleTest?'GOOGLE SHEETS TEST RECEIPT — not valid for entry':'LOCAL TEST RECEIPT — not valid for entry'}</p>
    <CheckCircle2 className="mx-auto my-5 h-12 w-12 text-emerald-400" aria-hidden="true"/>
    <h1 className="text-3xl sm:text-4xl font-display font-bold text-center">Registration successful</h1>
    <p className="text-text-secondary text-center mt-4 leading-relaxed">Your registration and test payment proof have been received successfully.</p>
   </div>
   <div className="border-y border-dashed border-white/20 p-6 sm:px-9 bg-white/[0.025] text-center"><p className="text-xs uppercase tracking-widest text-text-muted mb-2">Registration reference</p><p data-testid="ticket-reference" className="font-mono text-xl sm:text-3xl font-bold break-all">{receipt.regId}</p></div>
   <div className="p-6 sm:p-9">
    <section className="mb-7 rounded-xl bg-emerald-400/10 border border-emerald-400/20 p-5 text-center"><p className="font-semibold text-emerald-300">Thank you for registering!</p><p className="mt-2 text-text-secondary">After payment verification, your event ticket, QR code and WhatsApp group link will be emailed from elysian@hitam.org.</p><Link href="/payment-status" className="inline-block mt-4 text-brand-orange underline">Check your payment status</Link></section>
    <h2 className="text-2xl font-bold mb-5 text-center">{event.title}</h2>
    <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-5 text-center">{Object.entries({'Team / participant':teamName,'Lead participant':receipt.leadName,Institution:institution,Participants:String(members.length),'Submitted amount':`₹${receipt.amount}`,'UPI transaction reference':utr,Date:event.date,Schedule:event.timings,Venue:event.venue}).map(([label,value])=><div key={label}><dt className="text-text-muted text-xs uppercase tracking-wide">{label}</dt><dd className="mt-1 font-medium break-words">{value}</dd></div>)}</dl>
    <section className="mt-7 text-center"><h2 className="text-sm uppercase tracking-widest text-text-muted mb-4">Participants</h2>{members.map((member,index)=><div className="my-4" key={index}><p className="font-semibold">{member.name}</p><p className="text-sm text-text-muted">{member.rollNo} · {member.branch} · Year {member.year}</p><p className="text-sm text-text-secondary break-all">{member.email}</p></div>)}</section>
    <section className="mt-8 rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-5"><div className="flex items-center gap-2 mb-3"><Mail className="w-5 h-5 text-brand-orange"/><h2 className="font-bold text-lg">Your confirmed ticket will arrive by email</h2></div><p className="text-text-secondary leading-relaxed">Thank you for registering for this event. After your payment is verified, you will receive an email from <strong className="text-white">elysian@hitam.org</strong> with your <strong className="text-white">event ticket, QR code, and WhatsApp group link</strong> for event communication. Keep this submission e-ticket for your records.</p><p className="text-amber-200 mt-3 text-sm">This local test sends no emails and takes no payment.</p></section>
    {receipt.replayed&&<p role="status" className="text-emerald-300 mt-5">Existing submission recovered; no duplicate registration.</p>}
    <section className="mt-7 border-t border-dashed border-white/20 pt-6 text-center"><h2 className="font-bold mb-3">Registration support</h2><p className="my-2"><a href={`tel:+91${ticketSupport.hemanth.phone}`}>{ticketSupport.hemanth.name} · +91 {ticketSupport.hemanth.phone}</a></p><p className="my-2"><a href={`tel:+91${ticketSupport.tejal.phone}`}>{ticketSupport.tejal.name} · +91 {ticketSupport.tejal.phone}</a></p><a className="text-brand-orange" href={`mailto:${ticketSupport.email}`}>{ticketSupport.email}</a></section>
    <p className="text-text-muted text-sm mt-6">A submission e-ticket does not confirm bank settlement or authorize entry. A confirmed QR is issued only after organizer verification.</p>
   </div>
  </div>
  <div className="ticket-actions mt-6 flex flex-col sm:flex-row gap-3"><button onClick={download} disabled={downloading} className="flex min-h-12 items-center justify-center gap-2 bg-brand-orange rounded-xl px-5 py-3 font-bold disabled:opacity-50"><Download className="w-5 h-5"/>{downloading?'Preparing ticket…':'Download submission e-ticket'}</button><button onClick={()=>window.print()} className="flex min-h-12 items-center justify-center gap-2 border border-white/20 rounded-xl px-5 py-3"><Printer className="w-5 h-5"/>Print / Save PDF</button></div>
  {error&&<p role="alert" className="text-red-300 mt-4">{error}</p>}
  <div className="ticket-actions flex flex-wrap gap-5 mt-6 text-sm"><Link className="flex items-center gap-1 text-brand-orange" href="/events">Explore other events <ArrowRight className="w-4 h-4"/></Link><button onClick={onRecover} disabled={busy} className="text-text-muted">Test recovery of same submission</button></div>
  <style>{`@media print {body * {visibility:hidden!important} .submission-ticket,.submission-ticket * {visibility:visible!important} .submission-ticket {position:absolute;left:0;top:0;width:100%;border:1px solid #ddd;box-shadow:none;background:#fff;color:#111} .submission-ticket * {color:#111!important} .ticket-actions {display:none!important} @page {size:A4;margin:12mm}}`}</style>
 </main>;
}
