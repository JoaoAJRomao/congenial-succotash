import {test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/webtables");
});

test.describe('Element Interaction Tests - web tables', () => {
    test('should add a new record and verify its presence in the table', async ({ page }) => {
        // Click button "Add"
        await page.locator('#addNewRecordButton').click();

        // Fill out the form fields
        await page.locator('#firstName').fill('John');
        await page.locator('#lastName').fill('Doe');
        await page.locator('#userEmail').fill('test@example.com');
        await page.locator('#age').fill('30');
        await page.locator('#salary').fill('50000');
        await page.locator('#department').fill('Engineering');

        // Click button "Submit"
        await page.locator('#submit').click();

        // Find the row containing the unique email of the new record.
        // This is a robust approach that does not depend on the row's position in the table.
        const newRow = page.locator('.rt-tr-group', { hasText: 'test@example.com' });

        // Verify that the text of all cells in the row matches the entered data.
        // The last item ' ' corresponds to the "Actions" column, which has no visible text.
        await expect(newRow.locator('.rt-td')).toHaveText([
            'John',
            'Doe',
            '30',
            'test@example.com',
            '50000',
            'Engineering',
            ' ' 
        ]);
    });
});
