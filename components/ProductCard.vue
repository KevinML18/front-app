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
            <button class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg cursor-pointer">
                {{ $t('set_alert') }}
            </button>
            <button class="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium px-4 py-2 rounded-lg cursor-pointer">
                {{ $t('delete') }}
            </button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
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
    }
})
</script>

<style scoped>

</style>