<script setup>
import { Mail, Search } from '@lucide/vue'
</script>

# 아이콘

vueduck-ui는 아이콘을 포함하지 않습니다. 이미 사용 중인 아이콘 라이브러리의 컴포넌트를 `prefix`, `suffix` 슬롯에 그대로 넣습니다.

## 설치

이 문서의 예시는 [Lucide](https://lucide.dev)를 사용합니다.

::: code-group

```sh [pnpm]
pnpm add @lucide/vue
```

```sh [npm]
npm install @lucide/vue
```

```sh [yarn]
yarn add @lucide/vue
```

:::

## 사용

아이콘 컴포넌트를 import해서 슬롯에 넣습니다.

<Demo>
  <div style="display: flex; gap: 8px; width: 100%; max-width: 420px">
    <VdInput placeholder="검색" style="flex: 1"><template #prefix><Search /></template></VdInput>
    <VdButton><template #prefix><Mail /></template>메일 보내기</VdButton>
  </div>
  <template #code>

```vue
<script setup lang="ts">
import { Mail, Search } from '@lucide/vue'
</script>

<template>
  <div style="display: flex; gap: 8px">
    <VdInput placeholder="검색" style="flex: 1">
      <template #prefix><Search /></template>
    </VdInput>
    <VdButton>
      <template #prefix><Mail /></template>
      메일 보내기
    </VdButton>
  </div>
</template>
```

  </template>
</Demo>

## 다른 아이콘 라이브러리

SVG를 그리는 컴포넌트라면 어떤 라이브러리든 같은 방식으로 씁니다.

```vue
<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { Icon } from '@iconify/vue'
</script>

<template>
  <!-- Heroicons -->
  <VdInput placeholder="검색">
    <template #prefix><MagnifyingGlassIcon /></template>
  </VdInput>

  <!-- Iconify -->
  <VdInput placeholder="검색">
    <template #prefix><Icon icon="lucide:search" /></template>
  </VdInput>
</template>
```

## 크기

버튼과 입력칸 안의 아이콘은 컴포넌트 크기와 상관없이 16px로 표시됩니다. 이 규칙은 우선순위가 가장 낮게 지정되어 있어, CSS 한 줄로 바꿀 수 있습니다.

```css
.my-large-icon svg {
  width: 20px;
  height: 20px;
}
```

아이콘 컴포넌트의 `size` 속성(예: `<Search :size="20" />`)보다 이 규칙이 우선하므로, 크기를 바꿀 때는 CSS를 사용합니다.

## 아이콘만 있는 버튼

글자 없이 아이콘만 있는 버튼은 스크린리더가 읽을 이름이 없으므로 `aria-label`을 지정해야 합니다.

```vue
<script setup lang="ts">
import { Plus } from '@lucide/vue'
</script>

<template>
  <VdButton variant="outline" aria-label="추가">
    <Plus />
  </VdButton>
</template>
```
