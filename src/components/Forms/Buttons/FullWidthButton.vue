<template>
    <TemplateButton class = "button--full-width" @click="$emit('click', $event  )" :disabled="disabled">
        <slot />
    </TemplateButton>
</template>

<script>
import TemplateButtonMixin from "./_TemplateButtonMixin.js";
import TemplateButton from "./_TemplateButton";

export default {
    name: "FullWidthButton",
    components: {
        TemplateButton
    },
    mixins: [
        TemplateButtonMixin
    ]
}
</script>

<style lang="sass" scoped>
.button--full-width
    padding: 1em
    width: 100%
</style>