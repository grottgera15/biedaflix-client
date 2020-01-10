<template>
	<div class="button" @mouseenter="OnMouseEnterButton" @mouseleave="OnMouseLeaveButton">
		<img :src="icon" :class="{'img-hover': active}" @click="OnMouseClickButton" />
        <slot />
	</div>
</template>

<script>
import ButtonEvent from "../../classes/ButtonEvent.js"

export default {
	name: "PlayerMenuButton",
	data() {
		return {};
	},
	methods: {
		OnMouseEnterButton: function() {
			this.$emit("mouse-interacted-button", new ButtonEvent(this.name, true));
		},
		OnMouseLeaveButton: function() {
			this.$emit("mouse-interacted-button", new ButtonEvent(this.name, false));
        },
        OnMouseClickButton: function() {
            this.$emit("click");
        }
	},
	props: {
		icon: {
			type: String,
			required: true
		},
		active: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: "untitled"
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