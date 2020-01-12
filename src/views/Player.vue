<template>
	<div
		class="video-wrapper"
		ref="wrapper"
		@mousemove="OnMouseMoved"
		:class="{'hide-cursor': !visualElements.visibility}"
	>   
        <TopMenu :visibility="visualElements.visibility"/>
        <SharePopUp @close-pop-up="popups.share = false" v-show="popups.share === true"/>
		<div class="waiting-screen" v-show="!video.canPlay" />
		<video
			preload="auto"
			name="media"
			kind="captions"
			ref="video"
            muted
			@timeupdate="OnTimeUpdated"
			@durationchange="OnDurationChanged"
			@canplay="OnCanPlay"
			@pause="OnPause"
			@play="OnPlay"
			@playing="OnPlaying"
			@waiting="OnWaiting"
			@click="OnVideoSingleClicked"
			:currentTime="video.currentTime"
			:class="{'video-buffering' : video.waiting}"
		>
			<source src="http://maksymilianlakomy.pl/MandalorianS01E02.mp4#t=200" type="video/mp4" />Your browser does not support the video tag.
		</video>
		<div
			class="subtitles-wrapper"
			:class="{'subtitles-wrapper-menu-visible': visualElements.visibility,
            'video-buffering': video.waiting}"
		>
			<p>
				Test test lorem ipsum
				<br />test test.
			</p>
		</div>
        <BottomMenu 
            :video="$refs.video"
            :currentTime="video.currentTime"
            :duration="video.duration"
            :buffered="video.buffered"
            :visibility="visualElements.visibility"

            @audio-button-event="OnAudioButton"
            @play-button-event="OnPlayButton"
        />
	</div>
</template>
<script>
import BottomMenu from "../components/Player/BottomMenu.vue";
import TopMenu from "../components/Player/TopMenu.vue";
import SharePopUp from "../components/Player/SharePopUp.vue";

export default {
	name: "Player",
	data: function() {
		return {
			video: {
				duration: null,
				currentTime: null,
				// newTime: null,
				canPlay: false,
				buffered: [],
				playing: false,
				waiting: false,
				audioVolume: 1
			},
			visualElements: {
				visibility: false
			},
			mouse: {
				lastMovementTime: Date.now()
			},
            subtitles: [],
            popups: {
                share: false
            }
		};
    },
    components: {
        BottomMenu,
        TopMenu,
        SharePopUp
    },
	methods: {
        OnAudioButton: function(event) {
            console.log(event);
        },
        OnPlayButton: function(event) {
            console.log(event);
        },
		OnCanPlay: function(event) {
			this.video.canPlay = true;
			event.srcElement.play();
		},
		OnPause: function() {
			this.video.playing = false;
		},
		OnPlay: function() {
			this.video.playing = true;
			this.video.waiting = false;
		},
		OnPlaying: function() {
			this.video.playing = true;
			this.video.waiting = false;
		},
		OnWaiting: function() {
			this.video.waiting = true;
		},
		OnDurationChanged: function(event) {
			this.video.duration = event.srcElement.duration;
		},
		OnMouseMoved: function() {
			this.mouse.lastMovementTime = Date.now();
		},
		OnTimeUpdated: function(event) {
			this.video.currentTime = event.srcElement.currentTime;
            this.CheckInactivity(event);
            this.CheckBuffered(event);
		},
		OnVideoSingleClicked: function(event) {
			if (this.video.playing) event.srcElement.pause();
			else event.srcElement.play();
        },
		CheckInactivity: function() {
			this.visualElements.visibility =
				Date.now() < this.mouse.lastMovementTime + 2 * 1000;
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
			this.video.buffered = bufferedArray;
		}
	}
};
</script>

<style scoped lang="sass">
@import "../styles/variables.sass"

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

    .video-buffering
        opacity: 0.5
        transition-duration: 0.1s
        filter: blur(5px)

    .subtitles-wrapper
        position: absolute
        bottom: 64px
        width: 100%
        text-align: center
        transition-duration: 0.5s
        pointer-events: none
        
        p
            font-family: 'Roboto Slab', serif
            font-size: 28pt
            letter-spacing: .5pt
            text-shadow: 0px 0px 4px black, 0px 0px 10px black
            line-height: 36pt
            cursor: unset

    .subtitles-wrapper-menu-visible
        bottom: 128px

</style>
