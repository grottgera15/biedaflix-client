<template>
	<div class="chat-window" @mouseenter="mouseOverChat = true" @mouseleave="mouseOverChat = false">
		<div class="wrapper round-top">
			<div class="content" ref="messagesWrapper">
				<div class="messages" ref="messages">
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
						<div
							:class="isClient(message.email) ? 'client-content' : 'server-content'"
							v-html="message.message"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="textarea-container round-bottom">
			<textarea
				maxlength="256"
				class="input"
				placeholder="Wpisz wiadomość..."
				rows="1"
				@keypress="UpdateTextAreaSize"
				@keydown="UpdateTextAreaSize"
				@keyup="UpdateTextAreaSize"
				:class="{active: mouseOverChat}"
			/>
			<div ref="textareaCopy" v-html="textarea"></div>
		</div>
	</div>
</template>

<script>
import AvatarBlock from "@/components/AvatarBlock";

import avatars from "@mixins/avatarsMixin";

import Avatar from "@classes/Avatar";
import ChatMessage from "@classes/ChatMessage";

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
			messagesToDisplayIndexStart: 0,
			mouseOverMessages: false,
			mouseOverChat: false,
			chatHeight: 40,
			textarea: null,
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
				),
				new ChatMessage(
					"aleksander.szamalek@gmail.com",
					"Vestibulum in orci bibendum, efficitur nunc vitae, ultrices sem."
				),
				new ChatMessage(
					"zommer128@gmail.com",
					"Etiam a nisi ut nibh molestie venenatis pulvinar a nunc."
				),
				new ChatMessage(
					"aleksander.szamalek@gmail.com",
					"Etiam vulputate, magna non consequat tempor, nulla ipsum tempus ligula, at cursus libero orci in mauris."
				),
				new ChatMessage(
					"zommer128@gmail.com",
					"Curabitur porta elementum purus xD"
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
		},
		UpdateChatScroll: function() {
			this.$refs.messagesWrapper.scrollTop = this.$refs.messages.clientHeight;
		},
		UpdateTextAreaSize: function(event) {
			this.textarea = event.srcElement.value.replace("\n", "<br />");
			this.chatHeight = event.srcElement.scrollHeight;
			this.UpdateChatScroll();
		}
	},
	mounted: function() {
		this.UpdateChatScroll();
	},
	watch: {
		messages: function() {
			this.UpdateChatScroll();
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
    margin-right: 128px
    display: grid
    grid-template-columns: 350px
    grid-template-rows: 1fr max-content

    .round-top
        border-top-left-radius: 8px
        border-top-right-radius: 8px
        overflow: hidden

    .round-bottom
        border-bottom-left-radius: 8px
        border-bottom-right-radius: 8px
        overflow: hidden

    .wrapper
        display: block
        position: relative
        overflow: hidden
        height: 100%

        .content
            position: relative
            background: linear-gradient(0deg, #00000070 0%, rgba(0,0,0,0) 100%)
            overflow-y: scroll
            height: 100%

            &::-webkit-scrollbar
                width: 4px

            &::-webkit-scrollbar-thumb
                background: #000000AA

            .messages
                width: calc(100% - 2*4px)
                padding: 4px
                position: relative
                bottom: 0
                left: 0

                .message
                    display: grid
                    grid-template-columns: 32px auto 32px 
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

    .textarea-container
        position: relative
        overflow: hidden

        textarea, div
            word-wrap: break-word
            box-sizing: border-box
            width: 150px
            font-family: inherit
            font-size: 10pt
            padding: 12px
            line-height: 12pt
            background-color: #00000070
            border: unset
            color: #FFFFFFCC
            min-height: 40px
            width: 100%

        textarea
            overflow: hidden
            position: absolute
            height: 100%
            resize: none
            transition: background-color .2s ease-in-out, color .2s ease-in-out

            &:focus
                outline: unset !important

        .active
            background-color: #000000CC
            color: white
                
        div
            visibility: hidden
            white-space: pre-wrap
            
</style>