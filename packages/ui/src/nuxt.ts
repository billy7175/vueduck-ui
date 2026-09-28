import { addComponent, defineNuxtModule } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
import { componentNames } from './components'

export interface ModuleOptions {
  /** Inject vueduck-ui/style.css automatically. Disable to import it yourself. */
  css?: boolean
}

const module: NuxtModule<ModuleOptions> = defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vueduck-ui',
    configKey: 'vueduck',
  },
  defaults: {
    css: true,
  },
  setup(options, nuxt) {
    if (options.css) {
      nuxt.options.css.push('vueduck-ui/style.css')
    }
    for (const name of componentNames) {
      addComponent({ name, export: name, filePath: 'vueduck-ui' })
    }
  },
})

export default module
