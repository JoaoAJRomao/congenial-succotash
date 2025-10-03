import {expect, test} from '@playwright/test';
import { time } from 'console';

test.describe('Link Interaction Tests - links', () => {
    const targetLink = 'https://demoqa.com';
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/links');
    });

    test('Verify that the simple link open a new tab', async ({ page }) => {
        await expect(page.locator('//a[@id="simpleLink"]')).toHaveAttribute('href', targetLink);
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.click('//a[@id="simpleLink"]')
        ]);
        await newPage.waitForLoadState();
        expect(newPage.url()).toBe('https://demoqa.com/');
    });

    test('Verify that the dynamic link opens a new tab', async ({ page }) => {
        await expect(page.locator('//a[@id="dynamicLink"]')).toHaveAttribute('href', targetLink);
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.click('//a[@id="dynamicLink"]')
        ]);
        await newPage.waitForLoadState();
        expect(newPage.url()).toBe('https://demoqa.com/');
    });

    test('Verify that the created link returns 201 status code', async ({ page }) => {
        page.on('response', response => {
            if (response.url().includes('/created')) {
                expect(response.status()).toBe(201);
                expect(response.statusText()).toBe('Created');
            }
        });
        await page.click('//a[@id="created"]');
        await page.locator('//p[@id="linkResponse"]').waitFor({ state: 'visible' });
        expect(page.locator('//p[@id="linkResponse"]')).toHaveText('Link has responded with staus 201 and status text Created');
    });

    test('Verify that the no-content link returns 204 status code', async ({ page }) => {
        page.on('response', response => {
            if (response.url().includes('/no-content')) {
                expect(response.status()).toBe(204);
                expect(response.statusText()).toBe('No Content');
            }
        });
        await page.click('//a[@id="no-content"]');
        await page.locator('//p[@id="linkResponse"]').waitFor({ state: 'visible' });
        expect(page.locator('//p[@id="linkResponse"]')).toHaveText('Link has responded with staus 204 and status text No Content');
    });

    test('Verify that the moved link returns 301 status code', async ({ page }) => {
        page.on('response', response => {
            if (response.url().includes('/moved')) {
                expect(response.status()).toBe(301);
                expect(response.statusText()).toBe('Moved Permanently');
            }
        });
        await page.click('//a[@id="moved"]');
        await page.locator('//p[@id="linkResponse"]').waitFor({ state: 'visible' });
        expect(page.locator('//p[@id="linkResponse"]')).toHaveText('Link has responded with staus 301 and status text Moved Permanently');
    });

    test('Verify that the bad-request link returns 400 status code', async ({ page }) => {
        page.on('response', response => {
            if (response.url().includes('/bad-request')) {
                expect(response.status()).toBe(400);
                expect(response.statusText()).toBe('Bad Request');
            }
        });
        await page.click('//a[@id="bad-request"]');
        await page.locator('//p[@id="linkResponse"]').waitFor({ state: 'visible' });
        expect(page.locator('//p[@id="linkResponse"]')).toHaveText('Link has responded with staus 400 and status text Bad Request');
    });

    test('Verify that the unauthorized link returns 401 status code', async ({ page }) => {
        page.on('response', response => {
            if (response.url().includes('/unauthorized')) {
                expect(response.status()).toBe(401);
                expect(response.statusText()).toBe('Unauthorized');
            }
        });
        await page.click('//a[@id="unauthorized"]');
        await page.locator('//p[@id="linkResponse"]').waitFor({ state: 'visible' });
        expect(page.locator('//p[@id="linkResponse"]')).toHaveText('Link has responded with staus 401 and status text Unauthorized');
    });

    test('Verify that the forbidden link returns 403 status code', async ({ page }) => {
        page.on('response', response => {
            if (response.url().includes('/forbidden')) {
                expect(response.status()).toBe(403);
                expect(response.statusText()).toBe('Forbidden');
            }
        });         
        await page.click('//a[@id="forbidden"]');
        await page.locator('//p[@id="linkResponse"]').waitFor({ state: 'visible' });
        expect(page.locator('//p[@id="linkResponse"]')).toHaveText('Link has responded with staus 403 and status text Forbidden');
    });

    test('Verify that the not-found link returns 404 status code', async ({ page }) => {
        page.on('response', response => {
            if (response.url().includes('/not-found')) {
                expect(response.status()).toBe(404);
                expect(response.statusText()).toBe('Not Found');
            }
        });
        await page.click('//a[@id="invalid-url"]');
        await page.locator('//p[@id="linkResponse"]').waitFor({ state: 'visible' });
        expect(page.locator('//p[@id="linkResponse"]')).toHaveText('Link has responded with staus 404 and status text Not Found');
    });
});