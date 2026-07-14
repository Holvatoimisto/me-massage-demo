import { createContext, useContext, type ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import type { Language } from '@/i18n/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => string | string[] | Record<string, string> | Array<Record<string, string>>;
  tStr: (path: string, vars?: Record<string, string>) => string;
  tArr: <T extends Record<string, unknown>>(path: string) => T[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useLanguage();
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
