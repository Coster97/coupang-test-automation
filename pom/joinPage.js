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

    // 비밀번호 입력값 오류 메시지 선택
    this.passErrorMessage = page
      .locator("div.member__input-guide-line--error")
      .nth(0)
      .locator("span:nth-child(2)");

    // 비밀번호 입력값 유효 메시지 선택
    this.passSuccessMessage = page
      .locator("div.member__input-guide-line--success")
      .nth(0)
      .locator("span:nth-child(2)");

    // 비밀번호 확인 오류 메시지 선택
    this.passCheckErrorMessage = page
      .locator(
        "div:nth-child(3) > .member__input-field > .member__input-guide-area > .member__input-guide-line > span"
      )
      .nth(1);

    // 비밀번호 확인 입력값 유효 메시지 선택
    this.passCheckSuccessMessage = page
      .locator(
        "div:nth-child(3) > .member__input-field > .member__input-guide-area > .member__input-guide-line > span"
      )
      .nth(1);

    // 이름 입력값 오류 메시지 선택
    this.nameErrorMessage = page
      .locator(
        "div[class*='member__message-area'][class*='member__message-area--error']"
      )
      .filter({ hasText: "이름을 정확히 입력하세요" });

    // 휴대폰 번호 입력값 오류 메시지 선택
    this.phoneErrorMessage = page.locator(
      "div._joinPhoneExpand > .member__message-area--error"
    );

    // 이메일 유효 표시 아이콘 선택
    this.emailVaild = page.locator(
      "span[class*='member__input-group'][class*='member__input-group--validator'][class*='_joinEmailValid']"
    );

    // 비밀번호 유효 표시 아이콘 선택
    this.passVaild = page.locator("#__join__password__valid");

    // 비밀번호 확인 입력값 유효 표시 아이콘 선택
    this.passCheckVaild = page.locator(
      "span[class*='member__input-group'][class*='member__input-group--validator'][class*='_joinPasswordAgainValid']"
    );

    // 이름 입력값 유효 표시 아이콘 선택
    this.nameValid = page.locator("span._joinNameValid");

    // 휴대폰 번호 입력값 유효 표시 아이콘 선택
    this.phoneValid = page.locator("span._joinPhoneValid");

    // 로그인 버튼과 비밀번호 찾기 버튼 요소 선택
    this.loginButton = page.locator("a.join__button", { hasText: "로그인" });
    this.findPasswordButton = page.locator("a.join__button", {
      hasText: "비밀번호 찾기",
    });

    // 이메일 오류 메시지 선택
    this.emailErrorMessage = page.locator(
      "div.member__expand-field._joinEmailExpand div.member__message-area--error"
    );

    // 전체동의 체크박스 선택
    this.checkAll = page.locator("label[for='chk_checkall']");

    // 체크박스를 객체(Map) 형태로 관리
    this.checkboxes = {
      fourteen: page.locator("label[for='chk_join-terms-fourteen']"),
      service: page.locator("label[for='chk_join-terms-service']"),
      finance: page.locator("label[for='chk_join-terms-commerce']"),
      privacy: page.locator("label[for='chk_join-terms-privacy-collect-use']"),
      thirdParty: page.locator(
        "label[for='chk_agree-to-collect-third-part-information']"
      ),
      marketing: page.locator("label[for='chk_POLICY_AGREE_COLLECT']"),
      ads: page.locator("label[for='chk_agree-to-receive-ads']"),
      email: page.locator("label[for='chk_POLICY_AGREE_EMAIL']"),
      sms: page.locator("label[for='chk_POLICY_AGREE_SMS']"),
      push: page.locator("label[for='chk_POLICY_AGREE_MARKETING_PUSH']"),
    };

    // 약관 동의 오류 메시지 선택
    this.checkErrorMessage = page.locator(".error-tip");

    // 동의하고 가입하기 버튼 선택
    this.joinButton = page.locator(
      "button[class*='join__button'][class*='join__button--blue-large-block'][class*='_joinTrigger']"
    );

    // 약관 열기/닫기 버튼 선택
    this.modalOpenButton = page.locator("button.icon-right-arrow").nth(0);
    this.modalCloseButton = page.locator("div.icon-close").nth(0);

    // 약관 모달 선택
    this.modalPage = page.locator(".g-modal");
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

  // 비밀번호 입력값 유효 메시지 확인
  async getPassSuccessMessage() {
    return await this.passSuccessMessage.textContent();
  }

  // 비밀번호 확인 오류 메시지 확인
  async getPassCheckErrorMessage() {
    return await this.passCheckErrorMessage.textContent();
  }

  // 비밀번호 확인 입력값 유효 메시지 확인
  async getPassCheckSuccessMessage() {
    return await this.passCheckSuccessMessage.textContent();
  }

  // 이름 입력값 오류 메시지 확인
  async getNameErrorMessage() {
    return await this.nameErrorMessage.textContent();
  }

  // 휴대폰 번호 입력값 오류 메시지 확인
  async getPhoneErrorMessage() {
    return await this.phoneErrorMessage.textContent();
  }
}
