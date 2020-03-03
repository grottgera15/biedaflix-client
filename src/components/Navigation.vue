<template>
    <nav>
        <ul>
            <li><router-link to="/"><button>Biedaflix</button></router-link></li>
            <li><router-link to="login"><button>Zaloguj się</button></router-link></li>
            <li><router-link to="createAccount"><button>Zarejestruj się</button></router-link></li>
            <li><button>Profil</button></li>
            <li><button>Użytkownicy</button></li>
            <li><router-link to="adminSeries"><button>Seriale</button></router-link></li>
            <li><router-link to="adminSources"><button>Źródła</button></router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Navigation"
}
</script>

<style lang="sass" scoped>
nav
    ul
        list-style: none
        padding-inline-start: 0
        margin: unset
        border-left: 1px solid #ffffff17
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
                color: #ffffffa3
                cursor: pointer
                outline: unset
                font-size: 8pt
                font-weight: 700
                transition-duration: .2s
                text-transform: uppercase
                letter-spacing: .5px

                &:hover
                    color: white
                    margin-left: 4px
</style>