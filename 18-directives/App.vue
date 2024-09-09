<script setup>
import { ref } from 'vue'

const text = ref('Input Value')

function handleFocus(event) {
  event.target.setSelectionRange(0, -1)
}
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <input v-model="text" @focus="handleFocus" />
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
