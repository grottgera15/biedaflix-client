<template>
    <div class="content">
        <v-section-header>Szczegóły serialu</v-section-header>
        <v-serie-edit v-if="seriesData" :seriesData="seriesData" />
        <div v-if="$route.query.id">
            <v-section-header>Sezony i odcinki</v-section-header>
            <!-- <v-serie-seasons-list :SeriesData="SeriesData" />
            <v-serie-episodes-list :SeriesData="SeriesData" />-->
            <v-normal-button @click="addEpisode()">Dodaj odcinek</v-normal-button>
        </div>
    </div>
</template>

<script>
import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader.vue";

import SettingsSerieEdit from "@/components/SettingsSerie/SettingsSerieEdit";
// import SettingsSerieSeasonsList from "@/components/SettingsSerie/SettingsSerieSeasonsList";
// import SettingsSerieEpisodesList from "@/components/SettingsSerie/SettingsSerieEpisodesList";

import SeriesData from "@classes/SeriesData.js";
import EpisodeData from "@classes/EpisodeData.js";

import NormalButton from "@/components/Forms/Buttons/NormalButton";

import axios from "axios";

export default {
    name: "SettingsSerie",
    data: function() {
        return {
            seriesData: undefined,
            currentSeason: 0
        };
    },
    async created() {
        if (this.$route.query.id === undefined)
            this.seriesData = new SeriesData({});
        else
            this.seriesData = await SeriesData.loadSeries(
                this.$route.query.id,
                true
            );
        console.log(this.seriesData);
    },
    components: {
        "v-section-header": SettingsSectionHeader,
        "v-serie-edit": SettingsSerieEdit,
        "v-normal-button": NormalButton
        // "v-serie-seasons-list": SettingsSerieSeasonsList,
        // "v-serie-episodes-list": SettingsSerieEpisodesList
    },
    computed: {
        seasons() {
            return this.seriesData.seasons;
        },
        nameValidation() {
            if (this.seriesData.name.length <= 0) return false;
            return true;
        },
        descriptionValidation() {
            if (this.seriesData.description.length <= 0) return false;
            return true;
        }
    },
    methods: {
        addEpisode() {
            this.$router.push({
                path: `/settings/episode/`,
                query: {
                    seriesId: this.seriesData.id
                }
            });
        },
        loadFromIMDB: function() {
            axios
                .get(
                    `http://www.omdbapi.com/?apikey=27bf7fe6&t=${this.SeriesData.name}&r=json&type=series&Season=${this.currentSeason}`,
                    {}
                )
                .then((res, err) => {
                    if (err) throw err;
                    for (let imdbEpisode of res.data.Episodes) {
                        let skipEpisode = false;
                        for (let episode of this.SeriesData.getEpisodes(
                            this.currentSeason
                        )) {
                            if (episode.episodeNumber === imdbEpisode.Episode) {
                                skipEpisode = true;
                                break;
                            }
                        }
                        if (skipEpisode) continue;
                        this.SeriesData.addEpisode(
                            this.currentSeason,
                            new EpisodeData(
                                imdbEpisode.Title,
                                this.currentSeason,
                                imdbEpisode.Episode,
                                false,
                                imdbEpisode.Released
                            )
                        );
                        this.$forceUpdate();
                    }
                });
        }
    }
};
</script>


<style scoped lang="sass">
</style>
