import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-entry">
      <Link className="home-entry-link" href="/works" aria-label="進入 Chun AI Studio 作品目錄">
        <img
          className="home-entry-image"
          src="/home/chun-ai-studio.jpg"
          alt="Chun AI Studio 立體字標誌"
        />
        <div className="home-entry-shade" />
        <div className="home-entry-copy">
          <p className="eyebrow">PHOTOGRAPHY / GENERATIVE ART / LIVE VISUALS</p>
          <h1>Chun<br />AI Studio</h1>
          <span>ENTER THE DIRECTORY ↗</span>
        </div>
      </Link>
    </main>
  );
}
