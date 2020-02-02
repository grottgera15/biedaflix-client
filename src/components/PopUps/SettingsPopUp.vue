<template>
	<TemplatePopUp @close-pop-up="$emit('close-pop-up')">
		<template v-slot:header>Ustawienia</template>
		<div class="settings-grid">
			<div class="subtitles" style="grid-area: subtitles">
				<div class="section-header">Napisy</div>
				<div class="settings-wrapper" ref="settingswrapper">
					<button
						class="setting-button"
						@click="currentSubtitles = 0"
						:class="{active: (currentSubtitles === 0)}"
					>Wyłączone</button>
					<button
						class="setting-button"
						@click="currentSubtitles = 1"
						:class="{active: (currentSubtitles === 1)}"
					>Polski</button>
					<button
						class="setting-button"
						@click="currentSubtitles = 2"
						:class="{active: (currentSubtitles === 2)}"
					>Angielski</button>
					<div
						class="active-bar"
						:style="{height: (100 / 3 + '%'), top: (100 / 3 * currentSubtitles + '%')}"
					/>
				</div>
			</div>
			<div class="quality" style="grid-area: quality">
				<div class="section-header">Jakość</div>
				<div class="settings-wrapper" ref="settingswrapper">
					<button
						class="setting-button"
						@click="currentQuality = 0"
						:class="{active: (currentQuality === 0)}"
					>
						1080p
						<b>HD</b>
					</button>
					<button
						class="setting-button"
						@click="currentQuality = 1"
						:class="{active: (currentQuality === 1)}"
					>
						720p
						<b>HD</b>
					</button>
					<button
						class="setting-button"
						@click="currentQuality = 2"
						:class="{active: (currentQuality === 2)}"
					>480p</button>
					<div
						class="active-bar"
						:style="{height: (100 / 3 + '%'), top: (100 / 3 * currentQuality + '%')}"
					/>
				</div>
			</div>
			<div class="synchronize" style="grid-area: sharing">
				<div class="section-header">Wspólne oglądanie</div>
				<div class="settings-wrapper">
					<StateButton @click="sharingEnabled = !sharingEnabled">
                        <span v-if="!sharingEnabled">Wyłączone</span>
                        <span v-else>Włączone</span>
					</StateButton>
                    <DefaultInput />
				</div>
			</div>
		</div>
	</TemplatePopUp>
</template>

<script>
import TemplatePopUp from "./_TemplatePopUp";

import StateButton from "@/components/Forms/Buttons/StateButton";
import DefaultInput from "@/components/Forms/Inputs/_TemplateInput";

export default {
	name: "SettingsPopUp",
	components: {
		TemplatePopUp,
        StateButton,
        DefaultInput
	},
	data: function() {
		return {
			currentSubtitles: 1,
            currentQuality: 0,
            sharingEnabled: false
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
    margin: 4px 8px

.settings-grid
    display: grid
    grid-template-columns: 1fr 1fr
    grid-template-areas: "subtitles quality" "sharing sharing"

    .settings-wrapper
        margin: 4px 8px
        position: relative
        z-index: 1000

        button
            padding: 4px 0px
            margin: 0 8px
            width: 100%
            text-align: left
            cursor: pointer
            transition-duration: .1s

        .active
            color: white

        .active-bar
            top: 0%
            position: absolute
            width: 100%
            height: 5px
            background-color: firebrick
            z-index: -1
            transition-duration: .1s
            border-radius: 4px

button
    display: block
    border: 0
    outline: none
    background-color: unset
    font-family: inherit
    color: #ffffffbb
    padding: unset
</style>