import { FEST_EVENTS, type FestEventItem } from '@/data/events';

// Public slugs can differ from the legacy backend slug without changing Sheets.
export const eventSlug = (event: FestEventItem) => event.id === 'ieee-ideathon' ? 'innovision' : event.slug;
export function findPublicEvent(slug: string) {
  return FEST_EVENTS.find(event => eventSlug(event) === slug || event.slug === slug);
}
export const eventPath = (event: FestEventItem) => `/events/${eventSlug(event)}`;
export const registrationIntegration = (event: FestEventItem) => ({
  key: event.id === 'ieee-ideathon' ? 'ieee-external' : 'esparto-apps-script',
  backendSlug: event.slug,
  localPilot: event.slug === 'n8n-automation-challenge',
});
