# Brand Marquee Specification

## Overview
- **Target file:** `src/components/BrandMarquee.tsx`
- **Interaction model:** auto-scrolling marquee

## Structure
```
BrandMarquee
├── Heading: "Custom Fit Car Seat Covers"
├── Marquee container (overflow hidden, scrolling animation)
│   ├── Marquee track (duplicated for seamless loop)
│   │   ├── Brand logo images (88 logos)
│   │   └── ...repeated
```

## Computed Styles
- Container: full-width, overflow hidden, position relative
- Heading section: padding ~20px 0, centered, font-size ~24px
- Marquee: white-space nowrap, animated translateX
- Brand logos: height ~100px, margin 0 15px
- Speed: ~30-40s for full loop

## Behavior
- Auto-scrolls horizontally (CSS animation, not JS)
- Pauses on hover (optionally)
- Logos are car brand logos (Volkswagen, Toyota, BMW, Mercedes, etc.)

## Responsive
- Desktop: Full marquee with all brands
- Mobile: Smaller logos, faster scroll
