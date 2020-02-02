<template>
	<div class="episode" :class="{'episode--not-available': !episodeData.available}">
        <div class="episode__data-wrapper">
            <div class="episode__data-wrapper__number">{{episodeData.fullNumber()}}</div>
            <div class="episode__data-wrapper__title">{{episodeData.name}}</div>
            <div class="episode__data-wrapper__addons">
                <span
                    v-if="episodeData.releaseDate && !episodeData.available"
                >{{episodeData.releaseDate}}</span>
            </div>
        </div>
		<div class="episode__progress-bar" v-if="episodeData.available">
			<div class="episode__progress-bar__fill" style="width: 5%" />
		</div>
	</div>
</template>

<script>
import EpisodeData from "@classes/EpisodeData";

export default {
	name: "HomeEpisodeData",
	props: {
		episodeData: {
			type: EpisodeData,
			required: true
		}
    }
};
</script>

<style lang="sass" scoped>
.episode
    border: 1px solid #ffffff17
    border-top: 0
    cursor: pointer
    background-color: #151515

    &__data-wrapper
        padding: 16px 48px
        font-size: 8pt
        font-weight: 700
        letter-spacing: 0.5px
        display: flex
        flex-direction: row
        flex-wrap: nowrap
        align-items: baseline
        transition-duration: 0.5s

        &__number, &__title
            margin-right: 8px

        &__title
            font-size: 10pt
            font-weight: 300
            width: 100%

        &__addons
            text-align: right

    &__progress-bar
        width: 100%
        height: 2px 
        bottom: 0
        background-color: #ffffff17

        &__fill
            background-color: white
            height: inherit
            opacity: 0.5

    &--not-available
        cursor: default
        color: #ffffff4f
</style>