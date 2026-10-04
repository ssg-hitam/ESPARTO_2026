import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function backend() {
  if (process.env.NODE_ENV !== 'development') return null;
  const configured = process.env.EVENT_PLATFORM_LOCAL_BACKEND;
  if (!configured) return null;
  const url = new URL(configured);
  return url.origin === 'http://127.0.0.1:4100' && url.pathname === '/' ? url.href : null;
}
export async function POST(request: NextRequest) {
  const url = backend();
  if (!url) return NextResponse.json({ success:false, message:'Local registration testing is disabled.' }, {status:503});
  if (request.headers.get('origin') !== request.nextUrl.origin) return NextResponse.json({success:false,message:'Invalid origin.'},{status:403});
  try {
    if (Number(request.headers.get('content-length')) > 3000000) return NextResponse.json({success:false,message:'Screenshot is too large.'},{status:413});
    const reader=request.body?.getReader(); if(!reader)throw Error('Empty');
    const chunks:Uint8Array[]=[];let size=0;
    while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>3000000){await reader.cancel();return NextResponse.json({success:false,message:'Screenshot is too large.'},{status:413});}chunks.push(value);}
    const body=Buffer.concat(chunks).toString('utf8');const data=JSON.parse(body);
    if (!['catalogue','submit','status'].includes(data.action) || (data.action==='submit' && !/^E(?:0[2-9]|1[0-4])$/.test(String(data.payload?.eventId||'')))) return NextResponse.json({success:false,message:'Unsupported local pilot action.'},{status:400});
    const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body,cache:'no-store',signal:AbortSignal.timeout(15000)});
    return NextResponse.json(await response.json(),{status:response.status,headers:{'Cache-Control':'no-store'}});
  } catch {return NextResponse.json({success:false,retryable:true,message:'The local test backend is unavailable. Retry the same submission; do not pay.'},{status:503});}
}
