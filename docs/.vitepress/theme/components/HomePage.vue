<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import {
  Accessibility,
  ArrowRight,
  Boxes,
  Braces,
  Check,
  Copy,
  Feather,
  Map,
  Palette,
  Plus,
  Rocket,
  Sparkles,
  Trash2,
  Zap,
} from '@lucide/vue'

const installCmd = 'pnpm add vueduck-ui'
const copied = ref(false)
async function copy() {
  await navigator.clipboard.writeText(installCmd)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

// Live theme playground
const colors = [
  { name: '기본', value: '' },
  // palette text shades, so white labels on them pass 4.5:1
  { name: 'Blue', value: '#2563eb' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Amber', value: '#b45309' },
  { name: 'Emerald', value: '#047857' },
]
const radii = ['0', '0.3rem', '0.5rem', '0.75rem', '1rem']
const color = ref('')
const radius = ref('0.5rem')
type QsTab = 'vue' | 'nuxt'
const qsTabs: { id: QsTab; label: string; icon: string }[] = [
  // Brand marks from simple-icons (CC0)
  { id: 'vue', label: 'Vue', icon: 'M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z' },
  { id: 'nuxt', label: 'Nuxt', icon: 'M13.4642 19.8295h8.9218c.2834 0 .5618-.0723.8072-.2098a1.5899 1.5899 0 0 0 .5908-.5732 1.5293 1.5293 0 0 0 .216-.783 1.529 1.529 0 0 0-.2167-.7828L17.7916 7.4142a1.5904 1.5904 0 0 0-.5907-.573 1.6524 1.6524 0 0 0-.807-.2099c-.2833 0-.5616.0724-.807.2098a1.5904 1.5904 0 0 0-.5907.5731L13.4642 9.99l-2.9954-5.0366a1.5913 1.5913 0 0 0-.591-.573 1.6533 1.6533 0 0 0-.8071-.2098c-.2834 0-.5617.0723-.8072.2097a1.5913 1.5913 0 0 0-.591.573L.2168 17.4808A1.5292 1.5292 0 0 0 0 18.2635c-.0001.2749.0744.545.216.783a1.59 1.59 0 0 0 .5908.5732c.2454.1375.5238.2098.8072.2098h5.6003c2.219 0 3.8554-.9454 4.9813-2.7899l2.7337-4.5922L16.3935 9.99l4.3944 7.382h-5.8586ZM7.123 17.3694l-3.9083-.0009 5.8586-9.8421 2.9232 4.921-1.9572 3.2892c-.7478 1.1967-1.5972 1.6328-2.9163 1.6328z' },
]
const qsTab = ref<QsTab>('vue')
const qsTabEls = ref<HTMLButtonElement[]>([])
function onQsKey(e: KeyboardEvent) {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
  e.preventDefault()
  const i = qsTabs.findIndex((t) => t.id === qsTab.value)
  const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + qsTabs.length) % qsTabs.length
  qsTab.value = qsTabs[next].id
  qsTabEls.value[next]?.focus()
}
const qsNotes = {
  vue: ['CSS는 main.ts에서 한 번 import', '전체 등록하면 import 없이 사용', '필요한 것만 import하면 번들이 더 가벼움'],
  nuxt: ['CSS 자동 주입', '컴포넌트 오토 임포트', '페이지에서 쓴 컴포넌트만 번들에 포함'],
}

const loading = ref(false)
function save() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1500)
}

const themeStyle = computed(() => ({
  ...(color.value && {
    '--vd-color-primary': color.value,
    '--vd-color-primary-contrast': '#ffffff',
  }),
  '--vd-radius': radius.value,
}))
const themeDecls = computed(() => [
  ...(color.value
    ? [
        { prop: '--vd-color-primary', value: color.value },
        { prop: '--vd-color-primary-contrast', value: '#ffffff' },
      ]
    : []),
  { prop: '--vd-radius', value: radius.value },
])
const themeCss = computed(
  () => `:root {\n${themeDecls.value.map((d) => `  ${d.prop}: ${d.value};`).join('\n')}\n}`,
)
const cssCopied = ref(false)
async function copyCss() {
  await navigator.clipboard.writeText(themeCss.value)
  cssCopied.value = true
  setTimeout(() => (cssCopied.value = false), 1500)
}

