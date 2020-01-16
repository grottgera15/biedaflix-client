<template>
	<div class="avatar" :style="{'background-image': 'url(' + avatarUrl + ')'}" />
</template>

<script>
import Avatar from "../classes/Avatar.js";
import avatars from "../components/Mixins/avatarsMixin";

export default {
	name: "AvatarBlock",
	props: {
		size: {
			type: Number,
			default: 256
        },
        avatar: {
            type: Avatar,
            required: true
        }
    },
    mixins: [
        avatars
    ],
	computed: {
		sizeInPixels: function() {
			return this.size + "px";
        },
        avatarUrl: function() {
            return this.GenerateAvatar(this.avatar.eyes, this.avatar.nose, this.avatar.mouth, "ffffff"); 
        }
	}
};
</script>

<style lang="sass" scoped>
.avatar
    width: 128px
    height: 128px
    display: inline-block
    background-size: contain
    background-color: WHITE
    border: 1px solid #ffffff17  
    border-radius: 4px
    margin: 16px 0
</style>