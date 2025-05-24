<template>
    <div
      class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-l from-gray-900/70 to-slate-950/70"
      :style="navbarStyle"
    >
        <div class="flex flex-row justify-between p-5">
            <!-- Contenido actual del NavBar -->
            <nuxt-link to="/">
            <img src="/logo.png" class="w-10 h-auto" />
            </nuxt-link>
    
            <!-- Buscador -->
            <div class="flex items-center gap-2">
                <input
                    ref="inputBusqueda"
                    type="text"
                    v-model="producto"
                    class="bg-gray-900 p-2 rounded-xl text-white"
                    :placeholder="$t('search_message')"
                    @keyup.enter="buscar"
                />
                <button
                    @click="buscar"
                    class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                    <Search class="w-5 h-5 text-white" />
                </button>
            </div>

    
            <!-- Selector de idioma -->
            <div class=" items-center gap-3 px-3 py-2 rounded-lg w-fit md:flex">
                <img :src="getFlag(idiomaActual)" :alt="idiomaActual" class="w-8 hidden md:block h-auto" />
                <select @change="changeLanguage" class="text-sm p-1 hidden md:block rounded-md cursor-pointer" v-model="idiomaActual">
                    <option
                    v-for="locale in locales"
                    :value="locale.code"
                    class="text-black"
                    >
                    {{ locale.code.toUpperCase() }}
                    </option>
                </select>
                <button @click="$emit('show-auth-form')" class="cursor-pointer hover:text-slate-300 active:text-slate-400">
                    {{ $t('register') }} / {{ $t('login') }}
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next';

const { locales, setLocale, locale } = useI18n()
const router = useRouter()

const producto = ref('')
const idiomaActual = ref(locale.value)
const inputBusqueda = ref(null)

const navbarStyle = ref({ opacity: 1 })
const lastScroll = ref(0)

const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop

    if (scrollTop < lastScroll.value) {
        navbarStyle.value = { opacity: 1 }
    } else {
        const opacity = 1 - Math.min(scrollTop / 230, 1)
        navbarStyle.value = { opacity }
    }

    lastScroll.value = scrollTop
}

const buscar = (event) => {
    if(producto.value.trim() === '') return
    event.preventDefault()
    router.push(`/resultados?producto=${encodeURIComponent(producto.value)}`)
    inputBusqueda.value?.blur()
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

onMounted(() => {
    lastScroll.value = window.scrollY
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>


<style scoped>
.fixed {
    transition: opacity 0.3s ease-out;
}
</style>