// desc strings are static and trusted; rendered with v-html for inline emphasis
const features = [
  { icon: Feather, color: 'var(--accent-sky)', title: '의존성 없는 스타일', desc: 'Tailwind나 Sass 없이 <b>순수 CSS</b>만 사용합니다. 어떤 빌드 환경에도 그대로 들어갑니다.' },
  { icon: Palette, color: 'var(--accent-violet)', title: 'CSS 변수 테마', desc: '<code>--vd-*</code> 토큰 몇 개만 덮어쓰면 컬러, 모서리, 간격이 <b>우리 브랜드</b>로 바뀝니다.' },
  { icon: Boxes, color: 'var(--accent-emerald)', title: 'Vue & Nuxt', desc: 'Vue에서는 플러그인으로, Nuxt에서는 <b>모듈 한 줄</b>로 오토 임포트까지 끝납니다.' },
  { icon: Accessibility, color: 'var(--accent-rose)', title: '접근성 우선', desc: '네이티브 요소, 키보드 조작, 포커스 링, ARIA 속성을 <b>기본으로</b> 챙깁니다.' },
  { icon: Zap, color: 'var(--accent-amber)', title: '가벼운 번들', desc: 'ESM 전용 빌드와 트리 셰이킹으로 <b>사용하는 컴포넌트만</b> 포함됩니다.' },
  { icon: Braces, color: 'var(--accent-blue)', title: 'TypeScript', desc: '모든 props와 slots에 타입이 있어 에디터에서 <b>바로 자동완성</b>됩니다.' },
]

