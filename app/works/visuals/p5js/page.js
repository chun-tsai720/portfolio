import Link from "next/link";
import ProjectNavigator from "@/components/ProjectNavigator";
import { p5Works } from "@/lib/p5works";

export const metadata = {
  title: "P5.js 動態視覺",
};

export default function P5IndexPage() {
  return (
    <main className="p5-index-page">
      <header className="p5-index-hero">
        <Link className="back-link" href="/works/visuals">← VISUALS</Link>
        <p className="eyebrow">A03.1 / VISUALS / CREATIVE CODING</p>
        <h1>P5.JS</h1>
        <div>
          <span>{String(p5Works.length).padStart(2, "0")} / SKETCHES</span>
        </div>
      </header>

      <section className="p5-work-grid" aria-label="P5.js 作品列表">
        {p5Works.map((work) => (
          <article className="p5-work-card" key={work.slug}>
            <div className="p5-work-preview" aria-hidden="true">
              <iframe
                src={work.src}
                title={`${work.title} 動畫預覽`}
                loading="lazy"
                sandbox="allow-scripts"
                tabIndex={-1}
              />
            </div>
            <div className="p5-work-card-copy">
              <span>{work.number}</span>
              <p>{work.date} / {work.label}</p>
              <h2>{work.title}</h2>
              <b>OPEN SKETCH ↗</b>
            </div>
            <Link href={`/works/visuals/p5js/${work.slug}`} aria-label={`開啟 ${work.title}`} />
          </article>
        ))}
      </section>

      <ProjectNavigator backHref="/works/visuals" backLabel="VISUALS" />
    </main>
  );
}
