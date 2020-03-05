<template>
    <div class="section-header">
        <slot />
    </div>
</template>

<script>
export default {
    name: "SettingsSectionHeader"
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.section-header
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    border-bottom: 1px solid $bright-dark-color
    margin-bottom: 1.5em
    padding-bottom: 1em
    font-size: 1.25em
    letter-spacing: .04em
    font-weight: 300
</style>