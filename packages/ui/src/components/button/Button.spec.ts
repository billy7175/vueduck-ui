import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Button from './Button.vue'

describe('VdButton', () => {
  it('renders slot content with default classes', () => {
    const wrapper = mount(Button, { slots: { default: 'Save' } })
    expect(wrapper.text()).toBe('Save')
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['vd-button', 'vd-button--solid', 'vd-button--md']))
  })

  it('applies variant and size', () => {
    const wrapper = mount(Button, { props: { variant: 'outline', size: 'lg' } })
    expect(wrapper.classes()).toContain('vd-button--outline')
    expect(wrapper.classes()).toContain('vd-button--lg')
  })

  it('emits click when enabled', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, { attrs: { onClick } })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled and busy while loading', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, { props: { loading: true }, attrs: { onClick } })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.find('.vd-button__spinner').exists()).toBe(true)
    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders as a link with aria-disabled instead of disabled', () => {
    const wrapper = mount(Button, { props: { as: 'a', disabled: true }, attrs: { href: '/x' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('type')).toBeUndefined()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.attributes('tabindex')).toBe('-1')
  })

  it('renders prefix and suffix slots', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Next', prefix: () => h('i', 'L'), suffix: () => h('i', 'T') },
    })
    expect(wrapper.findAll('.vd-button__icon')).toHaveLength(2)
  })
})
