import Link from "next/link";
import { Layers, ArrowUpRight } from "lucide-react";
import { company } from "@/data/content";
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-intro">
          <Link href="/" className="footer-brand">
            <Layers size={28} /> mappapapír.
          </Link>
          <p>
            Helyet adunk az ötleteidnek.
            <br />
            Papíron, az íróasztalon, a mindennapokban.
          </p>
          <span className="demo-pill">FÜGGETLEN REDESIGN · DEMÓ</span>
        </div>
        <div>
          <h2>Fedezd fel</h2>
          <Link href="/termekek">Minden termék</Link>
          <Link href="/ceges-vasarloknak">Céges vásárlóknak</Link>
          <Link href="/nyomdai-szolgaltatasok">Nyomdai szolgáltatások</Link>
        </div>
        <div>
          <h2>Jó tudni</h2>
          <Link href="/rolunk">Rólunk</Link>
          <Link href="/kapcsolat">Kapcsolat</Link>
          <Link href="/tajekoztato">Demó és adatkezelés</Link>
        </div>
        <div>
          <h2>A szaküzlet elérhetősége</h2>
          <p>{company.address}</p>
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={company.source} target="_blank" rel="noreferrer">
            Hivatalos elérhetőségek <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © 2026 · Nem hivatalos bemutató. Nem állunk kapcsolatban a
          vállalkozással.
        </span>
        <span>Nincs valódi rendelés vagy fizetés.</span>
      </div>
    </footer>
  );
}
