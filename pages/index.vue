<template>
  <div
    v-if="loading"
    class="absolute inset-0 bg-slate-950/10 flex flex-col items-center justify-center z-10"
  >
    <DotLottieVue
      src="animations/loading.lottie"
      autoplay
      loop
      class="w-32 h-32"
    />
    <h3 class="mt-4 text-xl font-bold text-white">
      {{ $t('loading') }}
    </h3>
  </div>
  <div v-else class="popular">
    <h1 class="text-2xl font-bold mb-2 ml-7">
      {{ $t('popular_search') }}
    </h1>
    <div
      v-if="!popularProducts || popularProducts.length === 0"
      class="absolute inset-0 bg-slate-950/10 flex flex-col items-center justify-center z-10"
    >
      <DotLottieVue
        src="/animations/empty.lottie"
        autoplay
        class="w-40 h-40"
      />
      <h2 class="text-lg md:text-xl text-white font-semibold">
        {{ $t('we_have_some_problems') }}
      </h2>
      <p class="text-sm md:text-base text-gray-300 mt-2 max-w-md">
        {{ $t('try_again_soon') }}
      </p>
    </div>
    <div
      v-else
      class="p-5 flex gap-10 flex-wrap justify-center"
    >
      <ProductCardPreview
        v-for="item in popularProducts"
        :key="item.url"
        :product="item"
        class="product"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

export default defineComponent({
  data() {
    return {
      popularProducts: [],
      discountedProducts: [],
      loading: true
    }
  },
  components: { DotLottieVue },
  mounted() {
    this.getPopularProducts()
  },
  methods: {
    async getPopularProducts() {
      this.loading = true
      try {
        const url = `${getApiUrl()}/api/v1/index/portada`
        const response = await fetch(url, { method: 'GET' })
        const json = await response.json()
        if ("error" in json) {
          $showError(this.$t('database_error'))
        } else {
          this.popularProducts = json
        }
      } catch {}
      finally {
        this.loading = false
      }
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

.product {
  animation-name: show;
  animation-duration: 0.18s;
  animation-fill-mode: both;
  animation-timing-function: ease-out;
}

@keyframes show {
    from {
        opacity: 0; scale: 10%
    }

    to {
        opacity: 1; scale: 100%
    }
}

.item {
    view-timeline-name: --reveal;
    animation-name: show;
    animation-fill-mode: both;
    animation-timeline: --reveal;
    animation-range: entry 10% cover 15%;
}
</style>