<script setup>
import { ref } from 'vue'
import { UiContainer } from '@shgk/vue-course-ui'
import UiDivider from './UiDivider.vue'
import UiAccordion from './UiAccordion.vue'
import UiAccordion2 from './UiAccordion2.vue'
import UiAccordionItem2 from './UiAccordionItem2.vue'

const options = [
  {
    title: 'Cat',
    value: 'cat',
    text: 'The cat (Felis catus) is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family. A cat can either be a house cat, a farm cat or a feral cat; the latter ranges freely and avoids human contact. Domestic cats are valued by humans for companionship and their ability to kill rodents. About 60 cat breeds are recognized by various cat registries.',
  },
  {
    title: 'Dog',
    value: 'dog',
    text: "The dog or domestic dog (Canis familiaris or Canis lupus familiaris) is a domesticated descendant of the wolf, characterized by an upturning tail. The dog is derived from an ancient, extinct wolf, and the modern wolf is the dog's nearest living relative. The dog was the first species to be domesticated, by hunter–gatherers over 15,000 years ago, before the development of agriculture. Due to their long association with humans, dogs have expanded to a large number of domestic individuals] and gained the ability to thrive on a starch-rich diet that would be inadequate for other canids.]",
  },
  {
    title: 'Ferret',
    value: 'ferret',
    text: 'The ferret (Mustela furo) is a small, domesticated species belonging to the family Mustelidae. The ferret is most likely a domesticated form of the wild European polecat (Mustela putorius), evidenced by their interfertility. Other mustelids include the stoat, badger and mink.',
  },
]

const selected = ref()
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <UiContainer>
        <div class="examples">
          <UiDivider>
            <template #block-1>
              <p>Lorem ipsum 1</p>
            </template>
            <template #block-2>
              <p>Lorem ipsum 2</p>
            </template>
            <template #block-3>
              <p>Lorem ipsum 3</p>
            </template>
          </UiDivider>


          <UiAccordion v-model:selected="selected" :options />

          <UiAccordion2>
            <UiAccordionItem2 v-model:selected="selected" :title="options[0].title" :value="options[0].value">
              {{ options[0].text }}
            </UiAccordionItem2>
            <UiAccordionItem2 v-model:selected="selected" :title="options[1].title" :value="options[1].value">
              {{ options[1].text }}
            </UiAccordionItem2>
            <UiAccordionItem2 v-model:selected="selected" :title="options[2].title" :value="options[2].value">
              {{ options[2].text }}
            </UiAccordionItem2>
          </UiAccordion2>

        </div>
      </UiContainer>
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

.examples {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 40px 0;
}
</style>
