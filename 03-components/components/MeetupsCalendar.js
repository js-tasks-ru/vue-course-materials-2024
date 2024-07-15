import { defineComponent } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  template: `
    <div class="meetups-calendar">Календарь</div>
  `,
})
