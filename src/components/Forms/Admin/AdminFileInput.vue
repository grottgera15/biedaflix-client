<template>
	<AdminTemplateInput
		:id="id"
		:label="label"
		:value="value"
		:required="required"
		:validated="validated"
	>
		<button
			class="input-wrapper__file"
			:id="id"
            @click="chooseFile()"
		>
            Wybierz plik
        </button>
        <input 
            type="file"
            style="display: none"
            ref="hiddenFileInput"
			@change="fileChoosen($event)"
            
        />
	</AdminTemplateInput>
</template>

<script>
import AdminTemplateInput from "./_AdminTemplateInput";
import AdminTemplateInputMixin from "@mixins/_AdminTemplateInputMixin.js";

export default {
	name: "AdminFileInput",
	components: {
		AdminTemplateInput
    },
    methods: {
        chooseFile() {
            this.$refs.hiddenFileInput.click();
        },
        fileChoosen(event) {
            this.$emit('input', event.target.files[0]);
        }
    },
    mixins: [AdminTemplateInputMixin],
    props: {
		value: {
            type: File,
            required: false
		}
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.input-wrapper__file
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