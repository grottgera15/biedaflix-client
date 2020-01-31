<template>
	<div>
		<div class="state-wrapper" @click="onClick">
			<div class="state-button">
				<div
					class="state"
					:style="{left: `calc(${position})`, width: `${size}px`, height: `${size}px`, 'margin-top': `${-size/2}px` }"
				/>
			</div>
		</div>
		<div class="text">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: "StateButton",
	data: function() {
		return {
			state: false
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
    methods: {
        onClick: function() {
            this.state = !this.state;
            this.$emit("click", this.state);
        }
    },
	computed: {
		position: function() {
			if (!this.state) return `0% - ${this.margin}px`;
			else return `100% - ${this.size - this.margin}px`;
		}
	}
};
</script>

<style lang="sass" scoped>
.state-wrapper
    display: inline-block
    height: max-content
    width: min-content
    cursor: pointer
    vertical-align: middle
    padding: 8px 0px
    margin-bottom: 6px

    .state-button
        position: relative
        height: 9px
        width: 24px
        border-radius: 5px
        background-color: #9b9b9b
        cursor: pointer    

    .state
        position: absolute
        border-radius: 50%
        top: 50%
        background-color: firebrick
        transition-duration: .2s

.text
    font-size: 10pt
    letter-spacing: .5px
    vertical-align: top
    display: inline-block
    cursor: default
    color: #9b9b9b
    margin-left: 4px

</style>