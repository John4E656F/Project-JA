'use client';

import { useEffect, useRef, useState } from 'react';
import { EnvelopeIntro } from './EnvelopeIntro';
import { FallingFlorals } from './FallingFlorals';
import { wedding } from './content';
import { downloadCalendar, googleCalendarUrl } from './calendar';

function Floral({ className = '' }: { className?: string }) { return <img className={`floral ${className}`} src="/florals/rose-corner.webp" alt="" aria-hidden="true" />; }

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function SectionHeading({ overline, title }: { overline: string; title: string }) { return <div className="section-heading reveal"><span className="eyebrow">{overline}</span><h2>{title}</h2><span className="ornament" aria-hidden="true">✦</span></div>; }

function Hero() { return <section className="hero" id="invitation"><Floral className="hero-floral-left"/><Floral className="hero-floral-right"/><div className="hero-border"><div className="hero-content reveal"><span className="eyebrow">Wedding Ceremony & Reception</span><div className="hero-names"><h2>{wedding.groom}</h2><span className="amp">&</span><h2>{wedding.bride}</h2></div><span className="fine-rule"/><p className="hero-script">We're getting married!</p><p className="hero-message">“{wedding.message}”</p><div className="hero-event"><span>{wedding.date}</span><i aria-hidden="true">✦</i><span>{wedding.time}</span></div><p className="hero-caption">Wedding Ceremony & Reception</p></div></div><div className="scroll-cue">SCROLL TO DISCOVER <span>↓</span></div></section>; }

function Countdown({ initialNow }: { initialNow: number }) {
  const target = new Date(wedding.startISO).getTime();
  const [now, setNow] = useState(initialNow);
  useEffect(() => { setNow(Date.now()); const id = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(id); }, []);
  const left = Math.max(0, Math.floor((target - now) / 1000));
  const units = [{ label: 'Days', value: Math.floor(left / 86400) }, { label: 'Hours', value: Math.floor(left / 3600) % 24 }, { label: 'Minutes', value: Math.floor(left / 60) % 60 }, { label: 'Seconds', value: left % 60 }];
  return <section className="countdown section-pad"><SectionHeading overline="January 1, 2027" title="Counting Down to Our Forever"/>{left === 0 ? <p className="today-message">Today's the Day! We're Getting Married!</p> : <div className="count-grid reveal" role="timer" aria-label="Time until the wedding">{units.map(unit => <div className="count-unit" key={unit.label}><strong>{String(unit.value).padStart(2, '0')}</strong><span>{unit.label}</span></div>)}</div>}<p className="section-note">January 1, 2027 · 9:00 AM Philippine Standard Time</p></section>;
}

function Details() { return <section className="details section-pad"><Floral className="details-floral"/><div className="details-card reveal"><span className="eyebrow">The celebration</span><h2>Wedding Ceremony<br/><span className="script-amp">&</span> Reception</h2><span className="ornament">✦</span><div className="detail-line"><span>Friday</span><strong>January 1, 2027</strong></div><div className="detail-line"><span>Beginning at</span><strong>9:00 AM</strong></div><div className="detail-line venue"><span>At</span><strong>{wedding.venue}</strong><p>{wedding.address}</p></div><div className="action-row"><a className="button primary" href={wedding.maps} target="_blank" rel="noopener noreferrer">Get Directions <span aria-hidden="true">↗</span></a><a className="button outline" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">Google Calendar <span aria-hidden="true">↗</span></a><button className="button text-button" onClick={downloadCalendar}>Download for Apple / Outlook <span aria-hidden="true">↓</span></button></div></div></section>; }

function DressCode() { return <section className="dress section-pad"><SectionHeading overline="Burgundy & Nude" title="Dress Code"/><div className="dress-content reveal"><p className="dress-main">Semi-Formal</p><p className="dress-sub">Classy but Comfortable</p><span className="fine-rule"/><p className="motif-label">WEDDING MOTIF</p><p className="motif-name">Burgundy <em>&</em> Nude</p><div className="swatches" aria-label="Burgundy and nude color motif"><span className="swatch burgundy"/><span className="swatch nude"/></div></div></section>; }

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const photos = wedding.photos;
  useEffect(() => {
    if (active === null) return;
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); if (e.key === 'ArrowRight') setActive((active + 1) % photos.length); if (e.key === 'ArrowLeft') setActive((active - 1 + photos.length) % photos.length); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [active, photos.length]);
  const touch = useRef<number | null>(null);
  if (!photos.length) return null;
  return <section className="gallery section-pad"><SectionHeading overline="John Mark & Ailyn Grace" title="Our Precious Moments"/><div className="photo-grid reveal">{photos.map((photo, index) => <button className="photo-tile" key={photo.src} onClick={() => setActive(index)} aria-label={`Open photo ${index + 1} of ${photos.length}: ${photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy"/></button>)}</div>{active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={() => setActive(null)} onTouchStart={e => { touch.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touch.current === null) return; const delta = e.changedTouches[0].clientX - touch.current; if (Math.abs(delta) > 50) setActive((active + (delta < 0 ? 1 : photos.length - 1)) % photos.length); touch.current = null; }}><button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close gallery">×</button><button className="lightbox-arrow prev" onClick={e => { e.stopPropagation(); setActive((active - 1 + photos.length) % photos.length); }} aria-label="Previous photo">‹</button><figure onClick={e => e.stopPropagation()}><img src={photos[active].src} alt={photos[active].alt}/><figcaption>{active + 1} / {photos.length}</figcaption></figure><button className="lightbox-arrow next" onClick={e => { e.stopPropagation(); setActive((active + 1) % photos.length); }} aria-label="Next photo">›</button></div>}</section>;
}

function Reminders() { return <section className="reminders section-pad"><SectionHeading overline="January 1, 2027" title="Gentle Reminders"/><div className="reminder-list reveal">{wedding.reminders.map((item, index) => <div className="reminder" key={item.title}><span className="reminder-index">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="reminder-flower" aria-hidden="true">✽</span></div>)}</div></section>; }

function PhotographyNote() { return <section className="photography section-pad reveal"><span className="camera-icon" aria-hidden="true">◈</span><span className="eyebrow">John Mark & Ailyn Grace</span><h2>Photos Are Welcome</h2><p>“We'd love for you to capture and share the beautiful moments of our special day!”</p></section>; }

function Closing() { return <footer className="closing section-pad"><Floral className="closing-left"/><Floral className="closing-right"/><div className="closing-content reveal"><span className="eyebrow">A beautiful beginning</span><h2>One love. One lifetime.<br/>One beautiful beginning.</h2><span className="ornament">✦</span><p>“We can't wait to celebrate with you!”</p><span className="with-love">With Love,</span><strong>{wedding.shortNames}</strong><span className="closing-date">JANUARY 1, 2027</span></div></footer>; }

function MusicController() {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  if (!wedding.musicSrc || failed) return null;
  const toggle = async () => { if (!audio.current) return; if (playing) { audio.current.pause(); setPlaying(false); } else { try { await audio.current.play(); setPlaying(true); } catch { setFailed(true); } } };
  return <><audio ref={audio} src={wedding.musicSrc} loop preload="none" onError={() => setFailed(true)} onEnded={() => setPlaying(false)}/><button className="music-control" onClick={toggle} aria-label={playing ? 'Pause background music' : 'Play background music'} aria-pressed={playing}>{playing ? '♫ Pause' : '♫ Play music'}</button></>;
}

export function WeddingInvitation({ initialNow }: { initialNow: number }) {
  const [opened, setOpened] = useState(false);
  useReveal();
  useEffect(() => { document.body.style.overflow = opened ? '' : 'hidden'; return () => { document.body.style.overflow = ''; }; }, [opened]);
  return <>{!opened && <EnvelopeIntro onFinish={() => setOpened(true)}/>}<main aria-hidden={!opened} inert={!opened}><Hero/><Countdown initialNow={initialNow}/><Details/><DressCode/><Gallery/><Reminders/><PhotographyNote/><Closing/></main>{opened && <FallingFlorals/>}{opened && <MusicController/>}</>;
}
