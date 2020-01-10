<template>
    <div class = "wrapper" @click="ClosePupUpOnMouseLeave">
        <div class = "popup" @mouseenter="mouseOutOfPopUp = false" @mouseleave="mouseOutOfPopUp = true">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: "PlayerPopUp",
    data() { 
        return {
            mouseOutOfPopUp: true
        }           
    },
    methods: {
        ClosePupUpOnMouseLeave: function() {
            if (this.mouseOutOfPopUp)
                this.$emit("close-pop-up");
        }
    }
}
</script>

<style lang="sass" scoped>
    .wrapper 
        position: absolute
        width: 100%
        height: 100%
        background-color: #000000ba
        z-index: 1000000
        display: grid
        align-items: center
        grid-template-columns: 2fr 1fr 2fr
        grid-template-areas: ". popup ."

        .popup
            padding: 24px
            background-color: black
            min-height: 256px
            grid-area: popup
            box-shadow: 0px 5px 25px black
            
</style>