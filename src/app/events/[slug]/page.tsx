import { productionRegistrationEnabled } from '@/lib/registration/bridge';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { FEST_EVENTS, getEventRegisterUrl } from '@/data/events';
import { eventPath, eventSlug, findPublicEvent, registrationIntegration } from '@/lib/events/catalogue';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return FEST_EVENTS.map(event => ({ slug: eventSlug(event) })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = findPublicEvent((await params).slug);
  if (!event) return { title: 'Event not found' };
  const title = `${event.title} 2026`;
  const images = event.bannerImage ? [{ url: event.bannerImage, alt: title }] : [{ url: '/og-image.jpg', alt: title }];
  return { title, description: event.description, alternates: { canonical: eventPath(event) },
    openGraph: { title, description: event.description, url: eventPath(event), type: 'website', images },
    twitter: { card: 'summary_large_image', title, description: event.description, images: images.map(image => image.url) } };
}
export default async function EventPage({ params }: Props) {
  const { slug } = await params; const event = findPublicEvent(slug);
  if (!event) notFound();
  if (slug !== eventSlug(event)) permanentRedirect(eventPath(event));
  const pilot = process.env.NODE_ENV === 'development' && registrationIntegration(event).localPilot;
  return <main id="main-content" className="max-w-6xl mx-auto px-5 py-10 sm:py-14 text-white">
    <Link href="/events" className="text-brand-orange">← All events</Link>
    <p className="mt-8 text-brand-orange">{event.category} · {event.club}</p>
    <h1 className="text-4xl sm:text-6xl font-display font-bold my-5">{event.title}</h1>
    <p className="text-xl text-text-secondary mb-6 max-w-3xl">{event.tagline}</p><a className="inline-flex rounded-xl bg-gradient-to-r from-brand-orange to-brand-magenta px-6 py-4 font-bold mb-8 hover:brightness-110" href={getEventRegisterUrl(event)}>Register for event →</a>
    {event.bannerImage && <Image src={event.bannerImage} alt={`${event.title} poster`} width={1600} height={600} className="w-full h-auto rounded-2xl" priority />}
    <p className="my-8 text-lg leading-relaxed text-text-secondary">{event.description}</p>
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5 border border-white/10 bg-gradient-to-br from-[#19102e] to-[#0c0720] p-5 sm:p-8 rounded-3xl">
      {Object.entries({ Date:event.date, Schedule:event.timings, Venue:event.venue, 'Team format':event.teamSize, 'HITAM fee':event.registrationFee.hitam, 'Other college fee':event.registrationFee.nonHitam, 'Prize pool':event.prizePool, Organizer:event.club }).map(([label,value]) => <div key={label} className="min-w-0 rounded-xl bg-white/[0.025] p-3"><dt className="text-text-muted text-sm">{label}</dt><dd className="mt-2 font-semibold text-sm sm:text-base">{value}</dd></div>)}
    </dl>
    {event.agenda && <section className="mt-8"><h2 className="text-2xl font-bold mb-4">Schedule</h2>{event.agenda.map(item => <p key={item.label} className="my-3"><strong>{item.label}</strong> · {item.detail}</p>)}</section>}
    <section className="my-8"><h2 className="text-2xl font-bold mb-4">Event highlights</h2><ul className="grid sm:grid-cols-2 gap-3 list-none">{event.highlights.map(text => <li key={text} className="rounded-xl border border-white/10 bg-white/[0.025] p-4 text-text-secondary">{text}</li>)}</ul></section>
    {event.coordinators && <section className="my-8"><h2 className="text-2xl font-bold mb-4">Coordinators</h2><div className="grid sm:grid-cols-2 gap-4">{[...event.coordinators.students, ...(event.coordinators.faculty ? [event.coordinators.faculty] : []), ...(event.coordinators.additionalFaculty || [])].map(person => <div key={person.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 min-w-0"><p className="font-semibold mb-3">{person.name}</p> {person.email && <a className="text-brand-orange break-all block text-sm mb-2" href={`mailto:${person.email}`}>{person.email}</a>} {person.phone && <a className="text-text-secondary text-sm block" href={`tel:${person.phone}`}>{person.phone}</a>}</div>)}</div></section>}
    <div className="flex flex-wrap gap-4 mt-8">
      {pilot && !productionRegistrationEnabled() && <Link className="rounded-xl bg-brand-orange px-6 py-4 font-bold" href={`${eventPath(event)}/register`}>Try local registration</Link>}
      <a className="rounded-xl border border-white/25 px-6 py-4" href={getEventRegisterUrl(event)}>Register for event</a>
      {event.brochureUrl && <a className="rounded-xl border border-white/25 px-6 py-4" href={event.brochureUrl}>Event brochure</a>}
    </div>
  </main>;
}
