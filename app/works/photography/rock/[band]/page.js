import Link from "next/link";
import { notFound } from "next/navigation";
import RevealImage from "@/components/RevealImage";
import { formatCount, getBand, getBands } from "@/lib/catalog";
import { mediaUrl, ROCK_ARCHIVE_PATH } from "@/lib/site";

export function generateStaticParams() {
  return getBands().map((band) => ({ band: band.slug }));
}

export async function generateMetadata({ params }) {
  const band = getBand((await params).band);
  return band ? { title: `${band.name} / ROCK`, description: `${band.name} 現場音樂攝影作品。` } : {};
}

export default async function BandPage({ params }) {
  const band = getBand((await params).band);
  if (!band) notFound();

  return (
    <main className="band-page">
      <section className="band-hero">
        {band.cover && <img src={mediaUrl(band.cover)} alt={`${band.name} 現場攝影`} />}
        <div className="hero-shade" />
        <div className="band-hero-copy">
          <Link className="back-link" href={ROCK_ARCHIVE_PATH}>← ROCK ARCHIVE</Link>
          <p className="eyebrow">PHOTOGRAPHY / {String(band.events.length).padStart(2, "0")} SESSIONS</p>
          <h1>{band.name}</h1>
          <p>{formatCount(band.sourceImageCount)} ARCHIVED FRAMES</p>
        </div>
      </section>

      <section className="session-section">
        <div className="section-heading horizontal">
          <p className="section-number">SESSIONS</p>
          <h2>SELECT<br />A NIGHT</h2>
        </div>
        <div className="session-grid">
          {band.events.map((event, index) => (
            <Link className="session-card" href={`${ROCK_ARCHIVE_PATH}/${band.slug}/${event.slug}`} key={event.slug}>
              <RevealImage src={event.cover} alt={`${band.name} — ${event.name}`} />
              <div className="session-card-copy">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{event.date || "LIVE SESSION"}</p>
                <h2>{event.name}</h2>
                <small>{formatCount(event.sourceImageCount)} ARCHIVED FRAMES ↗</small>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
