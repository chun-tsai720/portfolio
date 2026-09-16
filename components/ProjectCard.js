import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project, featured = false }) {
  return (
    <Link
      className={`project-card ${featured ? "is-featured" : ""} project-${project.slug}`}
      href={project.href}
    >
      <div className="project-card-visual">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} 專案視覺`}
            fill
            sizes={featured ? "(max-width: 800px) 100vw, 66vw" : "(max-width: 800px) 100vw, 50vw"}
          />
        ) : (
          <div className={`system-visual system-${project.visual}`} aria-hidden="true">
            <span>{project.visual === "api" ? "REQUEST" : "AI HOST"}</span>
            <i />
            <strong>{project.visual === "api" ? "API" : "MCP"}</strong>
            <i />
            <span>{project.visual === "api" ? "DATABASE" : "TOOLS"}</span>
          </div>
        )}
      </div>
      <div className="project-card-copy">
        <span>{project.number}</span>
        <p>{project.status}</p>
        <h2>{project.title}</h2>
        <h3>{project.subtitle}</h3>
        <small>{project.description}</small>
        <div className="tag-list">
          {project.tags.map((tag) => <b key={tag}>{tag}</b>)}
        </div>
        <em>VIEW CASE STUDY ↗</em>
      </div>
    </Link>
  );
}
