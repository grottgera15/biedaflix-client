<template>
	<form v-on:submit.prevent>
		<div class="header">
			<span>Utwórz konto</span>
		</div>
		<TextInput v-model="user.email">Adres e-mail</TextInput>
		<TextInput v-model="user.password" :type="'Password'">Hasło</TextInput>
		<TextInput v-model="user.password" :type="'Password'">Powtórz hasło</TextInput>
		<Button @click="register()">Zarejestruj się</Button>
	</form>
</template>

<script>
import Button from "@/components/Forms/Buttons/Button";
import TextInput from "@/components/Forms/Inputs/TextInput";
import axios from "axios";

export default {
	name: "Registration",
	data: function() {
		return {
			user: {
				email: null,
				password: null
			}
		};
	},
	methods: {
		register() {
			console.log(`register start`);
			axios
				.post(
					"http://api.biedaflix.pl/register",
					JSON.stringify(this.user),
					{
						headers: {
							"content-type": "application/json"
						}
					}
				)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					throw err;
				});
		}
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
