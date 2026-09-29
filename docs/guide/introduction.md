# 소개

**vueduck**은 Vue 3와 Nuxt에서 사용할 수 있는 UI 컴포넌트 라이브러리입니다. 순수 CSS로 가볍게, 접근성은 기본으로, 테마는 **CSS 변수 몇 개로** 바꿉니다.

## 설계 원칙

- **순수 CSS + CSS 변수** — 빌드 도구에 추가 설정 없이 동작하고, `--vd-*` 토큰으로 테마를 바꿉니다.
- **접근성** — 네이티브 요소를 우선 사용하고, 복잡한 인터랙션(모달, 팝오버, 셀렉트 등)은 검증된 headless 프리미티브 위에 만듭니다.
- **일관된 API** — 모든 컴포넌트는 `Vd` 접두사, `variant` / `size` props, `vd-` 클래스 규칙을 따릅니다.

## 로드맵

굵게 표시된 컴포넌트는 지금 바로 쓸 수 있고, 나머지는 **하나씩 순서대로** 추가됩니다.

| 분류 | 컴포넌트 |
| --- | --- |
| Form & Action | **Button**, **Input** (사용 가능), Textarea, Checkbox, Radio, Switch, Select, FormField |
| 피드백 & 오버레이 | Modal, Toast, Tooltip, Alert, Spinner |
| 데이터 표시 | Badge, Card, Avatar, Tag, Divider, Skeleton, Progress, Table, Empty |
| 내비게이션 | Tabs, Accordion, Dropdown Menu, Pagination, Breadcrumb, Popover |
| 고급 | Drawer, Combobox, Slider, NumberInput, DatePicker, FileUpload, Stepper, Tree, Command Palette, Carousel |
