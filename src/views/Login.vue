<template>
	<div id="wrapper">
		<Logo />
		<form class="inputs" autocomplete="off">
			<div class="header">
				<span>Zaloguj się</span>
			</div>

			<TextInput>Adres e-mail</TextInput>
			<TextInput :type="'Password'">Hasło</TextInput>
			<Button>Zaloguj się</Button>
		</form>
	</div>
</template>

<script>
import Logo from "@/components/Logo";
import Button from "@/components/Forms/Buttons/Button";
import TextInput from "@/components/Forms/Inputs/TextInput"

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
@import "@styles/variables"

#wrapper
    margin: 24px 0
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-template-areas: ". logo ."  ". main ."
    grid-row-gap: 16px
    padding: 0 24px
    @media screen and (max-width: 1600px)
        grid-template-columns: 0.5fr 1fr 0.5fr
    @media screen and (max-width: 1200px)
        grid-template-columns: 0.25fr 1fr 0.25fr
    @media screen and (max-width: 720px)
        grid-template-columns: 1fr
        grid-template-areas: "logo" "main"
    
    .inputs
        grid-area: main

        .header
            grid-column-start: name
            font-size: 14pt
            font-weight: 700
            padding: 16px 48px
            border-bottom: 1px solid #ffffff17  
            align-items: center
        
        

</style>
