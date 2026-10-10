export const REOPENED_CAPACITIES:Record<string,number>={};
export const REOPENED_SLUGS:string[]=[];
// Admission policy for the limited reopening. Backend still validates payment
// and registration; never trust the client-supplied total to decide eligibility.
export function reopenedRegistrationAmount(eventId:string,institution:string,size:number):number|null {
 if(!REOPENED_CAPACITIES[eventId])return null;
 if(!['HITAM','Other'].includes(institution)||!Number.isInteger(size)||size<1||size>4)return null;
 const hitam=institution==='HITAM';
 switch(eventId){
  case 'E06':return hitam?(size===1?100:size===4?200:null):null;
  case 'E05':return size===1?(hitam?100:150):size===4?(hitam?200:300):null;
  case 'E10':return size>=2?(hitam?100:200):null;
  case 'E11':return size===1?(hitam?50:70):(hitam?100:140);
  case 'E12':return size===1?120:250;
  case 'E13':return size===2||size===3?(hitam?50:60)*size:null;
  case 'E14':return size===1?(hitam?50:60):null;
  default:return null;
 }
}

export function registrationOptionOpen(eventId:string,institution:string,size:number):boolean {
 const amount=reopenedRegistrationAmount(eventId,institution,size);
 return amount!==null&&(amount<150||(eventId==='E06'&&institution==='HITAM'&&size===4&&amount===200));
}
