<template>
  <div class="bg-gradient-to-l from-gray-900 to-slate-950 min-h-screen">
    <div class="bg-gradient-to-l from-gray-900 to-slate-950 min-h-screen text-white">
      <NavBar @show-auth-form="showAuthForm"/>
      <el-dialog v-model="registerForm" class="my-dialog" :key="registerForm ? 'open' : 'closed'">
        <RegisterForm @show-auth-form="showAuthForm" />
      </el-dialog>
      <el-dialog v-model="loginForm" class="my-dialog" :key="loginForm ? 'open' : 'closed'">
        <LoginForm @show-auth-form="showAuthForm" />
      </el-dialog>
      <main class="md:pt-27 pt-23">
        <slot />
      </main>
    </div>
    <FooterApp />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElDialog } from 'element-plus'
import { eventBus } from '@/utils/eventBus'
const registerForm = ref(false)
const loginForm = ref(false)

const showAuthForm = (form = 'login') => {
  if (form === 'close') {
    loginForm.value = false
    registerForm.value = false
  } else if (form === 'register') {
    loginForm.value = false
    registerForm.value = true
  } else if (form === 'login') {
    registerForm.value = false
    loginForm.value = true
  }
}

onMounted(() => {
  eventBus.on('show-auth-form', showAuthForm)
})

onBeforeUnmount(() => {
  eventBus.off('show-auth-form', showAuthForm)
})
</script>

<style scoped>

</style>