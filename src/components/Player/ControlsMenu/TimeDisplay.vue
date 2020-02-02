<template>
    <div class = "time-display">
        {{TimeFormatted(currentTime)}} / {{TimeFormatted(duration)}}
    </div>
</template>

<script>
import playerMixin from "@mixins/playerMixin"

export default {
    name: "TimeDisplay",
    mixins: [
        playerMixin
    ]
}
</script>

<style lang="sass" scoped>
.time-display
    font-weight: 700
    font-size: 10pt
    vertical-align: middle
    cursor: default
    letter-spacing: .5px
    opacity: .7
    margin-top: -2px
</style>