# 설치

패키지 하나로 **Vue와 Nuxt 모두** 지원합니다. 설치한 뒤 프로젝트에 맞는 방식으로 등록하세요.

::: code-group

```sh [pnpm]
pnpm add vueduck-ui
```

```sh [npm]
npm install vueduck-ui
```

```sh [yarn]
yarn add vueduck-ui
```

:::

## 어떤 방식을 쓸까요?

| | Vue · 전체 등록 | Vue · 개별 import | Nuxt · 모듈 |
| --- | --- | --- | --- |
| 설정 | `main.ts`에 `app.use()` | `main.ts`에 CSS만 | `nuxt.config`에 한 줄 |
| CSS | 직접 import | 직접 import | 자동 주입 |
| 컴포넌트 import | 필요 없음 | 쓰는 파일마다 | 필요 없음 |
| 번들에 포함되는 것 | 전체 컴포넌트 | 쓴 컴포넌트만 | 쓴 컴포넌트만 |
| 추천 상황 | 프로토타입, 작은 앱 | 번들 크기가 중요한 앱 | 모든 Nuxt 프로젝트 |

::: tip 추천
- **Nuxt**라면 고민 없이 모듈을 쓰세요. 편하고 가볍습니다.
- **Vue**라면 처음엔 전체 등록으로 시작하고, 번들 크기가 신경 쓰이면 개별 import로 바꾸세요. 컴포넌트 사용 코드는 그대로입니다.
:::

## Vue

### 전체 등록

```ts
// main.ts
import { createApp } from 'vue'
import VueDuck from 'vueduck-ui'
import 'vueduck-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueDuck)
app.mount('#app')
```

### 필요한 것만 import

```vue
<script setup lang="ts">
import { VdButton } from 'vueduck-ui'
</script>

<template>
  <VdButton>저장</VdButton>
</template>
```

::: tip
개별 import를 쓰더라도 `vueduck-ui/style.css`는 **앱 진입점에서 한 번** 불러와야 합니다.
:::

## Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['vueduck-ui/nuxt'],
})
```

**모든 컴포넌트가 오토 임포트**되고 **CSS도 자동으로 주입**됩니다. CSS를 직접 관리하려면:

```ts
export default defineNuxtConfig({
  modules: ['vueduck-ui/nuxt'],
  vueduck: { css: false },
})
```
