<template>
    <TemplateButton class = "button--small" @click="$emit('click', $event)" :disabled="disabled">
        <slot />
    </TemplateButton>
</template>

<script>
import TemplateButtonMixin from "./_TemplateButtonMixin.js";
import TemplateButton from "./_TemplateButton";

export default {
    name: "SmallButton",
    components: {
        TemplateButton
    },
    mixins: [
        TemplateButtonMixin
    ]
}
</script>

<style lang="sass" scoped>
.button--small
    padding: .25em 1em
    font-size: .7em
</style>