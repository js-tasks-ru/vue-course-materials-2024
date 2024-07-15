import { defineComponent } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'UiCard',

  props: {
    header: {
      type: String,
    },

    cover: {
      type: String,
    }
  },

  template: `
    <article class="card">
      <div class="card__col">
        <div class="card__cover" :style="cover && { '--bg-url': \`url('\${cover}')\` }">
          <header>
            <slot name="header">{{ header }}</slot>
          </header>
        </div>
      </div>
      <div class="card__col">
        <div class="card__content">
          <slot />
        </div>
      </div>
    </article>
  `
})
