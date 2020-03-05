<template>
    <div class="inline">
        <slot />
    </div>
</template>

<script>
export default {
    name: "AdminInline"
};
</script>

<style lang="sass" scoped>
.inline
    display: flex

    :nth-child(1)
        margin-left: unset !important

    :nth-child(n)
        width: 100%
        margin: 0 .25em

    :nth-last-child(1)
        margin-right: unset
</style>