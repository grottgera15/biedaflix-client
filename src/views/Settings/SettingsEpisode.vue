<template>
    <div class="content">
        <v-section-header>Szczegóły odcinka</v-section-header>
        <v-episode-edit :episodeData="episodeData" @save-episode="saveEpisode($event)" />
    </div>
</template>

<script>
import EpisodeData from "@classes/EpisodeData";

import SettingsEpisodeEdit from "@/components/SettingsEpisode/SettingsEpisodeEdit";

import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader";

export default {
    name: "SettingsEpisodeEdit",
    data: function() {
        return {
            episodeData: new EpisodeData({
                name: "Chapter 1: The Mandalorian",
                seasonNumber: 1,
                episodeNumber: 1,
                releaseDate: "2019-11-12",
                seriesId: this.$route.query.seriesId
            })
        };
    },
    async created() {
        if (this.$route.params.id)
            this.episodeData = await EpisodeData.loadEpisode(this.$route.params.id);
    },
    methods: {
        async saveEpisode(form) {
            const formData = new FormData(form);
            if (formData.get("magnetLink").length === 0)
                formData.delete("magnetLink");
            formData.append("seriesId", this.$route.params.seriesId);
            this.episodeData = await EpisodeData.saveEpisode(formData, this.episodeData.id);

        },
        addSubtitles() {
            let subtitleIndex = this.$refs.availableLanguages.selectedIndex;
            let subtitleHash = this.$refs.availableLanguages.options[
                subtitleIndex
            ].value;
            this.episodeData.addSubtitles({
                [subtitleHash]: null
            });
        }
    },
    computed: {
        availableLanguages() {
            let availableLanguages = {};
            for (let language in this.languages) {
                if (!this.episodeData.containLanguage(language)) {
                    availableLanguages[language] = this.languages[language];
                }
            }
            return availableLanguages;
        }
    },
    components: {
        "v-section-header": SettingsSectionHeader,
        "v-episode-edit": SettingsEpisodeEdit
    }
};
</script>


<style scoped lang="sass">
@import "@styles/variables"
.content
    button
        margin-top: 8px

input
    letter-spacing: 0.5px
    font-weight: 500
    font-family: inherit
    background-color: unset
    border: 0
    border-bottom: 1px solid #ffffff17
    color: inherit
    width: calc(100% - 2 * 24px)
    padding: 10px 12px
    outline: unset !important
    cursor: unset !important

textarea
    width: 100%
    min-height: 100px
    font-family: inherit
    resize: none
    outline: none
    color: inherit
    background: unset
    border: unset
</style>
