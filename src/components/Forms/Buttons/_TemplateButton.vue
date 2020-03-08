<template>
    <button class="button" @click="$emit(`click`, $event)" :disabled="disabled">
        <slot />
    </button>
</template>

<script>
import TemplateButtonMixin from "./_TemplateButtonMixin.js";

export default {
    name: "TemplateButton",
    mixins: [TemplateButtonMixin]
};
</script>

<style scoped lang="sass">
@import "@styles/variables"

.button
    font-weight: 700
    font-size: .8em
    letter-spacing: .05em
    font-family: inherit     
    color: $white-color
    border: 1px solid $second-color
    background-color: $second-color
    cursor: pointer
    transition-duration: .2s

    &:hover
        border: 1px solid $main-color
        background-color: $main-color
        
    &:disabled
        color: $dark-color
        background-color: $second-white-color
        border: 1px solid $second-white-color
        cursor: default

    &:focus
        outline: unset !important
</style>
