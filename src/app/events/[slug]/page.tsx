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
  return <main id="main-content" className="max-w-5xl mx-auto px-5 py-12 text-white">
    <Link href="/events" className="text-brand-orange">← All events</Link>
    <p className="mt-8 text-brand-orange">{event.category} · {event.club}</p>
    <h1 className="text-4xl sm:text-6xl font-display font-bold my-5">{event.title}</h1>
    <p className="text-xl text-text-secondary mb-8">{event.tagline}</p>
    {event.bannerImage && <Image src={event.bannerImage} alt={`${event.title} poster`} width={1600} height={600} className="w-full h-auto rounded-2xl" priority />}
    <p className="my-8 text-lg leading-relaxed text-text-secondary">{event.description}</p>
    <dl className="grid sm:grid-cols-2 gap-5 bg-white/5 p-6 rounded-2xl">
      {Object.entries({ Date:event.date, Schedule:event.timings, Venue:event.venue, 'Team format':event.teamSize, 'HITAM fee':event.registrationFee.hitam, 'Other college fee':event.registrationFee.nonHitam, 'Prize pool':event.prizePool, Organizer:event.club }).map(([label,value]) => <div key={label}><dt className="text-text-muted text-sm">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}
    </dl>
    {event.agenda && <section className="mt-8"><h2 className="text-2xl font-bold mb-4">Schedule</h2>{event.agenda.map(item => <p key={item.label} className="my-3"><strong>{item.label}</strong> · {item.detail}</p>)}</section>}
    <section className="my-8"><h2 className="text-2xl font-bold mb-4">Event highlights</h2><ul className="list-disc pl-5 space-y-2">{event.highlights.map(text => <li key={text}>{text}</li>)}</ul></section>
    {event.coordinators && <section className="my-8"><h2 className="text-2xl font-bold mb-4">Coordinators</h2>{[...event.coordinators.students, ...(event.coordinators.faculty ? [event.coordinators.faculty] : []), ...(event.coordinators.additionalFaculty || [])].map(person => <p key={person.name} className="my-3">{person.name} {person.email && <a className="text-brand-orange break-all" href={`mailto:${person.email}`}>{person.email}</a>} {person.phone && <a href={`tel:${person.phone}`}>{person.phone}</a>}</p>)}</section>}
    <div className="flex flex-wrap gap-4 mt-8">
      {pilot && <Link className="rounded-xl bg-brand-orange px-6 py-4 font-bold" href={`${eventPath(event)}/register`}>Try local registration</Link>}
      <a className="rounded-xl border border-white/25 px-6 py-4" href={getEventRegisterUrl(event)}>Existing official registration</a>
      {event.brochureUrl && <a className="rounded-xl border border-white/25 px-6 py-4" href={event.brochureUrl}>Event brochure</a>}
    </div>
  </main>;
}
