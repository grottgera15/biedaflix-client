<template>
	<div id="app">
		<div id="wrapper">
            <div class = "logo">
                <img src = "../files/images/BiedaFlix500px.png"/>
            </div>
			<div class="header">
                <span>Rejestracja</span>
            </div>
            <form autocomplete="off">
			<div class="inputs">
				<TextInput>Adres e-mail</TextInput>
                <TextInput>Hasło</TextInput>
                <TextInput>Powtórz hasło</TextInput>
                <Button>Zarejestruj się</Button>
			</div>
            </form>
		</div>
	</div>
</template>

<script>
import Button from "../components/Button.vue"
import TextInput from "../components/TextInput.vue"
export default {
    components: {
        Button,
        TextInput
    }
};
</script>


<style scoped lang="sass">

#app
    width: 100%
    height: 100%
    display: grid
    grid-template-columns: 1.5fr [main] 1fr 1.5fr
    @media screen and (max-width: 1600px)
        grid-template-columns: 1fr [main] 1fr 1fr
    @media screen and (max-width: 1200px)
        grid-template-columns: 0.5fr [main] 1fr 0.5fr
    @media screen and (max-width: 720px)
        grid-template-columns: [main] 1fr

#wrapper
    grid-column-start: main
    margin-top: 64px
    padding: 0 24px
    .logo
        display: grid
        margin-bottom: 64px
        img
            max-width: 256px
            justify-self: center
    .header
        grid-column-start: name
        font-size: 14pt
        font-weight: 700
        padding: 16px 48px
        border-bottom: 1px solid #ffffff17  
        align-items: center
    .inputs
        margin-top: 16px
        
        

</style>
