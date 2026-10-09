import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, RotateCcw, Users, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { BusinessDemo } from "@/components/business-demo";
export const metadata: Metadata = {
  title: "Céges vásárlóknak – demókoncepció",
};
export default function BusinessPage() {
  return (
    <div className="container page-content">
      <Breadcrumb items={[{ label: "Céges vásárlóknak" }]} />
      <div className="editorial-hero">
        <span className="eyebrow">IRODAI BESZERZÉS, ÚJRAGONDOLVA</span>
        <h1>
          Több idő a munkára.
          <br />
          <em>Kevesebb a beszerzésre.</em>
        </h1>
        <p>
          Átlátható kínálat, egyszerű listák, egy helyen összegyűjtött eszközök.
          Így képzeljük el a kényelmesebb céges vásárlást.
        </p>
        <span className="demo-pill">B2B KONCEPCIÓ · NEM ÉLES SZOLGÁLTATÁS</span>
      </div>
      <div className="business-page-grid">
        <div>
          <h2>Egy rendezettebb munkanap alapjai.</h2>
          <div className="feature-list">
            <article>
              <ClipboardList />
              <div>
                <h3>Összegyűjtve, átláthatóan</h3>
                <p>
                  A rendszeresen használt papírok és írószerek egyetlen
                  mintalistában. A mennyiségeket a kosárban módosíthatod.
                </p>
              </div>
            </article>
            <article>
              <RotateCcw />
              <div>
                <h3>Gyors újrarendelés – mintafolyamat</h3>
                <p>
                  A jobb oldali fiktív csomaggal kipróbálható a listából kosárba
                  helyezés. Valódi rendelési előzmény nincs.
                </p>
              </div>
            </article>
            <article>
              <Users />
              <div>
                <h3>Későbbi lehetőségek</h3>
                <p>
                  Céges fiókok, jóváhagyási folyamat és szerződéses árak későbbi
                  integrációval készülhetnek el. A demóban nem érhetők el.
                </p>
              </div>
            </article>
          </div>
          <Link href="/termekek" className="text-link">
            Inkább magam válogatok <ArrowRight size={18} />
          </Link>
        </div>
        <BusinessDemo />
      </div>
    </div>
  );
}
