import { createContext, useContext } from 'react';

export interface CartItem {
  /** Unique line id (productId + recipient + language combo). */
  lineId: string;
  /** WooCommerce product ID this line maps to. */
  productId: number;
  type: 'gift' | 'open' | 'series';
  recipientType: 'gift' | 'self';
  /** Display label, e.g. "Lahjakortti". */
  label: string;
  /** Meta lines, e.g. ["Klassinen hieronta · 50 min", "Saaja: Anna", "Kieli: Suomi"]. */
  details: string[];
  price: number;
  qty: number;
  /** Ajas customer choices preserved for the future integration. */
  recipientName?: string;
  cardLanguage?: 'fi' | 'sv' | 'en';
}

export interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
