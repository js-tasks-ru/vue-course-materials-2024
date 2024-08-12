<script setup>
import { ref } from 'vue'
import MeetupsHeader from './components/MeetupsHeader.vue'
import MeetupsFooter from './components/MeetupsFooter.vue'
import PageMeetups from './components/PageMeetups.vue'
import { useWindowSize } from './composables/useWindowSize.ts'
import { isMobile } from './utils/isMobile.ts'
import { useElementSize } from './composables/useElementSize.ts'
import { useThrottledRef } from './composables/useThrottledRef.ts'

const mainElement = ref(null)

const { width: windowWidth, height: windowHeight } = useWindowSize()
const { width: mainWidth, height: mainHeight } = useElementSize(mainElement)
const throttledWidth = useThrottledRef(windowWidth, 2000)
const throttledHeight = useThrottledRef(windowHeight, 2000)
</script>

<template>
  <div class="wrapper">
    <MeetupsHeader />
    <main ref="mainElement" class="main">
      <p>
        Is it mobile? {{ isMobile }}
      </p>
      <p>
        Window size is: {{ windowWidth }}x{{ windowHeight }}
      </p>
      <p>
        .main size is: {{ mainWidth }}x{{ mainHeight }}
      </p>
      <p>
        Throttled window size is: {{ throttledWidth }}x{{ throttledHeight }}
      </p>

      <PageMeetups />
    </main>
    <MeetupsFooter />
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
