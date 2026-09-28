<script setup>
import { ref } from 'vue'
import { ArrowRight, Mail, Plus, Trash2 } from '@lucide/vue'

const loading = ref(false)
function save() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1500)
}
</script>

# Button

사용자의 동작을 실행하는 버튼입니다. **6가지 variant**와 로딩 상태를 지원하고, 링크나 라우터 링크로도 렌더링할 수 있습니다.

<Demo>
  <VdButton>버튼</VdButton>
  <template #code>

```vue
<script setup lang="ts">
import { VdButton } from 'vueduck-ui'
</script>

<template>
  <VdButton>버튼</VdButton>
</template>
```

  </template>
</Demo>

## Variant

`variant`로 버튼의 중요도를 표현합니다. 한 화면에 `solid`는 하나만 두는 것을 권장합니다.

<Demo>
  <VdButton>Solid</VdButton>
  <VdButton variant="secondary">Secondary</VdButton>
  <VdButton variant="outline">Outline</VdButton>
  <VdButton variant="ghost">Ghost</VdButton>
  <VdButton variant="danger">Danger</VdButton>
  <VdButton variant="link">Link</VdButton>
  <template #code>

```vue
<VdButton>Solid</VdButton>
<VdButton variant="secondary">Secondary</VdButton>
<VdButton variant="outline">Outline</VdButton>
<VdButton variant="ghost">Ghost</VdButton>
<VdButton variant="danger">Danger</VdButton>
<VdButton variant="link">Link</VdButton>
```

  </template>
</Demo>

## Size

<Demo>
  <VdButton size="sm">Small</VdButton>
  <VdButton size="md">Medium</VdButton>
  <VdButton size="lg">Large</VdButton>
  <template #code>

```vue
<VdButton size="sm">Small</VdButton>
<VdButton size="md">Medium</VdButton>
<VdButton size="lg">Large</VdButton>
```

  </template>
</Demo>

## 아이콘

`prefix`(앞) / `suffix`(뒤) 슬롯에 아이콘 컴포넌트를 넣습니다. 버튼 안의 SVG 아이콘은 **버튼 크기와 상관없이 16px**로 맞춰집니다.

<Demo>
  <VdButton><template #prefix><Mail /></template>메일로 로그인</VdButton>
  <VdButton variant="outline">다음 단계<template #suffix><ArrowRight /></template></VdButton>
  <VdButton variant="danger"><template #prefix><Trash2 /></template>삭제</VdButton>
  <template #code>

```vue
<script setup lang="ts">
import { ArrowRight, Mail, Trash2 } from '@lucide/vue'
</script>

<template>
  <VdButton>
    <template #prefix><Mail /></template>
    메일로 로그인
  </VdButton>
  <VdButton variant="outline">
    다음 단계
    <template #suffix><ArrowRight /></template>
  </VdButton>
</template>
```

  </template>
</Demo>

아이콘만 있는 버튼은 `aria-label`을 꼭 지정하세요.

<Demo>
  <VdButton variant="outline" size="sm" aria-label="추가"><Plus /></VdButton>
  <VdButton variant="outline" aria-label="추가"><Plus /></VdButton>
  <VdButton variant="outline" size="lg" aria-label="추가"><Plus /></VdButton>
  <template #code>

```vue
<VdButton variant="outline" aria-label="추가">
  <Plus />
</VdButton>
```

  </template>
</Demo>

## 로딩

`loading` 상태에서는 스피너가 앞쪽 아이콘 자리에 표시되고, 클릭이 막히며 `aria-busy="true"`가 붙습니다.

<Demo>
  <VdButton :loading="loading" @click="save">{{ loading ? '저장 중…' : '저장하기' }}</VdButton>
  <VdButton variant="outline" loading>불러오는 중</VdButton>
  <template #code>

```vue
<script setup lang="ts">
const loading = ref(false)
async function save() {
  loading.value = true
  await api.save()
  loading.value = false
}
</script>

<template>
  <VdButton :loading="loading" @click="save">저장하기</VdButton>
</template>
```

  </template>
</Demo>

## 비활성

<Demo>
  <VdButton disabled>Solid</VdButton>
  <VdButton variant="outline" disabled>Outline</VdButton>
  <template #code>

```vue
<VdButton disabled>Solid</VdButton>
<VdButton variant="outline" disabled>Outline</VdButton>
```

  </template>
</Demo>

## 전체 너비

<Demo>
  <div style="width: 100%; max-width: 320px">
    <VdButton block>계속하기</VdButton>
  </div>
  <template #code>

```vue
<VdButton block>계속하기</VdButton>
```

  </template>
</Demo>

## 링크로 렌더링

`as`로 다른 요소나 컴포넌트(`RouterLink`, `NuxtLink`)로 렌더링합니다. `button`이 아닐 때 비활성 상태는 `aria-disabled`와 `tabindex="-1"`로 처리됩니다.

<Demo>
  <VdButton as="a" href="#링크로-렌더링" variant="outline">앵커 링크</VdButton>
  <template #code>

```vue
<VdButton as="a" href="/docs">문서</VdButton>
<VdButton :as="RouterLink" to="/about">About</VdButton>
<VdButton :as="NuxtLink" to="/about">About</VdButton>
```

  </template>
</Demo>

## API

### Props

| Prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `variant` | `'solid' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'link'` | `'solid'` | 스타일 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 네이티브 type |
| `disabled` | `boolean` | `false` | 비활성 |
| `loading` | `boolean` | `false` | 스피너 표시 + 클릭 차단 |
| `block` | `boolean` | `false` | 전체 너비 |
| `as` | `string \| Component` | `'button'` | 렌더링할 요소 |

### Slots

| Slot | 설명 |
| --- | --- |
| `default` | 버튼 내용 |
| `prefix` | 앞쪽 아이콘 (loading 중에는 스피너로 대체) |
| `suffix` | 뒤쪽 아이콘 |

### CSS 클래스

`vd-button`, `vd-button--{variant}`, `vd-button--{size}`, `vd-button--block`, `is-loading`, `is-disabled`
