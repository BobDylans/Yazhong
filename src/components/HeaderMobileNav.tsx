"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleProvider";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "./HeaderNavIcon";
import { navLinks, navIcons } from "./HeaderData";

export function MobileNavCard({ link, index }: { link: (typeof navLinks)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const { t } = useLocale();
  const icon = navIcons[link.key] || null;
  const isActive = pathname === link.href;
  const animationDelay = `${index * 50}ms`;

  const linkContent = (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group",
        isActive
          ? "bg-accent/10 text-accent font-semibold"
          : "text-foreground hover:bg-muted"
      )}
    >
      <NavIcon icon={icon} active={isActive} />
      <span className="text-sm font-medium">{t(link.key)}</span>
    </Link>
  );

  if (!link.children) {
    return (
      <div
        className="animate-in fade-in slide-in-from-right duration-300"
        style={{ animationDelay }}
      >
        {linkContent}
      </div>
    );
  }

  return (
    <div
      className="animate-in fade-in slide-in-from-right duration-300"
      style={{ animationDelay }}
    >
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all duration-200 group",
            expanded ? "bg-accent/10 text-accent" : "text-foreground hover:bg-muted"
          )}
        >
          <span className="flex items-center gap-4">
            <NavIcon icon={icon} active={expanded} />
            <span className="text-sm font-medium">{t(link.key)}</span>
          </span>
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200 shrink-0",
              expanded && "rotate-180"
            )}
          />
        </button>
        {expanded && (
          <div className="ltr:ml-14 rtl:mr-14 mt-1 mb-1 space-y-0.5">
            {link.children.map((child) => {
              const childIcon = navIcons[child.key] || null;
              return (
                <Link
                  key={child.key}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200",
                    pathname === child.href
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <NavIcon icon={childIcon} active={pathname === child.href} />
                  {t(child.key)}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}