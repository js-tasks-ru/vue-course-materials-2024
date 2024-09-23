import { vi, describe, it, expect } from 'vitest'
import { config, flushPromises, mount, shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import PageMeetups from '../../../components/PageMeetups.vue'
import meetupsFixture from '../../__fixtures__/meetups.json'
import { fetchMeetups } from '../../../api.ts'
import UiButtonGroup from '../../../components/UiButtonGroup.vue'
import MeetupsCalendar from '../../../components/MeetupsCalendar.vue'
import MeetupsList from '../../../components/MeetupsList.vue'

// Подменяем fetchMeetups на заглушку
// Альтернатива: msw.io
vi.mock('../../../api.ts')
fetchMeetups.mockResolvedValue(meetupsFixture)

// По умолчанию у заглушек не рендерится содержимое (слот по умолчанию)
// Это бывает не удобно - включим глобально
config.global.renderStubDefaultSlot = true

describe('PageMeetups', () => {
  it('should match snapshot', async () => {
    const wrapper = shallowMount(PageMeetups)
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should request meetups by fetchMeetups on mount', async () => {
    shallowMount(PageMeetups)
    await flushPromises()
    expect(fetchMeetups).toHaveBeenCalled()
  })

  // Unit-тест - тестируем взаимодействие с другими компонентами
  it('should render meetups by MeetupsCalendar on switch to calendar view', async () => {
    const wrapper = shallowMount(PageMeetups)
    await flushPromises()
    const uiButtonGroup = wrapper.findComponent(UiButtonGroup)
    uiButtonGroup.vm.$emit('update:view', 'calendar')
    await nextTick()
    expect(wrapper.findComponent(MeetupsList).exists()).toBe(false)
    expect(wrapper.findComponent(MeetupsCalendar).exists()).toBe(true)
    expect(wrapper.findComponent(MeetupsCalendar).props('meetups')).toEqual(meetupsFixture)
  })

  // Интеграционный тест - тестируем полный компонент
  it('should render meetups calendar on switch to calendar view', async () => {
    const wrapper = mount(PageMeetups)
    await flushPromises()
    const calendarButton = wrapper.get('[aria-label="Календарь"]')
    await calendarButton.trigger('click')
    expect(wrapper.find('.meetups-list').exists()).toBe(false)
    expect(wrapper.find('.meetups-calendar').exists()).toBe(true)
  })
})
