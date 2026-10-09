"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/models";
import { formatPrice } from "@/lib/catalog";
import { categories } from "@/data/products";
import { useCart } from "./cart-provider";
import { ProductArt } from "./product-art";
export function ProductCard({ product }: { product: Product }) {
  const { add, hydrated } = useCart();
  return (
    <article className="product-card">
      <Link
        className="product-image"
        href={`/termek/${product.slug}`}
        aria-label={`${product.name} – termék megnyitása`}
      >
        <span className="product-badge">DEMÓTERMÉK</span>
        <ProductArt kind={product.art} color={product.color} />
      </Link>
      <div className="product-info">
        <p className="product-category">
          {categories.find((c) => c.slug === product.category)?.name}
        </p>
        <h3>
          <Link href={`/termek/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-detail">
          {product.details.slice(0, 2).join(" · ")}
        </p>
        <div className="product-bottom">
          <div>
            <strong>{formatPrice(product.price)}</strong>
            <small>Bemutató ár</small>
          </div>
          <button
            className="add-small"
            disabled={!hydrated}
            aria-label={`${product.name} kosárba`}
            onClick={() =>
              add({
                productId: product.id,
                variant: product.variants?.[0] || "",
                quantity: 1,
              })
            }
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
