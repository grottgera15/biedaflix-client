<template>
    <div>
        <v-section-header>Seriale</v-section-header>
        <v-list :array="seriesData" :component="listComponent" />
        <router-link :to="{path: 'serie'}">
            <v-normal-button>Dodaj nowy serial</v-normal-button>
        </router-link>
    </div>
</template>

<script>
import SeriesData from "@classes/SeriesData";

import SettingsList from "@/components/Settings/SettingsList";
import SettingsSeriesListElement from "@/components/SettingsSeries/SettingsSeriesListElement";

import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader";

import NormalButton from "@/components/Forms/Buttons/NormalButton";
import axios from "axios";

export default {
    name: "SettingsSeries",
    mounted() {
        this.loadSeries();
    },
    data: function() {
        return {
            seriesData: [],
            listComponent: SettingsSeriesListElement
        };
    },
    methods: {
        loadSeries() {
            axios
                .get(`${process.env.VUE_APP_API_PATH}/series`, {
                    withCredentials: true
                })
                .then(res => {
                    for (let serie of res.data) {
                        this.seriesData.push(
                            new SeriesData({
                                id: serie.id,
                                name: serie.name,
                                description: serie.description,
                                banner: serie.banner,
                                logo: serie.logo
                            })
                        );
                    }
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    components: {
        "v-normal-button": NormalButton,
        "v-list": SettingsList,
        "v-section-header": SettingsSectionHeader
    }
};
</script>


<style scoped lang="sass">
</style>
