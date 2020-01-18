<template>
	<div
		class="time-bar"
		@mouseenter="mouseOnBar = true"
		@mouseleave="mouseOnBar = false, mouseDragging = false"
		@mousemove="OnMouseOverBar($event)"
        @click="TimeChange($event)"
		@mousedown="mouseDragging = true"
		@mouseup="mouseDragging = false"
	>
		<div
			class="bar-mouse-over-popup"
			v-show="mouseOnBar"
			:style="{'left': (TimeToPercentage(newTime) + '%')}"
			
		>   
            <div class = "time" v-html="TimeFormatted(newTime)" />
			<img :src="ThumbnailURL" />
		</div>
		<div class="bar" :class="{'bar-full-size': mouseOnBar}">
			<div
				class="bar-buffered"
				v-for="(buffer, i) in buffered"
				:key="i"
				:style="{left: TimeToPercentage(buffer.start) + '%',
                                        right: (100-TimeToPercentage(buffer.end)) + '%'}"
			/>
			<div class="bar-current-time" :style="{width: TimeOnBar + '%'}" />
		</div>
	</div>
</template>

<script>
import playerMixin from "../Mixins/playerMixin.js";
import { PlayerEventBus } from "../../PlayerEventBus.js";

export default {
	name: "TimeBar",
	data() {
		return {
			mouseOnBar: false,
			mouseDragging: false,
			newTime: 0,
			currentTimeUpdated: 0
		};
	},
	mixins: [playerMixin],
	methods: {
		OnMouseOverBar: function(event) {
			let boundingClientRect = event.srcElement.getBoundingClientRect();
			let mousePositionPercentage =
				(event.clientX - boundingClientRect.left) /
				boundingClientRect.width;
			this.newTime = this.PercentageToTime(mousePositionPercentage);
		},
		TimeChange: function() {
            PlayerEventBus.$emit("CurrentTimeChanged", this.newTime);
		}
	},
	computed: {
		TimeOnBar: function() {
			if (this.mouseDragging) return this.TimeToPercentage(this.newTime);
			else return this.TimeToPercentage(this.currentTime);
		},
		ThumbnailURL: function() {
			let time = Math.round(this.newTime / 10 + 1).toString();
			while (time.length < 4) time = "0" + time;
			return require(`../../files/images/thumbs/thumb${time}.jpg`);
		}
	}
};
</script>

<style lang="sass" scoped>
@import "../../styles/variables.sass"  

.time-bar
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
        bottom: 48px
        transform: translateX(-50%)
        pointer-events: none
        
        img
            box-shadow: 0 2px 8px 000000AA
            border-radius: 4px
            display: block
            width: 240px

        .time
            position: absolute
            width: 100%
            text-align: center
            bottom: 8px
            font-weight: 700
            letter-spacing: 1px
            text-shadow: 0px 2px 5px black

    .bar-thumb
        position: absolute
        bottom: 64px
        width: 160px
        pointer-events: none



    .bar-full-size
        margin: 10px 0
        height: 8px
</style>