<template>
    <div class="section-header">
        <h2>
            <slot />
        </h2>
    </div>
</template>

<script>
export default {
    name: "AdminSectionHeader"
};
</script>

<style lang="sass" scoped>
.section-header
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    border-bottom: 1px solid white
    margin-bottom: 24px
</style>