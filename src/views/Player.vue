<template>
	<div class="video-wrapper" ref="wrapper" @mousemove="OnMouseMoved">
		<video
			autoplay
			preload="auto"
			name="media"
			kind="captions"
			ref="video"
			muted
			@timeupdate="OnTimeUpdated"
			@durationchange="OnDurationChanged"
            :currentTime="info.currentTime"
		>
			<source src="http://maksymilianlakomy.pl/SeeS01E01.mp4#t=200" type="video/mp4" />Your browser does not support the video tag.
		</video>
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
                                <div class = "bar-current-time" :style="{width: TimeToPercentage(info.currentTime) + '%'}"/>
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
				buffered: []
			},
			visualElements: {
				visibility: false,
				onBar: false
			},
			mouse: {
				lastMovementTime: Date.now()
			}
		};
	},
	methods: {
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
            let mousePositionPercentage = (event.clientX - boundingClientRect.left) / boundingClientRect.width;
            console.log(mousePositionPercentage);
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
            background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)
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
                        background-color: white
                        position: absolute
                        transition-duration: 0.15s
                        pointer-events: none
                        .bar-buffered
                            height: inherit
                            position: absolute
                            background-color: darkgray
                        .bar-current-time
                            height: inherit
                            position: absolute
                            left: 0
                            background-color: red
                    .bar-full-size
                        margin: 10px 0
                        height: 8px
                

.slide-bottom-enter-active, .slide-bottom-leave-active 
    transition-duration: 0.5s
    opacity: 1
    transform: TranslateY(0%)

.slide-bottom-enter, .slide-bottom-leave-to
    transition-duration: 0.5s
    opacity: 0
    transform: TranslateY(25%)


</style>
