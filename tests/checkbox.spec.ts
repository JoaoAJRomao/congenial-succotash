import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demoqa.com/checkbox");
});

test.describe("Element Interaction Tests - check box", () => {
  test("should expand all folders and verify all items are checked", async ({ page }) => {
    await page.click('button[title="Expand all"]');
    const checkboxes = page.locator('.rct-checkbox');
    const checkboxCount = await checkboxes.count();

    for (let i = 0; i < checkboxCount; i++) {
      await checkboxes.nth(i).click();
    }

    for (const checkbox of await checkboxes.all()) {
      await expect(checkbox).toBeChecked();
    }
  });
});