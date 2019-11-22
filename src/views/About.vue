<template>
	<div class="video-wrapper" ref="wrapper">
		<video
			autoplay
			preload="auto"
			name="media"
			kind="captions"
			ref="player"
			@timeupdate="[TimeUpdate(), DisplaySubtitles()]"
			@durationchange="DurationChange()"
		>
			<!-- <source src="http://maksymilianlakomy.pl/RickAndMortyS04E02.mkv" type="video/mp4" />Your browser does not support the video tag. -->
			<source :src="'http://maksymilianlakomy.pl/' + $route.params.sources" type="video/mp4" />Your browser does not support the video tag.
		</video>
		<transition name="fade">
			<div class="new-time" v-show="playerSettings.progressBar.canShowTime">
				<div class="text">
					<span>{{Math.floor(playerSettings.progressBar.mousePositionTime/60)}} : {{playerSettings.progressBar.mousePositionTime %60}}</span>
				</div>
			</div>
		</transition>
		<div class="subtitles" :class="[Date.now() >= (mouseMovedTime + 3000) ? '' : 'subtitles-default']">
			<p v-for="(sub, i) in subs" :key="i" v-html="sub.text" v-show="sub.display" >
			</p>
		</div>
		<div class="video-controls" v-show="Date.now() <= (mouseMovedTime + 3000)">
			<div class="menu-wrapper">
				<div
					class="progress-bar"
					@mousemove="SetNewTime"
					@click="ChangeTime()"
					@mouseenter="playerSettings.progressBar.canShowTime = true"
					@mouseleave="playerSettings.progressBar.canShowTime = false"
					ref="progressBar"
				>
					<div class="progress-bar-fill" :style="{'width': percentageTime}"></div>
				</div>
				<div class="button-menu-left">
					<div class="button" @click="ActivatePlayer()">
						<img v-show="playerSettings.isPlaying" src="../files/menu/Start Button.svg" />
						<img v-show="!playerSettings.isPlaying" src="../files/menu/Stop Button.svg" />
					</div>
					<div class="button" @click="ChangeVolume()">
						<img v-show="playerSettings.volume > 0" src="../files/menu/audio100Button.svg" />
						<img v-show="playerSettings.volume == 0" src="../files/menu/audioStopButton.svg" />
					</div>
				</div>
				<div class="button-menu-right">
					<div class="button" @click="SetFullScreen()">
						<img src="../files/menu/Full Screen Button.svg" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data: function() {
		return {
			playerSettings: {
				currentTime: 0,
				currentDuration: 0,
				isPlaying: false,
				volume: 1,
				progressBar: {
					mousePositionTime: 0,
					canShowTime: false
				}
            },
            subs: null,
			mouseMovedTime: Date.now()
		};
	},
	methods: {
		TimeUpdate: function() {
			this.playerSettings.currentTime = this.$refs.player.currentTime;
		},
		DisplaySubtitles: function() {
			for (let sub of this.subs) {
				if (
					this.playerSettings.currentTime >= sub.start &&
					this.playerSettings.currentTime <= sub.end
				) {
					sub.display = true;
				} else {
					sub.display = false;
				}
			}
		},
		DurationChange: function() {
			this.playerSettings.currentDuration = this.$refs.player.duration;
		},
		SetNewTime: function(event) {
			let boundingClient = this.$refs.progressBar.getBoundingClientRect();
			this.playerSettings.progressBar.mousePositionTime = Math.round(
				((event.clientX - boundingClient.left) /
					(boundingClient.right - boundingClient.left)) *
					this.playerSettings.currentDuration
			);
		},
		ChangeTime: function() {
			this.$refs.player.currentTime = this.playerSettings.progressBar.mousePositionTime;
		},
		ActivatePlayer: function() {
			this.playerSettings.isPlaying = !this.playerSettings.isPlaying;
			if (this.playerSettings.isPlaying) this.$refs.player.pause();
			else this.$refs.player.play();
		},
		ChangeVolume: function() {
			if (this.playerSettings.volume > 0) this.playerSettings.volume = 0;
			else this.playerSettings.volume = 1;
			this.$refs.player.volume = this.playerSettings.volume;
		},
		SetFullScreen: function() {
			if (!document.fullscreenElement)
				this.$refs.wrapper.requestFullscreen();
			else document.exitFullscreen();
		}
	},
	mounted() {
		// Listeners setup.
		window.addEventListener("keydown", event => {
			if (event.code == "Space") {
				this.ActivatePlayer();
			}
		});
		window.addEventListener("mousemove", () => {
			this.mouseMovedTime = Date.now();
        });
        this.subs = require("../files/" + this.$route.params.pathSubs);
    },
    params: [
        "sources", "pathSubs"
    ],
	computed: {
		percentageTime: function() {
			return (
				(this.playerSettings.currentTime /
					this.playerSettings.currentDuration) *
					100 +
				"%"
			);
		}
	}
};
</script>

<style scoped lang="sass">

.video-wrapper
    position: relative
    overflow: hidden
    width: 100vw
    height: 100vh

    video
        background-color: black
        margin: auto
        object-fit: contain
        width: 100%
        height: 100%

    .subtitles
        width: 100%
        height: min-content
        position: absolute
        bottom: 64px
        text-align: center
        text-shadow: 0px 2px 18px black
        font-size: 30pt
        font-weight: 700
        transition-duration: 0.2s
        @media screen and (max-width: 740px)
            font-size: 24pt
            bottom: 32px
        @media screen and (max-width: 568px)
            font-size: 18pt

    .subtitles-default
        bottom: 96px

    .new-time
        position: absolute
        top: 64px
        width: 100%
        .text 
            margin: auto
            text-align: center
            font-size: 48pt
            font-weight: 700
            text-shadow: 0 0px 8px black

    .video-controls
        position: absolute
        bottom: 0
        height: fit-content
        width: 100%
        &:before
            content: ""
            position: absolute
            bottom: 0
            height: 128px
            width: 100%
            background: linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)
        .menu-wrapper 
            position: relative
            width: calc(100% - 64px)
            margin: 24px 32px
            .progress-bar
                width: 100%
                height: 4px
                background-color: #181818
                transition-duration: 0.2s
                &:hover
                    height: 8px
                    margin-top: -2px
                    cursor: pointer
                .progress-bar-buffered
                    position: absolute
                    height: inherit
                    background-color: red
                .progress-bar-fill
                    position: absolute
                    height: inherit
                    width: 100%
                    background-color: white
            .button-menu-left
                float: left
                margin: 32px 16px

            .button-menu-right
                margin: 32px 16px
                float: right

            .button
                margin-right: 24px
                display: inline-block
                width: min-content
                transition-duration: 0.3s
                opacity: 0.75
                img
                    height: 24px
                &:hover
                    transform: scale(1.2)
                    opacity: 1
                    cursor: pointer

.fade-enter-active, .fade-leave-active 
    transition: opacity .2s
        
.fade-enter, .fade-leave-to 
    opacity: 0
</style>