const roadmap: { group: string; items: [string, boolean][] }[] = [
  { group: 'Form & Action', items: [['Button', true], ['Input', false], ['Textarea', false], ['Checkbox', false], ['Radio', false], ['Switch', false], ['Select', false], ['FormField', false]] },
  { group: '피드백 & 오버레이', items: [['Modal', false], ['Toast', false], ['Tooltip', false], ['Alert', false], ['Spinner', false]] },
  { group: '데이터 표시', items: [['Badge', false], ['Card', false], ['Avatar', false], ['Tag', false], ['Divider', false], ['Skeleton', false], ['Progress', false], ['Table', false], ['Empty', false]] },
  { group: '내비게이션', items: [['Tabs', false], ['Accordion', false], ['Dropdown Menu', false], ['Pagination', false], ['Breadcrumb', false], ['Popover', false]] },
  { group: '고급', items: [['Drawer', false], ['Combobox', false], ['Slider', false], ['NumberInput', false], ['DatePicker', false], ['FileUpload', false], ['Stepper', false], ['Tree', false], ['Command', false], ['Carousel', false]] },
]
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <a class="pill" :href="withBase('/components/button')">
        <span class="pill-dot" />첫 번째 컴포넌트 Button 공개
        <ArrowRight :size="14" />
      </a>
      <h1>Vue와 Nuxt를 위한<br />깔끔한 컴포넌트</h1>
      <p class="lead">
        <b>순수 CSS와 CSS 변수</b>로 만든 가볍고 접근성 있는 UI 컴포넌트.<br />
        설치하고, 가져다 쓰고, <b>토큰만 바꿔 우리 브랜드</b>로 만드세요.
      </p>
      <div class="cta">
        <VdButton as="a" size="lg" :href="withBase('/guide/installation')">
          시작하기
          <template #suffix><ArrowRight /></template>
        </VdButton>
        <VdButton as="a" size="lg" variant="outline" :href="withBase('/components/button')">컴포넌트 보기</VdButton>
      </div>
      <div class="install">
        <code><span class="prompt">$</span> {{ installCmd }}</code>
        <VdButton variant="ghost" size="sm" :aria-label="copied ? '복사됨' : '복사'" @click="copy">
          <Check v-if="copied" :size="14" />
          <Copy v-else :size="14" />
        </VdButton>
      </div>
    </section>

    <!-- Quickstart: code blocks come from index.md slots so they get Shiki highlighting -->
    <section class="section">
      <div class="section-head">
        <span class="eyebrow eb-green"><Rocket :size="14" />빠른 시작</span>
        <h2>Vue도, Nuxt도 몇 줄이면 끝</h2>
        <p>설치는 똑같고, <b>등록 방법만</b> 다릅니다.</p>
      </div>
      <div class="quickstart" :class="`is-${qsTab}`">
        <div class="qs-head">
          <div class="qs-tabs" role="tablist" aria-label="프레임워크" @keydown="onQsKey">
            <button
              v-for="t in qsTabs"
              :id="`qs-tab-${t.id}`"
              :key="t.id"
              ref="qsTabEls"
              role="tab"
              :aria-selected="qsTab === t.id"
              :aria-controls="`qs-panel-${t.id}`"
              :tabindex="qsTab === t.id ? 0 : -1"
              :class="['qs-tab', `is-${t.id}`, { active: qsTab === t.id }]"
              @click="qsTab = t.id"
            >
              <svg class="qs-logo" viewBox="0 0 24 24" aria-hidden="true"><path :d="t.icon" /></svg>
              {{ t.label }}
            </button>
          </div>
          <a class="qs-more" :href="withBase('/guide/installation')">
            설치 가이드 자세히 <ArrowRight :size="14" />
          </a>
        </div>
        <div class="qs-body vp-doc">
          <div
            v-for="t in qsTabs"
            :id="`qs-panel-${t.id}`"
            :key="t.id"
            role="tabpanel"
            :aria-labelledby="`qs-tab-${t.id}`"
            :aria-hidden="qsTab !== t.id"
            :inert="qsTab !== t.id"
            :class="['qs-files', { hidden: qsTab !== t.id }]"
          >
            <slot :name="t.id" />
          </div>
        </div>
        <ul class="qs-notes">
          <li v-for="n in qsNotes[qsTab]" :key="n"><Check :size="14" />{{ n }}</li>
        </ul>
      </div>
    </section>

    <!-- Theme playground -->
    <section class="section">
      <div class="section-head">
        <span class="eyebrow eb-violet"><Palette :size="14" />테마</span>
        <h2>토큰만 바꾸면 우리 브랜드</h2>
        <p>아래 컨트롤을 바꿔 보세요. 컴포넌트는 그대로, <b>CSS 변수만</b> 바뀝니다.</p>
      </div>
      <div class="playground">
        <div class="controls">
          <div class="control">
            <span class="label">Primary</span>
            <div class="swatches">
              <button
                v-for="c in colors"
                :key="c.name"
                class="swatch"
                :class="{ active: color === c.value, default: !c.value }"
                :style="c.value ? { background: c.value } : undefined"
                :title="c.name"
                :aria-label="c.name"
                @click="color = c.value"
              />
            </div>
          </div>
          <div class="control">
            <span class="label">Radius</span>
            <div class="radii">
              <button v-for="r in radii" :key="r" :class="{ active: radius === r }" @click="radius = r">
                {{ r === '0' ? '0' : r.replace('rem', '') }}
              </button>
            </div>
          </div>
          <div class="css-out">
            <button class="css-copy" :aria-label="cssCopied ? '복사됨' : 'CSS 복사'" @click="copyCss">
              <Check v-if="cssCopied" :size="14" />
              <Copy v-else :size="14" />
            </button>
            <pre><code><span class="tk-sel">:root</span> <span class="tk-punc">{</span>
<template v-for="d in themeDecls" :key="d.prop">  <span class="tk-prop">{{ d.prop }}</span><span class="tk-punc">:</span> <span v-if="d.value.startsWith('#')" class="tk-swatch" :style="{ background: d.value }" /><span class="tk-val">{{ d.value }}</span><span class="tk-punc">;</span>
</template><span class="tk-punc">}</span></code></pre>
          </div>
        </div>
        <div class="stage" :style="themeStyle">
          <div class="stage-row">
            <VdButton>Solid</VdButton>
            <VdButton variant="secondary">Secondary</VdButton>
            <VdButton variant="outline">Outline</VdButton>
            <VdButton variant="ghost">Ghost</VdButton>
          </div>
          <div class="stage-row">
            <VdButton size="sm"><template #prefix><Plus /></template>추가</VdButton>
            <VdButton variant="danger" size="sm"><template #prefix><Trash2 /></template>삭제</VdButton>
            <VdButton variant="link" size="sm">링크</VdButton>
          </div>
          <div class="stage-card">
            <div>
              <strong>변경 사항 저장</strong>
              <p>저장하지 않은 변경 사항이 있습니다.</p>
            </div>
            <div class="stage-actions">
              <VdButton variant="outline">취소</VdButton>
              <VdButton :loading="loading" @click="save">
                저장
              </VdButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section">
      <div class="section-head">
        <span class="eyebrow eb-blue"><Sparkles :size="14" />특징</span>
        <h2>왜 vueduck인가요</h2>
        <p>작게 시작해도 <b>제대로 쓸 수 있는</b> 기본기를 갖췄습니다.</p>
      </div>
      <div class="features">
        <div v-for="f in features" :key="f.title" class="feature" :style="{ '--accent': f.color }">
          <div class="feature-icon"><component :is="f.icon" :size="20" :stroke-width="1.75" /></div>
          <h3>{{ f.title }}</h3>
          <p v-html="f.desc" />
        </div>
      </div>
    </section>

    <!-- Roadmap -->
    <section class="section">
      <div class="section-head">
        <span class="eyebrow eb-amber"><Map :size="14" />로드맵</span>
        <h2>로드맵</h2>
        <p>38개 컴포넌트를 <b>하나씩, 제대로</b> 만들고 있습니다.</p>
      </div>
      <div class="roadmap">
        <div v-for="g in roadmap" :key="g.group" class="roadmap-group">
          <h3>{{ g.group }}</h3>
          <ul>
            <li v-for="[name, done] in g.items" :key="name" :class="{ done }">
              <span class="status" />{{ name }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px 96px;
}

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 88px 0 72px;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background 0.15s;
}
.pill:hover {
  background: var(--vp-c-bg-soft);
}
.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--accent-emerald);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-emerald) 25%, transparent);
}
.hero h1 {
  margin: 24px 0 0;
  font-size: clamp(36px, 6vw, 60px);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.035em;
  color: var(--vp-c-text-1);
}
.lead {
  margin: 20px 0 0;
  max-width: 560px;
  font-size: 17px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
.install {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 4px 4px 4px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}
.install code {
  color: var(--vp-c-text-1);
}
.prompt {
  color: var(--vp-c-text-3);
  margin-right: 4px;
}

/* Sections */
.section {
  padding-top: 72px;
}
.section-head {
  margin-bottom: 28px;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--eb);
}
.eb-green { --eb: var(--accent-emerald-text); }
.eb-violet { --eb: var(--accent-violet-text); }
.eb-blue { --eb: var(--accent-blue-text); }
.eb-amber { --eb: var(--accent-amber-text); }
.lead b,
.section-head p b,
.feature p :deep(b) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.feature p :deep(code) {
  padding: 1px 5px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.86em;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}
