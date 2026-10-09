import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { Breadcrumb } from "@/components/breadcrumb";
export const metadata: Metadata = { title: "Demókosár" };
export default function CartPage() {
  return (
    <div className="container page-content">
      <Breadcrumb items={[{ label: "Kosár" }]} />
      <div className="page-heading">
        <p className="eyebrow">VÁLOGATÁSOD, EGY HELYEN</p>
        <h1>A demókosarad.</h1>
        <p>
          Ötletek összegyűjtve. A kosár tartalmát ezen a böngészőn őrizzük meg.
        </p>
      </div>
      <CartView />
    </div>
  );
}
