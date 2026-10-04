import type { Metadata } from 'next';
import Scanner from './Scanner';
export const metadata:Metadata={title:'Organizer QR Scanner',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default function Page(){return <Scanner clientId={process.env.SCANNER_GOOGLE_CLIENT_ID||''}/>;}
