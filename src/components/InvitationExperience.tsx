"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { EnvelopeIntro } from "./EnvelopeIntro";
import { FallingFlorals } from "./FallingFlorals";
import { FloralOverlay } from "./FloralOverlay";
import { MusicController } from "./MusicController";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function InvitationExperience({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const finishOpening = useCallback(() => setOpened(true), []);
  useReveal();
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);
  return (
    <>
      {!opened && <EnvelopeIntro onFinish={finishOpening} />}
      <main
        className="relative overflow-x-clip"
        aria-hidden={!opened}
        inert={!opened}
      >
        {children}
        <FloralOverlay />
      </main>
      {opened && <FallingFlorals />}
      {opened && <MusicController />}
    </>
  );
}
