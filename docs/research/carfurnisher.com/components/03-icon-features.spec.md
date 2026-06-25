# Icon Features Specification

## Overview
- **Target file:** `src/components/IconFeatures.tsx`
- **Interaction model:** static

## Structure
```
IconFeatures
├── Row of feature icons (5 columns)
│   ├── Icon 1: "Seat Cover Experts" with icon
│   ├── Icon 2: "Free Shipping" with icon
│   ├── Icon 3: "Premium Quality" with icon
│   ├── Icon 4: "Easy Returns" with icon
│   └── Icon 5: "24/7 Support" with icon
```

## Computed Styles
- Row height: ~307px
- Each column: width ~280px, centered text
- Icons: large (~48-64px), color #45a0de (blue accent)
- Title: Poppins 600, color #202626, font-size ~16px
- Subtitle: Poppins 400, color #808080, font-size ~14px

## Assets
- Icons as inline SVGs (truck, shield, award, return, support)

## Responsive
- Desktop: 5 columns in a row
- Tablet: 3 columns
- Mobile: 2 or 1 column, stacked
