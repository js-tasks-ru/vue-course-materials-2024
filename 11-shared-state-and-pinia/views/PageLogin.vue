<script setup>
import { UiFormGroup, UiInput, UiButton } from '@shgk/vue-course-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api.ts'
// import { useAuth } from '../composables/useAuth.ts'
import { useAuthStore } from '../stores/auth.ts'

const email = ref('demo@email')
const password = ref('password')

const { setUser } = useAuthStore()
const router = useRouter()

async function handleSubmit() {
  try {
    const user = await login(email.value, password.value)
    setUser(user)
    await router.push({ name: 'index' })
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
  <div class="page-auth">
    <h2 class="page-auth__title">Вход</h2>

    <form class="form" @submit.prevent="handleSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" />
      </UiFormGroup>

      <UiFormGroup label="Password">
        <UiInput v-model="password" name="password" type="password" placeholder="password" />
      </UiFormGroup>

      <div class="form__buttons">
        <UiButton type="submit" kind="primary">Войти</UiButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.page-auth {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 0;
}

.page-auth__title {
  text-align: center;
}

.form {
  margin: 0;
}

.form__buttons {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  margin-top: 40px;
}

.form__append {
  margin-top: 40px;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
}
</style>
