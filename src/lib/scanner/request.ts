// Retry only explicit BUSY responses: Apps Script returns these before writing.
// A network failure or uncertain save must be recovered by another lookup.
export async function deskRequest<T extends { success:boolean;code?:string }>(body:object,onWait:(message:string)=>void,options:{fetchImpl?:typeof fetch;sleep?:(ms:number)=>Promise<void>;jitter?:()=>number}={}) {
 const fetchImpl=options.fetchImpl||fetch;
 const sleep=options.sleep||((ms:number)=>new Promise<void>(resolve=>setTimeout(resolve,ms)));
 const jitter=options.jitter||Math.random;
 for(let attempt=0;attempt<5;attempt++) {
  const response=await fetchImpl('/api/scanner',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(20000)});
  const result:T=await response.json();
  if(!response.ok||result.success||result.code!=='BUSY'||attempt===4)return {response,result};
  onWait('Another desk is saving. Retrying safely—please keep this page open.');
  await sleep(1000*Math.pow(2,attempt)+Math.floor(jitter()*300));
 }
 throw Error('Desk unavailable');
}
