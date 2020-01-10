<template>
	<div class="menu-wrapper">
		<transition name="slide-bottom">
			<div class="menu"
                v-show="visibility">
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
						<div class="left">
							<div
								class="button"
                                @click="ChangePlaying()"
								@mouseover="OnMouseOverButton('playing')"
								@mouseleave="OnMouseLeftButton()"
							>
								<img
									src="../../files/menu/SVG/playButton.svg"
									:class="{'img-hover': mouse.currentButton=='playing'}"
								/>
							</div>
							<div
								class="button"
								@mouseover="OnMouseOverButton('audio')"
								@click="ChangeMute()"
								@mouseleave="OnMouseLeftButton()"
							>
								<img
									src="../../files/menu/SVG/audioButton.svg"
									:class="{'img-hover': mouse.currentButton=='audio'}"
								/>
								<div class="audio-popup-wrapper" v-show="mouse.currentButton=='audio'">
									<div class="bar-volume" @click="ChangeVolume">
										<div class="bar-volume-fill" :style="{width: (audioVolume*100) + '%'}" />
									</div>
								</div>
							</div>

							<div class="current-time">{{currentTimeFormated}} / {{durationTimeFormated}}</div>
						</div>
						<div class="right">
							<div
								class="button"
								@mouseover="OnMouseOverButton('subtitles')"
								@mouseleave="OnMouseLeftButton()"
							>
								<img
									src="../../files/menu/SVG/subtitlesButton.svg"
									:class="{'img-hover': mouse.currentButton=='subtitles'}"
								/>

								<div class="subtitles-popup-wrapper" v-show="mouse.currentButton=='subtitles'">
									<div class="subtitles-popup">Napisy</div>
								</div>
							</div>
							<div
								class="button"
								@mouseover="OnMouseOverButton('full-screen')"
								@mouseleave="OnMouseLeftButton()"
							>
								<img
									src="../../files/menu/Full Screen Button.svg"
									:class="{'img-hover': mouse.currentButton=='full-screen'}"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: "BottomMenu",
	data() {
		return {
			mouseOnBar: false,
            newTime: null,
            isMuted: true,
            isPlaying: true,
            audioVolume: 1,
            info: {

            },
			mouse: {
				currentbutton: null
			}
		};
	},
	methods: {
		OnMouseOverButton: function(buttonName) {
			this.mouse.currentButton = buttonName;
		},
		OnMouseLeftButton: function() {
			this.mouse.currentButton = null;
		},
		OnMouseOverBar: function(event) {
			let boundingClientRect = event.srcElement.getBoundingClientRect();
			let mousePositionPercentage =
				(event.clientX - boundingClientRect.left) /
				boundingClientRect.width;
			this.newTime = this.PercentageToTime(mousePositionPercentage);
		},

		ChangeVolume: function(event) {
			let boundingClientRect = event.srcElement.getBoundingClientRect();
			this.audioVolume =
				(event.clientX - boundingClientRect.left) /
				boundingClientRect.width;
			// this.$refs.video.volume = this.audioVolume;
		},
		ChangeTime: function() {
			this.video.currentTime = this.newTime;
		},
		ChangeMute: function() {
            this.isMuted = !this.isMuted;
            this.$emit("audio-button-event", this.isMuted);
        },
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
.img-hover
    transform: scale(1.25) 
    opacity: 1 !important

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
                    
                    .button
                        height: 32px
                        position: relative
                        cursor: pointer
                        img 
                            position: absolute
                            opacity: 0.75
                            width: 32px

                .right
                    justify-content: right
                    grid-column-start: right
                    
                .audio-popup-wrapper
                    position: relative
                    bottom: 0
                    height: inherit
                    width: calc(75px + 24px + 16px)
                    overflow: hidden

                    .bar-volume
                        float: right
                        position: relative
                        width: 75px
                        height: 4px
                        background-color: #ffffff40
                        top: 50%
                        transform: translateY(-50%)

                        .bar-volume-fill
                            position: absolute
                            top: 0
                            left: 0
                            width: 50%
                            height: inherit
                            background-color: white
                            pointer-events: none
                            
                .subtitles-popup-wrapper
                    position: absolute
                    bottom: 100%
                    width: auto
                    height: auto
                    padding-bottom: 16px
                    right: -100%

                    .subtitles-popup
                        position: relative
                        height: 150px
                        width: 100px
                        background-color: #151515
                        border-radius: 4px
                        padding: 16px 24px                    


.slide-bottom-enter-active, .slide-bottom-leave-active 
    transition-duration: 0.5s
    opacity: 1
    transform: TranslateY(0%)

.slide-bottom-enter, .slide-bottom-leave-to
    transition-duration: 0.5s
    opacity: 0
    transform: TranslateY(25%)

</style>