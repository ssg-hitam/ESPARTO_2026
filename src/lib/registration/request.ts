type Result = {success:boolean;code?:string;retryable?:boolean;[key:string]:unknown};

// Retry only an explicit pre-commit BUSY response. An uncertain connection
// must be recovered by the user with the original frozen submission.
export async function registrationRequest<T extends Result>(
  send:()=>Promise<T>,
  waiting:()=>void=()=>{},
  delay:(milliseconds:number)=>Promise<void>=milliseconds=>new Promise(resolve=>setTimeout(resolve,milliseconds)),
) {
  for(let attempt=0;attempt<8;attempt++) {
    const result=await send();
    if(result.code!=='BUSY'||!result.retryable||attempt===7)return result;
    waiting();
    await delay(Math.min(1500+attempt*500,4000)+Math.floor(Math.random()*1000));
  }
  throw Error('Retry limit exceeded');
}
