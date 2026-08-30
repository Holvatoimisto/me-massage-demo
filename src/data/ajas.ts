// Centralized Ajas nettivaraus deep-link data.
// Service IDs and office IDs verified against the live public Ajas API
// (nettivaraus6.ajas.fi/api/nv_api.php) and by browser-testing the resulting
// URLs. One source of truth — do not hardcode these values in components.

export type AjasLocale = 'fi' | 'sv' | 'en';
export type ServiceKey = 'classic' | 'hotStone' | 'jaw' | 'iastm';

export const AJAS_COMPANY_ID = 'b1b0cf6443b6';

export interface AjasDurationOption {
  duration: number;
  price: number;
  serviceId: number;
}

/** Bookable service+duration combinations per ME massage service. */
export const ajasServiceDurations: Record<ServiceKey, AjasDurationOption[]> = {
  classic: [
    { duration: 20, price: 35, serviceId: 13 },
    { duration: 50, price: 60, serviceId: 14 },
    { duration: 80, price: 75, serviceId: 15 },
    { duration: 110, price: 95, serviceId: 16 },
  ],
  hotStone: [
    { duration: 50, price: 70, serviceId: 33 },
    { duration: 80, price: 85, serviceId: 18 },
  ],
  // Questionnaire funnel intentionally offers only 50 min for jaw massage:
  // the 110 min variant (id 38) exists in Klaukkala only and would create
  // location inconsistency.
  jaw: [{ duration: 50, price: 70, serviceId: 20 }],
  iastm: [
    { duration: 20, price: 50, serviceId: 32 },
    { duration: 50, price: 75, serviceId: 34 },
    { duration: 80, price: 95, serviceId: 35 },
    { duration: 110, price: 110, serviceId: 36 },
  ],
};

export function buildAjasBookingUrl(options: {
  locale: AjasLocale;
  officeId: number;
  serviceKey?: ServiceKey;
  duration?: number;
}): string {
  const { locale, officeId, serviceKey, duration } = options;
  const base = `https://nettivaraus6.ajas.fi/${locale}/${AJAS_COMPANY_ID}?offices=${officeId}`;
  if (!serviceKey) return base;
  const optionsForService = ajasServiceDurations[serviceKey];
  const match = optionsForService.find((o) => o.duration === duration) ?? optionsForService[0];
  return `${base}&service_class=1&services=${match.serviceId}`;
}
