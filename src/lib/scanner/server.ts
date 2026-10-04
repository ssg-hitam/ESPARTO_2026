import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { GOOGLE_APPS_SCRIPT_REGISTRATION_URL } from '@/data/events';
export const scannerHeaders = { 'Cache-Control': 'no-store, max-age=0', 'Referrer-Policy': 'no-referrer' };
export const COOKIE = 'esparto_desk';
export function configured() { return Boolean(process.env.SCANNER_GOOGLE_CLIENT_ID && (process.env.SCANNER_SESSION_SECRET?.length || 0) >= 32 && (process.env.SCANNER_BRIDGE_SECRET?.length || 0) >= 32); }
function sign(value: string) { return createHmac('sha256', process.env.SCANNER_SESSION_SECRET!).update(value).digest('base64url'); }
export function makeSession(email: string) { const body = Buffer.from(JSON.stringify({ email, exp: Math.floor(Date.now()/1000)+3600 })).toString('base64url'); return body+'.'+sign(body); }
export async function sessionEmail() {
  if (!configured()) throw Error('UNAVAILABLE');
  const value = (await cookies()).get(COOKIE)?.value || '';
  const parts = value.split('.');
  if (parts.length !== 2 || value.length > 1000) throw Error('AUTH');
  const expected = Buffer.from(sign(parts[0])), supplied = Buffer.from(parts[1]);
  if (expected.length !== supplied.length || !timingSafeEqual(expected,supplied)) throw Error('AUTH');
  const claims = JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));
  if (typeof claims.email !== 'string' || !/^[^\s@]+@hitam\.org$/.test(claims.email) || !Number.isInteger(claims.exp) || claims.exp <= Date.now()/1000) throw Error('AUTH');
  return claims.email as string;
}
export function sameOrigin(request: Request) { return request.headers.get('origin') === new URL(request.url).origin; }
export async function smallJSON(request: Request) {
  if (!request.body) throw Error('INPUT');
  const reader = request.body.getReader(); let size = 0; const chunks: Uint8Array[]=[];
  try { while(true) { const result=await reader.read(); if(result.done)break; size+=result.value.length; if(size>8192){await reader.cancel();throw Error('INPUT');} chunks.push(result.value); } }
  finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export async function bridge(email: string, action: 'session'|'lookup'|'confirm', reference = '', eventId = '', identityChecked = false) {
  const payload = JSON.stringify({ email, action, reference, eventId, identityChecked, timestamp: Date.now(), nonce: randomUUID() });
  const signature = createHmac('sha256',process.env.SCANNER_BRIDGE_SECRET!).update('ESPARTO-DESK-V1\n'+payload).digest('base64url');
  const response = await fetch(GOOGLE_APPS_SCRIPT_REGISTRATION_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({payload,signature}), cache:'no-store', signal:AbortSignal.timeout(15000) });
  if(!response.ok)throw Error('UNAVAILABLE');
  const result = await response.json();
  if(!result || typeof result.success !== 'boolean')throw Error('UNAVAILABLE');
  if(!result.success) return {success:false, message:'The ticket or account cannot be processed. Check the event, payment verification and organizer access.', code: typeof result.code==='string'?result.code:'DESK_UNAVAILABLE'};
  if(action==='session') {
    if(!Array.isArray(result.events))throw Error('UNAVAILABLE');
    return {success:true,email,events:result.events.filter((e: {id:string;title:string})=>/^E(?:0[2-9]|1[0-4])$/.test(e.id) && typeof e.title==='string').map((e: {id:string;title:string})=>({id:e.id,title:e.title}))};
  }
  const t=result.ticket;
  if(!t || !Array.isArray(t.members) || t.members.length>20 || t.paymentStatus!=='Verified' || typeof t.checkedIn!=='boolean' || t.eventId!==eventId)throw Error('UNAVAILABLE');
  const ticket={regId:String(t.regId),eventId:String(t.eventId),eventTitle:String(t.eventTitle),teamName:String(t.teamName),college:String(t.college),checkedIn:t.checkedIn,paymentStatus:'Verified',members:t.members.map((m: {name:string;rollNo:string;role:string})=>({name:String(m.name),rollNo:String(m.rollNo||''),role:String(m.role)}))};
  return {success:true,ticket,alreadyCheckedIn:result.alreadyCheckedIn===true,message:ticket.checkedIn?'Registration is checked in. Do not admit a duplicate entry.':'Payment verified. Compare college IDs before confirming attendance.'};
}
