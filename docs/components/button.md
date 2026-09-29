<script setup>
import { ref } from 'vue'
import { ArrowRight, Mail, Plus, Trash2 } from '@lucide/vue'

const loading = ref(false)
async function save() {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 1500))
  loading.value = false
}
</script>

# Button

사용자의 동작을 실행하는 버튼입니다. 6가지 스타일과 로딩 상태를 지원하고, 링크나 라우터 링크로도 사용할 수 있습니다.

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

## 스타일

`variant`로 버튼의 중요도를 표현합니다. 한 화면에서 **`solid`는 가장 중요한 동작 하나**에만 쓰는 것을 권장합니다.

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

## 크기

`size`로 높이를 정합니다. 같은 크기의 Input과 높이가 같습니다.

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

`prefix`와 `suffix` 슬롯으로 텍스트 앞뒤에 아이콘을 표시합니다. 아이콘을 가져오는 방법과 크기 규칙은 [아이콘 가이드](/guide/icons)에서 다룹니다.

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
  <VdButton variant="danger">
    <template #prefix><Trash2 /></template>
    삭제
  </VdButton>
</template>
```

  </template>
</Demo>

아이콘만 있는 버튼은 읽을 글자가 없으므로 `aria-label`로 이름을 지정해야 합니다.

<Demo>
  <VdButton variant="outline" size="sm" aria-label="추가"><Plus /></VdButton>
  <VdButton variant="outline" aria-label="추가"><Plus /></VdButton>
  <VdButton variant="outline" size="lg" aria-label="추가"><Plus /></VdButton>
  <template #code>

```vue
<script setup lang="ts">
import { Plus } from '@lucide/vue'
</script>

<template>
  <VdButton variant="outline" size="sm" aria-label="추가"><Plus /></VdButton>
  <VdButton variant="outline" aria-label="추가"><Plus /></VdButton>
  <VdButton variant="outline" size="lg" aria-label="추가"><Plus /></VdButton>
</template>
```

  </template>
</Demo>

## 로딩

`loading`을 주면 앞쪽 아이콘 자리에 스피너가 표시되고 클릭이 막히며, `aria-busy="true"`가 붙습니다. 비활성과 달리 흐려지지 않아서 **로딩 중인 버튼과 누를 수 없는 버튼이 구분됩니다.**

<Demo>
  <VdButton :loading="loading" @click="save">{{ loading ? '저장 중…' : '저장하기' }}</VdButton>
  <VdButton variant="outline" loading>불러오는 중</VdButton>
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

async function save() {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 1500)) // 실제 저장 요청 자리
  loading.value = false
}
</script>

<template>
  <VdButton :loading="loading" @click="save">{{ loading ? '저장 중…' : '저장하기' }}</VdButton>
  <VdButton variant="outline" loading>불러오는 중</VdButton>
</template>
```

  </template>
</Demo>

## 비활성

`disabled`를 주면 버튼이 반투명하게 흐려지고, 마우스를 올리거나 눌러도 색이 바뀌지 않습니다.

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

`block`을 주면 버튼이 부모 요소의 너비를 가득 채웁니다.

<Demo>
  <div style="width: 100%; max-width: 320px">
    <VdButton block>계속하기</VdButton>
  </div>
  <template #code>

```vue
<div style="max-width: 320px">
  <VdButton block>계속하기</VdButton>
</div>
```

  </template>
</Demo>

## 링크로 사용

`as`로 버튼을 다른 요소로 렌더링합니다. `<a>`로 쓰면 버튼 모양의 링크가 됩니다.

<Demo>
  <VdButton as="a" href="#링크로-사용" variant="outline">앵커 링크</VdButton>
  <template #code>

```vue
<VdButton as="a" href="#링크로-사용" variant="outline">앵커 링크</VdButton>
```

  </template>
</Demo>

Vue Router나 Nuxt에서는 링크 컴포넌트를 `as`에 넘깁니다.

```vue
<script setup lang="ts">
import { RouterLink } from 'vue-router'
// Nuxt: import { NuxtLink } from '#components'
</script>

<template>
  <VdButton :as="RouterLink" to="/about">About</VdButton>
</template>
```

`button`이 아닌 요소에서 비활성·로딩 상태는 `aria-disabled="true"`와 `tabindex="-1"`로 처리됩니다.

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
| `prefix` | 앞쪽 아이콘 (로딩 중에는 스피너로 대체) |
| `suffix` | 뒤쪽 아이콘 |

### CSS 클래스

`vd-button`, `vd-button--{variant}`, `vd-button--{size}`, `vd-button--block`, `is-loading`, `is-disabled`
