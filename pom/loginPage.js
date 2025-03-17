export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("#login-email-input");
    this.passwordInput = page.locator("#login-password-input");
    this.loginButton = page.getByRole("button", { name: "로그인" });
    this.emailErrorMessage = page
      .locator("div.member__message-area--error._memberInputMessage")
      .first();
    this.passErrorMessage = page.locator(
      "div.member__message-area--error._loginPasswordError"
    );
    this.integrationErrorMessage = page.locator(
      "div.member__message-area--error._loginCommonError"
    );

    this.clearButton = page.locator(
      "button[class*='member__util-trigger'][class*='_loginIdClear']"
    );
    this.passToText = page.locator(
      "button[class*='member__util-trigger'][class*='_loginPasswordShowTrigger']"
    );
  }

  async goto() {
    await this.page.goto(
      "https://login.coupang.com/login/login.pang?rtnUrl=https%3A%2F%2Fwww.coupang.com%2Fnp%2Fpost%2Flogin%3Fr%3Dhttps%253A%252F%252Fwww.coupang.com%252F"
    );
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getEmailErrorMessage() {
    return await this.emailErrorMessage.textContent();
  }

  async getPassErrorMessage() {
    return await this.passErrorMessage.textContent();
  }

  async getIntegrationErrorMessage() {
    return await this.integrationErrorMessage.textContent();
  }
}
