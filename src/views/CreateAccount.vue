<template>
	<form v-on:submit.prevent>
		<div class="header">
			<span>Utwórz konto</span>
		</div>
		<TextInput v-model="user.email">Adres e-mail</TextInput>
		<TextInput v-model="user.username">Nazwa użytkownika</TextInput>
		<TextInput v-model="user.password" :type="'Password'">Hasło</TextInput>
		<TextInput v-model="user.password" :type="'Password'">Powtórz hasło</TextInput>
		<v-normal-button @click="register()">Zarejestruj się</v-normal-button>
	</form>
</template>

<script>
import NormalButton from "@/components/Forms/Buttons/NormalButton";
import TextInput from "@/components/Forms/Inputs/TextInput";
import axios from "axios";

export default {
	name: "Registration",
	data: function() {
		return {
			user: {
				email: null,
				username: null,
				password: null
			}
		};
	},
	methods: {
		register() {
			axios
				.post(
					`${process.env.VUE_APP_API_PATH}/users`,
					this.user,
					{
						headers: {
							"content-type": "application/json"
						}
					}
				)
				.then(res => {
					res;
				})
				.catch(err => {
					throw err;
				});
		}
	},
	components: {
		"v-normal-button": NormalButton,
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
