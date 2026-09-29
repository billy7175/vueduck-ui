// Single source of truth for component names: used by the Vue plugin and the Nuxt module.
export const componentNames = ['VdButton', 'VdInput'] as const
export type ComponentName = (typeof componentNames)[number]
