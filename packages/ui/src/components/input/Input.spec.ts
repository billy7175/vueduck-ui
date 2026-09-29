import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Input from './Input.vue'

describe('VdInput', () => {
  it('renders a text input with default classes', () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('text')
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['vd-input', 'vd-input--md']))
  })

  it('supports v-model', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: 'a', 'onUpdate:modelValue': (v: string | number | null | undefined) => wrapper.setProps({ modelValue: v }) },
    })
    expect(wrapper.find('input').element.value).toBe('a')
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['hello'])
  })

  it('applies .number and .trim modifiers', async () => {
    const num = mount(Input, { props: { modelValue: '', modelModifiers: { number: true } } })
    await num.find('input').setValue('42.5')
    expect(num.emitted('update:modelValue')?.at(-1)).toEqual([42.5])

    const trim = mount(Input, { props: { modelValue: '', modelModifiers: { trim: true } } })
    await trim.find('input').setValue('  hi  ')
    expect(trim.emitted('update:modelValue')?.at(-1)).toEqual(['hi'])
  })

  it('puts class/style on the wrapper and other attrs on the input', () => {
    const wrapper = mount(Input, { attrs: { class: 'custom', placeholder: 'Email', name: 'email' } })
    expect(wrapper.classes()).toContain('custom')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Email')
    expect(wrapper.find('input').attributes('name')).toBe('email')
    expect(wrapper.attributes('placeholder')).toBeUndefined()
  })

  it('marks invalid for assistive tech', () => {
    const wrapper = mount(Input, { props: { invalid: true } })
    expect(wrapper.classes()).toContain('is-invalid')
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('passes disabled and readonly to the native input', () => {
    const wrapper = mount(Input, { props: { disabled: true, readonly: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('shows the clear button only when there is a value, and clears it', async () => {
    const wrapper = mount(Input, {
      props: {
        clearable: true,
        modelValue: '',
        'onUpdate:modelValue': (v: string | number | null | undefined) => wrapper.setProps({ modelValue: v }),
      },
    })
    expect(wrapper.find('.vd-input__clear').exists()).toBe(false)
    await wrapper.setProps({ modelValue: 'abc' })
    const clear = wrapper.find('.vd-input__clear')
    expect(clear.attributes('aria-label')).toBe('Clear')
    await clear.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('hides the clear button when disabled or readonly', () => {
    for (const p of [{ disabled: true }, { readonly: true }]) {
      const wrapper = mount(Input, { props: { clearable: true, modelValue: 'x', ...p } })
      expect(wrapper.find('.vd-input__clear').exists()).toBe(false)
    }
  })

  it('renders prefix and suffix slots', () => {
    const wrapper = mount(Input, { slots: { prefix: () => h('i', 'P'), suffix: () => 'kg' } })
    const affixes = wrapper.findAll('.vd-input__affix')
    expect(affixes).toHaveLength(2)
    expect(affixes[1].text()).toBe('kg')
  })

  it('exposes focus()', () => {
    const wrapper = mount(Input, { attachTo: document.body })
    ;(wrapper.vm as unknown as { focus: () => void }).focus()
    expect(document.activeElement).toBe(wrapper.find('input').element)
    wrapper.unmount()
  })
})
