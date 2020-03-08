<template>
    <div class="list__element__user">
        <v-acceptance-state :accepted="data.accepted" @click="changeAcceptance($event)" />
        <div class="list__element__user__info">
            <div class="list__element__user__info__username">{{data.username}}</div>
            <div class="list__element__user__info__email">{{data.email}}</div>
        </div>
        <ul class="list__element__user__list-roles">
            <v-roles-add-button :data="data" />
            <v-roles-badge
                v-for="(role, i) in data.roles"
                :key="i"
                :data="role"
                @role-delete="removeRole($event)"
            />
        </ul>
        <button class="list__element__user__delete-button" @click="deleteUser()">Usuń</button>
    </div>
</template>

<script>
import UserData from "@classes/UserData";

import SettingsUsersListElementAcceptanceState from "./SettingsUsersListElementAcceptanceState";
import SettingsUsersListElementRolesBadge from "./SettingsUsersListElementRolesBadge";
import SettingsUsersListElementRolesAddButton from "./SettingsUsersListElementRolesAddButton";

import DialogUsersConfirmDelete from "@/components/Dialog/DialogUsersConfirmDelete";

export default {
    name: "SettingsUsersListElement",
    data() {
        return {
            popups: {
                roles: {
                    active: false
                }
            }
        };
    },
    methods: {
        changeAcceptance() {
            this.data.accepted = !this.data.accepted;
            UserData.saveAdministrateUser(this.data);
        },
        removeRole(role) {
            this.data.removeRole(role.id);
            UserData.saveAdministrateUser(this.data);
        },
        deleteUser() {
            this.$router.push({
                query: { id: this.data.id },
                params: { dialog: DialogUsersConfirmDelete, user: this.data }
            });
        }
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    components: {
        "v-acceptance-state": SettingsUsersListElementAcceptanceState,
        "v-roles-badge": SettingsUsersListElementRolesBadge,
        "v-roles-add-button": SettingsUsersListElementRolesAddButton
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.list__element__user
    display: flex
    align-items: center
    cursor: default
    padding: .5em 0
    border-bottom: 1px solid $bright-dark-color

    &__info
        width: 40%

        &__username
            font-size: .9em

        &__email
            color: $second-white-color
            font-size: .8em

    &__list-roles
        list-style: unset
        margin: 0
        margin-left: auto
        padding: 0
        float: right
        display: flex
        align-items: center

    &__delete-button
        cursor: pointer
        font-family: inherit
        font-style: italic
        background-color: unset
        border: unset
        outline: unset
        color: $main-color
        font-size: .8em

</style>