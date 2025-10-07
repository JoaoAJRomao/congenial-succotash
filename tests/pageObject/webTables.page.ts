import { Page } from "@playwright/test";
export class WebTables {
    readonly page;
    readonly addButton;
    readonly firstNameInput;
    readonly lastNameInput;
    readonly emailInput;
    readonly ageInput;
    readonly salaryInput;
    readonly departmentInput;
    readonly submitButton;
    readonly searchInput;   
    readonly tableRows;

    constructor(page: Page) {
        this.page = page;
        this.addButton = page.locator('#addNewRecordButton');
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.ageInput = page.locator('#age');
        this.salaryInput = page.locator('#salary');
        this.departmentInput = page.locator('#department');
        this.submitButton = page.locator('#submit');
        this.searchInput = page.locator('#searchBox');
        this.tableRows = page.locator('.rt-tr-group');  
    }

    async addNewRecord(firstName: string, lastName: string, email: string, age: number, salary: number, department: string) {
        await this.addButton.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.ageInput.fill(age.toString());
        await this.salaryInput.fill(salary.toString());
        await this.departmentInput.fill(department);
        await this.submitButton.click();
    }
    async searchRecord(query: string) {
        await this.searchInput.fill(query);
    }
    async getRowByEmail(email: string) {
        return this.page.locator('.rt-tr-group', { hasText: email });
    }
}