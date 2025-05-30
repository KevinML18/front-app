<template>
  <div class="flex flex-col md:w-60 md:h-[350px] h-[320px] w-39 bg-gray-900 md:p-4 p-2 rounded-lg">
    <div class="w-full h-32 md:h-40 p-3 flex items-center justify-center rounded-sm overflow-hidden">
      <img
        :src="product.imagen_url"
        :alt="product.titulo"
        class="w-full h-full object-contain rounded-sm"
      />
    </div>
    <div class="flex flex-col mt-3 flex-grow overflow-hidden">
      <a
        :href="product.url"
        target="_blank"
        class="text-base font-semibold text-emerald-400 hover:text-emerald-600 active:text-emerald-700 line-clamp-2"
      >
        {{ truncatedTitle }}
      </a>
      <p class="text-lg mt-1">{{ product.precio }} €</p>
    </div>
    <button
      v-if="favourite"
      @click="deleteFavourite"
      class="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium p-1 rounded-lg cursor-pointer"
    >
      {{ $t('delete_favourite') }}
    </button>
    <ElButton
      v-else
      @click="addFavourite"
      class="btn-custom"
    >
      {{ $t('set_alert') }}
    </ElButton>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'
import { useAuth } from '~/composables/auth/useAuth'
import { eventBus } from '@/utils/eventBus'
import { ElButton } from 'element-plus'

const { authUser } = useAuth()
const { t } = useI18n()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const favourite = ref(false)
const loading = ref(false)

const truncatedTitle = computed(() => {
  const maxLength = 39
  return props.product.titulo.length > maxLength
    ? props.product.titulo.slice(0, maxLength) + '…'
    : props.product.titulo
})

onMounted(() => {
  // console.log(props.product)
})

const addFavourite = async () => {
  console.log('EMPIEZO')
  if(authUser.value) {
    loading.value = true
    const urlF = `${getApiUrl()}/crear_favorito/?titulo=${encodeURIComponent(props.product.titulo)}&precio=${encodeURIComponent(props.product.precio)}&imagen_url=${encodeURIComponent(props.product.imagen_url)}&url=${encodeURIComponent(props.product.url)}&id_usuario=${encodeURIComponent(authUser.value.id)}&tienda=${encodeURIComponent(props.product.tienda)}`
    console.log('ENVIANDO: ', urlF)

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
  const urlF = `${getApiUrl()}/eliminar_favorito/?ide=${encodeURIComponent(authUser.value.id)}&titulo=${encodeURIComponent(props.product.titulo)}`

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