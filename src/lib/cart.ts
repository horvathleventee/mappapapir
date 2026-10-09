import { z } from "zod";
import { productRepository } from "./catalog";
import type { CartItem } from "./models";

export const CART_KEY = "mappa-demo-cart-v1";
export const cartSchema = z
  .array(
    z.object({
      productId: z.string(),
      variant: z.string().max(80),
      quantity: z.number().int().min(1).max(99),
    }),
  )
  .max(100);
export function isValidItem(item: CartItem) {
  const p = productRepository.getById(item.productId);
  return (
    !!p &&
    (p.variants ? p.variants.includes(item.variant) : item.variant === "")
  );
}
export function readCart(raw: string | null): CartItem[] {
  try {
    const parsed = cartSchema.safeParse(JSON.parse(raw || "[]"));
    if (!parsed.success) return [];
    return parsed.data
      .filter(isValidItem)
      .reduce<CartItem[]>((all, item) => addItem(all, item), []);
  } catch {
    return [];
  }
}
export function itemKey(item: Pick<CartItem, "productId" | "variant">) {
  return `${item.productId}:${item.variant}`;
}
export function addItem(items: CartItem[], item: CartItem): CartItem[] {
  if (!cartSchema.element.safeParse(item).success || !isValidItem(item))
    return items;
  const key = itemKey(item);
  const found = items.some((i) => itemKey(i) === key);
  return found
    ? items.map((i) =>
        itemKey(i) === key
          ? { ...i, quantity: Math.min(99, i.quantity + item.quantity) }
          : i,
      )
    : [...items, item];
}
export function setQuantity(items: CartItem[], key: string, quantity: number) {
  if (!Number.isFinite(quantity)) return items;
  if (quantity <= 0) return items.filter((i) => itemKey(i) !== key);
  return items.map((i) =>
    itemKey(i) === key
      ? { ...i, quantity: Math.min(99, Math.floor(quantity)) }
      : i,
  );
}
export function cartTotal(items: CartItem[]) {
  return items.reduce(
    (sum, i) =>
      sum + (productRepository.getById(i.productId)?.price || 0) * i.quantity,
    0,
  );
}
