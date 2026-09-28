<!-- Section eyebrow above each doc page title, derived from the sidebar config -->
<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { BookOpen, Blocks } from '@lucide/vue'

const sections = {
  '/guide/': { label: '가이드', tone: 'green', icon: BookOpen },
  '/components/': { label: '컴포넌트', tone: 'violet', icon: Blocks },
} as const

const { theme, page } = useData()

const info = computed(() => {
  const path = '/' + page.value.relativePath.replace(/(index)?\.md$/, '')
  for (const [base, section] of Object.entries(sections)) {
    if (!path.startsWith(base)) continue
    const groups: { text?: string; items?: { link?: string }[] }[] = theme.value.sidebar?.[base] ?? []
    const group = groups.find((g) => g.items?.some((i) => i.link === path))
    return { ...section, group: group?.text }
  }
  return null
})
</script>

<template>
  <div v-if="info" class="doc-eyebrow" :class="`tone-${info.tone}`">
    <component :is="info.icon" :size="14" />
    <span>{{ info.label }}</span>
    <template v-if="info.group">
      <span class="sep">/</span>
      <span class="group">{{ info.group }}</span>
    </template>
  </div>
</template>

<style scoped>
.doc-eyebrow {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--tone);
}
.sep {
  color: var(--vp-c-text-3);
  font-weight: 400;
}
.group {
  color: var(--vp-c-text-2);
  font-weight: 500;
}
.tone-green { --tone: var(--accent-emerald-text); }
.tone-violet { --tone: var(--accent-violet-text); }
</style>
