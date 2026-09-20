import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, ShoppingBag } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useBookingModal } from '@/contexts/BookingModalContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { businessInfo, navigationInfo } from '@/data/site';

const getServiceDropdownItems = (tStr: (p: string) => string) => [
  { label: tStr('services.primary.classic.title'), href: '/palvelut/hieronta' },
  { label: tStr('services.primary.hotStone.title'), href: '/palvelut/kuumakivihieronta' },
  { label: tStr('services.jaw'), href: '/palvelut/purentalihashieronta' },
  { label: tStr('services.iastm'), href: '/palvelut/faskiarautakasittely' },
];

export function Header() {
  const { lang, setLang, tStr } = useLang();
  const { count } = useCart();
  const { openBookingModal } = useBookingModal();
  const { pathname } = useLocation();
  const langRef = useRef<HTMLDivElement>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useClickOutside(langRef, () => setLangOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = pathname === '/';
  const isAbout = pathname === '/meista';
  // Homepage hero top state: translucent premium glass header + oversized
  // logo. Everything else (scrolled homepage, all subpages) uses the stable
  // dark navy surface and normal logo.
  const isHomeTop = isHome && !scrolled;
  const isServices = pathname.startsWith('/palvelut');
  const isPricing = pathname === '/hinnasto';
  const isContact = pathname === '/yhteystiedot';
  const isShop = pathname.startsWith('/verkkokauppa');

  const navLinkClass = (active: boolean) =>
    `font-inter text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 whitespace-nowrap ${
      active ? 'text-white underline underline-offset-[6px] decoration-white/50' : 'text-white/90 hover:text-white'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#152238]/95 shadow-[0_1px_12px_rgba(0,0,0,0.18)]">
      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 min-[1200px]:pl-28 min-[1200px]:pr-12 h-[60px] md:h-[68px] flex items-center justify-between">
        {/* Spacer keeps the flex geometry identical to the old in-flow logo, so
            nav link positions never change. Both logo layers below are absolute
            and anchored to the container's left content edge — the same x line
            the homepage hero content column uses (logo acts as the hero's brand
            anchor). */}
        <div className="h-9 md:h-10 w-9 md:w-10 xl:w-[110px] shrink-0" aria-hidden="true" />
        <Link to="/" className="absolute left-5 md:left-10 min-[1200px]:left-28 top-1/2 -translate-y-1/2 z-10">
          <img
            src={navigationInfo.logo}
            alt={businessInfo.name}
            className={`h-9 md:h-10 w-auto transition-opacity duration-300 ease-out ${
              isHomeTop ? 'md:opacity-0' : 'opacity-100'
            }`}
          />
        </Link>

        {/* Homepage hero top state (desktop only): oversized brand mark anchored
            to the header container's bottom edge — the header baseline cuts the
            logo at the ME / MASSAGE boundary (~58% of the square asset), so
            "ME" reads as part of the header while "MASSAGE" overlaps the hero.
            transform-origin sits exactly on the small logo's top-left point in
            this layer's coordinates, so shrinking never moves it sideways. */}
        <img
          src={navigationInfo.logo}
          alt=""
          aria-hidden="true"
          className={`hidden md:block absolute left-5 md:left-10 min-[1200px]:left-28 bottom-[-44px] w-[104px] h-[104px] pointer-events-none transition-all duration-300 ease-out origin-[0px_10px] ${
            isHomeTop ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.385]'
          }`}
        />

        {/* Desktop nav — centered in the space between the fixed left (logo)
            and right (language + CTA) areas. Shown from xl up: below that the
            link set no longer fits balanced, so the mobile menu takes over. */}
        <div className="hidden xl:flex flex-1 items-center justify-center gap-4 2xl:gap-5">
          {/* Etusivu */}
          <Link to="/" className={navLinkClass(isHome)}>
            Etusivu
          </Link>

          {/* Palvelut dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={`flex items-center gap-1 bg-transparent border-none cursor-pointer ${navLinkClass(isServices)}`}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Palvelut
              <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-1 w-[240px] bg-[#1E3A5F] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.28)] border border-white/10 py-2 overflow-hidden"
              >
                {getServiceDropdownItems(tStr).map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block px-4 py-2.5 font-inter text-[13px] text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors duration-200"
                    onClick={() => setServicesOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-white/10 mt-1 pt-1">
                  <Link
                    to="/palvelut"
                    className="block px-4 py-2.5 font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-white/80 hover:text-white transition-colors duration-200"
                    onClick={() => setServicesOpen(false)}
                  >
                    {tStr('nav.allServices')} →
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Hinnasto */}
          <Link to="/hinnasto" className={navLinkClass(isPricing)}>
            Hinnasto
          </Link>

          {/* Meistä */}
          <Link to="/meista" className={navLinkClass(isAbout)}>
            {tStr('nav.about')}
          </Link>

          {/* Yhteystiedot */}
          <Link to="/yhteystiedot" className={navLinkClass(isContact)}>
            Yhteystiedot
          </Link>

          {/* Kauppa */}
          <Link to="/verkkokauppa" className={`${navLinkClass(isShop)} flex items-center gap-1.5`}>
            <ShoppingBag size={14} strokeWidth={1.5} />
            {tStr('nav.shop')}{count > 0 ? ` · ${count}` : ''}
          </Link>

          <span className="h-4 w-px bg-white/10" aria-hidden="true" />

          {/* Extra links */}
          {navigationInfo.extraLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={navLinkClass(active)}
              >
                {tStr(`nav.${link.key}`)}
              </Link>
            );
          })}
        </div>

        {/* Right actions — language + CTA stay in their fixed position */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          {/* Language selector */}
          <div ref={langRef} className="relative hidden lg:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 font-inter text-[13px] font-semibold uppercase tracking-[0.06em] text-white/80 hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer whitespace-nowrap"
            >
              <Globe size={14} strokeWidth={1.5} />
              {lang === 'fi' ? 'FI' : lang === 'en' ? 'EN' : 'SV'}
            </button>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-1 w-[52px] bg-[#1E3A5F] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.28)] border border-white/10 py-1.5 overflow-hidden"
              >
                {[
                  { code: 'fi' as const, label: 'FI' },
                  { code: 'en' as const, label: 'EN' },
                  { code: 'sv' as const, label: 'SV' },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`block w-full text-left px-3 py-1.5 font-inter text-[12px] transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                      l.code === lang
                        ? 'text-[#FFFFFF] font-semibold'
                        : 'text-[#FFFFFF]/50 hover:text-[#FFFFFF]/80'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => openBookingModal()}
            className={`inline-flex min-h-[40px] items-center justify-center px-5 py-2 rounded-md font-inter text-[13px] font-semibold tracking-[0.06em] leading-none whitespace-nowrap transition-all duration-300 cursor-pointer border ${
              isHomeTop
                ? 'bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20'
                : 'bg-white text-[#152238] hover:bg-[#E2E8F0] shadow-sm border-transparent'
            }`}
          >
            {navigationInfo.ctaButton.label}
          </button>
        </div>

        {/* Mobile: language + menu buttons */}
        <div className="xl:hidden flex items-center gap-2 relative z-10">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-0.5 font-inter text-[11px] font-semibold uppercase tracking-wider text-[#FFFFFF]/70 bg-transparent border-none cursor-pointer px-1.5 py-1"
          >
            <Globe size={16} strokeWidth={1.5} />
            {lang === 'fi' ? 'FI' : lang === 'en' ? 'EN' : 'SV'}
          </button>
          {langOpen && (
            <div className="absolute top-full right-8 mt-1 w-[52px] bg-[#1E3A5F] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.28)] border border-white/10 py-1.5 overflow-hidden">
              {[
                { code: 'fi' as const, label: 'FI' },
                { code: 'en' as const, label: 'EN' },
                { code: 'sv' as const, label: 'SV' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setLangOpen(false); }}
                  className={`block w-full text-left px-3 py-1.5 font-inter text-[12px] transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                    l.code === lang
                      ? 'text-[#FFFFFF] font-semibold'
                      : 'text-[#FFFFFF]/50 hover:text-[#FFFFFF]/80'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#FFFFFF] transition-colors bg-transparent border-none cursor-pointer"
            aria-label={mobileOpen ? 'Sulje valikko' : 'Avaa valikko'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden absolute top-full left-0 right-0 bg-[#152238] border-t border-white/[0.08] px-5 py-6"
        >
          <Link to="/" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#E2E8F0]/[0.06]">{tStr('nav.home')}</Link>

          {/* Mobile services dropdown */}
          <div className="border-b border-[#E2E8F0]/[0.06]">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between py-3 font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 bg-transparent border-none cursor-pointer"
            >
              <span>{tStr('nav.services')}</span>
              <ChevronDown size={16} strokeWidth={1.5} className={`text-[#FFFFFF]/50 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pb-3 pl-3">
                {getServiceDropdownItems(tStr).map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block py-2 font-inter text-[13px] text-[#FFFFFF]/70 hover:text-[#E2E8F0] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/palvelut" onClick={() => setMobileOpen(false)} className="block py-2 font-inter text-[12px] font-semibold uppercase tracking-wider text-[#FFFFFF]/70">{tStr('nav.allServices')} →</Link>
              </div>
            )}
          </div>

          <Link to="/hinnasto" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#E2E8F0]/[0.06]">{tStr('nav.pricing')}</Link>
          <Link to="/meista" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#E2E8F0]/[0.06]">{tStr('nav.about')}</Link>
          <Link to="/yhteystiedot" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#E2E8F0]/[0.06]">{tStr('nav.contact')}</Link>
          <Link to="/verkkokauppa" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#E2E8F0]/[0.06]">
            <ShoppingBag size={15} strokeWidth={1.5} />
            {tStr('nav.webshop')}{count > 0 ? ` · ${count}` : ''}
          </Link>

          {navigationInfo.extraLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-inter text-[14px] text-[#FFFFFF]/60 py-3 border-b border-[#E2E8F0]/[0.06] last:border-0"
            >
              {tStr(`nav.${link.key}`)}
            </Link>
          ))}

          {/* Mobile language selector */}
          <div className="mt-4 pt-4 border-t border-[#E2E8F0]/[0.06] flex items-center justify-center gap-1">
            <Globe size={14} strokeWidth={1.5} className="text-[#FFFFFF]/40 mr-1" />
            {[
              { code: 'fi' as const, label: 'Suomi' },
              { code: 'en' as const, label: 'English' },
              { code: 'sv' as const, label: 'Svenska' },
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`font-inter text-[13px] px-2.5 py-1.5 rounded transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                  l.code === lang
                    ? 'text-[#FFFFFF] font-semibold'
                    : 'text-[#FFFFFF]/40 hover:text-[#FFFFFF]/70'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="mt-3">
            <button
              onClick={() => { setMobileOpen(false); openBookingModal(); }}
              className="inline-flex min-h-[40px] items-center justify-center w-full px-5 py-2 rounded-md font-inter text-[14px] font-semibold tracking-wide leading-none whitespace-nowrap bg-white text-[#152238] hover:bg-[#E2E8F0] transition-colors duration-300 shadow-sm cursor-pointer border-none"
            >
              {navigationInfo.ctaButton.label}
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
