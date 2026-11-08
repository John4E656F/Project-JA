"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "../lib/wedding";
import { SectionHeading } from "./SectionHeading";

export function Gallery() {
  const photos = wedding.photos;
  const [active, setActive] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (active === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight")
        setActive((current) =>
          current === null ? null : (current + 1) % photos.length,
        );
      if (event.key === "ArrowLeft")
        setActive((current) =>
          current === null
            ? null
            : (current - 1 + photos.length) % photos.length,
        );
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, photos.length]);

  if (photos.length === 0) return null;

  return (
    <section className="bg-[#f7eee8] px-[22px] py-[78px] sm:py-[100px]">
      <SectionHeading
        overline="John Mark & Ailyn Grace"
        title="Our Precious Moments"
      />
      <div className="reveal mx-auto grid max-w-[850px] grid-cols-2 gap-4">
        {photos.map((photo, index) => (
          <button
            className="aspect-[4/5] overflow-hidden bg-[#e9d4cc] p-0 [&:nth-child(3n)]:col-span-2 [&:nth-child(3n)]:aspect-video"
            key={photo.src}
            onClick={() => setActive(index)}
            aria-label={`Open photo ${index + 1} of ${photos.length}: ${photo.alt}`}
          >
            <img
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#20131def] p-[35px_50px]"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onClick={() => setActive(null)}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const delta = event.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 50)
              setActive(
                (active + (delta < 0 ? 1 : photos.length - 1)) % photos.length,
              );
            touchStartX.current = null;
          }}
        >
          <button
            className="absolute top-2.5 right-5 min-h-12 min-w-12 bg-transparent text-5xl text-white"
            onClick={() => setActive(null)}
            aria-label="Close gallery"
          >
            ×
          </button>
          <button
            className="absolute left-1 min-h-12 min-w-12 bg-transparent text-5xl text-white"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active - 1 + photos.length) % photos.length);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <figure
            className="m-0 max-h-full max-w-full text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              className="block max-h-[82vh] max-w-full object-contain"
              src={photos[active].src}
              alt={photos[active].alt}
            />
            <figcaption className="mt-2.5 text-xs text-white">
              {active + 1} / {photos.length}
            </figcaption>
          </figure>
          <button
            className="absolute right-1 min-h-12 min-w-12 bg-transparent text-5xl text-white"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active + 1) % photos.length);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
