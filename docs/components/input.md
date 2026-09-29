<script setup>
import { computed, ref } from 'vue'
import { Mail, Search } from '@lucide/vue'

const name = ref('')
const age = ref('')
const nickname = ref('')
const weight = ref(70)
const query = ref('vueduck')
const email = ref('hello@')
const isValid = computed(() => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
const showError = computed(() => email.value !== '' && !isValid.value)
</script>

# Input

한 줄 텍스트를 입력받는 필드입니다. 같은 크기의 Button과 높이·모서리·포커스 링이 같아서 나란히 두어도 줄이 맞습니다.

<Demo>
  <div style="width: 100%; max-width: 320px">
    <VdInput v-model="name" placeholder="이름을 입력하세요" />
  </div>
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VdInput } from 'vueduck-ui'

const name = ref('')
</script>

<template>
  <VdInput v-model="name" placeholder="이름을 입력하세요" />
</template>
```

  </template>
</Demo>

## v-model 수식어

`.number`는 입력값을 숫자로, `.trim`은 앞뒤 공백을 제거한 값으로 전달합니다.

<Demo>
  <div style="display: grid; gap: 12px; width: 100%; max-width: 320px">
    <VdInput v-model.number="age" type="number" placeholder="나이" />
    <VdInput v-model.trim="nickname" placeholder="닉네임" />
  </div>
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const age = ref<number | string>('')
const nickname = ref('')
</script>

<template>
  <VdInput v-model.number="age" type="number" placeholder="나이" />
  <VdInput v-model.trim="nickname" placeholder="닉네임" />
</template>
```

  </template>
</Demo>

| 수식어 | 동작 |
| --- | --- |
| `.number` | 숫자로 바꿀 수 있으면 숫자로 전달 (`'42'` → `42`) |
| `.trim` | 앞뒤 공백을 제거해서 전달 |

## 크기

`size`로 높이를 정합니다. 같은 크기의 Button과 높이가 같습니다.

<Demo>
  <div style="display: grid; gap: 12px; width: 100%; max-width: 320px">
    <VdInput size="sm" placeholder="Small" />
    <VdInput size="md" placeholder="Medium" />
    <VdInput size="lg" placeholder="Large" />
  </div>
  <template #code>

```vue
<VdInput size="sm" placeholder="Small" />
<VdInput size="md" placeholder="Medium" />
<VdInput size="lg" placeholder="Large" />
```

  </template>
</Demo>

## 아이콘 · 단위

`prefix`와 `suffix` 슬롯으로 입력칸 앞뒤에 아이콘이나 단위를 표시합니다. 아이콘을 가져오는 방법과 크기 규칙은 [아이콘 가이드](/guide/icons)에서 다룹니다.

<Demo>
  <div style="display: grid; gap: 12px; width: 100%; max-width: 320px">
    <VdInput placeholder="검색"><template #prefix><Search /></template></VdInput>
    <VdInput v-model.number="weight" type="number"><template #suffix>kg</template></VdInput>
  </div>
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@lucide/vue'

const weight = ref(70)
</script>

<template>
  <VdInput placeholder="검색">
    <template #prefix><Search /></template>
  </VdInput>
  <VdInput v-model.number="weight" type="number">
    <template #suffix>kg</template>
  </VdInput>
</template>
```

  </template>
</Demo>

## 지우기 버튼

`clearable`을 주면 값이 있을 때만 지우기 버튼이 나타납니다. 누르면 값이 비워지고 `clear` 이벤트가 발생합니다.

<Demo>
  <div style="width: 100%; max-width: 320px">
    <VdInput v-model="query" clearable clear-label="지우기" placeholder="검색어"><template #prefix><Search /></template></VdInput>
  </div>
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@lucide/vue'

const query = ref('vueduck')
</script>

<template>
  <VdInput v-model="query" clearable clear-label="지우기" placeholder="검색어">
    <template #prefix><Search /></template>
  </VdInput>
</template>
```

  </template>
</Demo>

지우기 버튼에는 글자가 없어서, 스크린리더가 읽을 이름을 `clear-label`로 지정합니다. 기본값은 `Clear`입니다.

## 에러 상태

