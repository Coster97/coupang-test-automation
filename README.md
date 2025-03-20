# 🚀 Coupang Test Automation  

## 📌 프로젝트 개요  
본 프로젝트는 **쿠팡 웹사이트의 주요 기능을 자동화 테스트하여 품질을 검증**하기 위해 진행되었습니다.  
Playwright(JavaScript)를 활용하여 **회원가입 및 로그인 기능의 유효성 검증을 자동화**하는 것이 목표이며,  
테스트 결과를 효과적으로 분석하기 위해 **Allure Report를 연동**하여 테스트 리포트를 생성하였습니다.  

### 🔹 **초기 목표**  
- 회원가입, 로그인, 상품 검색, 장바구니, 결제 등 주요 기능 테스트 자동화  

### 🔹 **발생한 문제**  
- 쿠팡의 보안 시스템(Bot Detection)으로 인해 백엔드 요청이 차단됨  

### 🔹 **대응 방향**  
- 보안 시스템의 제한을 받지 않는 **UI 유효성 검사 테스트로 범위 조정**  

### 🔹 **테스트 항목**  
- **회원가입 및 로그인 입력 필드 유효성 검사 자동화**  

---

## 🛠️ 기술 스택  
- **Test Automation:** Playwright (JavaScript)  
- **Test Case Management:** Google Sheets  
- **Reporting:** Allure Report  

---

## ▶️ 실행 방법  

```sh
npm install
npx playwright install
npx playwright test
npx allure generate allure-results --clean
npx allure open
```


## 📌 프로젝트를 통해 배운 점
- Playwright(JavaScript)를 활용하여 입력 필드 검증 테스트 자동화 구축
- Allure Report를 활용하여 테스트 실행 내역을 시각적으로 분석하는 경험 습득
- Page Object Model(POM) 패턴을 적용하여 테스트 코드의 유지보수성을 향상

