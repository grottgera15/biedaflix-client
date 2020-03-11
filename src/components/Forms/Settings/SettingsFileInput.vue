<template>
    <SettingsTemplateInput
        :id="id"
        :label="label"
        :value="value"
        :required="required"
        :validated="validated"
        :name="name"
    >
        <v-small-button class="input-wrapper__file" :id="id" @click="chooseFile()">Wybierz plik</v-small-button>
        <input
            :name="name"
            type="file"
            style="display: none"
            ref="hiddenFileInput"
            @change="fileChoosen($event)"
        />
    </SettingsTemplateInput>
</template>

<script>
import SettingsTemplateInput from "./_SettingsTemplateInput";
import SettingsTemplateInputMixin from "@mixins/_SettingsTemplateInputMixin.js";

import SmallButton from "@/components/Forms/Buttons/SmallButton";

export default {
    name: "SettingsFileInput",
    components: {
        SettingsTemplateInput,
        "v-small-button": SmallButton
    },
    methods: {
        chooseFile() {
            this.$refs.hiddenFileInput.click();
        },
        fileChoosen(event) {
            this.$emit("input", event.target.files[0]);
        }
    },
    mixins: [SettingsTemplateInputMixin],
    props: {
        value: {
            type: [File, String],
            required: false
        }
    }
};
</script>

<style lang="sass" scoped>
.input-wrapper__file
    display: block
</style>