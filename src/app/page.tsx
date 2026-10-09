import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  PencilLine,
  BriefcaseBusiness,
  Printer,
  BookOpen,
  Palette,
  Sparkles,
  MousePointer2,
  MapPin,
} from "lucide-react";
import { HeroStillLife, ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/data/products";
import { services } from "@/data/content";

export default function Home() {
  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> APRÓ ESZKÖZÖK. NAGY ÖTLETEK.
          </div>
          <h1>
            Minden jó ötlet
            <br />
            egy <em>üres lappal</em>
            <br />
            kezdődik.
          </h1>
          <p>
            Az első vázlattól az utolsó simításig.
            <br />
            Papír, írószer és inspiráció a mindennapokhoz.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/termekek">
              Felfedezem a kínálatot <ArrowRight size={18} />
            </Link>
            <Link className="text-link" href="/nyomdai-szolgaltatasok">
              Nyomdai szolgáltatások <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-foot">
            <span className="mini-line" /> ÍRÁSHOZ. ALKOTÁSHOZ. MINDENNAP.
          </div>
        </div>
        <HeroStillLife />
      </section>
      <div className="container benefit-strip">
        <div>
          <PencilLine />
          <span>
            Munka, tanulás, alkotás<small>Minden ötletnek saját eszköz</small>
          </span>
        </div>
        <div>
          <MousePointer2 />
          <span>
            Egyszerű felfedezés<small>Keresés és átlátható kategóriák</small>
          </span>
        </div>
        <div>
          <BriefcaseBusiness />
          <span>
            Irodai beszerzés<small>Céges mintalistával is kipróbálható</small>
          </span>
        </div>
        <div>
          <MapPin />
          <span>
            Helyi inspiráció<small>A kiskunhalasi Mappa Papír nyomán</small>
          </span>
        </div>
      </div>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TALÁLD MEG A HOZZÁD ILLŐT</p>
            <h2>Mire van ma szükséged?</h2>
          </div>
          <Link className="text-link" href="/termekek">
            Minden termék <ArrowRight size={17} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c, index) => (
            <Link
              className={`category-card category-${index}`}
              href={`/kategoria/${c.slug}`}
              key={c.slug}
            >
              <div className="category-art">
                <ProductArt kind={c.art} color={c.color} />
              </div>
              <div>
                <h3>{c.name}</h3>
                <p>{c.short}</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <section className="container section featured">
        <div className="section-heading">
          <div>
            <p className="eyebrow">JÓ VÁLASZTÁS A MINDENNAPOKRA</p>
            <h2>Apró kedvencek, nagy ötletekhez.</h2>
          </div>
          <Link className="text-link" href="/termekek">
            A teljes kínálat <ArrowRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.featured)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <p className="fine-print">
          Saját bemutató termékek, illusztratív árakkal. Nem a vállalkozás
          valódi ajánlatai.
        </p>
      </section>
      <section className="container business-banner">
        <div className="business-copy">
          <span className="label-light">
            <BriefcaseBusiness size={15} /> CÉGES VÁSÁRLÓKNAK
          </span>
          <h2>
            Az irodád működjön.
            <br />A beszerzés legyen egyszerű.
          </h2>
          <p>
            Papír, toll, rendezett gondolatok. Próbáld ki, milyen lehet egy
            átláthatóbb irodai beszerzés.
          </p>
          <Link href="/ceges-vasarloknak" className="button cream">
            Megnézem a céges megoldást <ArrowRight size={18} />
          </Link>
          <small>Demókoncepció · Céges fiók és egyedi árazás nélkül</small>
        </div>
        <div className="business-visual">
          <span className="paper-label">EGY JÓL INDULÓ MUNKANAP</span>
          <div className="business-art">
            <ProductArt kind="folder" color="#bc9c70" />
            <ProductArt kind="organizer" color="#93a095" />
          </div>
          <div className="business-chip">
            <span className="chip-dot" /> Kevesebb keresgélés. Több fókusz.
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">AZ ÖTLETTŐL A KÉZZELFOGHATÓIG</p>
            <h2>Ne csak papíron létezzen.</h2>
          </div>
          <Link className="text-link" href="/nyomdai-szolgaltatasok">
            Nyomdai szolgáltatások <ArrowRight size={17} />
          </Link>
        </div>
        <div className="service-grid">
          {services.map((s, i) => {
            const Icon = [Printer, BookOpen, Palette][i];
            return (
              <Link
                key={s.title}
                href={`/nyomdai-szolgaltatasok#szolgaltatas-${i}`}
                className="service-card"
              >
                <span className="service-number">0{i + 1}</span>
                <Icon size={31} strokeWidth={1.3} />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="service-link">
                  Részletek <ArrowUpRight size={18} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="container closing-note">
        <Sparkles size={23} strokeWidth={1.4} />
        <p>
          A legjobb dolgok néha egészen kicsiben kezdődnek.
          <br />
          <strong>Egy tollal. Egy füzettel. Egy új ötlettel.</strong>
        </p>
        <Link href="/rolunk" className="text-link">
          Ismerd meg a történetet <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
