import Link from "next/link";
import { catalogStats, formatCount, getBands } from "@/lib/catalog";
import { mediaUrl, ROCK_ARCHIVE_PATH } from "@/lib/site";

export const metadata = { title: "攝影作品" };

export default function PhotographyPage() {
  const cover = getBands().find((band) => band.cover)?.cover;

  return (
    <main className="photography-page">
      <section className="discipline-hero">
        {cover && <img src={mediaUrl(cover)} alt="現場音樂攝影" />}
        <div className="hero-shade" />
        <div className="discipline-hero-copy">
          <Link className="back-link" href="/works">← ALL WORKS</Link>
          <p className="eyebrow">01 / PHOTOGRAPHY</p>
          <h1>REAL<br />LIGHT.</h1>
          <p>我透過觀景窗捕捉光影的輪廓，保存人物、聲音與現場共同發生的瞬間。</p>
        </div>
      </section>

      <section className="collection-section">
        <p className="section-number">COLLECTION 01</p>
        <Link className="collection-card" href={ROCK_ARCHIVE_PATH}>
          <div>
            <p>LIVE MUSIC PHOTOGRAPHY</p>
            <h2>ROCK<br />ARCHIVE</h2>
          </div>
          <dl>
            <div><dt>{catalogStats.bandCount}</dt><dd>BANDS</dd></div>
            <div><dt>{catalogStats.eventCount}</dt><dd>SESSIONS</dd></div>
            <div><dt>{formatCount(catalogStats.sourceImageCount)}</dt><dd>FRAMES</dd></div>
          </dl>
          <span>ENTER ARCHIVE ↗</span>
        </Link>
      </section>
    </main>
  );
}
