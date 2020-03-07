<template>
    <div>
        <div>
            {{data.username}}
            <br />
            {{data.email}}
        </div>
        <div>{{data.accepted}}</div>
        <div>{{data.roles}}</div>   
    </div>
</template>

<script>
// import UserData from "@classes/UserData";

export default {
    name: "SettingsUsersListElement",
    props: {
        data: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="sass" scoped>

</style>