<template>
	<AdminTemplateInput
		:id="id"
		:label="label"
		:value="value"
		:required="required"
		:validated="validated"
	>
		<select :value="value" @input="$emit('input', $event.target.value)">
			<option v-for="(option, i) in options" :key="i" :value="i">{{option}}</option>
		</select>
	</AdminTemplateInput>
</template>

<script>
import AdminTemplateInput from "./_AdminTemplateInput";
import AdminTemplateInputMixin from "@mixins/_AdminTemplateInputMixin.js";

export default {
	name: "AdminSelect",
	components: {
		AdminTemplateInput
    },
    props: {
		value: {
            type: String,
            required: true
		},
        options: {
            type: Object,
            required: true
        }
    },
	mixins: [AdminTemplateInputMixin]
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.input-wrapper__select
    margin-top: 8px
    display: block
    cursor: pointer
    letter-spacing: .5px
    font-family: inherit
    resize: none
    outline: none
    color: white !important
    background: $main-color
    border: unset
    font-size: 9pt
    padding: 4px 8px
    

</style>