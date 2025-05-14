<template>
  <div>
    <el-tabs v-model="tabActive" @tab-change="changeTab" stretch="false" class="">
      <el-tab-pane :label="$t('profile')" name="tab-1">
        <div class="flex flex-col items-center justify-center">
          <img :src="pic" alt="profilePic" class="w-30 h-30 rounded-full mx-auto">
          <span class="text-2xl text-emerald-500 mt-2">Bad Bunny</span>
          <div class="flex flex-row">
            <button class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 cursor-pointer rounded-md p-0.5 ml-2 mt-5">
              {{ $t('change') }}
            </button>
            <button class="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 cursor-pointer rounded-md p-0.5 ml-2 mt-5">
              {{ $t('delete') }}
            </button>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <form class="flex flex-col p-10 rounded-xl gap-3 w-full max-w-md">
            <label>
              {{ $t('your_name') }}
            </label>
            <input
              type="text"
              v-model="name"
              class="bg-gray-900 p-1.5 rounded-md"
              placeholder="Benito Martinez Ocasio"
            >
            <label class="mt-3">
              {{ $t('your_username') }}
            </label>
            <input
              type="text"
              v-model="username"
              class="bg-gray-900 p-1.5 rounded-md"
              placeholder="Badbo"
            >
            
            <label class="mt-3">
              {{ $t('your_email') }}
            </label>
            <input
              type="email"
              v-model="email"
              class="bg-gray-900 p-1.5 rounded-md"
              placeholder="bad@sanbenito"  
            >

            <label class="mt-3">
              {{ $t('change_password') }}
            </label>
            <input
              type="text"
              v-model="password"
              class="bg-gray-900 p-1.5 rounded-md"
            >
            <button
              class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 cursor-pointer rounded-md p-0.5 ml-2 mt-2"
              @click="validateForm"  
            >
              {{ $t('save_changes') }}
            </button>
            <button class="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 cursor-pointer rounded-md p-0.5 ml-2 mt-2">
              {{ $t('delete_account') }}
            </button>
          </form>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('my_alerts')" name="tab-2">
        <div class="w-full p-4 flex flex-col items-center gap-5">
          <ProductCard
            v-for="item in favoriteProducts"
            :key="item.url"
            :name="item.titulo"
            :price="item.precio"
            :url="item.url"
            :shop="item.tienda"
            :image="item.imagen_url"
            class="item w-[700px] md:w-[900px]"
          />
        </div>
      </el-tab-pane>

      <!-- <el-tab-pane :label="$t('following')" name="tab-3">
        <div class="w-full p-4 flex flex-col items-center gap-5">
          <UserCard
            v-for="user in followers" 
            :key="user.username"
            :user="user"
            class="item w-[600px] md:w-[700px]"
          />
        </div>
      </el-tab-pane> -->
      <el-tab-pane :label="$t('posts')" name="tab-4">
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  components: { ElTabs, ElTabPane },
  data() {
    return {
      tabActive: 'tab-1',
      name: '',
      username: '',
      email: '',
      password: '',
      favoriteProducts: [],
      followers: [],
      pic: 'https://estaticos-cdn.prensaiberica.es/clip/227de772-25cf-41d5-87c0-fd76d8078c6f_16-9-discover-aspect-ratio_default_0.jpg'
    }
  },
  mounted() {
    this.favoriteProducts = this.getFavoriteProducts()
    this.followers = this.getFollowers()
  },
  methods: {
    changeTab(tab, event) {
      console.log(tab, event)
    },
    validateForm() {
      
    },
    getFavoriteProducts() {
      return [
        {
          "titulo": "Apple iPhone 16 de 256 GB: Smartphone 5G con Control de Cámara, Chip A18 y un subidón en autonomía. Compatible con los AirPods; Azul Ultramar",
          "precio": "969.00",
          "tienda": "Amazon",
          "imagen_url": "https://m.media-amazon.com/images/I/712Pyq1hPfL._AC_SX679_.jpg",
          "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MToxNzUyMDgwNzg3OTQ5NDY4OjE3NDUzNDU2MjI6c3BfYXRmOjMwMDMzMjI2MTc5OTMzMjo6MDo6&url=%2FApple-iPhone-256-Smartphone-autonom%25C3%25ADa%2Fdp%2FB0DGJ7Q246%2Fref%3Dsr_1_1_sspa%3Fdib%3DeyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ%26dib_tag%3Dse%26keywords%3Diphone%2B16%26qid%3D1745345622%26sr%3D8-1-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1"
        },
        {
          "titulo": "Apple iPhone 16e de 128 GB: Diseñado para Apple Intelligence, Chip A18, autonomía a raudales, cámara Fusion de 48 Mpx, Pantalla Super Retina XDR de 6,1 Pulgadas — Blanco",
          "precio": "669.90",
          "tienda": "Amazon",
          "imagen_url": "https://m.media-amazon.com/images/I/610vqacJO2L._AC_SX679_.jpg",
          "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MToxNzUyMDgwNzg3OTQ5NDY4OjE3NDUzNDU2MjI6c3BfYXRmOjMwMDQ4NTQ0NzQ4MzczMjo6MDo6&url=%2FApple-iPhone-16e-128-Intelligence%2Fdp%2FB0DXRKKF8N%2Fref%3Dsr_1_2_sspa%3Fdib%3DeyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ%26dib_tag%3Dse%26keywords%3Diphone%2B16%26qid%3D1745345622%26sr%3D8-2-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1"
        },
        {
          "titulo": "Apple iPhone 15 (128 GB) - Verde",
          "precio": "729.00",
          "tienda": "Amazon",
          "imagen_url": "https://m.media-amazon.com/images/I/71oGc0hDt7L._AC_SX679_.jpg",
          "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MToxNzUyMDgwNzg3OTQ5NDY4OjE3NDUzNDU2MjI6c3BfYXRmOjMwMDA1NDUyODEwMDczMjo6MDo6&url=%2FApple-iPhone-15-128-GB%2Fdp%2FB0CHX11FBS%2Fref%3Dsr_1_3_sspa%3Fdib%3DeyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ%26dib_tag%3Dse%26keywords%3Diphone%2B16%26qid%3D1745345622%26sr%3D8-3-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1"
        },
        {
          "titulo": "Apple iPhone 15 (128 GB) - Verde",
          "precio": "729.00",
          "tienda": "Amazon",
          "imagen_url": "https://m.media-amazon.com/images/I/71oGc0hDt7L._AC_SX679_.jpg",
          "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MToxNzUyMDgwNzg3OTQ5NDY4OjE3NDUzNDU2MjI6c3BfYXRmOjMwMDA1NDUyODEwMDczMjo6MDo6&url=%2FApple-iPhone-15-128-GB%2Fdp%2FB0CHX11FBS%2Fref%3Dsr_1_3_sspa%3Fdib%3DeyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ%26dib_tag%3Dse%26keywords%3Diphone%2B16%26qid%3D1745345622%26sr%3D8-3-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1"
        },
        {
          "titulo": "Apple iPhone 15 (128 GB) - Verde",
          "precio": "729.00",
          "tienda": "Amazon",
          "imagen_url": "https://m.media-amazon.com/images/I/71oGc0hDt7L._AC_SX679_.jpg",
          "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MToxNzUyMDgwNzg3OTQ5NDY4OjE3NDUzNDU2MjI6c3BfYXRmOjMwMDA1NDUyODEwMDczMjo6MDo6&url=%2FApple-iPhone-15-128-GB%2Fdp%2FB0CHX11FBS%2Fref%3Dsr_1_3_sspa%3Fdib%3DeyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ%26dib_tag%3Dse%26keywords%3Diphone%2B16%26qid%3D1745345622%26sr%3D8-3-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1"
        }
      ]
    },
    getFollowers() {
      return [
        {
          username: 'romeosantos',
          seguidores: '23',
          seguidos: '18',
          publicaciones: '5'
        },
        {
          username: 'anueldoblea',
          seguidores: '18',
          seguidos: '23',
          publicaciones: '10'
        },
      ]
    }
  }
})
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