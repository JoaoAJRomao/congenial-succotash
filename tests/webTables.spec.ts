import { test, expect } from "@playwright/test";
import { WebTables } from "../pageObject/webTables.page";

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

    test.describe('Edit, delete, and search records', () => {
        test.beforeEach(async ({ page }) => {
            // Create a record to edit, delete, and search
            const webtables = new WebTables(page);
            await webtables.addNewRecord('John', 'Doe', 'test@example.com', 30, 50000, 'Engineering');
        });

        test('should edit an existing record and verify the changes', async ({ page }) => {
            // Locate the row to edit
            const rowToEdit = page.locator('.rt-tr-group', { hasText: 'test@example.com' });
            
            // Click the edit button
            await rowToEdit.locator('.action-buttons [title="Edit"]').click();
            
            // Update the form fields
            await page.locator('#firstName').fill('Jane');
            await page.locator('#lastName').fill('Smith');
            await page.locator('#userEmail').fill('jane.smith@example.com');
            await page.locator('#age').fill('28');
            await page.locator('#salary').fill('60000');
            await page.locator('#department').fill('Marketing');
            
            // Click the submit button
            await page.locator('#submit').click();
            
            const rowEdited = page.locator('.rt-tr-group', { hasText: 'jane.smith@example.com' });
            
            // Verify that the updated row contains the new data
            await expect(rowEdited.locator('.rt-td')).toHaveText([
                'Jane',
                'Smith',
                '28',
                'jane.smith@example.com',
                '60000',
                'Marketing',
                ' '
            ]);
        });

        test('should delete a record and verify its absence from the table', async ({ page }) => {
            // Locate the row to delete
            const rowToDelete = page.locator('.rt-tr-group', { hasText: 'test@example.com' });

            // Click the delete button
            await rowToDelete.locator('.action-buttons [title="Delete"]').click();

            // Verify that the row is no longer present
            await expect(rowToDelete).toBeHidden();
        });

        test('should search for a record and verify the search results', async ({ page }) => {
            // Fill the search input
            await page.locator('#searchBox').fill('John');

            // Verify that the correct row is displayed
            await expect(page.locator('.rt-tr-group', { hasText: 'John' })).toBeVisible();
        });
    });
});
