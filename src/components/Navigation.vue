<template>
    <nav>
        <ul>
            <li v-show="hasAccess()"><router-link to="/"><button>Biedaflix</button></router-link></li>
            <li v-show="hasAccess() === false"><router-link to="/login"><button>Zaloguj się</button></router-link></li>
            <li v-show="hasAccess() === false"><router-link to="/createAccount"><button>Zarejestruj się</button></router-link></li>
            <li v-show="hasAccess()"><button>Profil</button></li>
            <li v-show="hasAccess('ADMINISTRATE_USERS')"><router-link to="/settings/roles"><button>Role</button></router-link></li>
            <li v-show="hasAccess('ADMINISTRATE_USERS')"><router-link to="/settings/users"><button>Użytkownicy</button></router-link></li>
            <li v-show="hasAccess('ADMINISTRATE_SERIES')"><router-link to="/settings/seriesList"><button>Seriale</button></router-link></li>
            <li v-show="hasAccess('ADMINISTRATE_SOURCES')"><router-link to="/settings/sources"><button>Źródła</button></router-link></li>
        </ul>
    </nav>
</template>

<script>
import authResponses from "@/enums/authResponses";

export default {
    name: "Navigation",
    methods: {
        hasAccess(...operations) {
            if (this.$store.getters.accessCheck({operations}) === authResponses.granted)
                return true;
            return false;
        }
    }
}
</script>

<style lang="sass" scoped>
@import "@styles/variables"

nav
    ul
        list-style: none
        padding-inline-start: 0
        margin: unset
        border-left: 1px solid $bright-dark-color
        display: flex
        flex-direction: column
        padding: 12px 8px
        li
            button
                font-family: inherit
                width: 100%
                border: unset
                margin: 0
                padding: 12px 0
                text-align: left
                background-color: unset
                color: $second-white-color
                cursor: pointer
                outline: unset
                font-size: 8pt
                font-weight: 700
                transition-duration: .2s
                text-transform: uppercase
                letter-spacing: .5px

                &:hover
                    color: $white-color
                    margin-left: 4px
</style>