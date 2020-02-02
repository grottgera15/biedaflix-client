<template>
	<button>
        <slot/>
    </button>
</template>

<script>
export default {
	name: "Button"
};
</script>

<style scoped lang="sass">
@import "@styles/variables"

button
        letter-spacing: 0.5px
        font-weight: 700
        font-family: inherit
        width: 100%
        padding: 16px                
        border: 1px solid $main-color
        border-radius: 4px
        color: white
        background-color: $main-color
        cursor: pointer
        transition-duration: 0.5s
        &:hover
            box-shadow: 0 2px 10px #00000080
        &:focus
            outline: unset !important
</style>
