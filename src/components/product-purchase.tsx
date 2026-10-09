"use client";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useCart } from "./cart-provider";
import type { Product } from "@/lib/models";
export function QuantityControl({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
}) {
  return (
    <div className="quantity-control">
      <button
        aria-label={`${label}: kevesebb`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={15} />
      </button>
      <label className="sr-only" htmlFor={`quantity-${label}`}>
        {label}: mennyiség
      </label>
      <input
        id={`quantity-${label}`}
        aria-label={`${label}: mennyiség`}
        type="number"
        min="1"
        max="99"
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isFinite(n))
            onChange(Math.max(1, Math.min(99, Math.floor(n))));
        }}
      />
      <button
        aria-label={`${label}: több`}
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(product.variants?.[0] || "");
  const { add, hydrated } = useCart();
  return (
    <div className="purchase">
      <fieldset className="variants" hidden={!product.variants}>
        <legend>
          Változat: <strong>{variant}</strong>
        </legend>
        {product.variants?.map((v) => (
          <label className={variant === v ? "selected" : ""} key={v}>
            <input
              type="radio"
              name="variant"
              value={v}
              checked={v === variant}
              onChange={() => setVariant(v)}
            />
            {v === variant && <Check size={14} />}
            {v}
          </label>
        ))}
      </fieldset>
      <div className="purchase-actions">
        <QuantityControl
          value={quantity}
          onChange={setQuantity}
          label="Termék"
        />
        <button
          disabled={!hydrated}
          className="button primary"
          onClick={() => add({ productId: product.id, variant, quantity })}
        >
          <ShoppingBag size={19} /> Demókosárba teszem
        </button>
      </div>
      <p className="fine-print">
        Legfeljebb 99 darab / változat. Nincs valós készletinformáció.
      </p>
    </div>
  );
}
