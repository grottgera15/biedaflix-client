<template>
    <div>
        <v-section-header>Zarządzanie użytkownikami</v-section-header>
        <v-list :array="users" :component="listComponent" />
    </div>
</template>

<script>
import axios from "axios";

import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader";
import SettingsUsersListElement from "@/components/SettingsUsers/SettingsUsersListElement";
import SettingsList from "@/components/Settings/SettingsList";

import UserData from "@classes/UserData";

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
            .get(`${process.env.VUE_APP_API_PATH}/administrateUsers`, {
                withCredentials: true
            })
            .then(result => {
                for (let user of result.data) {
                    console.log(user);
                    this.users.push(new UserData(user));
                }
            })
            .catch(error => {
                throw error;
            });
    }
};
</script>

<style lang="sass" scoped>

</style>