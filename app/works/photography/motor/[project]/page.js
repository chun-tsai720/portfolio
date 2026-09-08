import { notFound } from "next/navigation";
import PhotoProject from "@/components/PhotoProject";
import { getPhotoCollection, getPhotoProject, getPhotoProjects } from "@/lib/photoCollections";

export function generateStaticParams() {
  return getPhotoProjects("motor").map((project) => ({ project: project.slug }));
}

export async function generateMetadata({ params }) {
  const project = getPhotoProject("motor", (await params).project);
  return project ? { title: `${project.name} / MOTOR` } : {};
}

export default async function MotorProjectPage({ params }) {
  const project = getPhotoProject("motor", (await params).project);
  if (!project) notFound();
  return <PhotoProject catalog={getPhotoCollection("motor")} project={project} />;
}
