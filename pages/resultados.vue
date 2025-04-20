<template>
    <h1 class="text-2xl font-bold mb-2">
        {{ $t('results_for') }}: "{{ busqueda }}"
    </h1>
    <div>
        <ProductFilters
            :productos="productosOriginales"
            @filtros-actualizados="actualizarFiltros"
            @quitar-filtros="quitarFiltros"
        />
        <div class="flex flex-col gap-5">
            <ProductCard
                v-for="(item, index) in productosFiltrados || productosOriginales"
                :key="index"
                :name="item.name"
                :price="item.price"
                :url="item.url"
                :tienda="item.tienda"
            />
        </div>
        <HistoricPrice :historial="historial"/>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const router = useRoute()

const busqueda = ref('')
const productosFiltrados = ref(null)
const productosOriginales = ref([])
const historial = ref([])

// Se obtiene el nombre a partir de la ruta
busqueda.value = router.query.producto

// Método para aplicar filtros
const actualizarFiltros = ({orderBy, tienda}) => {
    // Esto es para que no mute
    let filtrados = [...productosOriginales.value]
    
    if (tienda && tienda !== 'todas') {
        filtrados = filtrados.filter(el => el.tienda === tienda)
    }

    if (orderBy === 'asc') {
        filtrados.sort((a,b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (orderBy === 'desc') {
        filtrados.sort((a,b) => parseFloat(b.price) - parseFloat(a.price))
    }
    productosFiltrados.value = filtrados
}

// Método para borrar filtros
const quitarFiltros = () => {
    productosFiltrados.value = null
}

// AQUI IRIA LA PERICIÓN A LA API --- HACER ASINCRONA
const fetchProductos = () => {
    productosOriginales.value = [
        {
            name: busqueda.value,
            price: '899.99 €',
            url: 'https://www.mediamarkt.es/es/product/_portatil-hp-15-fd0112ns-156-full-hd-intelr-coretm-i5-1235u-16gb-ram-512gb-ssd-graficos-irisr-xe-windows-11-h-plata-1577458.html',
            tienda: 'MediaMakt'
        },
        {
            name: busqueda.value,
            price: '799.99 €',
            url: 'https://www.mediamarkt.es/es/product/_portatil-hp-15-fd0112ns-156-full-hd-intelr-coretm-i5-1235u-16gb-ram-512gb-ssd-graficos-irisr-xe-windows-11-h-plata-1577458.html',
            tienda: 'MediaMakt'
        },
        {
            name: busqueda.value,
            price: '999.99 €',
            url: 'https://www.mediamarkt.es/es/product/_portatil-hp-15-fd0112ns-156-full-hd-intelr-coretm-i5-1235u-16gb-ram-512gb-ssd-graficos-irisr-xe-windows-11-h-plata-1577458.html',
            tienda: 'Amazon'
        },
        {
            name: busqueda.value,
            price: '1099.99 €',
            url: 'https://www.mediamarkt.es/es/product/_portatil-hp-15-fd0112ns-156-full-hd-intelr-coretm-i5-1235u-16gb-ram-512gb-ssd-graficos-irisr-xe-windows-11-h-plata-1577458.html',
            tienda: 'Amazon'
        },
        {
            name: busqueda.value,
            price: '1199.99 €',
            url: 'https://www.mediamarkt.es/es/product/_portatil-hp-15-fd0112ns-156-full-hd-intelr-coretm-i5-1235u-16gb-ram-512gb-ssd-graficos-irisr-xe-windows-11-h-plata-1577458.html',
            tienda: 'PcComponentes'
        },
        {
            name: busqueda.value,
            price: '1123.99 €',
            url: 'https://www.mediamarkt.es/es/product/_portatil-hp-15-fd0112ns-156-full-hd-intelr-coretm-i5-1235u-16gb-ram-512gb-ssd-graficos-irisr-xe-windows-11-h-plata-1577458.html',
            tienda: 'Quito Store'
        }
    ]
}

// Fetch para el historial
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
// Se ejecuta al inicial la vista
onMounted(() => {
    fetchProductos()
    fetchHistorial()
})

// Observa cambios en la búsqueda 
watchEffect(() => {
    busqueda.value = router.query.producto
    fetchProductos()
})
</script>

<style scoped>

</style>