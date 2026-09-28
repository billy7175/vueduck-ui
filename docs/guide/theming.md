# 테마

모든 스타일은 `--vd-*` CSS 변수를 사용합니다. 앱의 전역 CSS에서 **값만 덮어쓰면** 컴포넌트 코드는 그대로 두고 브랜드를 입힐 수 있습니다.

```css
:root {
  --vd-color-primary: #2563eb;
  --vd-color-primary-contrast: #ffffff;
  --vd-radius: 0.75rem;
}
```

`--vd-radius` **하나만** 바꾸면 `sm` / `md` / `lg` 모서리가 비율에 맞춰 함께 바뀝니다. hover 색도 primary에서 자동으로 계산됩니다.

특정 영역에만 적용할 수도 있습니다.

```css
.admin-panel {
  --vd-color-primary: #0f766e;
}
```

## 세부 값 직접 지정

hover 색, 모서리 크기, 포커스 링은 기본 토큰에서 **컴포넌트가 자동으로 계산**합니다. 자동 계산 대신 값을 고정하고 싶을 때만 아래 변수를 지정하세요.

```css
:root {
  --vd-color-primary-hover: #1d4ed8;
  --vd-radius-md: 10px;
  --vd-focus-ring: 0 0 0 2px #93c5fd;
}
```

| 변수 | 지정하지 않으면 |
| --- | --- |
| `--vd-color-primary-hover` / `--vd-color-danger-hover` | 해당 색을 배경색과 12% 섞은 값 |
| `--vd-radius-sm` / `-md` / `-lg` | `--vd-radius` −2px / 그대로 / +4px |
| `--vd-focus-ring` | `--vd-color-ring` 50% 투명도, 3px |

## 다크 모드

`<html>`에 `dark` 클래스를 붙이면 다크 토큰이 적용됩니다. Nuxt UI, Element Plus와 같은 방식이라 `@nuxtjs/color-mode`나 VueUse `useDark()`와 그대로 연동됩니다.

```ts
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```

일부 영역만 다크로 만들려면 해당 요소에 `vd-dark` 클래스를 붙이세요.

## 폰트

컴포넌트는 기본적으로 페이지의 폰트를 그대로 따릅니다. 따로 지정하려면:

```css
:root {
  --vd-font-family: 'Pretendard Variable', sans-serif;
}
```

## 토큰 목록

| 토큰 | 라이트 | 다크 | 설명 |
| --- | --- | --- | --- |
| `--vd-color-primary` | `#18181b` | `#fafafa` | 주 동작 색 |
| `--vd-color-primary-contrast` | `#fafafa` | `#18181b` | primary 위 텍스트 |
| `--vd-color-danger` | `#dc2626` | `#e5484d` | 위험 동작 |
| `--vd-color-bg` | `#ffffff` | `#09090b` | 배경 |
| `--vd-color-bg-muted` | `#f4f4f5` | `#27272a` | 보조 배경, hover |
| `--vd-color-border` | `#e4e4e7` | `#27272a` | 테두리 |
| `--vd-color-input` | `#e4e4e7` | `#3f3f46` | 입력 요소 테두리 |
| `--vd-color-text` | `#09090b` | `#fafafa` | 본문 텍스트 |
| `--vd-color-text-muted` | `#71717a` | `#a1a1aa` | 보조 텍스트 |
| `--vd-color-ring` | `#a1a1aa` | `#71717a` | 포커스 링 |
| `--vd-radius` | `0.5rem` | | 기본 모서리 |
| `--vd-shadow-xs / sm / md` | | | 그림자 |
| `--vd-space-1 … 6` | `0.25rem … 1.5rem` | | 간격 |
