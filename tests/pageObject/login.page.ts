import { LOCATOR } from "../fixtures/loginElements";
import { Page, expect } from "@playwright/test";

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

    /**
     * Realiza o login via API para acelerar a configuração do teste.
     * @param username - O nome de usuário para o login.
     * @param password - A senha para o login.
     */
    async loginViaAPI(username: string, password: string) {
        // Endpoint da API de login
        const loginURL = 'https://demoqa.com/Account/v1/User';

        const response = await this.page.request.post(loginURL, {
            data: {
                userName: username,
                password: password
            }
        });

        // Verifica se a requisição foi bem-sucedida
        expect(response.ok()).toBeTruthy();
    }
};
