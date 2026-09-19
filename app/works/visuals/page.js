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
          <p className="eyebrow">A03 / VISUAL SOFTWARE / EXPERIMENTS</p>
          <h1>VISUALS</h1>
          <p className="visuals-hero-description">以不同軟體與程式工具探索生成、互動、時間與視覺；P5.js 是目前公開的第一個作品分類。</p>
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
        </div>
      </section>

      <ProjectNavigator backHref="/works" backLabel="ALL PROJECTS" />
    </main>
  );
}
