import { NextResponse } from 'next/server';
import { bridge, COOKIE, sameOrigin, scannerHeaders, sessionEmail, smallJSON } from '@/lib/scanner/server';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET() {
  try { return NextResponse.json(await bridge(await sessionEmail(),'session'),{headers:scannerHeaders}); }
  catch {return NextResponse.json({success:false,message:'Sign in to continue.'},{status:401,headers:scannerHeaders});}
}
export async function POST(request:Request) {
  if(!sameOrigin(request))return NextResponse.json({success:false,message:'Invalid request origin.'},{status:403,headers:scannerHeaders});
  let email:string;
  try {email=await sessionEmail();}catch{return NextResponse.json({success:false,message:'Your session expired. Sign in again.'},{status:401,headers:scannerHeaders});}
  try {
    const body=await smallJSON(request);
    if(!['lookup','confirm'].includes(body.action) || typeof body.reference!=='string' || body.reference.length>100 || !/^E(?:0[2-9]|1[0-4])$/.test(body.eventId) || (body.action==='confirm' && body.identityChecked!==true))return NextResponse.json({success:false,message:'Select an event and complete the required identity check.'},{status:400,headers:scannerHeaders});
    return NextResponse.json(await bridge(email,body.action,body.reference,body.eventId,body.identityChecked===true),{headers:scannerHeaders});
  }catch{return NextResponse.json({success:false,message:'Connection failed. Look up the ticket again before retrying attendance.'},{status:503,headers:scannerHeaders});}
}
export async function DELETE(request:Request) {
  if(!sameOrigin(request))return new NextResponse(null,{status:403,headers:scannerHeaders});
  const response=NextResponse.json({success:true},{headers:scannerHeaders});response.cookies.set(COOKIE,'',{path:'/api/scanner',maxAge:0});return response;
}
