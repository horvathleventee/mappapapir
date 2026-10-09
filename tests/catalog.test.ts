import test from "node:test";
import assert from "node:assert/strict";
import { products, categories } from "../src/data/products";
import { filterProducts } from "../src/lib/catalog";

test("36 unique demo products cover all six categories", () => {
  assert.equal(products.length, 36);
  assert.equal(new Set(products.map((p) => p.id)).size, 36);
  assert.equal(new Set(products.map((p) => p.slug)).size, 36);
  for (const c of categories)
    assert.ok(products.some((p) => p.category === c.slug));
  assert.ok(products.every((p) => Number.isInteger(p.price) && p.price > 0));
});
test("accent-insensitive search matches multiple words and attributes", () => {
  assert.equal(
    filterProducts(products, { query: "LIGET pontozoTT" })[0]?.id,
    "demo-001",
  );
  assert.ok(
    filterProducts(products, { query: "fuzet A5" }).some(
      (p) => p.name === "Felhő vonalas füzet A5",
    ),
  );
  assert.equal(filterProducts(products, { query: "nincsilyen123" }).length, 0);
});
test("price and category filters intersect; bounds are inclusive", () => {
  const result = filterProducts(products, {
    categories: ["iroszerek"],
    minPrice: 990,
    maxPrice: 1590,
    sort: "price-asc",
  });
  assert.deepEqual(
    result.map((p) => p.price),
    [990, 1290, 1390, 1590],
  );
  assert.ok(result.every((p) => p.category === "iroszerek"));
  assert.equal(
    filterProducts(products, { minPrice: 5000, maxPrice: 1000 }).length,
    0,
  );
});
test("sorting is deterministic and does not mutate repository", () => {
  const before = products.map((p) => p.id);
  const result = filterProducts(products, { sort: "price-desc" });
  assert.equal(result[0].price, 5990);
  assert.deepEqual(
    products.map((p) => p.id),
    before,
  );
  const alphabetical = filterProducts(products, { sort: "name" });
  for (let i = 1; i < alphabetical.length; i++)
    assert.ok(
      alphabetical[i - 1].name.localeCompare(alphabetical[i].name, "hu") <= 0,
    );
});
