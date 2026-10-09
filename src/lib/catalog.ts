import { products } from "../data/products";
import type { CatalogFilters, Product } from "./models";

export function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("hu")
    .trim();
}
export function filterProducts(
  source: Product[],
  filters: CatalogFilters = {},
) {
  const words = normalize(filters.query || "")
    .split(/\s+/)
    .filter(Boolean);
  const result = source.filter((p) => {
    const haystack = normalize([p.name, p.description, ...p.tags].join(" "));
    return (
      words.every((w) => haystack.includes(w)) &&
      (!filters.categories?.length ||
        filters.categories.includes(p.category)) &&
      p.price >= (filters.minPrice ?? 0) &&
      p.price <= (filters.maxPrice ?? Infinity)
    );
  });
  if (filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (filters.sort === "name")
    result.sort((a, b) => a.name.localeCompare(b.name, "hu"));
  return result;
}
// Replace this adapter with an API-backed repository when real data is introduced.
export const productRepository = {
  getAll: () => products,
  getBySlug: (slug: string) => products.find((p) => p.slug === slug),
  getById: (id: string) => products.find((p) => p.id === id),
};
export const formatPrice = (price: number) =>
  new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
    useGrouping: "always",
  }).format(price);
