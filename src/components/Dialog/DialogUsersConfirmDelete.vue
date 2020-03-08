<template>
    <div>
        <div>Czy jesteś pewny, że chcesz usunąć użytkownika {{user.username}}?</div>
        <v-normal-button @click="deleteUser">Usuń użytkownika</v-normal-button>
    </div>
</template>

<script>
import UserData from "@classes/UserData";

import NormalButton from "@/components/Forms/Buttons/NormalButton";

export default {
    name: "DialogUsersConfirmDelete",
    data() {
        return {
            label: "Usuń użytkownika"
        };
    },
    async created() {
        this.$emit("label", this.label);
    },
    components: {
        "v-normal-button": NormalButton
    },
    methods: {
        async deleteUser() {
            await UserData.deleteUser(this.user);
            this.$router.push({
                path: "/settings/users",
                params: {
                    reload: true
                }
            });
        }
    },
    computed: {
        user() {
            if (this.$route.params.user instanceof UserData)
                return this.$route.params.user;
            return undefined;
        }
    }
};
</script>

<style lang="sass" scoped>

</style>