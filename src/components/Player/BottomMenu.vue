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
						@click="ChangeTime"
					>
						<div
							class="bar-mouse-over-popup"
							v-show="mouseOnBar"
							:style="{'left': (TimeToPercentage(newTime) + '%')}"
							v-html="newTimeFormated"
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
					<div class="buttons">
						<div v-for="(buttons, i) in buttons" :key="i" :class="i">
							<PlayerMenuButton
								v-for="(button, i) in buttons"
								:key="i"
								:icon="button.icon"
								:name="button.name"
								:active="button.name === currentButton"
                                v-on="button.events"
								@mouse-interacted-button="ChangeCurrentButton"
							>
								<component
									v-for="(component, i) in button.components"
									:key="i"
									:is="component.component"
									v-on="component.events"
								/>
							</PlayerMenuButton>
							<div
								class="current-time"
								v-if="i === 'left'"
							>{{currentTimeFormated}} / {{durationTimeFormated}}</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import PlayerMenuButton from "./PlayerMenuButton.vue";
import ButtonEvent from "../../classes/ButtonEvent.js";
import AudioBar from "./AudioBar.vue";

export default {
	name: "BottomMenu",
	data() {
		return {
			mouseOnBar: false,
			newTime: null,
			isMuted: true,
			isPlaying: true,
			audioVolume: 1,
			info: {},
			currentButton: null,
			buttons: {
				left: [
					{
						name: "play",
                        icon: require("../../files/menu/SVG/playButton.svg"),
                        events: {

                        }
					},
					{
						name: "back",
						icon: require("../../files/menu/SVG/leftDoubleArrowsButton.svg")
					},
					{
						name: "forward",
						icon: require("../../files/menu/SVG/rightDoubleArrowsButton.svg")
					},
					{
						name: "audio",
						icon: require("../../files/menu/SVG/audioButton.svg"),
						components: [
							{
								component: AudioBar,
								events: {
									"volume-change": (audioVolume) => this.VolumeChange(audioVolume)
								}
							}
						]
					}
				],
				right: [
					{
						name: "subtitles",
						icon: require("../../files/menu/SVG/subtitlesButton.svg")
					},
					{
						name: "share",
						icon: require("../../files/menu/SVG/shareButton.svg")
					},
					{
						name: "fullscreen",
						icon: require("../../files/menu/SVG/fullscreenButton.svg")
					}
				]
			}
		};
	},
	components: {
		PlayerMenuButton
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
		VolumeChange: function(audioVolume) {
			this.$emit("volume-change", audioVolume)
		},
		ChangeMute: function() {
			this.audioVolume = 0;
		},
		ChangeTime: function() {
			this.video.currentTime = this.newTime;
		},
		// ChangeMute: function() {
		// 	this.isMuted = !this.isMuted;
		// 	this.$emit("audio-button-event", this.isMuted);
		// },
		ChangePlaying: function() {
			this.isPlaying = !this.isPlaying;
			this.$emit("play-button-event", this.isPlaying);
		},

		TimeToPercentage: function(time) {
			if (this.video === undefined) return;
			return (time / this.duration) * 100;
		},
		PercentageToTime: function(percentage) {
			return percentage * this.duration;
		}
	},
	props: {
		visibility: {
			type: Boolean,
			required: true,
			default: false
		},
		video: {
			required: true
		},
		currentTime: {
			required: true
		},
		duration: {
			required: true
		},
		buffered: {
			required: true
		}
	},
	computed: {
		currentTimeFormated: function() {
			if (this.video === undefined) return;
			let minutesPart = Math.floor(this.currentTime % 60);

			return (
				Math.floor(this.currentTime / 60) +
				":" +
				minutesPart.toLocaleString("en-US", { minimumIntegerDigits: 2 })
			);
		},
		durationTimeFormated: function() {
			if (this.video === undefined) return;
			let minutesPart = Math.floor(this.duration % 60);

			return (
				Math.floor(this.duration / 60) +
				":" +
				minutesPart.toLocaleString("en-US", { minimumIntegerDigits: 2 })
			);
		},
		newTimeFormated: function() {
			let minutesPart = Math.floor(this.newTime % 60);

			return (
				Math.floor(this.newTime / 60) +
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