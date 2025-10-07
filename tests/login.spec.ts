import { expect, test } from '@playwright/test';
import { LoginPage } from './pageObject/login.page';
import { generateRandomString } from './utils/data-helpers.ts';

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
        const loginPage = new LoginPage(page);
        const randomUsername = generateRandomString(8);
        const randomPassword = generateRandomString(8);

        await loginPage.login(randomUsername, randomPassword);

        await expect(page.locator('#output p')).toHaveText('Invalid username or password!');
    });
    test('should allow login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const randomUsername = generateRandomString(8);
        const randomPassword = generateRandomString(8);
        // Primeiro, registrar o usuário via API
        await loginPage.loginViaAPI(randomUsername, randomPassword);
        // Depois, realizar o login via UI
        await loginPage.login(randomUsername, randomPassword);
        await expect(page).toHaveURL('https://demoqa.com/profile');
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