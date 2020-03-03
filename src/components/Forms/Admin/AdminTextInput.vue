<template>
	<AdminTemplateInput
		:id="id"
		:label="label"
		:value="value"
		:required="required"
        :validated="validated"
	>
		<input class = "input-wrapper__input"
			:id="id"
			type="text"
			:placeholder="placeholder"
			:value="value"
			@input="$emit('input', $event.target.value)"
		/>
	</AdminTemplateInput>
</template>

<script>
import AdminTemplateInput from "./_AdminTemplateInput";
import AdminTemplateInputMixin from "@mixins/_AdminTemplateInputMixin.js";

export default {
	name: "AdminTextInput",
	components: {
		AdminTemplateInput
	},
	props: {		
		value: {
            type: String,
            required: true
		},
		placeholder: {
			type: String,
			required: false
		}
	},
	mixins: [AdminTemplateInputMixin]
};
</script>

<style lang="sass" scoped>
.input-wrapper__input
    letter-spacing: 0.5px
    font-weight: 500
    font-family: inherit
    background-color: unset
    border: 0
    color: white !important
    width: calc(100% - 2 * 24px)
    padding: 10px 12px
    outline: unset !important
    cursor: unset !important
</style>