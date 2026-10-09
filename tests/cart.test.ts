import test from "node:test";
import assert from "node:assert/strict";
import {
  addItem,
  cartTotal,
  itemKey,
  readCart,
  setQuantity,
} from "../src/lib/cart";
import type { CartItem } from "../src/lib/models";
const item: CartItem = {
  productId: "demo-001",
  variant: "Zsályazöld",
  quantity: 2,
};
test("add, merge, variants, update, remove and totals", () => {
  let cart = addItem([], item);
  cart = addItem(cart, { ...item, quantity: 3 });
  assert.equal(cart[0].quantity, 5);
  cart = addItem(cart, { ...item, variant: "Terrakotta", quantity: 1 });
  assert.equal(cart.length, 2);
  assert.equal(cartTotal(cart), 14940);
  cart = setQuantity(cart, itemKey(item), 3);
  assert.equal(cartTotal(cart), 9960);
  cart = setQuantity(cart, itemKey(item), 0);
  assert.equal(cart.length, 1);
  assert.equal(cartTotal(cart), 2490);
});
test("quantity is bounded and invalid values are rejected", () => {
  const cart = addItem([], { ...item, quantity: 98 });
  assert.equal(addItem(cart, item)[0].quantity, 99);
  assert.deepEqual(addItem(cart, { ...item, quantity: -1 }), cart);
  assert.deepEqual(addItem(cart, { ...item, quantity: 1.5 }), cart);
  assert.deepEqual(setQuantity(cart, itemKey(item), NaN), cart);
  assert.equal(setQuantity(cart, itemKey(item), 1000)[0].quantity, 99);
});
test("corrupt persistence and invalid product references are safe", () => {
  assert.deepEqual(readCart("broken{"), []);
  assert.deepEqual(readCart(null), []);
  assert.deepEqual(readCart('{"bad":true}'), []);
  assert.deepEqual(
    readCart(JSON.stringify([{ ...item, productId: "missing" }])),
    [],
  );
  assert.deepEqual(
    readCart(JSON.stringify([{ ...item, variant: "invalid" }])),
    [],
  );
  assert.deepEqual(readCart(JSON.stringify([{ ...item, quantity: 0 }])), []);
  assert.deepEqual(readCart(JSON.stringify([item])), [item]);
});
test("duplicate stored rows are merged without changing the input", () => {
  const a = [item];
  const result = addItem(a, item);
  assert.equal(a[0].quantity, 2);
  assert.equal(result[0].quantity, 4);
  assert.equal(readCart(JSON.stringify([item, item]))[0].quantity, 4);
});
