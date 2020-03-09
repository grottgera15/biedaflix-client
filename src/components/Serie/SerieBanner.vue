<template>
	<div class="serie-banner" v-show="banner && logo">
		<div class="serie-banner__logo">
			<img :src="logo" />
		</div>
		<div class="serie-banner__background">
			<video autoplay muted loop :src="banner">
				<source type="video/mp4" />
			</video>
		</div>
		<div class="serie-banner__description">{{seriesData.description}}</div>
	</div>
</template>

<script>
import SeriesData from "@classes/SeriesData";

export default {
	name: "SerieBanner",
	props: {
		seriesData: {
			type: SeriesData,
			required: true
		}
    },
    computed: {
        logo: function() {
            return this.seriesData.logo.file ? this.seriesData.logo.file : this.seriesData.logo.path;
        },
        banner: function() {
            return this.seriesData.banner.file ? this.seriesData.banner.file : this.seriesData.banner.path;
        }
    }
};
</script>

<style lang="sass" scoped>
.serie-banner
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
        padding: 1.5em 3em
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
        opacity: .75
        background-position: top center
        width: 100%
        height: 350px

        &:before
            content: ""
            width: 100%
            height: 100%
            position: absolute
            background: linear-gradient(50deg, rgba(21,21,21,1) 0%, rgba(21,21,21,0) 100%)

        video
            object-fit: cover
            height: 100%
            width: 100%
</style>