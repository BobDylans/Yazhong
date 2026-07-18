"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleProvider";
import {
  Car,
  ShieldCheck,
  Wind,
  Thermometer,
  Sparkles,
  Wrench,
  Truck,
  Leaf,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Category-specific rich content                                     */
/* ------------------------------------------------------------------ */

interface SpecRow {
  label: string;
  value: string;
}

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface MaterialDetail {
  title: string;
  description: string;
}

interface CategoryContent {
  specs: SpecRow[];
  features: FeatureCard[];
  materials: MaterialDetail[];
}

const categoryContent: Record<string, CategoryContent> = {
  "Seat Covers": {
    specs: [
      { label: "Fit Type", value: "Custom 3D Laser-Fit" },
      { label: "Material", value: "Premium Eco-Leather / Fabric" },
      { label: "Layers", value: "3-Layer Breathable Construction" },
      { label: "Compatibility", value: "500+ Vehicle Models" },
      { label: "Airbag Safe", value: "Yes — Side-Impact Tested" },
      { label: "Installation", value: "15–20 min, No Tools" },
    ],
    features: [
      {
        icon: <ShieldCheck className="h-5 w-5" />,
        title: "Airbag Compatible",
        description:
          "Stitching breaks away cleanly on side-airbag deployment — TUV certified for safety.",
      },
      {
        icon: <Wind className="h-5 w-5" />,
        title: "Breathable 3-Layer",
        description:
          "Moisture-wicking base, comfort foam middle, premium surface — stays cool in summer, warm in winter.",
      },
      {
        icon: <Car className="h-5 w-5" />,
        title: "Exact Vehicle Fit",
        description:
          "3D laser-scanned patterns match your seat contours, headrests, and armrests for a factory finish.",
      },
      {
        icon: <Leaf className="h-5 w-5" />,
        title: "Eco-Friendly",
        description:
          "Low-VOC eco-leather with no animal products — durable, easy to clean, and sustainable.",
      },
    ],
    materials: [
      {
        title: "Premium Eco-Leather",
        description:
          "PU-based leather alternative with a soft Nappa hand-feel. Resists cracking, fading, and spills. Wipes clean with a damp cloth.",
      },
      {
        title: "Breathable Foam Core",
        description:
          "High-density memory foam adapts to your body, reducing fatigue on long drives while allowing airflow.",
      },
      {
        title: "Anti-Slip Backing",
        description:
          "Silicone-dot backing keeps covers locked in place without damaging original upholstery.",
      },
    ],
  },
  "Steering Covers": {
    specs: [
      { label: "Fit Size", value: "Universal 37–40 cm" },
      { label: "Material", value: "Carbon Fiber / Suede / Leather" },
      { label: "Grip", value: "Anti-Slip Perfected" },
      { label: "Temperature", value: "Heat & Cold Resistant" },
      { label: "Installation", value: "5 min, No Tools" },
      { label: "Durability", value: "50,000+ Rotation Cycles Tested" },
    ],
    features: [
      {
        icon: <Sparkles className="h-5 w-5" />,
        title: "Enhanced Grip",
        description:
          "Textured surface and ergonomic grooves provide superior control in wet, hot, or cold conditions.",
      },
      {
        icon: <Thermometer className="h-5 w-5" />,
        title: "All-Season Comfort",
        description:
          "Doesn't burn your hands in summer or freeze them in winter — insulating inner layer regulates temperature.",
      },
      {
        icon: <ShieldCheck className="h-5 w-5" />,
        title: "Protects Original Wheel",
        description:
          "Shields factory steering wheel from UV damage, sweat oils, and daily wear — preserves resale value.",
      },
      {
        icon: <Wrench className="h-5 w-5" />,
        title: "Tool-Free Install",
        description:
          "Flexible inner ring stretches over the wheel and locks in place. Most installs take under 5 minutes.",
      },
    ],
    materials: [
      {
        title: "Carbon Fiber Weave",
        description:
          "Lightweight, high-strength carbon pattern with a sporty look. Resistant to stretching and fraying.",
      },
      {
        title: "Genuine Suede Option",
        description:
          "Italian-grade suede with a velvet touch — premium feel for luxury interiors. Available with racing stripes.",
      },
      {
        title: "Rubber Inner Grip",
        description:
          "Anti-slip rubber lining prevents rotation and slipping, even during aggressive driving.",
      },
    ],
  },
  "Floor Mats": {
    specs: [
      { label: "Fit Type", value: "Custom Vehicle-Specific" },
      { label: "Material", value: "PU Leather / Heavy-Duty Rubber" },
      { label: "Edge", value: "Raised Lip, Spill-Containing" },
      { label: "Backing", value: "Waterproof Non-Slip" },
      { label: "Coverage", value: "Full Set (Front + Rear)" },
      { label: "Cleaning", value: "Wipe or Hose-Down" },
    ],
    features: [
      {
        icon: <ShieldCheck className="h-5 w-5" />,
        title: "Spill Containment",
        description:
          "Raised edges trap liquids, mud, and debris — protects your original carpet from permanent damage.",
      },
      {
        icon: <Truck className="h-5 w-5" />,
        title: "All-Weather Tough",
        description:
          "Handles snow, rain, mud, and beach sand. Won't crack in freezing temps or warp in heat.",
      },
      {
        icon: <Car className="h-5 w-5" />,
        title: "Perfect Floor Match",
        description:
          "Laser-measured to your vehicle's floor pan, pedals, and anchoring points — no sliding, no gaps.",
      },
      {
        icon: <Wrench className="h-5 w-5" />,
        title: "Easy to Clean",
        description:
          "Remove, hose down, and reinstall in minutes. Stain-resistant surface stays looking new.",
      },
    ],
    materials: [
      {
        title: "Premium PU Leather",
        description:
          "Waterproof top surface with diamond quilting for a luxury look. Available with colored edge piping.",
      },
      {
        title: "Heavy-Duty Rubber Core",
        description:
          "Dense rubber base adds weight and rigidity, preventing curling and keeping mats flat against the floor.",
      },
      {
        title: "Spike Anti-Slip Backing",
        description:
          "Underside grips into carpet pile, locking mats in place without factory hooks.",
      },
    ],
  },
  Accessories: {
    specs: [
      { label: "Material", value: "Memory Foam / Premium Fabric" },
      { label: "Ergonomics", value: "Orthopedic Support Design" },
      { label: "Compatibility", value: "Universal Fit" },
      { label: "Care", value: "Removable, Washable Covers" },
      { label: "Warranty", value: "12 Months" },
      { label: "Installation", value: "Instant, Tool-Free" },
    ],
    features: [
      {
        icon: <Sparkles className="h-5 w-5" />,
        title: "Orthopedic Support",
        description:
          "Memory foam contours to your body, promoting healthy posture and easing lower-back pressure on long drives.",
      },
      {
        icon: <Wind className="h-5 w-5" />,
        title: "Breathable & Cool",
        description:
          "Moisture-wicking cover fabric keeps you comfortable year-round, preventing sweat buildup.",
      },
      {
        icon: <ShieldCheck className="h-5 w-5" />,
        title: "Durable Build",
        description:
          "High-density foam retains shape after thousands of uses — won't flatten like cheap cushions.",
      },
      {
        icon: <Wrench className="h-5 w-5" />,
        title: "Universal Fit",
        description:
          "Works in any vehicle, office chair, or home seat. Non-slip bottom keeps it firmly in place.",
      },
    ],
    materials: [
      {
        title: "Premium Memory Foam",
        description:
          "Viscoelastic foam reacts to body heat, molding to your shape for personalized support that relieves pressure points.",
      },
      {
        title: "Breathable Mesh Cover",
        description:
          "Removable, machine-washable cover with 3D airflow mesh — stays fresh and hygienic.",
      },
      {
        title: "Anti-Slip Base",
        description:
          "Silicone-grip bottom prevents sliding on leather or fabric seats, even during sharp turns.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ProductDetails({
  category,
  className,
}: {
  category?: string;
  className?: string;
}) {
  const { t } = useLocale();
  const content = category ? categoryContent[category] : null;
  if (!content || !category) return null;

  return (
    <div className={cn("space-y-16", className)}>
      {/* Product Specifications */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {t("detailsSpecs")}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t("detailsSpecsDesc").replace("{category}", category.toLowerCase())}
        </p>
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-ambient">
          <dl className="divide-y divide-border">
            {content.specs.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-3 gap-4 px-5 py-3.5 hover:bg-secondary/40 transition-colors"
              >
                <dt className="text-sm font-medium text-muted-foreground col-span-1">
                  {spec.label}
                </dt>
                <dd className="text-sm font-semibold text-foreground col-span-2">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {t("detailsFeatures")}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t("detailsFeaturesDesc")}
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {content.features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Material & Craftsmanship */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {t("detailsMaterials")}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t("detailsMaterialsDesc")}
        </p>
        <div className="space-y-4">
          {content.materials.map((mat, i) => (
            <div
              key={mat.title}
              className="flex gap-4 items-start p-5 rounded-xl border border-border bg-secondary/40"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">
                {i + 1}
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1">
                  {mat.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {mat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
