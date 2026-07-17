"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** fallback gradient shown before/if the photo fails */
  gradient?: string;
  priority?: boolean;
  /** cinematic settle: image eases from a slight zoom to rest on load */
  settle?: boolean;
};

const DEFAULT_GRADIENT =
  "linear-gradient(135deg, #1a1a1e 0%, #2a2622 45%, #3a3128 100%)";

/**
 * Resilient luxury image: gradient underlay, soft fade-in on decode,
 * graceful hide on error, optional cinematic settle. Lazy by default.
 */
export default function LuxuryImage({
  src,
  alt,
  className,
  imgClassName,
  gradient = DEFAULT_GRADIENT,
  priority = false,
  settle = true,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={"relative overflow-hidden " + (className ?? "")}
      style={{ background: gradient }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={
          "absolute inset-0 h-full w-full object-cover transition-[opacity,transform,filter] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] " +
          (loaded && !failed
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-md " + (settle ? "scale-[1.12]" : "scale-100")) +
          " " +
          (imgClassName ?? "")
        }
      />
      {/* subtle inner shadow for depth */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.35)]" />
    </div>
  );
}
