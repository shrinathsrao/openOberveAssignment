import { expect, Page } from '@playwright/test';

export class LoginPage {
  page: Page;
  private usernameField = '[data-test="login-user-id"]';
  private passwordField = '[data-test="login-password"]';
  private loginButton = 'button:has-text("Login")';
  private loginValidationElement = '[data-test="menu-link-\\/reports-item"]';
  private logoutButton1 = '[data-test="header-my-account-profile-icon"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.page.locator(this.usernameField).waitFor({ state: 'visible' });
    await this.page.locator(this.usernameField).fill(username);

    await this.page.locator(this.passwordField).waitFor({ state: 'visible' });
    await this.page.locator(this.passwordField).fill(password);

    await this.page.locator(this.loginButton).click();
  }

  async logout(username: string) {
    await this.page.locator(this.logoutButton1).click();

    await this.page.getByText('Sign Out').waitFor({ state: 'visible' });
    await this.page.getByText('Sign Out').click();

    await expect(this.page.locator(this.usernameField)).toBeVisible();
  }

  async invalidCredsValidation(message: string) {
    await expect(this.page.getByText(message)).toBeVisible({ timeout: 10000 });
  }
}
