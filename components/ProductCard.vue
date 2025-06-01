<template>
  <div class="flex items-center bg-gray-900 rounded-xl p-5 shadow-sm space-x-4">
    <img :src="image" alt="Producto" class="md:w-30 md:h-auto w-15 h-auto rounded-sm" />
    <div class="flex-1">
      <a
        :href="url" 
        :title="name"
        class="md:text-xl font-semibold text-emerald-400 hover:text-emerald-600 active:text-emerald-700"
        target="_blank"
      >
        {{ truncatedTitle }}
      </a>
      <p>{{ $t('shop') }}: {{ shop }}</p>
      <p class="text-white text-lg">{{ $t('price') }}: {{ price }}€</p>
    </div>
    <div class="flex flex-col gap-3">
      <button
        v-if="favourite || route.name === 'account'"
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
import { eventBus } from '@/utils/eventBus'
import { useRoute, useRouter } from 'vue-router'


const { authUser } = useAuth()
const route = useRoute()
const router = useRouter()
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
    const urlF = `${getApiUrl()}/crear_favorito/?titulo=${encodeURIComponent(props.name)}&precio=${encodeURIComponent(props.price)}&imagen_url=${encodeURIComponent(props.image)}&url=${encodeURIComponent(props.url)}&id_usuario=${encodeURIComponent(authUser.value.id)}&tienda=${encodeURIComponent(props.shop)}`

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
    console.log('NO esta logueado')
    eventBus.emit('show-auth-form', 'login')
  }
}

const deleteFavourite = async () => {
  loading.value = true
  const urlF = `${getApiUrl()}/eliminar_favorito/?ide=${encodeURIComponent(authUser.value.id)}&titulo=${encodeURIComponent(props.name)}`

  const response = await fetch(urlF, { method: 'POST' })
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