<template>
    <div>
        <v-section-header>Zarządzanie rolami</v-section-header>
        <v-list :array="roles" :selected="selected" @click="selected = $event" />
        <div v-if="role !== undefined">
            <v-text-input
                :id="`roleName`"
                :label="`Nazwa roli`"
                v-model="role.name"
                :placeholder="`Wpisz nazwę roli`"
                :required="true"
            />
            <div>
                <h3>Zarządzanie użytkownikami</h3>
                <p>Użytkownicy z tym uprawnieniem mogą edytować innych użytkowników, usuwać ich oraz udzielać dostępu do serwisu.</p>
                <v-state-button :value="administrateUsers"
                    @click="role.operations[operations.ADMINISTRATE_USERS] = !administrateUsers" />
            </div>
            <div>
                <h3>Zarządzanie serialami</h3>
                <p>Użytkownicy z tym uprawnieniem mogą dodawać seriale i odcinki oraz je edytować.</p>
                <v-state-button :value="administrateSeries"
                    @click="role.operations[operations.ADMINISTRATE_SERIES] = !administrateSeries" />
            </div>
            <div>
                <h3>Zarządzanie źródłami</h3>
                <p>Użytkownicy z tym uprawnieniem mogą dodawać, edytować i usuwać źródła seriali.</p>
                <v-state-button
                    :value="administrateSources"
                    @click="role.operations[operations.ADMINISTRATE_SOURCES] = !administrateSources"
                />
            </div>
        </div>
    </div>
</template>

<script>
import operations from "@/enums/operations";

import RoleData from "@classes/RoleData";

import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader";
import SettingsTextInput from "@/components/Forms/Settings/SettingsTextInput";

import SettingsRolesList from "@/components/SettingsRoles/SettingsRolesList";

import StateButton from "@/components/Forms/Buttons/StateButton";

export default {
    name: "SettingsRoles",
    data() {
        return {
            roles: [],
            selected: null,
            operations: operations
        };
    },
    components: {
        "v-section-header": SettingsSectionHeader,
        "v-list": SettingsRolesList,
        "v-text-input": SettingsTextInput,
        "v-state-button": StateButton
    },
    computed: {
        role() {
            return this.roles.find(role => {
                return role.id === this.selected;
            });
        },
        administrateUsers() {
            return this.role.operations[operations.ADMINISTRATE_USERS];
        },
        administrateSeries() {
            return this.role.operations[operations.ADMINISTRATE_SERIES];
        },
        administrateSources() {
            return this.role.operations[operations.ADMINISTRATE_SOURCES];
        }
    },
    async created() {
        this.roles = await RoleData.loadRoles();
        this.selected = this.roles[0].id;
    }
};
</script>

<style lang="sass" scoped>

</style>