`invalid`를 주면 테두리가 빨간색이 되고 `aria-invalid="true"`가 붙습니다. 에러 문구는 `aria-describedby`로 입력칸과 연결합니다.

<Demo>
  <div style="width: 100%; max-width: 320px">
    <VdInput v-model="email" type="email" :invalid="showError" aria-describedby="email-error"><template #prefix><Mail /></template></VdInput>
    <p v-if="showError" id="email-error" style="margin: 6px 0 0; font-size: 13px; color: var(--vd-color-danger)">올바른 이메일 주소를 입력하세요.</p>
  </div>
  <template #code>

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Mail } from '@lucide/vue'

const email = ref('hello@')
const isValid = computed(() => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
// 비어 있을 때는 에러를 보여 주지 않음
const showError = computed(() => email.value !== '' && !isValid.value)
</script>

<template>
  <VdInput v-model="email" type="email" :invalid="showError" aria-describedby="email-error">
    <template #prefix><Mail /></template>
  </VdInput>
  <p v-if="showError" id="email-error" style="margin: 6px 0 0; font-size: 13px; color: var(--vd-color-danger)">
    올바른 이메일 주소를 입력하세요.
  </p>
</template>
```

  </template>
</Demo>

## 비활성 · 읽기 전용

`disabled`는 흐려지고 입력할 수 없습니다. `readonly`는 선명하게 보이고 선택·복사는 되지만 수정할 수 없습니다.

<Demo>
  <div style="display: grid; gap: 12px; width: 100%; max-width: 320px">
    <VdInput disabled placeholder="비활성" />
    <VdInput readonly model-value="읽기 전용 값" />
  </div>
  <template #code>

```vue
<VdInput disabled placeholder="비활성" />
<VdInput readonly model-value="읽기 전용 값" />
```

  </template>
</Demo>

## Button과 함께

Input과 Button을 한 줄에 두면 높이가 맞춰집니다.

<Demo>
  <div style="display: flex; gap: 8px; width: 100%; max-width: 420px">
    <VdInput placeholder="이메일 주소" style="flex: 1"><template #prefix><Mail /></template></VdInput>
    <VdButton>구독하기</VdButton>
  </div>
  <template #code>

```vue
<script setup lang="ts">
import { Mail } from '@lucide/vue'
</script>

<template>
  <div style="display: flex; gap: 8px">
    <VdInput placeholder="이메일 주소" style="flex: 1">
      <template #prefix><Mail /></template>
    </VdInput>
    <VdButton>구독하기</VdButton>
  </div>
</template>
```

  </template>
</Demo>

## API

### Props

| Prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `modelValue` (`v-model`) | `string \| number \| null` | — | 입력값 |
| `type` | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url' \| 'number'` | `'text'` | 네이티브 type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `disabled` | `boolean` | `false` | 비활성 |
| `readonly` | `boolean` | `false` | 읽기 전용 |
| `invalid` | `boolean` | `false` | 에러 상태 |
| `clearable` | `boolean` | `false` | 지우기 버튼 표시 |
| `clearLabel` | `string` | `'Clear'` | 지우기 버튼의 접근성 이름 |

### 속성 전달

`placeholder`, `name`, `autocomplete`, `maxlength` 등 위에 없는 속성은 안쪽 `<input>`에 그대로 전달됩니다. `class`와 `style`은 바깥 테두리에 적용됩니다.

### Events

| Event | 설명 |
| --- | --- |
| `update:modelValue` | 값이 바뀔 때 |
| `clear` | 지우기 버튼을 눌렀을 때 |

### Slots

| Slot | 설명 |
| --- | --- |
| `prefix` | 입력칸 앞 (아이콘 등) |
| `suffix` | 입력칸 뒤 (단위 등) |

### ref로 사용할 수 있는 것

| 이름 | 설명 |
| --- | --- |
| `focus()` | 입력칸에 포커스 |
| `blur()` | 포커스 해제 |
| `input` | 안쪽 `<input>` 요소 |

### CSS 클래스

`vd-input`, `vd-input--{size}`, `is-disabled`, `is-readonly`, `is-invalid`, `vd-input__control`, `vd-input__affix`, `vd-input__clear`
