import catalog from "@/src/data/midjourney-catalog.json";

export function getMidjourneyCatalog() {
  return catalog;
}

export function getMidjourneyProjects() {
  return catalog.projects;
}

export function getMidjourneyProject(projectSlug) {
  return catalog.projects.find((project) => project.slug === projectSlug);
}
