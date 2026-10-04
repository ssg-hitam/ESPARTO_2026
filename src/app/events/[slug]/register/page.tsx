import { GOOGLE_APPS_SCRIPT_REGISTRATION_URL } from '@/data/events';
import { notFound, redirect } from 'next/navigation';
import { findPublicEvent, registrationIntegration, backendEventId } from '@/lib/events/catalogue';
import { registrationTestEventIds, productionRegistrationEnabled } from '@/lib/registration/bridge';
import RegistrationPilot from './RegistrationPilot';
export const metadata = {title:'Event registration',robots:{index:false,follow:false}};
export default async function RegistrationPage({params}:{params:Promise<{slug:string}>}) {
  const event=findPublicEvent((await params).slug);
  const live=productionRegistrationEnabled();
  if(event && process.env.NODE_ENV!=='development'&&!live)redirect(`${GOOGLE_APPS_SCRIPT_REGISTRATION_URL}?event=${encodeURIComponent(event.slug)}`);
  if(!event || !registrationIntegration(event).localPilot || (live&&!registrationTestEventIds().includes(backendEventId(event))))notFound();
  return <RegistrationPilot displayEvent={event} live={live} googleTest={registrationTestEventIds().includes(backendEventId(event)) && (live || process.env.EVENT_PLATFORM_GOOGLE_TEST_ENABLED==='true')}/>;
}
