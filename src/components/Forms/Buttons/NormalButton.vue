<template>
    <TemplateButton class = "button--normal" @click="$emit('click', $event  )" :disabled="disabled">
        <slot />
    </TemplateButton>
</template>

<script>
import TemplateButtonMixin from "./_TemplateButtonMixin.js";
import TemplateButton from "./_TemplateButton";

export default {
    name: "NormalButton",
    components: {
        TemplateButton
    },
    mixins: [
        TemplateButtonMixin
    ]
}
</script>

<style lang="sass" scoped>
.button--normal
    padding: 1em
</style>