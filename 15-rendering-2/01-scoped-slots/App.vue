<script setup lang="tsx">
import { type Ref, ref } from 'vue'
import UiListView from './UiListView.vue'
import * as fixtures from './fixtures.ts'
import ItemUser from './ItemUser.vue'
import ItemMeetup from './ItemMeetup.vue'
import UiListViewComponentProp from './UiListViewComponentProp.vue'
import UiListViewItem from './UiListViewItem.vue'
import UiListViewRemoveButton from './UiListViewRemoveButton.vue'
import MeetupsCard from './MeetupsCard.vue'
import UiListViewJSX from './UiListViewJSX.vue'
import type { MeetupDTO, UserDTO } from './types/meetups.types.ts'

const strings = ref(fixtures.strings)
const users: Ref<UserDTO[]> = ref(fixtures.users)
const meetups: Ref<MeetupDTO[]> = ref(fixtures.meetups)

const renderUserItem = ({ item, remove }) => (
  <UiListViewItem>
    <a href={`/users/${item.id}`}>{item.fullname}</a>
    <UiListViewRemoveButton onClick={() => remove()} />
  </UiListViewItem>
)

const renderMeetupItem = ({ item, remove }) => (
  <MeetupsCard meetup={item}>
    {{
      extra: () => <UiListViewRemoveButton class="meetup-card-remove-button" onClick={() => remove()} />,
    }}
  </MeetupsCard>
)
</script>

<template>
  <div class="sample">
    <div>
      <h1>UiListView</h1>
      <UiListView v-model:items="strings" />
    </div>
    <div>
      <h1>UiListView</h1>
      <UiListView v-model:items="users">
        <template #default="{ item, remove }">
          <UiListViewItem>
            <a :href="`/users/${item.id}`">{{ item.fullname }}</a>
            <UiListViewRemoveButton @click="remove" />
          </UiListViewItem>
        </template>
      </UiListView>
    </div>
    <div>
      <h1>UiListView</h1>
      <UiListView v-model:items="meetups" v-slot="{ item, remove }">
        <MeetupsCard :meetup="item">
          <template #extra>
            <UiListViewRemoveButton class="meetup-card-remove-button" @click="remove" />
          </template>
        </MeetupsCard>
      </UiListView>
    </div>
  </div>

  <div class="sample">
    <div>
      <h1>UiListViewComponentProp - default</h1>
      <UiListViewComponentProp v-model:items="strings" />
    </div>
    <div>
      <h1>UiListViewComponentProp - ItemUser</h1>
      <UiListViewComponentProp v-model:items="users" :item-component="ItemUser" />
    </div>
    <div>
      <h1>UiListViewComponentProp - ItemMeetup</h1>
      <UiListViewComponentProp v-model:items="meetups" :item-component="ItemMeetup" />
    </div>
  </div>

  <div class="sample">
    <div>
      <h1>UiListViewJSX - default</h1>
      <UiListViewJSX v-model:items="strings" />
    </div>
    <div>
      <h1>UiListViewJSX - renderUserItem</h1>
      <UiListViewJSX v-model:items="users" :render-item="renderUserItem" />
    </div>
    <div>
      <h1>UiListViewJSX - renderMeetupItem</h1>
      <UiListViewJSX v-model:items="meetups" :render-item="renderMeetupItem" />
    </div>
  </div>
</template>

<style scoped>
.sample {
  display: flex;
  justify-content: space-around;

  & > * {
    flex: 0 1 auto;
  }
}

:deep(.meetup-card-remove-button) {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
