<template>
	<div class="input">
		<label :class="[{'label-minimalized': focused}]">
			<slot />
		</label>
		<input :type="type" @focus="Focus" :value="value" @input="$emit('input', $event.target.value)"/>
	</div>
</template>

<script>
export default {
	name: "Input",
	data: function() {
		return {
			focused: false
		};
	},
	methods: {
		Focus: function() {
			this.focused = true;
		}
	},
	props: {
		value: {
			type: String
		},
		type: {
			type: String,
			default: "Text"
		}
	}
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.input
    position: relative
    margin-bottom: 16px
    color: #ffffffa3
    font-family: inherit    
    label
        pointer-events: none
        position: absolute
        top: 50%
        transform: translateY(-50%)
        left: 24px
        font-size: 10pt
        font-weight: 500
        transition-duration: 0.2s
    .label-minimalized
        font-size: 8pt
        transform: unset
        top: 8px
        color: $main-color
    input
        letter-spacing: 0.5px
        font-weight: 700
        font-family: inherit
        width: calc(100% - 2*24px)
        background-color: #212121
        padding: 22px 24px 10px 24px
        border: 1px solid #ffffff17
        border-radius: 4px
        color: inherit
        transition-duration: 0.5s
        cursor: pointer
        &:focus
            color: white
            box-shadow: 0 2px 10px #00000080
            outline: unset !important
            cursor: unset !important
</style>