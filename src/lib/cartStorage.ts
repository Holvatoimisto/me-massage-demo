import type { CartItem } from '@/contexts/cart';
import { isKnownShopProductId } from '@/data/shop';

export const CART_STORAGE_VERSION = 1 as const;

interface CartStorage {
  version: typeof CART_STORAGE_VERSION;
  items: CartItem[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isCartItem(value: unknown): value is CartItem {
  if (!isRecord(value)) return false;

  return (
    typeof value.lineId === 'string' &&
    value.lineId.length > 0 &&
    typeof value.productId === 'number' &&
    isKnownShopProductId(value.productId) &&
    (value.type === 'gift' || value.type === 'open' || value.type === 'series') &&
    (value.recipientType === 'gift' || value.recipientType === 'self') &&
    typeof value.label === 'string' &&
    Array.isArray(value.details) &&
    value.details.every((detail) => typeof detail === 'string') &&
    typeof value.price === 'number' &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    typeof value.qty === 'number' &&
    Number.isInteger(value.qty) &&
    value.qty > 0 &&
    (value.recipientName === undefined || typeof value.recipientName === 'string') &&
    (value.cardLanguage === 'fi' || value.cardLanguage === 'sv' || value.cardLanguage === 'en')
  );
}

function validateItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isCartItem);
}

export function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    // Accept a legacy array only when each retained line already satisfies the
    // complete current schema. Missing recipientType is invalidated, not guessed.
    if (Array.isArray(parsed)) return validateItems(parsed);

    if (!isRecord(parsed) || parsed.version !== CART_STORAGE_VERSION) return [];
    return validateItems(parsed.items);
  } catch {
    return [];
  }
}

export function serializeCart(items: CartItem[]): string {
  const storage: CartStorage = {
    version: CART_STORAGE_VERSION,
    items,
  };
  return JSON.stringify(storage);
}
