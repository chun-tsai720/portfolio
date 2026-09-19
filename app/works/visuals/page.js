import Link from "next/link";
import ProjectNavigator from "@/components/ProjectNavigator";
import { p5Works } from "@/lib/p5works";

export const metadata = {
  title: "Visuals",
  description: "蔡濬守的程式視覺、動態影像與即時視覺實驗。",
};

export default function VisualsPage() {
  const featuredWork = p5Works.at(-1);

  return (
    <main className="visuals-page">
      <section className="visuals-hero">
        <div className="visuals-hero-preview" aria-hidden="true">
          <iframe
            src={featuredWork.src}
            title="Visuals 動態預覽"
            sandbox="allow-scripts"
            tabIndex={-1}
          />
        </div>
        <div className="hero-shade" />
        <div className="visuals-hero-copy">
          <Link className="back-link" href="/works">← ALL WORKS</Link>
          <p className="eyebrow">A03 / VISUAL PRACTICE / MOTION</p>
          <h1>VISUALS</h1>
          <p className="visuals-hero-description">從程式生成、互動動畫到現場影像，探索時間、節奏與觀看方式如何改變視覺。</p>
          <Link className="visuals-p5-link" href="/works/visuals/p5js">
            <span>P5.JS</span>
            <small>{String(p5Works.length).padStart(2, "0")} INTERACTIVE SKETCHES</small>
            <b>↗</b>
          </Link>
        </div>
      </section>

      <section className="collection-section visuals-collections">
        <p className="section-number">COLLECTIONS</p>
        <div className="collection-stack">
          <Link className="collection-card" href="/works/visuals/p5js">
            <div>
              <p>01 / CREATIVE CODING</p>
              <h2>P5.JS</h2>
            </div>
            <dl>
              <div><dt>{String(p5Works.length).padStart(2, "0")}</dt><dd>SKETCHES</dd></div>
              <div><dt>JS</dt><dd>MEDIUM</dd></div>
            </dl>
            <span>ENTER COLLECTION ↗</span>
          </Link>
          <article className="collection-card is-outline is-disabled">
            <div>
              <p>02 / REAL-TIME IMAGE</p>
              <h2>VJ</h2>
            </div>
            <dl>
              <div><dt>—</dt><dd>STATUS</dd></div>
              <div><dt>LIVE</dt><dd>MEDIUM</dd></div>
            </dl>
            <span>IN DEVELOPMENT</span>
          </article>
        </div>
      </section>

      <ProjectNavigator backHref="/works" backLabel="ALL PROJECTS" />
    </main>
  );
}
