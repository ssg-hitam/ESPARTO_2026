import { createHmac, randomUUID } from 'node:crypto';
export type RegistrationAction = 'catalogue' | 'submit' | 'status';
export const registrationHeaders = { 'Cache-Control':'no-store, max-age=0', 'Referrer-Policy':'no-referrer' };
// Disabled until an operator configures a separate Google Sheets test deployment.
export function registrationBridgeConfig() {
  const live=process.env.EVENT_PLATFORM_PRODUCTION_ENABLED==='true';
  if (!live && (process.env.NODE_ENV !== 'development' || process.env.EVENT_PLATFORM_GOOGLE_TEST_ENABLED !== 'true')) return null;
  const endpoint=process.env.EVENT_PLATFORM_APPS_SCRIPT_URL;
  const secret=process.env.EVENT_PLATFORM_REGISTRATION_SECRET;
  if (!endpoint || !secret || secret.length<32) return null;
  try {
    const url=new URL(endpoint);
    if (url.protocol!=='https:' || url.hostname!=='script.google.com' || url.port || url.username || url.password || url.search || url.hash || !/^\/(?:a\/macros\/hitam\.org|macros)\/s\/[-\w]+\/exec$/.test(url.pathname)) return null;
    if(live && url.href!=='https://script.google.com/macros/s/AKfycbyWW19qSK95FeVO35V-aX5Lr2ySIE-ZMLLqem_y6bIFRXLcVEzVtU4qooHetePr09dbHQ/exec')return null;
    return {url:url.href,secret};
  } catch {return null;}
}
export function registrationEnvelope(action:RegistrationAction,payload:unknown,secret:string) {
  // ASCII transport gives Node and Apps Script identical signed bytes for Unicode text.
  const serialized=JSON.stringify({action,payload,timestamp:Date.now(),nonce:randomUUID()}).replace(/[\u007f-\uffff]/g,char=>'\\u'+char.charCodeAt(0).toString(16).padStart(4,'0'));
  const signature=createHmac('sha256',secret).update('ESPARTO-REGISTRATION-V1\n'+serialized).digest('base64url');
  return {kind:'registration',payload:serialized,signature};
}
export async function registrationBridge(action:RegistrationAction,payload?:unknown) {
  const config=registrationBridgeConfig();if(!config)throw Error('UNCONFIGURED');
  const response=await fetch(config.url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(registrationEnvelope(action,payload,config.secret)),cache:'no-store',signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error('UPSTREAM');
  const result=await response.json();
  if(typeof result.success!=='boolean')throw Error('UPSTREAM');
  return result;
}

export function registrationTestEventIds():string[] {
  return ((process.env.EVENT_PLATFORM_PRODUCTION_ENABLED==='true'?(process.env.EVENT_PLATFORM_PRODUCTION_EVENT_IDS||''):(process.env.EVENT_PLATFORM_GOOGLE_TEST_EVENT_IDS||'E08'))).split(',').map(id=>id.trim()).filter(id=>/^E(?:0[2-9]|1[0-4])$/.test(id));
}

export function productionRegistrationEnabled(){return process.env.EVENT_PLATFORM_PRODUCTION_ENABLED==='true' && !!registrationBridgeConfig();}
