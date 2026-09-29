<script setup lang="ts">
import { computed } from 'vue'

export interface ButtonProps {
  /** Visual style */
  variant?: 'solid' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg'
  /** Native button type */
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  /** Shows a spinner and blocks clicks */
  loading?: boolean
  /** Stretch to container width */
  block?: boolean
  /** Render as another element or component, e.g. 'a' or RouterLink */
  as?: string | object
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  size: 'md',
  type: 'button',
  as: 'button',
})

defineSlots<{
  default?: () => unknown
  /** Icon before the label (replaced by the spinner while loading) */
  prefix?: () => unknown
  /** Icon after the label */
  suffix?: () => unknown
}>()

const isDisabled = computed(() => props.disabled || props.loading)
const isNativeButton = computed(() => props.as === 'button')
</script>

<template>
  <component
    :is="as"
    :type="isNativeButton ? type : undefined"
    :disabled="isNativeButton ? isDisabled : undefined"
    :aria-disabled="!isNativeButton && isDisabled ? 'true' : undefined"
    :aria-busy="loading ? 'true' : undefined"
    :tabindex="!isNativeButton && isDisabled ? -1 : undefined"
    :class="[
      'vd-button',
      `vd-button--${variant}`,
      `vd-button--${size}`,
      { 'vd-button--block': block, 'is-loading': loading, 'is-disabled': disabled },
    ]"
  >
    <span v-if="loading" class="vd-button__spinner" aria-hidden="true" />
    <span v-else-if="$slots.prefix" class="vd-button__icon"><slot name="prefix" /></span>
    <span class="vd-button__label"><slot /></span>
    <span v-if="$slots.suffix" class="vd-button__icon"><slot name="suffix" /></span>
  </component>
</template>
