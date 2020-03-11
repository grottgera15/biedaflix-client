<template>
    <SettingsTemplateInput
        :id="id"
        :label="label"
        :value="value"
        :required="required"
        :validated="validated"
        :name="name"
    >
        <select :name="name" :value="value" @input="$emit('input', $event.target.value)">
            <option v-for="option in options" :key="option[0]" :value="option[0]">{{option[1]}}</option>
        </select>
    </SettingsTemplateInput>
</template>

<script>
import SettingsTemplateInput from "./_SettingsTemplateInput";
import SettingsTemplateInputMixin from "@mixins/_SettingsTemplateInputMixin.js";

export default {
    name: "SettingsSelect",
    components: {
        SettingsTemplateInput
    },
    props: {
        value: {
            type: String,
            required: false
        },
        options: {
            type: Map,
            required: true
        }
    },
    mixins: [SettingsTemplateInputMixin]
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