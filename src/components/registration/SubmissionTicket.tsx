'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Download, Printer, Mail, Clock3, ArrowRight } from 'lucide-react';
import { BrandHeader, ticketBrands } from './BrandHeader';
import type { FestEventItem } from '@/data/events';
export type SubmissionReceipt={regId:string;eventTitle:string;leadName:string;amount:number;status:string;replayed?:boolean;teamName?:string;teamSize?:number;utr?:string};
export type TicketMember={name:string;email:string;phone:string;rollNo:string;branch:string;year:string};
type Props={receipt:SubmissionReceipt;event:FestEventItem;teamName:string;institution:string;members:TicketMember[];utr:string;onRecover:()=>void;busy:boolean};
function loadImage(src:string):Promise<HTMLImageElement>{return new Promise((resolve,reject)=>{const image=new window.Image();image.onload=()=>resolve(image);image.onerror=()=>reject(Error('Logo could not load'));image.src=src;});}
export default function SubmissionTicket({receipt,event,teamName,institution,members,utr,onRecover,busy}:Props) {
 const [downloading,setDownloading]=useState(false);const [error,setError]=useState('');
 async function download(){setDownloading(true);setError('');try{
  const logos=await Promise.all(ticketBrands.map(brand=>loadImage(brand.src)));
  const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=1550;const ctx=canvas.getContext('2d');if(!ctx)throw Error('Download unavailable');
  ctx.fillStyle='#08041c';ctx.fillRect(0,0,1000,1550);ctx.fillStyle='#ffffff';ctx.fillRect(50,50,900,170);
  logos.forEach((logo,index)=>{const limit=index===1?280:100;const scale=Math.min(limit/logo.width,120/logo.height);const width=logo.width*scale,height=logo.height*scale;ctx.drawImage(logo,[225,500,775][index]-width/2,135-height/2,width,height);});
  const text=(value:string,x:number,y:number,size:number,color='#ffffff')=>{ctx.font=`${size>=28?'600':'400'} ${size}px Arial, sans-serif`;ctx.fillStyle=color;ctx.fillText(value,x,y);};
  const wrap=(value:string,x:number,y:number,max:number,size:number,color='#ffffff')=>{ctx.font=`400 ${size}px Arial, sans-serif`;let line='';for(const word of value.split(' ')){const candidate=line+word+' ';if(ctx.measureText(candidate).width>max && line){text(line,x,y,size,color);y+=size*1.5;line=word+' ';}else line=candidate;}text(line,x,y,size,color);return y+size*1.5;};
  text('LOCAL TEST • NOT VALID FOR EVENT ENTRY',65,265,24,'#fbbf24');
  text('REGISTRATION SUBMISSION',65,330,36);let y=wrap(event.title,65,390,870,38);
  ctx.fillStyle='#1a1232';ctx.fillRect(50,y+10,900,150);text('REGISTRATION REFERENCE',75,y+55,20,'#b9afcc');text(receipt.regId,75,y+110,38);y+=205;
  const rows=[['Status','Pending organizer payment verification'],['Team',teamName],['Lead',receipt.leadName],['Institution',institution],['Participants',String(members.length)],['Submitted amount',`INR ${receipt.amount}`],['UPI reference',utr],['Date',event.date],['Time',event.timings],['Venue',event.venue]];
  rows.forEach(([label,value])=>{text(label.toUpperCase(),65,y,18,'#b9afcc');y=wrap(value,345,y,590,23);y+=13;});
  y+=10;text('KEEP THIS SUBMISSION E-TICKET FOR YOUR RECORDS',65,y,23,'#ff9c54');y+=45;
  y=wrap('After payment verification, your confirmed event ticket, QR code and WhatsApp group link will be emailed from elysian@hitam.org.',65,y,850,23,'#e3ddec');
  y+=18;wrap('LOCAL TEST: No payment was collected. No email was sent. This document does not confirm payment or authorize event entry.',65,y,850,21,'#fbbf24');
  const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(Error('Could not create ticket')),'image/png'));
  const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`${receipt.regId}-local-submission-ticket.png`;link.click();window.setTimeout(()=>URL.revokeObjectURL(url),10000);
 }catch{setError('The ticket could not download. Please retry or use Print / Save PDF.');}finally{setDownloading(false);}}
 return <main id="main-content" className="max-w-3xl mx-auto px-5 py-10 sm:py-14">
  <div className="submission-ticket rounded-3xl border border-white/15 overflow-hidden shadow-[0_20px_80px_rgba(121,40,202,0.12)] bg-[#0c0720]">
   <div className="px-5 sm:px-9 pt-7 pb-8 bg-gradient-to-b from-brand-violet/15 to-transparent"><BrandHeader/>
    <p className="mt-6 text-center text-xs font-mono tracking-widest text-amber-300">LOCAL TEST RECEIPT — not valid for entry</p>
    <CheckCircle2 className="mx-auto my-5 h-12 w-12 text-emerald-400" aria-hidden="true"/>
    <h1 className="text-3xl sm:text-4xl font-display font-bold text-center">Registration submitted</h1>
    <p className="text-text-secondary text-center mt-4 leading-relaxed">Your submission and test payment proof have been saved.<br/>Organizer payment verification is pending.</p>
   </div>
   <div className="border-y border-dashed border-white/20 p-6 sm:px-9 bg-white/[0.025]"><p className="text-xs uppercase tracking-widest text-text-muted mb-2">Registration reference</p><p data-testid="ticket-reference" className="font-mono text-xl sm:text-3xl font-bold break-all">{receipt.regId}</p></div>
   <div className="p-6 sm:p-9">
    <div className="flex items-start gap-3 rounded-xl bg-amber-300/10 border border-amber-300/20 p-4 mb-7"><Clock3 className="w-5 h-5 shrink-0 text-amber-300"/><p className="text-amber-200">Payment status: {receipt.status}</p></div>
    <h2 className="text-2xl font-bold mb-5">{event.title}</h2>
    <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-5">{Object.entries({'Team / participant':teamName,'Lead participant':receipt.leadName,Institution:institution,Participants:String(members.length),'Submitted amount':`₹${receipt.amount}`,'UPI transaction reference':utr,Date:event.date,Schedule:event.timings,Venue:event.venue}).map(([label,value])=><div key={label}><dt className="text-text-muted text-xs uppercase tracking-wide">{label}</dt><dd className="mt-1 font-medium break-words">{value}</dd></div>)}</dl>
    <section className="mt-8 rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-5"><div className="flex items-center gap-2 mb-3"><Mail className="w-5 h-5 text-brand-orange"/><h2 className="font-bold text-lg">Your confirmed ticket will arrive by email</h2></div><p className="text-text-secondary leading-relaxed">Thank you for registering for this event. After your payment is verified, you will receive an email from <strong className="text-white">elysian@hitam.org</strong> with your <strong className="text-white">event ticket, QR code, and WhatsApp group link</strong> for event communication. Keep this submission e-ticket for your records.</p><p className="text-amber-200 mt-3 text-sm">This local test sends no emails and takes no payment.</p></section>
    {receipt.replayed&&<p role="status" className="text-emerald-300 mt-5">Existing submission recovered; no duplicate registration.</p>}
    <p className="text-text-muted text-sm mt-6">A submission e-ticket does not confirm bank settlement or authorize entry. A confirmed QR is issued only after organizer verification.</p>
   </div>
  </div>
  <div className="ticket-actions mt-6 flex flex-col sm:flex-row gap-3"><button onClick={download} disabled={downloading} className="flex min-h-12 items-center justify-center gap-2 bg-brand-orange rounded-xl px-5 py-3 font-bold disabled:opacity-50"><Download className="w-5 h-5"/>{downloading?'Preparing ticket…':'Download submission e-ticket'}</button><button onClick={()=>window.print()} className="flex min-h-12 items-center justify-center gap-2 border border-white/20 rounded-xl px-5 py-3"><Printer className="w-5 h-5"/>Print / Save PDF</button></div>
  {error&&<p role="alert" className="text-red-300 mt-4">{error}</p>}
  <div className="ticket-actions flex flex-wrap gap-5 mt-6 text-sm"><Link className="flex items-center gap-1 text-brand-orange" href="/events">Explore other events <ArrowRight className="w-4 h-4"/></Link><button onClick={onRecover} disabled={busy} className="text-text-muted">Test recovery of same submission</button></div>
  <style>{`@media print {body * {visibility:hidden!important} .submission-ticket,.submission-ticket * {visibility:visible!important} .submission-ticket {position:absolute;left:0;top:0;width:100%;border:1px solid #ddd;box-shadow:none;background:#fff;color:#111} .submission-ticket * {color:#111!important} .ticket-actions {display:none!important} @page {size:A4;margin:12mm}}`}</style>
 </main>;
}
