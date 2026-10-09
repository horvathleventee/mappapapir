import { addItem, CART_KEY, readCart, setQuantity } from "./cart";
import type { CartItem } from "./models";
interface Snapshot {
  items: CartItem[];
  hydrated: boolean;
  storageError: boolean;
}
const EMPTY: Snapshot = { items: [], hydrated: false, storageError: false };
export function createCartStore() {
  let snapshot = EMPTY;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());
  const sync = (event: StorageEvent) => {
    if (event.key === CART_KEY || event.key === null) {
      snapshot = { ...snapshot, items: readCart(event.newValue) };
      emit();
    }
  };
  function save(items: CartItem[]) {
    let storageError = snapshot.storageError;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      storageError = true;
    }
    snapshot = { items, hydrated: true, storageError };
    emit();
  }
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => EMPTY,
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!snapshot.hydrated) {
        try {
          snapshot = {
            items: readCart(localStorage.getItem(CART_KEY)),
            hydrated: true,
            storageError: false,
          };
        } catch {
          snapshot = { items: [], hydrated: true, storageError: true };
        }
      }
      if (listeners.size === 1) window.addEventListener("storage", sync);
      return () => {
        listeners.delete(listener);
        if (!listeners.size) window.removeEventListener("storage", sync);
      };
    },
    add: (item: CartItem) => save(addItem(snapshot.items, item)),
    addMany: (items: CartItem[]) =>
      save(items.reduce((all, item) => addItem(all, item), snapshot.items)),
    update: (key: string, quantity: number) =>
      save(setQuantity(snapshot.items, key, quantity)),
    clear: () => save([]),
  };
}
