# Contributing

## 컴포넌트 추가

1. `packages/ui/src/components/<name>/` 에 `<Name>.vue`, `<name>.css`, `index.ts`, `<Name>.spec.ts` 를 만든다.
2. `src/index.ts` 에서 export하고, `src/components.ts` 의 이름 목록과 `GlobalComponents` 에 추가한다.
3. `src/styles/index.css` 에 CSS를 `@import` 한다.
4. `docs/components/<name>.md` 를 쓰고 `docs/.vitepress/config.ts` 사이드바에 추가한다.

색은 `docs/.vitepress/theme/custom.css` 와 `packages/ui/src/styles/tokens.css` 의 토큰만 사용한다. 새 색이 필요하면 먼저 논의한다.

## 문서 작성 규칙

1. **제목은 한국어로 쓴다.** 예: 스타일, 크기, 아이콘, 로딩, 비활성, 전체 너비, 링크로 사용, 지우기 버튼, 에러 상태. 컴포넌트 이름(Button, Input)은 그대로 쓴다.
2. **각 섹션의 첫 문장은 무엇을 하는지 "~합니다"로 쓴다.** "~하세요" 같은 명령형 대신 "~해야 합니다", "~를 지정합니다"를 쓴다.
3. **코드 예시는 복사해서 바로 동작해야 한다.** `ref`, 아이콘, 라우터 컴포넌트 등 쓰는 것은 모두 import하고, 쓰는 변수와 함수는 선언한다. `<Demo>` 의 미리보기와 코드는 내용이 같아야 한다. vueduck-ui 컴포넌트는 전체 등록(`app.use`) 또는 Nuxt 모듈 기준으로 import를 생략할 수 있다.
4. **굵은 글씨는 문단당 하나까지**, 핵심 용어에만 쓴다.
5. **안내 박스(`::: tip` 등)는 멈춰서 읽어야 할 때만 쓴다.** 주의, 위험, 꼭 알아야 할 팁이 해당한다. 참고 정보는 본문에 쓴다.
   - 색: 정보 파랑, 팁 초록, 주의 앰버, 위험 로즈
6. 여러 컴포넌트에 공통인 설명(아이콘, 테마 등)은 가이드에 한 번만 쓰고 컴포넌트 문서에서는 링크한다.
