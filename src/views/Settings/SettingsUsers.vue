<template>
    <ul>
       <li v-for="user in users" :key="user.id">
           {{user.email}}
        </li> 
    </ul>
</template>

<script>
import axios from 'axios';

export default {
    name: "SettingsUsers",
    data: function() {
        return {
            users: []
        }
    },
    created() {
        axios.get(`${process.env.VUE_APP_API_PATH}/users`, {withCredentials: true}).then(result => {
            this.users = result.data;
        }).catch(error => {
            throw error;
        })
    }
}
</script>

<style lang="sass" scoped>

</style>