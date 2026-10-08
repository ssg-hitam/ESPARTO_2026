import { GOOGLE_APPS_SCRIPT_REGISTRATION_URL } from '@/data/events';
import { notFound, redirect } from 'next/navigation';
import { findPublicEvent, registrationIntegration, backendEventId } from '@/lib/events/catalogue';
import { registrationTestEventIds, productionRegistrationEnabled } from '@/lib/registration/bridge';
import RegistrationPilot from './RegistrationPilot';
export const metadata = {title:'Event registration',robots:{index:false,follow:false}};
export default async function RegistrationPage({params}:{params:Promise<{slug:string}>}) {
  const event=findPublicEvent((await params).slug);
  if(event?.registrationClosed)return <main className="max-w-3xl mx-auto px-5 py-16"><h1 className="text-3xl font-bold">Registrations closed</h1><p className="mt-4 text-text-secondary">We have reached our registration limit for {event.title}. Thank you, everyone, for your amazing response! Only MINDS Club events — DATA HEIST and DATA DOSSIER — are still accepting registrations.</p><p className="mt-4 text-text-secondary">Already paid but unable to submit? Keep your payment proof and contact <a className="underline" href="mailto:ssg@hitam.org">ssg@hitam.org</a>. Do not pay again.</p><a className="inline-block mt-6 text-brand-orange underline" href={`/events/${event.slug}`}>View event details</a></main>;
  const live=productionRegistrationEnabled();
  if(event && process.env.NODE_ENV!=='development'&&!live)redirect(`${GOOGLE_APPS_SCRIPT_REGISTRATION_URL}?event=${encodeURIComponent(event.slug)}`);
  if(!event || !registrationIntegration(event).localPilot || (live&&!registrationTestEventIds().includes(backendEventId(event))))notFound();
  return <RegistrationPilot displayEvent={event} live={live} googleTest={registrationTestEventIds().includes(backendEventId(event)) && (live || process.env.EVENT_PLATFORM_GOOGLE_TEST_ENABLED==='true')}/>;
}
