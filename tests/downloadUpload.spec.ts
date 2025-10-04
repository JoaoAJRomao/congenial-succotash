import { expect, test } from '@playwright/test';

test.describe('File Download and Upload Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/upload-download');
    });
    test('Verify that the file is downloaded successfully', async ({ page }) => {
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('#downloadButton').click()
        ]);
        const path = await download.path();
        expect(path).not.toBeNull();
    });

    test('Verify that the file is uploaded successfully', async ({ page }) => {
        const filePath = './tests/resources/peopleProgram.png';
        await page.setInputFiles('#uploadFile', filePath);
        expect(await page.locator('#uploadedFilePath').isVisible()).toBeTruthy();
        expect(await page.locator('#uploadedFilePath').textContent()).toContain('C:\\fakepath\\peopleProgram.png');
    });
});