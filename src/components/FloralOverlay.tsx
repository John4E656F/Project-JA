"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Flower = { top: number; side: "left" | "right" };

export function FloralOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useLayoutEffect(() => {
    const main = overlayRef.current?.parentElement;
    if (!main) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mainTop = main.getBoundingClientRect().top;
        const markers =
          main.querySelectorAll<HTMLElement>("[data-floral-side]");
        setFlowers(
          Array.from(markers, (marker) => ({
            top: marker.getBoundingClientRect().top - mainTop,
            side: marker.dataset.floralSide as Flower["side"],
          })),
        );
      });
    };

    const observer = new ResizeObserver(measure);
    main
      .querySelectorAll("section, footer")
      .forEach((section) => observer.observe(section));
    window.addEventListener("resize", measure);
    measure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 z-40"
      aria-hidden="true"
    >
      {flowers.map(({ top, side }, index) =>
        side === "right" ? (
          <img
            key={index}
            src="/florals/rose-vertical.png"
            alt=""
            style={{ top }}
            className="absolute right-0 w-[190px] max-w-none -translate-y-1/2 select-none sm:w-[clamp(210px,20vw,280px)]"
          />
        ) : (
          <img
            key={index}
            src="/florals/rose-corner.webp"
            alt=""
            style={{ top }}
            className="absolute -left-[100px] w-[250px] max-w-none -translate-y-1/2 rotate-180 select-none sm:-left-[115px] sm:w-[clamp(280px,34vw,420px)]"
          />
        ),
      )}
    </div>
  );
}
