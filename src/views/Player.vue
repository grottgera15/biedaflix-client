<template>
	<div class="video-wrapper" ref="wrapper">
		<video autoplay preload="auto" name="media" kind="captions" ref="player" muted>
			<source src="http://maksymilianlakomy.pl/MandalorianS01E02.mp4#t=500" type="video/mp4" />Your browser does not support the video tag.
		</video>
		<div class="menu-wrapper">
            <transition name="slide-bottom">
			<div class="menu" v-show="bottomMenu"></div>
            </transition>
		</div>
	</div>
</template>
<script>
export default {
    name: "Player",
    data: function() {
        return {
            bottomMenu: false
        }
    },
    methods: {
        HideOnInactivity: function() {
            this.bottomMenu = false;
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
            width: 100%
            height: 128px
            z-index: 999999
            &:before    
                content: " "
                position: absolute
                bottom: 0
                width: 100%
                height: 196px
                background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)
                z-index: 900000
            .progress-bar
                

.slide-bottom-enter-active, .slide-bottom-leave-active 
    transition-duration: 0.5s
    opacity: 1
    transform: TranslateY(0%)

.slide-bottom-enter, .slide-bottom-leave-to
    transition-duration: 0.5s
    opacity: 0
    transform: TranslateY(100%)


</style>
