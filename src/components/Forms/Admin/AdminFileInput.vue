<template>
	<AdminTemplateInput
		:id="id"
		:label="label"
		:value="value"
		:required="required"
		:validated="validated"
	>
		<v-small-button
			class="input-wrapper__file"
			:id="id"
            @click="chooseFile()"
		>
            Wybierz plik
        </v-small-button>
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

import SmallButton from "@/components/Forms/Buttons/SmallButton";

export default {
	name: "AdminFileInput",
	components: {
        AdminTemplateInput,
        "v-small-button": SmallButton
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

</style>