<template>
    <div
        v-if="loading"
        class="flex flex-col absolute inset-0 bg-slate-950/10 flex items-center justify-center z-10"
        >
        <DotLottieVue
            src="/animations/loading.lottie"
            autoplay
            loop
            class="w-32 h-32"
        />
        <h3 class="mt-4 text-xl font-bold text-white">
            {{ $t('loading') }}
        </h3>
    </div>

    <div v-else>
        <h1 class="text-2xl font-bold mb-2">
            {{ $t('results_for') }}: "{{ busqueda }}"
        </h1>
        <ProductFilters
            :productos="productosOriginales"
            @filtros-actualizados="actualizarFiltros"
            @quitar-filtros="quitarFiltros"
        />
        <div class="flex flex-col gap-5">
            <ProductCard
                v-for="item in productosFiltrados || productosOriginales"
                :key="item.url"
                :name="item.titulo"
                :price="item.precio"
                :url="item.url"
                :tienda="'Amazon'"
            />
        </div>
        <HistoricPrice :historial="historial" />
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const router = useRoute()

const busqueda = ref('')
const productosFiltrados = ref(null)
const productosOriginales = ref([])
const historial = ref([])
const loading = ref(false)

// Método para aplicar filtros
const actualizarFiltros = ({ orderBy, tienda }) => {
    let filtrados = [...productosOriginales.value]

    if (tienda && tienda !== 'todas') {
        filtrados = filtrados.filter(el => el.tienda === tienda)
    }

    if (orderBy === 'asc') {
        filtrados.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (orderBy === 'desc') {
        filtrados.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    }

    productosFiltrados.value = filtrados
}

// Método para borrar filtros
const quitarFiltros = () => {
    productosFiltrados.value = null
}

// Fetch para productos desde la API
const fetchProductos = async (producto) => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 4000)
    return [
        {
            "titulo": "Apple iPhone 16 de 256 GB: Smartphone 5G con Control de Cámara, Chip A18 y un subidón en autonomía. Compatible con los AirPods; Azul Ultramar",
            "precio": "969,00",
            "tienda": "Amazon",
            "imagen_url": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png",
            "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MToxNzUyMDgwNzg3OTQ5NDY4OjE3NDUzNDU2MjI6c3BfYXRmOjMwMDMzMjI2MTc5OTMzMjo6MDo6&url=%2FApple-iPhone-256-Smartphone-autonom%25C3%25ADa%2Fdp%2FB0DGJ7Q246%2Fref%3Dsr_1_1_sspa%3Fdib%3DeyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ%26dib_tag%3Dse%26keywords%3Diphone%2B16%26qid%3D1745345622%26sr%3D8-1-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1"
        },
        {
            "titulo": "Apple iPhone 16e de 128 GB: Diseñado para Apple Intelligence, Chip A18, autonomía a raudales, cámara Fusion de 48 Mpx, Pantalla Super Retina XDR de 6,1 Pulgadas — Blanco",
            "precio": "669,00",
            "tienda": "Amazon",
            "imagen_url": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png",
            "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MToxNzUyMDgwNzg3OTQ5NDY4OjE3NDUzNDU2MjI6c3BfYXRmOjMwMDQ4NTQ0NzQ4MzczMjo6MDo6&url=%2FApple-iPhone-16e-128-Intelligence%2Fdp%2FB0DXRKKF8N%2Fref%3Dsr_1_2_sspa%3Fdib%3DeyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ%26dib_tag%3Dse%26keywords%3Diphone%2B16%26qid%3D1745345622%26sr%3D8-2-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1"
        },
        {
            "titulo": "Apple iPhone 15 (128 GB) - Verde",
            "precio": "729,00",
            "tienda": "Amazon",
            "imagen_url": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png",
            "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MToxNzUyMDgwNzg3OTQ5NDY4OjE3NDUzNDU2MjI6c3BfYXRmOjMwMDA1NDUyODEwMDczMjo6MDo6&url=%2FApple-iPhone-15-128-GB%2Fdp%2FB0CHX11FBS%2Fref%3Dsr_1_3_sspa%3Fdib%3DeyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ%26dib_tag%3Dse%26keywords%3Diphone%2B16%26qid%3D1745345622%26sr%3D8-3-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1"
        },
        {
            "titulo": "Apple iPhone 16 Pro de 512 GB: Smartphone 5G con Control de Cámara, grabación en 4K a 120 f/s con Dolby Vision y un Gran Salto en autonomía. Compatible con los AirPods; Titanio Color Desierto",
            "precio": "1.499,00",
            "tienda": "MediaMarkt",
            "imagen_url": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png",
            "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MToxNzUyMDgwNzg3OTQ5NDY4OjE3NDUzNDU2MjI6c3BfYXRmOjMwMDMzMjI2MTgxMjAzMjo6MDo6&url=%2FApple-iPhone-Pro-512-Smartphone%2Fdp%2FB0DGJ559CL%2Fref%3Dsr_1_4_sspa%3Fdib%3DeyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ%26dib_tag%3Dse%26keywords%3Diphone%2B16%26qid%3D1745345622%26sr%3D8-4-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1"
        },
        {
            "titulo": "Titulo no encontrado",
            "precio": "Precio no encontrado",
            "tienda": "MediaMarkt",
            "imagen_url": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png",
            "url": "https://www.amazon.es/Apple-iPhone-128-Smartphone-autonom%C3%ADa/dp/B0DGJDQP2N/ref=sr_1_5_mod_primary_new?dib=eyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ&dib_tag=se&keywords=iphone+16&qid=1745345622&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-5"
        },
        {
            "titulo": "Titulo no encontrado",
            "precio": "Precio no encontrado",
            "tienda": "MediaMarkt",
            "imagen_url": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png",
            "url": "https://www.amazon.es/Apple-iPhone-16e-128-Intelligence/dp/B0DXR1RW8Z/ref=sr_1_6?dib=eyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ&dib_tag=se&keywords=iphone+16&qid=1745345622&sr=8-6"
        },
        {
            "titulo": "Titulo no encontrado",
            "precio": "789,00",
            "tienda": "PcComponentes",
            "imagen_url": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png",
            "url": "https://www.amazon.es/Apple-iPhone-128GB-Azulado-Reacondicionado/dp/B0DHYDGHF5/ref=sr_1_7?dib=eyJ2IjoiMSJ9.Kxvg9w-qEZ8doLuDhLfcybKnDcj42ux5JwhEAUcInT6XJbDIEbkpHFe9gLRmc8VUFgVzZdOgixf2mepH6B4QlfaoxrnbAQv02NSKZ7XnhL0t1NSQFz6aiJLVQPsmRHp2MO5okf7eA8yr8YLtQMrznAAj9cLFmk-_9c6zTv8OlXaGUwGW1Wt65kW3khSkgw0s6EaZ_KVpdtBW1mj3SbkBtgnjNclctQYienAsjC3xgpY5gzRocieVHFmyDcRV38S530e6LFKHm5c91o_PDNRo-OcWa6rwgAYMQAsCPLDmrrM.Vb7OCEhQ0M_CuVCbdWBG6hIcfF5CeL0KyVadgkXrpTQ&dib_tag=se&keywords=iphone+16&qid=1745345622&sr=8-7"
        },
        {
            "titulo": "Apple iPhone 16e de 128 GB: Diseñado para Apple Intelligence, Chip A18, autonomía a raudales, cámara Fusion de 48 Mpx, Pantalla Super Retina XDR de 6,1 Pulgadas — Blanco",
            "precio": "669,00",
            "tienda": "Quicentro",
            "imagen_url": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png",
            "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MTo3MDU3MTkzNDI3MTU4NzA6MTc0NTM0NTYyMjpzcF9zZWFyY2hfdGhlbWF0aWM6MzAwNDg1NDQ3NDgzNzMyOjowOjo&url=%2FApple-iPhone-16e-128-Intelligence%2Fdp%2FB0DXRKKF8N%2Fref%3Dsxin_15_pa_sp_search_thematic_sspa%3Fcontent-id%3Damzn1.sym.57bb3dff-7260-435c-993b-6d3e66dc5776%253Aamzn1.sym.57bb3dff-7260-435c-993b-6d3e66dc5776%26cv_ct_cx%3Diphone%2B16%26keywords%3Diphone%2B16%26pd_rd_i%3DB0DXRKKF8N%26pd_rd_r%3Dd54197fa-1a2d-484b-afb0-39541bb98698%26pd_rd_w%3Dx6IKa%26pd_rd_wg%3DOM1Ym%26pf_rd_p%3D57bb3dff-7260-435c-993b-6d3e66dc5776%26pf_rd_r%3DJ92QMF4F87VJXWAV4AWK%26qid%3D1745345622%26sbo%3DRZvfv%252F%252FHxDF%252BO5021pAnSA%253D%253D%26sr%3D1-1-261effe4-3283-492c-8023-87311e7539eb-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM%26psc%3D1"
        },
        {
            "titulo": "Apple iPhone 16 de 256 GB: Smartphone 5G con Control de Cámara, Chip A18 y un subidón en autonomía. Compatible con los AirPods; Rosa",
            "precio": "969,00",
            "tienda": "Quicentro",
            "imagen_url": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png",
            "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MTo3MDU3MTkzNDI3MTU4NzA6MTc0NTM0NTYyMjpzcF9zZWFyY2hfdGhlbWF0aWM6MzAwMzMzNjQ1NTExODMyOjoxOjo&url=%2FApple-iPhone-256-Smartphone-autonom%25C3%25ADa%2Fdp%2FB0DGJLZWN7%2Fref%3Dsxin_15_pa_sp_search_thematic_sspa%3Fcontent-id%3Damzn1.sym.57bb3dff-7260-435c-993b-6d3e66dc5776%253Aamzn1.sym.57bb3dff-7260-435c-993b-6d3e66dc5776%26cv_ct_cx%3Diphone%2B16%26keywords%3Diphone%2B16%26pd_rd_i%3DB0DGJLZWN7%26pd_rd_r%3Dd54197fa-1a2d-484b-afb0-39541bb98698%26pd_rd_w%3Dx6IKa%26pd_rd_wg%3DOM1Ym%26pf_rd_p%3D57bb3dff-7260-435c-993b-6d3e66dc5776%26pf_rd_r%3DJ92QMF4F87VJXWAV4AWK%26qid%3D1745345622%26sbo%3DRZvfv%252F%252FHxDF%252BO5021pAnSA%253D%253D%26sr%3D1-2-261effe4-3283-492c-8023-87311e7539eb-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM%26psc%3D1"
        },
        {
            "titulo": "Apple iPhone 16 Plus de 128 GB: Smartphone 5G con Control de Cámara, Chip A18 y un subidón en autonomía. Compatible con los AirPods; Blanco",
            "precio": "969,00",
            "tienda": "PcComponentes",
            "imagen_url": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144186204/fee_786_587_png",
            "url": "https://www.amazon.es/sspa/click?ie=UTF8&spc=MTo3MDU3MTkzNDI3MTU4NzA6MTc0NTM0NTYyMjpzcF9zZWFyY2hfdGhlbWF0aWM6MzAwMzMzNjQ1NTEwMjMyOjoyOjo&url=%2FApple-iPhone-Plus-128-Smartphone%2Fdp%2FB0DGJDYQ45%2Fref%3Dsxin_15_pa_sp_search_thematic_sspa%3Fcontent-id%3Damzn1.sym.57bb3dff-7260-435c-993b-6d3e66dc5776%253Aamzn1.sym.57bb3dff-7260-435c-993b-6d3e66dc5776%26cv_ct_cx%3Diphone%2B16%26keywords%3Diphone%2B16%26pd_rd_i%3DB0DGJDYQ45%26pd_rd_r%3Dd54197fa-1a2d-484b-afb0-39541bb98698%26pd_rd_w%3Dx6IKa%26pd_rd_wg%3DOM1Ym%26pf_rd_p%3D57bb3dff-7260-435c-993b-6d3e66dc5776%26pf_rd_r%3DJ92QMF4F87VJXWAV4AWK%26qid%3D1745345622%26sbo%3DRZvfv%252F%252FHxDF%252BO5021pAnSA%253D%253D%26sr%3D1-3-261effe4-3283-492c-8023-87311e7539eb-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM%26psc%3D1"
        }
    ]
}

// Datos de ejemplo para historial
const fetchHistorial = () => {
    historial.value = [
        { time: '2025-04-13', value: 258 },
        { time: '2025-05-12', value: 123 },
        { time: '2025-06-15', value: 358 },
        { time: '2025-07-16', value: 985 },
        { time: '2025-08-17', value: 205 },
        { time: '2025-09-18', value: 305 },
        { time: '2025-10-23', value: 23 }
    ]
}

// Ejecuta cuando el componente monta
onMounted(async () => {
    busqueda.value = router.query.producto || '';
    productosOriginales.value = await fetchProductos(busqueda.value);
    console.log(productosOriginales.value)
    fetchHistorial();
})

// Observa cambios en la búsqueda
watchEffect(async () => {
    if (router.query.producto) {
        busqueda.value = router.query.producto;
        productosOriginales.value = await fetchProductos(busqueda.value);
    }
});
</script>
