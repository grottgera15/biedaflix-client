<template>
	<AdminTemplateInput
		:id="id"
		:label="label"
		:value="value"
		:required="required"
		:validated="validated"
	>
		<textarea
			class="input-wrapper__textarea"
			:id="id"
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
	name: "AdminTextArea",
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
.input-wrapper__textarea
    width: 100%
    min-height: 100px
    font-family: inherit
    resize: none
    outline: none
    color: white !important
    background: unset
    border: unset
</style>