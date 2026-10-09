import { reopenedRegistrationAmount } from '@/lib/registration/reopening';
import { NextRequest, NextResponse } from 'next/server';
import { registrationAdmission, registrationBridge, registrationBridgeConfig, registrationTestEventIds, registrationHeaders, type RegistrationAction } from '@/lib/registration/bridge';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=60;
export async function POST(request:NextRequest) {
  const json=(value:unknown,status=200)=>NextResponse.json(value,{status,headers:registrationHeaders});
  if(!registrationBridgeConfig())return json({success:false,code:'UNCONFIGURED',message:'Registration is temporarily unavailable. Please contact SSG.'},503);
  if(request.headers.get('origin')!==request.nextUrl.origin)return json({success:false,message:'Invalid origin.'},403);
  if(!request.headers.get('content-type')?.startsWith('application/json'))return json({success:false,message:'JSON is required.'},415);
  if(!request.body)return json({success:false,message:'Request body is required.'},400);
  let data;
  try {
    const reader=request.body.getReader(),chunks:Uint8Array[]=[];let size=0;
    try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>3000000){await reader.cancel();return json({success:false,message:'Upload exceeds the request limit.'},413);}chunks.push(value);}}finally{reader.releaseLock();}
    data=JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if(!data || !['catalogue','submit','status'].includes(data.action))return json({success:false,message:'Unsupported action.'},400);
    if(data.action==='submit'){const amount=reopenedRegistrationAmount(data.payload?.eventId,data.payload?.institution,data.payload?.teamSize);if(amount===null||amount>=150||data.payload?.totalFee!==amount)return json({success:false,code:'REGISTRATION_CLOSED',retryable:false,message:'This registration option is closed. Only the selected Day 2 options with total payment below ₹150 are open. Do not pay again.'},409);}
    if(data.action==='submit' && (!registrationTestEventIds().includes(data.payload?.eventId)||typeof data.payload?.eventSlug!=='string'))return json({success:false,message:'This event is not enabled for registration.'},400);
    if(data.action==='status' && (typeof data.payload?.requestId!=='string' || typeof data.payload?.regId!=='string'))return json({success:false,message:'Ticket reference and submission token are required.'},400);
  }catch{return json({success:false,message:'Invalid request.'},400);}
  if(process.env.VERCEL==='1'&&!registrationAdmission(request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()||'unknown',data.action))return json({success:false,code:'RATE_LIMITED',retryable:true,message:'Too many requests. Wait one minute, then retry the same submission; do not pay again.'},429);
  try{return json(await registrationBridge(data.action as RegistrationAction,data.payload));}
  catch{return json({success:false,code:'CONNECTION_UNCERTAIN',retryable:true,message:'The backend response could not be confirmed. Retry this same submission to recover it; do not pay again.'},503);}
}

// Counts only: no participant names, contacts, tickets or payment references.
export async function GET(){try{const result=await registrationBridge('catalogue');const events=Array.isArray(result.events)?result.events:[];return NextResponse.json({success:result.success,events:events.map((event:Record<string,unknown>)=>({id:event.id,slug:event.slug,capacity:event.capacity,registered:event.registered,remaining:event.remaining,registrationOpen:event.registrationOpen}))},{headers:registrationHeaders});}catch{return NextResponse.json({success:false,events:[]},{status:503,headers:registrationHeaders});}}
