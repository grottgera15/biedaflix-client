<template>
	<div class="series-cover">
		<div class="series-cover__logo" v-if="seriesData.files.logo">
			<img :src="seriesData.files.logo" />
		</div>
		<div class="series-cover__background">
			<video autoplay muted loop>
				<source :src="seriesData.files.cover" type="video/mp4" />
			</video>
		</div>
		<div class="series-cover__description">{{seriesData.description}}</div>
	</div>
</template>

<script>
import SeriesData from "@classes/SeriesData"

export default {
    name: "HomeSeriesDisplay",
    props: {
        seriesData: {
            type: SeriesData,
            required: true
        }
    }
};
</script>

<style lang="sass" scoped>
.series-cover
    height: 350px
    position: relative

    &__logo
        position: absolute
        padding: 24px 48px
        width: calc(100% - 2 * 48px)

        img
            max-width: 50%
            max-height: 36px
            opacity: 1

    &__description
        padding: 24px 48px
        position: absolute
        bottom: 0
        overflow: hidden
        cursor: default
        text-shadow: 2px 2px 10px black

    &__background   
        object-fit: cover
        position: absolute
        z-index:-999
        background-size: cover
        opacity: 0.75
        background-position: top center
        width: 100%
        height: 350px

        &:before
            content: ""
            width: 100%
            height: 350px
            position: absolute
            background: linear-gradient(50deg, rgba(21,21,21,1) 0%, rgba(21,21,21,0) 100%)

        video
            object-fit: cover
            min-height: 100%
            width: 100%
</style>