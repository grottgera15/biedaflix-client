<template>
	<div class="bar">
		<div class="title">{{seriesData.name}}</div>
		<div class="on-going" v-if="seriesData.onGoing">W TRAKCIE</div>
	</div>
</template>

<script>
import SerieData from "@classes/SerieData";

export default {
    name: "HomeSeriesBar",
    props: {
        seriesData: {
            type: SerieData,
            required: true
        }
    }
};
</script>

<style lang="sass" scoped>
.bar
    display: grid
    grid-template-columns: [name] 2fr [info] 1fr
    border-bottom: 1px solid #ffffff17
    cursor: pointer
    padding: 16px 24px
    color: #ffffffa3
    align-items: center
    background-color: inherit
    z-index: 999999
    transition-duration: 0.3s

    .title
        grid-column-start: name
        font-size: 14pt
        font-weight: 300

    .active
        color: white

    .on-going
        font-size: 8pt
        text-align: right
        font-weight: 700
        letter-spacing: 0.5px
        color: white

    &:hover
        color: white
</style>