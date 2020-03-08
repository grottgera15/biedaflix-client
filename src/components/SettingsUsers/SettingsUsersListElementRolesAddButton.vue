<template>
    <button class="list__element__user__list-roles__add-button" @click="addRoles()">＋</button>
</template>

<script>
import UserData from "@classes/UserData";
import DialogUsersRoles from "@/components/Dialog/DialogUsersRoles";

export default {
    name: "SettingsUsersListElementRolesAddButton",
    props: {
        data: {
            type: UserData,
            required: true
        }
    },
    methods: {
        addRoles() {
            this.$router.push({
                query: { id: this.data.id },
                params: { dialog: DialogUsersRoles, data: this.data }
            });
        }
    }
};
</script>

<style lang="sass" scoped>
.list__element__user__list-roles__add-button
    background-color: unset
    border: unset
    margin-left: .25em
    padding: 0
    font-size: 1em
    color: inherit
    outline: unset
    cursor: pointer
    position: relative
</style>