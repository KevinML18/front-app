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
    <button class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 cursor-pointer rounded-md py-1 mt-auto">
      {{ $t('set_alert') }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    product: {
        type: Object
    }
  },
  computed: {
    truncatedTitle() {
      const maxLength = 39
      return this.product.titulo.length > maxLength
        ? this.product.titulo.slice(0, maxLength) + '…'
        : this.product.titulo
    }
  }
})
</script>

<style scoped>

</style>