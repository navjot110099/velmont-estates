# Velmont Estates — *From Vision to Reality*

An Awwwards-calibre, cinematic luxury real-estate experience built around a single
pre-produced mansion film. The visitor doesn't browse pages — they watch a residence
come to life, cross an almost-invisible threshold from film into website, and then
walk the house room by room.

> This is a **demo experience only**. No backend, auth, payments, database, CMS, or
> live listings — every interaction is visual, immersive, and cinematic.

---

## The concept

The mansion **becomes** the website. Each section is a **room**:

| Floor | Room | Section |
|------|------|---------|
| 00 | Grand Entrance | Cinematic film → invisible handoff |
| 01 | Living Room | About · Vision · Mission |
| 02 | Kitchen | Services |
| 03 | Dining Room | Featured Residences |
| 04 | Wine Cellar | Exclusive Collection |
| 05 | Executive Office | Why Velmont · Timeline · Awards |
| 06 | Home Theater | Testimonials |
| 07 | Master Suite | Lifestyle |
| 08 | Walk-in Closet | Features & Amenities |
| 09 | Spa Bathroom | Materials & Craftsmanship |
| 10 | Wellness Area | Investment & Future |
| 11 | Rooftop Terrace | Contact · CTA · Footer |

## The hero

`components/CinematicHero.tsx` pins the mansion film in a tall scroll stage and
**scrubs `video.currentTime` from scroll position** through a requestAnimationFrame
lerp, so the footage feels hand-eased rather than snapped (Apple-style). As the camera
settles inside the finished residence, the final frame is held and the Grand Entrance
resolves over it — the film-to-site transition is designed to be nearly invisible.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for the design system (`tailwind.config.ts`, `app/globals.css`)
- **Framer Motion** for all motion
- **Lenis** for premium smooth scrolling (`components/SmoothScroll.tsx`)
- Curated luxury photography with graceful gradient fallbacks (`components/ui/LuxuryImage.tsx`)

## Design system

Warm ink · Italian marble · brushed bronze. Editorial serif (Cormorant Garamond)
paired with a geometric grotesque (Jost). Tokens live in `tailwind.config.ts` and
`app/globals.css` (`.display`, `.eyebrow`, `.body-lux`, `.glass`, `.btn-lux`, grain
overlay, seams between rooms, etc.).

## Project structure

```
app/            layout, page composition, globals
components/      hero, nav, preloader, floor indicator, smooth-scroll
  sections/      the 12 rooms
  ui/            reusable motion primitives
data/site.ts     all content (demo)
public/videos/   mansion-tour.mp4  (the pre-produced film)
lib/anim.ts      shared easing + variants
```

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

Build:

```bash
npm run build && npm start
```

## The film

The hero film lives at `public/videos/mansion-tour.mp4`. It is used exactly as
supplied and is the centre of the entire experience — the site is designed around it.

---

© Velmont Estates — a fictional developer. Crafted as a demo.
