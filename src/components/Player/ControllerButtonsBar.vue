<template>
	<div class="buttons-bar">
		<div class="left-side">
			<ControllerButton
				:name="'play'"
				:icon="require('../../files/menu/SVG/playButton.svg')"
				:isMainIconActive="!isPlaying"
				:secondaryIcon="require('../../files/menu/SVG/pauseButton.svg')"
				:isFocused="'play' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
				@click="StateChange()"
			/>
			<ControllerButton
				:name="'back'"
				:icon="require('../../files/menu/SVG/leftDoubleArrowsButton.svg')"
				:isFocused="'back' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
				@click="TimeSkip(-10)"
			/>
			<ControllerButton
				:name="'forward'"
				:icon="require('../../files/menu/SVG/rightDoubleArrowsButton.svg')"
				:isFocused="'forward' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
				@click="TimeSkip(+10)"
			/>
			<ControllerButton
				:name="'audio'"
				:icon="require('../../files/menu/SVG/audioButton.svg')"
				:isFocused="'audio' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
				@click="VolumeMute()"
			>
				<AudioBar :visibility="'audio' === activeButton"/>
			</ControllerButton>
            <TimeDisplay />
		</div>
		<div class="right-side">
			<ControllerButton
				:name="'subtitles'"
				:icon="require('../../files/menu/SVG/subtitlesButton.svg')"
				:isFocused="'subtitles' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
			/>
			<ControllerButton
				:name="'share'"
				:icon="require('../../files/menu/SVG/shareButton.svg')"
				:isFocused="'share' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
			/>
			<ControllerButton
				:name="'fullscreen'"
				:icon="require('../../files/menu/SVG/fullscreenButton.svg')"
				:isFocused="'fullscreen' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
                @click="FullscreenChange"
			/>
		</div>
	</div>
</template>

<script>
import ControllerButton from "./ControllerButton.vue";
import AudioBar from "./AudioBar.vue";
import TimeDisplay from "./TimeDisplay.vue";

import ButtonEvent from "../../classes/ButtonEvent.js";
import playerMixin from "../Mixins/playerMixin.js";
import Mutations from "../../vuex/PlayerMutations.js";

export default {
	name: "ControllerButtonsBar",
	data() {
		return {
			activeButton: null
		};
	},
	components: {
		ControllerButton,
        AudioBar,
        TimeDisplay
	},
	mixins: [playerMixin],
	methods: {
		ActiveButtonChange: function(event) {
			if (event instanceof ButtonEvent) {
				if (event.state) this.activeButton = event.name;
				else this.activeButton = null;
			}
		},
		StateChange: function() {
			this.$store.commit(Mutations.PlayerStateSet, !this.isPlaying);
		},
		VolumeMute: function() {
			this.$store.commit(Mutations.VolumeMute);
		},
		TimeSkip: function(timeChange) {
			this.$store.commit(
				Mutations.NewTimeSet,
				this.currentTime + timeChange
			);
        },
        FullscreenChange: function() {
            this.$store.commit(Mutations.FullscreenChange);
        }
	},
	computed: {
		isPlaying: function() {
			return this.$store.state.player.isPlaying;
		},
		currentTime: function() {
			return this.$store.state.player.currentTime;
		}
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