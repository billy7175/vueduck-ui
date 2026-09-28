import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import VueDuck from 'vueduck-ui'
import 'vueduck-ui/style.css'
import Demo from './components/Demo.vue'
import DocEyebrow from './components/DocEyebrow.vue'
import HomePage from './components/HomePage.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'doc-before': () => h(DocEyebrow) }),
  enhanceApp({ app }) {
    app.use(VueDuck)
    app.component('Demo', Demo)
    app.component('HomePage', HomePage)
  },
} satisfies Theme
