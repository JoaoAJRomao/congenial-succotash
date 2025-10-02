import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/radio-button");
});

test.describe('Element Interaction Tests - radio button', () => {
    test('should select each radio button and verify its value', async ({ page }) => {
        // Clica no label associado ao radio button 'Yes'
        await page.locator('label[for="yesRadio"]').click();
        await expect(page.locator('.text-success')).toHaveText('Yes');

        // Clica no label associado ao radio button 'Impressive'
        await page.locator('label[for="impressiveRadio"]').click();
        await expect(page.locator('.text-success')).toHaveText('Impressive');

        // Verifica que o radio button 'No' está desabilitado
        await expect(page.locator('#noRadio')).toBeDisabled();
    });
});