<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiButtonGroup',

  props: {
    view: {
      type: String,
      required: true,
      validator: (value) => ['list', 'calendar'].includes(value),
    },
  },

  emits: ['update:view'],
})
</script>

<template>
  <div class="button-group" role="radiogroup" aria-label="Расположение митапов">
    <button
      type="button"
      class="button-group__button"
      :class="{ 'button-group__button--active': view === 'list' }"
      role="radio"
      aria-label="Список"
      :aria-checked="view === 'list' ? 'true' : 'false'"
      @click="$emit('update:view', 'list')"
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
      @click="$emit('update:view', 'calendar')"
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
</template>

<style>
/* _button-group.css */
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}

/* _button-group.css */
.button-group__button {
  background-color: var(--white);
  border: 2px solid var(--blue);
  border-left: none;
  height: 44px;
  padding: 0 8px;
  color: var(--blue);
  font-weight: 400;
  font-size: 20px;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition-duration: 0.3s;
  transition-property: background-color, fill;
  box-shadow: none;
  outline: none;
  cursor: pointer;
}

.button-group__button:first-child {
  border-radius: 22px 0 0 22px;
  border-left: 2px solid var(--blue);
  padding-left: 10px;
  padding-right: 6px;
}

.button-group__button:last-child {
  border-radius: 0 22px 22px 0;
  padding-right: 10px;
}

.button-group__button:hover,
.button-group__button--active {
  background-color: var(--blue);
  color: var(--white);
}

.button-group__button svg {
  fill: var(--blue);
}

.button-group__button:hover svg,
.button-group__button--active svg {
  fill: var(--white);
}
</style>
