import {expect, test} from '@playwright/test';

test.describe('Nested frames interaction', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/nestedframes');
    });
    test('Verify that the parent frame contains the expected text', async ({ page }) => {
        const parentFrame = page.frameLocator('#frame1');
        await expect(parentFrame.locator('body')).toContainText('Parent frame');
    });
    test('Verify that the child iframe is displayed and contains the expected text', async ({ page }) => {
        const parentFrame = page.frameLocator('#frame1');
        const childFrame = parentFrame.frameLocator('iframe');
        await expect(childFrame.locator('body')).toHaveText('Child Iframe');
    });
});