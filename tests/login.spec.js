// import { test, expect } from "@playwright/test";
// import { LoginPage } from "../pom/loginPage";

// // ---------- 이메일 유효성 검사 ----------

// // LOGIN_EMAIL_TC001
// test("LOGIN_EMAIL_TC001: 아이디(이메일) 필드가 비어 있을 시 오류 메시지 표시", async ({
//   page,
// }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();
//   await loginPage.login("", "test1357!");
//   await loginPage.getEmailErrorMessage();

//   expect(loginPage.emailErrorMessage).toBeVisible();
//   expect(loginPage.emailErrorMessage).toHaveText(
//     "아이디(이메일)를 입력해주세요."
//   );
// });

// // LOGIN_EMAIL_TC002
// test("LOGIN_EMAIL_TC002: 이메일 형식 오류 시 오류 메시지 표시", async ({
//   page,
// }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();
//   await loginPage.login("abcd123", "");

//   await loginPage.getEmailErrorMessage();
//   expect(loginPage.emailErrorMessage).toBeVisible();
//   expect(loginPage.emailErrorMessage).toHaveText(
//     "아이디는 이메일 형식으로 입력해주세요."
//   );
// });

// //LOGIN_EMAIL_TC003 -> 데이터 요청 실패 팝업
// test("LOGIN_EMAIL_TC003: 존재하지 않는 이메일 입력 시 오류 메시지 표시", async ({
//   page,
// }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();
//   await loginPage.login("dmsrud150122@naver.com", "test1357!");
//   await loginPage.getIntegrationErrorMessage();

//   expect(loginPage.integrationErrorMessage).toBeVisible();
//   expect(loginPage.integrationErrorMessage).toHaveText(
//     "이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요."
//   );
// });

// //---------- 비밀번호 유효성 검사 ----------

// //LOGIN_EMAIL_TC004
// test("LOGIN_EMAIL_TC004: 비밀번호 입력 없이 로그인 버튼 클릭 시 오류 ", async ({
//   page,
// }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();
//   await loginPage.login("dmsrud1501222@google.com", "");
//   await loginPage.getPassErrorMessage();

//   expect(loginPage.passErrorMessage).toBeVisible();
//   expect(loginPage.passErrorMessage).toHaveText("비밀번호를 입력해주세요.");
// });

// //LOGIN_EMAIL_TC005 -> 데이터 요청 실패 팝업
// test("LOGIN_EMAIL_TC005: 올바른 이메일 + 틀린 비밀번호 입력 시 오류", async ({
//   page,
// }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();
//   await loginPage.login("dmsrud1501222@google.com", "test1357!");
//   await loginPage.getIntegrationErrorMessage();

//   expect(loginPage.integrationErrorMessage).toBeVisible();
//   expect(loginPage.integrationErrorMessage).toHaveText(
//     "이메일 또는 비밀번호를 다시 확인하세요. 쿠팡에 등록되지 않은 이메일이거나, 이메일 또는 비밀번호를 잘못 입력하셨습니다."
//   );
// });

// //LOGIN_EMAIL_TC006
// test("LOGIN_EMAIL_TC006: 이메일 & 비밀번호 모두 틀린 경우 오류 표시", async ({
//   page,
// }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();
//   await loginPage.login("dmsrud15012@google.com", "test1357!");
//   await loginPage.getIntegrationErrorMessage();

//   expect(loginPage.integrationErrorMessage).toBeVisible();
//   expect(loginPage.integrationErrorMessage).toHaveText(
//     "이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요."
//   );
// });

// //LOGIN_EMAIL_TC007
// test("LOGIN_EMAIL_TC007: 이메일 필드에 입력 후 ‘x’ 버튼 클릭 시 입력값 삭제", async ({
//   page,
// }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();
//   await loginPage.emailInput.fill("test@example.com");
//   await loginPage.clearButton.click();

//   await expect(loginPage.emailInput).toHaveValue("");
// });

// //LOGIN_EMAIL_TC008
// test("LOGIN_EMAIL_TC008: 비밀번호 필드 눈 아이콘 클릭 시 암호화 해제", async ({
//   page,
// }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();
//   await loginPage.passwordInput.fill("test");
//   await loginPage.passToText.click();

//   expect(loginPage.passwordInput).toHaveAttribute("type", "text");
// });

// //LOGIN_EMAIL_TC009
// test("LOGIN_EMAIL_TC009: 올바른 이메일과 비밀번호 입력 후 로그인 성공", async ({
//   page,
// }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();
//   await loginPage.login("dmsrud1501222@google.com", "test1357!");

//   await page.waitForURL("https://www.coupang.com/");
//   await expect(page).toHaveURL("https://www.coupang.com/");
// });
