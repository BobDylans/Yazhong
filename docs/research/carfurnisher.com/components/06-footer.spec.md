# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** static, hover on links

## Structure
```
Footer
├── Footer top
│   ├── Column 1: About / Brand description
│   │   ├── Logo
│   │   └── Text about Carfurnisher
│   ├── Column 2: Quick Links
│   │   └── Link list
│   ├── Column 3: Customer Service
│   │   └── Link list
│   ├── Column 4: Contact
│   │   └── Email, phone, address info
│   └── Column 5: Newsletter signup
│       ├── Email input
│       └── Subscribe button
├── Footer bottom
│   ├── Copyright text
│   ├── Payment method icons
│   └── Social media links
```

## Computed Styles
- Footer bg: #1e1e1e (dark) or #191d21
- Text color: #ffffff or #cecece
- Link color: #cecece, hover #ffffff
- Heading in footer: Poppins 600, #ffffff, font-size 16px
- Font-size for links: 14px
- Padding: 40px 0 (top), 20px 0 (bottom)
- Border top: subtle separator

## Responsive
- Desktop: 4-5 columns
- Tablet: 2-3 columns
- Mobile: 1 column, stacked
