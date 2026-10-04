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
  localPilot: event.id !== 'ieee-ideathon',
});

export const backendEventId = (event:FestEventItem) => ({'reverse-hackathon':'E02','agentic-ai-workshop-hackathon':'E03','programmers-got-talent':'E04','smart-manufacturing-challenge':'E05','ieom-startup-pitch':'E06','dataquest-kaggle':'E07','n8n-automation-challenge':'E08','data-heist-datathon':'E09','data-dossier':'E10','torquex-motorsport':'E11','build-first-robot':'E12','code-casino':'E13','technical-tambola':'E14'} as Record<string,string>)[event.slug];
