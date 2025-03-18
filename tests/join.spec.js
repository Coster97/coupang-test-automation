import { test, expect } from "@playwright/test";
import { JoinPage } from "../pom/joinPage";

// ---------- 이메일 유효성 검사 ----------

// SIGN_TC001
test("SIGN_TC001: 이미 가입된 이메일 사용 시 오류 표시", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.emailInput.fill("dmsrud1501222@google.com");
  await joinPage.passInput.focus();
  await joinPage.getEmailErrorMessage();

  await expect(joinPage.emailErrorMessage).toBeVisible();
  expect(joinPage.emailErrorMessage).toHaveText(
    "이미 가입된 이메일 주소입니다."
  );

  expect(joinPage.loginButton).toHaveText("로그인");
  expect(joinPage.findPasswordButton).toHaveText("비밀번호 찾기");
});

// SIGN_TC002
test("SIGN_TC002: 올바르지 않은 이메일 형식 입력 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.emailInput.fill("validuser@example");
  await joinPage.passInput.focus();
  await joinPage.getEmailErrorMessage();

  expect(joinPage.emailErrorMessage).toBeVisible();
  expect(joinPage.emailErrorMessage).toHaveText(
    "이메일을 올바르게 입력해주세요."
  );
});

// SIGN_TC003
test("SIGN_TC003: 이메일 내 한글 또는 특수문자가 포함될 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.emailInput.fill("테스트 @example.com");
  await joinPage.passInput.focus();
  await joinPage.getEmailErrorMessage();

  expect(joinPage.emailErrorMessage).toBeVisible();
  expect(joinPage.emailErrorMessage).toHaveText(
    "이메일을 올바르게 입력해주세요."
  );
});

// SIGN_TC004
test("SIGN_TC004: 올바른 이메일 입력 시 정상 처리", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.emailInput.fill("dmsrud1501222@naver.com");
  await joinPage.passInput.focus();

  await expect(joinPage.emailVaild).toBeVisible();
});

// ---------- 비밀번호 유효성 검사 ----------

// SIGN_TC005
test("SIGN_TC005: 비밀번호 입력 필드 포커스 시 비밀번호 조건 툴팁 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.focus();

  expect(joinPage.passGuide1).toBeVisible();
  expect(joinPage.passGuide2).toBeVisible();
  expect(joinPage.passGuide3).toBeVisible();

  expect(joinPage.passGuide1).toHaveCSS("color", "rgb(136, 136, 136)");
});

