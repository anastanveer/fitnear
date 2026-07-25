<div align="center">

# 🏋️ FitNear

### Find the right trainer, closer to you.

A **premium, location-based trainer marketplace** for the UAE — connecting clients with verified personal trainers, swimming instructors, boxing coaches, yoga teachers and more, ranked by how close they really are.

Not a directory. A full fitness **ecosystem** — AI matching, short-video discovery, city challenges, progress streaks and a live community.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF008F?style=for-the-badge&logo=framer&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/R3F_/_Three.js-000000?style=for-the-badge&logo=three.js)

</div>

---

## ✨ Why FitNear is different

Most trainer sites are static directories. FitNear is built to be **sticky, social and smart** — the things that take a product to the top:

| 🤖 **AI Coach** | 📱 **Trainer Reels** | 🏆 **City Challenges** |
|---|---|---|
| A conversational concierge that reads every trainer near you and returns your best match + a starter plan. | A TikTok-style vertical feed of trainer clips — swipe, like, follow and book. | City-wide challenges with daily check-ins, streaks and a live leaderboard. |
| 🔥 **Progress & Streaks** | 👥 **Community Feed** | 💰 **Featured Listings** |
| Log workouts (with photos), track weight, unlock badges, keep your streak alive. | Wins, tips and open slots posted by trainers — like, comment, save. | Trainers pay to get **priority placement** at the top of search. |

---

## 🗺️ Pages & features

**Core marketplace**
- 🎬 **Cinematic homepage** — interactive 3D city hero (React Three Fiber) with live location pins, animated storytelling, and every section a real product surface.
- 🔎 **Search** — a **real interactive map** (Leaflet + dark tiles) with avatar pins, "Open in Google Maps", plus a list view, full filters (sport, gender, price, distance, rating, format, verified, available-today), sorting and a "Near me" geolocation button.
- 👤 **Trainer profiles** — video intro, certifications, availability calendar, transformation gallery (lightbox), reviews with rating breakdown, their community posts, and a sticky booking widget.
- 📅 **Booking flow** — 5-step wizard → session type → date/time → location → transparent price breakdown (fee + platform commission) → mock payment → animated confirmation.
- ➕ **Join as a trainer** — an 8-step animated onboarding wizard with a live completion indicator.
- 📊 **Client & Trainer dashboards** — saved trainers, sessions, messages, payments, plus KPIs, **hand-built animated SVG charts**, earnings & commission, enquiries and a featured-listing upsell.
- 💼 **Business model** — clear commission explainer (free to join, 10–15% on completed bookings).

**Growth & engagement layer**
- 🤖 AI Coach · 📱 Reels · 🏆 Challenges · 🔥 Progress · 👥 Community · 💎 Promote (pricing + mock checkout)

**Everywhere**
- Fully responsive & mobile-first · custom premium dropdowns · toast notifications · loading skeletons · SEO (JSON-LD, sitemap, robots) · page transitions · **`prefers-reduced-motion`** support · real UAE content (no lorem ipsum).

---

## 🧰 Tech stack

| Purpose | Choice |
|---|---|
| Framework | **Next.js 16** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** (CSS-based `@theme` design system) |
| UI animation | **Framer Motion** |
| 3D hero | **React Three Fiber** + **@react-three/drei** (Three.js) |
| Maps | **Leaflet** + **react-leaflet** (CARTO dark tiles) |
| Icons | **lucide-react** |

**Design direction:** luxury sports-tech — electric lime (`#ccfa3c`) on deep charcoal (`#0b0d0b`), generous spacing, careful glassmorphism, and purposeful motion.

---

## 🚀 Getting started

```bash
git clone https://github.com/anastanveer/fitnear.git
cd fitnear
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
```

> Node 18.18+ required (developed on Node 20).

---

## 📁 Project structure

```
src/
├─ app/                      # Routes (App Router)
│  ├─ page.tsx               # Homepage
│  ├─ search/ · trainer/[slug]/ · booking/ · join/
│  ├─ dashboard/{client,trainer}/
│  ├─ ai-coach/ · reels/ · challenges/[slug]/ · progress/ · community/ · promote/
│  ├─ sitemap.ts · robots.ts · template.tsx
├─ components/               # ui · layout · shared · home · trainer · search
│  ├─ booking · community · promote · ai · reels · challenges · progress · dashboard · seo
├─ data/                     # Mock JSON-style data (trainers, categories, posts, …)
└─ lib/                      # types, utils, search, match, geo, feed, stores
```

---

## 🧪 Mocked vs. real (backend notes)

Everything is **frontend-only** for this prototype. Persistence uses the browser's **localStorage** (feed posts, progress, challenge check-ins, reel likes) so data survives refreshes with zero backend cost.

| Feature | Now | On backend integration |
|---|---|---|
| Trainer data | Mock (`src/data`) | Database + admin |
| Search / geo | Real UI + client logic | Server-side geo search, exact trainer coordinates |
| AI Coach | Smart rule-based matching | Claude API for free-form conversation |
| Bookings & payments | Visual mock | Stripe / Telr / PayTabs + calendar sync |
| Community / Progress / Challenges | localStorage | Real DB + auth + cloud image storage |
| WhatsApp contact | Demo number | Per-trainer verified numbers |
| Featured listings | Mock checkout | Subscriptions + priority ranking service |

---

## 🛣️ Roadmap

- [ ] Auth (client & trainer accounts)
- [ ] Real database + API
- [ ] Payments & subscriptions
- [ ] Real short-form video for Reels
- [ ] Wearable / health integrations
- [ ] Corporate wellness (B2B) portal

---

<div align="center">

**FitNear** — concept prototype · Dubai · Abu Dhabi · UAE 🇦🇪

*All people, figures and images are for demonstration. Photos via Unsplash; avatars via pravatar.cc.*

</div>
