import {expect,test} from '@playwright/test';

test.describe('Frames Interaction Tests',()=>{
    test.beforeEach(async({page})=>{
        await page.goto('https://demoqa.com/frames');
    });
    test('Verify that the iframe is displayed and contains the expected text',async({page})=>{
        const frame = await page.frameLocator('#frame1');
        await expect(frame.locator('h1')).toHaveText('This is a sample page');
    });
    test('Verify that the second iframe is displayed and contains the expected text',async({page})=>{
        const frame = await page.frameLocator('#frame2');
        await expect(frame.locator('h1')).toHaveText('This is a sample page');
    });
});