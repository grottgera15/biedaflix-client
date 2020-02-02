<template>
	<img class="avatar" :src="avatarUrl" />
</template>

<script>
import Avatar from "@classes/Avatar";
import avatarsMixin from "@mixins/avatarsMixin";

export default {
	name: "AvatarBlock",
	props: {
        avatar: {
            type: Avatar,
            required: true
        }
    },
    mixins: [
        avatarsMixin
    ],
	computed: {
        avatarUrl: function() {
            return this.GenerateAvatar(this.avatar, "ffffff"); 
        }
	}
};
</script>

<style lang="sass" scoped>
.avatar
    display: inline-block
    background-size: contain
    background-color: WHITE
    border-radius: 4px
</style>