import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiInput from '../../../components/UiInput.vue'

// describe создаёт группу тестов
describe('UiInput', () => {
  // it описывает один тест. Алиас: test
  it('should be defined', () => {
    // expect - проверка теста
    expect(UiInput).toBeDefined()
  })

  it('should render input', () => {
    // mount - монтирует компонент в специальную обёртку
    const wrapper = mount(UiInput)
    const input = wrapper.find('input')
    expect(input.exists()).toBeTruthy()
  })

  // Можно создавать подгруппы тестов
  describe('rounded', () => {
    // Эти тесты тестируют вёрстку, ориентируясь на конкретную имплементацию (конкретные классы).
    // Это не очень хорошо, но хороших альтернатив нет:
    // - snapshot тесты
    // - screenshot тесты
    // Оба варианта ориентируются на эталон, который
    // - легко заменяется, но не всегда по валидной причине (нет контроля)
    // - может не пройти по множеству причин, а не только проверяет "скруглённость"

    it('should have .form-control--rounded on input with rounded', () => {
      const wrapper = mount(UiInput, {
        props: {
          rounded: true,
        },
      })
      const input = wrapper.get('input')
      expect(input.classes('form-control--rounded')).toBeTruthy()
    })

    it('should have .form-control--rounded on input without rounded', () => {
      const wrapper = mount(UiInput, {
        props: {
          rounded: false,
        },
      })
      const input = wrapper.get('input')
      expect(input.classes('form-control--rounded')).toBeFalsy()
    })

    it('should add .form-control--rounded on input rounded toggle', async () => {
      const wrapper = mount(UiInput, {
        props: {
          rounded: false,
        },
      })
      const input = wrapper.get('input')

      await wrapper.setProps({ rounded: true })
      // await nextTick() - не нужен, так как setProps уже его возвращает

      expect(input.classes('form-control--rounded')).toBeTruthy()
    })
  })

  it('should render input with modelValue', () => {
    const TEST_VALUE = 'test'
    const wrapper = mount(UiInput, {
      props: {
        modelValue: TEST_VALUE,
      },
    })
    const input = wrapper.get('input')
    expect(input.element.value).toBe(TEST_VALUE)
  })

  it('should emit update:modelValue on input', async () => {
    const wrapper = mount(UiInput)
    const input = wrapper.get('input')
    // input.element.value = 'test'
    // input.trigger('input')
    // input.trigger('change')
    // setValue делает всё перечисленное сам
    await input.setValue('test')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test'])
  })

  it('should have model', async () => {
    let modelValue = 'test'
    const wrapper = mount(UiInput, {
      props: {
        modelValue,
      },
      attrs: {
        'onUpdate:modelValue': $event => {
          modelValue = $event
          wrapper.setProps({ modelValue })
        },
      },
    })

    const input = wrapper.get('input')
    await input.setValue('test2')

    expect(modelValue).toBe('test2')
    expect(wrapper.props('modelValue')).toBe('test2')
  })

  it('should set change handler on input', async () => {
    const handler = vi.fn()
    const wrapper = mount(UiInput, {
      attrs: {
        onChange: $event => {
          handler($event.target.value)
        },
      },
    })
    const input = wrapper.get('input')
    await input.setValue('test')

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith('test')
  })

  it('should match snapshot', () => {
    const wrapper = mount(UiInput)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
