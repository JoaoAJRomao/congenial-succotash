import {expect, test } from '@playwright/test';

test.describe('Button Interaction Tests - buttons', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/buttons');
    });

    test('should perform double click and verify the messages', async ({ page }) => {
        // Perform double click action
        await page.locator('#doubleClickBtn').dblclick();
        // Verify the double click message
        await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');
    });

    test('should perform right click action and verify the message', async ({ page }) => {
        // Perform right click action
        await page.locator('#rightClickBtn').click({ button: 'right' });
        // Verify the right click message
        await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click');
    });

    test('should perform single click action and verify the message', async ({ page }) => {
        // Perform single click action
        await page.locator('//button[text()="Click Me"]').click();
        // Verify the single click message
        await expect(page.locator('#dynamicClickMessage')).toHaveText('You have done a dynamic click');
    });
});