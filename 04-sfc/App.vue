<script setup>
import UiContainer from './components/UiContainer.vue'
import UiButton from './components/UiButton.vue'
import UiButtonCssModules from './components/UiButtonCssModules.vue'
import UiButtonGroup from './components/UiButtonGroup.vue'
import UiRadioGroup from './components/UiRadioGroup.vue'
import UiRadioGroupCssModules from './components/UiRadioGroupCssModules.vue'
import { ref } from 'vue'

const view = ref('list')
const selected = ref('1')
</script>

<template>
  <div class="wrapper">
    <div class="main">
      <UiContainer>
        <h2>Buttons</h2>

        <p>
          <button>HTML Button</button>
        </p>
        <p>
          <UiButton>UiButton</UiButton>
        </p>
        <p>
          <UiButtonCssModules>UiButtonCssModules</UiButtonCssModules>
        </p>

        <h2>UiButtonGroup</h2>
        <p>
          <UiButtonGroup v-model:view="view" />
        </p>
        <p>
          <UiButtonGroup v-model:view="view" color="green" />
        </p>

        <h2>UiRadioGroup</h2>
        <p>
          <UiRadioGroup v-model="selected" :options="[{ label: 'One', value: '1' }, { label: 'Two', value: '2' }]" />
        </p>
        <p>
          <UiRadioGroup v-model="selected" :options="[{ label: 'One', value: '1' }, { label: 'Two', value: '2' }]" class="my-radio-group" />
        </p>
        <p>
          <UiRadioGroupCssModules v-model="selected" :options="[{ label: 'One', value: '1' }, { label: 'Two', value: '2' }]" class="my-radio-group" button-classes="my-button-label" />
        </p>
      </UiContainer>
    </div>
  </div>
</template>

<style scoped>
/* Работает в scoped, так как общий узел */
.my-radio-group {
  margin: 0 auto;
}

/* Работает только без инкапсуляции хотя бы в одну сторону (App или UiRadioGroup) */
/* Если убрать scoped у этого компонента - ребёнок покрасится в красный */
.my-radio-group .radio-group__label {
  border-radius: 0;
  color: red;
}

/* Работает в scoped */
/* Может быть полезно */
/* Может быть проблемой из-за грязного решения */
.my-radio-group :deep(.radio-group__label) {
  border-radius: 0 !important;
}

/* Случайно сработало в scoped */
.button {
  color: red;
}

/* Работает и в scoped, и в module - явно прописанный интерфейс */
/* В module - не нужен deep */
/* Надёжно за счёт ограничения */
/* Требует больше работы и ограничивает */
.my-radio-group :deep(.my-button-label) {
  border-radius: 0 !important;
}
</style>
