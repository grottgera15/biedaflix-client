<template>
	<div class="buttons-bar">
		<div class="left-side">
			<ControllerButton
				:name="'play'"
				:icon="require('../../files/menu/SVG/playButton.svg')"
				:secondaryIcon="require('../../files/menu/SVG/pauseButton.svg')"
				:iconCondition="isPlaying"
				@click="StateChange()"
			/>
			<ControllerButton
                :name="'back'"
				:icon="require('../../files/menu/SVG/leftDoubleArrowsButton.svg')"
				:iconCondition="isPlaying"
				@click="TimeSkip(-10)"
			/>
			<ControllerButton
                :name="'forward'"
				:icon="require('../../files/menu/SVG/rightDoubleArrowsButton.svg')"
				:iconCondition="isPlaying"
				@click="TimeSkip(+10)"
			/>
			<ControllerButton
                :name="'audio'"
				:icon="require('../../files/menu/SVG/audioButton.svg')"
				:iconCondition="isPlaying"
				@click="ChangeVolumeState()"
			/>
		</div>
		<div class="right-side">
			<ControllerButton
                :name="'subtitles'"
				:icon="require('../../files/menu/SVG/subtitlesButton.svg')"
				:iconCondition="isPlaying"
			/>
			<ControllerButton
                :name="'share'"
				:icon="require('../../files/menu/SVG/shareButton.svg')"
				:iconCondition="isPlaying"
			/>
			<ControllerButton
                :name="'fullscreen'"
				:icon="require('../../files/menu/SVG/fullscreenButton.svg')"
				:iconCondition="isPlaying"
			/>
		</div>
	</div>
</template>

<script>
import ControllerButton from "./ControllerButton.vue";
// import AudioBar from "./AudioBar.vue";

export default {
	name: "ControllerButtonsBar",
	data() {
		return {};
	},
	components: {
		ControllerButton
		// AudioBar
	}
};
</script>

<style lang="sass" scoped>
.buttons-bar
    display: grid
    grid-template-columns: [left] 1fr [right] 1fr
    height: 32px
    padding: 8px 0

    .left-side,
    .right-side
        grid-column-start: left
        grid-template-columns: repeat( auto-fit, minmax(32px, max-content) )
        grid-column-gap: 16px
        display: grid
        align-items: center

    .right-side
        justify-content: right
        grid-column-start: right
</style>