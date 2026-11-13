import type { ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageContext } from '@/contexts/language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useLanguage();
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}
