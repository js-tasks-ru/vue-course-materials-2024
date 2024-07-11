import '@shgk/vue-course-ui/meetups/style.css'
import meetupsJson from './api/meetups.json'
import { defineComponent, createApp } from 'vue/dist/vue.esm-browser.js'

const App = defineComponent({
  name: 'App',

  setup() {
    const meetups = meetupsJson

    function formatAsIsoDate(timestamp) {
      return new Date(timestamp).toISOString()
    }

    function formatAsLocalDate(timestamp) {
      return new Date(timestamp).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    return {
      meetups,
      formatAsIsoDate,
      formatAsLocalDate,
    }
  },

  template: `
    <div class="container">
      <div class="filters-panel">
        <div class="filters-panel__col">
          <div class="radio-group">
            <div class="radio-group__button">
              <input
                id="radio-buttons_date_all"
                class="radio-group__input"
                type="radio"
                name="date"
                value="all"
              />
              <label for="radio-buttons_date_all" class="radio-group__label">Все</label>
            </div>
            <div class="radio-group__button">
              <input
                id="radio-buttons_date_future"
                class="radio-group__input"
                type="radio"
                name="date"
                value="past"
              />
              <label for="radio-buttons_date_future" class="radio-group__label">Прошедшие</label>
            </div>
            <div class="radio-group__button">
              <input
                id="radio-buttons_date_past"
                class="radio-group__input"
                type="radio"
                name="date"
                value="future"
              />
              <label for="radio-buttons_date_past" class="radio-group__label">Ожидаемые</label>
            </div>
          </div>
        </div>

        <div class="filters-panel__col">
          <div class="form-group form-group--inline">
            <div class="input-group input-group_icon input-group_icon-left">
              <div class="input-group__icon">
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="icon">
                  <g stroke="#8ca0cf" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="m11 19c4.4183 0 8-3.5817 8-8 0-4.41828-3.5817-8-8-8-4.41828 0-8 3.58172-8 8 0 4.4183 3.58172 8 8 8z"/>
                    <path d="m20.9999 21-4.35-4.35"/>
                  </g>
                </svg>
              </div>
              <input
                class="form-control form-control--rounded form-control--sm"
                aria-label="Поиск"
                placeholder="Поиск"
                type="search"
              />
            </div>
          </div>
          <div class="form-group form-group--inline">
            <div class="button-group" role="radiogroup" aria-label="Расположение митапов">
              <button
                type="button"
                class="button-group__button button-group__button--active"
                role="radio"
                aria-label="Список"
                aria-checked="true"
              >
                <svg fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg">
                  <path
                    clip-rule="evenodd"
                    d="m5 7c-.55228 0-1 .44772-1 1s.44772 1 1 1h.01c.55228 0 1-.44772 1-1s-.44772-1-1-1zm5 0c-.55228 0-1 .44772-1 1s.44772 1 1 1h13c.5523 0 1-.44772 1-1s-.4477-1-1-1zm0 6c-.55228 0-1 .4477-1 1s.44772 1 1 1h13c.5523 0 1-.4477 1-1s-.4477-1-1-1zm-1 7c0-.5523.44772-1 1-1h13c.5523 0 1 .4477 1 1s-.4477 1-1 1h-13c-.55228 0-1-.4477-1-1zm-5-6c0-.5523.44772-1 1-1h.01c.55228 0 1 .4477 1 1s-.44772 1-1 1h-.01c-.55228 0-1-.4477-1-1zm1 5c-.55228 0-1 .4477-1 1s.44772 1 1 1h.01c.55228 0 1-.4477 1-1s-.44772-1-1-1z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                class="button-group__button"
                role="radio"
                aria-label="Календарь"
                aria-checked="false"
              >
                <svg height="22" viewBox="0 0 20 22" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    clip-rule="evenodd"
                    d="m15 1c0-.552285-.4477-1-1-1s-1 .447715-1 1v1h-6v-1c0-.552285-.44772-1-1-1s-1 .447715-1 1v1h-2c-1.65685 0-3 1.34315-3 3v14c0 1.6569 1.34315 3 3 3h14c1.6569 0 3-1.3431 3-3v-14c0-1.65685-1.3431-3-3-3h-2zm3 7v-3c0-.55228-.4477-1-1-1h-2v1c0 .55228-.4477 1-1 1s-1-.44772-1-1v-1h-6v1c0 .55228-.44772 1-1 1s-1-.44772-1-1v-1h-2c-.55228 0-1 .44772-1 1v3zm-16 2h16v9c0 .5523-.4477 1-1 1h-14c-.55228 0-1-.4477-1-1z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul class="meetups-list">
        <li v-for="meetup in meetups" :key="meetup.id" class="meetups-list__item">
          <a :href="\`/meetups/\${meetup.id}\`" class="meetups-list__item-link" tabindex="0">
            <article class="meetup-card card">
              <div class="card__col">
                <div class="card__cover" :style="meetup.image && { '--bg-url': \`url('\${meetup.image}')\` }">
                  <header>{{ meetup.title }}</header>
                </div>
              </div>
              <div class="card__col">
                <div class="card__content">
                  <span v-if="meetup.organizing" class="meetup-card__badge badge badge--success">Организую</span>
                  <span v-else-if="meetup.attending" class="meetup-card__badge badge badge--primary">Участвую</span>
                  <span v-if="false">{{ meetup.notAFunction('Я никогда не буду вызыван') }}</span>
                  <ul class="meetup-info">
                    <li class="meetup-info__item">
                      <img class="meetup-info__icon icon" src="../node_modules/@shgk/vue-course-ui/dist/meetups/assets/icons/icon-user.svg" alt=""/>
                      {{ meetup.organizer }}
                    </li>
                    <li class="meetup-info__item">
                      <img class="meetup-info__icon icon" src="../node_modules/@shgk/vue-course-ui/dist/meetups/assets/icons/icon-map.svg" alt=""/>
                      {{ meetup.place }}
                    </li>
                    <li class="meetup-info__item">
                      <img class="meetup-info__icon icon" src="../node_modules/@shgk/vue-course-ui/dist/meetups/assets/icons/icon-cal-lg.svg" alt=""/>
                      <time :datetime="formatAsIsoDate(meetup.date)">{{ formatAsLocalDate(meetup.date) }}</time>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </a>
        </li>
      </ul>

      <div class="meetups-calendar">Календарь</div>
      <div class="alert">Митапов по заданным условиям не найдено...</div>
      <div class="alert">Загрузка...</div>
    </div>
  `,
})

const app = createApp(App)

const vm = app.mount('#app')

window.vm = vm
