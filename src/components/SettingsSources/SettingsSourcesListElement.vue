<template>
    <form class="source-edit">
        {{source.name}}
        <div class="source-edit__logo">
            <img :src="source.logo" />
        </div>
        <input
            type="file"
            class="hidden-input"
            ref="hiddenFileInput"
            @change="changeFile($event)"
        />
    </form>
    <!-- <form v-on:submit.prevent>
        <SettingsTextInput
            v-model="source.name"
            :label="`Nazwa`"
            :id="`name`"
            :placeholder="`Wpisz nazwę źródła`"
            :required="true"
            :validated="validateName(source.name)"
        />
        <br />
        <div class="source-edit__logo" v-show="source.logo != undefined">
            <img :src="source.logo" />
            <v-small-button @click="chooseFile()">Edytuj</v-small-button>
        </div>
        <div class="source-edit__upload" v-show="source.logo === undefined">
            <v-small-button @click="chooseFile()">Dodaj</v-small-button>
        </div>
        <v-small-button @click="save()">Zapisz</v-small-button>

        <input type="file" class="hidden-input" ref="hiddenFileInput" @change="changeFile($event)" />
    </form>-->
</template>

<script>
import SourceData from "@classes/SourceData.js";
// import SettingsTextInput from "@/components/Forms/Settings/SettingsTextInput";

// import SmallButton from "@/components/Forms/Buttons/SmallButton";

import axios from "axios";

export default {
    name: "SettingsSourcesListElement",
    props: {
        source: {
            type: SourceData,
            required: true
        }
    },
    components: {
        // SettingsTextInput,
        // "v-small-button": SmallButton
    },
    methods: {
        chooseFile() {
            this.$refs.hiddenFileInput.click();
        },
        changeFile(event) {
            if (event.target.files[0]) this.source.file = event.target.files[0];
        },
        validateName(name) {
            if (name.length <= 0) return false;
            return true;
        },
        save() {
            let formData = new FormData();
            formData.append("name", this.source.name);
            formData.append("logo", this.source.file);
            axios
                .post(`${process.env.VUE_APP_API_PATH}/streamingSource`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    throw err;
                });
        }
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.source-edit
    display: flex
    flex-direction: row
    align-items: center
    padding: 16px 24px
    font-size: 10pt
    font-weight: 300
    color: #ffffffa3
    border-bottom: 2px solid #ffffff17
    height: 75px

    &__logo
        max-width: 150px
        max-height: 75px
        height: auto
        width: auto
        float: right

        img
            width: 100%

        button
            position: absolute
            left: 4px
            bottom: 4px 

    &__upload

.hidden-input
    visibility: hidden
    width: .1px
    height: .1px
</style>