.section-head h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--vp-c-text-1);
}
.section-head p {
  margin: 8px 0 0;
  font-size: 15px;
  color: var(--vp-c-text-2);
}

/* Quickstart */
@property --qs-brand {
  syntax: '<color>';
  inherits: true;
  initial-value: #42b883;
}
.quickstart {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
  overflow: hidden;
  transition: --qs-brand 0.4s ease;
}
.quickstart.is-vue { --qs-brand: var(--brand-vue); }
.quickstart.is-nuxt { --qs-brand: var(--brand-nuxt); }
/* brand accent line + glow that follow the selected framework */
.quickstart::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--qs-brand) 30%, var(--qs-brand) 70%, transparent);
  opacity: 0.8;
}
.quickstart::after {
  content: '';
  position: absolute;
  top: -120px;
  left: 10%;
  width: 80%;
  height: 200px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--qs-brand) 14%, transparent), transparent);
  pointer-events: none;
}
.qs-head,
.qs-body,
.qs-notes {
  position: relative;
  z-index: 1;
}
.qs-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}
/* segmented control: muted track, the active tab floats on top */
.qs-tabs {
  --track: var(--vp-c-bg-soft);
  --thumb: var(--surface-raised);
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border-radius: 10px;
  background: var(--track);
}

.qs-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 14px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: background 0.15s, color 0.15s;
}
.qs-tab:hover {
  color: var(--vp-c-text-1);
}
.qs-tab:focus-visible {
  outline: 2px solid var(--vp-c-text-1);
  outline-offset: 1px;
}
.qs-tab.active {
  color: var(--vp-c-text-1);
  background: var(--thumb);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.04);
}
.qs-logo {
  width: 15px;
  height: 15px;
  fill: currentColor;
  color: var(--vp-c-text-3);
  transition: color 0.15s;
}
.qs-tab.active .qs-logo,
.qs-tab:hover .qs-logo {
  color: var(--brand);
}
.is-vue { --brand: var(--brand-vue); }
.is-nuxt { --brand: var(--brand-nuxt); }
.qs-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.15s;
}
.qs-more:hover {
  color: var(--vp-c-text-1);
}
.qs-body {
  /* both panels share one cell so the card keeps the taller panel's height */
  display: grid;
  padding: 20px;
}
.qs-body > .qs-files {
  grid-area: 1 / 1;
}
.qs-files.hidden {
  visibility: hidden;
}
.qs-files {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.qs-files :deep(.qs-file) {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.qs-files :deep(.qs-name) {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-1);
}
.qs-files :deep(.qs-step) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  font-family: var(--vp-font-family-base);
  font-size: 11px;
  font-weight: 700;
}
.qs-files :deep(.qs-step-label) {
  margin-right: 4px;
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  font-weight: 600;
}
.qs-files :deep(.qs-lang) {
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--lang-text);
  background: color-mix(in srgb, var(--lang) 14%, transparent);
}
.qs-files :deep(.qs-lang.is-ts) { --lang: var(--accent-blue); --lang-text: var(--accent-blue-text); }
.qs-files :deep(.qs-lang.is-vue) { --lang: var(--accent-emerald); --lang-text: var(--accent-emerald-text); }
.qs-files :deep(div[class*='language-']) {
  flex: 1;
  margin: 0 !important;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px !important;
}
.qs-notes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  margin: 0;
  padding: 0 20px 20px;
  list-style: none;
}
.qs-notes li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.qs-notes li svg {
  color: var(--qs-brand);
}

