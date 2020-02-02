<template>
	<transition name="slide-top">
		<div class="menu-wrapper" v-show="visibility">
			<button class="return-button" @click="returnHome()">
				<img src="@files/menu/SVG/returnButton.svg" />
				<div class="header">Wróć do przeglądania</div>
			</button>
            <div class="share-info">
                Test
            </div>  
		</div>
	</transition>
</template>

<script>
export default {
	name: "TopMenu",
	components: {},
	props: {
		visibility: {
			type: Boolean,
			required: true,
			default: false
		}
    },
    methods: {
        returnHome: function() {
            this.$router.push("/");
        }
    }
};
</script>

<style lang="sass" scoped>
.menu-wrapper
    position: absolute
    width: fit-content
    left: 0
    top: 0
    padding: 32px
    width: 100%
    z-index: 100000
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)
    display: grid
    grid-template-columns: max-content 1fr max-content
    grid-template-areas: "return-button . share-info"


    button
        margin: 0
        padding: 0
        display: block
        background: unset
        border: unset
        color: white
        vertical-align: middle
        font-family: inherit
        height: unset
        width: unset 
        outline: unset

    .return-button
        grid-area: return-button
        cursor: pointer
        opacity: 0.75
        transition-duration: .2s

        &:hover
            opacity: 1
            transform: Scale(1.1)

        img
            display: inline-block
            height: 32px
            vertical-align: middle
            margin-right: 16px

        .header
            display: inline-block
            font-size: 10pt
            text-transform: uppercase
            font-weight: 800
            letter-spacing: .5px

    .share-info
        grid-area: share-info
        

.slide-top-enter-active, .slide-top-leave-active 
    transition-duration: 0.5s
    opacity: 1
    transform: TranslateY(0%)

.slide-top-enter, .slide-top-leave-to
    transition-duration: 0.5s
    opacity: 0
    transform: TranslateY(-25%)

</style>