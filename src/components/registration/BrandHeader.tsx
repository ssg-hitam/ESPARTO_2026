import Image from 'next/image';
export const ticketBrands = [
  {src:'/images/hitam/hitam_logo.jpg',alt:'HITAM',width:56,height:66},
  {src:'/icons/esparto_official_logo.png',alt:'ESPARTO 2026',width:150,height:90},
  {src:'/images/brand/ssg-logo.png',alt:'SSG HITAM',width:66,height:66},
];
export function BrandHeader() {
  return <div className="flex items-center justify-center gap-6 sm:gap-10 rounded-2xl bg-white px-5 py-5">
    {ticketBrands.map(brand=><Image key={brand.alt} {...brand} alt={brand.alt} className="h-14 sm:h-16 w-auto max-w-[40%] object-contain" priority/>)}
  </div>;
}
