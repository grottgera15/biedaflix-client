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
        <v-serie-banner
            :serieData="serieData"
        />
        <v-text-area
            :id="`description`"
            :label="`Opis serialu`"
            v-model="serieData.description"
            :placeholder="`Opisz serial dla użytkowników`"
            :required="true"
            :validated="simpleTextValidation(`description`, serieData.description)"
        />
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
        /> -->
    </form>
</template>

<script>
import SerieBanner from "@/components/Serie/SerieBanner";

import AdminTextInput from "@/components/Forms/Admin/AdminTextInput";
import AdminFileInput from "@/components/Forms/Admin/AdminFileInput";
import AdminTextArea from "@/components/Forms/Admin/AdminTextArea";
// import AdminSelect from "@/components/Forms/Admin/AdminSelect";

import SerieData from "@classes/SerieData";

export default {
    name: "AdminSerieEdit",
    data() {
        return {
            validation: {}
        };
    },
    methods: {
        simpleTextValidation(fieldName, text) {
            let result;
            if (text.length > 0)
                result = true;
            else
                result = false;
            this.validation[`${fieldName}_simpleText`] = result;
            return result;
        },
        fileTypeValidation(fieldName, file, type) {
            let result;
            if (file instanceof File) 
                result = file.type.startsWith(type);
            else 
                result = false;   
            this.validation[fieldName + "_type"] = result;
            return result;
        },
        fullValidation() {
            return Object.values(this.validation).includes(false, 0);
        }
    },
    props: {
        serieData: {
            type: SerieData,
            required: true
        }
    },
    components: {
        "v-serie-banner": SerieBanner,
        "v-text-input": AdminTextInput,
        "v-file-input": AdminFileInput,
        "v-text-area": AdminTextArea,
        // "v-select": AdminSelect
    },
};
</script>

<style lang="sass" scoped>

</style>