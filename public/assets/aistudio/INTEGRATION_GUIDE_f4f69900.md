# KrishiGreen Animation Integration Guide

## Files created (copy these to your project)

| File | Copy to |
|------|---------|
| `AnimatedBackground.tsx` | `src/components/AnimatedBackground.tsx` |
| `AnimatedNewsTicker.tsx` | `src/components/AnimatedNewsTicker.tsx` |
| `ScrollReveal.tsx` | `src/components/ScrollReveal.tsx` |
| `animations.css` | `src/animations.css` |

---

## Step 1 — Import the CSS

In `src/main.tsx` (or `src/index.css` at the bottom), add:

```ts
import './animations.css';
```

---

## Step 2 — Add AnimatedBackground to App.tsx

At the top of `src/App.tsx`, add the import:

```tsx
import { AnimatedBackground } from './components/AnimatedBackground';
```

Then inside the `return (...)`, right after the first `<div` wrapper opening tag, add:

```tsx
<AnimatedBackground />
```

Make sure the outer wrapper has `position: relative` and `z-index` so content sits above the canvas. The canvas is `position: fixed` with `z-index: 0` and `pointer-events: none`, so it won't block clicks.

---

## Step 3 — Add the smooth news ticker to Header

In `src/components/Header.tsx`, add the import:

```tsx
import { AnimatedNewsTicker } from './AnimatedNewsTicker';
```

Replace (or add above) the existing `<WeatherAlertBanner>` inside the header's first section:

```tsx
{/* Smooth animated news ticker */}
<AnimatedNewsTicker
  language={language}
  districtName="Palnadu / Guntur Hub"
/>

{/* Keep existing WeatherAlertBanner below for full detail */}
<WeatherAlertBanner language={language} />
```

You can pass live `weatherTemp` and `weatherRain` props from the WeatherAlertBanner's state if you want them to stay in sync.

---

## Step 4 — Wrap sections with ScrollReveal

In `src/components/HomeIntro.tsx`, add the import:

```tsx
import { ScrollReveal } from './ScrollReveal';
```

Then wrap each major section. Example:

```tsx
{/* Before */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  ...ecosystem services...
</div>

{/* After */}
<ScrollReveal stagger>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    ...ecosystem services...
  </div>
</ScrollReveal>
```

Repeat for each `<section>` / major `<div>` block in HomeIntro, PipelineSection, DualMarketplace, etc.

---

## Step 5 — Add animation classes to hero text

In `src/components/HomeIntro.tsx`, find the main `<h1>KrishiGreen</h1>` and tagline:

```tsx
{/* Add kg-hero-title class */}
<h1 className="kg-hero-title ...existing classes...">KrishiGreen</h1>

{/* Add kg-hero-sub */}
<p className="kg-hero-sub ...existing classes...">{t.tagline}</p>

{/* Add kg-hero-cta to CTA buttons wrapper */}
<div className="kg-hero-cta flex gap-3 ...">
  ...buttons...
</div>
```

---

## Step 6 — Add card lift to ecosystem service cards

In `src/components/HomeIntro.tsx`, find the `.map((service) => ...)` for ecosystem cards and add `kg-card` to the outer div:

```tsx
<div
  className="kg-card relative rounded-3xl border ... cursor-pointer"
  onClick={() => onNavigate(service.tab)}
>
```

---

## What each animation does

| Class / Component | Effect |
|---|---|
| `AnimatedBackground` | Floating 🌿🍃 leaf particles in the background (barely visible, decorative) |
| `AnimatedNewsTicker` | Smooth infinite horizontal scrolling news/weather/mandi bar |
| `ScrollReveal` | Sections fade + slide up as you scroll into them |
| `kg-hero-title/sub/cta` | Hero text and buttons entrance animation on page load |
| `kg-card` | Cards lift slightly on hover |
| `kg-float` | Gentle floating bob — add to any icon or illustration |
| `kg-shimmer` | Loading shimmer on skeleton placeholders |
| `kg-weather-glow` | Pulsing green glow on weather badge |

---

## Optional — Weather glow on the header weather badge

Find the temperature display in `src/components/WeatherWidget.tsx` and add `kg-weather-glow` to its wrapper span.
