<template>
	<transition name="audio-bar">
		<div class="audio-bar-wrapper">
			<div class="bar-volume" >
				<div class="bar-volume-fill"/>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: "AudioBar",
	data() {
		return {};
	}
};
</script>

<style lang="sass" scoped>
.audio-bar-enter-active, .audio-bar-leave-active
    transition-duration: .2s
    max-width: calc(75px + 8px)

.audio-bar-enter, .audio-bar-leave-to
    transition-duration: .2s
    max-width: 0px
    
.audio-bar-wrapper
    display: inline-block
    position: relative
    bottom: 0
    height: inherit
    width: calc(75px + 8px)
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
</style>