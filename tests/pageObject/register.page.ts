import { expect, Page } from "@playwright/test";
import { LOCATOR } from "../fixtures/registerElements";

export class RegisterPage {
    readonly page: Page;
    readonly firstNameInput: string;
    readonly lastNameInput: string;
    readonly userNameInput: string;
    readonly passwordInput: string;
    readonly captchaInput: string;
    readonly registerButton: string;
    readonly errorMessageRegister: string;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = LOCATOR.FIRST_NAME_INPUT;
        this.lastNameInput = LOCATOR.LAST_NAME_INPUT;
        this.userNameInput = LOCATOR.USERNAME_INPUT;
        this.passwordInput = LOCATOR.PASSWORD_INPUT;
        this.captchaInput = LOCATOR.CAPTCHA_INPUT;
        this.registerButton = LOCATOR.REGISTER_BUTTON;
        this.errorMessageRegister = LOCATOR.ERROR_MESSAGE_REGISTER;
    }

    async register(firstName: string, lastName: string, username: string, password: string) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.userNameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.captchaInput);
        await this.page.click(this.registerButton);
    }

    /**
     * Realiza o login via API para acelerar a configuração do teste.
     * @param username - O nome de usuário para o login.
     * @param password - A senha para o login.
     */
    async registerViaAPI(username: string, password: string) {
        // Endpoint da API de registro
        const registerURL = 'https://demoqa.com/Account/v1/User';

        const response = await this.page.request.post(registerURL, {
            data: {
                userName: username,
                password: password
            }
        });

        // Verifica se a requisição foi bem-sucedida
        expect(response.ok()).toBeTruthy();
    }
}