<template>
	<button @click="OnMouseClickButton">
        <img :src="icon">
    </button>
</template>

<script>
import buttonMixin from "@mixins/buttonMixin.js";

export default {
    name: "IconButton",
    mixins: [
        buttonMixin
    ]
};
</script>

<style scoped lang="sass">
button
    background-color: unset
    border: unset
    letter-spacing: 0.5px
    font-weight: 700
    font-family: Finherit
    vertical-align: middle   
    color: white
    cursor: pointer
    transition-duration: 0.2s
    opacity: 0.65

    &:hover
        opacity: 1
    
    &:focus
        outline: unset !important

    img
        width: 24px
</style>
