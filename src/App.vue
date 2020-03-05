<template>
    <router-view/>

</template>

<script>
import auth from './auth';

export default {
    name: "App",
    mounted() {
        auth.auth();
    }
};
</script>

<style lang="sass">
@import "@styles/variables"

body
    margin: 0
    position: relative
    height: 100% 
    background-color: #151515
    font-family: 'Roboto', sans-serif
    color: $white-color


</style>
