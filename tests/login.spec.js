import { test, expect } from "@playwright/test";
import { LoginPage } from "./loginPage";

// ---------- 이메일 유효성 검사 ----------

// LOGIN_EMAIL_TC001
test("LOGIN_EMAIL_TC001: 아이디(이메일) 필드가 비어 있을 시 오류 메시지 표시", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("", "test1357!");
  await loginPage.getEmailErrorMessage();

  expect(loginPage.emailErrorMessage).toBeVisible();
  expect(loginPage.emailErrorMessage).toHaveText(
    "아이디(이메일)를 입력해주세요."
  );
});

// LOGIN_EMAIL_TC002
test("LOGIN_EMAIL_TC002: 이메일 형식 오류 시 오류 메시지 표시", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("abcd123", "");
  await loginPage.getEmailErrorMessage();

  expect(loginPage.emailErrorMessage).toBeVisible();
  expect(loginPage.emailErrorMessage).toHaveText(
    "아이디는 이메일 형식으로 입력해주세요."
  );
});

//LOGIN_EMAIL_TC003 -> 데이터 요청 실패 팝업
test("LOGIN_EMAIL_TC003: 존재하지 않는 이메일 입력 시 오류 메시지 표시", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("dmsrud150122@naver.com", "test1357!");

  // 🔥 팝업 감지 및 닫기
  try {
    const popup = page.locator("text=데이터 요청에 실패 하였습니다.");
    await popup.waitFor({ state: "visible", timeout: 5000 });

    // 확인 버튼이 보일 때까지 기다렸다가 클릭
    const confirmButton = page.locator("text=확인");
    await confirmButton.waitFor({ state: "visible", timeout: 5000 });
    await confirmButton.click({ force: true });

    console.log("🚨 팝업 감지됨! 확인 버튼 클릭 완료");
  } catch (error) {
    console.log("팝업이 나타나지 않았거나 이미 닫힘.");
  }

  await loginPage.getIntegrationErrorMessage();

  await expect(loginPage.integrationErrorMessage).toBeVisible();
  expect(loginPage.integrationErrorMessage).toHaveText(
    "이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요."
  );
});

//---------- 비밀번호 유효성 검사 ----------

//LOGIN_EMAIL_TC004
test("LOGIN_EMAIL_TC004: 비밀번호 입력 없이 로그인 버튼 클릭 시 오류 ", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("dmsrud1501222@google.com");
  await loginPage.getPassErrorMessage();

  await expect(loginPage.passErrorMessage).toBeVisible();
  expect(loginPage.passErrorMessage).toHaveText("비밀번호를 입력해주세요.");
});

