<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

const canvas = ref(null)

const draw = () => {
  const FONT_SIZE = 24
  if (canvas.value) {
    canvas.value.height = FONT_SIZE
    canvas.value.width = 100
    const ctx = canvas.value.getContext('2d')
    if (ctx) {
      ctx.font = `${FONT_SIZE}px sans-serif`
      ctx.textBaseline = 'bottom'
      ctx.fillText(props.text, 0, FONT_SIZE)
    }
  }
}

onMounted(() => {
  draw()
})
</script>

<template>
  <canvas ref="canvas" style="display: block"></canvas>
</template>
