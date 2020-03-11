<template>
	<SettingsTemplateInput
		:id="id"
		:label="label"
		:value="value"
		:required="required"
		:validated="validated"
		:name="name"
	>
		<textarea
			class="input-wrapper__textarea"
			:id="id"
			:name="name"
			:placeholder="placeholder"
			:value="value"
			@input="$emit('input', $event.target.value)"
		/>
	</SettingsTemplateInput>
</template>

<script>
import SettingsTemplateInput from "./_SettingsTemplateInput";
import SettingsTemplateInputMixin from "@mixins/_SettingsTemplateInputMixin.js";

export default {
	name: "SettingsTextArea",
	components: {
		SettingsTemplateInput
	},
	props: { 
		value: {
            type: String
		},
		placeholder: {
			type: String,
			required: false
		}
	},
	mixins: [SettingsTemplateInputMixin]
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