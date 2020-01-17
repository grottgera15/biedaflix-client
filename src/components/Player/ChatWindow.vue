<template>
	<div class="chat-window">
		<div class="content">
			<div class="messages">
				<div
					class="message"
					v-for="(message, i) in messages"
					:key="i"
					:class="(i >= focusedMessages.start && i <= focusedMessages.end && mouseOverMessages ? 'message-active' : '')"
					@mouseover="focusedMessages = getMessagesFromSameAuthor(i)"
                    @mouseenter="mouseOverMessages = true"
                    @mouseleave="mouseOverMessages = false"
				>
					<AvatarBlock
						:avatar="avatars[1]"
						:class="isClient(message.email) ? 'client-avatar' : 'server-avatar'"
						v-show="!hasNextMessageSameAuthor(i)"
					/>
					<div :class="isClient(message.email) ? 'client-content' : 'server-content'">{{message.message}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Avatar from "../../classes/Avatar.js";
import AvatarBlock from "../AvatarBlock.vue";

import avatars from "../Mixins/avatarsMixin.js";

import ChatMessage from "../../classes/ChatMessage.js";

export default {
	name: "ChatWindow",
	data: function() {
		return {
			avatars: [
				new Avatar("eyes1", "nose1", "mouth10"),
				new Avatar("eyes1", "nose2", "mouth10")
			],
			focusedMessages: {
				start: null,
				end: null
            },
            mouseOverMessages: false,
			messages: [
				new ChatMessage(
					"zommer128@gmail.com",
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				),
				new ChatMessage(
					"zommer128@gmail.com",
					"Fusce consequat dolor eget erat molestie condimentum."
				),
				new ChatMessage(
					"aleksander.szamalek@gmail.com",
					"In pharetra neque vel magna feugiat, ac fermentum neque eleifend."
				),
				new ChatMessage(
					"zommer128@gmail.com",
					"Maecenas vestibulum mollis neque at porttitor."
				),
				new ChatMessage(
					"karolinaignaczak.com",
					"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
				),
				new ChatMessage(
					"aleksander.szamalek@gmail.com",
					"Donec bibendum in elit quis finibus."
				),
				new ChatMessage(
					"aleksander.szamalek@gmail.com",
					"Suspendisse mi risus, maximus sit amet gravida et, dignissim quis lorem."
				)
			]
		};
	},
	components: {
		AvatarBlock
	},
	mixins: [avatars],
	methods: {
		isClient: function(email) {
			if (email === "aleksander.szamalek@gmail.com") return true;
			return false;
		},
		hasNextMessageSameAuthor: function(messageIndex) {
			if (messageIndex >= this.messages.length - 1) return false;
			if (
				this.messages[messageIndex].email ===
				this.messages[messageIndex + 1].email
			)
				return true;
			return false;
		},
		getMessagesFromSameAuthor: function(messageIndex) {
			let startIndex = messageIndex;
			let messageAuthor = this.messages[messageIndex].email;
			for (let i = startIndex - 1; i >= 0; i--) {
				if (this.messages[i].email !== messageAuthor) {
					startIndex = i + 1;
					break;
				}
				startIndex = i;
			}
			let endIndex = messageIndex;
			for (let i = endIndex + 1; i <= this.messages.length - 1; i++) {
				if (this.messages[i].email !== messageAuthor) {
					endIndex = i - 1;
					break;
				}
				endIndex = i;
			}
			return {
				start: startIndex,
				end: endIndex
			};
		}
	}
};
</script>

<style lang="sass" scoped>
.chat-window
    position: absolute
    right: 0%
    top: 25%
    height: 50%
    z-index: 10000000

    .content
        position: relative
        padding-right: 128px

        .messages
            height: 100%
            padding: 4px
            border-radius: 8px
            background: linear-gradient(0deg, #00000070 0%, rgba(0,0,0,0) 100%)

            .message
                display: grid
                grid-template-columns: 32px 256px 32px 
                grid-template-areas: "server text client"
                align-items: center
                opacity: .5
                cursor: default
                font-size: 10pt
                line-height: 14pt
                letter-spacing: 0.5px
                text-shadow: 4px 4px 8px black
                transition-duration: .2s
                margin: 8px 8px

                .server-avatar, .client-avatar
                    width: 100%
                    box-shadow: #00000070 2px 2px 8px

                .server-avatar
                    grid-area: server

                .client-avatar
                    grid-area: client

                .server-content, .client-content
                    grid-area: text
                    margin: 0 12px

                .server-content
                    margin-right: 32px

                .client-content
                    margin-left: 32px

            .message-active
                opacity: 1

</style>