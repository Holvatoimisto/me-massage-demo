import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { businessInfo } from '@/data/site';
import { locations } from '@/data/locations';
import { buildCanonicalUrl, DEFAULT_OG_IMAGE, PRODUCTION_ORIGIN } from '@/lib/seo';

interface PageSeoProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;
}

export function PageSeo({ title, description, canonicalPath, noIndex = false }: PageSeoProps) {
  const { pathname } = useLocation();
  const canonicalUrl = buildCanonicalUrl(canonicalPath ?? pathname);

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={businessInfo.name} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {!noIndex && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
    </Helmet>
  );
}

export function BusinessStructuredData() {
  const localBusinesses = locations.map((location) => {
    const [postalCode, ...localityParts] = location.addressLines[1].split(' ');
    return {
      '@type': 'LocalBusiness',
      '@id': `${PRODUCTION_ORIGIN}/toimipisteet/${location.slug}#business`,
      name: `${businessInfo.name} ${location.name}`,
      url: `${PRODUCTION_ORIGIN}/toimipisteet/${location.slug}`,
      telephone: businessInfo.phone,
      email: location.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.addressLines[0],
        postalCode,
        addressLocality: localityParts.join(' '),
      },
    };
  });

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({ '@context': 'https://schema.org', '@graph': localBusinesses })}
      </script>
    </Helmet>
  );
}
