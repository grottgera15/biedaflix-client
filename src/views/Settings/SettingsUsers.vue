<template>
    <div>
        <v-section-header>Użytkownicy</v-section-header>
        <v-list :array="users" :component="listComponent" />
    </div>
</template>

<script>
import axios from "axios";

import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader";
import SettingsUsersListElement from "@/components/SettingsUsers/SettingsUsersListElement";
import SettingsList from "@/components/Settings/SettingsList";

export default {
    name: "SettingsUsers",
    data: function() {
        return {
            users: [],
            listComponent: SettingsUsersListElement
        };
    },
    components: {
        "v-section-header": SettingsSectionHeader,
        "v-list": SettingsList
    },
    created() {
        axios
            .get(`${process.env.VUE_APP_API_PATH}/users`, {
                withCredentials: true
            })
            .then(result => {
                this.users = result.data;
            })
            .catch(error => {
                throw error;
            });
    }
};
</script>

<style lang="sass" scoped>

</style>