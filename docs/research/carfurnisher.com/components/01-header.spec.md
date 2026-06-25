# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** scroll-driven (sticky), click-driven (dropdowns)

## Structure
```
Header (sticky, bg=rgba(255,255,255,0.97))
├── Announcement bar (top, promo text)
│   └── "Exclusive Deal: $15 Off Your First Order"
├── Main header row
│   ├── Logo (left): "CARFURISHER" text or image logo
│   ├── Navigation (center): dropdown mega menu
│   │   ├── Shop by Vehicle
│   │   ├── Seat Covers
│   │   ├── Steering Covers
│   │   ├── Floor Mats
│   │   └── More
│   └── Actions (right):
│       ├── Search icon → search drawer
│       ├── Account icon → account link
│       └── Cart icon → cart drawer
```

## Behaviors
- **Sticky:** Header becomes sticky on scroll, bg becomes rgba(255,255,255,0.97)
- **Dropdown:** Mega menu opens on hover over nav items
- **Search:** Opens a full-width search overlay
- **Cart:** Opens a slide-out cart drawer
- **Announcement bar:** May be dismissible

## Computed Styles
- Header height: ~106px
- Font: Poppins, 500 weight
- Text color: #191d21
- Border bottom: 1px solid #efefef
- Logo: Poppins 700, color #202626
- Nav links: Poppins 500, color #191d21, hover color #45a0de
- Announcement bar bg: #191d21 (dark), text: #ffffff

## Assets
- Logo: `public/images/logo.png` or use text-based logo

## Responsive
- Desktop (1440px): Full nav visible
- Tablet (768px): Compact nav, hamburger menu
- Mobile (390px): Hamburger menu, slide-out nav
