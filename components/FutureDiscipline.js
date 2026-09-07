import Link from "next/link";

export default function FutureDiscipline({ eyebrow, title, label, description, className }) {
  return (
    <main className={`future-page ${className}`}>
      <div className="future-stage" aria-hidden="true">
        <i /><i /><i />
      </div>
      <div className="future-page-copy">
        <Link className="back-link" href="/works">← ALL WORKS</Link>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <h2>{label}</h2>
        <p>{description}</p>
        <div className="future-status">
          <span>ARCHIVE</span>
          <b>OPENING SOON</b>
        </div>
      </div>
    </main>
  );
}
