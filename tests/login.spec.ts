import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/login');
    });
    test('should not allow login without credentials', async ({ page }) => { 
        await page.click('#login');
        await expect(page.locator('#userName')).toContainClass('mr-sm-2 is-invalid form-control');
        await expect(page.locator('#password')).toContainClass('mr-sm-2 is-invalid form-control');
    });
    test('should not allow login with only username', async ({ page }) => { 
        await page.fill('#userName', 'testuser');
        await page.click('#login');
        await expect(page.locator('#userName')).toContainClass('mr-sm-2 form-control');
        await expect(page.locator('#password')).toContainClass('mr-sm-2 is-invalid form-control');
    });
    test('should not allow login with only password', async ({ page }) => { 
        await page.fill('#password', 'testpassword');
        await page.click('#login');
        await expect(page.locator('#userName')).toContainClass('mr-sm-2 is-invalid form-control');
        await expect(page.locator('#password')).toContainClass('mr-sm-2 form-control');
    });
    test('should not allow login with invalid credentials', async ({ page }) => {
        await page.fill('#userName', 'invaliduser');
        await page.fill('#password', 'invalidpassword');
        await page.click('#login');
        await expect(page.locator('#output p')).toHaveText('Invalid username or password!');
     });
    test.skip('should allow login with valid credentials', async ({ page }) => { 
        // This test is skipped because it requires valid credentials
    });
});

test.skip('Registration Page', () => {
    test('should not allow registration without required fields', async ({ page }) => { });
    test('should not allow registration without first name', async ({ page }) => { });
    test('should not allow registration without last name', async ({ page }) => { });
    test('should not allow registration without username', async ({ page }) => { });
    test('should not allow registration without password', async ({ page }) => { });
    test('should not allow registration without confirm captcha', async ({ page }) => { });
    test('should not allow registration with existing username', async ({ page }) => { });
    test('should allow registration with valid data', async ({ page }) => { });

});