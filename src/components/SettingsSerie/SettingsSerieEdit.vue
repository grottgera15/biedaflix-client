<template>
    <form v-on:submit.prevent>
        <v-text-input
            :id="`name`"
            :label="`Tytuł`"
            v-model="seriesData.name"
            :placeholder="`Dodaj tytuł serialu`"
            :required="true"
            :validated="simpleTextValidation(`name`, seriesData.name)"
        />
        <v-serie-banner :seriesData="seriesData" />
        <v-text-area
            :id="`description`"
            :label="`Opis serialu`"
            v-model="seriesData.description"
            :placeholder="`Opisz serial dla użytkowników`"
            :required="true"
            :validated="simpleTextValidation(`description`, seriesData.description)"
        />
        <v-inline>
            <v-file-input
                :id="`logoFile`"
                :label="`Logo serialu`"
                v-model="seriesData.logo.file"
                :required="true"
                :validated="fileTypeValidation(`logo`, seriesData.logo.file, `image`)"
            />
            <v-file-input
                :id="`bannerFile`"
                :label="`Wideo okładka serialu`"
                v-model="seriesData.banner.file"
                :required="true"
                :validated="fileTypeValidation(`banner`, seriesData.banner.file, `video`)"
            />
        </v-inline>
        <v-inline>
            <v-select
                :id="`source`"
                :label="`Źródło`"
                :options="sourcesSelect"
                v-model="seriesData.sourceId"
            />
            <v-select
                :id="`visibility`"
                :label="`Widoczność`"
                v-model="seriesData.status"
                :required="true"
                :options="{
					ANNOUNCED: `Zapowiedziany`,
					ONGOING: `Trwa`,
					FINISHED: `Zakończony`,
					NEW_EPISODES: `Nowe odcinki`
				}"
            />
        </v-inline>
        <v-normal-button :disabled="fullValidation()" @click="saveSerie()">Dodaj</v-normal-button>
        <!-- <v-select
            :id="`status`"
            :label="`Status`"
            :options="{
					announced: `Zapowiedziany`,
					ongoing: `Trwający`,
					ended: 'Zakończony'
				}"
            v-model="SeriesData.status"
        />-->
    </form>
</template>

<script>
import SerieBanner from "@/components/Serie/SerieBanner";

import SettingsTextInput from "@/components/Forms/Settings/SettingsTextInput";
import SettingsFileInput from "@/components/Forms/Settings/SettingsFileInput";
import SettingsTextArea from "@/components/Forms/Settings/SettingsTextArea";
import SettingsSelect from "@/components/Forms/Settings/SettingsSelect";

import SettingsInline from "@/components/Settings/SettingsInline";

import SeriesData from "@classes/SeriesData";
import SourceData from "@classes/SourceData";

import NormalButton from "@/components/Forms/Buttons/NormalButton";

import validationMixin from "@mixins/validationMixin";

export default {
    name: "SettingsSerieEdit",
    data() {
        return {
            sources: []
        }
    },
    async created() {
        this.sources = await SourceData.loadSources();
        console.log(this.sources);
    },
    computed: {
        sourcesSelect() {
            let sources = {};
            for (let source of this.sources)
                sources[source.id] = source.name;
            return sources;
        }
    },
    props: {
        seriesData: {
            type: SeriesData,
            required: true
        }
    },
    methods: {
        saveSerie() {
            SeriesData.saveSerie(this.seriesData);
        }
    },
    components: {
        "v-inline": SettingsInline,
        "v-normal-button": NormalButton,
        "v-serie-banner": SerieBanner,
        "v-text-input": SettingsTextInput,
        "v-file-input": SettingsFileInput,
        "v-text-area": SettingsTextArea,
        "v-select": SettingsSelect
    },
    mixins: [validationMixin]
};
</script>