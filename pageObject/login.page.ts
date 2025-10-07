import { LOCATOR } from "../fixtures/loginElements";
import { Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly fullNameInput: string;
    readonly passwordInput: string;
    readonly loginButton: string;

    constructor(page: Page) {
        this.page = page;
        this.fullNameInput = LOCATOR.FULL_NAME_INPUT;
        this.passwordInput = LOCATOR.PASSWORD_INPUT;
        this.loginButton = LOCATOR.LOGIN_BUTTON;
    }

    async login(username: string, password: string) {
        await this.page.fill(this.fullNameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

};
