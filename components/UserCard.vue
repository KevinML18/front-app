<template>
  <div class="flex items-center bg-gray-900 rounded-xl p-5 shadow-sm space-x-4">
    <img :src="pic" :alt="user.username" class="w-15 h-15 md:w-30 md:h-30 rounded-full">
    <div class="flex flex-col justify-between gap-2 ml-2">
      <nuxt-link
        :to="`${user.username}`"
        class="md:text-xl font-semibold text-emerald-400 hover:text-emerald-600 active:text-emerald-700"  
      >
        {{ user.username }}
      </nuxt-link>
      <div class="flex gap-5">
        <span>{{ $t('following') }}: {{ user.seguidores }}</span>
        <span>{{ $t('followers') }}: {{ user.seguidos }}</span>
        <span>{{ $t('posts') }}: {{ user.publicaciones }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      router: useRouter(),
      pic: 'https://estaticos-cdn.prensaiberica.es/clip/227de772-25cf-41d5-87c0-fd76d8078c6f_16-9-discover-aspect-ratio_default_0.jpg'
    }
  }
})
</script>

<style scoped>

</style>