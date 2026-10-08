import Link from 'next/link';
export function RegistrationNotice() {
 return <aside aria-label="Last chance registration information" className="mb-8 rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-400/10 to-orange-500/10 p-5 sm:p-6 text-amber-100">
  <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Last chance · ESPARTO 2026</p>
  <h2 className="mt-2 text-xl font-bold">Online payments below ₹150 · Limited spot registrations at HITAM</h2>
  <div className="mt-4 grid gap-4 sm:grid-cols-2">
   <div><h3 className="font-bold">Below ₹150 — register and pay online</h3><p className="mt-2 text-sm">Eligible options with a final payable amount strictly below ₹150 are open on this website. Check your college and team size before paying.</p><Link className="mt-3 inline-block font-semibold underline underline-offset-4" href="/events">Choose your event →</Link></div>
   <div><h3 className="font-bold">₹150 and above — college registration desk only</h3><p className="mt-2 text-sm">50 spot-registration slots are available at HITAM Campus, on a first-come, first-served basis. Register and arrange payment with the college desk. Availability is not guaranteed once slots are filled; do not pay online for these options.</p></div>
  </div>
  <p className="mt-4 border-t border-amber-400/20 pt-3 text-sm font-semibold">GDG registrations remain closed due to capacity.</p>
 </aside>;
}
