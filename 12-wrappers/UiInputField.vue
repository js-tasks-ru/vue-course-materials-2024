<script setup>
import UiInput from './UiInput.vue'
</script>

<template>
  <div class="form-group">
    <label>
      <span class="form-group__label"></span>
      <UiInput />
    </label>
  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group--inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group--inline + .form-group.form-group--inline {
  margin-left: 16px;
}

.form-group__label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
</style>
