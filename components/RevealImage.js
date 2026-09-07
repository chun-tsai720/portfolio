"use client";

import { useState } from "react";
import { mediaUrl } from "@/lib/site";

export default function RevealImage({ src, alt, eager = false }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`image-reveal${loaded ? " is-loaded" : ""}`}>
      <img
        src={mediaUrl(src)}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
