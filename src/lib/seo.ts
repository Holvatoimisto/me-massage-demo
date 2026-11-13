export const PRODUCTION_ORIGIN = 'https://memassage.fi';
export const DEFAULT_OG_IMAGE = `${PRODUCTION_ORIGIN}/assets/hero-kuva-muokattu.png`;

export function buildCanonicalUrl(pathname: string): string {
  const pathWithoutQueryOrHash = pathname.split(/[?#]/, 1)[0] || '/';
  const leadingSlashPath = pathWithoutQueryOrHash.startsWith('/')
    ? pathWithoutQueryOrHash
    : `/${pathWithoutQueryOrHash}`;
  const normalizedPath = leadingSlashPath === '/' ? '/' : leadingSlashPath.replace(/\/+$/, '');
  return `${PRODUCTION_ORIGIN}${normalizedPath}`;
}
