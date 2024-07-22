import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import './UiContainer.css'

export default defineComponent({
  name: 'UiContainer',

  template: `
    <div class="container">
      <slot />
    </div>
  `,
})
