import { defineComponent } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'UiContainer',

  template: `
    <div class="container">
      <slot />
    </div>
  `,
})
