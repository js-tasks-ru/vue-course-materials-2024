<script setup>
import { ref, reactive } from 'vue'
import ListItem from './ListItem.vue'
import CounterButton from './CounterButton.vue'
import CanvasText from './CanvasText.vue'
import SlowListItem from './SlowListItem.vue'
import InputWithoutBinding from './InputWithoutBinding.vue'
import ListItemWithCounterButton from './ListItemWithCounterButton.vue'

const list = reactive([
  { value: 'a' },
  { value: 'b' },
  { value: 'c' },
])

const key = ref('key')

function rotateList() {
  list.push(list.shift())
}
</script>

<template>
  <div class="examples">
    <div class="key-examples">
      <fieldset>
        <legend>No prop watch</legend>
        <ListItem v-for="item in list" :item="item" />
      </fieldset>

      <fieldset>
        <legend>No prop watch deep</legend>
        <ListItemWithCounterButton v-for="item in list" :name="item.value" />
      </fieldset>

      <fieldset>
        <legend>DOM without binding (input without :value)</legend>
        <InputWithoutBinding v-for="item in list" :text="item.value" />
      </fieldset>

      <fieldset>
        <legend>Complex update with DOM API (canvas)</legend>
        <CanvasText v-for="item in list" :text="item.value" />
      </fieldset>

      <fieldset>
        <legend>Slow prop update</legend>
        <SlowListItem v-for="item in list" :item="item" />
      </fieldset>
    </div>

    <hr />

    <button type="button" @click="rotateList">Rotate List</button>

    <hr />

    <div>
      <input v-model="key" />
      <CounterButton />
    </div>
  </div>
</template>

<style scoped>
.examples {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  hr {
    align-self: stretch;
  }
}

.key-examples {
  display: flex;
  gap: 20px;
}
</style>
