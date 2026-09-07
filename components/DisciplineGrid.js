import Link from "next/link";
import RevealImage from "@/components/RevealImage";
import { disciplines } from "@/lib/site";

export default function DisciplineGrid({ photographyCover }) {
  return (
    <div className="discipline-grid">
      {disciplines.map((item) => (
        <Link className={`discipline-card discipline-${item.slug}`} href={item.href} key={item.slug}>
          <div className="discipline-visual">
            {item.slug === "photography" && photographyCover && (
              <RevealImage src={photographyCover} alt="攝影作品分類" />
            )}
            {item.slug !== "photography" && <div className="future-visual" aria-hidden="true" />}
          </div>
          <div className="discipline-copy">
            <span>{item.number}</span>
            <p>{item.label}</p>
            <h2>{item.title}</h2>
            <small>{item.description}</small>
            <b>{item.status} ↗</b>
          </div>
        </Link>
      ))}
    </div>
  );
}
