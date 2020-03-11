<template>
    <form ref="seriesform" v-on:submit.prevent @submit="saveSeries()">
        <v-text-input
            name="name"
            :id="`name`"
            :label="`Tytuł`"
            v-model="seriesData.name"
            :placeholder="`Dodaj tytuł serialu`"
            :required="true"
            :validated="simpleTextValidation(`name`, seriesData.name)"
        />
        <v-serie-banner :seriesData="seriesData" />
        <v-text-area
            name="description"
            :id="`description`"
            :label="`Opis serialu`"
            v-model="seriesData.description"
            :placeholder="`Opisz serial dla użytkowników`"
            :required="true"
            :validated="simpleTextValidation(`description`, seriesData.description)"
        />
        <v-inline>
            <v-file-input
                name="logo"
                :id="`logoFile`"
                :label="`Logo serialu`"
                v-model="seriesData.logo.file"
                :required="true"
                :validated="fileTypeValidation(`logo`, seriesData.logo.file, `image`)"
            />
            <v-file-input
                name="banner"
                :id="`bannerFile`"
                :label="`Wideo okładka serialu`"
                v-model="seriesData.banner.file"
                :required="true"
                :validated="fileTypeValidation(`banner`, seriesData.banner.file, `video`)"
            />
        </v-inline>
        <v-inline>
            <v-select
                name="sourceId"
                :id="`source`"
                :label="`Źródło`"
                :options="sourcesSelect"
                v-model="seriesData.sourceId"
            />
            <v-select
                name="status"
                :id="`visibility`"
                :label="`Widoczność`"
                v-model="seriesData.status"
                :required="true"
                :options="seriesStatuses"
            />
        </v-inline>
        <v-full-width-button :disabled="fullValidation()">Dodaj</v-full-width-button>
    </form>
</template>

<script>
import SerieBanner from "@/components/Serie/SerieBanner";

import SettingsTextInput from "@/components/Forms/Settings/SettingsTextInput";
import SettingsFileInput from "@/components/Forms/Settings/SettingsFileInput";
import SettingsTextArea from "@/components/Forms/Settings/SettingsTextArea";
import SettingsSelect from "@/components/Forms/Settings/SettingsSelect";

import SettingsInline from "@/components/Settings/SettingsInline";

import SourceData from "@classes/SourceData";
import SeriesData from "@classes/SeriesData";

import FullWidthButton from "@/components/Forms/Buttons/FullWidthButton";

import validationMixin from "@mixins/validationMixin";

export default {
    name: "SettingsSeriesEdit",
    computed: {
        sourcesSelect() {
            const sources = new Map();
            this.sourcesData.forEach(source =>
                sources.set(source.id, source.name)
            );
            return sources;
        }
    },
    props: {
        seriesData: {
            type: SeriesData,
            required: true
        },
        sourcesData: {
            type: Array,
            required: true,
            validator: sources =>
                sources.every(element => element instanceof SourceData)
        },
        seriesStatuses: {
            type: Map,
            required: true
        }
    },
    methods: {
        saveSeries() {
            this.$emit("save-series", document.querySelector("form"));
        }
    },
    components: {
        "v-inline": SettingsInline,
        "v-full-width-button": FullWidthButton,
        "v-serie-banner": SerieBanner,
        "v-text-input": SettingsTextInput,
        "v-file-input": SettingsFileInput,
        "v-text-area": SettingsTextArea,
        "v-select": SettingsSelect
    },
    mixins: [validationMixin]
};
</script>