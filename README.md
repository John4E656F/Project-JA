# John Mark & Ailyn Grace — Wedding Invitation

A mobile-first animated invitation for January 1, 2027. Built with React, TypeScript, Vite, a GSAP opening timeline, and original watercolor floral artwork.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```bash
npm run build
npm run preview
```

Deploy the contents of `dist/` to any static host. No backend is needed.

## Update content and assets

All wedding facts, wording, links, and asset paths are in `src/content.ts`.

**Photos:** Place 3–5 approved couple photos in `public/photos/` (compressed WebP or JPEG recommended). Add entries to `wedding.photos`, for example:

```ts
photos: [
  { src: '/photos/portrait-1.webp', alt: 'John Mark and Ailyn Grace smiling together outdoors' },
  { src: '/photos/portrait-2.webp', alt: 'John Mark and Ailyn Grace walking together' },
  { src: '/photos/portrait-3.webp', alt: 'John Mark and Ailyn Grace celebrating together' },
],
```

The gallery stays hidden until photos are configured. Each image opens in a full-screen lightbox with arrow controls, Escape to close, and touch swipes.

**Music:** Place an approved, licensed audio file in `public/music/`, then set `musicSrc` in `src/content.ts` to its URL (for example, `/music/our-song.mp3`). The music control stays hidden until a file is configured. Playback begins only after a guest presses Play music. The audio loops quietly and can be paused at any time.

**Florals:** `public/florals/rose-corner.webp` is original generated artwork used throughout the invitation. Replace it with another transparent image at the same path to change the decoration.

## Calendar and time zone

The wedding starts at **9:00 AM** and the calendar event ends at **3:00 PM**, Asia/Manila (UTC+8). `src/calendar.ts` encodes these as **01:00–07:00 UTC** for Google Calendar and the downloadable `.ics` file, so guests see the proper local time in their own calendar. The site countdown uses `2027-01-01T09:00:00+08:00`, which is independent of the guest's time zone.

## Accessibility

The envelope opens from a keyboard-accessible button with visible focus. GSAP animates the seal, folds, letter zoom, floral transition, and page reveal. Reduced-motion preferences shorten the opening. The site does not autoplay music. The gallery lightbox supports Escape, arrow keys, and touch swipes.
