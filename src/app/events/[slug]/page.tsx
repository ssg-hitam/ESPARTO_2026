import CapacityAvailability from '@/components/events/CapacityAvailability';
import { REOPENED_SLUGS } from '@/lib/registration/reopening';
import { RegistrationNotice } from '@/components/events/RegistrationNotice';
import { CalendarDays, Clock3, MapPin, Users, IndianRupee, Trophy, Building2, Mail, Phone, ArrowUpRight, Sparkles, UserRound, FileText, Award, Crown, Medal } from 'lucide-react';
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
  const facts=[{label:'Date',value:event.date,icon:CalendarDays},{label:'Venue',value:event.venue,icon:MapPin},{label:'Team format',value:event.teamSize,icon:Users},{label:'HITAM fee',value:event.registrationFee.hitam,icon:IndianRupee,price:true},{label:'Other college fee',value:event.registrationFee.nonHitam,icon:IndianRupee,price:true},{label:'Prize pool',value:event.prizePool,icon:Trophy,prize:true},{label:'Organizer',value:event.club,icon:Building2}];
  const people=[...(event.coordinators?.students||[]).map(person=>({...person,role:'Student coordinator'})),...(event.coordinators?.faculty?[event.coordinators.faculty]:[]).concat(event.coordinators?.additionalFaculty||[]).map(person=>({...person,role:'Faculty coordinator'}))];
  return <main id="main-content" className="max-w-6xl mx-auto px-5 py-10 sm:py-14 text-white">
    <Link href="/events" className="text-brand-orange">← All events</Link>
    <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-brand-orange/10 px-4 py-2 text-xs sm:text-sm font-semibold text-brand-orange"><span className="relative flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1"><Image src={event.clubLogo} alt={`${event.club} logo`} width={56} height={40} className="h-full w-full object-contain"/></span><span>{event.category} · {event.club}</span></p>
    <h1 className="text-4xl sm:text-6xl font-display font-bold my-5">{event.title}</h1>
    <p className="text-xl text-text-secondary mb-6 max-w-3xl">{event.tagline}</p><a className="inline-flex rounded-xl bg-gradient-to-r from-brand-orange to-brand-magenta px-6 py-4 font-bold mb-8 hover:brightness-110" href={getEventRegisterUrl(event)}>{event.registrationClosed ? event.slug==='agentic-ai-workshop-hackathon'?"GDG registrations closed":"Registrations closed" : "Register for event →"}</a>
    {REOPENED_SLUGS.includes(event.slug)&&<CapacityAvailability slug={event.slug} link />}
    <RegistrationNotice />
    {event.bannerImage && <Image src={event.bannerImage} alt={`${event.title} poster`} width={1600} height={600} className="w-full h-auto rounded-2xl" priority />}
    {!event.registrationClosed&&event.slug==='reverse-hackathon'&&<aside className="mt-4 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-orange-500/20 via-pink-500/15 to-violet-500/15 p-5 sm:p-7" aria-label="HITAM flash sale"><p className="text-amber-300 text-xs font-bold uppercase tracking-widest">HITAM students · Flash sale</p><div className="mt-3 flex flex-wrap items-center justify-between gap-4"><div><p className="text-2xl sm:text-3xl font-bold"><span className="mr-3 text-lg text-text-muted line-through">₹550</span>₹450 <span className="text-base font-normal">per team</span></p><p className="mt-2 text-sm text-text-secondary">Save ₹100 · Apply the code before paying.</p></div><div className="rounded-xl border border-amber-300/40 bg-black/25 px-5 py-3"><p className="text-xs text-text-secondary">Promo code</p><p className="mt-1 font-mono text-xl font-bold text-amber-300">ESPARTO26</p></div></div><p className="mt-4 text-xs text-text-muted">Reverse Hackathon only · HITAM teams of 2–3 · Other colleges: ₹600 per team.</p></aside>}
    <p className="my-8 text-lg leading-relaxed text-text-secondary">{event.description}</p>
    <dl className="grid grid-cols-2 lg:grid-cols-3 items-start gap-4 border border-white/10 bg-gradient-to-br from-[#19102e] to-[#0c0720] p-5 sm:p-8 rounded-3xl">
      {facts.map(({label,value,icon:Icon,price,prize})=><div key={label} className={`min-w-0 rounded-2xl border p-4 sm:p-5 ${label==='Organizer'?'col-span-full':''} ${price?'border-brand-orange/25 bg-brand-orange/[0.07]':prize?'border-amber-400/25 bg-amber-400/[0.07]':'border-white/5 bg-white/[0.025]'}`}><dt className="flex items-center gap-2.5 text-text-muted text-xs sm:text-sm"><span className={`inline-flex rounded-xl p-2 ${price?'bg-brand-orange/15 text-brand-orange':prize?'bg-amber-400/15 text-amber-300':'bg-brand-violet/15 text-violet-300'}`}><Icon className="h-4 w-4" aria-hidden="true"/></span>{label}</dt><dd className={`mt-4 leading-snug font-semibold ${price||prize?'text-lg sm:text-2xl text-white':'text-sm sm:text-base'}`}>{label==='Organizer'?<span className="flex items-center gap-4"><span className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-xl bg-white p-2"><Image src={event.clubLogo} alt={`${event.club} logo`} width={80} height={80} className="max-h-full w-auto object-contain"/></span><span>{value}</span></span>:value}</dd></div>)}
    </dl>
    <section className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-5 sm:p-6"><h2 className="flex items-center gap-3 text-sm text-violet-300"><Clock3 className="h-5 w-5" aria-hidden="true"/>Event schedule</h2><p className="mt-3 text-base sm:text-lg leading-relaxed text-white">{event.timings}</p></section>
    <section className="my-12" aria-labelledby="prizes-heading">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300 font-semibold">Compete. Create. Celebrate.</p>
      <h2 id="prizes-heading" className="mt-2 text-3xl sm:text-4xl font-bold">Prizes & recognition</h2>
      <p className="mt-3 text-text-secondary">{event.prizePool} prize pool · Make your mark at ESPARTO.</p>
      <div className={`mt-8 grid items-end gap-4 ${event.prizeBreakup?.third ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {([
          {rank:1,amount:event.prizeBreakup?.first,label:'Champion',order:'md:order-2',tone:'border-amber-400/40 bg-gradient-to-b from-amber-400/10 to-[#100b20]',color:'text-amber-300',base:'from-amber-300 to-orange-500'},
          {rank:2,amount:event.prizeBreakup?.second,label:'Runner-up',order:'md:order-1',tone:'border-slate-400/30 bg-[#100e20]',color:'text-slate-200',base:'from-slate-200 to-slate-500'},
          {rank:3,amount:event.prizeBreakup?.third,label:'Second runner-up',order:'md:order-3',tone:'border-orange-500/30 bg-[#100e20]',color:'text-orange-300',base:'from-orange-300 to-orange-700'},
        ]).filter(prize=>prize.amount).map(prize=><div key={prize.rank} className={`overflow-hidden rounded-3xl border text-center ${prize.order} ${prize.tone}`}>
          <div className={`px-5 py-7 ${prize.rank===1?'md:pt-12':''}`}>
            <span className={`inline-flex items-center gap-2 rounded-full border border-current/20 px-3 py-1 text-xs uppercase tracking-wider font-bold ${prize.color}`}>{prize.rank===1?<Crown className="h-4 w-4" aria-hidden="true"/>:<Medal className="h-4 w-4" aria-hidden="true"/>}{prize.label}</span>
            <p className="mt-5 text-4xl" aria-hidden="true">{prize.rank===1?'🥇':prize.rank===2?'🥈':'🥉'}</p>
            <h3 className={`mt-4 font-semibold ${prize.color}`}>{prize.rank===1?'1st':prize.rank===2?'2nd':'3rd'} place</h3>
            <p className={`mt-2 text-4xl sm:text-5xl font-bold tracking-tight ${prize.color}`}>{prize.amount}</p>
            <p className="mt-4 text-sm text-text-secondary">Cash prize & certificate</p>
          </div>
          <div className={`mx-6 rounded-t-2xl bg-gradient-to-br ${prize.base} ${prize.rank===1?'py-7 md:py-10':'py-5'}`}><span className="text-4xl font-black text-black/60">{prize.rank}</span></div>
        </div>)}
      </div>
      <div className="mt-5 flex items-start sm:items-center gap-4 rounded-2xl border border-violet-400/25 bg-gradient-to-r from-violet-500/10 to-transparent p-5 sm:p-6"><span className="rounded-2xl bg-violet-400/15 p-3 text-violet-300"><Award className="h-7 w-7" aria-hidden="true"/></span><div><h3 className="text-lg font-bold">Participation certificate for every participant</h3><p className="mt-1 text-sm text-text-secondary">Celebrate your learning and participation with an official event certificate.</p></div></div>
    </section>
    {event.agenda && <section className="mt-8"><h2 className="text-2xl font-bold mb-4">Schedule</h2>{event.agenda.map(item => <p key={item.label} className="my-3"><strong>{item.label}</strong> · {item.detail}</p>)}</section>}
    <section className="my-8"><h2 className="text-2xl font-bold mb-4">Event highlights</h2><ul className="grid sm:grid-cols-2 gap-3 list-none">{event.highlights.filter(text=>!/^1st:/.test(text)).map(text => <li key={text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-text-secondary"><Sparkles className="h-4 w-4 mt-1 shrink-0 text-brand-orange" aria-hidden="true"/>{text}</li>)}</ul></section>
    {people.length>0&&<section className="my-10"><div className="flex items-center gap-3 mb-5"><span className="rounded-xl bg-brand-violet/15 p-2.5 text-violet-300"><Users className="h-5 w-5" aria-hidden="true"/></span><h2 className="text-2xl font-bold">Meet your coordinators</h2></div><div className="grid sm:grid-cols-2 gap-4">{people.map(person=><div key={person.name} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#19102e] to-[#0c0720] p-5 sm:p-6 min-w-0"><div className="flex items-center gap-3 mb-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-orange/20 bg-brand-orange/10 text-brand-orange"><UserRound className="h-6 w-6" aria-hidden="true"/></span><div><p className="font-semibold text-lg">{person.name}</p><p className="text-xs text-text-muted mt-1">{person.role}</p></div></div><div className="space-y-2">{person.email&&<a className="flex items-center gap-3 rounded-xl bg-white/[0.035] px-3 py-3 text-sm hover:bg-brand-orange/10 transition-colors" href={`mailto:${person.email}`}><Mail className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true"/><span className="break-all">{person.email}</span><ArrowUpRight className="h-3.5 w-3.5 shrink-0 ml-auto text-text-muted" aria-hidden="true"/></a>}{person.phone&&<a className="flex items-center gap-3 rounded-xl bg-white/[0.035] px-3 py-3 text-sm hover:bg-brand-orange/10 transition-colors" href={`tel:${person.phone}`}><Phone className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true"/><span>{person.phone}</span><ArrowUpRight className="h-3.5 w-3.5 ml-auto text-text-muted" aria-hidden="true"/></a>}</div></div>)}</div></section>}
    <div className="flex flex-col sm:flex-row gap-4 mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
      {pilot && !productionRegistrationEnabled() && <Link className="rounded-xl bg-brand-orange px-6 py-4 font-bold" href={`${eventPath(event)}/register`}>Try local registration</Link>}
      <a className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-magenta px-7 py-4 font-bold shadow-lg shadow-orange-500/20 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400" href={getEventRegisterUrl(event)}>{event.registrationClosed ? event.slug==='agentic-ai-workshop-hackathon'?"GDG registrations closed":"Registrations closed" : "Register for event"}<ArrowUpRight className="h-5 w-5" aria-hidden="true"/></a>
      {event.brochureUrl && <a className="inline-flex items-center justify-center rounded-xl border border-violet-400/50 bg-violet-500/15 px-7 py-4 font-bold text-violet-100 transition hover:bg-violet-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400" href={event.brochureUrl}><FileText className="inline h-4 w-4 mr-2" aria-hidden="true"/>Event brochure</a>}
    </div>
  </main>;
}
