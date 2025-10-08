import { expect, test } from '@playwright/test';

test.describe('Modal Dialogs Interaction Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/modal-dialogs');
    });
    test('Verify that the small modal dialog is displayed with the expected title and body text, then close it', async ({ page }) => {
        await page.click('//button[@id="showSmallModal"]');
        const modalTitle = page.locator('//div[@class="modal-title h4"]');
        await expect(modalTitle).toHaveText('Small Modal');
        const modalBody = page.locator('//div[@class="modal-body"]');
        await expect(modalBody).toHaveText('This is a small modal. It has very less content');
        await expect(page.locator('//button[@class="close"]')).toBeVisible();
        await page.click('//button[@id="closeSmallModal"]');
        await expect(modalTitle).toHaveCount(0);
    });
    test('Verify that the large modal dialog is displayed with the expected title and body text, then close it', async ({ page }) => {
        const expectedText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
        await page.click('//button[@id="showLargeModal"]');
        const modalTitle = page.locator('//div[@class="modal-title h4"]');
        await expect(modalTitle).toHaveText('Large Modal');
        const modalBody = page.locator('//div[@class="modal-body"]');
        await expect(modalBody).toHaveText(expectedText);
        await expect(page.locator('//button[@class="close"]')).toBeVisible();
        await page.click('//button[@id="closeLargeModal"]');
        await expect(modalTitle).toHaveCount(0);
    });
});
