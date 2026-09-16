import Link from "next/link";
import RevealImage from "@/components/RevealImage";
import ProjectNavigator from "@/components/ProjectNavigator";
import { formatCount, getBands } from "@/lib/catalog";
import { ROCK_ARCHIVE_PATH } from "@/lib/site";

export const metadata = { title: "ROCK 樂團攝影索引" };

export default function RockArchivePage() {
  const bands = getBands();

  return (
    <main className="index-page">
      <Link className="back-link index-back-link" href="/works/photography">← BACK TO PHOTOGRAPHY</Link>
      <header className="page-title">
        <p className="eyebrow">WORKS / PHOTOGRAPHY / ROCK</p>
        <h1>ROCK<br />ARCHIVE</h1>
        <p>{bands.length} 組樂團，依英文字母與名稱排列。</p>
      </header>
      <div className="band-list">
        {bands.map((band, index) => (
          <Link className="band-row" href={`${ROCK_ARCHIVE_PATH}/${band.slug}`} key={band.slug}>
            <span className="band-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="band-thumb">
              {band.cover && <RevealImage src={band.cover} alt="" />}
            </div>
            <h2>{band.name}</h2>
            <p>{band.events.length} SESSIONS</p>
            <p>{formatCount(band.sourceImageCount)} FRAMES</p>
            <span className="row-arrow">↗</span>
          </Link>
        ))}
      </div>
      <ProjectNavigator backHref="/works/photography" backLabel="PHOTOGRAPHY" />
    </main>
  );
}
