<template>
  <div class="flex flex-col sm:flex-row items-center bg-gray-900 rounded-xl p-3 sm:p-5 shadow-sm space-y-4 sm:space-y-0 sm:space-x-4">
  <div class="w-24 h-24 sm:w-40 sm:h-40 flex items-center justify-center overflow-hidden">
    <img
      :src="shop !== 'Fnac' ? image : 'https://1000marcas.net/wp-content/uploads/2021/06/Fnac-Logo-1985.jpg'"
      alt="Producto"
      class="object-contain w-full h-full"
    />
  </div>
  <div class="flex-1 text-center sm:text-left space-y-1">
    <a
      :href="url" 
      :title="name"
      class="text-base sm:text-xl font-semibold text-emerald-400 hover:text-emerald-600 active:text-emerald-700 block"
      target="_blank"
    >
      {{ truncatedTitle }}
    </a>
    <p class="text-white text-sm sm:text-base">{{ $t('shop') }}: {{ shop }}</p>
    <p class="text-white text-lg">{{ $t('price') }}: {{ price }}€</p>
  </div>
  <div class="flex flex-row sm:flex-col gap-2 sm:gap-3 mt-2 sm:mt-0">
    <button
      v-if="favourite || route.name === 'account'"
      class="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-lg cursor-pointer w-full"
      @click="deleteFavourite"
    >
      <DotLottieVue
        v-if="loading"
        src="animations/loading2.lottie"
        autoplay
        loop
        class="w-27 h-6"
      />
      <span v-else>{{ $t('delete_favourite') }}</span>
    </button>
    <button
      v-else
      class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-xs sm:text-base font-medium px-3 py-2 rounded-lg cursor-pointer w-full"
      @click="addFavourite"
    >
      <DotLottieVue
        v-if="loading"
        src="animations/loading2.lottie"
        autoplay
        loop
        class="w-27 h-6"
      />
      <span v-else>{{ $t('set_alert') }}</span>
    </button>
  </div>
</div>

</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { useAuth } from '~/composables/auth/useAuth'
import { eventBus } from '@/utils/eventBus'
import { useRoute, useRouter } from 'vue-router'

const { authUser } = useAuth()
const route = useRoute()
const { t } = useI18n()

const emit = defineEmits(['delete-favourite'])
const props = defineProps({
    name: {
      type: String
    },
    price: {
      type: Number
    },
    url: {
      type: String
    },
    shop: {
      type: String
    },
    image: {
      type: String
    }
})

const favourite = ref(false)
const loading = ref(false)

const truncatedTitle = computed(() => {
  const maxLength = 150
  return props.name.length > maxLength
    ? props.name.slice(0, maxLength) + '…'
    : props.name
})

const addFavourite = async () => {
  if(authUser.value) {
    loading.value = true
    const urlF = `${getApiUrl()}/api/v1/favoritos/crear?titulo=${encodeURIComponent(props.name)}&precio=${encodeURIComponent(props.price)}&imagen_url=${encodeURIComponent(props.image)}&url=${encodeURIComponent(props.url)}&id_usuario=${encodeURIComponent(authUser.value.id)}&tienda=${encodeURIComponent(props.shop)}`

    const response = await fetch(urlF, { method: 'POST' })

    const data = await response.json()

    if ("error" in data) {
      $showError(data.msg)
    } else {
      favourite.value = true
      $showSuccess(t('product_added_to_favourites'))
    }
    loading.value = false
  } else {
    eventBus.emit('show-auth-form', 'login')
  }
}

const deleteFavourite = async () => {
  loading.value = true
  const urlF = `${getApiUrl()}/api/v1/favoritos/usuario/${encodeURIComponent(authUser.value.id)}?titulo=${encodeURIComponent(props.name)}`

  const response = await fetch(urlF, { method: 'DELETE' })
  const data = await response.json()

  if ("error" in data) {
    $showError(data.msg)
  } else {
    favourite.value = false
    emit('delete-favourite', props.url)
    $showSuccess(t('product_deleted_from_favourites'))
  }
  loading.value = false
}
</script>

<style scoped>

</style>