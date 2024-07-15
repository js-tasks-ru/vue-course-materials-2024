import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import MeetupsCard from './MeetupsCard.js'

export default defineComponent({
  name: 'MeetupsList',

  components: {
    MeetupsCard,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul class="meetups-list">
      <li v-for="meetup in meetups" :key="meetup.id" class="meetups-list__item">
        <a :href="\`/meetups/\${meetup.id}\`" class="meetups-list__item-link" tabindex="0">
          <MeetupsCard :meetup="meetup" />
        </a>
      </li>
    </ul>
  `,
})
