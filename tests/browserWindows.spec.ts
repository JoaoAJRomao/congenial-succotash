import { expect, test } from '@playwright/test';

test.describe('Browser Windows Interaction Tests - browserWindows', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/browser-windows');
    });
    test('Verify that the new tab is opened and contains the expected text', async ({ page }) => {
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.click('//button[@id="tabButton"]')
        ]);
        await newPage.waitForLoadState();
        expect(newPage.url()).toBe('https://demoqa.com/sample');
        await expect(newPage.locator('//h1[@id="sampleHeading"]')).toHaveText('This is a sample page');
    });

    test('Verify that the new window is opened and contains the expected text', async ({ page }) => {
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.click('//button[@id="windowButton"]')
        ]);
        await newPage.waitForLoadState();
        expect(newPage.url()).toBe('https://demoqa.com/sample');
        await expect(newPage.locator('//h1[@id="sampleHeading"]')).toHaveText('This is a sample page');
    });
    test('Verify that the new window message is opened and contains the expected text', async ({ page }) => {
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.click('//button[@id="messageWindowButton"]')
        ]);
        await newPage.waitForLoadState();
        const bodyText = await newPage.locator('body').innerText();
        await expect(bodyText.length).toBeGreaterThan(0);
        await expect(bodyText).toContain('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
    });
}); 