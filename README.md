# John Mark & Ailyn Grace — Wedding Invitation

A mobile-first animated invitation for January 1, 2027. Built with the Next.js App Router, React, TypeScript, Tailwind CSS, pnpm, a GSAP opening timeline, and original watercolor floral artwork.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | Next.js route, metadata, and global Tailwind entry point |
| `src/components/sections/` | Readable invitation sections rendered by the server page |
| `src/components/` | Interactive envelope, countdown, gallery, and music controls |
| `src/lib/` | Wedding content and calendar helpers |
| `public/florals/` | Floral and paper artwork |

The invitation sections use Tailwind utilities. The small CSS files in `app/` hold the envelope's 3D fold shapes, floral gradients, and reveal animation that need custom CSS.

## Run locally

Requires Node.js 20.9+ and pnpm 12.16.1 (pinned in `package.json`). Use Corepack if your global pnpm is older.

```bash
corepack pnpm install
corepack pnpm dev
```

Open the local URL printed by Next.js (normally `http://localhost:3000`). For a production build:

```bash
corepack pnpm build
corepack pnpm start
```

Deploy the Next.js app to a host that supports Next.js, or run `corepack pnpm start` after building.

## Update content and assets

All wedding facts, wording, links, and asset paths are in `src/lib/wedding.ts`.

**Photos:** Place 3–5 approved couple photos in `public/photos/` (compressed WebP or JPEG recommended). Add entries to `wedding.photos`, for example:

```ts
photos: [
  { src: '/photos/portrait-1.webp', alt: 'John Mark and Ailyn Grace smiling together outdoors' },
  { src: '/photos/portrait-2.webp', alt: 'John Mark and Ailyn Grace walking together' },
  { src: '/photos/portrait-3.webp', alt: 'John Mark and Ailyn Grace celebrating together' },
],
```

The gallery stays hidden until photos are configured. Each image opens in a full-screen lightbox with arrow controls, Escape to close, and touch swipes.

**Music:** Place an approved, licensed audio file in `public/music/`, then set `musicSrc` in `src/lib/wedding.ts` to its URL (for example, `/music/our-song.mp3`). The music control stays hidden until a file is configured. Playback begins only after a guest presses Play music. The audio loops quietly and can be paused at any time.

**Florals:** `public/florals/rose-corner.webp` is original generated artwork used throughout the invitation. Replace it with another transparent image at the same path to change the decoration.

## Calendar and time zone

The wedding starts at **9:00 AM** and the calendar event ends at **3:00 PM**, Asia/Manila (UTC+8). `src/lib/calendar.ts` encodes these as **01:00–07:00 UTC** for Google Calendar and the downloadable `.ics` file, so guests see the proper local time in their own calendar. The site countdown uses `2027-01-01T09:00:00+08:00`, which is independent of the guest's time zone.

## Accessibility

The envelope opens from a keyboard-accessible button with visible focus. GSAP animates the seal, folds, letter zoom, floral transition, and page reveal. Reduced-motion preferences shorten the opening. The site does not autoplay music. The gallery lightbox supports Escape, arrow keys, and touch swipes.
