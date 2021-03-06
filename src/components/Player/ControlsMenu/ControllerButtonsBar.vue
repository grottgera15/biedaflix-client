<template>
	<div class="buttons-bar">
		<div class="left-side">
			<ControllerButton
				:name="'play'"
				:icon="require('@files/menu/SVG/playButton.svg')"
				:isMainIconActive="!isPlaying"
				:secondaryIcon="require('@files/menu/SVG/pauseButton.svg')"
				:isFocused="'play' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
				@click="StateChange()"
			/>
			<ControllerButton
				:name="'back'"
				:icon="require('@files/menu/SVG/leftDoubleArrowsButton.svg')"
				:isFocused="'back' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
				@click="TimeSkip(-10)"
			/>
			<ControllerButton
				:name="'forward'"
				:icon="require('@files/menu/SVG/rightDoubleArrowsButton.svg')"
				:isFocused="'forward' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
				@click="TimeSkip(+10)"
			/>
			<ControllerButton
				:name="'audio'"
				:icon="require('@files/menu/SVG/audioButton.svg')"
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
				:name="'share'"
				:icon="require('@files/menu/SVG/settingsButton.svg')"
				:isFocused="'share' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
                @click="ShowSettingsPopUp()"
			/>
			<ControllerButton
				:name="'fullscreen'"
				:icon="require('@files/menu/SVG/fullscreenButton.svg')"
				:isFocused="'fullscreen' === activeButton"
				@mouse-interacted-button="ActiveButtonChange"
                @click="FullscreenChange"
			/>
		</div>
	</div>
</template>

<script>
import ControllerButton from "./ControllerButton";
import AudioBar from "./AudioBar";
import TimeDisplay from "./TimeDisplay";

import ButtonEvent from "@classes/ButtonEvent";
import playerMixin from "@mixins/playerMixin";
import Mutations from "@vuexMutations/PlayerMutations";

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
        ShowSettingsPopUp: function() {
            this.$store.commit(Mutations.SettingsPopUpChange, true);
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
    display: flex
    flex-direciton: row
    justify-content: space-between
    height: 32px
    padding: 8px 0

    .left-side,
    .right-side
        grid-column-gap: 16px
        display: flex
        align-items: center

    .left-side 
        order: 0

    .right-side
        order: 1
</style>