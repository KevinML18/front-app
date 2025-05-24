<template>
  <div class="bg-gradient-to-l from-gray-900 to-slate-950 min-h-screen text-white">
    <NavBar @show-auth-form="registerForm = true"/>
    <el-dialog v-model="registerForm" class="my-dialog">
      <RegisterForm @show-auth-form="showAuthForm" />
    </el-dialog>
    <el-dialog v-model="loginForm" class="my-dialog">
      <LoginForm @show-auth-form="showAuthForm" />
    </el-dialog>
    <main class="md:pt-27 pt-23">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElDialog } from 'element-plus'
const registerForm = ref(false)
const loginForm = ref(false)
const act = ref(true)

const showAuthForm = (form) => {
  if (form === 'register') {
    loginForm.value = true
    registerForm.value = false
  } else {
    registerForm.value = true
    loginForm.value = false
  }
}
</script>