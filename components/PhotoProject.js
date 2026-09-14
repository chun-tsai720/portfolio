import Link from "next/link";
import LightboxGallery from "@/components/LightboxGallery";
import { formatCount } from "@/lib/catalog";

export default function PhotoProject({
  catalog,
  project,
  basePath = `/works/photography/${catalog.slug}`,
  eyebrow = `PHOTOGRAPHY / ${catalog.name}`,
  className = "",
}) {

  return (
    <main className={`event-page ${className}`.trim()}>
      <header className="event-heading">
        <Link className="back-link" href={basePath}>← {catalog.name}</Link>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{project.name}</h1>
        <div className="event-meta">
          <p>{catalog.label}</p>
          <p>{formatCount(project.sourceImageCount)} ARCHIVED FRAMES</p>
          <p>{project.series.length} SERIES</p>
        </div>
      </header>
      <div className="series-list">
        {project.series.map((series, index) => (
          <section className="series" key={series.slug}>
            <header className="series-heading">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{series.name}</h2>
              <p>{series.images.length} FRAMES / {series.images.length} DISPLAYED</p>
            </header>
            <LightboxGallery images={series.images} title={`${catalog.name} — ${project.name} — ${series.name}`} />
          </section>
        ))}
      </div>
    </main>
  );
}
