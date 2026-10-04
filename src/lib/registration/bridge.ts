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
type BridgeResult={success:boolean;[key:string]:unknown};
let catalogueCache:{key:string;expires:number;result:BridgeResult}|undefined;
let cataloguePending:{key:string;promise:Promise<BridgeResult>}|undefined;
const admissionWindows=new Map<string,{count:number;expires:number}>();
// Per-instance defence in depth; hosting firewall provides distributed enforcement.
export function registrationAdmission(key:string,action:string,now=Date.now()) {
  const bucketKey=action+':'+key;
  const previous=admissionWindows.get(bucketKey);
  if(!previous||previous.expires<=now) {
    if(admissionWindows.size>=5000)admissionWindows.delete(admissionWindows.keys().next().value!);
    admissionWindows.set(bucketKey,{count:1,expires:now+60000});return true;
  }
  previous.count++;return previous.count<=(action==='submit'?60:120);
}
export async function registrationBridge(action:RegistrationAction,payload?:unknown):Promise<BridgeResult> {
  const config=registrationBridgeConfig();if(!config)throw Error('UNCONFIGURED');
  if(action!=='catalogue'||process.env.NODE_ENV!=='production')return sendRegistration(config,action,payload);
  const key=config.url+':'+registrationTestEventIds().join(',');
  if(catalogueCache?.key===key&&catalogueCache.expires>Date.now())return catalogueCache.result;
  if(cataloguePending?.key===key)return cataloguePending.promise;
  const promise=sendRegistration(config,action,payload).then(result=>{if(result.success)catalogueCache={key,expires:Date.now()+30000,result};return result;});
  cataloguePending={key,promise};
  try{return await promise;}finally{if(cataloguePending?.promise===promise)cataloguePending=undefined;}
}
async function sendRegistration(config:{url:string;secret:string},action:RegistrationAction,payload?:unknown):Promise<BridgeResult> {
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
