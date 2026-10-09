import { RegistrationNotice } from '@/components/events/RegistrationNotice';
import { GOOGLE_APPS_SCRIPT_REGISTRATION_URL } from '@/data/events';
import { notFound, redirect } from 'next/navigation';
import { findPublicEvent, registrationIntegration, backendEventId } from '@/lib/events/catalogue';
import { registrationTestEventIds, productionRegistrationEnabled } from '@/lib/registration/bridge';
import RegistrationPilot from './RegistrationPilot';
export const metadata = {title:'Event registration',robots:{index:false,follow:false}};
export default async function RegistrationPage({params}:{params:Promise<{slug:string}>}) {
  const event=findPublicEvent((await params).slug);
  if(event?.registrationClosed)return <main className="max-w-3xl mx-auto px-5 py-16"><RegistrationNotice /><h1 className="text-3xl font-bold">{event.slug==='agentic-ai-workshop-hackathon'?'GDG registrations closed':'Registrations closed'}</h1><p className="mt-4 text-text-secondary">{event.slug==='agentic-ai-workshop-hackathon'?'GDG has reached capacity and is not accepting online or spot registrations.':'Registrations are closed for this event. No online or spot registrations are being accepted for it. Do not make a new payment.'}</p><p className="mt-4 text-text-secondary">Already paid but unable to submit? Keep your payment proof and contact <a className="underline" href="mailto:ssg@hitam.org">ssg@hitam.org</a>. Do not pay again.</p><a className="inline-block mt-6 text-brand-orange underline" href={`/events/${event.slug}`}>View event details</a></main>;
  const live=productionRegistrationEnabled();
  if(event && process.env.NODE_ENV!=='development'&&!live)redirect(`${GOOGLE_APPS_SCRIPT_REGISTRATION_URL}?event=${encodeURIComponent(event.slug)}`);
  if(!event || !registrationIntegration(event).localPilot || (live&&!registrationTestEventIds().includes(backendEventId(event))))notFound();
  return <RegistrationPilot displayEvent={event} live={live} googleTest={registrationTestEventIds().includes(backendEventId(event)) && (live || process.env.EVENT_PLATFORM_GOOGLE_TEST_ENABLED==='true')}/>;
}
