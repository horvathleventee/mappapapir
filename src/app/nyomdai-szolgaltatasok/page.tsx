import type { Metadata } from "next";
import Link from "next/link";
import {
  Printer,
  BookOpen,
  Palette,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { services } from "@/data/content";
import { Breadcrumb } from "@/components/breadcrumb";
export const metadata: Metadata = { title: "Nyomdai szolgáltatások" };
export default function PrintPage() {
  return (
    <div className="container page-content">
      <Breadcrumb items={[{ label: "Nyomdai szolgáltatások" }]} />
      <div className="editorial-hero">
        <span className="eyebrow">AMIKOR AZ ÖTLET FORMÁT ÖLT</span>
        <h1>
          Gondolatból papír.
          <br />
          <em>Papírból valami személyes.</em>
        </h1>
        <p>
          A vállalkozás nyilvános honlapján bemutatott nyomdai tevékenységek,
          egy átláthatóbb felületen.
        </p>
      </div>
      <div className="service-grid service-detail-grid">
        {services.map((s, i) => {
          const Icon = [Printer, BookOpen, Palette][i];
          return (
            <article
              key={s.title}
              id={`szolgaltatas-${i}`}
              className="service-card"
            >
              <span className="service-number">0{i + 1}</span>
              <Icon size={38} strokeWidth={1.2} />
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <ul>
                {[
                  [
                    "Dokumentumok és tananyagok",
                    "Színes kiadványok",
                    "Szkennelés",
                  ],
                  [
                    "Szakdolgozatok és diplomák",
                    "Spirálozott dokumentumok",
                    "Laminált lapok",
                  ],
                  ["Névjegyek és meghívók", "Egyedi naptárak", "Bélyegzők"],
                ][i].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="contact-callout">
        <div>
          <h2>Van egy papírra kívánkozó ötleted?</h2>
          <p>
            A tényleges lehetőségekről és árakról a vállalkozásnál
            érdeklődhetsz. A demó nem fogad és nem küld ajánlatkérést.
          </p>
        </div>
        <Link href="/kapcsolat" className="button primary">
          Elérhetőségek <ArrowRight size={18} />
        </Link>
      </div>
      <p className="source-note">
        A szolgáltatáscsoportok forrása:{" "}
        <a href="https://www.mappapapir.hu/" target="_blank" rel="noreferrer">
          Mappa Papír hivatalos honlapja <ExternalLink size={12} />
        </a>
        . Ellenőrzés: 2026. október 8. Az aktuális feltételeket külön egyeztetni
        szükséges.
      </p>
    </div>
  );
}
