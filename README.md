# FAQCustomer Support Site

Eleventy를 사용한 고객지원 FAQ 웹사이트입니다.  
아래의 가이드라인에 따라 **Markdown 파일을 작성**하고, **링크 및 명령어 사용 규칙**을 준수해 주세요.

---

## 📌 1. 레포지토리 클론  
GitHub에서 레포지토리를 클론합니다.
```sh
git clone https://github.com/your-username/faq_page.git
```
클론한 폴더로 이동합니다.
```sh
cd faq_page
```

---

## 📌 2. 의존성 설치  

### 🔹 **Yarn 설치**  
macOS에서는 Homebrew를 사용해서 설치할 수 있습니다.
```sh
brew install yarn
```
Node.js를 설치하셨다면 npm을 사용해도 됩니다.
```sh
npm install -g yarn
```

### 🔹 **프로젝트 의존성 설치**  
프로젝트 루트에서 아래 명령어를 실행하여 필요한 패키지를 설치합니다.
```sh
yarn install
```

---

## 📌 3. Eleventy 및 필수 패키지 설치  
### 🔹 **Eleventy 설치**  
```sh
yarn add @11ty/eleventy
```

### 🔹 **gray-matter 설치**  
Markdown 파일을 JSON으로 변환하는 `generate_faq.js`를 실행하려면 `gray-matter`가 필요합니다.
```sh
yarn add gray-matter
```

### 🔹 **marked 설치 (Markdown 렌더링 지원)**  
Markdown 문법을 HTML로 변환하려면 `marked` 패키지가 필요합니다.
```sh
yarn add marked
```

### 🔹 **Tailwind Typography 설치**  
Markdown 스타일링을 위해 `@tailwindcss/typography`를 설치합니다.
```sh
yarn add @tailwindcss/typography
```

---

## 📌 4. 로컬 서버 실행 (Eleventy)
아래 명령어를 사용하면 로컬 서버에서 정적 사이트를 미리 볼 수 있습니다.
```sh
yarn exec eleventy -- --serve
```
기본적으로 빌드된 결과는 `_site` 폴더에 생성됩니다.  
브라우저에서 [http://localhost:8080](http://localhost:8080)으로 접속하여 확인할 수 있습니다.

---

## 📌 5. Markdown 파일 업로드 및 FAQ 업데이트  
💡 **Markdown 파일이 `gray-matter`를 통해 JSON으로 자동 변환**되며, `search.html`과 `faq/index.html`에서 불러오는 구조입니다.

### 1️⃣ **Markdown 파일 작성/업로드**  
- `faq/` 폴더에 Markdown 형식의 FAQ 파일을 작성합니다.  
- 파일명은 **`faq_x.md`** 형식으로 저장해주세요.  
- **Markdown 파일 템플릿 예시 (필수 Frontmatter 포함):**
```md
---
title:
category:
author:
createdDate: ""
tags: ["", ""]
---

RBLN SDK를 사용하기 위해서는...
```
- **Frontmatter에 `title`, `category`, `author`, `createdDate`를 반드시 포함해야 합니다.**  
- 링크는 `<a href="..." class="underline">링크 텍스트</a>` 형식으로 작성합니다.  
- Mailto는 `<a href="mailto:contact@jiwonkwak.co" class="underline">Technical Support Team</a>` 형식으로 작성합니다.  

---

### 2️⃣ **FAQ JSON 업데이트**  
Markdown 파일을 수정하거나 새로 추가한 후, 아래 명령어를 실행하여 FAQ 데이터를 업데이트합니다.
```sh
node generate_faq.js
```
✅ **성공 시 터미널에 아래 메시지가 표시됩니다.**  
```
🎉 성공이에요! FAQ 요약 파일이 업데이트되었습니다!
```

---

## 📌 6. 프로젝트 폴더 구조  
```sh
프로젝트 루트
├── assets/                # 이미지 등 정적 파일
├── faq/                   # Markdown 형식의 FAQ 파일들 (반드시 MD 템플릿에 따라 작성)
│   ├── faq_1.md
│   ├── faq_2.md
│   ├── ...
├── index.html             # 메인 랜딩 페이지
├── faq.json               # `faq/` 폴더 내 MD 파일이 JSON으로 자동 변환되어 저장됨
├── search.html            # 검색 결과 페이지
├── generate_faq.js        # Markdown 파일을 JSON으로 변환하는 스크립트
└── eleventy.config.js           # Eleventy 설정 파일 (필요 시 수정)
```

---

## 📌 7. 작업 시 참고 사항  
- `_site` 디렉토리는 건드리지 않습니다.  
- **새로운 FAQ를 추가할 때는 `faq/` 폴더 내에 MD 템플릿을 따르는 파일을 생성하세요.**  
- **FAQ Markdown 파일을 수정한 후에는 반드시 `node generate_faq.js` 또는 `node faq-update` 명령어를 실행하여 `faq.json`을 최신 상태로 업데이트해 주세요.**   

🚀 **이제 새로운 FAQ 페이지를 쉽게 관리할 수 있습니다!**  
필요한 기능이 있다면 언제든지 공유해주세요. 😃  
