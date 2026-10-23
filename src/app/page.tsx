import { OrganiserPortraits } from "@/components/home/OrganiserPortraits";
import { OrganiserTribute } from "@/components/home/OrganiserTribute";
import { CelebrationSection } from "@/components/home/CelebrationSection";
import { ChaptersMarqueeSection } from "@/components/home/ChaptersMarqueeSection";

export default function Home() {
  return (
    <>
      <CelebrationSection />
      <OrganiserTribute />
      <ChaptersMarqueeSection />
      <OrganiserPortraits />
    </>
  );
}
