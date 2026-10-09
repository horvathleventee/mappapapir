import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="container empty-state error-page">
      <p className="eyebrow">404 · EZ A LAP MÉG ÜRES</p>
      <h1>Ezt az oldalt nem találjuk.</h1>
      <p>De a következő jó ötleted talán már ott vár a katalógusban.</p>
      <Link className="button primary" href="/termekek">
        Tovább a termékekhez <ArrowRight size={18} />
      </Link>
    </div>
  );
}
