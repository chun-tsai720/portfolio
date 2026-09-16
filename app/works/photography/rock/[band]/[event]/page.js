import Link from "next/link";
import { notFound } from "next/navigation";
import LightboxGallery from "@/components/LightboxGallery";
import ProjectNavigator from "@/components/ProjectNavigator";
import { formatCount, getBand, getBands, getEvent } from "@/lib/catalog";
import { ROCK_ARCHIVE_PATH } from "@/lib/site";

export function generateStaticParams() {
  return getBands().flatMap((band) =>
    band.events.map((event) => ({ band: band.slug, event: event.slug })),
  );
}

export async function generateMetadata({ params }) {
  const { band: bandSlug, event: eventSlug } = await params;
  const band = getBand(bandSlug);
  const event = getEvent(bandSlug, eventSlug);
  return band && event ? { title: `${event.name} / ${band.name}` } : {};
}

export default async function EventPage({ params }) {
  const { band: bandSlug, event: eventSlug } = await params;
  const band = getBand(bandSlug);
  const event = getEvent(bandSlug, eventSlug);
  if (!band || !event) notFound();

  const bandPath = `${ROCK_ARCHIVE_PATH}/${band.slug}`;
  return (
    <main className="event-page">
      <header className="event-heading">
        <Link className="back-link" href={bandPath}>← BACK TO {band.name}</Link>
        <p className="eyebrow">PHOTOGRAPHY / {event.date || "LIVE SESSION"}</p>
        <h1>{event.name}</h1>
        <div className="event-meta">
          <p>{band.name}</p>
          <p>{formatCount(event.sourceImageCount)} ARCHIVED FRAMES</p>
          <p>{event.series.length} SERIES</p>
        </div>
      </header>
      <div className="series-list">
        {event.series.map((series, index) => (
          <section className="series" key={series.slug}>
            <header className="series-heading">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{series.name}</h2>
              <p>{formatCount(series.sourceImageCount)} FRAMES / {series.images.length} DISPLAYED</p>
            </header>
            <LightboxGallery images={series.images} title={`${band.name} — ${event.name} — ${series.name}`} />
          </section>
        ))}
      </div>
      <ProjectNavigator backHref={bandPath} backLabel={band.name} />
    </main>
  );
}
