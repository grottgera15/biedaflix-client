<template>
    <div>
        <v-section-header>Seriale</v-section-header>
        <v-series-list :seriesData="seriesData" />
        <router-link :to="{path: 'serie'}">
            <v-normal-button>Dodaj nowy serial</v-normal-button>
        </router-link>
    </div>
</template>

<script>
import SerieData from "@classes/SerieData";

import SettingsSeriesList from "@/components/SettingsSeries/SettingsSeriesList";
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
            seriesData: []
        };
    },
    methods: {
        loadSeries() {
            axios
                .get(`${process.env.VUE_APP_API_PATH}/series`, {
                    withCredentials: true
                })
                .then(res => {
                    console.log(res.data);
                    for (let serie of res.data) {
                        this.seriesData.push(
                            new SerieData({
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
        "v-series-list": SettingsSeriesList,
        "v-section-header": SettingsSectionHeader
    }
};
</script>


<style scoped lang="sass">
</style>
