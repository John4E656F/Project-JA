import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { wedding } from './content';
import './envelope.css';

type Props = { onFinish: () => void };

const random = (min: number, max: number) => min + Math.random() * (max - min);

export function EnvelopeIntro({ onFinish }: Props) {
  const [opening, setOpening] = useState(false);
  const [fallingDetails] = useState(() => Array.from({ length: 16 }, () => ({
    left: `${random(4, 96)}%`,
    top: `${random(-18, 8)}%`,
    drift: random(-65, 65),
    turn: random(-190, 190),
    duration: random(1.35, 1.7),
    delay: random(0, 0.25),
  })));
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!opening || !stage) return;
    const intro = stage.parentElement!;
    const find = (className: string) => stage.querySelector<HTMLElement>(className)!;
    const seal = find('.pin-seal');
    const flap = find('.pin-flap');
    const left = find('.pin-left');
    const right = find('.pin-right');
    const bottom = find('.pin-bottom');
    const inside = find('.pin-inside');
    const letter = find('.pin-letter');
    const prompt = find('.pin-prompt');
    const wash = intro.querySelector<HTMLElement>('.pin-transition-wash')!;
    const details = Array.from(intro.querySelectorAll<HTMLElement>('.pin-falling-detail'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.set(seal, { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, rotation: 0 });
    gsap.set([flap, left, right, bottom], { rotationX: 0, rotationY: 0, opacity: 1 });
    gsap.set(inside, { opacity: 0 });
    gsap.set(letter, { yPercent: 0, scale: 1 });
    gsap.set(wash, { opacity: 0 });
    gsap.set(details, { opacity: 0, y: 0, x: 0, rotation: 0 });
    const letterBounds = letter.getBoundingClientRect();
    const coverScale = Math.max(window.innerWidth / letterBounds.width, window.innerHeight / letterBounds.height) * 1.08;
    const timeline = gsap.timeline({ onComplete: onFinish });
    timeline
      .to(prompt, { opacity: 0, duration: 0.25 }, 0)
      .to(seal, { scale: 0.73, rotation: -10, y: -15, opacity: 0, duration: 0.38, ease: 'power2.inOut' }, 0.06)
      .to(flap, { rotationX: -180, duration: 0.72, ease: 'power3.inOut' }, 0.28)
      .to(inside, { opacity: 1, duration: 0.45 }, 0.45)
      .set(flap, { zIndex: 2 }, 0.98)
      .to(flap, { opacity: 0, duration: 0.12 }, 0.98)
      .to(left, { rotationY: -175, duration: 0.6, ease: 'power2.inOut' }, 1.05)
      .to(right, { rotationY: 175, duration: 0.6, ease: 'power2.inOut' }, 1.05)
      .to(bottom, { rotationX: -175, duration: 0.62, ease: 'power2.inOut' }, 1.68)
      .set(letter, { zIndex: 9 }, 2.3)
      .to(letter, { scale: 1.22, duration: 0.7, ease: 'power2.inOut' }, 2.32)
      .set(stage, { overflow: 'visible' }, 2.98)
      .to(letter, { scale: coverScale, duration: 0.82, ease: 'power2.inOut' }, 3.02)
      .to(wash, { opacity: 1, duration: 0.55, ease: 'sine.inOut' }, 3.18)
      .to(stage, { opacity: 0, duration: 0.4 }, 3.4)
      .to(intro, { backgroundColor: 'rgba(246, 241, 236, 0)', duration: 1, ease: 'sine.inOut' }, 3.83)
      .to(wash, { opacity: 0, duration: 1, ease: 'sine.inOut' }, 3.83);
    details.forEach((detail, index) => {
      const config = fallingDetails[index];
      timeline.to(detail, {
        keyframes: [
          { opacity: 0.62, duration: 0.28 },
          { opacity: 0.45, duration: config.duration - 0.68 },
          { opacity: 0, duration: 0.4 },
        ],
        y: window.innerHeight * 0.86,
        x: config.drift,
        rotation: config.turn,
        ease: 'sine.inOut',
        duration: config.duration,
      }, 3.12 + config.delay);
    });
    if (reduced) timeline.timeScale(1.25);
    return () => {
      timeline.kill();
    };
  }, [fallingDetails, opening, onFinish]);

  return (
    <div className='pin-intro' role='dialog' aria-modal='true' aria-label='Wedding invitation'>
      <div className='pin-stage' ref={stageRef}>
        <div className='pin-inside' aria-hidden='true'>
          <img src='/florals/rose-corner.webp' alt='' />
        </div>
        <button className='pin-envelope' type='button' onClick={() => setOpening(true)} disabled={opening} aria-label='Open the wedding invitation'>
          <span className='pin-base' />
          <span className='pin-letter'>
            <span className='pin-letter-border' />
            <span className='pin-letter-overline'>You're Invited</span>
            <strong>{wedding.shortNames}</strong>
            <span className='pin-letter-rule' />
            <span className='pin-letter-date'>January 1, 2027</span>
          </span>
          <span className='pin-fold pin-left' />
          <span className='pin-fold pin-right' />
          <span className='pin-fold pin-bottom' />
          <span className='pin-fold pin-flap' />
          <span className='pin-seal'>
            <img src='/florals/rose-wax-seal.webp' alt='' />
          </span>
        </button>
        <p className='pin-prompt'>
          Tap the seal to open <span aria-hidden='true'>✦</span>
        </p>
      </div>
      <div className='pin-transition-wash' aria-hidden='true' />
      <div className='pin-falling-details' aria-hidden='true'>
        {fallingDetails.map((detail, index) => (
          <span
            className={`pin-falling-detail ${index % 3 === 0 ? 'pin-falling-flower' : 'pin-falling-petal'}`}
            style={{ left: detail.left, top: detail.top }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
