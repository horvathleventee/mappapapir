# Mappa Papír – független webshopdemó

Magyar nyelvű, reszponzív papír-írószer bemutató Next.js App Routerrel. Nem a vállalkozás hivatalos webshopja; nem állunk kapcsolatban a céggel. Nincs rendelésfeldolgozás, fizetés vagy személyesadat-gyűjtő űrlap.

## Indítás

Ajánlott: Node.js 22.13 vagy újabb támogatott LTS, npm. A fejlesztési környezet Node 22.11 alatt is futtatta a buildet és teszteket, de az egyik lint-függőség legalább 22.13-at kér.

```sh
npm ci
npm run dev -- --port 4318
```

Fejlesztői cím: http://127.0.0.1:4318

Production előnézet:

```sh
npm run build
npm run start -- --port 4318
```

A 4318-as port ajánlott, mert ezen a gépen a 3000-es portot más alkalmazás is használja. A böngészőtesztek külön, 4317-es porton indítják saját production szerverüket. A projekt nem igényel környezeti változót, adatbázist, API-kulcsot vagy bejelentkezést. A szerver csak a helyi gépen figyel.

## Technológiák

- Next.js 16 App Router, React 19, TypeScript strict mód.
- Tailwind CSS 4 és egyedi, reszponzív designrendszer.
- Lucide React ikonok, saját SVG-termékillusztrációk; nincs külső kép- vagy betűtípusletöltés.
- React Context és `useSyncExternalStore` a kliensoldali kosárhoz.
- Zod a böngészőből visszatöltött kosáradatok ellenőrzéséhez.
- Node test runner + tsx az egységtesztekhez; Playwright és axe-core a böngészős ellenőrzésekhez.

A pontos telepített verziókat a `package-lock.json` rögzíti.

## Elkészült funkciók

- Főoldal heroillusztrációval, hat kategóriával, kiemelt termékekkel, B2B- és nyomdai szekcióval.
- 36 különálló demótermék: részletes leírás, jellemzők, kép, bruttó demóár, néhány terméknél változatok.
- Ékezetfüggetlen, több szavas keresés névben, leírásban és tulajdonságokban.
- Kombinálható kategória- és minimum/maximum árszűrés, név és ár szerinti rendezés, találatszám és üres állapot. A feltételek az URL-ben maradnak.
- Hat kategóriaoldal és 36 előre generált termékútvonal, termékenkénti metadata, kapcsolódó termékek.
- Mennyiségválasztó; kosárba helyezés; változatonként külön tétel; mennyiségmódosítás, törlés és összesítés.
- Helyi kosármentés és böngészőfülek közötti szinkronizálás. Sérült vagy idegen termékre hivatkozó adatok kezelése; változatonként 99 darabos demókorlát.
- B2B mintalista kosárba helyezéssel. Nincs valódi céges fiók vagy egyedi ár; ezek tervezett integrációs lehetőségek.
- Rólunk, nyomdai szolgáltatások, ellenőrzött elérhetőségek, külső útvonaltervező és demótájékoztató.
- Mobilos navigáció és összecsukható szűrőpanel, billentyűzetfókusz, ugrás a tartalomra, feliratozott vezérlők, csökkentett mozgás támogatása.
- Saját 404- és hibakezelő oldal.
- Minden oldalon demójelölés, `noindex` metadata, `X-Robots-Tag` fejléc és tiltó robots.txt. Nincs megtévesztő Product/Offer strukturált adat.

## Projektstruktúra

```text
src/app/                 App Router oldalak, metadata, globális stílus
src/components/          Újrahasználható felület, katalógus és kosár
src/data/products.ts     Különálló, saját demótermék-adatforrás
src/data/content.ts      Ellenőrzött nyilvános céges tartalom
src/lib/models.ts        Adatmodellek
src/lib/catalog.ts       Keresés, szűrés és termék-repository adapter
src/lib/cart.ts          Tiszta kosárműveletek és Zod-validáció
src/lib/cart-store.ts    Helyi tároló és böngészőfül-szinkronizálás
tests/                   Keresési és kosár-egységtesztek
tests/e2e/               Asztali és mobilos böngészőtesztek
docs/AUDIT.md            Forrásolt UX/üzleti audit és információs architektúra
```

