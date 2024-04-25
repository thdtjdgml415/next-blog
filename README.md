# 프로젝트 next-blog

나만의 블로그를 가지고 싶다는 생각에 시작한 next.js, tailwind, velite, shadcn을 사용해 만든 블로그 입니다.
꾸준히 업데이트 하고 있는 중 입니다.

#### 개발환경

- JavaScript
- TypeScript
- React -18^
- Next.JS -14.0.2
- Tailwindcss
- velite
- shadcn

#### 프로젝트 주요 경로

- /app `page`, `layout` 등 View파일
- /src `Redux`, `customHooks`, `components` 등 기능도구

```bash
├── app
│   ├── about - 미구현
│   ├── tags - 태그 페이지
│   ├── blog - blog 글 관련 페이지
│   ├── assets - 블로그 썸네일 및 나머지 이미지 와 폰트 관련 파일 입니다.
│   └── api // og 이미지 생성용
├── components - 컴포넌트가 모여있는 폴더
│   └── ui - shadcn ui 컴포넌트
├── content - mdx 마크다운 글이 모여있는 파일
└── lib - 함수 관리
```

### 프로젝트 실행 방법

```bash
npm run dev
```

### 깃 컨벤션

| 깃모지                             | 의미                      | 타입        |
| ---------------------------------- | ------------------------- | ----------- |
| 🎨 (`:art:`)                       | 코드의 구조/형태 개선     | `refactor:` |
| ⚡️ (`:zap:`)                      | 성능 개선                 | `perf:`     |
| 🔥 (`:fire:`)                      | 코드/파일 삭제            | `remove:`   |
| 🐛 (`:bug:`)                       | 버그 수정                 | `fix:`      |
| 🚑 (`:ambulance:`)                 | 긴급 수정                 | `!HOTFIX:`  |
| ✨ (`:sparkles:`)                  | 새 기능 추가              | `feat:`     |
| 📝 (`:memo:`)                      | 문서 추가/수정            | `docs:`     |
| 💄 (`:lipstick:`)                  | UI/style 파일 추가/수정   | `design:`   |
| 🎉 (`:tada:`)                      | 프로젝트 시작             | `-`         |
| 🔖 (`:bookmark:`)                  | 릴리즈/버전 태그          | `-`         |
| 📌 (`:pushpin:`)                   | 특정 버전 의존성 고정     | `-`         |
| ♻️ (`:recycle:`)                   | 코드 리팩토링             | `refactor:` |
| ➕ (`:heavy_plus_sign:`)           | 의존성 추가               | `chore:`    |
| ➖ (`:heavy_minus_sign:`)          | 의존성 제거               | `chore:`    |
| 🔧 (`:wrench:`)                    | 구성 파일 추가/삭제       | `chore:`    |
| 🔨 (`:hammer:`)                    | 개발 스크립트 추가/수정   | `chore:`    |
| 💩 (`:poop:`)                      | 똥싼 코드                 | `-`         |
| ⏪ (`:rewind:`)                    | 변경 내용 되돌리기        | `-`         |
| 🔀 (`:twisted_rightwards_arrows:`) | 브랜치 합병               | `-`         |
| 📦 (`:package:`)                   | 컴파일된 파일 추가/수정   | `chore:`    |
| 👽 (`:alien:`)                     | 외부 API 변화로 인한 수정 | `fix:`      |
| 🚚 (`:truck:`)                     | 리소스 이동, 이름 변경    | `rename:`   |
| 💡 (`:bulb:`)                      | 주석 추가/수정            | `comment:`  |
| 🔊 (`:loud_sound:`)                | 로그 추가/수정            | `chore:`    |
| 🙈 (`:see_no_evil:`)               | .gitignore 추가/수정      | `chore:`    |
