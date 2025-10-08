import {expect,test} from '@playwright/test';

test.describe('Alerts Interaction Tests',()=>{ 
    test.beforeEach(async({page})=>{
        await page.goto('https://demoqa.com/alerts');
    });
    test('Verify that the alert is displayed with the expected message',async({page})=>{
        page.on('dialog',async dialog=>{
            expect(dialog.message()).toBe('You clicked a button');
            await dialog.accept();
        });
        await page.click('//button[@id="alertButton"]');
    });
    test('Verify that the confirm alert is displayed with the expected message and accept it',async({page})=>{
        page.on('dialog',async dialog=>{
            expect(dialog.message()).toBe('Do you confirm action?');
            await dialog.accept();
        });
        await page.click('//button[@id="confirmButton"]');
        await expect(page.locator('//span[@id="confirmResult"]')).toHaveText('You selected Ok');
    });
    test('Verify that the confirm alert is displayed with the expected message and dismiss it',async({page})=>{
        page.on('dialog',async dialog=>{
            expect(dialog.message()).toBe('Do you confirm action?');
            await dialog.dismiss();
        });
        await page.click('//button[@id="confirmButton"]');
        await expect(page.locator('//span[@id="confirmResult"]')).toHaveText('You selected Cancel');
    });
    test('Verify that the prompt alert is displayed with the expected message, enter text and accept it',async({page})=>{
        const inputText='Playwright Test';
        page.on('dialog',async dialog=>{
            expect(dialog.message()).toBe('Please enter your name');
            await dialog.accept(inputText);
        });
        await page.click('//button[@id="promtButton"]');
        await expect(page.locator('//span[@id="promptResult"]')).toHaveText(`You entered ${inputText}`);
    });
    test('Verify that the prompt alert is displayed with the expected message and dismiss it',async({page})=>{
        page.on('dialog',async dialog=>{
            expect(dialog.message()).toBe('Please enter your name');
            await dialog.dismiss();
        });
        await page.click('//button[@id="promtButton"]');
        await expect(page.locator('//span[@id="promptResult"]')).toHaveCount(0);
    });
});