## Adatforrások és korlátok

A terméknevek, leírások, árak és SVG-ábrák ehhez a bemutatóhoz készültek. Nem másoltuk a cég termékadatbázisát, képeit vagy eredeti logóját. A képek stilizált bemutató illusztrációk; bizonyos termékek egy közös illusztrációcsaládot használnak. Nincsenek valós értékelések, készletadatok vagy kedvezmények.

A cég bemutatását és kapcsolatadatait a nyilvános hivatalos honlapról ellenőriztük 2026. október 8-án. A források az auditban és az érintett oldalakon szerepelnek. A webshop nem volt elérhető az ellenőrző webes eszközzel, ezért annak vizuális, mobilos és tényleges vásárlási folyamatáról nem állítunk ellenőrzött eredményt.

A kosár csak a böngésző helyi tárhelyén él (`mappa-demo-cart-v1`). Nincs szerveroldali ügyféladatbázis, követőkód, hírlevél vagy külső betűtípus. A külső honlap-, telefon-, e-mail- és térképhivatkozások a felhasználó kifejezett kattintására nyílnak meg.

## Ellenőrzések

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

A böngészőtesztekhez telepített Microsoft Edge szükséges. Más környezetben a `playwright.config.ts` mindkét projektjéből hagyd el a `channel: 'msedge'` beállítást, majd telepíts Chromiumot: `npx playwright install chromium`.

A tesztek ellenőrzik a keresési és árszűrési határokat, rendezést, hibás tárolt adatokat, kosárműveleteket, változatokat, újratöltés utáni megőrzést, B2B mintalistát, mobilos vezérlőket, metadata-fejléceket, oldalelrendezést és az axe WCAG 2.2 AA szabályai által automatizálható feltételeket. Az automatizált akadálymentességi vizsgálat nem teljes WCAG-megfelelőségi tanúsítás; képernyőolvasós és további valós eszközös tesztelés ajánlott.

## Ismert korlátok

- Szándékosan nincs fizetés, rendelés, regisztráció, valódi készlet, szerződéses árazás vagy ajánlatbeküldés.
- A helyi mentés tiltása esetén a kosár csak a megnyitott oldalon marad meg; a kosárban erről tájékoztató jelenik meg.
- A telefonos és nyitvatartási adatokat bemutatás előtt érdemes ismét ellenőrizni.
- A fejlesztői függőségek auditja egy `braces`-hez kapcsolódó tranzitív problémát jelez öt csomagnál a Next ESLint-láncban. Az ajánlott automatikus javítás a Next lint-konfigurációt régebbi főverzióra cserélné, ezért nem alkalmaztuk vakon. A futtatási függőségek ellenőrzése (`npm audit --omit=dev`) nem jelzett sérülékenységet az ellenőrzéskor.
- Nincs éles hosztolás, külső integráció vagy jogi dokumentáció. Ez lokálisan bemutatható prototípus.

## Későbbi webshopintegráció

A `productRepository` az adatforrás cseréjének belépési pontja. Valódi integrációnál érdemes aszinkron repository-szerződésre váltani, API-válaszokat Zoddal validálni, és külön DTO-ból képezni a `Product` modellt. A kliens kosarában termékazonosító, változat és mennyiség van, nem megbízható ár: éles rendelés előtt a szervernek kell újraszámolnia az árat, ellenőriznie a készletet, jogosultságot és adózási szabályokat. A demóadatforrás külön maradjon a valós adatoktól.

Céges fiók, szerződéses árak, rendelési előzmények, fizetés és adminisztráció külön, engedélyezett backend-integrációt igényel. Az élesítés előtt szükséges a cég jóváhagyása, tartalom- és képlicencek, jogi dokumentumok, adatvédelmi és biztonsági felülvizsgálat. A demó noindex-védelmét csak ellenőrzött hivatalos élesítéskor indokolt feloldani.
