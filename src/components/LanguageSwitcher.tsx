"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "ar" : "en")}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-accent transition-colors rounded-md hover:bg-muted"
      aria-label={t("langSwitch")}
    >
      <Globe className="size-3.5" />
      <span>{t("langSwitch")}</span>
    </button>
  );
}
