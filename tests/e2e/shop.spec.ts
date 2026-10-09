import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("browse, select a variant, add, persist, edit and remove cart", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Minden jó ötlet",
  );
  await page
    .getByRole("link", { name: "Liget pontozott notesz A5", exact: true })
    .click();
  await page.getByRole("radio", { name: "Terrakotta", exact: true }).check();
  await page.getByRole("spinbutton", { name: "Termék: mennyiség" }).fill("3");
  await page.getByRole("button", { name: "Demókosárba teszem" }).click();
  await page
    .getByRole("link", { name: "Kosár, 3 termék", exact: true })
    .click();
  await expect(page.locator(".summary-total")).toContainText("7 470");
  await page.reload();
  await expect(page.getByText("Terrakotta", { exact: true })).toBeVisible();
  await page.getByRole("spinbutton").fill("2");
  await expect(page.locator(".summary-total")).toContainText("4 980");
  await page
    .getByRole("button", { name: "Liget pontozott notesz A5 eltávolítása" })
    .click();
  await expect(page.getByText("A következő ötlet még rád vár.")).toBeVisible();
  await page.reload();
  await expect(page.getByText("A következő ötlet még rád vár.")).toBeVisible();
  expect(errors).toEqual([]);
});
test("search, filters, sorting, empty state, URL restoration", async ({
  page,
}, testInfo) => {
  await page.goto("/termekek");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Szűrés", exact: true }).click();
  await page.getByRole("checkbox", { name: "Írószerek" }).check();
  await page.getByRole("spinbutton", { name: "Minimum (Ft)" }).fill("990");
  await page.getByRole("spinbutton", { name: "Maximum (Ft)" }).fill("1590");
  await page.getByRole("button", { name: "Árszűrő alkalmazása" }).click();
  await page
    .getByRole("combobox", { name: "Termékek rendezése" })
    .selectOption("price-asc");
  await expect(page.locator(".product-card")).toHaveCount(4);
  await expect(page.locator(".product-card").first()).toContainText(
    "Grafit ceruza",
  );
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page
    .getByRole("searchbox", { name: "Keresés a termékek között" })
    .fill("nincsenilyen999");
  await page
    .locator(".catalog-search")
    .getByRole("button", { name: "Keresés", exact: true })
    .click();
  await expect(page.getByText("Most nem találtunk ilyet.")).toBeVisible();
  await page.getByRole("button", { name: "Keresés és szűrők törlése" }).click();
  await expect(page.locator(".product-card")).toHaveCount(36);
  await page
    .getByRole("searchbox", { name: "Termékkeresés", exact: true })
    .fill("liget pontozoTT");
  await page.getByRole("button", { name: "Keresés indítása" }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
});
test("B2B sample list is editable and no checkout exists", async ({ page }) => {
  await page.goto("/ceges-vasarloknak");
  await page.getByRole("button", { name: "Mintalista a demókosárba" }).click();
  await page
    .getByRole("link", { name: "Kosár, 19 termék", exact: true })
    .click();
  await expect(page.locator(".cart-item")).toHaveCount(3);
  await expect(page.locator(".summary-total")).toContainText("27 310");
  await expect(
    page.getByText("Ez itt a demó vége.", { exact: false }),
  ).toBeVisible();
});
test("public pages: noindex, landmarks, accessibility and responsive layout", async ({
  page,
}, testInfo) => {
  for (const route of [
    "/",
    "/termekek",
    "/termek/liget-pontozott-notesz-a5",
    "/kosar",
    "/ceges-vasarloknak",
    "/nyomdai-szolgaltatasok",
    "/rolunk",
    "/kapcsolat",
    "/tajekoztato",
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const violations = scan.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        reason: n.failureSummary,
      })),
    }));
    expect(violations, route).toEqual([]);
  }
  await page.goto("/");
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
test("keyboard navigation, categories and not-found page", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Ugrás a tartalomhoz" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Menü megnyitása" }).click();
  await page.getByRole("button", { name: "Összes kategória" }).click();
  await page
    .locator("#category-dropdown")
    .getByRole("link", { name: "Iskolaszerek" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Iskolaszerek",
  );
  await expect(page.locator(".product-card")).toHaveCount(6);
  const response = await page.goto("/termek/nincs-ilyen-termek");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Ezt az oldalt nem találjuk.",
  );
});
