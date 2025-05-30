<template>
  <div class="flex flex-col bg-gray-900 p-3 rounded-md">
    <!-- imagen punt, datos -->
    <div class="flex relative w-full">
      <img
        :src="post.img"
        :alt="post.title"
        class="w-30 rounded-sm"
      >

      <!-- datos -->
      <div class="ml-5">
        <!-- punt -->
        <div class="inline-flex items-center border border-gray-500 rounded-2xl px-2 py-1 gap-2">
          <button class="cursor-pointer">
            <Plus class="text-blue-700"/>
          </button>
          <span>{{ post.puntuacion }}</span>
          <button class="cursor-pointer">
            <Minus class="text-rose-600"/>
          </button>
        </div>
        <div>
          <p class="text-xl font-semibold">{{ post.titulo }}</p>
          <p class="text-slate-400">{{ post.tienda }}</p>
          <span class="text-emerald-500 font-medium">{{ post.precio }}€</span>
        </div>
      </div>

      <!-- fecha arriba derecha -->
      <div class="absolute top-0 right-0">
        <span class="text-slate-400">{{ getTime() }}</span>
      </div>
    </div>


    <!-- user coment -->
    <div class="flex justify-between mt-3 items-center">
      <div class="flex items-center gap-2">
        <img
          :src="user.imagen"
          :alt="user.username"
          class="w-7 h-7 rounded-full object-cover"
        >
        <span>{{ user.username }}</span>
      </div>

      <div class="flex items-center gap-1 text-white">
        <MessagesSquare class="w-5 h-5" />
        <span>{{ post.comentarios.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { MessagesSquare, Plus, Minus } from 'lucide-vue-next'

export default defineComponent({
  components: {
    MessagesSquare, Plus, Minus
  },
  props: {
    post: {
      type: Object
    }
  },
  data() {
    return {
      user: {
        username: "canserbero",
        imagen: 'https://estaticos-cdn.prensaiberica.es/clip/227de772-25cf-41d5-87c0-fd76d8078c6f_16-9-discover-aspect-ratio_default_0.jpg'
      }
    }
  },
  mounted() {
    this.getTime()
  },
  methods: {
    getTime() {
      const today = Date.now()
      const postDate = new Date(this.post.fecha)

      const diference = today - postDate.getTime()

      let timeFromNow = diference / 1000

      timeFromNow = timeFromNow / 60
      if (timeFromNow < 60) {
        return this.$t('minutes_ago', Math.floor(timeFromNow))
      }

      timeFromNow = timeFromNow / 60
      if (timeFromNow > 1) {
        if (timeFromNow < 24) {
          return this.$t('hours_ago', Math.floor(timeFromNow))
        }
        timeFromNow = timeFromNow /  24
        if (timeFromNow < 30) {
          return this.$t('days_ago', Math.floor(timeFromNow))
        }
        timeFromNow = timeFromNow / 30
        if (timeFromNow < 12) {
          return this.$t('month_ago', Math.floor(timeFromNow))
        }
        return this.$t('more_than_a_year')
      }
    }
  }
})
</script>

<style scoped>

</style>