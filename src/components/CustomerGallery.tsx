"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/i18n/LocaleProvider";
import {
  Star,
  MessageCircle,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { whatsappUrl } from "@/lib/config";
import { getImageUrl } from "@/lib/images";
import { generatedProducts } from "@/data/generated/products-data";

/* ------------------------------------------------------------------ */
/*  Gallery — real product photos sourced from the build-time pipeline */
/*  (R2 via admin proxy). Falls back gracefully if a path is missing.  */
/* ------------------------------------------------------------------ */

interface GalleryItem {
  id: string;
  label: string;
  description: string;
  image: string;
}

// Pick one representative product per category for the install showcase.
function buildGalleryItems(): GalleryItem[] {
  const seen = new Set<string>();
  const items: GalleryItem[] = [];
  for (const p of generatedProducts) {
    if (!p.category || !p.image || seen.has(p.category)) continue;
    seen.add(p.category);
    items.push({
      id: p.id,
      label: p.title,
      description: p.series || p.category,
      image: p.image,
    });
    if (items.length >= 4) break;
  }
  return items;
}

const galleryItems = buildGalleryItems();

/* ------------------------------------------------------------------ */
/*  Reviews                                                            */
/* ------------------------------------------------------------------ */

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  date: string;
  /** Avatar placeholder color */
  avatarColor: string;
}

const reviews: Review[] = [
  {
    id: "r1",
    name: "Ahmed M.",
    location: "Dubai, UAE",
    rating: 5,
    text: "The quality exceeded my expectations. The leather feels premium and the fitment was spot-on for my BMW X5. Customer service was very responsive on WhatsApp.",
    product: "Luxury Leather Seat Cover Set",
    date: "June 2026",
    avatarColor: "bg-amber-700",
  },
  {
    id: "r2",
    name: "Sarah K.",
    location: "London, UK",
    rating: 5,
    text: "I was skeptical about ordering seat covers online, but the team helped me confirm fitment for my Mercedes C-Class. Install was easier than expected. Highly recommend!",
    product: "Sports Series Seat Cover",
    date: "May 2026",
    avatarColor: "bg-zinc-600",
  },
  {
    id: "r3",
    name: "Omar H.",
    location: "Riyadh, KSA",
    rating: 5,
    text: "Excellent craftsmanship on the steering wheel cover. The carbon fiber with blue stitch looks incredible. Shipping took only 5 days to Saudi Arabia.",
    product: "Carbon Fiber Steering Wheel Cover",
    date: "May 2026",
    avatarColor: "bg-stone-700",
  },
  {
    id: "r4",
    name: "James T.",
    location: "New York, USA",
    rating: 4,
    text: "Great quality floor mats — heavy duty and the custom fit for my Ford F-150 is perfect. Only wish there were more color options for the edge piping.",
    product: "Custom Fit Floor Mats",
    date: "April 2026",
    avatarColor: "bg-amber-800",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Stars({ count, size = "sm" }: { count: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(cls, i < count ? "fill-gold text-gold" : "fill-none text-border")}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery Section                                                     */
/* ------------------------------------------------------------------ */

interface CustomerGalleryProps {
  className?: string;
}

export function CustomerGallery({ className }: CustomerGalleryProps) {
  const [activeReview, setActiveReview] = useState(0);
  const { t } = useLocale();
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prevReview = () => setActiveReview((p) => (p === 0 ? reviews.length - 1 : p - 1));
  const nextReview = () => setActiveReview((p) => (p === reviews.length - 1 ? 0 : p + 1));

  // Auto-advance testimonials; pause on hover/focus.
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(nextReview, 6000);
  };
  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };
  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Guard: if no products were generated, hide the whole section rather than
  // show empty/placeholder content (trust protection).
  if (galleryItems.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal direction="up">
          <div className="text-center mb-14">
            <span className="eyebrow">{t("galleryTitle")}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3">
              {t("galleryTitle")}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-3">
              {t("galleryDesc")}
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {/* Left: Gallery Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {galleryItems.map((item, i) => (
                <Reveal key={item.id} delay={i * 100} direction="up">
                  <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-ambient transition-all duration-500 hover:shadow-ambient-hover">
                    {/* Real product photo (R2 via admin proxy) */}
                    <div className="aspect-[4/3] overflow-hidden bg-secondary">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.label}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-white/70 mt-0.5">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: Testimonial Carousel — auto-advances, pauses on hover/focus */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <Reveal direction="right" delay={200}>
              <div
                className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-ambient relative"
                onMouseEnter={stopAutoplay}
                onMouseLeave={startAutoplay}
                onFocus={stopAutoplay}
                onBlur={startAutoplay}
              >
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-gold/20 absolute top-4 end-4" />

                {/* Rating */}
                <Stars count={reviews[activeReview].rating} size="md" />

                {/* Text */}
                <p className="text-sm text-foreground leading-relaxed mt-4 mb-6 italic">
                  &ldquo;{reviews[activeReview].text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold",
                      reviews[activeReview].avatarColor,
                    )}
                  >
                    {reviews[activeReview].name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground">
                      {reviews[activeReview].name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {reviews[activeReview].location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground">
                      {reviews[activeReview].date}
                    </div>
                    <div className="text-[10px] text-gold font-medium truncate max-w-[100px]">
                      {reviews[activeReview].product}
                    </div>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <div className="flex gap-1.5">
                    {reviews.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveReview(i)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          i === activeReview
                            ? "w-6 bg-gold"
                            : "w-1.5 bg-border hover:bg-muted-foreground/50",
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={prevReview}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextReview}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-5 pt-4 border-t border-border text-center">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold/80 transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {t("galleryShareCta")}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
