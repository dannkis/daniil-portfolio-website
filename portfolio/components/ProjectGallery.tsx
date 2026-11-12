"use client";

import { useState } from "react";
import type { ImageRef } from "@/types/content";

export default function ProjectGallery({
  images,
  name,
}: {
  images: readonly ImageRef[];
  name: string;
}) {
  const [index, setIndex] = useState(0);

  return (
    <section aria-label={`${name} screenshots`} className="min-w-0">
      <div
        className="overflow-hidden rounded-2xl border border-foreground/15 bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        tabIndex={0}
        aria-label={`Screenshot ${index + 1} of ${images.length}. Use left and right arrow keys to browse.`}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          setIndex(
            (current) =>
              (current +
                (event.key === "ArrowRight" ? 1 : -1) +
                images.length) %
              images.length,
          );
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index].src}
          alt={images[index].alt}
          width={1600}
          height={1040}
          className="h-auto w-full"
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-5">
        <div className="flex min-w-0 gap-3">
          {images.map((image, slide) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(slide)}
              aria-label={`Show ${name} screenshot ${slide + 1}`}
              aria-pressed={slide === index}
              className={`w-20 min-w-0 overflow-hidden rounded-lg border-2 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-28 ${slide === index ? "border-accent opacity-100" : "border-transparent opacity-55 hover:opacity-100"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt=""
                width={160}
                height={104}
                className="h-auto w-full"
                loading="lazy"
              />
            </button>
          ))}
        </div>
        <span className="shrink-0 text-xs text-muted" aria-live="polite">
          {index + 1} / {images.length}
        </span>
      </div>
      <p className="mt-3 text-xs font-normal text-muted">
        Actual app screens, framed for this portfolio. Development builds may
        differ from available releases.
      </p>
    </section>
  );
}
