<script setup>
import { ref } from 'vue'

const message = ref('')

function toast(text) {
  message.value = text
  setTimeout(() => {
    message.value = ''
  }, 2000)
}

defineExpose({ toast })
</script>

<template>
  <div class="toaster">
    <div v-if="message" class="toast toast_success">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<style scoped>
.toaster {
  /* Changed to make an example */
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toaster {
    bottom: 72px;
    right: 112px;
  }
}
</style>
