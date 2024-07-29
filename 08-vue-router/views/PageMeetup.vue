<script setup>
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { fetchMeetup } from '../api.ts'

const props = defineProps({
  meetupId: {
    type: Number,
    required: true,
  },
})

const route = useRoute()
// const meetupId = computed(() => route.params.meetupId)

const meetup = ref(null)

watchEffect(async () => {
  try {
    meetup.value = await fetchMeetup(props.meetupId)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="page-meetup">
    <!-- meetup-cover -->

    <UiContainer>
      <div class="meetup">
        <div class="meetup__content">
          <h1>Meetup Page {{ meetupId }}</h1>
          <RouterLink :to="{ name: 'meetup', params: { meetupId: meetupId + 1 } }">
            Перейти к следующему митапу
          </RouterLink>
          <template v-if="meetup">
            <h2>{{ meetup.title }}</h2>
            <p>{{ meetup.description }}</p>
          </template>
          <UiAlert v-else>Загрузка...</UiAlert>
        </div>
        <div class="meetup__aside">
          <!-- ... -->
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<style scoped>
.page-meetup {
  background-color: var(--white);
}

.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__content {
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
