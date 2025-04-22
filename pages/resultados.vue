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

const router = useRoute()

const busqueda = ref('')
const productosFiltrados = ref(null)
const productosOriginales = ref([])
const historial = ref([])

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
    try {
        const response = await fetch(`http://localhost:8000/get_productos/${encodeURIComponent(producto)}`);
        if (!response.ok) throw new Error("Error en la solicitud");
        return await response.json();
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
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
