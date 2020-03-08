<template>
    <ul class="settings-roles-list">
        <li
            class="settings-roles-list__role-badge"
            v-for="data in array"
            :key="data.id"
            :class="{'settings-roles-list__role-badge--selected': (selected === data.id)}"
            @click="$emit('click', data.id)"
        >{{data.name}}</li>
    </ul>
</template>

<script>
// import RoleData from "@classes/RoleData";

export default {
    name: "SettingsRolesList",
    props: {
        array: {
            type: Array,
            required: true
        },
        selected: {
            type: String
        }
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.settings-roles-list
    list-style: none
    margin: 0
    padding: 0
    display: flex

    &__role-badge
        cursor: pointer
        font-size: .75em
        padding: .1em 1em
        color: $second-white-color
        border: 1px solid $bright-dark-color
        transition-duration: .2s
        margin-right: 1em

    &:nth-last-child(1)
        margin-right: unset !important

    &__role-badge--selected
        border: 1px solid $main-color
</style>