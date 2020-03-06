<template>
	<form v-on:submit.prevent >
		<div class="header">
			<span>Zaloguj się</span>
		</div>

		<TextInput v-model="user.login">Adres e-mail / nazwa użytkownika</TextInput>
		<TextInput v-model="user.password" :type="'Password'">Hasło</TextInput>
		<v-full-width-button @click="login()">Zaloguj się</v-full-width-button>
	</form>
</template>

<script>
import auth from "@/auth";

import FullWidthButton from "@/components/Forms/Buttons/FullWidthButton";
import TextInput from "@/components/Forms/Inputs/TextInput";


export default {
	data: function() {
		return {
			user: {
				login: null,
				password: null
			}
		};
	},
	components: {
		"v-full-width-button": FullWidthButton,
		TextInput
	},
	methods: {
		MinimalizeLabel(event) {
			this.user[event.target.id] = true;
		},
		login() {
			auth.login({login: this.user.login, password: this.user.password});
		}
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
