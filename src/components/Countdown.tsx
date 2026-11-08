"use client";

import { useEffect, useState } from "react";
import { wedding } from "../lib/wedding";
import { SectionHeading } from "./SectionHeading";

const targetTime = new Date(wedding.startISO).getTime();

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const secondsLeft =
    now === null ? null : Math.max(0, Math.floor((targetTime - now) / 1000));
  const units = [
    {
      label: "Days",
      value: secondsLeft === null ? null : Math.floor(secondsLeft / 86400),
    },
    {
      label: "Hours",
      value: secondsLeft === null ? null : Math.floor(secondsLeft / 3600) % 24,
    },
    {
      label: "Minutes",
      value: secondsLeft === null ? null : Math.floor(secondsLeft / 60) % 60,
    },
    { label: "Seconds", value: secondsLeft === null ? null : secondsLeft % 60 },
  ];

  return (
    <section className="relative bg-burgundy px-[22px] py-[78px] text-center text-cream sm:py-[100px]">
      <SectionHeading
        overline="January 1, 2027"
        title="Counting Down to Our Forever"
        inverse
      />
      {secondsLeft === 0 ? (
        <p className="font-display text-[2.4rem]">
          Today's the Day! We're Getting Married!
        </p>
      ) : (
        <div
          className="reveal mx-auto grid max-w-[600px] grid-cols-4 border-y border-[#b98993] py-6"
          role="timer"
          aria-label="Time until the wedding"
        >
          {units.map((unit, index) => (
            <div
              className={index > 0 ? "border-l border-[#a66a79]" : ""}
              key={unit.label}
            >
              <strong className="font-display block text-[clamp(2.2rem,7vw,4.4rem)] leading-none font-normal">
                {unit.value === null
                  ? "--"
                  : String(unit.value).padStart(2, "0")}
              </strong>
              <span className="mt-2.5 block text-[0.52rem] tracking-[0.1em] text-[#e5c8c0] uppercase sm:text-[0.6rem] sm:tracking-[0.2em]">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
      <p className="mt-7 text-[0.78rem] tracking-[0.04em] text-[#e5c8c0]">
        January 1, 2027 · 9:00 AM Philippine Standard Time
      </p>
    </section>
  );
}
