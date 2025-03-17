export class JoinPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("#join-email-input");
    this.passInput = page.locator("#join-password-input");
    this.passCheckInput = page.locator("#join-password-again-input");
    this.nameInput = page.locator("#join-name-input");
    this.phoneInput = page.locator("#join-phone-input");

    this.emailVaild = page.locator(
      "span[class*='member__input-group'][class*='member__input-group--validator'][class*='_joinEmailValid']"
    );

    // 로그인 버튼과 비밀번호 찾기 버튼 요소 선택
    this.loginButton = page.locator("a.join__button", { hasText: "로그인" });
    this.findPasswordButton = page.locator("a.join__button", {
      hasText: "비밀번호 찾기",
    });

    this.emailErrorMessage = page.locator(
      "div.member__expand-field._joinEmailExpand div.member__message-area--error"
    );

    this.joinButton = page.locator(
      "button[class*='join__button'][class*='join__button--blue-large-block'][class*='_joinTrigger']"
    );
  }

  async goto() {
    await this.page.goto("https://login.coupang.com/login/memberJoinFrm.pang");
  }

  async join(email, password, checkPassword, name, phone) {
    await this.emailInput.fill(email);
    await this.passInput.fill(password);
    await this.passCheckInput.fill(checkPassword);
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.joinButton.click();
  }

  async getEmailErrorMessage() {
    return await this.emailErrorMessage.textContent();
  }
}
