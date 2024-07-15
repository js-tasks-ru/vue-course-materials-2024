import { defineComponent } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'UiAlert',

  props: {
    text: {
      type: String,
    },
  },

  template: `
    <div class="alert">
      <!-- Полезный приём - слот, значение по умолчанию которого определяется пропсом -->
      <!-- Так пользователь компонента может определять содержимое как полностью кастомным контентом, так и простым пропсом -->
      <slot>{{ text }}</slot>
    </div>
  `,
})
