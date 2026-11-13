import type { CartItem } from '@/contexts/cart';
import { isKnownShopProductId } from '@/data/shop';

export const CHECKOUT_PAYLOAD_VERSION = 1 as const;
export const MAX_RECIPIENT_NAME_LENGTH = 120;

export type CheckoutItemType = 'gift' | 'open' | 'series';
export type CheckoutRecipientType = 'gift' | 'self';
export type CheckoutCardLanguage = 'fi' | 'sv' | 'en';

export interface CheckoutItem {
  productId: number;
  quantity: number;
  itemType: CheckoutItemType;
  recipientType: CheckoutRecipientType;
  recipientName?: string;
  cardLanguage: CheckoutCardLanguage;
}

export interface CheckoutPayload {
  version: typeof CHECKOUT_PAYLOAD_VERSION;
  items: CheckoutItem[];
}

function isItemType(value: unknown): value is CheckoutItemType {
  return value === 'gift' || value === 'open' || value === 'series';
}

function isRecipientType(value: unknown): value is CheckoutRecipientType {
  return value === 'gift' || value === 'self';
}

function isCardLanguage(value: unknown): value is CheckoutCardLanguage {
  return value === 'fi' || value === 'sv' || value === 'en';
}

export function createCheckoutPayload(items: CartItem[]): CheckoutPayload {
  const checkoutItems = items.map((item): CheckoutItem => {
    if (!isKnownShopProductId(item.productId)) {
      throw new Error(`Unknown shop product ID: ${item.productId}`);
    }
    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new Error('Cart quantity must be a positive integer.');
    }
    if (!isItemType(item.type)) {
      throw new Error('Invalid checkout item type.');
    }
    if (!isRecipientType(item.recipientType)) {
      throw new Error('Invalid checkout recipient type.');
    }
    if (!isCardLanguage(item.cardLanguage)) {
      throw new Error('Invalid checkout card language.');
    }

    const recipientName = item.recipientName?.trim();
    if (recipientName && recipientName.length > MAX_RECIPIENT_NAME_LENGTH) {
      throw new Error(`Recipient name must be at most ${MAX_RECIPIENT_NAME_LENGTH} characters.`);
    }

    return {
      productId: item.productId,
      quantity: item.qty,
      itemType: item.type,
      recipientType: item.recipientType,
      ...(recipientName ? { recipientName } : {}),
      cardLanguage: item.cardLanguage,
    };
  });

  return {
    version: CHECKOUT_PAYLOAD_VERSION,
    items: checkoutItems,
  };
}