/* Playground */
.playground {
  display: grid;
  grid-template-columns: 380px 1fr;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
.controls {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.label {
  display: block;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.swatches {
  display: flex;
  gap: 8px;
}
.swatch {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: outline-color 0.15s;
}
.swatch.default {
  background: linear-gradient(135deg, #18181b 50%, #fafafa 50%);
  border: 1px solid var(--vp-c-divider);
}
.swatch.active {
  outline-color: var(--vp-c-text-1);
}
.radii {
  display: flex;
  gap: 6px;
}
.radii button {
  flex: 1;
  height: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
.radii button.active {
  border-color: var(--vp-c-text-1);
  color: var(--vp-c-text-1);
}
.css-out {
  /* github-light / github-dark, same as the doc code blocks */
  --tk-sel: #6f42c1;
  --tk-prop: #005cc5;
  --tk-val: #032f62;
  --tk-punc: #24292e;

  position: relative;
  margin: auto 0 0;
  border-radius: 10px;
  background: var(--vp-code-block-bg);
  border: 1px solid var(--vp-c-divider);
}
.dark .css-out {
  --tk-sel: #b392f0;
  --tk-prop: #79b8ff;
  --tk-val: #9ecbff;
  --tk-punc: #e1e4e8;
}
.css-out pre {
  margin: 0;
  padding: 14px 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 11.5px;
  line-height: 1.8;
  overflow-x: auto;
}
.tk-sel { color: var(--tk-sel); }
.tk-prop { color: var(--tk-prop); }
.tk-val { color: var(--tk-val); }
.tk-punc { color: var(--tk-punc); }
.tk-swatch {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 3px;
  vertical-align: -1px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.15);
}
.css-copy {
  position: absolute;
  top: 6px;
  right: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  color: var(--vp-c-text-3);
  transition: color 0.15s, background 0.15s;
}
.css-copy:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}
.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 48px 32px;
  background-image: radial-gradient(var(--demo-dot) 1px, transparent 1px);
  background-size: 16px 16px;
}
.stage-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.stage-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  max-width: 460px;
  margin-top: 8px;
  padding: 20px;
  border: 1px solid var(--vd-color-border);
  border-radius: calc(var(--vd-radius) + 4px);
  background: var(--vd-color-bg);
  box-shadow: var(--vd-shadow-sm);
}
.stage-card strong {
  font-size: 14px;
  color: var(--vd-color-text);
}
.stage-card p {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--vd-color-text-muted);
}
.stage-actions {
  display: flex;
  gap: 8px;
}

