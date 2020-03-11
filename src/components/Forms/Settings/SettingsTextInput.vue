<template>
	<SettingsTemplateInput
		:id="id"
		:label="label"
		:value="value"
		:required="required"
        :validated="validated"
		:name="name"
	>
		<input class = "input-wrapper__input"
			:id="id"
			type="text"
			:placeholder="placeholder"
			:value="value"
			:name="name"
			@input="$emit('input', $event.target.value)"
		/>
	</SettingsTemplateInput>
</template>

<script>
import SettingsTemplateInput from "./_SettingsTemplateInput";
import SettingsTemplateInputMixin from "@mixins/_SettingsTemplateInputMixin.js";

export default {
	name: "SettingsTextInput",
	components: {
		SettingsTemplateInput
	},
	props: {		
		value: {
            type: [String, Number],
            required: true
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