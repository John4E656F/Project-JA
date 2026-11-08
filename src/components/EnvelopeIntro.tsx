import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { wedding } from "../lib/wedding";

type Props = { onFinish: () => void };

const random = (min: number, max: number) => min + Math.random() * (max - min);

export function EnvelopeIntro({ onFinish }: Props) {
  const [opening, setOpening] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!opening || !stage) return;
    const intro = stage.parentElement!;
    const find = (className: string) =>
      stage.querySelector<HTMLElement>(className)!;
    const seal = find(".pin-seal");
    const flap = find(".pin-flap");
    const left = find(".pin-left");
    const right = find(".pin-right");
    const bottom = find(".pin-bottom");
    const inside = find(".pin-inside");
    const letter = find(".pin-letter");
    const prompt = find(".pin-prompt");
    const wash = intro.querySelector<HTMLElement>(".pin-transition-wash")!;
    const details = Array.from(
      intro.querySelectorAll<HTMLElement>(".pin-falling-detail"),
    );
    const fallingDetails = details.map((detail) => {
      gsap.set(detail, {
        left: `${random(4, 96)}%`,
        top: `${random(-18, 8)}%`,
      });
      return {
        drift: random(-65, 65),
        turn: random(-190, 190),
        duration: random(1.35, 1.7),
        delay: random(0, 0.25),
      };
    });
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.set(seal, {
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
      scale: 1,
      rotation: 0,
    });
    gsap.set([flap, left, right, bottom], {
      rotationX: 0,
      rotationY: 0,
      opacity: 1,
      transformPerspective: 1400,
    });
    gsap.set(inside, { opacity: 0 });
    gsap.set(letter, { yPercent: 0, scale: 1 });
    gsap.set(wash, { opacity: 0 });
    gsap.set(details, { opacity: 0, y: 0, x: 0, rotation: 0 });
    const letterBounds = letter.getBoundingClientRect();
    const coverScale =
      Math.max(
        window.innerWidth / letterBounds.width,
        window.innerHeight / letterBounds.height,
      ) * 1.08;
    const timeline = gsap.timeline({ onComplete: onFinish });
    timeline
      .to(prompt, { opacity: 0, duration: 0.25 }, 0)
      .to(
        seal,
        {
          scale: 0.73,
          rotation: -10,
          y: -15,
          opacity: 0,
          duration: 0.38,
          ease: "power2.inOut",
        },
        0.06,
      )
      .set(stage, { overflow: "visible" }, 0.25)
      .to(flap, { rotationX: -168, duration: 0.88, ease: "power2.inOut" }, 0.32)
      .to(inside, { opacity: 1, duration: 0.5 }, 0.55)
      .set(flap, { zIndex: 2 }, 1.2)
      .to(left, { rotationY: -168, duration: 0.75, ease: "power2.inOut" }, 1.23)
      .to(right, { rotationY: 168, duration: 0.75, ease: "power2.inOut" }, 1.23)
      .to(
        bottom,
        { rotationX: -168, duration: 0.72, ease: "power2.inOut" },
        2.02,
      )
      .set(letter, { zIndex: 9 }, 2.74)
      .to(
        letter,
        { scale: 1.22, y: -12, duration: 0.72, ease: "power2.inOut" },
        2.76,
      )
      .to(
        letter,
        { scale: coverScale, duration: 0.85, ease: "power2.inOut" },
        3.48,
      )
      .to(wash, { opacity: 1, duration: 0.55, ease: "sine.inOut" }, 3.65)
      .to(stage, { opacity: 0, duration: 0.4 }, 3.88)
      .to(
        intro,
        {
          backgroundColor: "rgba(246, 241, 236, 0)",
          duration: 1,
          ease: "sine.inOut",
        },
        4.28,
      )
      .to(wash, { opacity: 0, duration: 1, ease: "sine.inOut" }, 4.28);
    details.forEach((detail, index) => {
      const config = fallingDetails[index];
      timeline.to(
        detail,
        {
          keyframes: [
            { opacity: 0.62, duration: 0.28 },
            { opacity: 0.45, duration: config.duration - 0.68 },
            { opacity: 0, duration: 0.4 },
          ],
          y: window.innerHeight * 0.86,
          x: config.drift,
          rotation: config.turn,
          ease: "sine.inOut",
          duration: config.duration,
        },
        3.62 + config.delay,
      );
    });
    if (reduced) timeline.timeScale(1.25);
    return () => {
      timeline.kill();
    };
  }, [opening, onFinish]);

  return (
    <div
      className="pin-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation"
    >
      <div className="pin-stage" ref={stageRef}>
        <button
          className="pin-envelope"
          type="button"
          onClick={() => setOpening(true)}
          disabled={opening}
          aria-label="Open the wedding invitation"
        >
          <span className="pin-base" />
          <span className="pin-inside" />
          <span className="pin-letter">
            <span className="pin-letter-border" />
            <span className="pin-letter-overline">You're Invited</span>
            <strong>{wedding.shortNames}</strong>
            <span className="pin-letter-rule" />
            <span className="pin-letter-date">January 1, 2027</span>
          </span>
          <span className="pin-fold pin-left">
            <span className="pin-fold-front" />
            <span className="pin-fold-back" />
          </span>
          <span className="pin-fold pin-right">
            <span className="pin-fold-front" />
            <span className="pin-fold-back" />
          </span>
          <span className="pin-fold pin-bottom">
            <span className="pin-fold-front" />
            <span className="pin-fold-back" />
          </span>
          <span className="pin-fold pin-flap">
            <span className="pin-fold-front" />
            <span className="pin-fold-back" />
          </span>
          <span className="pin-seal">
            <img src="/florals/rose-wax-seal.webp" alt="" />
          </span>
        </button>
        <p className="pin-prompt">
          Tap the seal to open <span aria-hidden="true">✦</span>
        </p>
      </div>
      <div className="pin-transition-wash" aria-hidden="true" />
      <div className="pin-falling-details" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => (
          <span
            className={`pin-falling-detail ${index % 3 === 0 ? "pin-falling-flower" : "pin-falling-petal"}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
