<template>
	<div class="button" @mouseenter="OnMouseEnterButton" @mouseleave="OnMouseLeaveButton">
		<img
			:src="icon"
			:class="{'img-hover': isFocused}"
			@click="OnMouseClickButton"
			v-show="isMainIconActive"
		/>
		<img
			:src="secondaryIcon"
			:class="{'img-hover': isFocused}"
			@click="OnMouseClickButton"
			v-show="!isMainIconActive"
		/>
		<slot />
	</div>
</template>

<script>
import buttonMixin from "../Mixins/buttonMixin.js";

export default {
	name: "ControllerButton",
	data() {
		return {};
	},
	mixins: [buttonMixin],
	props: {
		secondaryIcon: {
			type: String,
			required: false
		},
        isMainIconActive: {
			type: Boolean,
			required: false,
			default: true
		}
	}
};
</script>

<style lang="sass" scoped>
.button
    height: 32px
    position: relative
    cursor: pointer

    img 
        transition-duration: .2s
        transition-delay: 0s
        opacity: 0.75
        width: 32px
        display: inline-block

    .img-hover
        transform: scale(1.25) 
        opacity: 1 !important
</style>