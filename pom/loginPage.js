export class LoginPage {
  constructor(page) {
    this.page = page;

    // 입력 필드 선택
    this.emailInput = page.locator("#login-email-input");
    this.passwordInput = page.locator("#login-password-input");

    // 로그인 버튼 선택
    this.loginButton = page.getByRole("button", { name: "로그인" });

    // 입력값 오류 메시지
    this.emailErrorMessage = page
      .locator("div.member__message-area--error._memberInputMessage")
      .first();
    this.passErrorMessage = page.locator(
      "div.member__message-area--error._loginPasswordError"
    );
    this.integrationErrorMessage = page.locator(
      "div.member__message-area--error._loginCommonError"
    );

    // 이메일 값 삭제 버튼 선택
    this.clearButton = page.locator(
      "button[class*='member__util-trigger'][class*='_loginIdClear']"
    );

    // 비밀번호 값 암호화 해제 버튼 선택
    this.passToText = page.locator(
      "button[class*='member__util-trigger'][class*='_loginPasswordShowTrigger']"
    );
  }

  // 로그인 페이지로 이동
  async goto() {
    await this.page.goto(
      "https://login.coupang.com/login/login.pang?rtnUrl=https%3A%2F%2Fwww.coupang.com%2Fnp%2Fpost%2Flogin%3Fr%3Dhttps%253A%252F%252Fwww.coupang.com%252F"
    );
  }

  // 로그인
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // 이메일 오류 메시지 확인
  async getEmailErrorMessage() {
    return await this.emailErrorMessage.textContent();
  }

  // 비밀번호 오류 메시지 확인
  async getPassErrorMessage() {
    return await this.passErrorMessage.textContent();
  }

  async getIntegrationErrorMessage() {
    return await this.integrationErrorMessage.textContent();
  }
}
