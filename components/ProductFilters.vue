<template>
    <h3>{{ $t('filters') }}:</h3>
    <div>
        <!-- Filtro tienda -->
        <label>{{ $t('shop') }}:</label>
        <select v-model="tiendaFilter">
            <option class="text-black" value="todas">{{ $t('all_shops') }}</option>
            <option v-for="(tienda, index) in tiendas"
                :key="index"
                :value="tienda"
                class="text-black"
            >
                {{ tienda }}
            </option>
        </select>
        <!-- Filtro orden -->
        <label>{{ $t('sort_by') }}:</label>
        <select v-model="orderBy">
            <option value="default" class="text-black">
                {{ $t('default') }}
            </option>
            <option value="asc" class="text-black">
                {{ $t('price_asc') }}
            </option>
            <option value="desc" class="text-black">
                {{ $t('price_desc') }}
            </option>
        </select>
        <!-- Filtro precio -->
         <input type="range">
        <!-- Borrar -->
        <button
            @click="borrarFiltros"
            class="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 cursor-pointer rounded-md p-0.5 ml-2"
        >
            {{ $t('clear_filters') }}
        </button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    // Props heredads
    props: {
        productos: Array
    },
    // Emits para el padre
    emits: ['filtros-actualizados', 'quitar-filtros'],
    // Propiedades del componente
    data() {
        return {
            tiendas: [],
            orderBy: 'default',
            tiendaFilter: 'todas'
        }
    },
    // Se ejecuta al montar el componente
    mounted() {
        // Se obtienen las tiendas disponibles
        this.tiendas = this.productos.reduce((acc, el) => {
            if(!acc.includes(el.tienda)) {
                acc.push(el.tienda)
            }
            return acc
        }, [])
    },
    // Observa cambios y los emite
    watch: {
        tiendaFilter() {
            this.emitirFiltros()
        },
        orderBy() {
            this.emitirFiltros()
        }
    },
    methods: {
        emitirFiltros() {
            this.$emit('filtros-actualizados', {
                orderBy: this.orderBy,
                tienda: this.tiendaFilter
            })
        },
        borrarFiltros() {
            this.orderBy = 'default'
            this.tiendaFilter = 'todas'
            this.$emit('quitar-filtros')
        }
    }
})
</script>

<style scoped>

</style>