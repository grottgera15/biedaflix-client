<template>
	<div class="content">
		<form v-on:submit.prevent spellcheck="false">
			<h2>Wyświetlanie</h2>
			<br />Tytuł odcinka
			<input type="text" :placeholder="`Odcinek 1`"/>
			<br />Data premiery
			<input type="date" />
			<br />Sezon
			<input type="number" min="1" max="99" />
			<br />Numer odcinka
			<input type="number" min="1" max="99" />
			<br />Widoczność
			<br />
			<select>
				<option>Publiczny</option>
				<option>Niedostępny</option>
			</select>
			<h2>Plik wideo</h2>
            Magnet link
			<br/><textarea placeholder = "Wklej magnet link"></textarea>
			<h2>Napisy</h2>
            <div v-show="Object.keys(availableLanguages).length > 0">
            <select ref="availableLanguages">
				<option v-for="(language, key) in availableLanguages" :key="key" :value="key">{{language}}</option>
			</select>
            <button @click="addSubtitles()">Dodaj napisy</button>
            </div>
            <ul>
                <li v-for="(language, key) in episodeData.subtitles" :key="key">    
                    {{languages[key]}}
                    <br/>{{language}}
                    <input type="file" id="file" ref="background" />
                </li>
            </ul>
			<v-normal-button>Zapisz zmiany</v-normal-button>
		</form>
	</div>
</template>

<script>
import EpisodeData from "../classes/EpisodeData.js";

import NormalButton from "@/components/Forms/Buttons/NormalButton";

export default {
	name: "AdminEpisodeEdit",
	data: function() {
		return {
            languages: {
                PL: "Polski",
                ENG: "Angielski"
            },
            episodeData: new EpisodeData("Chapter 1: The Mandalorian", 1, 1, false, "2019-11-12")
        };
    },
    methods: {
        addSubtitles() {
            let subtitleIndex = this.$refs.availableLanguages.selectedIndex;
            let subtitleHash = this.$refs.availableLanguages.options[subtitleIndex].value;
            this.episodeData.addSubtitles({
                [subtitleHash]: null
            });
        }
    },
    computed: {
        availableLanguages() {
            let availableLanguages = {};
            for (let language in this.languages) {
                console.log (language);
                if (!this.episodeData.containLanguage(language)) {
                    availableLanguages[language] = this.languages[language];
                }
            }
            return availableLanguages;
        }
    },
	components: {
		"v-normal-button": NormalButton
	}
};
</script>


<style scoped lang="sass">
@import "@styles/variables"
.content
    button
        margin-top: 8px

input
    letter-spacing: 0.5px
    font-weight: 500
    font-family: inherit
    background-color: unset
    border: 0
    border-bottom: 1px solid #ffffff17
    color: inherit
    width: calc(100% - 2 * 24px)
    padding: 10px 12px
    outline: unset !important
    cursor: unset !important

textarea
    width: 100%
    min-height: 100px
    font-family: inherit
    resize: none
    outline: none
    color: inherit
    background: unset
    border: unset
</style>