// SIGN_TC006
test("SIGN_TC006: 비밀번호가 숫자로만 이뤄질 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("13571357");
  await joinPage.passCheckInput.focus();

  expect(joinPage.passGuide1).toBeVisible();
  expect(joinPage.passGuide1).toHaveText(
    "영문/숫자/특수문자 2가지 이상 조합 (8~20자)"
  );

  expect(joinPage.passGuide1).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC007
test("SIGN_TC007: 비밀번호가 문자로만 이뤄질 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("testtest");
  await joinPage.passCheckInput.focus();

  expect(joinPage.passGuide1).toBeVisible();
  expect(joinPage.passGuide1).toHaveText(
    "영문/숫자/특수문자 2가지 이상 조합 (8~20자)"
  );

  expect(joinPage.passGuide1).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC008
test("SIGN_TC008: 비밀번호가 특수문자로만 이뤄질 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("!@#$%^&*");
  await joinPage.passCheckInput.focus();

  expect(joinPage.passGuide1).toBeVisible();
  expect(joinPage.passGuide1).toHaveText(
    "영문/숫자/특수문자 2가지 이상 조합 (8~20자)"
  );

  expect(joinPage.passGuide1).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC009
test("SIGN_TC009: 비밀번호가 8자 미만일 시 오류 표시", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("test12!");
  await joinPage.passCheckInput.focus();

  expect(joinPage.passGuide1).toBeVisible();
  expect(joinPage.passGuide1).toHaveText(
    "영문/숫자/특수문자 2가지 이상 조합 (8~20자)"
  );

  expect(joinPage.passGuide1).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC010
test("SIGN_TC010: 비밀번호가 동일한 문자로 3개 이상 연속될 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("testttt@");
  await joinPage.passCheckInput.focus();

  expect(joinPage.passGuide2).toBeVisible();
  expect(joinPage.passGuide2).toHaveText(
    "3개 이상 연속되거나 동일한 문자/숫자 제외"
  );

  expect(joinPage.passGuide2).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC011
test("SIGN_TC011: 비밀번호가 동일한 숫자로 3개 이상 연속될 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("test1111@");
  await joinPage.passCheckInput.focus();

  expect(joinPage.passGuide2).toBeVisible();
  expect(joinPage.passGuide2).toHaveText(
    "3개 이상 연속되거나 동일한 문자/숫자 제외"
  );

  expect(joinPage.passGuide2).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC012
test("SIGN_TC012: 비밀번호가 다른 문자/숫자로 3개 이상 연속될 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("test1234@");
  await joinPage.passCheckInput.focus();

  expect(joinPage.passGuide2).toBeVisible();
  expect(joinPage.passGuide2).toHaveText(
    "3개 이상 연속되거나 동일한 문자/숫자 제외"
  );

  expect(joinPage.passGuide2).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC013
test("SIGN_TC013: 비밀번호가 공백을 포함할 시 오류 표시", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("Pass 135!");
  await joinPage.passCheckInput.focus();
  await joinPage.getPassErrorMessage();

  expect(joinPage.passErrorMessage).toBeVisible();
  expect(joinPage.passErrorMessage).toHaveText(
    "비밀번호에 사용할 수 없는 문자가 포함되어 있습니다."
  );
  expect(joinPage.passErrorMessage).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC014
test("SIGN_TC014: 비밀번호가 아이디(이메일) 형식일 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("validuser@example.com");
  await joinPage.passCheckInput.focus();

  expect(joinPage.passGuide3).toBeVisible();
  expect(joinPage.passGuide3).toHaveText("아이디(이메일) 제외");
});

// SIGN_TC015
test("SIGN_TC015: 모든 비밀번호 조건 충족 시 정상 입력 처리", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("Pass135!");
  await joinPage.passCheckInput.focus();

  expect(joinPage.passSuccessMessage).toBeVisible();
  expect(joinPage.passSuccessMessage).toHaveText("사용 가능한 비밀번호입니다.");
  expect(joinPage.passSuccessMessage).toHaveCSS("color", "rgb(0, 137, 26)");
  expect(joinPage.passVaild).toBeVisible();
});

// ---------- 비밀번호 확인 유효성 검사 ----------

// SIGN_TC016
test("SIGN_TC016: 비밀번호 확인 필드 포커스 시 입력 요구 툴팁 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passCheckInput.focus();
  await joinPage.getPassCheckErrorMessage();

  console.log(joinPage.getPassCheckErrorMessage());

  expect(joinPage.passCheckErrorMessage).toBeVisible();
  expect(joinPage.passCheckErrorMessage).toHaveCSS(
    "color",
    "rgb(136, 136, 136)"
  );
});

// SIGN_TC017
test("SIGN_TC017: 비밀번호 필드와 비밀번호 확인 필드의 값이 다를 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("test1357!");
  await joinPage.passCheckInput.fill("test135!");
  await joinPage.getPassCheckErrorMessage();

  expect(joinPage.passCheckErrorMessage).toBeVisible();
  expect(joinPage.passCheckErrorMessage).toHaveText(
    "새 비밀번호가 일치하지 않습니다."
  );
  expect(joinPage.passCheckErrorMessage).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC018
test("SIGN_TC018: 올바른 비밀번호 입력 시 정상 처리", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.passInput.fill("test1357!");
  await joinPage.passCheckInput.fill("test1357!");
  await joinPage.getPassCheckSuccessMessage();

  expect(joinPage.passCheckSuccessMessage).toBeVisible();
  expect(joinPage.passCheckSuccessMessage).toHaveText(
    "새 비밀번호가 일치합니다."
  );
  expect(joinPage.passCheckSuccessMessage).toHaveCSS(
    "color",
    "rgb(0, 137, 26)"
  );
  expect(joinPage.passCheckVaild).toBeVisible();
});

// ---------- 이름 유효성 검사 ----------

// SIGN_TC019
test("SIGN_TC019: 이름이 2자 미만일 시 오류 표시", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.nameInput.fill("테");
  await joinPage.phoneInput.focus();
  await joinPage.getNameErrorMessage();

  expect(joinPage.nameErrorMessage).toBeVisible();
  expect(joinPage.nameErrorMessage).toHaveText("이름을 정확히 입력하세요.");
  expect(joinPage.nameErrorMessage).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC020
test("SIGN_TC020: 이름 앞에 공백이 포함될 시 오류 표시", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.nameInput.fill(" 테스터");
  await joinPage.phoneInput.focus();
  await joinPage.getNameErrorMessage();

  expect(joinPage.nameErrorMessage).toBeVisible();
  expect(joinPage.nameErrorMessage).toHaveText("이름을 정확히 입력하세요.");
  expect(joinPage.nameErrorMessage).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC021
test("SIGN_TC021: 이름 뒤에 공백이 포함될 시 오류 표시", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.nameInput.fill("테스터 ");
  await joinPage.phoneInput.focus();
  await joinPage.getNameErrorMessage();

  expect(joinPage.nameErrorMessage).toBeVisible();
  expect(joinPage.nameErrorMessage).toHaveText("이름을 정확히 입력하세요.");
  expect(joinPage.nameErrorMessage).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC022
test("SIGN_TC022: 이름에 특수문자가 포함될 시 오류 표시", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.nameInput.fill("테스터@");
  await joinPage.phoneInput.focus();
  await joinPage.getNameErrorMessage();

  expect(joinPage.nameErrorMessage).toBeVisible();
  expect(joinPage.nameErrorMessage).toHaveText("이름을 정확히 입력하세요.");
  expect(joinPage.nameErrorMessage).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC023
test("SIGN_TC023: 이름에 숫자가 포함될 시 오류 표시", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.nameInput.fill("테스터1");
  await joinPage.phoneInput.focus();
  await joinPage.getNameErrorMessage();

  expect(joinPage.nameErrorMessage).toBeVisible();
  expect(joinPage.nameErrorMessage).toHaveText("이름을 정확히 입력하세요.");
  expect(joinPage.nameErrorMessage).toHaveCSS("color", "rgb(229, 37, 40)");
});

// SIGN_TC024
test("SIGN_TC024: 올바른 이름 입력 시 정상 처리", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.nameInput.fill("테스터");
  await joinPage.phoneInput.focus();

  await page.waitForSelector("span._joinNameValid", {
    state: "visible",
    timeout: 7000,
  });
  await expect(joinPage.nameValid).toBeVisible();
});

// ---------- 휴대폰 번호 유효성 검사 ----------

// // SIGN_TC025
// test("SIGN_TC025: 이미 가입된 휴대폰 번호일 시 오류 표시", async ({ page }) => {
//   const joinPage = new JoinPage(page);

//   await joinPage.goto();
//   await joinPage.phoneInput.fill("010 8021 9867");
//   await joinPage.nameInput.focus();
//   await joinPage.getPhoneErrorMessage();

//   expect(joinPage.phoneErrorMessage).toBeVisible();
//   expect(joinPage.phoneErrorMessage).toHaveText(
//     "아이디(이메일)로 가입된 휴대폰 번호입니다."
//   );
// });

// SIGN_TC026
test("SIGN_TC026: 휴대폰 번호가 10자 미만일 시 오류 표시 (공백제외)", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.phoneInput.fill("010 123 456");
  await joinPage.nameInput.focus();
  await joinPage.getPhoneErrorMessage();

  expect(joinPage.phoneErrorMessage).toBeVisible();
  expect(joinPage.phoneErrorMessage).toHaveText(
    "휴대폰 번호를 정확하게 입력하세요."
  );
});

// SIGN_TC027
test("SIGN_TC027: 휴대폰 번호가 11자 초과일 시 오류 표시 (공백제외)", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.phoneInput.fill("010 1234 56789");
  await joinPage.nameInput.focus();
  await joinPage.getPhoneErrorMessage();

  expect(joinPage.phoneErrorMessage).toBeVisible();
  expect(joinPage.phoneErrorMessage).toHaveText(
    "휴대폰 번호를 정확하게 입력하세요."
  );
});

// SIGN_TC028
test("SIGN_TC028: 휴대폰 번호 국번 010, 011 외 오류 표시", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.phoneInput.fill("012 1234 5678");
  await joinPage.nameInput.focus();
  await joinPage.getPhoneErrorMessage();

  expect(joinPage.phoneErrorMessage).toBeVisible();
  expect(joinPage.phoneErrorMessage).toHaveText(
    "휴대폰 번호를 정확하게 입력하세요."
  );
});

// SIGN_TC029
test("SIGN_TC029: 휴대폰 번호에 문자가 포함될 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.phoneInput.fill("010 8021 9867a");
  await joinPage.nameInput.focus();
  await joinPage.getPhoneErrorMessage();

  expect(joinPage.phoneErrorMessage).toBeVisible();
  expect(joinPage.phoneErrorMessage).toHaveText(
    "휴대폰 번호를 정확하게 입력하세요."
  );
});

// SIGN_TC030
test("SIGN_TC030: 휴대폰 번호에 특수문자가 포함될 시 오류 표시 (공백제외)", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.phoneInput.fill("010 8021 9867!");
  await joinPage.nameInput.focus();
  await joinPage.getPhoneErrorMessage();

  expect(joinPage.phoneErrorMessage).toBeVisible();
  expect(joinPage.phoneErrorMessage).toHaveText(
    "휴대폰 번호를 정확하게 입력하세요."
  );
});

// // SIGN_TC031
// test("SIGN_TC031: 올바른 휴대폰 번호 입력 시 정상 처리", async ({ page }) => {
//   const joinPage = new JoinPage(page);

//   await joinPage.goto();
//   await joinPage.phoneInput.fill("01100009000");
//   await joinPage.nameInput.focus();

//   await page.waitForSelector("span._joinPhoneValid", {
//     state: "visible",
//     timeout: 7000,
//   });
//   await expect(joinPage.phoneValid).toBeVisible();
// });

// ---------- 약관 동의 버튼 동작 및 팝업 검사 ----------

// SIGN_TC032
test("SIGN_TC032: 전체 약관 동의 버튼 활성화 동작 검증", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.checkAll.click();

  expect(joinPage.checkAll).toHaveAttribute("aria-checked", "true");

  for (const [key, checkbox] of Object.entries(joinPage.checkboxes)) {
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
  }
});

// SIGN_TC033
test("SIGN_TC033: 전체 약관 동의 버튼 비활성화 동작 검증", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.checkAll.click();
  await joinPage.checkAll.click();

  expect(joinPage.checkAll).toHaveAttribute("aria-checked", "false");

  for (const [key, checkbox] of Object.entries(joinPage.checkboxes)) {
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  }
});

// SIGN_TC034
test("SIGN_TC034: 필수 약관을 하나라도 선택하지 않을 시 오류 표시", async ({
  page,
}) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.checkAll.click();

  for (const [key, checkbox] of Object.entries(joinPage.checkboxes)) {
    if (key == "fourteen") await checkbox.click();
  }

  await joinPage.joinButton.click();

  expect(joinPage.checkErrorMessage).toBeVisible();
  expect(joinPage.checkErrorMessage).toHaveText(
    "필수 항목에 모두 동의해주세요"
  );
  expect(joinPage.checkErrorMessage).toHaveCSS("color", "rgb(203, 20, 0)");
});

// SIGN_TC035
test("SIGN_TC035: 항목별 이용 약관 모달 열림 확인", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.modalOpenButton.click();

  expect(joinPage.modalPage).toBeVisible();
});

// SIGN_TC036
test("SIGN_TC036: 항목별 이용 약관 모달 닫힘 확인", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.modalOpenButton.click();
  await joinPage.modalCloseButton.click();

  expect(joinPage.modalPage).toHaveCSS("display", "none");
});

// ---------- 필수 입력값 누락 검사 ----------


test()