<template>
    <form v-on:submit.prevent @submit="saveEpisode()" spellcheck="false">
        <v-text-input
            name="name"
            :id="`name`"
            :label="`Tytuł`"
            v-model="episodeData.name"
            :placeholder="`Dodaj tytuł odcinka`"
            :required="true"
        />
        <v-inline>
            <v-text-input
                name="seasonNumber"
                :id="`seasonNumber`"
                :label="`Numer sezonu`"
                v-model="episodeData.seasonNumber"
                :placeholder="`Wpisz numer sezonu`"
                :required="true"
            />
            <v-text-input
                name="episodeNumber"
                :id="`episodeNumber`"
                :label="`Numer odcinka`"
                v-model="episodeData.episodeNumber"
                :placeholder="`Wpisz numer odcinka`"
                :required="true"
            />
            <v-text-input
                name="releaseDate"
                :id="`releaseDate`"
                :label="`Data wydania`"
                v-model="episodeData.releaseDate"
                :placeholder="`Wpisz datę wydania`"
                :required="true"
            />
        </v-inline>
        <v-text-area
            name="magnetLink"
            :id="`magnetLink`"
            :label="`Magnet link do torrenta`"
            v-model="episodeData.magnetLink"
            :placeholder="`Dodaj magnet link`"
            :required="false"
        />
        <v-full-width-button>Zapisz zmiany</v-full-width-button>
    </form>
</template>

<script>
import FullWidthButton from "@/components/Forms/Buttons/FullWidthButton";
import SettingsTextInput from "@/components/Forms/Settings/SettingsTextInput";
import SettingsTextArea from "@/components/Forms/Settings/SettingsTextArea";

import SettingsInline from "@/components/Settings/SettingsInline";

import EpisodeData from "@classes/EpisodeData";

export default {
    name: "SettingsEpisodeEdit",
    props: {
        episodeData: {
            type: EpisodeData,
            required: true
        }
    },
    methods: {
        saveEpisode() {
            this.$emit("save-episode", this.episodeData);
        }   
    },
    components: {
        "v-full-width-button": FullWidthButton,
        "v-text-input": SettingsTextInput,
        "v-text-area": SettingsTextArea,
        "v-inline": SettingsInline
    }
};
</script>

<style lang="sass" scoped>

</style>
