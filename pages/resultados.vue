<template>
    <div
        v-if="loading"
        class="absolute inset-0 bg-slate-950/10 flex flex-col items-center justify-center z-10"
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
        <div class="flex flex-col md:flex-row min-h-screen">
            <!-- Filtros -->
            <div class="w-full md:w-1/7 p-4 flex flex-col">
                <ProductFilters
                    :productos="productosOriginales"
                    @actualizar-filtros="actualizarFiltros"
                    @quitar-filtros="quitarFiltros"
                />
            </div>
            <div class="w-full md:w-6/7 p-4 flex flex-col gap-5">
                <h1 class="text-2xl font-bold mb-2">
                    {{ $t('results_for') }}: "{{ busqueda }}"
                </h1>
                <ProductCard
                    v-for="item in productosFiltrados || productosOriginales"
                    :key="item.url"
                    :name="item.titulo"
                    :price="item.precio"
                    :url="item.url"
                    :shop="item.tienda"
                    :image="item.imagen_url"
                    class="product"
                />
            </div>
        </div>
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
const loading = ref(false)

// Método para aplicar filtros
const actualizarFiltros = ({ orderBy, tienda, rango }) => {
    let filtrados = [...productosOriginales.value]

    if (rango) {
        filtrados = filtrados.filter(el => el.precio >= Math.floor(rango[0]) && el.precio <= Math.ceil(rango[1]))
    }

    if (tienda && tienda !== 'todas') {
        filtrados = filtrados.filter(el => el.tienda === tienda)
    }

    if (orderBy === 'asc') {
        filtrados.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio))
    } else if (orderBy === 'desc') {
        filtrados.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio))
    } else if (tienda && orderBy === 'default'){
        filtrados = [...productosOriginales.value]
        if (tienda && tienda !== 'todas') {
            filtrados = filtrados.filter(el => el.tienda === tienda)
        }
        if (rango) {
            filtrados = filtrados.filter(el => el.precio >= Math.floor(rango[0]) && el.precio <= Math.ceil(rango[1]))
        }
    }
    
    productosFiltrados.value = filtrados
}

// Método para borrar filtros
const quitarFiltros = () => {
    productosFiltrados.value = null
}

// Fetch para productos desde la API
const fetchProductosAmazon = async (producto) => {
    console.log('BUSCANDO: ', producto)
    loading.value = true
    try {
        const response = await fetch(`http://127.0.0.1:8000/get_productos_amazon/${encodeURIComponent(producto)}`);
        if (!response.ok)  {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        productosOriginales.value = data
        console.log("Datos recibidos:", data)
        return data
    } catch (error) {
        console.error("Error al obtener los datos:", error)
    } finally {
        // loading.value = false
        await fetchProductosMedia(producto)
    }
}

const fetchProductosMedia = async (producto) => {
    // console.log('BUSCANDO: ', producto)
    // loading.value = true
    try {
        const response = await fetch(`http://127.0.0.1:8000/get_productos_mediamarkt/${encodeURIComponent(producto)}`);
        if (!response.ok)  {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        productosOriginales.value.push(...data) 
        console.log("Datos recibidos media:", data)
        return data
    } catch (error) {
        console.error("Error al obtener los datos:", error)
    } finally {
        loading.value = false
    }
}
   


// Ejecuta cuando el componente monta
onMounted(async () => {
    busqueda.value = router.query.producto || '';
    productosOriginales.value = await fetchProductosAmazon(busqueda.value);
})

// Observa cambios en la búsqueda
watchEffect(async () => {
    if (router.query.producto) {
        busqueda.value = router.query.producto;
        productosOriginales.value = await fetchProductosAmazon(busqueda.value);
    }
});
</script>

<style scoped>
@keyframes show {
    from {
        opacity: 0; scale: 10%
    }

    to {
        opacity: 1; scale: 100%
    }
}

.product {
    view-timeline-name: --reveal;
    animation-name: show;
    animation-fill-mode: both;
    animation-timeline: --reveal;
    animation-range: entry 10% cover 15%;
}
</style>