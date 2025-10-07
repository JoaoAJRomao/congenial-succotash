import { test, expect } from '@playwright/test';
import { RegisterPage } from './pageObject/register.page';
import { generateRandomString } from './utils/data-helpers.ts';

test.skip('Registration Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/register');
        page.waitForLoadState("domcontentloaded", { timeout: 60000 });
        await page.evaluate(() => {
            // Remove ad banners and footer that can obscure elements.
            const selectors = ["#adplus-anchor", "footer"];
            for (const selector of selectors) {
                const element = document.querySelector(selector);
                element?.remove();
            }
        });
    });

    test('should not allow registration without required fields', async ({ page }) => {
        await page.click('#register');
        await expect(page.locator('#firstname')).toHaveClass("mr-sm-2 is-invalid form-control");
        await expect(page.locator('#lastname')).toHaveClass("mr-sm-2 is-invalid form-control");
        await expect(page.locator('#userName')).toHaveClass("mr-sm-2 is-invalid form-control");
        await expect(page.locator('#password')).toHaveClass("mr-sm-2 is-invalid form-control");
    });
    test.only('should not allow registration without first name', async ({ page }) => {
        await page.fill('#lastname', generateRandomString(5));
        await page.fill('#userName', generateRandomString(5));
        await page.fill('#password', generateRandomString(8));
        await page.locator('#register').scrollIntoViewIfNeeded();
        const recaptchaFrame = page.frameLocator('iframe[title="reCAPTCHA"]');
        await recaptchaFrame.locator('#recaptcha-anchor').click();
        await page.waitForTimeout(2000);
        await page.click('#register');
        await expect(page.locator('#firstname')).toHaveClass("mr-sm-2 is-invalid form-control");
    });
    test('should not allow registration without last name', async ({ page }) => { });
    test('should not allow registration without username', async ({ page }) => { });
    test('should not allow registration without password', async ({ page }) => { });
    test('should not allow registration without confirm captcha', async ({ page }) => { });
    test('should not allow registration with existing username', async ({ page }) => { });
    test('should allow registration with valid data', async ({ page }) => { });

});