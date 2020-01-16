<template>
	<div id="wrapper">
		<Logo />
		<form class="inputs" autocomplete="off">
			<div class="header">
				<span>Rejestracja</span>
			</div>

            <AvatarBlock :avatar="avatar"/>
			<TextInput v-model="user.email">Adres e-mail</TextInput>
			<TextInput :type="'Password'">Hasło</TextInput>
			<TextInput :type="'Password'">Powtórz hasło</TextInput>
			<Button>Zarejestruj się</Button>
		</form>
	</div>
</template>

<script>
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";
import Logo from "../components/Logo.vue";

import Avatar from "../classes/Avatar.js";
import avatars from "../components/Mixins/avatarsMixin.js";
import AvatarBlock from "../components/AvatarBlock.vue";

export default {
	name: "Registration",
	data: function() {
		return {
			user: {
				email: null
			},
			avatar: new Avatar(null, null, null)
		};
	},
	components: {
		Logo,
		Button,
        TextInput,
        AvatarBlock
    },
    mixins: [
        avatars
    ],
    watch: {
        'user.email': function() {
            this.avatar = this.GenerateRandomAvatar();
        }
    }
};
</script>


<style scoped lang="sass">
@import "../styles/variables.sass"

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