/* Features */
@property --glow {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 8%;
}
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
}
.feature {
  --glow: 8%;
  position: relative;
  padding: 28px;
  border-right: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  background: radial-gradient(
    circle at 48px 48px,
    color-mix(in srgb, var(--accent) var(--glow), transparent),
    transparent 220px
  );
  transition: --glow 0.3s;
}
.feature:hover {
  --glow: 16%;
}
.feature:nth-child(3n) {
  border-right: 0;
}
.feature:nth-last-child(-n + 3) {
  border-bottom: 0;
}
.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  border-radius: 10px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 15%, var(--vp-c-bg));
  box-shadow: 0 4px 12px -4px color-mix(in srgb, var(--accent) 40%, transparent);
}
.feature h3 {
  margin: 16px 0 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.feature p {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

/* Roadmap */
.roadmap {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.roadmap-group h3 {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.roadmap-group ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.roadmap-group li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 14px;
  color: var(--vp-c-text-3);
}
.roadmap-group li.done {
  color: var(--vp-c-text-1);
  font-weight: 500;
}
.status {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: 1.5px solid var(--vp-c-text-3);
}
.done .status {
  border-color: var(--accent-emerald);
  background: var(--accent-emerald);
}

@media (max-width: 960px) {
  .playground,
  .qs-files {
    grid-template-columns: 1fr;
  }
  .controls {
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .features {
    grid-template-columns: 1fr 1fr;
  }
  .feature:nth-child(n) {
    border-right: 1px solid var(--vp-c-divider);
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .feature:nth-child(2n) {
    border-right: 0;
  }
  .feature:nth-last-child(-n + 2) {
    border-bottom: 0;
  }
  .roadmap {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 28px;
  }
}
@media (max-width: 640px) {
  .hero {
    padding: 56px 0 40px;
  }
  .lead br {
    display: none;
  }
  .features {
    grid-template-columns: 1fr;
  }
  .feature:nth-child(n) {
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .feature:last-child {
    border-bottom: 0;
  }
  .roadmap {
    grid-template-columns: 1fr 1fr;
  }
  .qs-more {
    display: none;
  }
  .stage-card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
