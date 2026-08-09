import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { businessInfo, footerColumns } from '@/data/site';
import { locations } from '@/data/locations';

export function Footer() {
  const { tStr } = useLang();

  return (
    <footer id="yhteystiedot" className="bg-[#152238] pt-14 md:pt-16 pb-10 md:pb-12 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10">
          <div>
            <h3 className="font-cormorant text-[18px] text-white mb-1">{businessInfo.name}</h3>
            <p className="font-inter text-[13px] text-[#94A3B8] mb-4">{businessInfo.tagline}</p>
            <ul className="space-y-2">
              <li className="font-inter text-[14px] text-[#94A3B8] flex items-center gap-2">
                <MapPin size={14} className="shrink-0" /> {businessInfo.address}
              </li>
              <li>
                <a href={businessInfo.phoneLink} className="font-inter text-[14px] text-[#94A3B8] hover:text-white transition-colors flex items-center gap-2 no-underline">
                  <Phone size={14} className="shrink-0" /> {businessInfo.phone}
                </a>
              </li>
              <li>
                <a href={businessInfo.emailLink} className="font-inter text-[14px] text-[#94A3B8] hover:text-white transition-colors flex items-center gap-2 no-underline">
                  <Mail size={14} className="shrink-0" /> {businessInfo.email}
                </a>
              </li>
            </ul>
          </div>
          {footerColumns.map((col, i) => (
            <div key={i}>
              <h4 className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-4">{tStr(`footer.${col.title === 'Palvelut' ? 'services' : col.title === 'Yritys' ? 'company' : 'contact'}`)}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="font-inter text-[14px] text-[#94A3B8] hover:text-white transition-colors no-underline">{link.label}</Link>
                    ) : (
                      <a href={link.href} className="font-inter text-[14px] text-[#94A3B8] hover:text-white transition-colors no-underline">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Google Maps */}
        <div className="border-t border-[#E2E8F0]/[0.06] pt-10 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc) => (
              <div key={loc.slug}>
                <p className="font-inter text-[12px] font-semibold uppercase tracking-wider text-[#FFFFFF]/80 mb-3">{tStr(`footer.maps.${loc.slug}`)}</p>
                <p className="font-inter text-[13px] text-[#94A3B8] mb-3">{loc.slug === 'klaukkala' ? tStr('footer.klaukkala') : tStr('footer.maps.vaasaAddress')}</p>
                <div className="rounded-lg overflow-hidden border border-[#E2E8F0]/[0.08]" style={{ filter: 'grayscale(25%) contrast(95%) brightness(90%)' }}>
                  <iframe
                    src={loc.mapEmbedSrc}
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`ME massage ${loc.name}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E2E8F0]/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-inter text-[12px] text-[#94A3B8]/70">{tStr('footer.copyright')}</p>
          <p className="font-inter text-[12px] text-[#94A3B8]/70">{tStr('footer.paymentMethods')}</p>
          <div className="flex gap-4">
            <a href={businessInfo.instagramUrl} className="text-[#94A3B8]/70 hover:text-white transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
            <a href={businessInfo.facebookUrl} className="text-[#94A3B8]/70 hover:text-white transition-colors"><Facebook size={18} strokeWidth={1.5} /></a>
            <a href={businessInfo.phoneLink} className="text-[#94A3B8]/70 hover:text-white transition-colors"><Phone size={18} strokeWidth={1.5} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
