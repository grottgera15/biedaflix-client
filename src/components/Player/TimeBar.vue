<template>
	<div
		class="time-bar"
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
</template>

<script>
import playerMixin from "../Mixins/playerMixin.js";
import { PlayerEventBus } from "../../PlayerEventBus.js";

export default {
    name: "TimeBar",
    data() {
        return {
            mouseOnBar: false,
            newTime: 0
        }
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
		TimeChange: function(newTime) {
			PlayerEventBus.$emit("CurrentTimeChanged", newTime);
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
        bottom: 32px
        opacity: 0.75
        transform: translateX(-50%)
        pointer-events: none

    .bar-full-size
        margin: 10px 0
        height: 8px
</style>