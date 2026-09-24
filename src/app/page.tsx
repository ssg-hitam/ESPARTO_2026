import { IntroVideoOverlay } from "@/components/home/IntroVideoOverlay";
import { HeroSection } from "@/components/home/HeroSection";
import { CountdownSection } from "@/components/home/CountdownSection";
import { IdeaSection } from "@/components/home/IdeaSection";
import { ChaptersMarqueeSection } from "@/components/home/ChaptersMarqueeSection";
import { RegisterCtaSection } from "@/components/home/RegisterCtaSection";

/**
 * ESPARTO 2026 Homepage
 * 
 * Flow:
 * 0. IntroVideoOverlay — Initial muted cinematic teaser with skip option
 * 1. HeroSection — Festival entry point & interactive hexagon matrix
 * 2. CountdownSection — Real-time drift-free festival clock
 * 3. IdeaSection — Festival manifesto (01 IDEA → 02 INNOVATION → 03 IMPACT)
 * 4. ChaptersMarqueeSection — Infinite auto-scrolling partner chapters & clubs
 * 5. RegisterCtaSection — Final festival registration CTA ("READY TO BUILD WHAT'S NEXT?")
 */
export default function Home() {
  return (
    <>
      {/* 0. Initial Teaser Video Overlay (Muted, Centered, Skip Option) */}
      <IntroVideoOverlay />

      {/* 1. Hero Experience */}
      <HeroSection />

      {/* 2. Editorial Festival Countdown */}
      <CountdownSection />

      {/* 3. ESPARTO Identity — The Idea */}
      <IdeaSection />

      {/* 4. Participating Technical Chapters & Clubs Marquee */}
      <ChaptersMarqueeSection />

      {/* 5. Final Register CTA */}
      <RegisterCtaSection />
    </>
  );
}
