<template>
	<form v-on:submit.prevent >
		<div class="header">
			<span>Zaloguj się</span>
		</div>

		<TextInput v-model="user.email">Adres e-mail</TextInput>
		<TextInput v-model="user.password" :type="'Password'">Hasło</TextInput>
		<Button @click="login()">Zaloguj się</Button>
	</form>
</template>

<script>
import Button from "@/components/Forms/Buttons/Button";
import TextInput from "@/components/Forms/Inputs/TextInput";

import axios from "axios";

export default {
	data: function() {
		return {
			user: {
				email: null,
				password: null
			}
		};
	},
	components: {
		Button,
		TextInput
	},
	methods: {
		MinimalizeLabel(event) {
			this.user[event.target.id] = true;
		},
		login() {
			console.log(`login start`);
			axios
				.post(
					"http://api.biedaflix.pl/api/login",
					JSON.stringify(this.user),
					{
						headers: {
							"content-type": "application/json",
						},
						withCredentials: true
					}
				)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					throw err;
				});
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
