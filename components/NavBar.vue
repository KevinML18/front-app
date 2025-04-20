<template>
    <div class="flex flex-row justify-between p-5">
        <nuxt-link to="/">
            <img src="public/logo.png" class="w-13 h-auto">
        </nuxt-link>
        <div>
            <input
                type="text"
                v-model="producto"
                class="bg-gray-900 p-2 rounded-xl"
                :placeholder="$t('search_message')"
            >
            <button @click="buscar" class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 p-2 rounded-xl cursor-pointer ml-2">
                {{ $t('search') }}
            </button>
        </div>
        <!-- Selector de idioma -->
        <div class="flex items-center gap-3 px-3 py-2 rounded-lg w-fit">
            <img :src="getFlag(idiomaActual)" :alt="idiomaActual" class="w-8 h-auto">
            <select @change="changeLanguage" class="text-sm p-1 rounded-md cursor-pointer">
                <option
                    v-for="locale in locales"
                    :value="locale.code"
                    class="text-black"
                >
                    {{ locale.code.toUpperCase() }}
                </option>
            </select>
        </div>
        <!-- Mostrar formulario auth -->
        <button @click="handleForm"class="cursor-pointer hover:text-slate-300 active:text-slate-400">
            {{ $t('register') }} / {{ $t('login') }}
        </button>
    </div>
    <RegisterForm v-if="registerForm" @changeAuth="changeAuth"/>
    <LoginForm v-if="loginForm" @changeAuth="changeAuth"/>
</template>

<script setup>
import { useRouter } from 'vue-router'

const { locales, setLocale } = useI18n()

const router = useRouter()
const producto = ref('')
const registerForm = ref(false)
const loginForm = ref(false)
const idiomaActual = ref('es') // Guardar en pinia persistence

// Función para recibir y producto y redirigir
const buscar = () => {
    router.push(`/resultados?producto=${encodeURIComponent(producto.value)}`)
}

// Mostrar / ocultar formulario
const handleForm = () => {
    if (registerForm.value === false) {
        if (loginForm.value === false) {
            registerForm.value = true
        } else {
            loginForm.value = false
        }
    } else {
        registerForm.value = false
    }
}

// Función pasada al hijo para alternar formularios
const changeAuth = (form) => {
    if (form === 'close') {
        registerForm.value = false
        loginForm.value = false
    } else if (form === 'login') {
        registerForm.value = false
        loginForm.value = true
    } else {
        registerForm.value = true
        loginForm.value = false
    }
}

const getFlag = (code) => {
    return code === 'es'
        ? '/flags/spain.svg'
        : '/flags/united kingdom.svg'
}

const changeLanguage = (event) => {
    idiomaActual.value = event.target.value
    setLocale(idiomaActual.value)
}
</script>

<style scoped>
</style>