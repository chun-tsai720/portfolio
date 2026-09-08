import { notFound } from "next/navigation";
import PhotoProject from "@/components/PhotoProject";
import { getPhotoCollection, getPhotoProject, getPhotoProjects } from "@/lib/photoCollections";

export function generateStaticParams() {
  return getPhotoProjects("portrait").map((project) => ({ project: project.slug }));
}

export async function generateMetadata({ params }) {
  const project = getPhotoProject("portrait", (await params).project);
  return project ? { title: `${project.name} / PORTRAIT` } : {};
}

export default async function PortraitProjectPage({ params }) {
  const project = getPhotoProject("portrait", (await params).project);
  if (!project) notFound();
  return <PhotoProject catalog={getPhotoCollection("portrait")} project={project} />;
}
