'use client';
import { useEffect, useRef, useState } from 'react';
import { registrationRequest } from '@/lib/registration/request';
import { reopenedRegistrationAmount } from '@/lib/registration/reopening';
import { readRecovery, submissionIssue } from '@/lib/registration/recovery';
import Link from 'next/link';
import Image from 'next/image';
import type { FestEventItem } from '@/data/events';
import { BrandHeader } from '@/components/registration/BrandHeader';
import SubmissionTicket from '@/components/registration/SubmissionTicket';
import { CalendarDays, MapPin, Users, ShieldCheck, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';
type Member={name:string;email:string;phone:string;rollNo:string;branch:string;year:string};
type BackendEvent={promoCode?:string;promoFee?:number;id:string;slug:string;minTeam:number;maxTeam:number;hitamFee:number;otherFee:number;feeModel:string;allowedTeamSizes?:number[];soloHitamFee?:number;soloOtherFee?:number;teamHitamFee?:number;teamOtherFee?:number;registrationForm?:{tagline:string;intro:string;highlights:string[];categories?:string[];rules:string[]}|null};
type Receipt={regId:string;eventTitle:string;leadName:string;amount:number;status:string;replayed?:boolean};
const emptyMember=():Member=>({name:'',email:'',phone:'',rollNo:'',branch:'',year:''});
type PendingSubmission={promoCode?:string;requestId:string;eventId:string;eventSlug:string;institution:string;college:string;teamSize:number;teamName:string;referralSource:string;lead:Member;members:Member[];totalFee:number;utrNumber:string;agreement:boolean;screenshotBase64:string;customDetails:string;eventAnswers:{category:string;consents:boolean[]}|null};
const branches=['CSE','CSM','CSD','ECE','EEE','MECH','ITP - CSE','ITP - MECH','IIBMP'];
const field='w-full rounded-lg border border-white/20 bg-[#120b25] p-3 text-white min-h-12 scroll-mt-28';
const req=<span className="text-brand-orange font-bold ml-1 text-sm select-none" aria-hidden="true" title="Required">*</span>;
const DEFAULT_PAYMENT={upiId:'qr.hitam@sib',payee:'HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT',paymentQrUrl:'https://drive.google.com/thumbnail?id=1WWKBVMZlGpDm5s9Rh7hOH5cdaTJ8Msuz&sz=w1000'};
const STATIC_BACKEND_EVENTS:Record<string,BackendEvent>={
 'reverse-hackathon':{id:'E02',slug:'reverse-hackathon',minTeam:2,maxTeam:3,hitamFee:550,otherFee:600,feeModel:'team',registrationForm:{tagline:'Build What Wasn’t Built Before!',intro:'Work backwards from a mystery product revealed at the opening ceremony: discover who needs it, diagnose what is broken, and design an original replacement.',highlights:['October 9, 2026 · HITAM Campus','Zero eliminations: every team completes Diagnosis, Rebuild and Pitch.','Strictly no AI: original, human problem-solving at every stage.','Teams of 2–3 participants, including the team leader.'],rules:['I confirm my team will not use AI tools (ChatGPT, Copilot, image/text generators, or similar) at any stage of the competition.','I have read and agree to the Reverse Hackathon rules and understand that violations lead to disqualification.','I consent to photography/video during the event.']}},
 'agentic-ai-workshop-hackathon':{id:'E03',slug:'agentic-ai-workshop-hackathon',minTeam:1,maxTeam:4,hitamFee:150,otherFee:150,feeModel:'person'},
 'programmers-got-talent':{id:'E04',slug:'programmers-got-talent',minTeam:1,maxTeam:1,hitamFee:150,otherFee:150,feeModel:'person',registrationForm:{tagline:'Your Code. Your Build. Center Stage.',intro:'A stage-based showcase where students get the opportunity to demonstrate their software, hardware, coding, electronics, or other technical skills live.',highlights:['October 10, 2026 · HITAM Campus','Zero eliminations: every act performs in all three rounds through the Grand Finale.','A live 3-minute spotlight, a surprise Twist Challenge and a finale with audience voting.','Any technical, working live demonstration belongs on stage.'],categories:['Software','Hardware','Robotics','Electronics','Competitive coding','Other technical demonstration'],rules:['I confirm this build/performance is my own original work.','I understand a live, working demo is required and pre-recorded footage may only be used as brief supporting b-roll.','I agree to strict time limits and understand my slot will be cut off at the buzzer.','I consent to photography/video during the event.']}},
 'smart-manufacturing-challenge':{id:'E05',slug:'smart-manufacturing-challenge',minTeam:1,maxTeam:4,hitamFee:200,otherFee:300,feeModel:'team',allowedTeamSizes:[1,4],soloHitamFee:100,soloOtherFee:150},
 'ieom-startup-pitch':{id:'E06',slug:'ieom-startup-pitch',minTeam:1,maxTeam:4,hitamFee:200,otherFee:300,feeModel:'team',allowedTeamSizes:[1,4],soloHitamFee:100,soloOtherFee:150},
 'dataquest-kaggle':{id:'E07',slug:'dataquest-kaggle',minTeam:2,maxTeam:2,hitamFee:300,otherFee:300,feeModel:'team'},
 'n8n-automation-challenge':{id:'E08',slug:'n8n-automation-challenge',minTeam:2,maxTeam:2,hitamFee:300,otherFee:300,feeModel:'team'},
 'data-heist-datathon':{id:'E09',slug:'data-heist-datathon',minTeam:2,maxTeam:4,hitamFee:200,otherFee:300,feeModel:'team'},
 'data-dossier':{id:'E10',slug:'data-dossier',minTeam:2,maxTeam:4,hitamFee:100,otherFee:200,feeModel:'team'},
 'torquex-motorsport':{id:'E11',slug:'torquex-motorsport',minTeam:1,maxTeam:4,hitamFee:50,otherFee:70,feeModel:'person',teamHitamFee:100,teamOtherFee:140},
 'build-first-robot':{id:'E12',slug:'build-first-robot',minTeam:1,maxTeam:4,hitamFee:250,otherFee:250,feeModel:'team'},
 'code-casino':{id:'E13',slug:'code-casino',minTeam:2,maxTeam:3,hitamFee:50,otherFee:60,feeModel:'person'},
 'technical-tambola':{id:'E14',slug:'technical-tambola',minTeam:1,maxTeam:1,hitamFee:50,otherFee:60,feeModel:'person'}
};
async function api(action:string,payload?:unknown,googleTest=false){const response=await fetch(googleTest?'/api/registration':'/api/registration-preview',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,payload})});return response.json();}
export default function RegistrationPilot({displayEvent,googleTest=false,live=false}:{displayEvent:FestEventItem;googleTest?:boolean;live?:boolean}) {
 const backendSlug=displayEvent.slug, title=displayEvent.title;
 const initialBackendEvent=STATIC_BACKEND_EVENTS[backendSlug];
 const [payment,setPayment]=useState<{upiId:string;payee:string;paymentQrUrl:string}>(DEFAULT_PAYMENT);
 const [event,setEvent]=useState<BackendEvent | undefined>(initialBackendEvent);
 const [institution,setInstitution]=useState('HITAM');
 const [college,setCollege]=useState('');
 const [team,setTeam]=useState('');
 const defaultSize=initialBackendEvent ? (initialBackendEvent.id==='E03'?2:initialBackendEvent.minTeam) : 2;
 const [members,setMembers]=useState<Member[]>(()=>Array.from({length:defaultSize},()=>emptyMember()));
 const [category,setCategory]=useState('');
 const [consents,setConsents]=useState<boolean[]>(()=>(initialBackendEvent?.registrationForm?.rules||[]).map(()=>false));
 const [referral,setReferral]=useState('');
 const [utr,setUtr]=useState('');
 const [proof,setProof]=useState('');
 const [agreement,setAgreement]=useState(false);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const [receipt,setReceipt]=useState<Receipt>();
 const [issueCode,setIssueCode]=useState('');
 const [draftReady,setDraftReady]=useState(false);
 const [step,setStep]=useState(1);
 const [locked,setLocked]=useState(false);
 const [recoveryNote,setRecoveryNote]=useState('');
 const storageKey=`esparto-pending-v1:${live?'live':googleTest?'google-test':'local'}:${backendSlug}`;
 const draftKey=storageKey.replace('pending-v1','draft-v1');
 function clearDraft(){try{sessionStorage.removeItem(draftKey);}catch{}}
 function clearPending(){try{sessionStorage.removeItem(storageKey);}catch{}}
 const requestId=useRef('');
 const submitted=useRef<PendingSubmission | undefined>(undefined);
 const inFlight=useRef(false);
 const [catalogueError,setCatalogueError]=useState('');
 const catalogueLoading=useRef(false);
 async function load(){
  if(catalogueLoading.current)return;
  catalogueLoading.current=true;setCatalogueError('');
  try{
   const data=await registrationRequest(()=>api('catalogue',undefined,googleTest));
   if(!data.success)throw Error(data.code==='BUSY'?'The registration service is busy. Retry loading in a few seconds.':data.message||'Could not connect to registration. Retry loading; your details are still here.');
   const found=data.events?.find((item:BackendEvent)=>item.slug===backendSlug);
   if(!found)throw Error('This event could not be loaded. Retry loading or contact SSG.');
   if(live && (!data.registrationAvailable||!data.payment?.upiId))throw Error('Registration payment configuration is unavailable. Please contact SSG.');
   if(data.payment?.upiId)setPayment(data.payment);
   setEvent(found);setCatalogueError('');
  }catch(err){
   setCatalogueError(err instanceof Error?err.message:'Connection interrupted. Retry loading; your details are still here.');
  }finally{catalogueLoading.current=false;}
 }
 useEffect(()=>{
  requestId.current=crypto.randomUUID().replaceAll('-','');
  try{
   const raw=sessionStorage.getItem(storageKey);
   if(raw){
    const saved=JSON.parse(raw);
    const p=saved.payload as PendingSubmission;
    if(saved.expires>Date.now()&&p.eventSlug===backendSlug&&/^[a-f0-9]{32}$/.test(p.requestId)&&Array.isArray(p.members)&&p.lead){
     submitted.current=p;
     requestId.current=p.requestId;
     setInstitution(p.institution);setPromoCode(p.promoCode||'');setPromoInput(p.promoCode||'');
     setCollege(p.college);
     setTeam(p.teamName);
     setMembers([p.lead,...p.members]);
     setReferral(p.referralSource);
     setUtr(p.utrNumber);
     setProof(p.screenshotBase64);
     setAgreement(p.agreement);
     setCategory(p.eventAnswers?.category||'');
     setConsents(p.eventAnswers?.consents||[]);
     setLocked(true);
     setStep(2);
     setRecoveryNote('Your pending submission was restored. Retry it to recover your registration; do not pay again.');
    }else clearPending();
   }
  }catch{clearPending();}
  if(!submitted.current){
   try{
    const d=readRecovery<{institution:string;college:string;team:string;members:Member[];category:string;consents:boolean[];referral:string;utr:string;proof:string;agreement:boolean;step:number;promoInput:string;promoCode:string}>(sessionStorage,draftKey);
    if(d&&['HITAM','Other'].includes(d.institution)&&Array.isArray(d.members)&&d.members.length>=1&&d.members.length<=4&&d.members.every(m=>m&&['name','email','phone','rollNo','branch','year'].every(k=>typeof m[k as keyof Member]==='string'))){
     setInstitution(d.institution);setCollege(d.college||'');setTeam(d.team||'');setMembers(d.members);setCategory(d.category||'');setConsents(d.consents||[]);setReferral(d.referral||'');setUtr(d.utr||'');setProof(d.proof||'');setAgreement(!!d.agreement);setStep(d.step===2?2:1);setPromoInput(d.promoInput||'');setPromoCode(d.promoCode||'');setRecoveryNote('Your draft was restored from this browser tab. Review your details before submitting.');
    }
   }catch{clearDraft();}
  }
  setDraftReady(true);
  void load();
 },[backendSlug,googleTest]); // eslint-disable-line react-hooks/exhaustive-deps
 const sizes=event ? (event.allowedTeamSizes||Array.from({length:event.maxTeam-(event.id==='E03'?2:event.minTeam)+1},(_,i)=>(event.id==='E03'?2:event.minTeam)+i)):[];
 const [promoInput,setPromoInput]=useState('');const [promoCode,setPromoCode]=useState('');
 useEffect(()=>{
  if(!draftReady||locked)return;
  if(receipt){clearDraft();return;}
  const payload={institution,college,team,members,category,consents,referral,utr,proof,agreement,step,promoInput,promoCode};
  try{sessionStorage.setItem(draftKey,JSON.stringify({expires:Date.now()+6*60*60*1000,payload}));}
  catch{
   try{sessionStorage.setItem(draftKey,JSON.stringify({expires:Date.now()+6*60*60*1000,payload:{...payload,proof:''}}));setRecoveryNote('Your details are saved in this tab, but the payment image could not be saved. Select it again after refreshing.');}
   catch{setRecoveryNote('Browser storage is unavailable. Keep this tab open and retain your payment proof.');}
  }
 },[draftReady,locked,receipt,institution,college,team,members,category,consents,referral,utr,proof,agreement,step,promoInput,promoCode,draftKey]); // eslint-disable-line react-hooks/exhaustive-deps
 const unitFee=event ? members.length===1 && event.allowedTeamSizes ? (institution==='HITAM'?event.soloHitamFee:event.soloOtherFee)||0 : members.length>1 && event.teamHitamFee ? (institution==='HITAM'?event.teamHitamFee:event.teamOtherFee)||0 : institution==='HITAM'?event.hitamFee:event.otherFee : 0;
 const regularAmount=event ? event.id==='E12' ? (members.length===1?120:250) : unitFee*(event.feeModel==='person'&&!event.teamHitamFee?members.length:1) : 0;
 const amount=event?.id==='E02'&&institution==='HITAM'&&promoCode===event.promoCode&&event.promoFee?event.promoFee:regularAmount;
 function sampleProof(){const canvas=document.createElement('canvas');canvas.width=640;canvas.height=360;const context=canvas.getContext('2d');if(!context)return;context.fillStyle='#0c0720';context.fillRect(0,0,640,360);context.fillStyle='#fbbf24';context.font='bold 28px Arial';context.fillText('LOCAL TEST PAYMENT PROOF',30,65);context.fillStyle='#ffffff';context.font='24px Arial';context.fillText('NO PAYMENT WAS MADE',30,125);context.fillText(title,30,190);context.fillText('Test amount: INR '+amount,30,240);const reference=utr||String(Date.now());context.fillText('Synthetic UTR: '+reference,30,290);setUtr(reference);setProof(canvas.toDataURL('image/png'));setError('');}
 function change(index:number,key:keyof Member,value:string){setMembers(current=>current.map((member,i)=>i===index?{...member,[key]:value}:member));}
 async function upload(file:File|undefined){setProof('');if(!file)return;if(file.size>2*1024*1024 || !['image/png','image/jpeg','image/webp'].includes(file.type)){setError('Choose a PNG, JPG or WebP screenshot under 2 MB.');return;}const reader=new FileReader();reader.onload=()=>{setProof(String(reader.result));setError('');};reader.readAsDataURL(file);}
 const eligibleAmount=event?reopenedRegistrationAmount(event.id,institution,members.length):null;
 const optionOpen=eligibleAmount!==null&&eligibleAmount<150&&amount<150;
 async function submit(){if(inFlight.current||!event)return;if(!optionOpen){setError('This option is closed. Only totals below ₹150 are open. Do not pay for this option.');return;}inFlight.current=true;setBusy(true);setError('');setIssueCode('');setLocked(true);
  submitted.current ||= {promoCode:institution==='HITAM'?promoCode:'',requestId:requestId.current,eventId:event.id,eventSlug:event.slug,institution,college,teamSize:members.length,teamName:members.length===1?members[0].name:team,referralSource:referral,lead:members[0],members:members.slice(1),totalFee:amount,utrNumber:utr,agreement,screenshotBase64:proof,customDetails:live?'Registered on espartohitam.com':googleTest?'WEBSITE GOOGLE SHEETS TEST - synthetic demo':'LOCAL TEST - isolated backend',eventAnswers:event.registrationForm?{category,consents}:null};
  clearDraft();
  try{sessionStorage.setItem(storageKey,JSON.stringify({expires:Date.now()+30*60*1000,payload:submitted.current}));}catch{setRecoveryNote('Browser recovery storage is unavailable. Keep this page open until your submission is confirmed.');}
  try{const result=await registrationRequest(()=>api('submit',submitted.current,googleTest),()=>setError('Registrations are arriving together. Please keep this page open while we safely retry your submission.'));setError('');if(result.success){clearPending();clearDraft();setIssueCode('');setRecoveryNote('');setReceipt(result.receipt);}else{setIssueCode(result.code||'SUBMISSION_FAILED');setError(submissionIssue(result));if(!result.retryable && result.code!=='RECONCILIATION_REQUIRED' && result.code!=='REGISTRATION_CLOSED'){submitted.current=undefined;clearPending();setLocked(false);}}}catch{setIssueCode('CONNECTION_UNCERTAIN');setError(submissionIssue({code:'CONNECTION_UNCERTAIN'}));}finally{inFlight.current=false;setBusy(false);}
 }
 if(receipt)return <SubmissionTicket receipt={receipt} event={displayEvent} teamName={members.length===1?members[0].name:team} institution={institution==='HITAM'?'HITAM':college} members={members} utr={utr} onRecover={()=>void submit()} busy={busy} googleTest={googleTest} live={live}/>;
 return <main id="main-content" className="max-w-4xl mx-auto px-5 py-8 sm:py-12"><Link className="text-brand-orange" href={`/events/${backendSlug}`}>← Event details</Link>{!live&&<div className="my-5 px-4 py-3 border border-amber-400/25 bg-amber-400/5 rounded-xl text-amber-200 text-sm">{googleTest?'GOOGLE SHEETS TEST. Synthetic demo data will be saved by the configured Apps Script deployment. Do not make a payment or verify these test records.':'LOCAL TEST ONLY. Do not make a payment. All data stays in an isolated test backend; no real ticket or email is issued.'}</div>}<header className="rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#19102e] to-[#0c0720] mb-6">
 <div className="p-5 sm:p-7"><BrandHeader/></div>
 {!live&&displayEvent.bannerImage&&<Image src={displayEvent.bannerImage} alt={`${title} official event poster`} width={1600} height={600} className="w-full h-auto" priority/>}
 <div className="p-5 sm:p-7"><div className="flex items-center gap-3 mb-4"><span className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2"><Image src={displayEvent.clubLogo} alt={`${displayEvent.club} logo`} width={80} height={56} className="h-full w-full object-contain"/></span><p className="text-brand-orange text-xs uppercase tracking-widest leading-relaxed">{displayEvent.club}<span className="block mt-1 text-text-muted">{live?'Official registration':'Official registration preview'}</span></p></div><h1 className="text-3xl sm:text-4xl font-display font-bold mb-3">{title}</h1>{!live&&<p className="text-text-secondary leading-relaxed">{displayEvent.description}</p>}
 <div className="grid sm:grid-cols-3 gap-4 mt-6 text-sm"><p className="flex gap-2"><CalendarDays className="w-5 h-5 text-brand-orange shrink-0"/><span>{displayEvent.date}<br/>{displayEvent.timings}</span></p><p className="flex gap-2"><MapPin className="w-5 h-5 text-brand-orange shrink-0"/>{displayEvent.venue}</p><p className="flex gap-2"><Users className="w-5 h-5 text-brand-orange shrink-0"/>{displayEvent.teamSize}</p></div>
 <div className="flex flex-wrap gap-4 items-center mt-6 pt-5 border-t border-white/10"><Link href={`/events/${backendSlug}`} className="rounded-xl border border-white/20 px-4 py-3 font-semibold hover:border-brand-orange/60 transition-colors">View event details →</Link><span className="text-text-muted text-sm">Prize pool <strong className="text-white">{displayEvent.prizePool}</strong></span>{displayEvent.brochureUrl&&<a href={displayEvent.brochureUrl} className="text-brand-orange text-sm">Read event brochure →</a>}</div>
 </div></header>{event?.registrationForm&&<section className="rounded-2xl border border-white/15 p-5 mb-6"><h2 className="font-bold text-xl">{event.registrationForm.tagline}</h2><p className="mt-3">{event.registrationForm.intro}</p><ul className="mt-4 list-disc pl-5">{event.registrationForm.highlights.map(value=><li key={value}>{value}</li>)}</ul></section>}{recoveryNote&&<p role="status" className="p-4 my-4 rounded-xl border border-amber-400/30 text-amber-200">{recoveryNote}</p>}{error && <p role="alert" className="p-4 my-4 bg-red-950 rounded-xl">{error}</p>}
 {catalogueError&&<div role="alert" className="my-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4"><p>{catalogueError}</p><button type="button" onClick={()=>void load()} className="mt-3 rounded-lg border border-white/25 px-4 py-2">Retry loading registration</button></div>}
 {!event?<div role="status" className="rounded-3xl border border-white/15 bg-white/5 p-8"><p className="text-text-secondary">Loading registration form…</p>{error&&<button className={field} onClick={load}>Retry loading registration form</button>}</div>:<form onSubmit={e=>{e.preventDefault();if(!optionOpen){setError('This option is closed. Only totals below ₹150 are open. Do not pay for this option.');return;}if(step===1)setStep(2);else void submit();}} className="space-y-6 rounded-3xl border border-white/15 bg-[#0c0720] p-5 sm:p-8">
  <p role="status" className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-100">Only options with a total payable below ₹150 are open. {optionOpen?"Your selected option is eligible.":"Your selected option is closed. Choose an eligible institution/team-size option before paying."}</p>
  <ol aria-label="Registration progress" className="grid grid-cols-3 gap-2 mb-7">{['Participant details','Payment & review','Submission e-ticket'].map((label,index)=><li key={label} aria-current={step===index+1?'step':undefined} className={`rounded-xl border px-3 py-4 text-xs sm:text-sm ${step===index+1?'border-brand-orange/60 bg-brand-orange/10 text-white':'border-white/10 text-text-muted'}`}><span className="font-mono font-bold mr-2">0{index+1}</span>{label}</li>)}</ol>
  {step===1?<div className="space-y-6">
    <div className="space-y-4 rounded-2xl border border-white/15 bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-center gap-2 pb-2.5 border-b border-white/10">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-orange/20 text-[11px] font-mono font-bold text-brand-orange">01</span>
        <h3 className="text-xs uppercase tracking-wider text-amber-300 font-bold">College &amp; Team Setup</h3>
      </div>
      <label className="block text-sm font-semibold text-white/90">
        Institution {req}
        <select className={`mt-1.5 ${field}`} value={institution} onChange={e=>setInstitution(e.target.value)} required>
          <option value="HITAM">HITAM</option>
          <option value="Other">Other college</option>
        </select>
      </label>
      {institution==='Other'&&<label className="block text-sm font-semibold text-white/90">
        College name {req}
        <input className={`mt-1.5 ${field}`} value={college} onChange={e=>setCollege(e.target.value)} required maxLength={160} placeholder="Enter your full college name"/>
      </label>}
      {institution==='Other'&&<label className="block text-sm font-semibold text-white/90">
        How did you hear about this event? {req}
        <select className={`mt-1.5 ${field}`} value={referral} onChange={e=>setReferral(e.target.value)} required>
          <option value="">Choose an option</option>
          {['Promotions','Social media','LinkedIn','Instagram','Friends','Other'].map(value=><option key={value}>{value}</option>)}
        </select>
      </label>}
      {sizes.length>1&&<label className="block text-sm font-semibold text-white/90">
        Participant count {req}
        <select className={`mt-1.5 ${field}`} value={members.length} onChange={e=>setMembers(current=>Array.from({length:Number(e.target.value)},(_,i)=>current[i]||emptyMember()))} required>
          {sizes.map(size=><option key={size} value={size}>{size===1?'Individual':size+' participants'}</option>)}
        </select>
      </label>}
      {members.length>1&&<label className="block text-sm font-semibold text-white/90">
        Team name {req}
        <input className={`mt-1.5 ${field}`} value={team} onChange={e=>setTeam(e.target.value)} required maxLength={120} placeholder="Enter official team name"/>
      </label>}
      <p className="text-xs text-text-muted">
        Participants: {event.id==='E03'?2:event.minTeam}–{event.maxTeam} (including lead) · Total ₹{amount} for this registration
      </p>
    </div>

    <div className="space-y-5">
      <div className="flex items-center gap-2 px-1">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-orange/20 text-[11px] font-mono font-bold text-brand-orange">02</span>
        <h3 className="text-xs uppercase tracking-wider text-amber-300 font-bold">Participant Details</h3>
      </div>
      {members.map((member,index)=><fieldset key={index} className="border border-white/15 bg-white/[0.025] rounded-2xl p-5 sm:p-6 space-y-4 hover:border-white/25 transition-colors">
        <legend className="px-2 text-sm font-bold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-orange"></span>
          <span>{index===0?'Team Lead':'Member '+(index+1)}</span>
        </legend>
        <div className="grid sm:grid-cols-2 gap-4">
          {(['name','email','phone','rollNo'] as const).map(key=><label key={key} className="block text-sm font-medium text-white/90">
            {({name:'Full Name',email:'Email Address',phone:'WhatsApp Number',rollNo:institution==='HITAM'?'HITAM Roll Number':'Roll / Student ID Number'})[key]}
            {req}
            <input
              className={`mt-1.5 ${field}`}
              value={member[key]}
              onChange={e=>change(index,key,e.target.value)}
              type={key==='email'?'email':key==='phone'?'tel':'text'}
              required
              maxLength={key==='email'?254:120}
              placeholder={key==='phone'?'10-digit WhatsApp number':key==='rollNo'?(institution==='HITAM'?'e.g. 23E51A...':'College ID / Roll No'):key==='email'?'active.email@example.com':'Full Name'}
            />
          </label>)}
          <label className="block text-sm font-medium text-white/90">
            Branch {req}
            {institution==='HITAM'?<select aria-label="Branch" className={`mt-1.5 ${field}`} value={member.branch} onChange={e=>change(index,'branch',e.target.value)} required>
              <option value="">Choose branch</option>
              {branches.map(branch=><option key={branch}>{branch}</option>)}
            </select>:<input className={`mt-1.5 ${field}`} value={member.branch} onChange={e=>change(index,'branch',e.target.value)} required placeholder="e.g. Computer Science"/>}
          </label>
          <label className="block text-sm font-medium text-white/90">
            Year {req}
            <select aria-label="Year" className={`mt-1.5 ${field}`} value={member.year} onChange={e=>change(index,'year',e.target.value)} required>
              <option value="">Choose year</option>
              {[1,2,3,4].map(year=><option key={year} value={year}>{`Year ${year}`}</option>)}
            </select>
          </label>
        </div>
      </fieldset>)}
    </div>
  </div>:<>
    <div className="rounded-2xl bg-brand-violet/10 border border-brand-violet/20 p-5">
      <p className="text-xs uppercase tracking-widest text-text-muted">Review your registration</p>
      <h2 className="text-2xl font-bold mt-2">{members.length===1?members[0].name:team}</h2>
      <p className="text-text-secondary mt-2">{members.length} participants · {institution==='HITAM'?'HITAM':college}</p>
      {event.promoCode&&institution==='HITAM'&&<div className="mt-4 rounded-xl border border-amber-400/30 p-4"><label htmlFor="promo-code" className="block font-semibold mb-2">HITAM flash sale · Code ESPARTO26</label><div className="flex gap-2"><input id="promo-code" className={field} value={promoInput} disabled={locked} onChange={e=>setPromoInput(e.target.value)} placeholder="Enter promo code"/><button type="button" disabled={locked} className="rounded-xl bg-brand-orange px-4 font-bold" onClick={()=>{if(promoInput.trim().toUpperCase()===event.promoCode){setPromoCode(event.promoCode||'');setError('');}else setError('Enter ESPARTO26 to apply the HITAM flash sale.');}}>Apply</button></div>{promoCode&&<p className="mt-2 text-green-300">₹100 discount applied · ₹450 per team</p>}</div>}<p className="text-3xl font-bold mt-4">₹{amount}<span className="text-sm font-normal text-text-muted ml-2">total</span></p>
      <div className="mt-5 pt-4 border-t border-white/10 space-y-4">
        {members.map((member,index)=><div key={index}>
          <p className="font-semibold">{index===0?'Team lead':'Member '+(index+1)}: {member.name}</p>
          <p className="text-sm text-text-secondary break-all">{member.email} · {member.rollNo}</p>
          <p className="text-sm text-text-muted">{member.branch} · Year {member.year}</p>
        </div>)}
      </div>
    </div>
    {live&&payment&&<section className="rounded-2xl border border-brand-orange/30 p-5 text-center">
      <h2 className="text-xl font-bold">Complete your UPI payment</h2>
      <p className="mt-1.5 text-xs text-text-muted">Google Pay · PhonePe · Paytm · BHIM · Navi · slice · super.money · Bank UPI</p>
      <p className="mt-3">{payment.payee}</p>
      <p className="font-mono mt-3">{payment.upiId}</p>
      <p className="my-3 text-2xl font-bold">Pay ₹{amount}</p>
      <Image src={payment.paymentQrUrl} alt="Official HITAM payment QR" width={256} height={256} unoptimized className="mx-auto w-64 max-w-full"/>
      <p className="mt-3 text-sm">Check the recipient and enter the exact amount in your payment app. Upload the screenshot and UTR below.</p>
      <p className="mt-2 text-xs text-amber-200/90 bg-amber-400/10 border border-amber-400/25 rounded-lg py-1.5 px-3 inline-block">
        💡 Note: FamPay payments cannot be verified by the bank. Please pay via Google Pay, PhonePe, Paytm, BHIM, or regular bank UPI.
      </p>
      <div><a className="inline-flex mt-4 rounded-xl bg-brand-orange px-6 py-4 font-bold text-white" href={`upi://pay?pa=${encodeURIComponent(payment.upiId)}&pn=${encodeURIComponent(payment.payee)}&am=${amount}&cu=INR&tn=${encodeURIComponent(title)}`}>Open UPI app →</a></div><p className="mt-3 text-xs text-text-muted">Open on your phone with a UPI app installed. On desktop, scan the QR using your phone.</p><div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Accepted UPI payment apps">{[{name:'Google Pay',file:'google-pay'},{name:'PhonePe',file:'phonepe'},{name:'Paytm',file:'paytm'},{name:'BHIM UPI',file:'bhim'},{name:'Navi UPI',file:'navi'},{name:'slice',file:'slice'},{name:'super.money',file:'super-money'}].map(app=><span key={app.file} title={app.name} className="flex h-10 w-16 items-center justify-center rounded-lg bg-white px-2 py-2"><Image src={`/images/payments/${app.file}.svg`} alt={app.name} width={48} height={24} className="h-6 w-12 object-contain"/></span>)}</div>
    </section>}
    {!live&&<p className="text-text-secondary">Use a synthetic 8–16 digit transaction reference and a test screenshot. No live payment is required.</p>}
    {!live&&<button type="button" disabled={locked} onClick={sampleProof} className="rounded-xl border border-brand-orange/40 px-4 py-3 text-brand-orange">Use sample local test proof</button>}
    <fieldset disabled={locked} className="space-y-5 rounded-2xl border border-white/15 bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-center gap-2 pb-2.5 border-b border-white/10">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-orange/20 text-[11px] font-mono font-bold text-brand-orange">03</span>
        <h3 className="text-xs uppercase tracking-wider text-amber-300 font-bold">Payment Proof &amp; Consent</h3>
      </div>
      <label className="block text-sm font-semibold text-white/90">
        UPI transaction reference (UTR) {req}
        <input className={`mt-1.5 ${field}`} value={utr} onChange={e=>setUtr(e.target.value)} required pattern="[0-9]{8,16}" inputMode="numeric" placeholder="8–16 digit bank UTR"/>
      </label>
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-white/90">
          {live?'Payment screenshot':'Test payment screenshot'} {req}
          <input className={`mt-1.5 ${field}`} type="file" accept="image/png,image/jpeg,image/webp" required={!proof} onChange={e=>void upload(e.target.files?.[0])}/>
        </label>
        <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/15 via-[#1a120b] to-[#0d091a] p-4 sm:p-5 shadow-lg shadow-amber-950/20">
          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300 ring-1 ring-amber-400/30">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-amber-200">Important Receipt Requirement</h4>
                <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30">Notice</span>
              </div>
              <p className="text-white/85">
                Payment receipt must <strong className="text-white font-bold underline decoration-amber-400 decoration-2 underline-offset-2">clearly show the UTR &amp; transaction ID</strong> and amount paid.
              </p>
              <p className="text-xs text-amber-300/80 pt-0.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Please upload a clear receipt — this makes your registration verification fast and ensures prompt confirmation!</span>
              </p>
              <div className="pt-2 mt-1 border-t border-amber-400/20 text-xs text-white/75">
                <span className="text-amber-300 font-semibold">Accepted UPI Apps:</span> Google Pay, PhonePe, Paytm, BHIM, or bank UPI. <span className="text-amber-200/90">(FamPay payments cannot be verified by the bank)</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
      {event.registrationForm&&<fieldset className="space-y-4 pt-2">
        <legend className="text-sm font-bold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-orange"></span>
          <span>Event Rules &amp; Consents</span>
        </legend>
        {event.registrationForm.categories&&<label className="block text-sm font-semibold text-white/90">
          Showcase category {req}
          <select className={`mt-1.5 ${field}`} value={category} onChange={e=>setCategory(e.target.value)} required>
            <option value="">Choose category</option>
            {event.registrationForm.categories.map(value=><option key={value}>{value}</option>)}
          </select>
        </label>}
        {event.registrationForm.rules.map((rule,i)=><label key={rule} className="flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors cursor-pointer group">
          <input className="mt-1 h-4 w-4 rounded border-white/30 bg-white/5 text-brand-orange focus:ring-brand-orange/40 shrink-0 cursor-pointer" type="checkbox" required checked={!!consents[i]} onChange={e=>setConsents(current=>current.map((value,j)=>j===i?e.target.checked:value))}/>
          <span className="leading-snug">{rule}</span>
        </label>)}
      </fieldset>}
      <label className="flex items-start gap-3 min-h-12 text-sm text-white/80 hover:text-white transition-colors cursor-pointer group">
        <input className="mt-1 h-4 w-4 rounded border-white/30 bg-white/5 text-brand-orange focus:ring-brand-orange/40 shrink-0 cursor-pointer" type="checkbox" checked={agreement} onChange={e=>setAgreement(e.target.checked)} required/>
        <span className="leading-snug">I confirm these participant details and payment proof are correct. Payment and entry are subject to organizer verification.</span>
      </label>
      {proof&&<div className="rounded-xl border border-white/10 p-4">
        <p className="text-sm text-text-muted mb-3">Selected payment proof</p>
        <Image src={proof} alt="Selected payment screenshot" width={360} height={360} className="max-h-48 w-auto object-contain rounded-lg" unoptimized/>
      </div>}
    </fieldset>
    <p className="flex gap-2 text-sm text-text-muted"><ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400"/>Payment can be verified only by organizers. This submission does not mark your payment as confirmed.</p>
    {!locked&&<button type="button" className={field} onClick={()=>setStep(1)}>Back to details</button>}
  </>}
  {step===2&&error&&<div role="alert" className="rounded-xl border border-red-400/40 bg-red-950/70 p-4"><p className="font-semibold">{error}</p>{issueCode&&<p className="mt-2 text-sm">Issue: {issueCode} · Submission reference: <span className="break-all font-mono">{requestId.current}</span></p>}<p className="mt-2 text-sm">Need help? <a className="underline" href="tel:+918328232607">Hemanth: +91 83282 32607</a> · <a className="underline" href="mailto:ssg@hitam.org">ssg@hitam.org</a></p></div>}
  <button disabled={busy||!optionOpen||(step===2&&!proof)} className="rounded-xl bg-brand-orange text-white font-bold p-4 w-full" type="submit">{busy?'Submitting…':step===1?'Continue to review':locked?'Retry same submission':live?'Submit registration':'Submit local test registration'}<ArrowRight className="inline w-4 h-4 ml-2"/></button>
</form>}</main>;
}
