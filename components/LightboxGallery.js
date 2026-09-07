"use client";

import { useEffect, useState } from "react";
import RevealImage from "./RevealImage";
import { mediaUrl } from "@/lib/site";

export default function LightboxGallery({ images, title }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + images.length) % images.length);
    };
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, images.length]);

  return (
    <>
      <div className="photo-grid">
        {images.map((image, index) => (
          <button
            className="photo-button"
            type="button"
            key={image.src}
            onClick={() => setActive(index)}
            aria-label={`放大第 ${index + 1} 張照片`}
          >
            <RevealImage src={image.src} alt={`${title}，作品 ${index + 1}`} eager={index < 2} />
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="照片檢視器">
          <button className="lightbox-close" type="button" onClick={() => setActive(null)} aria-label="關閉">
            CLOSE ×
          </button>
          <button
            className="lightbox-arrow lightbox-prev"
            type="button"
            onClick={() => setActive((active - 1 + images.length) % images.length)}
            aria-label="上一張"
          >
            ←
          </button>
          <img src={mediaUrl(images[active].src)} alt={`${title}，放大作品 ${active + 1}`} />
          <button
            className="lightbox-arrow lightbox-next"
            type="button"
            onClick={() => setActive((active + 1) % images.length)}
            aria-label="下一張"
          >
            →
          </button>
          <span className="lightbox-count">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        </div>
      )}
    </>
  );
}
