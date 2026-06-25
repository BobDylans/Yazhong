# Product Grid Specification

## Overview
- **Target file:** `src/components/ProductGrid.tsx`
- **Interaction model:** static product cards with hover effects

## Structure
```
ProductGrid
├── Section heading (if any)
├── Product grid (responsive grid)
│   ├── ProductCard
│   │   ├── Image container (aspect-ratio 1:1)
│   │   │   ├── Product image
│   │   │   └── Badge (e.g., "Best Seller", "-20%")
│   │   ├── Product info
│   │   │   ├── Title: Poppins 500, #191d21
│   │   │   ├── Price: Poppins 600, #202626
│   │   │   └── Compare at price: strikethrough, #808080
│   │   └── Rating / Reviews (if available)
│   └── ...more cards
```

## Computed Styles
- Card width: ~212px (varies by grid)
- Image: aspect-ratio 1:1, object-fit cover
- Title: font-size 14px, line-height 1.4
- Price: font-size 16px, color #202626
- Compare-at price: font-size 13px, color #808080, text-decoration line-through
- Card border-radius: 0
- Card hover: slight shadow, maybe image zoom
- Badge: bg #ef0000 (red) or #45a0de (blue), text #ffffff, font-size 12px

## States
- Default: card with image, title, price
- Sold out: greyed out, "Sold Out" badge
- Hover: image subtle scale up, maybe shadow

## Responsive
- Desktop: 6 columns
- Tablet: 3-4 columns
- Mobile: 2 columns
