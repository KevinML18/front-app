<template>
    <div class="flex items-center bg-gray-900 rounded-xl p-4 shadow-sm space-x-4">
        <img src="https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png" alt="Producto" class="w-30 h-auto" />
        <div class="flex-1">
            <a :href="url" class="text-xl font-semibold text-emerald-400 hover:underline" target="_blank">
                {{ name }}
            </a>
            <p>{{ $t('shop') }}: {{ tienda }}</p>
            <p class="text-white text-lg">{{ $t('price') }}: {{ price }}</p>
        </div>
        <button class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg cursor-pointer">
            {{ $t('set_alert') }}
        </button>
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
        tienda: {
            type: String
        }
    }
})
</script>

<style scoped>

</style>