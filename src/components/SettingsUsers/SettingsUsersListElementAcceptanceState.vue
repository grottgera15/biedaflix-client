<template>
    <button class="list__element__user__acceptanceState" :class="classBind" @click="$emit('click', $event)"></button>
</template>

<script>
export default {
    name: "SettingsUsersListElementAcceptanceState",
    props: {
        accepted: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        classBind() {
            return {
                "list__element__user__acceptanceState--accepted": this.accepted
            };
        }
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.list__element__user__acceptanceState
    cursor: pointer
    background-color: unset
    outline: unset
    width: 1.5em
    height: 1.5em
    border: 1px solid $bright-dark-color
    margin: 0 1em
    transition-duration: .2s

.list__element__user__acceptanceState--accepted
    border: 1px solid $second-color !important
    background-color: $main-color !important
</style>