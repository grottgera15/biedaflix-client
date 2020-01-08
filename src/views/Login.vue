<template>
	<div id="app">
		<div id="wrapper">
			<Logo />
			<div class="header">
				<span>Zaloguj się</span>
			</div>
			<form class="inputs" autocomplete="off">
				<TextInput>Adres e-mail</TextInput>
                <TextInput :type="'Password'">Hasło</TextInput>
				<Button>Zaloguj się</Button>
			</form>
		</div>
	</div>
</template>

<script>
import Logo from "../components/Logo.vue";
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";

export default {
	data: function() {
		return {
			labelsClicked: {
				email: false,
				password: false
			}
		};
	},
	components: {
        Logo,
        Button,
        TextInput
	},
	methods: {
		MinimalizeLabel(event) {
			this.labelsClicked[event.target.id] = true;
		}
	}
};
</script>


<style scoped lang="sass">
@import "../styles/variables.sass"


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
