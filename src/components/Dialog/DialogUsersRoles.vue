<template>
    <ul>
        <li v-for="role in availableRoles" :key="role.id" @click="addRole(role)">{{role.name}}</li>
    </ul>
</template>

<script>
import RoleData from "@classes/RoleData";
import UserData from "@classes/UserData";
export default {
    name: "DialogUsersRoles",
    data() {
        return {
            roles: [],
            label: "Zarządzanie rolami"
        };
    },
    async created() {
        this.$emit("label", this.label);
        this.roles = await RoleData.loadRoles();
    },
    methods: {
        async addRole(role) {
            this.user.roles.push(role);
            UserData.saveAdministrateUser(this.user);
        }
    },
    computed: {
        user() {
            if (this.$route.params.data instanceof UserData)
                return this.$route.params.data;
            return undefined;
        },
        availableRoles() {
            let set = new Set();
            for (let role of this.user.roles) set.add(role.id);
            return this.roles.filter(role => !set.has(role.id));
        }
    }
};
</script>

<style lang="sass" scoped>

</style>