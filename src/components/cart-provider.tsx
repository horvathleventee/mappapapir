"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { cartTotal } from "@/lib/cart";
import { createCartStore } from "@/lib/cart-store";
import type { CartItem } from "@/lib/models";

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  hydrated: boolean;
  add: (item: CartItem) => void;
  addMany: (items: CartItem[]) => void;
  update: (key: string, quantity: number) => void;
  clear: () => void;
  storageError: boolean;
}
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createCartStore);
  const { items, hydrated, storageError } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  const add = (item: CartItem) => {
    store.add(item);
    setNotice("A termék a demókosárba került.");
  };
  const addMany = (incoming: CartItem[]) => {
    store.addMany(incoming);
    setNotice("A mintalista a demókosárba került.");
  };
  return (
    <CartContext.Provider
      value={{
        items,
        count: items.reduce((s, i) => s + i.quantity, 0),
        total: cartTotal(items),
        hydrated,
        storageError,
        add,
        addMany,
        update: store.update,
        clear: store.clear,
      }}
    >
      {children}
      <div className="toast-region" aria-live="polite" aria-atomic="true">
        {notice && (
          <div className="toast">
            <Check size={20} />
            <span>{notice}</span>
            <Link href="/kosar" onClick={() => setNotice("")}>
              Megnézem
            </Link>
            <button
              aria-label="Értesítés bezárása"
              onClick={() => setNotice("")}
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("CartProvider missing");
  return value;
}
