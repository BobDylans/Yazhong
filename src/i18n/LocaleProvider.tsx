"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import en from "./en";
import ar from "./ar";

export type Locale = "en" | "ar";

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  isRTL: boolean;
}

const translations: Record<Locale, Record<string, string>> = { en, ar };

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
  dir: "ltr",
  isRTL: false,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Lazy init: read localStorage during first render (SSR-safe via typeof window check).
  // Avoids the setState-in-effect anti-pattern that triggers cascading renders.
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("yazhong-locale") as Locale | null;
    return saved === "en" || saved === "ar" ? saved : "en";
  });

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("yazhong-locale", l);
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  };

  const t = (key: string): string => {
    return translations[locale]?.[key] ?? translations["en"]?.[key] ?? key;
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        t,
        dir: locale === "ar" ? "rtl" : "ltr",
        isRTL: locale === "ar",
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
