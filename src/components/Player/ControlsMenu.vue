<template>
	<div class="menu-wrapper">
		<transition name="slide-bottom">
			<div class="menu" v-show="visibility">
				<div class="wrapper">
					<div
						class="progress-bar"
						@mouseenter="mouseOnBar = true"
						@mouseleave="mouseOnBar = false"
						@mousemove="OnMouseOverBar"
						@click="TimeChange(newTime)"
					>
						<div
							class="bar-mouse-over-popup"
							v-show="mouseOnBar"
							:style="{'left': (TimeToPercentage(newTime) + '%')}"
							v-html="TimeFormatted(newTime)"
						></div>
						<div class="bar" :class="{'bar-full-size': mouseOnBar}">
							<div
								class="bar-buffered"
								v-for="(buffer, i) in buffered"
								:key="i"
								:style="{left: TimeToPercentage(buffer.start) + '%',
                                        right: (100-TimeToPercentage(buffer.end)) + '%'}"
							/>
							<div class="bar-current-time" :style="{width: TimeToPercentage(currentTime) + '%'}" />
						</div>
					</div>
					<!-- <ControllerButtonsBar /> -->
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
// import PlayerMenuButton from "./PlayerMenuButton.vue";
import ButtonEvent from "../../classes/ButtonEvent.js";
// import AudioBar from "./AudioBar.vue";

// import ControllerButtonsBar from "./ControllerButtonsBar";

import { PlayerEventBus } from "../../PlayerEventBus.js";

// import Mutations from "../../vuex/PlayerMutations.js";
import playerMixin from "../Mixins/playerMixin.js";

export default {
	name: "ControlsMenu",
	data() {
		return {
			mouseOnBar: false,
			newTime: null
		};
    },
    mixins: [
        playerMixin
    ],
	components: {
        // ControllerButtonsBar
		// PlayerMenuButton,
		// AudioBar
	},
	created() {
		document.addEventListener("keydown", event => {
			if (event.key == "ArrowLeft") this.TimeSkip(-10);
			if (event.key == "ArrowRight") this.TimeSkip(10);
		});
    },
    props: {
        visibility: {
            type: Boolean,
            default: true
        }
    },
	methods: {
		ChangeCurrentButton: function(event) {
			if (!(event instanceof ButtonEvent)) throw new TypeError();
			if (event.state) this.currentButton = event.name;
			else this.currentButton = null;
		},
		OnMouseOverBar: function(event) {
			let boundingClientRect = event.srcElement.getBoundingClientRect();
			let mousePositionPercentage =
				(event.clientX - boundingClientRect.left) /
				boundingClientRect.width;
			this.newTime = this.PercentageToTime(mousePositionPercentage);
        },
        TimeChange: function(newTime) {
            // this.$store.commit(Mutations.CurrentTimeSet, newTime);
            PlayerEventBus.$emit("CurrentTimeChanged", newTime);
        },
        
		// Time formatting
		TimeToPercentage: function(time) {
			return (time / this.duration) * 100;
		},
		PercentageToTime: function(percentage) {
			return percentage * this.duration;
        },
        TimeFormatted: function(time) {
            let minutesPart = Math.floor(time % 60);

			return (
				Math.floor(time / 60) +
				":" +
				minutesPart.toLocaleString("en-US", { minimumIntegerDigits: 2 })
			); 
        }
	}
};
</script>

<style lang="sass" scoped>
@import "../../styles/variables.sass"  

.menu-wrapper
    position: absolute
    width: 100%
    bottom: 0
    left: 0

    .menu
        bottom: 0
        position: absolute
        width: calc(100% - 2*32px)
        height: 64px
        padding: 48px 32px
        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)

        .wrapper

            .progress-bar
                height: calc(4px + 2*12px)
                width: 100%
                cursor: pointer
                position: relative

                .bar
                    height: 4px
                    width: 100%
                    margin: 12px 0
                    background-color: #ffffff40
                    position: absolute
                    transition-duration: 0.15s
                    pointer-events: none
                    box-shadow: 0px 0px 8px black

                    .bar-buffered
                        height: inherit
                        position: absolute
                        background-color: #ffffff90

                .bar-current-time
                    height: inherit
                    position: absolute
                    left: 0
                    background-color: $main-color

                .bar-mouse-over-popup
                    position: absolute
                    bottom: 32px
                    opacity: 0.75
                    transform: translateX(-50%)
                    pointer-events: none

                .bar-full-size
                    margin: 10px 0
                    height: 8px

            .buttons
                display: grid
                grid-template-columns: [left] 1fr [right] 1fr
                height: 32px
                padding: 8px 0

                .left, 
                .right
                    grid-column-start: left
                    grid-template-columns: repeat( auto-fit, minmax(32px, max-content) )
                    grid-column-gap: 16px
                    display: grid
                    align-items: center
                    
                    .current-time
                        width: 100%
                        opacity: 0.75
                        font-size: 10pt
                        cursor: default
                        font-weight: 800
                        letter-spacing: 0.5px


                .right
                    justify-content: right
                    grid-column-start: right

.slide-bottom-enter-active, .slide-bottom-leave-active 
    transition-duration: 0.5s
    opacity: 1
    transform: TranslateY(0%)

.slide-bottom-enter, .slide-bottom-leave-to
    transition-duration: 0.5s
    opacity: 0
    transform: TranslateY(25%)

</style>