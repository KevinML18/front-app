<template>
  <div
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-l from-gray-900/70 to-slate-950/70"
    :style="navbarStyle"
  >
    <div class="flex flex-row justify-between p-5">
      <!-- Logo BuyPilot -->
      <nuxt-link to="/">
        <img
          src="/logo.png"
          class="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem]"
          alt="BuyPilot Logo"
        />  
      </nuxt-link>
      <!-- Buscador -->
      <div class="flex items-center gap-2">
        <input
          ref="inputBusqueda"
          type="text"
          v-model="producto"
          class="bg-gray-900 p-2 rounded-xl text-white md:w-120"
          :placeholder="$t('search_message')"
          @keyup.enter="buscar"
        />
        <button
          @click="buscar"
          class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          <Search class="w-4 h-4 text-white" />
        </button>
      </div>
      <!-- Usuario / Preferencias -->
      <div class="flex gap-5 md:mr-5">
        <!-- Idioma -->
        <div>
          <el-dropdown 
            trigger="click" 
            @command="changeLanguage"
            popper-class="dropdown-custom"
          >
            <div class="flex items-center cursor-pointer">
              <img
                :src="getFlag(idiomaActual)"
                :alt="idiomaActual"
                class="hidden md:inline-block w-10 min-w-[2.5rem] h-auto"
              />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="locale in locales"
                  :key="locale.code"
                  :command="locale.code"
                >
                  {{ locale.code.toUpperCase() }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- Usuario logueado -->
        <div class="cursor-pointer flex flex-wrap items-center" v-if="tieneCookie">
          <el-dropdown trigger="click" popper-class="dropdown-custom">
            <img
              :class="authUser.foto !== 'null' ? 'w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full' : 'w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] bg-cyan-50 rounded-full'"
              :src="authUser.foto !== 'null' ? authUser.foto : '/default_pic.png'"
              alt="profile picture"
            />
            <template #dropdown>
              <el-dropdown-menu>
                <nuxt-link to="account">
                  <el-dropdown-item>
                    {{ $t('profile') }}
                  </el-dropdown-item>
                </nuxt-link>
                <el-dropdown-item @click="logoutUser">{{ $t('logout') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- Usuario no logueado -->
        <div v-else>
          <ElButton @click="$emit('show-auth-form')" class="btn-custom">
            {{ $t('access') }}
          </ElButton>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton } from 'element-plus';
import { useAuth } from '~/composables/auth/useAuth'
import { useCookie } from '#app'

const { authUser, logout } = useAuth()
const { locales, setLocale, locale, t } = useI18n()
const router = useRouter()

const producto = ref('')
const idiomaActual = ref(locale.value)
const inputBusqueda = ref(null)
const navbarStyle = ref({ opacity: 1 })
const lastScroll = ref(0)
const userCookie = useCookie('auth_user')

const tieneCookie = computed(() => !!userCookie.value)

const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  if (scrollTop < lastScroll.value) {
    navbarStyle.value = { opacity: 1 }
  } else {
    const opacity = 1 - Math.min(scrollTop / 100, 1)
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

const changeLanguage = (code) => {
  idiomaActual.value = code
  setLocale(code)
}


onMounted(async () => {
  lastScroll.value = window.scrollY
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const logoutUser = () => {
  logout()
  router.push('/')
}
</script>


<style scoped>
.fixed {
  transition: opacity 0.3s ease-out;
}
</style>
