import type { App, Plugin } from 'vue'
import './styles/index.css'
import { VdButton } from './components/button'

export * from './components/button'
export { componentNames } from './components'

const components = { VdButton }

/** Registers every vueduck component globally: `app.use(VueDuck)` */
const VueDuck: Plugin = {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component)
    }
  },
}

export default VueDuck

declare module 'vue' {
  export interface GlobalComponents {
    VdButton: typeof VdButton
  }
}
