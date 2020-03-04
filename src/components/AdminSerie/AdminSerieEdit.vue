<template>
    <form v-on:submit.prevent>
        <div class="page-title">
            <h2>Szczegóły serialu</h2>
            <div class="page-title__buttons-right">
                <v-small-button :disabled="true">Cofnij zmiany</v-small-button>
                <v-small-button @click="saveSerie()">Zapisz</v-small-button>
            </div>
        </div>
        <v-admin-text-input
            :id="`name`"
            :label="`Tytuł`"
            v-model="serieData.name"
            :placeholder="`Dodaj tytuł serialu`"
            :required="true"
            :validated="nameValidation"
        />
        <div class="series-cover">
            <div class="series-cover__logo">
                <img :src="serieData.logo" />
            </div>
            <div class="series-cover__background">
                <video autoplay muted loop ref="video" :src="serieData.banner"></video>
            </div>
            <div class="series-cover__description">
                <span v-html="serieData.description" />
            </div>
        </div>
        <v-admin-text-area
            :id="`description`"
            :label="`Opis serialu`"
            v-model="serieData.description"
            :placeholder="`Opisz serial dla użytkowników`"
            :required="true"
            :validated="descriptionValidation"
        />
        <v-admin-file-input
            :id="`logoFile`"
            :label="`Logo serialu`"
            v-model="serieData.logo"
            :required="true"
        />
        <v-admin-file-input
            :id="`logoFile`"
            :label="`Wideo okładka serialu`"
            v-model="serieData.banner"
            :required="true"
        />
        <v-admin-select
            :id="`visibility`"
            :label="`Widoczność`"
            :options="{
					unavailable: `Niedostępny`,
					available: `Dostępny`
				}"
            v-model="serieData.availability"
        />
        <v-admin-select
            :id="`status`"
            :label="`Status`"
            :options="{
					announced: `Zapowiedziany`,
					ongoing: `Trwający`,
					ended: 'Zakończony'
				}"
            v-model="serieData.status"
        />
        <v-admin-select
            :id="`source`"
            :label="`Źródło`"
            :options="sourcesSelectObject"
            v-model="serieData.sourceId"
        />
    </form>
</template>

<script>

import SmallButton from "@/components/Forms/Buttons/SmallButton";

import AdminTextInput from "@/components/Forms/Admin/AdminTextInput";
import AdminFileInput from "@/components/Forms/Admin/AdminFileInput";
import AdminTextArea from "@/components/Forms/Admin/AdminTextArea";
import AdminSelect from "@/components/Forms/Admin/AdminSelect";

import SerieData from "@classes/SerieData";

export default {
    name: "AdminSerieEdit",
    data() {
        return {};
    },
    props: {
        serieData: {
            type: SerieData,
            required: true
        }
    },
    components: {
        "v-small-button": SmallButton,
        "v-admin-text-input": AdminTextInput,
        "v-admin-file-input": AdminFileInput,
        "v-admin-text-area": AdminTextArea,
        "v-admin-select": AdminSelect
    }
};
</script>

<style lang="sass" scoped>

</style>