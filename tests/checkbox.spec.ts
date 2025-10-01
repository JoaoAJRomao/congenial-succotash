import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demoqa.com/checkbox");
});

test.describe("Element Interaction Tests - check box", () => {
  test("should expand all folders and verify all items are checked", async ({ page }) => {
    await page.click('button[title="Expand all"]');
    await page.click('//span[text()="Home"]');

    const checkboxes = page.locator('.rct-checkbox');
    for (const checkbox of await checkboxes.all()) {
      await expect(checkbox).toBeChecked();
    }

    const expectedItems = [
      "home",
      "desktop",
      "notes",
      "commands",
      "documents",
      "workspace",
      "react",
      "angular",
      "veu",
      "office",
      "public",
      "private",
      "classified",
      "general",
      "downloads",
      "wordFile",
      "excelFile",
    ];

    const resultItemsLocator = page.locator("#result .text-success");

    // Verifica se todos os textos esperados estão visíveis de uma só vez.
    // A ordem não importa para toHaveText quando o argumento é um array.
    await expect(resultItemsLocator).toHaveText(expectedItems);
  });
});