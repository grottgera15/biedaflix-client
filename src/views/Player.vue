<template>
	<div
		class="video-wrapper"
		ref="wrapper"
		@mousemove="OnMouseMoved"
		:class="{'hide-cursor': !visualElements.visibility}"
	>   
        <TopMenu :visibility="visualElements.visibility"/>
        <SharePopUp @close-pop-up="popups.share = false" v-show="popups.share === true"/>
		<div class="waiting-screen" v-show="!player.source.isReady" />
		<video
			preload="auto"
			name="media"
			kind="captions"
			ref="video"
			@timeupdate="OnTimeUpdated"
			@durationchange="OnDurationChanged"
			@canplay="OnCanPlay"
			@pause="OnPause"
			@play="OnPlay"
			@playing="OnPlaying"
			@waiting="OnWaiting"
			@click="OnVideoSingleClicked"
			:currentTime="player.currentTimeStamp"
			:class="{'video-buffering' : player.isWaitingToBuffer}"
		>
			<source :src="player.source.url" type="video/mp4" />Your browser does not support the video tag.
		</video>
		<div
			class="subtitles-wrapper"
			:class="{'subtitles-wrapper-menu-visible': visualElements.visibility,
            'video-buffering': player.isWaitingToBuffer}"
		>
			<p>
				Lorem ipsum dolor sit amet, 
				<br />consectetur adipiscing elit.
			</p>
		</div>
        <ControlsMenu 
            :video="$refs.video"
            
            :currentTimeStamp="player.currentTimeStamp"
            :duration="player.source.duration"
            :buffered="player.source.buffered"
            :isPlaying="player.isPlaying"

            :visibility="visualElements.visibility"

            @state-change="OnStateChange"
            @time-change="OnTimeChange"
            @volume-change="OnVolumeChange"
        />
	</div>
</template>
<script>
import ControlsMenu from "../components/Player/ControlsMenu.vue";
import TopMenu from "../components/Player/TopMenu.vue";
import SharePopUp from "../components/Player/SharePopUp.vue";


export default {
	name: "Player",
	data: function() {
		return {
            player: {
                source: {
                    url: "http://maksymilianlakomy.pl/MandalorianS01E02.mp4#t=200",
                    isReady: false,
                    duration: null,
                    buffered: []
                },
                currentTimeStamp: null,
                isPlaying: false,
                isWaitingToBuffer: false
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
        ControlsMenu,
        TopMenu,
        SharePopUp
    },
	methods: {
        // Player controlling events
        OnStateChange: function(state) {
            this.player.isPlaying = state;
            if (this.player.isPlaying)
                this.$refs.video.play();
            else
                this.$refs.video.pause();
        },
        OnTimeChange: function(time) {
            this.$refs.video.currentTime = time;
        },
        OnVolumeChange: function(audioVolume) {
            this.$refs.video.volume = audioVolume;
        },

        // Player original events
		OnCanPlay: function() {
            this.player.source.isReady = true;
			this.$refs.video.play();
		},
		OnPlay: function() {
			this.player.isPlaying = true;
			this.player.isWaitingToBuffer = false;
		},
		OnPlaying: function() {
            this.player.isPlaying = true;
			this.player.isWaitingToBuffer = false;
        },
        OnPause: function() {
			this.player.isPlaying = false;
		},
		OnWaiting: function() {
			this.player.isWaitingToBuffer = false;
        },
		OnDurationChanged: function() {
			this.player.source.duration = this.$refs.video.duration;
		},
		OnTimeUpdated: function() {
            this.player.currentTimeStamp = this.$refs.video.currentTime;
            
            this.CheckInactivity(event); // Move out
            this.CheckBuffered(event); // Move out
        },
        
        // Non-standard player controllers
		OnVideoSingleClicked: function() {
            if (this.player.isPlaying) 
                this.$refs.video.pause();
            else
                this.$refs.video.play();
        },

        // Player bottom menu visibility
		OnMouseMoved: function() {
			this.mouse.lastMovementTime = Date.now();
		},

		CheckInactivity: function() {
			this.visualElements.visibility =
				Date.now() < this.mouse.lastMovementTime + 2 * 1000;
        },
        
        // Grab buffering elements from player
		CheckBuffered: function() {
			let buffered = this.$refs.video.buffered;
			let bufferedArray = [];
			for (let i = 0; i < buffered.length; i++) {
				bufferedArray.push({
					start: buffered.start(i),
					end: buffered.end(i)
				});
			}
			this.player.source.buffered = bufferedArray;
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
