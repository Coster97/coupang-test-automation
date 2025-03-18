export class SearchPage {
  constructor(page) {
    this.page = page;

    // 선택된 카테고리 이름 선택
    this.searchCategoryName = page.locator("#sbSelector_60773932");

    // 카테고리 드롭다운 펼치기 버튼 선택
    this.searchCategoryToggle = page.locator("#sbToggle_60773932");

    // 검색어 입력 필드 선택
    this.searchInput = page.locator("#headerSearchKeyword");

    // 검색 버튼 선택
    this.searchButton = page.locator("#headerSearchBtn"); // 사용 불가

    // 검색 결과 첫 항목 선택
    this.searchResult1 = page.locator(".search-product-wrap").nth(0);

    // 검색 결과 첫 항목의 제품명 선택
    this.searchResult1Name = this.searchResult1.locator(
      "div.descriptions-inner > .name"
    );

    // 검색 결과 없을 시 메시지 선택
    this.searchResultNullMessage = page.locator(".message");
  }

  // 홈 페이지로 이동 (HTTP 헤더 수정 추가)
  async goto() {
    await this.page.setExtraHTTPHeaders({
      "sec-ch-ua": `"Chromium";v="125", "Not.A/Brand";v="24"`,
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "accept-language": "ko-KR,ko;q=0.9",
    });

    await this.page.goto("https://www.coupang.com/", {
      waitUntil: "domcontentloaded",
    });
  }

  async search(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press("Enter");
  }
}
