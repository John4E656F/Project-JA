import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './falling-florals.css';

const COUNT = 18;
const random = (min: number, max: number) => min + Math.random() * (max - min);

export function FallingFlorals() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const pieces = Array.from(layer.children) as HTMLElement[];
    const animations: Array<gsap.core.Animation | undefined> = new Array(pieces.length);
    let active = true;

    const schedule = (index: number, delay: number) => {
      animations[index] = gsap.delayedCall(delay, () => fall(index));
    };

    const fall = (index: number) => {
      if (!active) return;
      const piece = pieces[index];
      const flower = index % 3 !== 2;
      const duration = random(7, 11);
      const startingX = random(4, 96) * window.innerWidth / 100;
      const drift = random(-100, 100);
      const turn = random(-220, 220);
      gsap.set(piece, {
        left: startingX,
        top: -32,
        x: 0,
        y: 0,
        rotation: random(-70, 70),
        scale: random(0.72, 1.3),
        opacity: 0,
      });
      animations[index] = gsap.timeline({ onComplete: () => schedule(index, random(1.5, 5.5)) })
        .to(piece, { x: drift, y: window.innerHeight + 65, rotation: turn, duration, ease: 'none' }, 0)
        .to(piece, { opacity: flower ? 0.5 : 0.36, duration: 1.2 }, 0)
        .to(piece, { opacity: 0, duration: 1.5 }, duration - 1.5);
    };

    pieces.forEach((_, index) => schedule(index, random(0.1, 7)));
    return () => {
      active = false;
      animations.forEach(animation => animation?.kill());
    };
  }, []);

  return (
    <div className='falling-florals' ref={layerRef} aria-hidden='true'>
      {Array.from({ length: COUNT }, (_, index) => (
        <span className={`falling-floral ${index % 3 !== 2 ? 'falling-floral-flower' : 'falling-floral-petal'}`} key={index} />
      ))}
    </div>
  );
}
