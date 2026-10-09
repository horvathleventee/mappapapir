import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { company } from "@/data/content";
import { Breadcrumb } from "@/components/breadcrumb";
export const metadata: Metadata = {
  title: "Kapcsolat – hivatalos elérhetőségek",
};
export default function ContactPage() {
  return (
    <div className="container page-content">
      <Breadcrumb items={[{ label: "Kapcsolat" }]} />
      <div className="page-heading">
        <span className="eyebrow">A KÉPERNYŐN TÚL</span>
        <h1>Találkozz a valódi üzlettel.</h1>
        <p>
          A vállalkozás nyilvánosan közzétett elérhetőségei. A demón keresztül
          nem küldünk üzenetet.
        </p>
      </div>
      <div className="contact-grid">
        <section className="contact-card">
          <span className="eyebrow">SZAKÜZLET</span>
          <h2>Mappa Papír · Kiskunhalas</h2>
          <dl className="contact-details">
            <div>
              <dt>
                <MapPin />
                Cím
              </dt>
              <dd>{company.address}</dd>
            </div>
            <div>
              <dt>
                <Phone />
                Telefon
              </dt>
              <dd>
                <a href={company.phoneHref}>{company.phone}</a>
                <br />
                <a href="tel:+36305157175">+36 30 515 7175</a>
              </dd>
            </div>
            <div>
              <dt>
                <Mail />
                E-mail
              </dt>
              <dd>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </dd>
            </div>
            <div>
              <dt>
                <Clock />
                Közölt nyitvatartás
              </dt>
              <dd>
                Hétfő–péntek: 8:00–17:00
                <br />
                Szombat: 8:00–12:00
              </dd>
            </div>
          </dl>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=6400+Kiskunhalas+Kossuth+utca+13-15"
            target="_blank"
            rel="noreferrer"
            className="button primary"
          >
            Útvonal a szaküzlethez <ArrowUpRight size={18} />
          </a>
        </section>
        <section className="location-card">
          <div className="map-art" aria-hidden="true">
            <div className="map-road road-one" />
            <div className="map-road road-two" />
            <div className="map-road road-three" />
            <div className="map-block block-one" />
            <div className="map-block block-two" />
            <div className="map-pin">
              <MapPin size={32} />
            </div>
            <span>KISKUNHALAS</span>
            <small>Stilizált illusztráció, nem térkép</small>
          </div>
          <div className="warehouse">
            <span className="eyebrow">NAGYKERESKEDELMI RAKTÁR</span>
            <h2>Vasút utca 22.</h2>
            <p>
              6400 Kiskunhalas
              <br />
              <a href="tel:+3677521372">+36 77 521 372</a>
              <br />
              Hétfő–péntek: 8:00–16:00
            </p>
            <a
              className="text-link"
              href="https://www.google.com/maps/dir/?api=1&destination=6400+Kiskunhalas+Vasut+utca+22"
              target="_blank"
              rel="noreferrer"
            >
              Útvonal a raktárhoz <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </div>
      <p className="source-note">
        Forrás:{" "}
        <a href={company.source} target="_blank" rel="noreferrer">
          hivatalos kapcsolatoldal
        </a>
        ; az e-mail-cím forrása a{" "}
        <a href="https://www.mappapapir.hu/" target="_blank" rel="noreferrer">
          hivatalos főoldal
        </a>
        . Ellenőrzés: {company.checked} A nyitvatartás változhat; indulás előtt
        érdemes ellenőrizni.
      </p>
    </div>
  );
}
