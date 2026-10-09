import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { HeroStillLife } from "@/components/product-art";
export const metadata: Metadata = { title: "Rólunk – a redesign háttere" };
export default function AboutPage() {
  return (
    <div className="container page-content">
      <Breadcrumb items={[{ label: "Rólunk" }]} />
      <div className="about-grid">
        <div className="editorial-hero">
          <span className="eyebrow">HELYI TÖRTÉNET. ÚJ NÉZŐPONT.</span>
          <h1>
            Van helye
            <br />
            <em>a jó ötleteknek.</em>
          </h1>
          <p>
            A papír-írószer bolt több is lehet beszerzési pontnál: inspiráció a
            munkához, a tanuláshoz és az alkotáshoz.
          </p>
        </div>
        <HeroStillLife />
      </div>
      <div className="reading-grid">
        <div>
          <span className="eyebrow">A VÁLLALKOZÁSRÓL</span>
          <h2>
            Kiskunhalasról,
            <br />a mindennapokhoz.
          </h2>
        </div>
        <div className="prose">
          <p>
            A Mappa Kft. saját bemutatkozó oldala szerint 1990 óta foglalkozik
            papíráru, irodaszer, írószer, nyomtatvány és nyomtató-kellékanyag
            kereskedelmével. Lakossági és céges vásárlókat egyaránt kiszolgál.
          </p>
          <p>
            A kereskedelem mellett nyomtatási, grafikai tervezési és kötészeti
            tevékenységeket is bemutat a honlapján. A szaküzlet Kiskunhalason, a
            Kossuth utca 13–15. alatt található.
          </p>
          <p className="source-note">
            Forrás:{" "}
            <a
              href="https://www.mappapapir.hu/index.php/rolunk"
              target="_blank"
              rel="noreferrer"
            >
              a vállalkozás bemutatkozása
            </a>
            , ellenőrizve: 2026. október 8.
          </p>
          <h2>Erről a bemutatóról</h2>
          <p>
            Ez a weboldal egy független, nem hivatalos redesign. Nem a
            vállalkozás megbízásából készült, és nem állunk vele kapcsolatban. A
            termékek, árak és illusztrációk kizárólag az új vásárlási élmény
            bemutatását szolgálják.
          </p>
          <Link className="text-link" href="/tajekoztato">
            A demó működése és korlátai <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
