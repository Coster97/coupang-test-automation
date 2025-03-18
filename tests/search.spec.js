import { test, expect } from "@playwright/test";
import { SearchPage } from "../pom/searchPage";

// ---------- 상품 검색 ----------

// SEARCH_TC001
test("SEARCH_TC001: 존재하는 상품 키워드 검색 시 정상 출력 확인", async ({
  page,
}) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.search("사과");

  await expect(page).toHaveURL(
    "https://www.coupang.com/np/search?component=&q=사과&channel=user"
  );
  expect(searchPage.searchResult1).toBeVisible();
  expect(searchPage.searchResult1Name).toContainText("사과");
});

// SEARCH_TC002
test("SEARCH_TC002: 존재하지 않는 상품 키워드 검색 시 정상 출력 확인", async ({
  page,
}) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.search('"');

  expect(searchPage.searchResultNullMessage).toBeVisible();
  expect(searchPage.searchResultNullMessage).toContainText(
    "검색결과가 없습니다."
  );
});

// SEARCH_TC003
test("SEARCH_TC003: 빈 검색어 입력 시 동작 확인", async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.search(" ");

  await expect(page).toHaveURL("https://www.coupang.com/");
});
