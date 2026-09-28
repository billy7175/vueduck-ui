<!--
  Preview / Code tabs for component docs.
  Usage in markdown:
    <Demo>
      <VdButton>...</VdButton>
      <template #code>

      ```vue
      ...
      ```

      </template>
    </Demo>
-->
<script setup lang="ts">
import { ref, useId } from 'vue'

defineProps<{ align?: 'center' | 'start' }>()

type Tab = 'preview' | 'code'
const tabs: { id: Tab; label: string }[] = [
  { id: 'preview', label: '미리보기' },
  { id: 'code', label: '코드' },
]
const tab = ref<Tab>('preview')
const uid = useId()
const tabEls = ref<HTMLButtonElement[]>([])

function onKey(e: KeyboardEvent) {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
  e.preventDefault()
  const next = tab.value === 'preview' ? 1 : 0
  tab.value = tabs[next].id
  tabEls.value[next]?.focus()
}
</script>

<template>
  <div class="demo">
    <div class="demo-tabs" role="tablist" @keydown="onKey">
      <button
        v-for="t in tabs"
        :id="`${uid}-tab-${t.id}`"
        :key="t.id"
        ref="tabEls"
        role="tab"
        :aria-selected="tab === t.id"
        :aria-controls="`${uid}-panel-${t.id}`"
        :tabindex="tab === t.id ? 0 : -1"
        :class="{ active: tab === t.id }"
        @click="tab = t.id"
      >
        {{ t.label }}
      </button>
    </div>
    <div
      v-show="tab === 'preview'"
      :id="`${uid}-panel-preview`"
      role="tabpanel"
      :aria-labelledby="`${uid}-tab-preview`"
      class="demo-preview"
      :class="align === 'start' ? 'is-start' : ''"
    >
      <slot />
    </div>
    <div
      v-show="tab === 'code'"
      :id="`${uid}-panel-code`"
      role="tabpanel"
      :aria-labelledby="`${uid}-tab-code`"
      class="demo-code"
    >
      <slot name="code" />
    </div>
  </div>
</template>

<style scoped>
.demo {
  margin: 20px 0 28px;
}
.demo-tabs {
  display: flex;
  gap: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 12px;
}
.demo-tabs button {
  position: relative;
  padding: 8px 2px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.15s;
}
.demo-tabs button:hover {
  color: var(--vp-c-text-1);
}
.demo-tabs button:focus-visible {
  outline: 2px solid var(--vp-c-text-1);
  outline-offset: 2px;
  border-radius: 4px;
}
.demo-tabs button.active {
  color: var(--vp-c-text-1);
}
.demo-tabs button.active::after {
  content: '';
  position: absolute;
  inset: auto 0 -1px;
  height: 2px;
  border-radius: 2px;
  background: var(--vp-c-text-1);
}
.demo-preview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 200px;
  padding: 40px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  background-image: radial-gradient(var(--demo-dot) 1px, transparent 1px);
  background-size: 16px 16px;
}
.demo-preview.is-start {
  justify-content: flex-start;
}
.demo-code :deep(div[class*='language-']) {
  margin: 0 !important;
  border-radius: 12px !important;
}
</style>
