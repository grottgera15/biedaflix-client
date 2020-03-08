<template>
    <li
        class="list__element__user__list-roles__badge"
        @mouseenter="deleteButton = true"
        @mouseleave="deleteButton = false"
    >
        {{data.name}}
        <button class="list__element__user__list-roles__badge__delete-button" v-show="deleteButton" @click="$emit('role-delete', data)">✕</button>
    </li>
</template>

<script>
import RoleData from "@classes/RoleData";

export default {
    name: "SettingsUsersListElementRolesBadge",
    data() {
        return {
            deleteButton: false
        };
    },
    props: {
        data: {
            type: RoleData,
            required: true
        }
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.list__element__user__list-roles__badge
    font-size: .75em
    padding: .1em 1em
    margin-left: .4em
    color: $second-white-color
    border: 1px solid $bright-dark-color

    &__delete-button
        color: inherit
        background: unset
        border: unset
        margin: 0
        padding: 0
        outline: unset
        cursor: pointer
</style>