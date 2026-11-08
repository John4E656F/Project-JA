"use client";

import { useRef, useState } from "react";
import { wedding } from "../lib/wedding";

export function MusicController() {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  if (!wedding.musicSrc || failed) return null;
  const toggle = async () => {
    if (!audio.current) return;
    if (playing) {
      audio.current.pause();
      setPlaying(false);
    } else {
      try {
        await audio.current.play();
        setPlaying(true);
      } catch {
        setFailed(true);
      }
    }
  };
  return (
    <>
      <audio
        ref={audio}
        src={wedding.musicSrc}
        loop
        preload="none"
        onError={() => setFailed(true)}
        onEnded={() => setPlaying(false)}
      />
      <button
        className="fixed right-[15px] bottom-[15px] z-30 rounded-full border border-[#c39c9a] bg-burgundy px-4 py-3 text-xs text-white shadow-[0_5px_15px_#2f152555]"
        onClick={toggle}
        aria-label={
          playing ? "Pause background music" : "Play background music"
        }
        aria-pressed={playing}
      >
        {playing ? "♫ Pause" : "♫ Play music"}
      </button>
    </>
  );
}
