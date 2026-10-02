# Device review — 2 October 2026

Reviewed the Next.js project and corrected confirmed navigation, layout, and accessibility problems.

## Changes

- Direct visits to inner pages now show the navbar and footer without requiring the homepage intro.
- Restricted session storage cannot prevent intro completion; reduced-motion users skip the intro.
- Video errors and rejected autoplay release the intro. The skip control has a larger touch target and visible keyboard focus.
- Navbar remains sticky through its layout wrapper.
- Mobile navigation traps keyboard focus, restores focus and scrolling on close, and closes when resizing to desktop.
- Event dialogs trap focus, close with Escape, restore focus and scrolling, and fit dynamic mobile viewport heights.
- Event-card badges wrap within narrow cards; decorative backgrounds no longer cause horizontal page overflow.
- Narrow hero and registration-header spacing improved; search inputs now have accessible names.
- Reduced-motion users receive visible reveal content and a static canvas background.
- Lint now uses the ESLint CLI; unused registration imports removed.

## Verification

- Production build: passed, including type validation and static generation.
- ESLint: no errors; eight existing carousel warnings (seven explicit-any warnings and one unoptimized image warning).
- Chrome production browser checks: 50 route/viewport combinations. Tested /, /about, /events, /sponsors, /guests, /team, /venue, /register, /hitam, and /schedule at widths 320, 390, 768, 1024, and 1440 pixels, height 850 pixels, with reduced motion enabled. No page JavaScript errors, hidden headers after hydration, or horizontal document overflow in the final run.
- Mobile interactions: navigation open/close, keyboard Escape, event-dialog open/close, body scroll locking and restoration exercised at 390 × 844.
- Visually inspected mobile homepage and event-dialog screenshots.
- Referenced literal local image, icon, and video paths checked: no missing files found.
- Git diff whitespace check passed.

## Remaining validation

These are simulated Chrome viewport checks, not certification on every device. Real iOS Safari, Android hardware, Firefox, landscape orientations, zoomed text, and slow-network performance still require testing. The reduced-motion route matrix does not validate every animation under normal-motion settings. External registration submissions, map availability, and organizer-provided content were not validated. No registration was submitted or external service modified.

The existing development server uses .next, so production verification used a temporary isolated build directory and port 3100. The audit server was stopped after verification.
