import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vueduck UI',
  description: 'Vue 3 & Nuxt를 위한 깔끔하고 접근성 있는 컴포넌트 라이브러리',
  lang: 'ko-KR',
  cleanUrls: true,
  appearance: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo-light.svg' }],
    ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
      },
    ],
  ],
  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },
    nav: [
      { text: '가이드', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: '컴포넌트', link: '/components/button', activeMatch: '/components/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '시작하기',
          items: [
            { text: '소개', link: '/guide/introduction' },
            { text: '설치', link: '/guide/installation' },
            { text: '테마', link: '/guide/theming' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Form & Action',
          items: [{ text: 'Button', link: '/components/button' }],
        },
      ],
    },
    outline: { label: '이 페이지에서' },
    docFooter: { prev: '이전', next: '다음' },
    darkModeSwitchLabel: '테마',
    returnToTopLabel: '맨 위로',
    sidebarMenuLabel: '메뉴',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/billy7175/vueduck-ui' }],
    footer: { message: 'MIT License', copyright: '© 2026 vueduck' },
  },
})
