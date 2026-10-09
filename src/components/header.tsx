"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, type KeyboardEvent } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  Layers,
  Building2,
  ChevronDown,
} from "lucide-react";
import { useCart } from "./cart-provider";
import { categories } from "@/data/products";

export function Header() {
  const { count } = useCart();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const categoryTrigger = useRef<HTMLButtonElement>(null);
  function closeOnEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      if (categoryOpen) {
        setCategoryOpen(false);
        categoryTrigger.current?.focus();
      } else {
        setMenu(false);
        trigger.current?.focus();
      }
    }
  }
  return (
    <header onKeyDown={closeOnEscape}>
      <div className="demo-bar">
        <div className="container">
          <span>
            <span className="status-dot" />
            Független webshopdemó · Minden termék és ár illusztráció.
          </span>
          <Link href="/tajekoztato">
            A demóról <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
      <div className="container header-main">
        <Link href="/" className="brand" aria-label="Mappa Papír – főoldal">
          <span className="brand-symbol">
            <Layers size={29} strokeWidth={1.7} />
          </span>
          <span>
            mappa
            <span className="brand-paper">
              papír<span className="brand-dot">.</span>
            </span>
            <small>MINDEN JÓ ÖTLET ITT KEZDŐDIK</small>
          </span>
        </Link>
        <form action="/termekek" className="header-search" role="search">
          <Search size={20} />
          <label className="sr-only" htmlFor="header-search">
            Termékkeresés
          </label>
          <input
            id="header-search"
            name="q"
            type="search"
            placeholder="Mit keresel a következő ötletedhez?"
          />
          <button type="submit" aria-label="Keresés indítása">
            <ArrowUpRight size={20} />
          </button>
        </form>
        <Link href="/ceges-vasarloknak" className="business-link">
          <Building2 size={21} />
          <span>
            Céges vásárlóknak<small>Beszerzés, egyszerűbben</small>
          </span>
        </Link>
        <Link
          href="/kosar"
          className="cart-link"
          aria-label={`Kosár, ${count} termék`}
        >
          <ShoppingBag size={23} />
          <span className="cart-title">Kosár</span>
          <span className="cart-count">{count}</span>
        </Link>
        <button
          ref={trigger}
          className="mobile-menu-toggle icon-button"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="main-navigation"
          aria-label={menu ? "Menü bezárása" : "Menü megnyitása"}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="main-navigation"
        className={`main-nav ${menu ? "is-open" : ""}`}
        aria-label="Fő navigáció"
      >
        <div className="container nav-inner">
          <div className="category-menu">
            <button
              ref={categoryTrigger}
              onClick={() => setCategoryOpen(!categoryOpen)}
              aria-expanded={categoryOpen}
              aria-controls="category-dropdown"
            >
              <Menu size={18} /> Összes kategória <ChevronDown size={15} />
            </button>
            {categoryOpen && (
              <div className="category-dropdown" id="category-dropdown">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/kategoria/${c.slug}`}
                    onClick={() => {
                      setCategoryOpen(false);
                      setMenu(false);
                    }}
                  >
                    {c.name}
                    <ArrowUpRight size={15} />
                  </Link>
                ))}
              </div>
            )}
          </div>
          {[
            ["/termekek", "Termékek"],
            ["/kategoria/iroszerek", "Írószerek"],
            ["/kategoria/fuzetek-papiraruk", "Füzetek és papíráruk"],
            ["/kategoria/iskolaszerek", "Iskolaszerek"],
            ["/kategoria/kreativ", "Kreatív világ"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setMenu(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/nyomdai-szolgaltatasok"
            className="nav-print"
            onClick={() => setMenu(false)}
          >
            Nyomdai szolgáltatások <ArrowUpRight size={15} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
