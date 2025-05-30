<template>
  <h2 class="text-2xl font-bold mb-2 hidden md:block">{{ $t('filters') }}:</h2>
  <div class="flex flex-wrap mt-5 justify-around md:flex-col gap-4 md:gap-10 w-full">
    <!-- Filtro tienda -->
    <div class="shop">
      <label class="block font-bold mb-3">{{ $t('shop') }}:</label>
      <select v-model="tiendaFilter" class="cursor-pointer bg-slate-900 p-1 rounded-md w-full">
        <option value="todas">{{ $t('all_shops') }}</option>
        <option v-for="(tienda, index) in tiendas"
          :key="index"
          :value="tienda"
        >
          {{ tienda }}
        </option>
      </select>
    </div>

    <!-- Filtro orden -->
    <div class="orderBy">
      <label class="block font-bold mb-3">{{ $t('sort_by') }}:</label>
      <select v-model="orderBy" class="cursor-pointer bg-slate-900 p-1 rounded-md w-full">
        <option value="default">
          {{ $t('default') }}
        </option>
        <option value="asc">
          {{ $t('price_asc') }}
        </option>
        <option value="desc">
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
      <div class="items-center gap-4 mb-4 hidden sm:flex">
        <!-- Input mínimo -->
        <input
          type="text"
          v-model="rango[0]"
          disabled
          :min="minPrice"
          :max="rango[1]"
          class="w-20 p-1 rounded-md border-2 bg-slate-800 border-slate-800 text-center"
          @blur="rango[0] = Math.floor(rango[0])"
        />
        <span> - </span>
        <!-- Input máximo -->
        <input
          type="text"
          disabled
          v-model="rango[1]"
          :min="rango[0]"
          :max="maxPrice"
          class="w-20 p-1 rounded-md border-2 bg-slate-800 border-slate-800 text-center"
        />
      </div>
    </div>
  </div>
  <!-- Borrar -->
  <button
      @click="borrarFiltros"
      class="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 cursor-pointer rounded-md p-0.5 ml-2 mt-5"
  >
      {{ $t('clear_filters') }}
  </button>
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
            this.rango = [this.minPrice, this.maxPrice]
            this.$emit('quitar-filtros')
        }
    }
})
</script>