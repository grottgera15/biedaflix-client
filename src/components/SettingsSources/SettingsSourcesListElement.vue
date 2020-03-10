<template>
    <form class="source-edit" v-on:submit.prevent>
        <div class="source-edit__logo">
            <img :src="logo" />
        </div>
        <v-text-input id="name" label="Nazwa" v-model="data.name" />
        <input type="file" class="hidden-input" ref="hiddenFileInput" @change="changeFile($event)" />
        <v-small-button @click="chooseFile()">Zmień logo</v-small-button>
        <v-small-button @click="saveSource()">Zapisz</v-small-button>
        <v-small-button @click="deleteSource()">{{deleteSymbol}}</v-small-button>
    </form>
</template>

<script>
import SourceData from "@classes/SourceData.js";
import SettingsTextInput from "@/components/Forms/Settings/SettingsTextInput";

import SmallButton from "@/components/Forms/Buttons/SmallButton";

export default {
    name: "SettingsSourcesListElement",
    props: {
        data: {
            type: SourceData,
            required: true
        }
    },
    components: {
        "v-text-input": SettingsTextInput,
        "v-small-button": SmallButton
    },
    computed: {
        logo() {
            return this.data.logo.file
                ? URL.createObjectURL(this.data.logo.file)
                : this.data.logo.path;
        },
        deleteSymbol() {
            return process.env.VUE_APP_DELETE_SYMBOL;
        }
    },
    methods: {
        chooseFile() {
            this.$refs.hiddenFileInput.click();
        },
        changeFile(event) {
            if (event.target.files[0])
                this.data.logo.file = event.target.files[0];
        },
        validateName(name) {
            if (name.length <= 0) return false;
            return true;
        },
        async saveSource() {
            let response = await SourceData.saveSource(this.data);
            this.$emit("updated-data", response);
        },
        async deleteSource() {
            let response = await SourceData.deleteSource(this.data.id);
            if (response)
                this.$emit("deleted-data");
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
    border-bottom: 1px solid #ffffff17

    &__logo
        margin-right: 1em
        max-width: 150px
        max-height: 75px
        height: auto

        img
            width: 100%

.hidden-input
    visibility: hidden
    width: .1px
    height: .1px
</style>