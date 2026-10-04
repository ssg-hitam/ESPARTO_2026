import { notFound } from 'next/navigation';
import { findPublicEvent, registrationIntegration } from '@/lib/events/catalogue';
import RegistrationPilot from './RegistrationPilot';
export const metadata = {title:'Local registration test',robots:{index:false,follow:false}};
export default async function RegistrationPage({params}:{params:Promise<{slug:string}>}) {
  const event=findPublicEvent((await params).slug);
  if(process.env.NODE_ENV!=='development' || !event || !registrationIntegration(event).localPilot)notFound();
  return <RegistrationPilot displayEvent={event}/>;
}
