<template>
	<div class="content">
		<form v-on:submit.prevent spellcheck="false">
			<h2>Wyświetlanie</h2>
			<br />Tytuł odcinka
			<input type="text" :placeholder="`Odcinek 1`" v-model="episodeData.name"/>
			<br />Data premiery
			<input type="date" v-model="episodeData.releaseDate"/>
			<br />Sezon
			<input type="number" min="1" max="99" v-model="episodeData.seasonNumber"/>
			<br />Numer odcinka
			<input type="number" min="1" max="99" v-model="episodeData.episodeNumber"/>
			<br />Widoczność
			<br />
			<h2>Plik wideo</h2>
            Magnet link
			<br/><textarea placeholder = "Wklej magnet link" v-model="episodeData.magnetLink"></textarea>
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
			<v-normal-button @click="saveEpisode()">Zapisz zmiany</v-normal-button>
		</form>
	</div>
</template>

<script>
import EpisodeData from "@classes/EpisodeData";

import NormalButton from "@/components/Forms/Buttons/NormalButton";


export default {
	name: "SettingsEpisodeEdit",
	data: function() {
		return {
            languages: {
                PL: "Polski",
                ENG: "Angielski"
            },
            episodeData: new EpisodeData({name: "Chapter 1: The Mandalorian", seasonNumber: 1, episodeNumber: 1, releaseDate: "2019-11-12", seriesId: this.$route.query.seriesId})
        };
    },
    methods: {
        saveEpisode() {
            EpisodeData.saveEpisode(this.episodeData);
        },
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
