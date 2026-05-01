"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  initials: string;
}

export function TeamPortrait({ src, alt, initials }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/5] w-full mb-5 overflow-hidden rounded-2xl bg-black/[0.04]">
      <span
        className="absolute inset-0 flex items-center justify-center font-serif text-black/30 select-none"
        style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}
        aria-hidden="true"
      >
        {initials}
      </span>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
