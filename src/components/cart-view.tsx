"use client";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Trash2, Info, ArrowLeft } from "lucide-react";
import { useCart } from "./cart-provider";
import { productRepository, formatPrice } from "@/lib/catalog";
import { itemKey } from "@/lib/cart";
import { ProductArt } from "./product-art";
import { QuantityControl } from "./product-purchase";
export function CartView() {
  const { items, count, total, update, clear, hydrated, storageError } =
    useCart();
  if (!hydrated)
    return (
      <p className="loading" role="status">
        A mentett kosár betöltése…
      </p>
    );
  if (!items.length)
    return (
      <div className="empty-state cart-empty">
        <ShoppingBag size={52} strokeWidth={1.2} />
        <h2>A következő ötlet még rád vár.</h2>
        <p>A demókosarad egyelőre üres. Fedezz fel néhány új kedvencet!</p>
        <Link href="/termekek" className="button primary">
          Irány a kínálat <ArrowRight size={18} />
        </Link>
      </div>
    );
  return (
    <>
      <div className="cart-layout">
        <div>
          <div className="cart-list-heading">
            <p>{count} termék a demókosárban</p>
            <button className="text-link" onClick={clear}>
              <Trash2 size={15} /> Kosár ürítése
            </button>
          </div>
          <div className="cart-items">
            {items.map((item) => {
              const p = productRepository.getById(item.productId)!;
              const key = itemKey(item);
              return (
                <article className="cart-item" key={key}>
                  <Link
                    href={`/termek/${p.slug}`}
                    className="cart-art"
                    aria-label={`${p.name} megnyitása`}
                  >
                    <ProductArt kind={p.art} color={p.color} />
                  </Link>
                  <div className="cart-item-copy">
                    <span className="eyebrow">DEMÓTERMÉK</span>
                    <h2>
                      <Link href={`/termek/${p.slug}`}>{p.name}</Link>
                    </h2>
                    {item.variant && <p>{item.variant}</p>}
                    <p>{formatPrice(p.price)} / egység</p>
                    <QuantityControl
                      value={item.quantity}
                      onChange={(q) => update(key, q)}
                      label={p.name + (item.variant ? ` ${item.variant}` : "")}
                    />
                  </div>
                  <div className="cart-item-end">
                    <strong>{formatPrice(p.price * item.quantity)}</strong>
                    <button
                      className="icon-button"
                      aria-label={`${p.name} eltávolítása`}
                      onClick={() => update(key, 0)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <Link href="/termekek" className="text-link continue-shopping">
            <ArrowLeft size={17} /> Folytatom a böngészést
          </Link>
        </div>
        <aside className="cart-summary">
          <p className="eyebrow">MINDEN EGY HELYEN</p>
          <h2>A kosarad összesítése</h2>
          <dl>
            <div>
              <dt>Termékek ({count} db)</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
            <div>
              <dt>Szállítás</dt>
              <dd>Nincs a demóban</dd>
            </div>
            <div className="summary-total">
              <dt>Összesen</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <p className="fine-print">Fiktív, bruttó bemutató összegek.</p>
          <div className="demo-note">
            <Info size={22} />
            <p>
              Ez itt a demó vége. A termékeket nem lehet megrendelni, és nem
              történik fizetés.
            </p>
          </div>
          <Link className="button outline" href="/tajekoztato">
            Hogyan működik a demó?
          </Link>
        </aside>
      </div>
      {storageError && (
        <p className="notice" role="status">
          A böngésző nem engedi a helyi mentést. A kosár most működik, de
          frissítéskor elveszhet.
        </p>
      )}
    </>
  );
}
