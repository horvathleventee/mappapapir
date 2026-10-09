"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import { categories, products } from "@/data/products";
import { filterProducts } from "@/lib/catalog";
import type { SortOrder } from "@/lib/models";
import { ProductCard } from "./product-card";

function validPrice(value: string | null) {
  if (!value?.trim()) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}
export function Catalog({ category }: { category?: string }) {
  const params = useSearchParams();
  const replaceUrl = (url: string) =>
    window.history.replaceState(null, "", url);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const query = params.get("q") || "";
  const selected = category
    ? [category]
    : params
        .getAll("kategoria")
        .filter((s) => categories.some((c) => c.slug === s));
  const min = validPrice(params.get("min"));
  const max = validPrice(params.get("max"));
  const sort = (
    ["featured", "price-asc", "price-desc", "name"].includes(
      params.get("rendezes") || "",
    )
      ? params.get("rendezes")
      : "featured"
  ) as SortOrder;
  const result = filterProducts(products, {
    query,
    categories: selected,
    minPrice: min,
    maxPrice: max,
    sort,
  });
  const activeCount =
    (category ? 0 : selected.length) +
    (min !== undefined ? 1 : 0) +
    (max !== undefined ? 1 : 0) +
    (query ? 1 : 0);
  function update(key: string, value: string | string[]) {
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    (Array.isArray(value) ? value : [value])
      .filter(Boolean)
      .forEach((v) => next.append(key, v));
    replaceUrl(
      `${category ? `/kategoria/${category}` : "/termekek"}${next.size ? `?${next}` : ""}`,
    );
  }
  function reset() {
    replaceUrl(category ? `/kategoria/${category}` : "/termekek");
  }
  return (
    <div className="catalog-layout">
      <aside
        className={`filters ${filtersOpen ? "filters-open" : ""}`}
        id="catalog-filters"
        aria-label="Termékszűrők"
      >
        <div className="filter-heading">
          <h2>Szűrés</h2>
          <button
            className="icon-button mobile-only"
            onClick={() => setFiltersOpen(false)}
            aria-label="Szűrők összecsukása"
          >
            <X size={20} />
          </button>
        </div>
        {!category && (
          <fieldset>
            <legend>Kategóriák</legend>
            {categories.map((c) => (
              <label className="check-label" key={c.slug}>
                <input
                  type="checkbox"
                  checked={selected.includes(c.slug)}
                  onChange={(e) =>
                    update(
                      "kategoria",
                      e.target.checked
                        ? [...selected, c.slug]
                        : selected.filter((s) => s !== c.slug),
                    )
                  }
                />
                <span>{c.name}</span>
                <small>
                  {products.filter((p) => p.category === c.slug).length}
                </small>
              </label>
            ))}
          </fieldset>
        )}
        <fieldset>
          <legend>Ártartomány</legend>
          <form
            key={`${min}-${max}`}
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const next = new URLSearchParams(params.toString());
              ["min", "max"].forEach((k) => {
                const v = String(data.get(k) || "").trim();
                if (v) next.set(k, v);
                else next.delete(k);
              });
              replaceUrl(
                `${category ? `/kategoria/${category}` : "/termekek"}?${next}`,
              );
            }}
          >
            <div className="price-inputs">
              <label>
                Minimum (Ft)
                <input
                  name="min"
                  type="number"
                  min="0"
                  max="1000000"
                  step="1"
                  defaultValue={min ?? ""}
                  placeholder="0"
                />
              </label>
              <span>–</span>
              <label>
                Maximum (Ft)
                <input
                  name="max"
                  type="number"
                  min="0"
                  max="1000000"
                  step="1"
                  defaultValue={max ?? ""}
                  placeholder="6 000"
                />
              </label>
            </div>
            <button className="button outline filter-apply" type="submit">
              Árszűrő alkalmazása <ArrowRight size={15} />
            </button>
          </form>
        </fieldset>
        {activeCount > 0 && (
          <button className="reset-button" onClick={reset}>
            <X size={15} /> Szűrők törlése ({activeCount})
          </button>
        )}
        <div className="filter-note">
          <span className="eyebrow">CSAK EGY PRÓBA</span>
          <p>Minden termék és ár demóadat. Bátran próbáld ki a kosarat!</p>
        </div>
      </aside>
      <div className="catalog-results">
        <form
          className="catalog-search"
          key={query}
          onSubmit={(e) => {
            e.preventDefault();
            update("q", String(new FormData(e.currentTarget).get("q") || ""));
          }}
          role="search"
        >
          <Search size={19} />
          <label className="sr-only" htmlFor="catalog-search">
            Keresés a termékek között
          </label>
          <input
            id="catalog-search"
            name="q"
            type="search"
            placeholder="Terméknév, tulajdonság, ötlet…"
            defaultValue={query}
          />
          <button type="submit">Keresés</button>
        </form>
        <div className="catalog-toolbar">
          <p aria-live="polite">
            <strong>{result.length}</strong> termék{query && <> · „{query}”</>}
          </p>
          <button
            className="button outline mobile-only"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            aria-controls="catalog-filters"
          >
            <SlidersHorizontal size={17} /> Szűrés
          </button>
          <label className="sort-label">
            Rendezés
            <select
              aria-label="Termékek rendezése"
              value={sort}
              onChange={(e) => update("rendezes", e.target.value)}
            >
              <option value="featured">Ajánlott sorrend</option>
              <option value="price-asc">Ár: alacsonytól</option>
              <option value="price-desc">Ár: magastól</option>
              <option value="name">Név: A–Z</option>
            </select>
          </label>
        </div>
        {min !== undefined && max !== undefined && min > max && (
          <p className="notice">
            A minimum ár nagyobb a maximumnál. Módosítsd az ártartományt.
          </p>
        )}
        {result.length ? (
          <div className="product-grid catalog-grid">
            {result.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={40} strokeWidth={1.3} />
            <h2>Most nem találtunk ilyet.</h2>
            <p>Próbálj másik kifejezést, vagy engedj egy kicsit a szűrőkön.</p>
            <button className="button primary" onClick={reset}>
              Keresés és szűrők törlése
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
