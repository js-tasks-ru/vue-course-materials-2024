import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import UiContainer from './components/UiContainer.js'
import UiButton from './components/UiButton.js'

export default defineComponent({
  name: 'App',

  components: {
    UiButton,
    UiContainer,
  },

  template: `
    <div class="wrapper">
      <div class="main">
        <UiContainer>
          <h2>Buttons</h2>

          <p>
            <UiButton>UiButton</UiButton>
          </p>
        </UiContainer>
      </div>
    </div>
  `,
})
