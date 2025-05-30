<template>
  <div class="flex items-center bg-gray-900 rounded-xl p-5 shadow-sm space-x-4">
    <img :src="image" alt="Producto" class="md:w-30 md:h-auto w-15 h-auto rounded-sm" />
    <div class="flex-1">
      <a
        :href="url" 
        class="md:text-xl font-semibold text-emerald-400 hover:text-emerald-600 active:text-emerald-700"
        target="_blank"
      >
        {{ name }}
      </a>
      <p>{{ $t('shop') }}: {{ shop }}</p>
      <p class="text-white text-lg">{{ $t('price') }}: {{ price }}€</p>
    </div>
    <div class="flex flex-col gap-3">
      <button
        v-if="favourite"
        class="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium px-4 py-2 rounded-lg cursor-pointer"
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
        class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg cursor-pointer"
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

const router = useRoute()
const { authUser } = useAuth()

const { t } = useI18n()
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

const addFavourite = async () => {
  if(authUser) {
    loading.value = true
    const urlF = `${getApiUrl()}/crear_favorito/?titulo=${encodeURIComponent(props.name)}&precio=${encodeURIComponent(props.price)}&imagen_url=${encodeURIComponent(props.image)}&url=${encodeURIComponent(props.url)}&id_usuario=${encodeURIComponent(ide)}&tienda=${encodeURIComponent(props.shop)}`

    const response = await fetch(urlF, { method: 'POST' })

    const data = await response.json()

    if ("error" in data) {
      $showError(data.msg)
    } else {
      favourite.value = true
      $showSuccess(t('product_added_to_favourites'))
    }
    loading.value = false
  }
}

const deleteFavourite = async () => {
  loading.value = true
  const ide = localStorage.getItem('id_user')
  const urlF = `${getApiUrl()}/eliminar_favorito/?ide=${encodeURIComponent(ide)}&titulo=${encodeURIComponent(props.name)}`

  const response = await fetch(urlF, { method: 'POST' })
  const data = await response.json()

  if ("error" in data) {
    $showError(data.msg)
  } else {
    favourite.value = false
    $showSuccess(t('product_deleted_from_favourites'))
  }
  loading.value = false
}
</script>

<style scoped>

</style>