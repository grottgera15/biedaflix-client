<template>
    <div class="content">
        <v-section-header>Szczegóły serialu</v-section-header>
        <v-serie-edit :serieData="serieData" />
        <v-section-header>Sezony i odcinki</v-section-header>
        <!-- <v-serie-seasons-list :serieData="serieData" />
        <v-serie-episodes-list :serieData="serieData" /> -->
    </div>
</template>

<script>
import AdminSectionHeader from "@/components/Admin/AdminSectionHeader.vue";

import AdminSerieEdit from "@/components/AdminSerie/AdminSerieEdit";
// import AdminSerieSeasonsList from "@/components/AdminSerie/AdminSerieSeasonsList";
// import AdminSerieEpisodesList from "@/components/AdminSerie/AdminSerieEpisodesList";

import SerieData from "@classes/SerieData.js";
import EpisodeData from "../classes/EpisodeData.js";

import loadSourcesMixin from "@mixins/loadSources.js";

import axios from "axios";

export default {
    name: "AdminSerie",
    data: function() {
        return {
            serieData: undefined,
            currentSeason: 0
        };
    },
    created() {
        if (this.$route.query.serie === undefined)
            this.serieData = new SerieData({});
    },
    mixins: [loadSourcesMixin],
    components: {
        "v-section-header": AdminSectionHeader,
        "v-serie-edit": AdminSerieEdit,
        // "v-serie-seasons-list": AdminSerieSeasonsList,
        // "v-serie-episodes-list": AdminSerieEpisodesList
    },
    computed: {
        seasons() {
            return this.serieData.seasons;
        },
        nameValidation() {
            if (this.serieData.name.length <= 0) return false;
            return true;
        },
        descriptionValidation() {
            if (this.serieData.description.length <= 0) return false;
            return true;
        }
    },
    methods: {
        saveSerie: function() {
            let formData = new FormData();
            formData.append("name", this.serieData.name);
            formData.append("description", this.serieData.description);
            formData.append("sourceId", this.serieData.sourceId);
            formData.append("onGoing", true);
            formData.append("banner", this.serieData.bannerFile);
            formData.append("logo", this.serieData.logoFile);
            axios
                .post(`http://api.biedaflix.pl/series`, formData, {
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
        },
        loadFromIMDB: function() {
            axios
                .get(
                    `http://www.omdbapi.com/?apikey=27bf7fe6&t=${this.serieData.name}&r=json&type=series&Season=${this.currentSeason}`,
                    {}
                )
                .then((res, err) => {
                    if (err) throw err;
                    for (let imdbEpisode of res.data.Episodes) {
                        let skipEpisode = false;
                        for (let episode of this.serieData.getEpisodes(
                            this.currentSeason
                        )) {
                            if (episode.episodeNumber === imdbEpisode.Episode) {
                                skipEpisode = true;
                                break;
                            }
                        }
                        if (skipEpisode) continue;
                        this.serieData.addEpisode(
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
