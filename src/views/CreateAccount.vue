<template>
	<form autocomplete="off">
		<div class="header">
			<span>Utwórz konto</span>
		</div>
		<TextInput v-model="user.email">Adres e-mail</TextInput>
		<TextInput :type="'Password'">Hasło</TextInput>
		<TextInput :type="'Password'">Powtórz hasło</TextInput>
		<Button>Zarejestruj się</Button>
	</form>
</template>

<script>
import Button from "@/components/Forms/Buttons/Button";
import TextInput from "@/components/Forms/Inputs/TextInput";

export default {
	name: "Registration",
	data: function() {
		return {
			user: {
				email: null
			}
		};
	},
	components: {
		Button,
		TextInput
	}
};
</script>


<style scoped lang="sass">
@import "@styles/variables"
form
    margin: 8px 48px

    .header
        font-size: 24pt
        font-weight: 500
        letter-spacing: 1px
        margin-top: 24px
        margin-bottom: 36px
        text-align: center

    button
        margin-top: 8px


</style>
