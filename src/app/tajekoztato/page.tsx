import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
export const metadata: Metadata = { title: "Demó és adatkezelési tájékoztató" };
export default function InfoPage() {
  return (
    <div className="container page-content">
      <Breadcrumb items={[{ label: "Demótájékoztató" }]} />
      <div className="page-heading">
        <span className="eyebrow">ÁTLÁTHATÓAN, AZ ELEJÉTŐL</span>
        <h1>Ez egy bemutató.</h1>
      </div>
      <div className="prose info-prose">
        <h2>Független, nem hivatalos redesign</h2>
        <p>
          Ez a projekt nem a Mappa Papír hivatalos webshopja. Nem állunk
          kapcsolatban a vállalkozással, és nem az ő megbízásából készült. A
          vállalkozás nevét és hivatkozott nyilvános információit a redesign
          bemutatása érdekében jelenítjük meg.
        </p>
        <h2>Termékek és árak</h2>
        <p>
          A 36 termék saját készítésű demóadat. Az árak fiktív, bruttó bemutató
          összegek, nem valós ajánlatok. A vektoros képek saját illusztrációk,
          nem valódi termékfotók. Nincs készlet-, szállítási vagy
          kedvezményígéret.
        </p>
        <h2>Nincs rendelés vagy fizetés</h2>
        <p>
          A kosár kizárólag a vásárlási folyamat kipróbálását szolgálja. Nem
          keletkezik megrendelés, nem kérünk számlázási vagy fizetési adatokat,
          és nem küldünk adatot a vállalkozásnak. Céges fiók és valódi
          újrarendelés nem érhető el.
        </p>
        <h2>Mit tárol a böngésző?</h2>
        <p>
          A kosár termékazonosítóit, változatait és darabszámait a böngésző
          helyi tárhelyén tároljuk, a „mappa-demo-cart-v1” kulcs alatt. A kosár
          ürítése törli a mentett tételeket. Nincs regisztráció, analitika,
          hírlevél vagy személyes adatot bekérő űrlap. A keresési feltételek az
          oldal címében is megjelennek; ne írj személyes adatot a keresőbe.
        </p>
        <h2>Külső hivatkozások</h2>
        <p>
          A hivatalos honlap és az útvonaltervező külön szolgáltatás. A
          telefonos és e-mailes hivatkozások a saját készüléked alkalmazását
          nyitják meg; önmagukban nem indítanak üzenetküldést.
        </p>
        <h2>Jogi dokumentumok helye</h2>
        <p>
          Ez a tájékoztató nem valódi webáruház ÁSZF-je. Élesítéshez a tényleges
          üzemeltető adatai, megfelelő jogi és adatkezelési dokumentumok,
          valamint a valódi kereskedelmi és biztonsági folyamatok külön
          elkészítendők. A demó keresőmotoros indexelése tiltott.
        </p>
      </div>
    </div>
  );
}
