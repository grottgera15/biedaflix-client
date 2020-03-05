<template>
    <ul class="series-list">
        <v-series-list-element
            v-for="(serieData, i) in seriesData"
            :key="i"
            :serieData="serieData"
        />
    </ul>
</template>

<script>
import AdminSeriesListElement from "./AdminSeriesListElement";

export default {
    name: "AdminSeriesList",
    components: {
        "v-series-list-element": AdminSeriesListElement
    },
    props: {
        seriesData: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="sass" scoped>
.series-list
    list-style: none
    margin: 0
    padding: 0
</style>