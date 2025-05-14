<template>
  <div>
    <el-tabs v-model="tabActive" @tab-change="changeTab" stretch="false" class="">
      <el-tab-pane :label="$t('most_popular')" name="tab-1">
        <div class="flex flex-col gap-5 p-5 justify-center">
          <PostCard
            v-for="item in originalPosts" 
            :key="item.user"
            :post="item"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('most_recent')" name="tab-2">
        <div class="flex flex-col gap-5 p-5 justify-center">
          <PostCard
            v-for="item in originalPosts" 
            :key="item.user"
            :post="item"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <nuxt-link
    to="/"
    class="fixed bottom-5 right-5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg cursor-pointer shadow-lg z-50"  
  >
    {{ $t('buypilot') }}
  </nuxt-link>
</template>

<script>
import { defineComponent } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  components: {
    ElTabs, ElTabPane
  },
  data() {
    return {
      tabActive: 'tab-1',
      originalPosts: [],
      popularPosts: []
    }
  },
  mounted() {
    this.originalPosts = this.getPosts()
  },
  methods: {
    getPosts() {
      return [
        {
          "usuario": "K23",
          "titulo": "OnePlus 7 Pro",
          "precio": "23.10",
          "tienda": "Shein",
          "comentarios": [
            "prueba",
            "de",
            "comentarios"
          ],
          "puntuacion": "23",
          "img": "https://static.chollometro.com/threads/raw/YZMLH/1525212_1/re/1024x1024/qt/60/1525212_1.jpg",
          "fecha": "2025/5/11 12:23:55"
        },
        {
          "usuario": "neymarjr",
          "titulo": "nike mercurial",
          "precio": "30.46",
          "tienda": "Nike",
          "comentarios": [
            "prueba",
            "de",
            "comentarios",
            "para",
            "otra"
          ],
          "puntuacion": "30",
          "img": "https://static.chollometro.com/threads/raw/YZMLH/1525212_1/re/1024x1024/qt/60/1525212_1.jpg",
          "fecha": "2025/5/10 23:23:18"
        },
        {
          "usuario": "lolxdmafia",
          "titulo": "santaclaus",
          "precio": "18.10",
          "tienda": "Sprinter",
          "comentarios": [
            "prueba",
            "de",
            "comentarios",
            "para",
            "otra",
            "funcionalidad"
          ],
          "puntuacion": "18",
          "img": "https://static.chollometro.com/threads/raw/YZMLH/1525212_1/re/1024x1024/qt/60/1525212_1.jpg",
          "fecha": "2025/5/5 03:23:23"
        },
        {
          "usuario": "uno",
          "titulo": "nuevo producto",
          "precio": "23.10",
          "tienda": "Can",
          "comentarios": [
            "prueba"
          ],
          "puntuacion": "23",
          "img": "https://static.chollometro.com/threads/raw/YZMLH/1525212_1/re/1024x1024/qt/60/1525212_1.jpg",
          "fecha": "2025/4/5 12:23:55"
        },
        {
          "usuario": "uno",
          "titulo": "nuevo producto",
          "precio": "23.10",
          "tienda": "Can",
          "comentarios": [
            "prueba"
          ],
          "puntuacion": "23",
          "img": "https://static.chollometro.com/threads/raw/YZMLH/1525212_1/re/1024x1024/qt/60/1525212_1.jpg",
          "fecha": "2024/4/5 12:23:55"
        },

      ]
    }
  }
})
</script>

<style scoped>
:deep(.el-tabs__item) {
  color: #10b981;
  padding: 5px;
  font-size: 18px;
}

:deep(.el-tabs__item:hover) {
  color: #059669;
}

:deep(.el-tabs__item:active) {
  color: #047857;
}

:deep(.el-tabs__active-bar) {
  background-color: #10b981;
}

:deep(.el-tabs__nav-wrap) {
  justify-content: center;
}

:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}

:deep(.el-tabs__nav) {
  display: inline-flex;
}
</style>