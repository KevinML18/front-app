<template>
  <div class="mb-20">
    <el-tabs v-model="tabActive" @tab-change="changeTab" stretch="false" class="">
      <el-tab-pane :label="$t('profile')" name="tab-1">
        <AccountForm />
      </el-tab-pane>
      <el-tab-pane :label="$t('my_alerts')" name="tab-2">
        <div
          v-if="favourites.length === 0"
          class="flex items-center justify-center min-h-[650px] w-full"
        >
          <DotLottieVue
            :key="dotLottieKey"
            src="/animations/empty.lottie"
            autoplay
            class="w-80 h-80"
          />
        </div>
        <div
          v-else
          class="w-full p-4 flex flex-col items-center gap-5 mt-5"
        >
          <ProductCard
            v-for="item in favourites"
            :key="item.url"
            :name="item.titulo"
            :price="item.precio"
            :url="item.url"
            :shop="item.tienda"
            :image="item.imagen_url"
            class="item w-[700px] md:w-[900px]"
            @delete-favourite="url => favourites = favourites.filter(p => p.url !== url)"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ElTabs, ElTabPane } from 'element-plus'
import { useAuth } from '~/composables/auth/useAuth'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

definePageMeta({
  middleware: 'auth'
})

const { authUser } = useAuth()

const tabActive = ref('tab-1')
const favourites = ref([])
const dotLottieKey = ref(0)

onMounted(() => {
  const savedTab = localStorage.getItem('activeTab')
  if (savedTab) {
    tabActive.value = savedTab
    localStorage.removeItem('activeTab')
  }
  getFavoritos()
})

onUnmounted(() => {
  localStorage.setItem('activeTab', 'tab-1')
})

watch(tabActive, (newValue) => {
  localStorage.setItem('activeTab', newValue)
})

watch([tabActive, favourites], () => {
  dotLottieKey.value++
})

const getFavoritos = async () => {
  const url = `${getApiUrl()}/api/v1/favoritos/usuario/${encodeURIComponent(parseInt(authUser.value.id))}`
  const response = await fetch(url, { method: 'GET'} )
  const data = await response.json()
  favourites.value = data
}
</script>

<style scoped>
@keyframes show {
  from {
    opacity: 0;
    transform: scale(0.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.item {
  animation-name: show;
  animation-duration: 0.18s;
  animation-fill-mode: both;
  animation-timing-function: ease-out;
}

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