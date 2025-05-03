<template>
    <div class="bg-gradient-to-l from-gray-900 to-slate-950 min-h-screen text-white">
        <NavBar @show-auth-form="showAuthForm"/>
        <RegisterForm v-if="registerForm" @show-auth-form="showAuthForm"/>
        <LoginForm v-if="loginForm" @show-auth-form="showAuthForm"/>
        <main class="pt-30">
            <slot />
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const registerForm = ref(false)
const loginForm = ref(false)

const showAuthForm = (form) => {
    if (form === 'close') {
        registerForm.value = false
        loginForm.value = false
    } else if (form === 'register') {
        loginForm.value = false
        registerForm.value = true
    } else {
        registerForm.value = false
        loginForm.value = true
    }
}
</script>