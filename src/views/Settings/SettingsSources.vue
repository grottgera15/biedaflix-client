<template>
    <div>
        <v-section-header>Źródła</v-section-header>
        <ul class="sources-list">
            <li class="source-edit" v-for="(source, i) in sources" :key="i">
                <v-source-edit :source="source"/>
            </li>
        </ul>
        <v-normal-button @click="addSource()">Dodaj nowe źródło</v-normal-button>
    </div>
</template>

<script>
import SettingsSourcesListElement from "@/components/SettingsSources/SettingsSourcesListElement";
import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader";

import NormalButton from "@/components/Forms/Buttons/NormalButton";

import SourceData from "@classes/SourceData.js";

import loadSourcesMixin from "@mixins/loadSources.js";

export default {
    name: "SettingsSources",
    methods: {
        addSource() {
            this.sources.push(new SourceData({name: ""}));
        }
    },
    components: {
        "v-normal-button": NormalButton,
        "v-section-header": SettingsSectionHeader,
        "v-source-edit": SettingsSourcesListElement
    },
    mixins: [
        loadSourcesMixin
    ]
};
</script>


<style scoped lang="sass">
@import "@styles/variables"
.content

    .sources-list
        list-style: none
        margin: 0
        padding: 0


            


</style>
