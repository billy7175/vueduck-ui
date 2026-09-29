<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

export interface InputProps {
  /** Native input type */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  /** Error state: red border and aria-invalid */
  invalid?: boolean
  /** Show a button that clears the value */
  clearable?: boolean
  /** Accessible label for the clear button */
  clearLabel?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  clearLabel: 'Clear',
})

const emit = defineEmits<{ clear: [] }>()

defineSlots<{
  /** Content before the text, e.g. a search icon */
  prefix?: () => unknown
  /** Content after the text, e.g. a unit like "kg" */
  suffix?: () => unknown
}>()

const [model, modifiers] = defineModel<string | number | null, 'number' | 'trim'>({
  set(value) {
    if (typeof value !== 'string') return value
    if (modifiers.trim) value = value.trim()
    if (modifiers.number && value !== '') {
      const n = Number.parseFloat(value)
      return Number.isNaN(n) ? value : n
    }
    return value
  },
})

// class/style go on the wrapper, everything else (placeholder, name, autocomplete...) on the <input>
const attrs = useAttrs()
const wrapperAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
const inputAttrs = computed(() => {
  const { class: _c, style: _s, ...rest } = attrs
  return rest
})

const inputEl = ref<HTMLInputElement>()
const showClear = computed(
  () => props.clearable && !props.disabled && !props.readonly && model.value != null && model.value !== '',
)

function clear() {
  model.value = ''
  emit('clear')
  inputEl.value?.focus()
}

// clicking the padding or an affix focuses the field
function focusInput(e: MouseEvent) {
  if (e.target !== inputEl.value) inputEl.value?.focus()
}

defineExpose({
  focus: () => inputEl.value?.focus(),
  blur: () => inputEl.value?.blur(),
  input: inputEl,
})
</script>

<template>
  <div
    v-bind="wrapperAttrs"
    :class="[
      'vd-input',
      `vd-input--${size}`,
      { 'is-disabled': disabled, 'is-readonly': readonly, 'is-invalid': invalid },
    ]"
    @mousedown.self.prevent
    @click="focusInput"
  >
    <span v-if="$slots.prefix" class="vd-input__affix"><slot name="prefix" /></span>
    <input
      ref="inputEl"
      v-model="model"
      v-bind="inputAttrs"
      class="vd-input__control"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="invalid ? 'true' : undefined"
    />
    <button
      v-if="showClear"
      type="button"
      class="vd-input__clear"
      :aria-label="clearLabel"
      @click.stop="clear"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
    <span v-if="$slots.suffix" class="vd-input__affix"><slot name="suffix" /></span>
  </div>
</template>
