import { createHmac, randomUUID } from 'node:crypto';
export type RegistrationAction = 'catalogue' | 'submit' | 'status';
export const registrationHeaders = { 'Cache-Control':'no-store, max-age=0', 'Referrer-Policy':'no-referrer' };
// Disabled until an operator configures a separate Google Sheets test deployment.
export function registrationBridgeConfig() {
  if (process.env.NODE_ENV !== 'development' || process.env.EVENT_PLATFORM_GOOGLE_TEST_ENABLED !== 'true') return null;
  const endpoint=process.env.EVENT_PLATFORM_APPS_SCRIPT_URL;
  const secret=process.env.EVENT_PLATFORM_REGISTRATION_SECRET;
  if (!endpoint || !secret || secret.length<32) return null;
  try {
    const url=new URL(endpoint);
    if (url.protocol!=='https:' || url.hostname!=='script.google.com' || url.port || url.username || url.password || url.search || url.hash || !/^\/(?:a\/macros\/hitam\.org|macros)\/s\/[-\w]+\/exec$/.test(url.pathname)) return null;
    return {url:url.href,secret};
  } catch {return null;}
}
export function registrationEnvelope(action:RegistrationAction,payload:unknown,secret:string) {
  const serialized=JSON.stringify({action,payload,timestamp:Date.now(),nonce:randomUUID()});
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
