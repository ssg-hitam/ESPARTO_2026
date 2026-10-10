export function RegistrationNotice() {
 return <aside aria-label="Registrations closed" className="mb-8 rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-400/10 to-orange-500/10 p-5 sm:p-6 text-amber-100">
  <p className="text-xs font-bold uppercase tracking-widest text-amber-300">ESPARTO 2026</p>
  <h2 className="mt-2 text-xl font-bold">Registrations closed</h2>
  <div className="mt-3 rounded-xl border border-amber-300/40 bg-amber-300/10 p-4">
   <h3 className="font-bold">All registrations are closed</h3>
   <p className="mt-2 text-sm">We are no longer accepting online or on-campus spot registrations for any event. Please do not make a new payment.</p>
   <p className="mt-2 text-sm font-bold">Existing registrations remain valid, subject to organizer verification.</p>
  </div>
  <p className="mt-3 text-sm">Already paid but unable to submit? Keep your payment proof and contact <a className="underline" href="mailto:ssg@hitam.org">ssg@hitam.org</a>. Do not pay again.</p>
 </aside>;
}
