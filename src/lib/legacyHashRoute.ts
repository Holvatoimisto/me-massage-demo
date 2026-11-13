/**
 * Converts old HashRouter bookmarks (/#/hinnasto) into clean browser paths
 * before React Router starts. Normal section anchors such as /#oirekysely are
 * deliberately ignored.
 */
export function migrateLegacyHashRoute(): boolean {
  const { hash } = window.location;
  if (!hash.startsWith('#/')) return false;

  const cleanRoute = hash.slice(1);
  window.history.replaceState(window.history.state, '', cleanRoute);
  return true;
}
