"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function PaymentStatusPage() {
  const [ticketId, setTicketId] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function checkStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setMessage(""); setStatus("");
    try {
      const response = await fetch("/api/payment-status", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId }), cache: "no-store", signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || typeof result.status !== "string") throw new Error(result.error || "Unable to check payment status. Please try again.");
      setStatus(result.status);
    } catch (error) {
      setMessage(error instanceof Error && error.name !== "TimeoutError" ? error.message : "The check took too long. Please try again shortly.");
    } finally { setBusy(false); }
  }

  return (
    <div className="min-h-[65vh] bg-[#03010b] text-text-primary pt-8 pb-16">
      <Container size="lg">
        <div className="max-w-xl mx-auto">
          <Link href="/register" className="inline-flex items-center min-h-11 text-sm text-text-muted hover:text-white mb-6">← Back to registration</Link>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">Check your payment status →</h1>
          <form onSubmit={checkStatus} className="space-y-3" aria-busy={busy}>
            <label htmlFor="ticket-id" className="block text-sm font-semibold">Ticket ID</label>
            <input id="ticket-id" name="ticketId" value={ticketId} onChange={(event) => { setTicketId(event.target.value); setStatus(""); setMessage(""); }} required maxLength={21} pattern="[Ee][Ss][Pp]26-([Ee](0[1-9]|1[0-4])-[0-9]{4}|[Hh][Ii][Tt][Mm]-[Ee](0[1-9]|1[0-4])-[0-9]{3,6})" placeholder="ESP26-HITM-E08-001" autoComplete="off" spellCheck={false} disabled={busy} className="w-full min-h-12 rounded-xl border border-white/20 bg-white/5 px-4 font-mono text-white focus:outline-none focus:ring-2 focus:ring-brand-orange disabled:opacity-70" />
            <button disabled={busy} type="submit" className="min-h-12 w-full sm:w-auto px-6 rounded-xl bg-gradient-to-r from-brand-orange to-brand-magenta font-semibold text-white disabled:opacity-60">{busy ? "Checking…" : "Check payment status"}</button>
          </form>
          <div aria-live="polite" aria-atomic="true" className="mt-5">
            {status && <div className={`rounded-xl border p-4 ${status === "Verified" ? "border-emerald-500/40 bg-emerald-500/10" : "border-white/15 bg-white/5"}`}>
              <p className="font-semibold text-white">{status === "Not Found" ? "Ticket not found" : status === "Pending Verification" ? "Awaiting payment verification" : status === "Rejected" ? "Payment not approved" : "Payment verified ✓"}</p>
              <p className="mt-2 text-sm text-text-secondary">{status === "Verified" ? "Please check the email address you provided during registration for your ticket, event QR code and WhatsApp group link." : status === "Not Found" ? "Check your complete ticket ID and try again. IEEE registrations are handled by its separate official portal." : status === "Rejected" ? "Please contact elysian@hitam.org with your ticket ID for assistance." : "Your registration is present. The organizers are reviewing your payment; please check again later."}</p>
            </div>}
            {message && <p role="alert" className="text-sm text-rose-300">{message}</p>}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-text-secondary">Your payment status is updated as the organizers review registrations, typically within 12 hours. After successful payment verification, you will receive an email at the address you provided during registration with your event ticket, QR code and WhatsApp group link.</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">Enter your ticket ID above to check whether your payment has been verified. Each check reads the latest saved payment status.</p>
          <p className="mt-4 text-sm text-text-muted">Need help? <a className="text-brand-orange hover:underline" href="mailto:elysian@hitam.org">elysian@hitam.org</a></p>
        </div>
      </Container>
    </div>
  );
}
