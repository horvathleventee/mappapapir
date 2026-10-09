import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { categories, products } from "@/data/products";
import { formatPrice, productRepository } from "@/lib/catalog";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { ProductPurchase } from "@/components/product-purchase";
import { Breadcrumb } from "@/components/breadcrumb";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productRepository.getBySlug(slug);
  return {
    title: p ? `${p.name} – demótermék` : "Nem található",
    description: p
      ? `${p.description} Fiktív bemutató termék, nem valódi ajánlat.`
      : undefined,
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = productRepository.getBySlug(slug);
  if (!p) notFound();
  const category = categories.find((c) => c.slug === p.category)!;
  const related = products
    .filter((other) => other.category === p.category && other.id !== p.id)
    .slice(0, 4);
  return (
    <div className="container page-content">
      <Breadcrumb
        items={[
          { label: "Termékek", href: "/termekek" },
          { label: category.name, href: `/kategoria/${category.slug}` },
          { label: p.name },
        ]}
      />
      <div className="product-page">
        <div className="product-gallery">
          <span className="product-badge">DEMÓTERMÉK · SAJÁT ILLUSZTRÁCIÓ</span>
          <ProductArt
            kind={p.art}
            color={p.color}
            label={`${p.name} – illusztratív termékábra`}
          />
          <span className="gallery-caption">
            A kép illusztráció; nem a vállalkozás termékfotója.
          </span>
        </div>
        <div className="product-description">
          <Link href={`/kategoria/${category.slug}`} className="eyebrow">
            {category.name}
          </Link>
          <h1>{p.name}</h1>
          <p className="lead">{p.description}</p>
          <div className="detail-price">
            <strong>{formatPrice(p.price)}</strong>
            <span>/ darab vagy feltüntetett csomag</span>
            <small>Fiktív, bruttó bemutató ár</small>
          </div>
          <ProductPurchase product={p} />
          <div className="demo-note">
            <Info size={20} />
            <p>
              Ez egy kipróbálható demó. Nincs valódi vásárlás, fizetés vagy
              szállítás.
            </p>
          </div>
          <div className="specifications">
            <h2>Részletek</h2>
            <ul>
              {p.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p>Demó cikkszám: {p.id}</p>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EGYÜTT MÉG JOBB</p>
            <h2>Ez is jól jöhet.</h2>
          </div>
          <Link className="text-link" href={`/kategoria/${category.slug}`}>
            <ArrowLeft size={16} /> Vissza a kategóriához
          </Link>
        </div>
        <div className="product-grid">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
