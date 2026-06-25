# Hero Banner Specification

## Overview
- **Target file:** `src/components/HeroBanner.tsx`
- **Interaction model:** static + video background

## Structure
```
HeroBanner
├── Video/Image background (full-width, ~436px height)
├── Overlay (dark gradient for text readability)
├── Content centered
│   ├── Heading: "Upgrade Your Drive with Premium Accessories"
│   └── Subheading / CTA button
└── Search by vehicle (Year/Make/Model selector)
    ├── Year dropdown
    ├── Make dropdown
    ├── Model dropdown
    └── Search button
```

## Computed Styles
- Container: height ~436px, position relative, overflow hidden
- Heading: Poppins 700, color #ffffff (or #202626 depending on section), font-size ~40px
- Search section: bg #ffffff or transparent, with dropdown selectors
- CTA button: bg #45a0de (blue accent), text #ffffff, border-radius 0px

## Assets
- Background video or image collage of car interiors
- Logo watermark (optional)

## Responsive
- Desktop: Full video background, horizontal search bar
- Mobile: Stacked layout, smaller heading
