import { CalendarDays, Clock3, MapPin, Users, IndianRupee, Trophy, Building2, Mail, Phone, ArrowUpRight, Sparkles, UserRound, FileText } from 'lucide-react';
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
  const facts=[{label:'Date',value:event.date,icon:CalendarDays},{label:'Schedule',value:event.timings,icon:Clock3},{label:'Venue',value:event.venue,icon:MapPin},{label:'Team format',value:event.teamSize,icon:Users},{label:'HITAM fee',value:event.registrationFee.hitam,icon:IndianRupee,price:true},{label:'Other college fee',value:event.registrationFee.nonHitam,icon:IndianRupee,price:true},{label:'Prize pool',value:event.prizePool,icon:Trophy,prize:true},{label:'Organizer',value:event.club,icon:Building2}];
  const people=[...(event.coordinators?.students||[]).map(person=>({...person,role:'Student coordinator'})),...(event.coordinators?.faculty?[event.coordinators.faculty]:[]).concat(event.coordinators?.additionalFaculty||[]).map(person=>({...person,role:'Faculty coordinator'}))];
  return <main id="main-content" className="max-w-6xl mx-auto px-5 py-10 sm:py-14 text-white">
    <Link href="/events" className="text-brand-orange">← All events</Link>
    <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-brand-orange/10 px-4 py-2 text-xs sm:text-sm font-semibold text-brand-orange"><Sparkles className="h-4 w-4" aria-hidden="true"/>{event.category} · {event.club}</p>
    <h1 className="text-4xl sm:text-6xl font-display font-bold my-5">{event.title}</h1>
    <p className="text-xl text-text-secondary mb-6 max-w-3xl">{event.tagline}</p><a className="inline-flex rounded-xl bg-gradient-to-r from-brand-orange to-brand-magenta px-6 py-4 font-bold mb-8 hover:brightness-110" href={getEventRegisterUrl(event)}>Register for event →</a>
    {event.bannerImage && <Image src={event.bannerImage} alt={`${event.title} poster`} width={1600} height={600} className="w-full h-auto rounded-2xl" priority />}
    <p className="my-8 text-lg leading-relaxed text-text-secondary">{event.description}</p>
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5 border border-white/10 bg-gradient-to-br from-[#19102e] to-[#0c0720] p-5 sm:p-8 rounded-3xl">
      {facts.map(({label,value,icon:Icon,price,prize})=><div key={label} className={`min-w-0 rounded-2xl border p-4 sm:p-5 ${price?'border-brand-orange/25 bg-brand-orange/[0.07]':prize?'border-amber-400/25 bg-amber-400/[0.07]':'border-white/5 bg-white/[0.025]'}`}><dt className="flex items-center gap-2.5 text-text-muted text-xs sm:text-sm"><span className={`inline-flex rounded-xl p-2 ${price?'bg-brand-orange/15 text-brand-orange':prize?'bg-amber-400/15 text-amber-300':'bg-brand-violet/15 text-violet-300'}`}><Icon className="h-4 w-4" aria-hidden="true"/></span>{label}</dt><dd className={`mt-4 leading-snug font-semibold ${price||prize?'text-lg sm:text-2xl text-white':'text-sm sm:text-base'}`}>{value}</dd></div>)}
    </dl>
    {event.agenda && <section className="mt-8"><h2 className="text-2xl font-bold mb-4">Schedule</h2>{event.agenda.map(item => <p key={item.label} className="my-3"><strong>{item.label}</strong> · {item.detail}</p>)}</section>}
    <section className="my-8"><h2 className="text-2xl font-bold mb-4">Event highlights</h2><ul className="grid sm:grid-cols-2 gap-3 list-none">{event.highlights.map(text => <li key={text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-text-secondary"><Sparkles className="h-4 w-4 mt-1 shrink-0 text-brand-orange" aria-hidden="true"/>{text}</li>)}</ul></section>
    {people.length>0&&<section className="my-10"><div className="flex items-center gap-3 mb-5"><span className="rounded-xl bg-brand-violet/15 p-2.5 text-violet-300"><Users className="h-5 w-5" aria-hidden="true"/></span><h2 className="text-2xl font-bold">Meet your coordinators</h2></div><div className="grid sm:grid-cols-2 gap-4">{people.map(person=><div key={person.name} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#19102e] to-[#0c0720] p-5 sm:p-6 min-w-0"><div className="flex items-center gap-3 mb-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-orange/20 bg-brand-orange/10 text-brand-orange"><UserRound className="h-6 w-6" aria-hidden="true"/></span><div><p className="font-semibold text-lg">{person.name}</p><p className="text-xs text-text-muted mt-1">{person.role}</p></div></div><div className="space-y-2">{person.email&&<a className="flex items-center gap-3 rounded-xl bg-white/[0.035] px-3 py-3 text-sm hover:bg-brand-orange/10 transition-colors" href={`mailto:${person.email}`}><Mail className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true"/><span className="break-all">{person.email}</span><ArrowUpRight className="h-3.5 w-3.5 shrink-0 ml-auto text-text-muted" aria-hidden="true"/></a>}{person.phone&&<a className="flex items-center gap-3 rounded-xl bg-white/[0.035] px-3 py-3 text-sm hover:bg-brand-orange/10 transition-colors" href={`tel:${person.phone}`}><Phone className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true"/><span>{person.phone}</span><ArrowUpRight className="h-3.5 w-3.5 ml-auto text-text-muted" aria-hidden="true"/></a>}</div></div>)}</div></section>}
    <div className="flex flex-wrap gap-4 mt-8">
      {pilot && !productionRegistrationEnabled() && <Link className="rounded-xl bg-brand-orange px-6 py-4 font-bold" href={`${eventPath(event)}/register`}>Try local registration</Link>}
      <a className="rounded-xl border border-white/25 px-6 py-4" href={getEventRegisterUrl(event)}>Register for event</a>
      {event.brochureUrl && <a className="rounded-xl border border-white/25 px-6 py-4" href={event.brochureUrl}><FileText className="inline h-4 w-4 mr-2" aria-hidden="true"/>Event brochure</a>}
    </div>
  </main>;
}
