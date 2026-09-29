import type { App, Plugin } from 'vue'
import './styles/index.css'
import { VdButton } from './components/button'
import { VdInput } from './components/input'

export * from './components/button'
export * from './components/input'
export { componentNames } from './components'

const components = { VdButton, VdInput }

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
    VdInput: typeof VdInput
  }
}
