// Все стили Meetups
import '@shgk/vue-course-ui/meetups/style.css'
// Копия ответа сервера по запросу /api/meetups для авторизованного пользователя
import meetupsJson from './api/meetups.json'

// Vue - версия ES Module для веб-браузера (с компилятором шаблонов)
// Такой вариант Vue работает даже без сборщиков (без Vite или Webpack)
// При работе через сборщик более оптимально импортировать vue/dist/vue.esm-bundler.js
// При работе через сборщик с .vue файлами (SFC) - наиболее оптимально импортировать vue/dist/vue.runtime.esm-browser.js или просто vue
import { defineComponent, createApp } from 'vue/dist/vue.esm-browser.js'

const App = defineComponent({
  // Имя компонента - не обязательная опция, но принято иметь - полезно для отладки и редких случаев
  name: 'App',

  // Setup собирает и настраивает экземпляр компонента: определяет его свойства и логику работы
  setup() {
    const hello = '<h1>Hello, Vue 3!</h1>'
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

    // Свойства возвращаемого объекта будут свойствами экземпляра компонента
    return {
      hello,
      meetups,
      formatAsIsoDate,
      formatAsLocalDate,
      // Каждый экземпляр - независим, собирается заново функцией setup
      // Свойство random будет неизменным, но разным у каждого экземпляра
      random: Math.random(),
    }
  },

  template: `
    <div class="container">
      <!-- В обрасти видимости шаблона есть основные глобальные имена и свойства экземпляра компонента: глобальные публичные свойства и собственные свойства экземпляра -->
      <!-- В текстовой интерполяции можно определять ТЕКСТОВОЕ СОДЕРЖИМОЕ узлов через JavaScript выражения -->
      <div>
        Сегодня {{ new Date().toLocaleDateString('ru-RU') }}, это компонент {{ $options.name }}.
        {{ hello }}
      </div>
      <!-- Атрибуты v-* - директивы. Они определяют поведение узлов. -->
      <!-- v-text - аналог текстовой интерполяции -->
      <div v-text="hello"></div>
      <!-- v-html - определяет HTML содержимое элемента -->
      <div v-html="hello"></div>
      <!-- v-pre - Отключает интерпретацию шаблона внутри элемента. Здесь текстовая интерполяция выведется как есть: {{ hello }} -->
      <div v-pre>{{ hello }}</div>

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
        <!-- v-for - директива для рендеринга списков или директива цикла, повторения -->
        <!-- Имеет особый синтаксис, не JS выражение, а "параметр_цикла in итерируемая_сущность" -->
        <!-- Параметров может быть до трёх: v-for="(значение, индекс, ключ) in итерируемая_сущность" -->
        <li v-for="meetup in meetups" :key="meetup.id" class="meetups-list__item">
          <!-- v-bind позволяет привязывать значение  -->
          <!-- Общий синтаксис: v-bind="{ атрибут: значение, атрибут2: значение }" -->
          <!-- Обычно через аргумент используют привязку для одного параметра -->
          <!-- v-bind:href="js выражение" -->
          <!-- :href - сокращенная запись v-bind:href -->
          <a :href="\`/meetups/\${meetup.id}\`" class="meetups-list__item-link" tabindex="0">
            <article class="meetup-card card">
              <div class="card__col">
                <!-- Атрибуты style и class можно смешивать указывать дважды - со статичным и динамическим значением -->
                <!-- Также описывать массив стилей/классов и объект стилей -->
                <!-- Если значение будет falsy - атрибут не будет добавлен -->
                <div class="card__cover" :style="meetup.image && { '--bg-url': \`url('\${meetup.image}')\` }">
                  <header>{{ meetup.title }}</header>
                </div>
              </div>
              <div class="card__col">
                <div class="card__content">
                  <!-- v-if - директива условного рендеринга или ветвления. Узел рендерится только при истинном значении -->
                  <!-- Связные директивы - v-else-if и v-else -->
                  <span v-if="meetup.organizing" class="meetup-card__badge badge badge--success">Организую</span>
                  <span v-else-if="meetup.attending" class="meetup-card__badge badge badge--primary">Участвую</span>
                  <!-- Если узел не рендерится, никакой код в нём не исполняется, аналогично обычным if в JS -->
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
                      <!-- В шаблоне можно использовать методы, чтобы не перегружать сложными выражениями, но с осторожностью -->
                      <!-- Метод должен быть чистой функцией. Не иметь побочных эффектов, не изменять состояние приложения. В противном случае рендеринг не воспроизводим. -->
                      <!-- Метод должен не должен быть медленным. В противном случае рендеринг медленный. -->
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

// Создаём Vue приложение - абстракцию для конфигурации
const app = createApp(App)
// Через приложение можно устанавливать плагины, глобальную конфигурацию и др.
// app.use(plugin)

// После монтирования приложения на страницу, Vue отвечает за рендеринг этой части страницы.
// Метод возвращает экземпляр корневого компонента
const vm = app.mount('#app')

// Для отладки - добавим в глобальную переменную
// Позже научимся делать это через vue-devtools
window.vm = vm
