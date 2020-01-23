<template>
	<PlayerPopUp @close-pop-up="$emit('close-pop-up')">
		<template v-slot:header>Ustawienia</template>
		<div class="section-header">Napisy</div>
		<div class="settings-wrapper" ref="settingswrapper">
			<button class="setting-button" @click="currentSubtitles = 0">Wyłączone</button>
			<button class="setting-button" @click="currentSubtitles = 1">Polski</button>
			<button class="setting-button" @click="currentSubtitles = 2">Angielski</button>
			<div class="active" :style="{height: (100 / 3 + '%'), top: (100 / 3 * currentSubtitles + '%')}" />
		</div>
		<div class="section-header">Jakość</div>Full HD
		<br />HD
		<br />Mobilna
		<br />
		<div class="section-header">Wspólne oglądanie</div>Tak
	</PlayerPopUp>
</template>

<script>
import PlayerPopUp from "./PlayerPopUp.vue";

export default {
	name: "SettingsPopUp",
	components: {
		PlayerPopUp
	},
	data: function() {
		return {
			currentSubtitles: 1
		};
	},
	methods: {
		buttonHeight: function() {
			if (this.$refs.settingswrapper)
				return this.$refs.settingswrapper.clientHeight;
			return 0;
		}
	},
	computed: {
		activePosition: function() {
			return this.buttonHeight();
		}
	}
};
</script>

<style lang="sass" scoped>

.section-header
    font-size: 12pt
    letter-spacing: 1px
    color: #ffffffbb
    margin: 4px 8px

.settings-wrapper
    margin: 4px 8px
    position: relative
    z-index: 1000

    button
        padding: 4px 0px
        width: 100%
        text-align: left
        cursor: pointer

    .active
        top: 0%
        position: absolute
        width: 100%
        height: 5px
        background-color: firebrick
        z-index: -1
        transition-duration: .1s

button
    display: block
    border: 0
    outline: none
    background-color: unset
    font-family: inherit
    color: #ffffffbb
    padding: unset
</style>