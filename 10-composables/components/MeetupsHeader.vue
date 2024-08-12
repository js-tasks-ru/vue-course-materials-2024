<script setup>
import MeetupsLogo from './MeetupsLogo.vue';
import MeetupsNav from './MeetupsNav.vue';
</script>

<template>
  <header class="header">
    <MeetupsLogo />
    <MeetupsNav />
  </header>
</template>

<style scoped>
.header {
  padding: 44px 0 32px;
  background-color: var(--white);
}
</style>
