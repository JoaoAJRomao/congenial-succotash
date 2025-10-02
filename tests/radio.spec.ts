import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/radio-button");
});

test.describe('Element Interaction Tests - radio button', () => {
    test('should select each radio button and verify its value', async ({ page }) => {
        // Click the label associated with the 'Yes' radio button
        await page.locator('label[for="yesRadio"]').click();
        await expect(page.locator('.text-success')).toHaveText('Yes');

        // Click the label associated with the 'Impressive' radio button
        await page.locator('label[for="impressiveRadio"]').click();
        await expect(page.locator('.text-success')).toHaveText('Impressive');

        // Verify that the 'No' radio button is disabled
        await expect(page.locator('#noRadio')).toBeDisabled();
    });
});