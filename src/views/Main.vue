<template>
    <div id="app">
        <v-dialog-wrapper />
        <div class="top">
            <Logo />
            <MemoryStatus />
        </div>
        <div class="navigation">
            <Navigation />
        </div>
        <div class="main">
            <router-view />
        </div>
    </div>
</template>

<script>
import DialogWrapper from "@/components/Dialog/DialogWrapper";

import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import MemoryStatus from "@/components/MemoryStatus";

export default {
    name: "Main",
	components: {
		Logo,
		Navigation,
        MemoryStatus,
        "v-dialog-wrapper": DialogWrapper
	}};
</script>

<style lang="sass" scoped>

#app
    margin: 24px 0
    width: 100%
    height: 100%
    display: grid
    grid-template-columns: repeat(9, 1fr)
    grid-template-areas: ". . . top top top . . ." " . . navigation main main main . . ."
    line-height: 150%
    @media (max-width: 1390px)
        grid-template-areas: ". . top top top top top . ." " . navigation main main main main main . ."
    @media (max-width: 1000px)
        grid-template-areas: ". top top top top top top top ." ". main main main main main main main ."
    @media (max-width: 750px)
        grid-template-areas: "top top top top top top top top top" "main main main main main main main main main"

    .top
        grid-area: top

    .navigation
        grid-area: navigation
        @media (max-width: 1000px)
            display: none
    
    .main
        grid-area: main
        max-width: 100%
</style>