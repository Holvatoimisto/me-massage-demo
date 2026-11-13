import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useLang } from '@/contexts/language';
import { businessInfo, footerColumns, locationPhoneContacts } from '@/data/site';
import { locations, localizedLocation } from '@/data/locations';

export function Footer() {
  const { tStr } = useLang();

  return (
    <footer id="yhteystiedot" className="bg-[#152238] pt-14 md:pt-16 pb-10 md:pb-12 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 mb-10">
          <div className="flex items-center justify-between gap-4 sm:block">
            <div>
              <h3 className="font-cormorant text-[18px] text-white mb-1">{businessInfo.name}</h3>
              <p className="font-inter text-[13px] text-[#94A3B8]">{tStr('footer.tagline')}</p>
            </div>
            {/* KHL logo — mobile: right of the brand text; sm+: beneath it */}
            <img
              src="/assets/koulutettujenhierojienliitto.jfif"
              alt="Koulutettujen Hierojien Liitto"
              loading="lazy"
              className="w-11 h-11 sm:w-28 sm:h-28 sm:mt-5 rounded-full border border-white/15 bg-white object-cover shrink-0"
            />
          </div>
          {locations.map((loc) => {
            const phoneGroup = locationPhoneContacts.find((group) => group.location === loc.name);
            const localized = localizedLocation(loc.slug, tStr);
            return (
              <div key={loc.slug}>
                <h4 className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-4">{localized.name}</h4>
                <ul className="space-y-2">
                  <li className="font-inter text-[14px] text-[#94A3B8] flex items-center gap-2">
                    <MapPin size={14} className="shrink-0" /> {localized.address}
                  </li>
                  <li>
                    <a href={`mailto:${loc.email}`} className="font-inter text-[14px] text-[#94A3B8] hover:text-white transition-colors flex items-center gap-2 no-underline">
                      <Mail size={14} className="shrink-0" /> {loc.email}
                    </a>
                  </li>
                  {phoneGroup?.people.map((person) => (
                    <li key={`${loc.slug}-${person.name}`}>
                      <a href={person.phoneLink} className="font-inter text-[14px] text-[#94A3B8] hover:text-white transition-colors flex items-center gap-2 no-underline">
                        <Phone size={14} className="shrink-0" />
                        <span className="text-white/85">{person.name}</span>
                        <span>{person.phone}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {footerColumns.map((col) => (
            <div key={col.titleKey}>
              <h4 className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-4">{tStr(col.titleKey)}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="font-inter text-[14px] text-[#94A3B8] hover:text-white transition-colors no-underline">{tStr(link.labelKey)}</Link>
                    ) : (
                      <a href={link.href} className="font-inter text-[14px] text-[#94A3B8] hover:text-white transition-colors no-underline">{tStr(link.labelKey)}</a>
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
                    title={`ME massage ${localizedLocation(loc.slug, tStr).name}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E2E8F0]/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-inter text-[12px] text-[#94A3B8]/70">{tStr('footer.copyright')}</p>
          <div className="flex items-center gap-4 font-inter text-[12px] text-[#94A3B8]/70">
            <Link to="/tietosuojan-kuvaus" className="hover:text-white transition-colors no-underline">Tietosuojan kuvaus</Link>
            <Link to="/varausehdot" className="hover:text-white transition-colors no-underline">Varausehdot</Link>
          </div>
          <p className="font-inter text-[12px] text-[#94A3B8]/70">{tStr('footer.paymentMethods')}</p>
          <div className="flex gap-4">
            <a href={businessInfo.instagramUrl} aria-label="Instagram" className="text-[#94A3B8]/70 hover:text-white transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
            <a href={businessInfo.facebookUrl} aria-label="Facebook" className="text-[#94A3B8]/70 hover:text-white transition-colors"><Facebook size={18} strokeWidth={1.5} /></a>
            <a href={businessInfo.phoneLink} aria-label="Soita ME Massagelle" className="text-[#94A3B8]/70 hover:text-white transition-colors"><Phone size={18} strokeWidth={1.5} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
