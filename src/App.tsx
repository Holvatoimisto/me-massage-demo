import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ChiropractorTemplate } from '@/ChiropractorTemplate';
import { ServicePageTemplate } from '@/pages/ServicePageTemplate';
import { LocationPageTemplate } from '@/pages/LocationPageTemplate';
import { FAQPage } from '@/pages/FAQPage';
import { PalvelutPage } from '@/pages/PalvelutPage';
import { HinnastoPage } from '@/pages/HinnastoPage';
import { ReviewsPage } from '@/pages/ReviewsPage';
import { ContactPage } from '@/pages/ContactPage';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<ChiropractorTemplate />} />
            <Route path="/palvelut" element={<PalvelutPage />} />
            <Route path="/palvelut/:slug" element={<ServicePageTemplate />} />
            <Route path="/hinnasto" element={<HinnastoPage />} />
            <Route path="/asiakkaiden-kokemuksia" element={<ReviewsPage />} />
            <Route path="/yhteystiedot" element={<ContactPage />} />
            <Route path="/toimipisteet/:slug" element={<LocationPageTemplate />} />
            <Route path="/usein-kysyttya" element={<FAQPage />} />
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
