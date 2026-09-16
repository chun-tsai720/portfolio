import Link from "next/link";
import ProjectNavigator from "@/components/ProjectNavigator";
import { catalogStats, formatCount, getBands } from "@/lib/catalog";
import { getPhotoCollection } from "@/lib/photoCollections";
import { mediaUrl, ROCK_ARCHIVE_PATH } from "@/lib/site";

export const metadata = { title: "攝影作品" };

export default function PhotographyPage() {
  const cover = getBands().find((band) => band.cover)?.cover;
  const motor = getPhotoCollection("motor");
  const portrait = getPhotoCollection("portrait");

  return (
    <main className="photography-page">
      <section className="discipline-hero">
        {cover && <img src={mediaUrl(cover)} alt="現場音樂攝影" />}
        <div className="hero-shade" />
        <div className="discipline-hero-copy">
          <Link className="back-link" href="/works">← ALL WORKS</Link>
          <p className="eyebrow">A01 / VISUAL ARCHIVE / PHOTOGRAPHY</p>
          <h1>REAL<br />LIGHT.</h1>
          <p>我透過觀景窗捕捉光影的輪廓，保存人物、聲音與現場共同發生的瞬間。</p>
        </div>
      </section>

      <section className="collection-section">
        <p className="section-number">COLLECTIONS</p>
        <div className="collection-stack">
          <Link className="collection-card" href={ROCK_ARCHIVE_PATH}>
            <div>
              <p>01 / LIVE MUSIC PHOTOGRAPHY</p>
              <h2>ROCK<br />ARCHIVE</h2>
            </div>
            <dl>
              <div><dt>{catalogStats.bandCount}</dt><dd>BANDS</dd></div>
              <div><dt>{catalogStats.eventCount}</dt><dd>SESSIONS</dd></div>
              <div><dt>{formatCount(catalogStats.sourceImageCount)}</dt><dd>FRAMES</dd></div>
            </dl>
            <span>ENTER ARCHIVE ↗</span>
          </Link>
          <Link className="collection-card is-paper" href="/works/photography/motor">
            <div>
              <p>02 / AUTOMOTIVE PHOTOGRAPHY</p>
              <h2>MOTOR</h2>
            </div>
            <dl>
              <div><dt>{motor.stats.projectCount}</dt><dd>PROJECTS</dd></div>
              <div><dt>{motor.stats.seriesCount}</dt><dd>SERIES</dd></div>
              <div><dt>{formatCount(motor.stats.sourceImageCount)}</dt><dd>FRAMES</dd></div>
            </dl>
            <span>ENTER COLLECTION ↗</span>
          </Link>
          <Link className="collection-card is-outline" href="/works/photography/portrait">
            <div>
              <p>03 / PORTRAIT PHOTOGRAPHY</p>
              <h2>PORTRAIT</h2>
            </div>
            <dl>
              <div><dt>{portrait.stats.projectCount}</dt><dd>PROJECTS</dd></div>
              <div><dt>{portrait.stats.seriesCount}</dt><dd>SERIES</dd></div>
              <div><dt>{formatCount(portrait.stats.sourceImageCount)}</dt><dd>FRAMES</dd></div>
            </dl>
            <span>ENTER COLLECTION ↗</span>
          </Link>
        </div>
      </section>
      <ProjectNavigator backHref="/works" backLabel="ALL PROJECTS" />
    </main>
  );
}
