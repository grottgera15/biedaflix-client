<template>
    <div class="content">
        <v-section-header>Szczegóły serialu</v-section-header>
        <v-series-edit
            v-if="seriesData"
            :seriesData="seriesData"
            :sourcesData="sourcesData"
            :seriesStatuses="seriesStatuses"
            @save-series="saveSeries($event)"
        />
        <div v-if="$route.params.id">
            <v-section-header>Sezony i odcinki</v-section-header>
            <v-serie-seasons-list v-if="seriesData" :seriesData="seriesData" />
            <v-serie-episodes-list
                v-if="seriesData && currentSeason"
                :seriesData="seriesData"
                :currentSeason="currentSeason"
            />
            <v-full-width-button @click="addEpisode()">Dodaj odcinek</v-full-width-button>
        </div>
    </div>
</template>

<script>
import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader.vue";
import SettingsSeriesEdit from "@/components/SettingsSeries/SettingsSeriesEdit";
import SettingsSeriesSeasonsList from "@/components/SettingsSeries/SettingsSeriesSeasonsList";
import SettingsSeriesEpisodesList from "@/components/SettingsSeries/SettingsSeriesEpisodesList";

import seriesStatuses from "@/enums/seriesStatuses";
import SourceData from "@classes/SourceData";
import SeriesData from "@classes/SeriesData";
// import EpisodeData from "@classes/EpisodeData.js";

import FullWidthButton from "@/components/Forms/Buttons/FullWidthButton";

export default {
    name: "SettingsSerie",
    data: function() {
        return {
            seriesData: undefined,
            sourcesData: undefined,
            seriesStatuses: seriesStatuses,
            currentSeason: undefined
        };
    },
    async created() {
        this.sourcesData = await SourceData.loadSources();
        if (this.$route.params.id === undefined)
            this.seriesData = new SeriesData({});
        else
            this.seriesData = await SeriesData.loadSeries({
                seriesId: this.$route.params.id,
                apiParams: {
                    showSeasons: true
                }
            });
        if (this.seriesData.seasons)
            this.currentSeason = Object.keys(this.seriesData.seasons)[0];
    },
    components: {
        "v-section-header": SettingsSectionHeader,
        "v-series-edit": SettingsSeriesEdit,
        "v-full-width-button": FullWidthButton,
        "v-serie-seasons-list": SettingsSeriesSeasonsList,
        "v-serie-episodes-list": SettingsSeriesEpisodesList
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
        async saveSeries(form) {
            this.seriesData = await SeriesData.saveSeries(
                form,
                this.seriesData.id
            );
            this.$route.params.id = this.seriesData.id;
        },
        addEpisode() {
            this.$router.push({
                path: `${this.seriesData.id}/episode/`
            });
        }
    }
};
</script>


<style scoped lang="sass">
</style>
