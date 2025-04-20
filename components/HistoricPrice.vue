<template>
    <h1>{{ $t('history') }}</h1>
    <p v-if="historial.length === 0">No disponemos de historial para este producto</p>
    <ul>
        <li v-for="(item, index) in historial" :key="index">{{ item.time }} {{ item.value }}</li>
    </ul>
    <div ref="grafico"></div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        historial: {
            type: Array
        }
    }
})
</script>

<style scoped>

</style>