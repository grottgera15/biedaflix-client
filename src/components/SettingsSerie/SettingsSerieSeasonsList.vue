<template>
    <ol class="serie-seasons__list">
        <li v-for="(season, i) in seasons" :key="i">
            <v-small-button>Sezon {{i}}</v-small-button>
        </li>
    </ol>
</template>

<script>
import SeriesData from "@classes/SeriesData.js";

export default {
    name: "SettingsSerieSeasonsList",
    props: {
        SeriesData: {
            type: SeriesData,
            required: true
        }
    }
};
</script>

<style lang="sass" scoped>
.serie-seasons

    &__list
        list-style: none
        padding: 0
</style>