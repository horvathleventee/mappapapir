import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Mappa Papír – Helyet az ötleteknek | Független demó",
    template: "%s | Mappa Papír demó",
  },
  description:
    "Független papír-írószer webshopdemó. Fedezd fel a bemutató katalógust, próbáld ki a keresést és a demókosarat. Nincs valódi rendelés.",
  robots: { index: false, follow: false, nocache: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body>
        <a className="skip-link" href="#main">
          Ugrás a tartalomhoz
        </a>
        <CartProvider>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
