<template>
	<div class="wrapper" @click="ClosePopUpOnMouseLeave()">
		<div class="popup" @mouseenter="mouseOutOfPopUp = false" @mouseleave="mouseOutOfPopUp = true">
			<div class="header">
				<slot name="header" />
				<IconButton
					:icon="require('../../../files/menu/SVG/closeButton.svg')"
					@click="ClosePopUp()"
				/>
			</div>
			<slot />
		</div>
	</div>
</template>

<script>
import IconButton from "../../Buttons/IconButton.vue";

export default {
	name: "PlayerPopUp",
	data() {
		return {
			mouseOutOfPopUp: true
		};
	},
	methods: {
		ClosePopUpOnMouseLeave: function() {
            if (this.mouseOutOfPopUp)
                this.ClosePopUp();
        },
        ClosePopUp: function() {
             this.$emit("close-pop-up");
        }
	},
	components: {
		IconButton
	}
};
</script>

<style lang="sass" scoped>
    .wrapper 
        position: absolute
        width: 100%
        height: 100%
        background-color: #000000ba
        z-index: 1000000
        display: grid
        align-items: center
        grid-template-columns: 1fr 1fr 1fr
        grid-template-areas: ". popup ."

        .popup
            padding: 24px
            background-color: #0b0b0b
            overflow-y: auto
            overflow-x: hidden
            grid-area: popup
            box-shadow: 0px 5px 25px black
            border-radius: 8px

            .header
                display: flex
                flex-direction: row
                justify-content: space-between
                align-items: center
                letter-spacing: .5px
                font-size: 14pt
                font-weight: 300
                color: #ffffffa3
                margin-bottom: 16px
            
</style>