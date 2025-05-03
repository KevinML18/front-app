<template>
    <h2 class="text-2xl font-bold mb-2">{{ $t('filters') }}:</h2>
    <div class="flex flex-col gap-10">
        <!-- Filtro tienda -->
        <div class="shop">
            <label class="block font-bold mb-3">{{ $t('shop') }}:</label>
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
        </div>

        <!-- Filtro orden -->
        <div class="orderBy">
            <label class="block font-bold mb-3">{{ $t('sort_by') }}:</label>
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
        </div>

        <!-- Filtro precio -->
        <div class="range">
            <p class="block font-bold mb-3">{{ $t('price_range') }}</p>
            <el-slider
                v-model="rango"
                range
                :min="minPrice"
                :max="maxPrice"
                :step="0.1"
                :format-tooltip="val => Math.round(val)"
            />
            <div class="flex items-center gap-4 mb-4">
                <!-- Input mínimo -->
                <input
                    type="number"
                    v-model="rango[0]"
                    :min="minPrice"
                    :max="rango[1]"
                    class="w-20 p-1 rounded-md border border-gray-300"
                    @blur="rango[0] = Math.floor(rango[0])"
                />
                <span> - </span>
                <!-- Input máximo -->
                <input
                    type="number"
                    v-model="rango[1]"
                    :min="rango[0]"
                    :max="maxPrice"
                    class="w-20 p-1 rounded-md border border-gray-300"
                />
            </div>
        </div>

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
import { ElSlider, ElInputNumber } from 'element-plus'

export default defineComponent({
    // Props heredads
    props: {
        productos: Array
    },
    components: {
        ElSlider,
        ElInputNumber
    },
    // Emits para el padre
    emits: ['actualizar-filtros', 'quitar-filtros'],
    // Propiedades del componente
    data() {
        return {
            tiendas: [],
            orderBy: 'default',
            tiendaFilter: 'todas',
            minPrice: 0,
            maxPrice: 0,
            rango: []
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

        this.minPrice = Math.min(...this.productos.map(p => parseFloat(p.precio)))
        this.maxPrice = Math.max(...this.productos.map(p => parseFloat(p.precio)))
        this.rango[0] = this.minPrice
        this.rango[1] = this.maxPrice
    },
    // Observa cambios y los emite
    watch: {
        tiendaFilter() {
            this.emitirFiltros()
        },
        orderBy() {
            this.emitirFiltros()
        },
        rango() {
            this.emitirFiltros()
        }
    },
    methods: {
        emitirFiltros() {
            this.$emit('actualizar-filtros', {
                orderBy: this.orderBy,
                tienda: this.tiendaFilter,
                rango: this.rango
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