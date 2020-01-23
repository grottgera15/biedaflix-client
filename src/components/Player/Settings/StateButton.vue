<template>
	<div class="state-wrapper" @click="onLeft = !onLeft">
		<div class="state-button">
			<div
				class="state"
				:style="{left: `calc(${position})`, width: `${size}px`, height: `${size}px`, 'margin-top': `${-size/2}px` }"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: "StateButton",
	data: function() {
		return {
			onLeft: true
		};
	},
	props: {
		size: {
			type: Number,
			default: 16
		},
		margin: {
			type: Number,
			default: 2
		}
	},
	computed: {
		position: function() {
			if (this.onLeft) return `0% - ${this.margin}px`;
			else return `100% - ${this.size - this.margin}px`;
		}
	}
};
</script>

<style lang="sass" scoped>
.state-wrapper
    display: block
    height: max-content
    width: min-content
    cursor: pointer
    padding: 8px 0px

    .state-button
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.4) inset
        position: relative
        height: 9px
        width: 24px
        border-radius: 5px
        background-color: white
        cursor: pointer

        .state
            position: absolute
            border-radius: 50%
            top: 50%
            background-color: firebrick
            transition-duration: .2s

</style>