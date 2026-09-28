---
layout: page
title: vueduck
---

<HomePage>
<template #vue>

<div class="qs-file">
<div class="qs-name"><span class="qs-step">1</span><span class="qs-step-label">등록</span><span class="qs-lang is-ts">TS</span>main.ts</div>

```ts
import { createApp } from 'vue'
import VueDuck from 'vueduck-ui'
import 'vueduck-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueDuck)
app.mount('#app')
```

</div>
<div class="qs-file">
<div class="qs-name"><span class="qs-step">2</span><span class="qs-step-label">사용</span><span class="qs-lang is-vue">VUE</span>App.vue</div>

```vue
<template>
  <!-- import 없이 사용 -->
  <VdButton>저장</VdButton>
</template>
```

</div>

</template>
<template #nuxt>

<div class="qs-file">
<div class="qs-name"><span class="qs-step">1</span><span class="qs-step-label">등록</span><span class="qs-lang is-ts">TS</span>nuxt.config.ts</div>

```ts
export default defineNuxtConfig({
  modules: ['vueduck-ui/nuxt'],
})
```

</div>
<div class="qs-file">
<div class="qs-name"><span class="qs-step">2</span><span class="qs-step-label">사용</span><span class="qs-lang is-vue">VUE</span>app/pages/index.vue</div>

```vue
<template>
  <!-- import 없이 바로 사용 -->
  <VdButton>저장</VdButton>
</template>
```

</div>

</template>
</HomePage>
