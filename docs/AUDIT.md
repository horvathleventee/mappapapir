# Mappa Papír – üzleti és UX audit

Ellenőrzés: 2026. október 8. Független demó, a vállalkozással nincs kapcsolatunk.

## Módszer és korlátok

A nyilvános céges honlap főoldalát, bemutatkozását, kapcsolatoldalát és webáruház-GYIK-jét szöveges lekéréssel vizsgáltuk. A webshop megadott PHP-oldala nem volt elérhető az eszközzel; a HTTPS-gyökér időtúllépést adott. Ez nem bizonyít általános üzemzavart. A webshop vizuális és mobilos megjelenése, keresője, terméklistái, termékadatlapjai és kosara nem volt közvetlenül ellenőrizhető. Nincs mért konverziós vagy teljesítményadat. Nem jelentkeztünk be és nem küldtünk rendelést.

## Ellenőrzött megfigyelések

- A szolgáltatásokat bemutató honlap és a webshop külön aldomainen található. A navigáció nyomdai, kötészeti és tervezési szolgáltatásokra, bemutatkozásra és kapcsolatra vezet.
- Termékcsoportok között szerepelnek írószerek, iratrendezők, papírok, irodaszerek és kreatív kellékek.
- A GYIK regisztrációt és e-mailes aktiválást ír le; a szállítás és fizetés beállításai az ügyféladatokhoz kapcsolódnak. Ez a dokumentáció leírása, a jelenlegi működést nem ellenőriztük.
- A bemutatkozás lakossági és céges célcsoportot, kereskedelmi és nyomdai tevékenységeket ismertet.
- A kapcsolatoldal külön szaküzleti és nagykereskedelmi elérhetőségeket közöl.

## Javaslatok és döntések

| Terület                    | Alap                                        | Demó megoldás                                                                    |
| -------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------- |
| Navigáció                  | Külön honlap és webshop                     | Közös fejléc és kereső, hat áttekinthető kategória, B2B és nyomdai útvonal       |
| Keresés és listázás        | A jelenlegi működés nem ellenőrizhető       | Ékezetfüggetlen keresés, ár- és kategóriaszűrés, rendezés, URL-ben tárolt szűrők |
| Termékadatlap              | A jelenlegi felület nem vizsgálható         | Jellemzők, demóár, változat és mennyiség egy helyen                              |
| Kosár                      | A GYIK több lépéses fiókfolyamatot ír le    | Fiók nélküli demókosár helyi mentéssel                                           |
| Céges beszerzés            | A céges célcsoport igazolható               | Kipróbálható irodai mintalista; fiók és egyedi ár csak jövőbeli koncepció        |
| Nyomda                     | Több szolgáltatás a nyilvános oldalon       | Három szolgáltatáscsoport, forrás és kapcsolat                                   |
| Vizuális és mobilos élmény | Teljes vizuális audit nem áll rendelkezésre | Önálló arculat, reszponzív rácsok, mobilos menü és szűrő, látható fókusz         |

Az üzleti eredmény javulása hipotézis; felhasználói teszttel és későbbi, engedélyezett analitikával mérhető. A régi oldal jogi szövegeit nem vesszük át.

## Információs architektúra és designrendszer

Főoldal → Katalógus → Kategória → Termék → Demókosár. További oldalak: Rólunk, Céges vásárlóknak, Nyomdai szolgáltatások, Kapcsolat, Demótájékoztató. Nincs pénztár vagy regisztráció.

Meleg törtfehér alap, tintakék szövegek, terrakotta akciók, visszafogott kártyák. Saját vektoros termékillusztrációk; nem a kereskedő termékfotói. Minden oldalon demójelölés. Nincs kitalált értékelés, kedvezmény, készlet vagy szállítási ígéret.

## Források

- https://www.mappapapir.hu/
- https://www.mappapapir.hu/index.php/rolunk
- https://www.mappapapir.hu/index.php/kapcsolat
- https://www.mappapapir.hu/index.php/183-webaruhaz-gyik
- http://webshop.mappapapir.hu/php/mainlapgen.php?tartalom=fooldal (nem elérhető az ellenőrző eszközzel)
