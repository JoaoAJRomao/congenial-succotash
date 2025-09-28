import { test, expect, type Page } from "@playwright/test";
import { LOCATORS, TEXT } from "../fixtures/textBoxElements";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");
});

test.describe("Element Interaction Tests - text box", () => {

  test("should permit only the name to be filled in", async ({ page,}) => {
    await page.fill(LOCATORS.FULL_NAME_INPUT, TEXT.FULL_NAME);
    await page.click(LOCATORS.SUBMIT_BUTTON);

  });
  
  test("should fill in the text boxes and submit the form", async ({ page,}) => {
    await page.fill(LOCATORS.FULL_NAME_INPUT, TEXT.FULL_NAME);
    await page.fill(LOCATORS.EMAIL_INPUT, TEXT.EMAIL);
    await page.fill(LOCATORS.CURRENT_ADDRESS_INPUT, TEXT.CURRENT_ADDRESS);
    await page.fill(LOCATORS.PERMANENT_ADDRESS_INPUT, TEXT.PERMANENT_ADDRESS);
    await page.click(LOCATORS.SUBMIT_BUTTON);

    await expect(page.locator(LOCATORS.OUTPUT_NAME)).toHaveText(TEXT.OUTPUT_NAME);
    await expect(page.locator(LOCATORS.OUTPUT_EMAIL)).toHaveText(TEXT.OUTPUT_EMAIL);
    await expect(page.locator(LOCATORS.OUTPUT_CURRENT_ADDRESS)).toHaveText(TEXT.OUTPUT_CURRENT_ADDRESS);
    await expect(page.locator(LOCATORS.OUTPUT_PERMANENT_ADDRESS)).toHaveText(TEXT.OUTPUT_PERMANENT_ADDRESS);
  });
});
