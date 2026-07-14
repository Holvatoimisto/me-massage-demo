import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ChiropractorTemplate } from '@/ChiropractorTemplate';
import { ServicePageTemplate } from '@/pages/ServicePageTemplate';
import { FAQPage } from '@/pages/FAQPage';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<ChiropractorTemplate />} />
            <Route path="/palvelut/:slug" element={<ServicePageTemplate />} />
            <Route path="/usein-kysyttya" element={<FAQPage />} />
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
