<script setup>
import { ref } from 'vue'
import { vSelectOnFocus } from './selectOnFocus.js'

const text = ref('Input Value')
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <input v-model="text" v-select-on-focus="[3, 5]" />
    </main>
  </div>
</template>

<style>
.wrapper {
  background-color: var(--grey-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}
</style>
