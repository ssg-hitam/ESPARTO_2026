'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const mocks = require('./apps-script-mocks.cjs');

test('public status is fresh, requires both verification records, and returns no private data', () => {
  const h = mocks.createHarness(), payload = mocks.payloadFor(h, 'E02');
  const saved = h.scope.submitRegistration(payload);
  const id = saved.receipt.regId;
  assert.deepEqual(JSON.parse(JSON.stringify(h.scope.publicPaymentStatus_(id))), { status: 'Pending Verification' });
  h.sheets.ALL_REGISTRATIONS.rows[1][17] = 'Verified';
  assert.equal(h.scope.publicPaymentStatus_(id).status, 'Pending Verification');
  h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11] = 'Verified';
  assert.deepEqual(JSON.parse(JSON.stringify(h.scope.publicPaymentStatus_(id))), { status: 'Verified' });
  h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11] = 'Rejected';
  assert.equal(h.scope.publicPaymentStatus_(id).status, 'Rejected');
  h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11] = 'Verified';
  h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][6] = 1;
  assert.equal(h.scope.publicPaymentStatus_(id).status, 'Pending Verification');
  assert.equal(h.scope.publicPaymentStatus_('bad').status, 'Not Found');
  assert.equal(h.scope.publicPaymentStatus_('ESP26-E14-0000').status, 'Not Found');
  delete h.scope.Sheets;
  assert.equal(h.scope.publicPaymentStatus_(id).error, 'STATUS_UNAVAILABLE');
});

function loadRoute(fetch) {
  const code = ts.transpileModule(fs.readFileSync('src/app/api/payment-status/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  const scope = { exports, URL, AbortSignal, TextDecoder, fetch, require(name) {
    if (name === 'next/server') return { NextResponse: { json: (body, options) => Response.json(body, options) } };
    if (name === '@/data/events') return { GOOGLE_APPS_SCRIPT_REGISTRATION_URL: 'https://script.google.com/macros/s/test/exec' };
    throw Error('Unexpected import');
  } };
  vm.runInNewContext(code, scope);
  return exports;
}
function request(id) { return new Request('https://www.espartohitam.com/api/payment-status', { method: 'POST', body: JSON.stringify({ ticketId: id }) }); }

test('website API reads fresh Sheet state, strips extra data, and disables caching', async () => {
  const h = mocks.createHarness(), p = mocks.payloadFor(h, 'E02');
  const id = h.scope.submitRegistration(p).receipt.regId;
  let calls = 0;
  const route = loadRoute(async (url, options) => {
    calls++; assert.equal(options.cache, 'no-store'); assert.ok(options.signal);
    assert.equal(url.searchParams.get('action'), 'payment-status');
    return Response.json({ ...h.scope.publicPaymentStatus_(url.searchParams.get('ticketId')), privateEmail: 'do-not-return@example.org', whatsappUrl: 'do-not-return' });
  });
  let response = await route.POST(request(id.toLowerCase()));
  assert.equal(response.headers.get('Cache-Control'), 'no-store, max-age=0');
  assert.deepEqual(await response.json(), { status: 'Pending Verification' });
  h.sheets.ALL_REGISTRATIONS.rows[1][17] = 'Verified'; h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11] = 'Verified';
  response = await route.POST(request(id)); assert.deepEqual(await response.json(), { status: 'Verified' });
  assert.equal(calls, 2);
  response = await route.POST(request('bad')); assert.equal(response.status, 400); assert.equal(calls, 2);
});

test('upstream failure or old deployment fails clearly without inventing a payment status', async () => {
  for (const fetch of [async () => { throw Error('Private upstream exception'); }, async () => Response.json({ error: 'STATUS_UNAVAILABLE' }), async () => new Response('<html>old deployment</html>')]) {
    const route = loadRoute(fetch), response = await route.POST(request('ESP26-E02-8419'));
    assert.equal(response.status, 503); const result = await response.json();
    assert.equal(result.status, undefined); assert.ok(!result.error.includes('Private upstream exception'));
  }
});

test('status API rejects oversized and malformed input before any upstream request',async()=>{
 let calls=0;const route=loadRoute(async()=>{calls++;throw Error('Unexpected upstream request');});
 for(const body of ['x'.repeat(513),'{invalid',JSON.stringify({ticketId:'ESP26-HITM-E08-001',extra:'x'.repeat(600)})]){
 const response=await route.POST(new Request('https://www.espartohitam.com/api/payment-status',{method:'POST',body}));assert.equal(response.status,400);
 }assert.equal(calls,0);
});
