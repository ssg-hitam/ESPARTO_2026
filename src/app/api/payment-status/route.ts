import { NextResponse } from "next/server";
import { GOOGLE_APPS_SCRIPT_REGISTRATION_URL } from "@/data/events";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const headers = { "Cache-Control": "no-store, max-age=0", "X-Content-Type-Options": "nosniff" };
const statuses = ["Verified", "Pending Verification", "Rejected", "Not Found"];

export async function POST(request: Request) {
  try {
    if (!request.body || Number(request.headers.get("content-length")) > 512) {
      return NextResponse.json({ error: "Enter a valid ticket ID." }, { status: 400, headers });
    }
    const reader = request.body.getReader();
    const decoder = new TextDecoder();
    let text = "", bytes = 0;
    try {
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        bytes += chunk.value.byteLength;
        if (bytes > 512) {
          await reader.cancel();
          return NextResponse.json({ error: "Enter a valid ticket ID." }, { status: 400, headers });
        }
        text += decoder.decode(chunk.value, { stream: true });
      }
      text += decoder.decode();
    } finally { reader.releaseLock(); }
    let body: unknown;
    try { body = JSON.parse(text); }
    catch { return NextResponse.json({ error: "Enter a valid ticket ID." }, { status: 400, headers }); }
    const ticketId = typeof body === "object" && body !== null && "ticketId" in body && typeof body.ticketId === "string"
      ? body.ticketId.trim().toUpperCase() : "";
    if (!/^ESP26-(?:E(?:0[1-9]|1[0-4])-\d{4}|HITM-E(?:0[1-9]|1[0-4])-\d{3,6})$/.test(ticketId)) {
      return NextResponse.json({ error: "Enter your complete ticket ID, for example ESP26-HITM-E08-001." }, { status: 400, headers });
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
