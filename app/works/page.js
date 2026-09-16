import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects, visualArchives } from "@/lib/site";

export const metadata = {
  title: "代表專案",
  description: "蔡濬守的科技藝術、應用設計、互動網站、後端系統與視覺創作案例。",
};

export default function WorksPage() {
  return (
    <main className="portfolio-index">
      <header className="project-index-hero">
        <p className="eyebrow">SELECTED WORK / CASE STUDIES / ARCHIVE</p>
        <h1>PROJECTS</h1>
        <p>作品依問題與整合方式呈現，而不是把設計、藝術與技術拆成互不相干的分類。</p>
      </header>

      <section className="project-index-section">
        <p className="section-number">FEATURED CASE STUDIES</p>
        <div className="project-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard project={project} featured={index === 0} key={project.slug} />
          ))}
        </div>
      </section>

      <section className="archive-index-section">
        <header>
          <p className="section-number">VISUAL PRACTICE &amp; EXPLORATIONS</p>
          <h2>ARCHIVES</h2>
          <p>這些典藏保留長期創作的深度與數量，也持續成為新型態作品的視覺基礎。</p>
        </header>
        <div className="archive-index-list">
          {visualArchives.map((item) => (
            <Link href={item.href} key={item.number}>
              <span>{item.number}</span>
              <div><p>{item.label}</p><h3>{item.title}</h3></div>
              <small>{item.description}</small>
              <b>↗</b>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
