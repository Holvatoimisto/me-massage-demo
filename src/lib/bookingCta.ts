/**
 * Shared visual styles for booking CTAs ("Varaa aika" buttons and direct
 * Klaukkala/Vaasa booking links). Two context variants — the surrounding
 * surface decides which one is used.
 *
 * Surface-only: geometry (size, padding, width, radius) stays
 * context-specific at each call site.
 */

/**
 * For dark surfaces (hero image, navy Final CTA sections, dark image heroes).
 * The old elegant transparent glass: the dark background shows through and
 * gives the button its base color — no separate opaque navy rectangle.
 */
export const bookingGlassOnDarkClasses =
  'bg-[#152238]/55 backdrop-blur-md text-white border border-white/20 shadow-[0_8px_28px_rgba(0,0,0,0.25)] hover:bg-[#152238]/75 transition-colors duration-300';

/**
 * For light surfaces (white/off-white sections, pricing, contact cards,
 * booking modal). Strong enough dark navy base that the light background
 * cannot wash the button out, with a subtle glass layer on top.
 */
export const bookingPrimaryOnLightClasses =
  'bg-[#1E3A5F]/85 backdrop-blur-md text-white border border-white/25 shadow-[0_8px_28px_rgba(0,0,0,0.22)] hover:bg-[#1E3A5F] hover:border-white/40 hover:shadow-[0_10px_32px_rgba(0,0,0,0.28)] transition-all duration-300';
