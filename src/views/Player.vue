<template>
	<div
		class="video-wrapper"
		ref="wrapper"
		@mousemove="OnMouseMoved"
		:class="{'hide-cursor': !visualElements.visibility}"
	>
		<SettingsPopUp/>
		<!-- <SharePopUp @close-pop-up="popups.share = false" v-show="popups.share === true"/> -->
		<div class="waiting-screen" v-show="!isReady" />
		<video
			preload="auto"
			name="media"
			kind="captions"
			ref="video"
            muted
			@timeupdate="OnTimeUpdated"
			@durationchange="OnDurationChanged"
			@canplay="OnCanPlay"
			@canplaythrough="OnCanPlayThrough"
			@pause="OnPause"
			@play="OnPlay"
			@playing="OnPlaying"
			@waiting="OnWaiting"
			@click="OnVideoSingleClicked"
			:class="{'video-buffering' : this.isWaitingForBuffer}"
		>
			<source :src="source" type="video/mp4" />Your browser does not support the video tag.
		</video>
		<div
			class="subtitles-wrapper"
			:class="{'subtitles-wrapper-menu-visible': visualElements.visibility,
            'video-buffering': this.isWaitingForBuffer}"
		>
			<p>
				Lorem ipsum dolor sit amet,
				<br />consectetur adipiscing elit.
			</p>
		</div>
        <TopMenu :visibility="visualElements.visibility" />
        <ChatWindow v-show="false"/>
		<ControlsMenu :visibility="visualElements.visibility" />
	</div>
</template>
<script>
import ControlsMenu from "../components/Player/ControlsMenu.vue";
import ChatWindow from "../components/Player/ChatWindow.vue";
import TopMenu from "../components/Player/TopMenu.vue";
// import SharePopUp from "../components/Player/SharePopUp.vue";
import SettingsPopUp from "../components/Player/SettingsPopUp.vue";

import Mutations from "../vuex/PlayerMutations.js";
import playerMixin from "../components/Mixins/playerMixin.js";
// import { PlayerEventBus } from "../PlayerEventBus.js";


export default {
	name: "Player",
	data: function() {
		return {
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
        ChatWindow,
        TopMenu,
        SettingsPopUp
		// SharePopUp
    },
    // mounted: function(){
    //     PlayerEventBus.$on("CurrentTimeChanged", (newTime) => {
    //         this.$refs.video.currentTime = newTime;
    //     })
    // },
	methods: {
		// Player original events
		OnCanPlay: function() {
			this.$store.commit(Mutations.ReadinessSet, true);
			this.$store.commit(Mutations.PendingSet, false);
			// this.$refs.video.play();
		},
		OnCanPlayThrough: function() {
			this.$store.commit(Mutations.PendingSet, false);
		},
		OnPlay: function() {
			if (this.isPlaying != true)
				this.$store.commit(Mutations.PlayerStateSet, true);
			this.$store.commit(Mutations.PendingSet, false);
		},
		OnPlaying: function() {
			if (this.isPlaying != true)
				this.$store.commit(Mutations.PlayerStateSet, true);
			this.$store.commit(Mutations.PendingSet, false);
		},
		OnPause: function() {
			if (this.isPlaying != false)
				this.$store.commit(Mutations.PlayerStateSet, false);
		},
		OnWaiting: function() {
			this.$store.commit(Mutations.PendingSet, true);
		},
		OnDurationChanged: function() {
			this.$store.commit(
				Mutations.DurationSet,
				this.$refs.video.duration
			);
		},
		OnTimeUpdated: function() {
			this.$store.commit(
				Mutations.CurrentTimeSet,
				this.$refs.video.currentTime
			);

			this.CheckInactivity(event); // Move out
			this.CheckBuffered(event); // Move out
		},

		// Non-standard player controllers
		OnVideoSingleClicked: function() {
           this.$store.commit(Mutations.PlayerStateSet, !this.isPlaying);
		},

		// Player bottom menu visibility
		OnMouseMoved: function() {
			this.mouse.lastMovementTime = Date.now();
		},

		CheckInactivity: function() {
			this.visualElements.visibility =
				Date.now() < this.mouse.lastMovementTime + 2 * 1000;
		},

		// Grab buffered time stamps from player
		CheckBuffered: function() {
			let buffered = this.$refs.video.buffered;
			let bufferedArray = [];
			for (let i = 0; i < buffered.length; i++) {
				bufferedArray.push({
					start: buffered.start(i),
					end: buffered.end(i)
				});
			}
			this.$store.commit(Mutations.BufferedSet, bufferedArray);
		}
	},
	mixins: [
        playerMixin
    ],
	watch: {
		isPlaying: function() {
			if (this.isPlaying) this.$refs.video.play();
			else this.$refs.video.pause();
        },
        newTime: function() {
            this.$refs.video.currentTime = this.newTime;
            this.$store.commit(Mutations.CurrentTimeSet, this.newTime);
        },
        isReady: function() {
            if (this.isReady)
                this.$refs.video.play();
            else
                this.$refs.video.pause();
        },
        volume: function() {
            this.$refs.video.volume = this.volume;
        },
        fullscreen: function() {
            if (this.fullscreen)
                this.$refs.wrapper.requestFullscreen();
            else
                document.exitFullscreen();
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
