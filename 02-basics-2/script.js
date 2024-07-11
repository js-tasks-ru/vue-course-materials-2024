import '@shgk/vue-course-ui/meetups/style.css'
import { defineComponent, createApp, ref, computed, onMounted } from 'vue/dist/vue.esm-browser.js'

async function fetchMeetups() {
  const response = await fetch('https://course-vue.javascript.ru/api/meetups')
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }
  return result
}

const App = defineComponent({
  name: 'App',

  setup() {
    // Всё состояние приложения (на сколько возможно) - должно быть описано как состояние Vue приложения
    // В противном случае будут части DOM, изменяющиеся неконтролируемо
    const view = ref('list')
    const filters = ref({
      date: 'all',
      participation: 'all',
      query: '',
    })

    // Начальным значением лучше указывать null, а не пустой массив [] чтобы явно указать на отсутствие данных
    const meetups = ref(null)

    // Отфильтрованные митапы - это результат вычисления от других данных
    // С вычисляемым свойством значение переменной будет обновляться автоматически и только при необходимости
    const filteredMeetups = computed(() => {
      const dateFilter = (meetup) =>
        filters.value.date === 'all' ||
        (filters.value.date === 'past' && new Date(meetup.date) <= new Date()) ||
        (filters.value.date === 'future' && new Date(meetup.date) > new Date())

      const participationFilter = (meetup) =>
        filters.value.participation === 'all' ||
        (filters.value.participation === 'organizing' && meetup.organizing) ||
        (filters.value.participation === 'attending' && meetup.attending)

      const searchFilter = (meetup) =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(' ')
          .toLowerCase()
          .includes(filters.value.query.toLowerCase())

      return meetups.value.filter((meetup) => dateFilter(meetup) && participationFilter(meetup) && searchFilter(meetup))
    })

    // Устанавливаем хук жизненного цикла mounted
    // Он сработает, когда экземпляр компонента будет создан и затем смонтирован в DOM дерево
    // Запрашивать данные можно и просто в setup в IIFE или с .then()
    // Но с onMounted чуть безопаснее - непойманное исключение не сломает setup компонента
    onMounted(async () => {
      try {
        meetups.value = await fetchMeetups()
      } catch (error) {
        console.error(error)
      }
    })

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
      view,
      filters,
      meetups,
      filteredMeetups,
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
              <!-- ref автоматически разворачивается (unwrap) в шаблоне. Писать .value не нужно (и нельзя) -->
              <!-- v-model - директива двустороннего связывания. Синтаксический сахар для двух других директив. -->
              <!-- Здесь v-model="filters.date" эквивалентно :checked="filters.date == 'all'" + @input="filters.date = 'all'" -->
              <input
                id="radio-buttons_date_all"
                class="radio-group__input"
                type="radio"
                name="date"
                value="all"
                v-model="filters.date"
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
                v-model="filters.date"
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
                v-model="filters.date"
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
              <!-- Модификаторы директивы могут менять работу с значением -->
              <input
                class="form-control form-control--rounded form-control--sm"
                aria-label="Поиск"
                placeholder="Поиск"
                type="search"
                v-model.trim="filters.query"
              />
            </div>
          </div>
          <div class="form-group form-group--inline">
            <div class="button-group" role="radiogroup" aria-label="Расположение митапов">
              <!-- Даже если HTML атрибут ожидает значение "false", оно должно быть строкой. Иначе это "не добавлять атрибут" -->
              <!-- v-on - директива для обработки событий -->
              <!-- В общем виде v-on="{ event1: handler, event2: handler }" -->
              <!-- Конкретное событие указывается через аргумент v-on:click="handler" -->
              <!-- @event - короткая запись для v-on:event -->
              <!-- Значением может быть сразу тело функции -->
              <!-- @click="view = 'list'" эквивалентно @click="() => view = 'list'" -->
              <!-- через $event в обработчике можно обратиться к объекту события -->
              <!-- Модификаторы директивы настраивают обработку события, например, .stop - event.stopPropagation() -->
              <button
                type="button"
                class="button-group__button"
                :class="{ 'button-group__button--active': view === 'list' }"
                role="radio"
                aria-label="Список"
                :aria-checked="view === 'list' ? 'true' : 'false'"
                @click="view = 'list'"
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
                :class="{ 'button-group__button--active': view === 'calendar' }"
                role="radio"
                aria-label="Календарь"
                :aria-checked="view === 'calendar' ? 'true' : 'false'"
                @click="view = 'calendar'"
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

      <!-- Специальный тег template позволяет оборачивать несколько узлов для директив v-if и v-for -->
      <template v-if="meetups !== null">
        <template v-if="filteredMeetups.length">
          <ul v-if="view === 'list'" class="meetups-list">
            <li v-for="meetup in filteredMeetups" :key="meetup.id" class="meetups-list__item">
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
          <div v-else-if="view === 'calendar'" class="meetups-calendar">Календарь</div>
        </template>
        <div v-else class="alert">Митапов по заданным условиям не найдено...</div>
      </template>
      <div v-else class="alert">Загрузка...</div>

    </div>
  `,
})

createApp(App).mount('#app')
