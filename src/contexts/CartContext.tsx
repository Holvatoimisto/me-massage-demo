import { useCallback, useEffect, useMemo, useState } from 'react';
import { parseStoredCart, serializeCart } from '@/lib/cartStorage';
import { CartContext, type CartContextValue, type CartItem } from '@/contexts/cart';

// Local cart for the new webshop frontend. Items carry the exact WooCommerce
// product IDs from src/data/shop.ts, so a future WooCommerce/Ajas checkout
// integration can submit this cart without reshaping it. Persisted to
// localStorage. No backend communication happens yet.

const STORAGE_KEY = 'me-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return parseStoredCart(localStorage.getItem(STORAGE_KEY));
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, serializeCart(items));
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
