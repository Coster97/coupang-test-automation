import { test, expect } from "@playwright/test";
import { JoinPage } from "../pom/joinPage";

// ---------- 이메일 유효성 검사 ----------

// SIGN_TC001
test("SIGN_TC001: 이미 가입된 이메일 사용 시 오류 표시", async ({ page }) => {
  const joinPage = new JoinPage(page);

  await joinPage.goto();
  await joinPage.join("dmsrud1501222@google.com", " ", " ", " ", " ");
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
  await joinPage.join("validuser@example", " ", " ", " ", " ");
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
  await joinPage.join("테스트 @example.com", " ", " ", " ", " ");
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
  await joinPage.join("dmsrud1501222@naver.com", " ", " ", " ", " ");

  expect(joinPage.emailVaild).toBeVisible();
});

// ---------- 비밀번호 유효성 검사 ----------