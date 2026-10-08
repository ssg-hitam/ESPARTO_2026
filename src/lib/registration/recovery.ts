// Tab-scoped browser storage: survives refresh, never sent to the server as a draft.
export function readRecovery<T>(storage:Storage,key:string,now=Date.now()):T|undefined {
  try {
    const raw=storage.getItem(key);if(!raw)return;
    const saved=JSON.parse(raw);
    if(typeof saved.expires!=='number'||saved.expires<=now){storage.removeItem(key);return;}
    return saved.payload as T;
  }catch{try{storage.removeItem(key);}catch{}return;}
}
export function submissionIssue(result:{code?:string;message?:string}) {
  const messages:Record<string,string>={
    BUSY:'The registration service is busy. Retry the same submission in a few seconds; do not pay again.',
    CONNECTION_UNCERTAIN:'We could not confirm the save. Retry the same submission to recover your ticket; do not pay again.',
    SERVICE_UNAVAILABLE:'The registration service could not save your details. Keep your payment proof and retry the same submission; do not pay again.',
    RECONCILIATION_REQUIRED:'The final save needs organizer review. Keep your proof and contact SSG with the submission reference below; do not pay again.',
    RATE_LIMITED:'Too many attempts. Wait one minute, then retry the same submission; do not pay again.',
  };
  return messages[result.code||'']||result.message||'Submission was not confirmed. Keep your proof and contact SSG; do not pay again.';
}
