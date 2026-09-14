"use client";

import { useCallback, useState } from "react";
import { mediaUrl } from "@/lib/site";

export default function RevealImage({ src, alt, eager = false }) {
  const [loaded, setLoaded] = useState(false);
  const captureLoadedImage = useCallback((image) => {
    if (image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div className={`image-reveal${loaded ? " is-loaded" : ""}`}>
      <img
        ref={captureLoadedImage}
        src={mediaUrl(src)}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
