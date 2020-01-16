<template>
	<div class="menu-wrapper">
		<transition name="slide-bottom">
			<div class="menu" v-show="visibility">
				<div class="wrapper">
                    <TimeBar />
					<ControllerButtonsBar />
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
// import PlayerMenuButton from "./PlayerMenuButton.vue";
import ButtonEvent from "../../classes/ButtonEvent.js";
// import AudioBar from "./AudioBar.vue";

import TimeBar from "./TimeBar";
import ControllerButtonsBar from "./ControllerButtonsBar";


// import Mutations from "../../vuex/PlayerMutations.js";
import playerMixin from "../Mixins/playerMixin.js";

export default {
	name: "ControlsMenu",
	data() {
		return {
			mouseOnBar: false,
			newTime: null
		};
    },
    mixins: [
        playerMixin
    ],
	components: {
        ControllerButtonsBar,
        TimeBar
		// PlayerMenuButton,
		// AudioBar
	},
	created() {
		document.addEventListener("keydown", event => {
			if (event.key == "ArrowLeft") this.TimeSkip(-10);
			if (event.key == "ArrowRight") this.TimeSkip(10);
		});
    },
    props: {
        visibility: {
            type: Boolean,
            default: true
        }
    },
	methods: {
		ChangeCurrentButton: function(event) {
			if (!(event instanceof ButtonEvent)) throw new TypeError();
			if (event.state) this.currentButton = event.name;
			else this.currentButton = null;
		}
	}
};
</script>

<style lang="sass" scoped>
@import "../../styles/variables.sass"  

.menu-wrapper
    position: absolute
    width: 100%
    bottom: 0
    left: 0

    .menu
        bottom: 0
        position: absolute
        width: calc(100% - 2*32px)
        height: 64px
        padding: 48px 32px
        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)

        .wrapper

            .buttons
                display: grid
                grid-template-columns: [left] 1fr [right] 1fr
                height: 32px
                padding: 8px 0

                .left, 
                .right
                    grid-column-start: left
                    grid-template-columns: repeat( auto-fit, minmax(32px, max-content) )
                    grid-column-gap: 16px
                    display: grid
                    align-items: center
                    
                    .current-time
                        width: 100%
                        opacity: 0.75
                        font-size: 10pt
                        cursor: default
                        font-weight: 800
                        letter-spacing: 0.5px


                .right
                    justify-content: right
                    grid-column-start: right

.slide-bottom-enter-active, .slide-bottom-leave-active 
    transition-duration: 0.5s
    opacity: 1
    transform: TranslateY(0%)

.slide-bottom-enter, .slide-bottom-leave-to
    transition-duration: 0.5s
    opacity: 0
    transform: TranslateY(25%)

</style>