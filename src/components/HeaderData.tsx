import type { ReactNode } from "react";

export const navLinks = [
  { key: "navHome", href: "/" },
  {
    key: "navProducts",
    href: "/products",
    children: [
      { key: "navSeatCovers", href: "/products?category=Seat+Covers" },
      { key: "navSteeringCovers", href: "/products?category=Steering+Covers" },
      { key: "navFloorMats", href: "/products?category=Floor+Mats" },
      { key: "navAccessories", href: "/products?category=Accessories" },
    ],
  },
  { key: "navBlog", href: "/blog" },
  { key: "navAbout", href: "/about" },
  { key: "navContact", href: "/contact" },
];

export const navIcons: Record<string, ReactNode> = {
  navHome: <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></>,
  navProducts: <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></>,
  navBlog: <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></>,
  navAbout: <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><circle cx="12" cy="8" r="3.5"/><path d="M5 20v-2a7 7 0 0 1 14 0v2"/><circle cx="12" cy="12" r="10"/></svg></>,
  navContact: <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-9.1 6.3a1 1 0 0 1-1.1 0L2 4"/></svg></>,
  navSeatCovers: <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="2" x2="9" y2="22"/><line x1="15" y1="2" x2="15" y2="22"/></svg></>,
  navSteeringCovers: <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/><circle cx="12" cy="12" r="2"/></svg></>,
  navFloorMats: <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></>,
  navAccessories: <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><rect x="2" y="7" width="20" height="12" rx="2" ry="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></>,
};