export class JoinPage {
  constructor(page) {
    this.page = page;

    // 입력 필드 선택
    this.emailInput = page.locator("#join-email-input");
    this.passInput = page.locator("#join-password-input");
    this.passCheckInput = page.locator("#join-password-again-input");
    this.nameInput = page.locator("#join-name-input");
    this.phoneInput = page.locator("#join-phone-input");

    // 비밀번호 가이드라인 선택
    this.passGuide1 = page.locator("div.member__input-guide-line").nth(0);
    this.passGuide2 = page.locator("div.member__input-guide-line").nth(1);
    this.passGuide3 = page.locator("div.member__input-guide-line").nth(2);

    // 비밀번호 오류 메시지 선택
    this.passErrorMessage = page
      .locator("div.member__input-guide-line--error")
      .nth(0)
      .locator("span:nth-child(2)");

    // 비밀번호 설정 성공 메시지 선택
    this.passSuccessMessage = page
      .locator("div.member__input-guide-line--success")
      .nth(0)
      .locator("span:nth-child(2)");

    // 이메일 유효 표시 아이콘 선택
    this.emailVaild = page.locator(
      "span[class*='member__input-group'][class*='member__input-group--validator'][class*='_joinEmailValid']"
    );

    this.passVaild = page.locator("#__join__password__valid");

    // 로그인 버튼과 비밀번호 찾기 버튼 요소 선택
    this.loginButton = page.locator("a.join__button", { hasText: "로그인" });
    this.findPasswordButton = page.locator("a.join__button", {
      hasText: "비밀번호 찾기",
    });

    // 이메일 오류 메시지 선택
    this.emailErrorMessage = page.locator(
      "div.member__expand-field._joinEmailExpand div.member__message-area--error"
    );

    // 동의하고 가입하기 버튼 선택

    this.joinButton = page.locator(
      "button[class*='join__button'][class*='join__button--blue-large-block'][class*='_joinTrigger']"
    );
  }

  // 회원가입 페이지로 이동
  async goto() {
    await this.page.goto("https://login.coupang.com/login/memberJoinFrm.pang");
  }

  // 회원가입
  async join(email, password, checkPassword, name, phone) {
    await this.emailInput.fill(email);
    await this.passInput.fill(password);
    await this.passCheckInput.fill(checkPassword);
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.joinButton.click();
  }

  // 이메일 오류 메시지 확인
  async getEmailErrorMessage() {
    return await this.emailErrorMessage.textContent();
  }

  // 비밀번호 오류 메시지 확인
  async getPassErrorMessage() {
    return await this.passErrorMessage.textContent();
  }

  // 비밀번호 설정 성공 메시지 확인
  async getPassSuccessMessage() {
    return await this.passSuccessMessage.textContent();
  }
}
