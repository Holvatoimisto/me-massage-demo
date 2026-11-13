import { createContext, useContext } from 'react';
import type { Language } from '@/i18n/translations';

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => string | string[] | Record<string, string> | Array<Record<string, string>>;
  tStr: (path: string, vars?: Record<string, string>) => string;
  tArr: <T extends Record<string, unknown>>(path: string) => T[];
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLang(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
}
