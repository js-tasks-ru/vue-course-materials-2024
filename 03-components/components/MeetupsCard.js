import { defineComponent, computed, toRef } from 'vue/dist/vue.esm-bundler.js'
import UiCard from './UiCard.js'
import UiBadge from './UiBadge.js'

export default defineComponent({
  name: 'MeetupsCard',

  components: {
    UiBadge,
    UiCard,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const meetup = toRef(() => props.meetup)

    const isoDate = computed(() => new Date(meetup.value.date).toISOString())
    const localDate = computed(() =>
      new Date(meetup.value.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    )

    return {
      isoDate,
      localDate,
    }
  },

  template: `
    <UiCard :cover="meetup.image" class="meetup-card">
      <!-- Элемент <template> с директивой v-slot используется для передачи содержимого (на самом деле шаблона) в слот -->
      <!-- Аргумент - имя слота v-slot:slot-name -->
      <!-- v-slot: сокращается до # -->
      <template #header>
        <header>
          <h3>{{ meetup.title }}</h3>
        </header>
      </template>

      <!-- Слот по умолчанию можно передавать и без <template>, между тегами компонента, как в обычном HTML -->
      <!-- Или не указывать имя слота, используя просто директиву v-slot -->
      <UiBadge v-if="meetup.organizing" kind="success" class="meetup-card__badge">Организую</UiBadge>
      <UiBadge v-if="meetup.attending" kind="primary" class="meetup-card__badge">Участвую</UiBadge>

      <ul class="meetup-info">
        <li class="meetup-info__item">
          <img class="meetup-info__icon icon" src="../node_modules/@shgk/vue-course-ui/dist/meetups/assets/icons/icon-user.svg" alt="user" />
          {{ meetup.organizer }}
        </li>
        <li class="meetup-info__item">
          <img class="meetup-info__icon icon" src="../node_modules/@shgk/vue-course-ui/dist/meetups/assets/icons/icon-map.svg" alt="map" />
          {{ meetup.place }}
        </li>
        <li class="meetup-info__item">
          <img class="meetup-info__icon icon" src="../node_modules/@shgk/vue-course-ui/dist/meetups/assets/icons/icon-cal-lg.svg" alt="cal-lg" />
          <time :datetime="isoDate">{{ localDate }}</time>
        </li>
      </ul>
    </UiCard>
  `,
})
