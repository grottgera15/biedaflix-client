<template>
    <router-view/>

</template>

<script>

export default {
    name: "App"
};
</script>

<style lang="sass">
@import "@styles/variables"

body
    margin: 0
    position: relative
    height: 100% 
    background-color: $dark-color
    font-family: 'Roboto', sans-serif
    color: $white-color


</style>
