# vueduck monorepo

| Path | |
| --- | --- |
| `packages/ui` | published library (`vueduck-ui`) |
| `docs` | VitePress docs site |
| `playground/vue`, `playground/nuxt` | local test apps |

```sh
pnpm install
pnpm build        # build library
pnpm test         # vitest
pnpm docs:dev     # docs site
pnpm play:vue     # Vue playground (run `pnpm -F vueduck-ui dev` for watch build)
pnpm play:nuxt    # Nuxt playground
```

## Adding a component

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full steps and the docs writing rules.


1. `packages/ui/src/components/<name>/` — `<Name>.vue`, `<name>.css`, `index.ts`, `<Name>.spec.ts`
2. Export it in `src/index.ts`, add the name to `src/components.ts` and the `GlobalComponents` block
3. `@import` its CSS in `src/styles/index.css`
4. Add `docs/components/<name>.md` and a sidebar entry in `docs/.vitepress/config.ts`
