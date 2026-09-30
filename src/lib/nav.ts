export interface NavItem {
  label: string;
  href: string;
  indicator: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about", indicator: "01" },
  { label: "Events", href: "/events", indicator: "02" },
  { label: "Sponsors", href: "/sponsors", indicator: "03" },
  { label: "Guests", href: "/guests", indicator: "04" },
  { label: "Team", href: "/team", indicator: "05" },
  { label: "Venue", href: "/venue", indicator: "06" },
];
