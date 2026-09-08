import Link from "next/link";
import RevealImage from "@/components/RevealImage";
import { formatCount } from "@/lib/catalog";

export default function PhotoCollectionIndex({ catalog }) {
  const basePath = `/works/photography/${catalog.slug}`;

  return (
    <main className="index-page">
      <header className="page-title">
        <p className="eyebrow">WORKS / PHOTOGRAPHY / {catalog.name}</p>
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
            <p>{project.series.length} SERIES</p>
            <p>{formatCount(project.sourceImageCount)} FRAMES</p>
            <span className="row-arrow">↗</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
