<template>
    <div class = "logo">
        Biedaflix
    </div>
</template>

<script>
export default {
	name: "Logo"
};
</script>

<style lang="sass" scoped>
@import "@styles/fonts"

.logo
    grid-area: logo
    font-family: Big Noodle Titling
    font-size: 64px
    letter-spacing: 2px
    text-align: center
    cursor: default
    text-shadow: 0px 6px 15px black
    display: block
    height: 100%
    line-height: initial
</style>