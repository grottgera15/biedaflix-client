<template>
    <form v-on:submit.prevent>
        <v-text-input
            :id="`name`"
            :label="`Tytuł`"
            v-model="serieData.name"
            :placeholder="`Dodaj tytuł serialu`"
            :required="true"
            :validated="simpleTextValidation(`name`, serieData.name)"
        />
        <v-serie-banner :serieData="serieData" />
        <v-text-area
            :id="`description`"
            :label="`Opis serialu`"
            v-model="serieData.description"
            :placeholder="`Opisz serial dla użytkowników`"
            :required="true"
            :validated="simpleTextValidation(`description`, serieData.description)"
        />
        <v-inline>
            <v-file-input
                :id="`logoFile`"
                :label="`Logo serialu`"
                v-model="serieData.logo"
                :required="true"
                :validated="fileTypeValidation(`logo`, serieData._logo, `image`)"
            />
            <v-file-input
                :id="`bannerFile`"
                :label="`Wideo okładka serialu`"
                v-model="serieData.banner"
                :required="true"
                :validated="fileTypeValidation(`banner`, serieData._banner, `video`)"
            />
        </v-inline>
        <button :disabled="fullValidation()">Validation test</button>
        <!-- <v-select
            :id="`visibility`"
            :label="`Widoczność`"
            :options="{
					unavailable: `Niedostępny`,
					available: `Dostępny`
				}"
            v-model="serieData.availability"
        />
        <v-select
            :id="`status`"
            :label="`Status`"
            :options="{
					announced: `Zapowiedziany`,
					ongoing: `Trwający`,
					ended: 'Zakończony'
				}"
            v-model="serieData.status"
        />
        <v-select
            :id="`source`"
            :label="`Źródło`"
            :options="sourcesSelectObject"
            v-model="serieData.sourceId"
        />-->
    </form>
</template>

<script>
import SerieBanner from "@/components/Serie/SerieBanner";

import SettingsTextInput from "@/components/Forms/Settings/SettingsTextInput";
import SettingsFileInput from "@/components/Forms/Settings/SettingsFileInput";
import SettingsTextArea from "@/components/Forms/Settings/SettingsTextArea";
// import SettingsSelect from "@/components/Forms/Settings/SettingsSelect";

import SettingsInline from "@/components/Settings/SettingsInline";

import SerieData from "@classes/SerieData";

import validationMixin from "@mixins/validationMixin";

export default {
    name: "SettingsSerieEdit",
    props: {
        serieData: {
            type: SerieData,
            required: true
        }
    },
    components: {
        "v-inline": SettingsInline,
        "v-serie-banner": SerieBanner,
        "v-text-input": SettingsTextInput,
        "v-file-input": SettingsFileInput,
        "v-text-area": SettingsTextArea
        // "v-select": SettingsSelect
    },
    mixins: [validationMixin]
};
</script>