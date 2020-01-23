<template>
    <PlayerPopUp @close-pop-up="$emit('close-pop-up')">
        Test
    </PlayerPopUp>
</template>

<script>
import PlayerPopUp from "./PlayerPopUp.vue";
export default {
    name: "SubtitlesPopUp",
    components: {
        PlayerPopUp
    }
}
</script>

<style lang="sass" scoped>
</style>