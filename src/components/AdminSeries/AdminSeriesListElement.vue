<template>
    <li class="series-list__element">
        <div class="series-list__element__name">{{serieData.name}}</div>
        <div class="series-list__element__episodes">0 / 8</div>
        <div class="series-list__element__status">{{serieData.onGoing}}</div>
        <router-link to="AdminSerie">
            <button>Edytuj</button>
        </router-link>
    </li>
</template>

<script>
import SerieData from "@classes/SerieData";

export default {
    name: "AdminSeriesListElement",
    props: {
        serieData: {
            type: SerieData,
            required: true
        }
    }
};
</script>

<style lang="sass" scoped>
.series-list__element
    padding: 16px 24px
    display: flex
    font-size: 10pt
    font-weight: 300
    color: #ffffffa3
    vertical-align: middle
    align-items: center
    justify-content: space-between
    border-bottom: 1px solid #ffffff17

    &__name
        display: block
        font-size: 14pt
        font-weight: 300
        color: #ffffffa3
        width: 35%

        &__episodes, &__status
            text-align: left
            width: 20%
</style>