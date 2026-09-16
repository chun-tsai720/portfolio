import Link from "next/link";
import RevealImage from "@/components/RevealImage";
import ProjectNavigator from "@/components/ProjectNavigator";
import { formatCount } from "@/lib/catalog";

export default function PhotoCollectionIndex({
  catalog,
  basePath = `/works/photography/${catalog.slug}`,
  eyebrow = `WORKS / PHOTOGRAPHY / ${catalog.name}`,
  itemLabel = "SERIES",
  className = "",
  backHref = "/works/photography",
  backLabel = "PHOTOGRAPHY",
}) {

  return (
    <main className={`index-page ${className}`.trim()}>
      <Link className="back-link index-back-link" href={backHref}>← BACK TO {backLabel}</Link>
      <header className="page-title">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{catalog.name}</h1>
        <p>{catalog.stats.projectCount} 個主題，{formatCount(catalog.stats.sourceImageCount)} 張最底層作品。</p>
      </header>
      <div className="band-list">
        {catalog.projects.map((project, index) => (
          <Link className="band-row" href={`${basePath}/${project.slug}`} key={project.slug}>
            <span className="band-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="band-thumb">
              {project.cover && <RevealImage src={project.cover} alt="" />}
            </div>
            <h2>{project.name}</h2>
            <p>{project.series.length} {itemLabel}</p>
            <p>{formatCount(project.sourceImageCount)} FRAMES</p>
            <span className="row-arrow">↗</span>
          </Link>
        ))}
      </div>
      <ProjectNavigator backHref={backHref} backLabel={backLabel} />
    </main>
  );
}
