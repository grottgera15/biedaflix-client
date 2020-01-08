<template>
    <div class = "memory-status">
        Please donate to keep the site up & running, ad-free, and subscription free. We need your help!
    </div>
</template>

<script>
export default {
	name: "MemoryStatus"
};
</script>

<style lang="sass" scoped>
    @import "../styles/fonts.sass"
    @import "../styles/variables.sass"

    .memory-status
        grid-area: memory-status
        padding: 32px
        font-size: 14pt
        font-weight: 300
        color: #ffffffa3
        cursor: default
</style>