"use client";
import { ShoppingBag, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "./cart-provider";
import { ProductArt } from "./product-art";
const sample = [
  { productId: "demo-005", quantity: 5, variant: "" },
  { productId: "demo-006", quantity: 4, variant: "" },
  { productId: "demo-007", quantity: 10, variant: "" },
];
export function BusinessDemo() {
  const { addMany, hydrated } = useCart();
  return (
    <div className="business-demo">
      <div className="section-heading">
        <div>
          <p className="eyebrow">KIPRÓBÁLHATÓ MINTALISTA</p>
          <h2>Irodai alapcsomag</h2>
        </div>
        <RotateCcw size={26} />
      </div>
      <p>
        Egy elképzelt havi beszerzés. Egy kattintással a demókosaradba teheted,
        majd szabadon módosíthatod.
      </p>
      <div className="sample-list">
        {sample.map((item) => {
          const p = products.find((p) => p.id === item.productId)!;
          return (
            <div key={p.id}>
              <ProductArt kind={p.art} color={p.color} />
              <span>
                <strong>{p.name}</strong>
                <small>
                  {item.quantity} darab × {formatPrice(p.price)}
                </small>
              </span>
              <b>{formatPrice(p.price * item.quantity)}</b>
            </div>
          );
        })}
      </div>
      <div className="sample-total">
        <span>Bemutató összesen</span>
        <strong>
          {formatPrice(
            sample.reduce(
              (s, i) =>
                s +
                products.find((p) => p.id === i.productId)!.price * i.quantity,
              0,
            ),
          )}
        </strong>
      </div>
      <button
        className="button primary"
        disabled={!hydrated}
        onClick={() => addMany(sample)}
      >
        <ShoppingBag size={18} /> Mintalista a demókosárba
      </button>
      <p className="fine-print">
        Újabb kattintás hozzáadja a mennyiségeket a meglévő tételekhez,
        változatonként legfeljebb 99 darabig. Ez nem korábbi valódi rendelés.
      </p>
    </div>
  );
}
