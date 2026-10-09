export const REOPENED_CAPACITIES:Record<string,number>={E06:100,E10:100,E11:100,E13:40};
export const REOPENED_SLUGS=['ieom-startup-pitch','data-dossier','torquex-motorsport','code-casino'];
// Admission policy for the limited reopening. Backend still validates payment
// and registration; never trust the client-supplied total to decide eligibility.
export function reopenedRegistrationAmount(eventId:string,institution:string,size:number):number|null {
 if(!REOPENED_CAPACITIES[eventId])return null;
 if(!['HITAM','Other'].includes(institution)||!Number.isInteger(size)||size<1||size>4)return null;
 const hitam=institution==='HITAM';
 switch(eventId){
  case 'E05':case 'E06':return size===1?(hitam?100:150):size===4?(hitam?200:300):null;
  case 'E10':return size>=2?(hitam?100:200):null;
  case 'E11':return size===1?(hitam?50:70):(hitam?100:140);
  case 'E12':return size===1?120:250;
  case 'E13':return size===2||size===3?(hitam?50:60)*size:null;
  case 'E14':return size===1?(hitam?50:60):null;
  default:return null;
 }
}
