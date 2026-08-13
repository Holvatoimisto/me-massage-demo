import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Local cart for the new webshop frontend. Items carry the exact WooCommerce
// product IDs from src/data/shop.ts, so a future WooCommerce/Ajas checkout
// integration can submit this cart without reshaping it. Persisted to
// localStorage. No backend communication happens yet.

export interface CartItem {
  /** Unique line id (productId + recipient + language combo). */
  lineId: string;
  /** WooCommerce product ID this line maps to. */
  productId: number;
  type: 'gift' | 'open' | 'series';
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

interface CartContextValue {
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

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'me-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — cart still works in memory
    }
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, 'qty'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === item.lineId);
      if (existing) {
        return prev.map((i) => (i.lineId === item.lineId ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
  }, []);

  const setQty = useCallback((lineId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.lineId !== lineId)
        : prev.map((i) => (i.lineId === lineId ? { ...i, qty } : i)),
    );
  }, []);

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((sum, i) => sum + i.qty, 0),
    total: items.reduce((sum, i) => sum + i.qty * i.price, 0),
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    setQty,
  }), [items, isOpen, addItem, removeItem, setQty]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
