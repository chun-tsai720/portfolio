import catalog from "@/src/data/rock-catalog.json";

export function getBands() {
  return catalog.bands;
}

export function getBand(slug) {
  return catalog.bands.find((band) => band.slug === slug);
}

export function getEvent(bandSlug, eventSlug) {
  return getBand(bandSlug)?.events.find((event) => event.slug === eventSlug);
}

export function formatCount(count) {
  return new Intl.NumberFormat("zh-TW").format(count);
}

export const catalogStats = catalog.stats;
