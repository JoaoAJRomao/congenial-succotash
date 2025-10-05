import { expect, test } from "@playwright/test";

test.describe("Form Interaction Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");
    page.waitForLoadState("domcontentloaded", {timeout: 60000});
    await page.evaluate(() => {
      // Remove ad banners and footer that can obscure elements.
      const selectors = ["#adplus-anchor", "footer"];
      for (const selector of selectors) {
        const element = document.querySelector(selector);
        element?.remove();
      }
    });
  });

  test("Verify that the form is filled successfully", async ({ page }) => {
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#userEmail", "test@example.com");
    await page.click('input[value="Male"]', { force: true });
    await page.fill("#userNumber", "1234567890");
    await page.click("#dateOfBirthInput");
    await page.selectOption(".react-datepicker__month-select", "4");
    await page.selectOption(".react-datepicker__year-select", "1990");
    await page.click(".react-datepicker__day--001");
    await page.locator("#subjectsInput").type("Maths");
    await page.getByText("Maths", { exact: true }).click({force: true});
    // await page.keyboard.press("Enter");
    await page.getByLabel('Sports').click({force: true});
    const filePath = "./tests/resources/peopleProgram.png";
    await page.setInputFiles("#uploadPicture", filePath);
    await page.fill("#currentAddress", "123 Main St, Anytown, USA");

    await page.locator("#state input").type("NCR", { delay: 100 });
    await page.keyboard.press("Enter");
    await page.locator("#city input").type("Delhi", { delay: 100 });
    await page.keyboard.press("Enter");

    await page.locator("#submit").click({force: true});
    await page.locator("#example-modal-sizes-title-lg").waitFor({ state: "visible" });
    await expect(page.locator("#example-modal-sizes-title-lg")).toHaveText("Thanks for submitting the form");

    const expectedData = {
      "Student Name": "John Doe",
      "Student Email": "test@example.com",
      "Gender": "Male",
      "Mobile": "1234567890",
      "Date of Birth": "01 May,1990",
      "Subjects": "Maths",
      "Hobbies": "Sports",
      "Picture": "peopleProgram.png",
      "Address": "123 Main St, Anytown, USA",
      "State and City": "NCR Delhi",
    };

    for (const [label, value] of Object.entries(expectedData)) {
      await test.step(`Verificando: ${label}`, async () => {
        const row = page.locator("tr", { has: page.getByRole("cell", { name: label }) });
        await expect(row.getByRole("cell").nth(1)).toHaveText(value);
      });
    }
  });
});
