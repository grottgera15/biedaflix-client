<template>
	<div class="video-wrapper" ref="wrapper" @mousemove="OnMouseMoved" :class="{'hide-cursor': !visualElements.visibility}">
		<div class = "waiting-screen" v-show="!this.info.canPlay"/>
		<video
			preload="auto"
			name="media"
			kind="captions"
			ref="video"
			muted
			@timeupdate="OnTimeUpdated"
			@durationchange="OnDurationChanged"
			@canplay="OnCanPlay"
			:currentTime="info.currentTime"
		>
			<source src="http://maksymilianlakomy.pl/SeeS01E01.mp4#t=200" type="video/mp4" />Your browser does not support the video tag.
		</video>
		<div
			class="subtitles-wrapper"
			:class="{'subtitles-wrapper-menu-visible': visualElements.visibility}"
		>
			<p>
				Test test lorem ipsum
				<br />test test.
			</p>
		</div>
		<div class="menu-wrapper">
			<transition name="slide-bottom">
				<div class="menu" v-show="visualElements.visibility">
					<div class="wrapper">
						<div
							class="progress-bar"
							@mouseenter="visualElements.onBar = true"
							@mouseleave="visualElements.onBar = false"
							@mousemove="OnMouseOverBar"
							@click="ChangeTime"
						>
							<div class="bar" :class="{'bar-full-size': visualElements.onBar}">
								<div
									class="bar-buffered"
									v-for="(buffer, i) in info.buffered"
									:key="i"
									:style="{left: TimeToPercentage(buffer.start) + '%',
                                        right: (100-TimeToPercentage(buffer.end)) + '%'}"
								/>
								<div class="bar-current-time" :style="{width: TimeToPercentage(info.currentTime) + '%'}" />
							</div>
						</div>
						<div class="buttons">
							<div class="left">
								<div class="button">
									<img src="../files/menu/Start Button.svg" />
								</div>
							</div>
							<div class="right">
								<div class="button">
									<img src="../files/menu/Subtitles Button.svg" />
								</div>
                                <div class="button">
									<img src="../files/menu/Full Screen Button.svg" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
export default {
	name: "Player",
	data: function() {
		return {
			info: {
				duration: null,
				currentTime: null,
				newTime: null,
				canPlay: false,
				buffered: []
			},
			visualElements: {
				visibility: false,
				onBar: false
			},
			mouse: {
				lastMovementTime: Date.now()
			},
			subtitles: []
		};
	},
	methods: {
		OnCanPlay: function(event) {
			this.info.canPlay = true;
			event.srcElement.play();
		},
		OnPause: function() {
			
		},
		OnPlay: function() {

		},
		OnPlaying: function() {

		},
		OnDurationChanged: function(event) {
			this.info.duration = event.srcElement.duration;
		},
		OnMouseMoved: function() {
			this.mouse.lastMovementTime = Date.now();
		},
		OnTimeUpdated: function(event) {
			this.info.currentTime = event.srcElement.currentTime;
			this.CheckInactivity(event), this.CheckBuffered(event);
		},
		OnMouseOverBar: function(event) {
			let boundingClientRect = event.srcElement.getBoundingClientRect();
			let mousePositionPercentage =
				(event.clientX - boundingClientRect.left) /
				boundingClientRect.width;
			this.info.newTime = this.PercentageToTime(mousePositionPercentage);
		},
		ChangeTime: function() {
			this.$refs.video.currentTime = this.info.newTime;
		},
		CheckInactivity: function() {
			this.visualElements.visibility =
				Date.now() < this.mouse.lastMovementTime + 3 * 1000;
		},
		CheckBuffered: function(event) {
			let buffered = event.srcElement.buffered;
			let bufferedArray = [];
			for (let i = 0; i < buffered.length; i++) {
				bufferedArray.push({
					start: buffered.start(i),
					end: buffered.end(i)
				});
			}
			this.info.buffered = bufferedArray;
		},
		TimeToPercentage: function(time) {
			return (time / this.info.duration) * 100;
		},
		PercentageToTime: function(percentage) {
			return percentage * this.info.duration;
		}
	}
};
</script>

<style scoped lang="sass">

.hide-cursor
    cursor: none

.video-wrapper
    position: relative
    overflow: hidden
    width: 100vw
    height: 100vh

    .waiting-screen
        position: absolute
        width: 100%
        height: 100%
        background-color: black
        z-index: 9999999999
        cursor: default

    video
        background-color: black
        margin: auto
        object-fit: contain
        width: 100%
        height: 100%

    .menu-wrapper
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        .menu
            bottom: 0
            position: absolute
            width: calc(100% - 2*64px)
            height: 64px
            padding: 48px 64px
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
                            background-color: #f86356
                    .bar-full-size
                        margin: 10px 0
                        height: 8px
                .buttons
                    display: grid
                    grid-template-columns: [left] 1fr [right] 1fr
                    height: 24px
                    padding: 8px 0
                    .left, 
                    .right
                        grid-column-start: left
                        grid-template-columns: repeat( auto-fit, minmax(24px, 36px) )
                        grid-column-gap: 8px
                        display: grid
                        align-items: center
                        .button
                            width: 24px
                            height: 24px
                            cursor: pointer
                            transition-duration: 0.2s
                            opacity: 0.75
                            &:hover
                                transform: scale(1.25)
                                opacity: 1
                    .right
                        justify-content: right
                        grid-column-start: right
                    

    .subtitles-wrapper
        position: absolute
        bottom: 64px
        width: 100%
        text-align: center
        cursor: unset
        transition-duration: 0.5s
        letter-spacing: 1px
        p
            font-family: 'Roboto Slab', serif
            font-size: 28pt
            text-shadow: 0px 0px 4px black, 0px 0px 10px black
    .subtitles-wrapper-menu-visible
        bottom: 128px



.slide-bottom-enter-active, .slide-bottom-leave-active 
    transition-duration: 0.5s
    opacity: 1
    transform: TranslateY(0%)

.slide-bottom-enter, .slide-bottom-leave-to
    transition-duration: 0.5s
    opacity: 0
    transform: TranslateY(25%)


</style>
