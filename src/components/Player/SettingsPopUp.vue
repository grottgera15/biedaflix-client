<template>
    <PlayerPopUp @close-pop-up="$emit('close-pop-up')">
        <button>Jakość
        </button>
        <button>Napisy</button> 
        <button>Wspólne oglądanie</button>
    </PlayerPopUp>    
</template>

<script>
import PlayerPopUp from "./PlayerPopUp.vue";

export default {
    name: "Settings PopUp",
    components: {
        PlayerPopUp
    }
}
</script>

<style lang="sass" scoped>
button
    display: inline-block
    background-color: white
    border: 0
    outline: none
    font-family: inherit
    text-transform: uppercase
</style>