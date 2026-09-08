import motorCatalog from "@/src/data/motor-catalog.json";
import portraitCatalog from "@/src/data/portrait-catalog.json";

const catalogs = {
  motor: motorCatalog,
  portrait: portraitCatalog,
};

export function getPhotoCollection(slug) {
  return catalogs[slug];
}

export function getPhotoProjects(collectionSlug) {
  return getPhotoCollection(collectionSlug)?.projects || [];
}

export function getPhotoProject(collectionSlug, projectSlug) {
  return getPhotoProjects(collectionSlug).find((project) => project.slug === projectSlug);
}

export const photoCollectionStats = Object.fromEntries(
  Object.entries(catalogs).map(([slug, catalog]) => [slug, catalog.stats]),
);
