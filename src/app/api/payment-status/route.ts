import { NextResponse } from "next/server";
import { GOOGLE_APPS_SCRIPT_REGISTRATION_URL } from "@/data/events";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const headers = { "Cache-Control": "no-store, max-age=0", "X-Content-Type-Options": "nosniff" };
const statuses = ["Verified", "Pending Verification", "Rejected", "Not Found"];

export async function POST(request: Request) {
  try {
    const text = await request.text();
    if (text.length > 512) return NextResponse.json({ error: "Enter a valid ticket ID." }, { status: 400, headers });
    const body: unknown = JSON.parse(text);
    const ticketId = typeof body === "object" && body !== null && "ticketId" in body && typeof body.ticketId === "string"
      ? body.ticketId.trim().toUpperCase() : "";
    if (!/^ESP26-E(?:0[1-9]|1[0-4])-\d{4}$/.test(ticketId)) {
      return NextResponse.json({ error: "Enter your complete ticket ID, for example ESP26-E02-8419." }, { status: 400, headers });
    }
    const url = new URL(GOOGLE_APPS_SCRIPT_REGISTRATION_URL);
    url.searchParams.set("action", "payment-status");
    url.searchParams.set("ticketId", ticketId);
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error("Status unavailable");
    const result: unknown = await response.json();
    if (typeof result !== "object" || result === null || !("status" in result) || typeof result.status !== "string" || !statuses.includes(result.status)) {
      throw new Error("Status unavailable");
    }
    // Return only an allowlisted status, never upstream participant or payment data.
    return NextResponse.json({ status: result.status }, { headers });
  } catch {
    return NextResponse.json({ error: "We couldn’t check your payment status right now. Please try again shortly or contact elysian@hitam.org." }, { status: 503, headers });
  }
}
