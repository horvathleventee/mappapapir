import { Suspense } from "react";
import type { Metadata } from "next";
import { Catalog } from "@/components/catalog";
import { Breadcrumb } from "@/components/breadcrumb";
export const metadata: Metadata = {
  title: "Termékek",
  description:
    "36 bemutató papír-írószer termék kereséssel, szűréssel és rendezéssel.",
};
export default function ProductsPage() {
  return (
    <div className="container page-content">
      <Breadcrumb items={[{ label: "Termékek" }]} />
      <div className="page-heading">
        <p className="eyebrow">A KÖVETKEZŐ ÖTLETEDHEZ</p>
        <h1>Fedezd fel a kínálatot.</h1>
        <p>
          Apró eszközök munkához, tanuláshoz és szabad alkotáshoz. Mindegyik
          bemutató termék.
        </p>
      </div>
      <Suspense fallback={<p className="loading">Katalógus betöltése…</p>}>
        <Catalog />
      </Suspense>
    </div>
  );
}
