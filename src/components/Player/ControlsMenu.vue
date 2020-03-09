<template>
    <div class="menu-wrapper">
        <transition name="slide-bottom">
            <div class="menu" v-show="visibility">
                <TimeBar :episodeData="episodeData" />
                <ControllerButtonsBar />
            </div>
        </transition>
    </div>
</template>

<script>
import TimeBar from "./ControlsMenu/TimeBar";
import ControllerButtonsBar from "./ControlsMenu/ControllerButtonsBar";

import ButtonEvent from "@classes/ButtonEvent";
import playerMixin from "@mixins/playerMixin";
import Mutations from "@vuexMutations/PlayerMutations";
import EpisodeData from "../../classes/EpisodeData";

export default {
    name: "ControlsMenu",
    data() {
        return {
            mouseOnBar: false
        };
    },
    mixins: [playerMixin],
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
        },
        episodeData: {
            type: EpisodeData,
            required: true
        }
    },
    methods: {
        ChangeCurrentButton: function(event) {
            if (!(event instanceof ButtonEvent)) throw new TypeError();
            if (event.state) this.currentButton = event.name;
            else this.currentButton = null;
        },
        TimeSkip: function(timeSkip) {
            this.$store.commit(
                Mutations.NewTimeSet,
                this.currentTime + timeSkip
            );
        }
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"  

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

.slide-bottom-enter-active, .slide-bottom-leave-active 
	transition-duration: 0.5s
	opacity: 1
	transform: TranslateY(0%)

.slide-bottom-enter, .slide-bottom-leave-to
	transition-duration: 0.5s
	opacity: 0
	transform: TranslateY(25%)

</style>