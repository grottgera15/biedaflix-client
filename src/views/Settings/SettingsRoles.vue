<template>
    <div>
        <v-section-header>Zarządzanie rolami</v-section-header>
        <v-roles-list :array="roles" :selected="$route.query.id" @click="changeRole($event)" />
        <div v-if="role !== undefined">
            <v-text-input
                :id="`roleName`"
                :label="`Nazwa roli`"
                v-model="role.name"
                :placeholder="`Wpisz nazwę roli`"
                :required="true"
            />
            <v-roles-edit
                v-for="(operation, i) in role.operations"
                :key="i"
                :data="{'key': i, 'value': operation}"
                @onChange="role.operations[i] = $event"
            />
        </div>
    </div>
</template>

<script>
import RoleData from "@classes/RoleData";

import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader";
import SettingsTextInput from "@/components/Forms/Settings/SettingsTextInput";

import SettingsRolesList from "@/components/SettingsRoles/SettingsRolesList";
import SettingsRolesEdit from "@/components/SettingsRoles/SettingsRolesEdit";

export default {
    name: "SettingsRoles",
    data() {
        return {
            roles: []
        };
    },
    components: {
        "v-section-header": SettingsSectionHeader,
        "v-roles-list": SettingsRolesList,
        "v-roles-edit": SettingsRolesEdit,
        "v-text-input": SettingsTextInput
    },
    computed: {
        role() {
            return this.roles.find(role => {
                return role.id === this.$route.query.id;
            });
        }
    },
    methods: {
        changeRole(roleId) {
            this.$router.push({
                query: {
                    id: roleId
                }
            });
        }
    },
    async created() {
        this.roles = await RoleData.loadRoles();
        if (this.$route.query.id === undefined)
            this.changeRole(this.roles[0].id);
    }
};
</script>

<style lang="sass" scoped>

</style>