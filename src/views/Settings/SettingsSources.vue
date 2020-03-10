<template>
    <div>
        <v-section-header>Źródła</v-section-header>
        <v-list
            v-if="sources"
            :array="sources"
            :component="listComponent"
            @save-source="saveSource($event)"
            @delete-source="deleteSource($event)"
        />
        <v-normal-button @click="addSource()">Dodaj nowe źródło</v-normal-button>
    </div>
</template>

<script>
import SettingsList from "@/components/Settings/SettingsList";

import SettingsSourcesListElement from "@/components/SettingsSources/SettingsSourcesListElement";
import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader";

import NormalButton from "@/components/Forms/Buttons/NormalButton";

import SourceData from "@classes/SourceData.js";

export default {
    name: "SettingsSources",
    data: function() {
        return {
            sources: undefined,
            listComponent: SettingsSourcesListElement
        };
    },
    async created() {
        this.sources = await SourceData.loadSources();
    },
    methods: {
        addSource() {
            this.sources.push(new SourceData({ name: "" }));
        },
        async saveSource(event) {
            const newSourceData = await SourceData.saveSource(event);
            if (event instanceof SourceData && this.sources instanceof Array)
                this.sources.find(sourceData => {
                    if (sourceData === event) sourceData = newSourceData;
                });
        },
        async deleteSource(event) {
            if (!event.id)
                this.sources.splice(this.sources.indexOf(event), 1);
            else if (await SourceData.deleteSource(event.id) && event instanceof SourceData && this.sources instanceof Array)
                this.sources.splice(this.sources.indexOf(event), 1);
        }
    },
    components: {
        "v-normal-button": NormalButton,
        "v-section-header": SettingsSectionHeader,
        "v-list": SettingsList
    }
};
</script>

