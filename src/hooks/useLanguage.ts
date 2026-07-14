import { useState, useCallback } from 'react';
import { translations, type Language } from '@/i18n/translations';

const STORAGE_KEY = 'me-massage-lang';

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored && translations[stored]) return stored;
    }
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === 'sv') return 'sv';
    if (browserLang === 'en') return 'en';
    return 'fi';
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  }, []);

  const t = useCallback(
    (path: string): string | string[] | Record<string, string> | Array<Record<string, string>> => {
      const keys = path.split('.');
      let current: unknown = translations[lang];
      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = (current as Record<string, unknown>)[key];
        } else {
          // Fallback to Finnish
          let fallback: unknown = translations['fi'];
          for (const k of keys) {
            if (fallback && typeof fallback === 'object' && k in fallback) {
              fallback = (fallback as Record<string, unknown>)[k];
            } else {
              return path;
            }
          }
          return fallback as string;
        }
      }
      return current as string | string[] | Record<string, string> | Array<Record<string, string>>;
    },
    [lang]
  );

  // Helper to get a string with variable replacement
  const tStr = useCallback(
    (path: string, vars?: Record<string, string>): string => {
      const value = t(path);
      let str = typeof value === 'string' ? value : String(value);
      if (vars) {
        Object.entries(vars).forEach(([key, val]) => {
          str = str.replace(new RegExp(`{${key}}`, 'g'), val);
        });
      }
      return str;
    },
    [t]
  );

  // Helper to get array of objects (for reviews, FAQ items, etc.)
  const tArr = useCallback(
    <T extends Record<string, unknown>>(path: string): T[] => {
      const value = t(path);
      return Array.isArray(value) ? (value as T[]) : [];
    },
    [t]
  );

  return { lang, setLang, t, tStr, tArr };
}
