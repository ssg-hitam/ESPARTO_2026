import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { bridge, configured, COOKIE, makeSession, sameOrigin, scannerHeaders, smallJSON } from '@/lib/scanner/server';
export const runtime='nodejs';
const client=new OAuth2Client();
export async function POST(request: Request) {
  if(!sameOrigin(request))return NextResponse.json({success:false,message:'Invalid request origin.'},{status:403,headers:scannerHeaders});
  if(!configured())return NextResponse.json({success:false,message:'Scanner sign-in is awaiting administrator configuration.'},{status:503,headers:scannerHeaders});
  try {
    const body=await smallJSON(request);
    if(typeof body.credential!=='string' || body.credential.length>6000)throw Error('AUTH');
    const ticket=await client.verifyIdToken({idToken:body.credential,audience:process.env.SCANNER_GOOGLE_CLIENT_ID});
    const claims=ticket.getPayload();
    if(!claims?.email || claims.email_verified!==true || claims.hd!=='hitam.org' || !claims.email.toLowerCase().endsWith('@hitam.org'))throw Error('AUTH');
    const email=claims.email.toLowerCase();
    const access=await bridge(email,'session');
    if(!access.success)throw Error('AUTH');
    const response=NextResponse.json(access,{headers:scannerHeaders});
    response.cookies.set(COOKIE,makeSession(email),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/api/scanner',maxAge:3600});
    return response;
  }catch { return NextResponse.json({success:false,message:'Sign-in denied. Use an explicitly approved HITAM organizer account; ask the administrator to check scanner configuration if it persists.'},{status:403,headers:scannerHeaders}); }
}
