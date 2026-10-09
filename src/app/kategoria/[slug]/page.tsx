import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/products";
import { Catalog } from "@/components/catalog";
import { Breadcrumb } from "@/components/breadcrumb";
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = categories.find((c) => c.slug === slug);
  return {
    title: c?.name || "Nem található",
    description: `${c?.name || "Termékek"} – független bemutató katalógus, illusztratív árakkal.`,
  };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = categories.find((c) => c.slug === slug);
  if (!c) notFound();
  return (
    <div className="container page-content">
      <Breadcrumb
        items={[{ label: "Termékek", href: "/termekek" }, { label: c.name }]}
      />
      <div className="page-heading">
        <p className="eyebrow">{c.short}</p>
        <h1>{c.name}</h1>
        <p>Válogass a kategória saját bemutató termékei közül.</p>
      </div>
      <Suspense fallback={<p>Katalógus betöltése…</p>}>
        <Catalog category={c.slug} />
      </Suspense>
    </div>
  );
}
