import { notFound } from "next/navigation";
import PhotoProject from "@/components/PhotoProject";
import {
  getMidjourneyCatalog,
  getMidjourneyProject,
  getMidjourneyProjects,
} from "@/lib/midjourney";

export function generateStaticParams() {
  return getMidjourneyProjects().map((project) => ({ project: project.slug }));
}

export async function generateMetadata({ params }) {
  const project = getMidjourneyProject((await params).project);
  return project ? { title: `${project.name} / MIDJOURNEY` } : {};
}

export default async function MidjourneyProjectPage({ params }) {
  const project = getMidjourneyProject((await params).project);
  if (!project) notFound();

  return (
    <PhotoProject
      catalog={getMidjourneyCatalog()}
      project={project}
      basePath="/works/midjourney"
      eyebrow="GENERATIVE ART / MIDJOURNEY"
      className="midjourney-project"
    />
  );
}
