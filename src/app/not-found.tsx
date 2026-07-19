"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { LinkCTA } from "@/components/LinkCTA";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      {/* Ambient gold glow — on-brand signature backdrop */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/8 blur-[120px]" />

      <div className="max-w-md">
        {/* Big 404 in display serif */}
        <div
          className="font-heading text-[120px] md:text-[160px] font-bold leading-none tracking-tight bg-warm-gradient bg-clip-text text-transparent"
        >
          {t("notFoundCode")}
        </div>
        <h1 className="font-heading mt-4 text-2xl md:text-3xl font-bold text-foreground">
          {t("notFoundTitle")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {t("notFoundDesc")}
        </p>

        <div className="mt-8">
          <LinkCTA href="/" labelKey="notFoundCta" variant="solid" />
        </div>
      </div>
    </main>
  );
}
