import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectNavigator from "@/components/ProjectNavigator";
import { getP5Work, p5Works } from "@/lib/p5works";

export function generateStaticParams() {
  return p5Works.map((work) => ({ project: work.slug }));
}

export async function generateMetadata({ params }) {
  const work = getP5Work((await params).project);
  return work ? { title: `${work.title} / P5.js` } : {};
}

export default async function P5ProjectPage({ params }) {
  const work = getP5Work((await params).project);
  if (!work) notFound();

  const index = p5Works.findIndex((item) => item.slug === work.slug);
  const previous = p5Works[(index - 1 + p5Works.length) % p5Works.length];
  const next = p5Works[(index + 1) % p5Works.length];

  return (
    <main className="p5-project-page">
      <header className="p5-project-heading">
        <Link className="back-link" href="/works/visuals/p5js">← P5.JS INDEX</Link>
        <p className="eyebrow">P5.JS / {work.label}</p>
        <h1>{work.title}</h1>
        <div className="p5-project-meta">
          <p>{work.description}</p>
          <dl>
            <div><dt>DATE</dt><dd>{work.date}</dd></div>
            <div><dt>MEDIUM</dt><dd>JAVASCRIPT / P5.JS</dd></div>
          </dl>
        </div>
      </header>

      <section className="p5-stage" aria-label={`${work.title} 互動畫布`}>
        <iframe
          src={work.src}
          title={`${work.title} p5.js 互動作品`}
          sandbox="allow-scripts"
        />
        <p>{work.instruction}</p>
      </section>

      <nav className="p5-pagination" aria-label="P5.js 作品導覽">
        <Link href={`/works/visuals/p5js/${previous.slug}`}>← {previous.title}</Link>
        <Link href="/works/visuals/p5js">ALL SKETCHES</Link>
        <Link href={`/works/visuals/p5js/${next.slug}`}>{next.title} →</Link>
      </nav>

      <ProjectNavigator backHref="/works/visuals/p5js" backLabel="P5.JS INDEX" />
    </main>
  );
}
