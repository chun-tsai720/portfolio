import Link from "next/link";
import DisciplineGrid from "@/components/DisciplineGrid";
import RevealImage from "@/components/RevealImage";
import { catalogStats, formatCount, getBands } from "@/lib/catalog";
import { photoCollectionStats } from "@/lib/photoCollections";
import { mediaUrl, ROCK_ARCHIVE_PATH } from "@/lib/site";

export default function HomePage() {
  const bands = getBands();
  const featured = bands.filter((band) => band.cover).slice(0, 6);
  const hero = featured[0]?.cover;
  const photographyFrameCount = catalogStats.sourceImageCount
    + photoCollectionStats.motor.sourceImageCount
    + photoCollectionStats.portrait.sourceImageCount;

  return (
    <main>
      <section className="hero">
        {hero && <img className="hero-image" src={mediaUrl(hero)} alt="蔡濬守視覺創作作品集" />}
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">PHOTOGRAPHY / GENERATIVE ART / LIVE VISUALS</p>
          <h1>LIGHT<br />IN MOTION.</h1>
          <div className="hero-foot">
            <p>從真實光線到生成視界，<br />讓每一種媒介成為觀看的方法。</p>
            <Link className="round-link" href="/works" aria-label="瀏覽所有作品">VIEW<br />WORKS ↗</Link>
          </div>
        </div>
        <span className="scroll-note">SCROLL TO EXPLORE ↓</span>
      </section>

      <section className="home-intro" id="about">
        <p className="section-number">01 / ABOUT</p>
        <div>
          <h2>我在真實與虛擬之間，<br />尋找影像發生的瞬間。</h2>
          <p className="body-copy">蔡濬守，台灣視覺創作者。從現場音樂攝影出發，創作將延伸至 Midjourney 生成影像與 VJ 即時視覺，探索光、聲音與動態之間的關係。</p>
        </div>
        <dl className="stats">
          <div><dt>03</dt><dd>DISCIPLINES</dd></div>
          <div><dt>{catalogStats.bandCount}</dt><dd>ROCK BANDS</dd></div>
          <div><dt>{formatCount(photographyFrameCount)}</dt><dd>PHOTO FRAMES</dd></div>
        </dl>
      </section>

      <section className="discipline-section">
        <div className="section-heading">
          <p className="section-number">02 / DISCIPLINES</p>
          <h2>SELECT<br />A MEDIUM</h2>
        </div>
        <DisciplineGrid photographyCover={hero} />
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <p className="section-number">03 / PHOTOGRAPHY</p>
          <h2>ROCK<br />SELECTED</h2>
        </div>
        <div className="featured-grid">
          {featured.map((band, index) => (
            <Link className="featured-card" href={`${ROCK_ARCHIVE_PATH}/${band.slug}`} key={band.slug}>
              <RevealImage src={band.cover} alt={`${band.name} 現場攝影`} />
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{band.name}</h3>
                <p>{band.events.length} SESSIONS / {formatCount(band.sourceImageCount)} FRAMES</p>
              </div>
            </Link>
          ))}
        </div>
        <Link className="text-link" href={ROCK_ARCHIVE_PATH}>ALL BANDS — {String(bands.length).padStart(2, "0")} ↗</Link>
      </section>
    </main>
  );
}
