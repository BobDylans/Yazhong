"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { Check, MessageCircle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface ConfigOption {
  id: string;
  label: string;
  color?: string;       // hex for swatch
  image?: string;       // optional texture image URL
}

export interface ProductConfiguratorProps {
  productTitle: string;
  productId?: string;
  colors?: ConfigOption[];
  materials?: ConfigOption[];
  stitches?: ConfigOption[];
  defaultColor?: string;
  defaultMaterial?: string;
  defaultStitch?: string;
}

/* ------------------------------------------------------------------ */
/*  Swatch                                                            */
/* ------------------------------------------------------------------ */

function Swatch({
  option,
  selected,
  onSelect,
  size = "md",
}: {
  option: ConfigOption;
  selected: boolean;
  onSelect: () => void;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" };

  return (
    <button
      type="button"
      onClick={onSelect}
      title={option.label}
      className={cn(
        "relative flex items-center justify-center rounded-full border-2 transition-all duration-200",
        sizeMap[size],
        selected
          ? "border-gold ring-2 ring-gold/30 scale-110"
          : "border-border hover:border-muted-foreground/50",
      )}
    >
      {option.color ? (
        <span
          className="h-full w-full rounded-full"
          style={{ backgroundColor: option.color }}
        />
      ) : (
        <span className="text-[8px] font-semibold text-foreground truncate">
          {option.label.slice(0, 2)}
        </span>
      )}
      {selected && (
        <span className="absolute -top-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold">
          <Check className="h-2.5 w-2.5 text-white" />
        </span>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Option Button (material / stitch)                                  */
/* ------------------------------------------------------------------ */

function OptionChip({
  option,
  selected,
  onSelect,
  prefix,
}: {
  option: ConfigOption;
  selected: boolean;
  onSelect: () => void;
  prefix?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200",
        selected
          ? "border-gold bg-gold/5 text-foreground shadow-sm"
          : "border-border bg-card text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground",
      )}
    >
      {option.color && (
        <span
          className="h-4 w-4 rounded-full shrink-0 border border-border"
          style={{ backgroundColor: option.color }}
        />
      )}
      <span className="flex-1">{option.label}</span>
      <Check className={cn("h-3.5 w-3.5 shrink-0", selected ? "text-gold" : "text-transparent")} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

const defaultColors: ConfigOption[] = [
  { id: "black", label: "Black", color: "#1a1a1a" },
  { id: "beige", label: "Madrid Beige", color: "#d4c5a9" },
  { id: "red", label: "Ruby Red", color: "#9b1b30" },
  { id: "grey", label: "Charcoal Grey", color: "#4a4a4a" },
  { id: "white", label: "Ivory White", color: "#f5f0e8" },
  { id: "brown", label: "Cognac Brown", color: "#8b5e34" },
];

const defaultMaterials: ConfigOption[] = [
  { id: "premium-leather", label: "Premium Leather", image: "leather" },
  { id: "nappa-leather", label: "Nappa Leather", image: "nappa" },
  { id: "alcantara", label: "Alcantara", image: "alcantara" },
  { id: "carbon-fiber", label: "Carbon Fiber", image: "carbon" },
  { id: "fabric", label: "Lacoste Fabric", image: "fabric" },
];

const defaultStitches: ConfigOption[] = [
  { id: "black", label: "Black", color: "#1a1a1a" },
  { id: "white", label: "White", color: "#ffffff" },
  { id: "red", label: "Red", color: "#dc2626" },
  { id: "gold", label: "Gold", color: "#D08C3C" },
  { id: "blue", label: "Blue", color: "#2563eb" },
  { id: "orange", label: "Orange", color: "#ea580c" },
];

export function ProductConfigurator({
  productTitle,
  productId,
  colors = defaultColors,
  materials = defaultMaterials,
  stitches = defaultStitches,
  defaultColor,
  defaultMaterial,
  defaultStitch,
}: ProductConfiguratorProps) {
  const [selectedColor, setSelectedColor] = useState(defaultColor || colors[0]?.id);
  const [selectedMaterial, setSelectedMaterial] = useState(defaultMaterial || materials[0]?.id);
  const [selectedStitch, setSelectedStitch] = useState(defaultStitch || stitches[0]?.id);

  const activeColor = colors.find((c) => c.id === selectedColor);
  const activeMaterial = materials.find((m) => m.id === selectedMaterial);
  const activeStitch = stitches.find((s) => s.id === selectedStitch);

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in customizing: ${productTitle}.\n` +
    `- Color: ${activeColor?.label || "—"}\n` +
    `- Material: ${activeMaterial?.label || "—"}\n` +
    `- Stitching: ${activeStitch?.label || "—"}\n` +
    `Can you tell me more about pricing and fitment for my vehicle?`,
  );

  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6 shadow-ambient">
      <h3 className="text-sm font-bold text-foreground mb-5 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">
          1
        </span>
        Customize Your Order
      </h3>

      {/* Color */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
          Color
        </label>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((c) => (
            <Swatch
              key={c.id}
              option={c}
              selected={selectedColor === c.id}
              onSelect={() => setSelectedColor(c.id)}
            />
          ))}
        </div>
      </div>

      {/* Material */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
          Material
        </label>
        <div className="flex flex-wrap gap-2">
          {materials.map((m) => (
            <OptionChip
              key={m.id}
              option={m}
              selected={selectedMaterial === m.id}
              onSelect={() => setSelectedMaterial(m.id)}
            />
          ))}
        </div>
      </div>

      {/* Stitching */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
          Stitching Color
        </label>
        <div className="flex flex-wrap gap-2.5">
          {stitches.map((s) => (
            <Swatch
              key={s.id}
              option={s}
              selected={selectedStitch === s.id}
              onSelect={() => setSelectedStitch(s.id)}
            />
          ))}
        </div>
      </div>

      {/* Selection Summary */}
      <div className="mb-5 p-3 rounded-lg bg-secondary/60 border border-border text-xs space-y-1.5">
        <div className="flex justify-between text-muted-foreground">
          <span>Color</span>
          <span className="font-medium text-foreground">{activeColor?.label || "—"}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Material</span>
          <span className="font-medium text-foreground">{activeMaterial?.label || "—"}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Stitching</span>
          <span className="font-medium text-foreground">{activeStitch?.label || "—"}</span>
        </div>
      </div>

      {/* CTA */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 px-5 rounded-xl text-sm font-semibold hover:bg-[#22c35e] transition-all duration-200 active:scale-[0.98] shadow-sm"
      >
        <MessageCircle className="h-4 w-4" />
        Inquire with Customization
      </a>
      <p className="text-center text-[10px] text-muted-foreground mt-2">
        Your selections will be included in the WhatsApp message
      </p>
    </div>
  );
}
