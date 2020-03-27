<template>
    <div class="content">
        <v-section-header>Szczegóły odcinka</v-section-header>
        <v-episode-edit v-if="episodeData" :episodeData="episodeData" @save-episode="saveEpisode($event)" />
        <v-section-header>Napisy</v-section-header>
        <v-episode-subtitles @save-subtitles="saveSubtitles($event)" :episodeData="episodeData" />
    </div>
</template>

<script>
import EpisodeData from "@classes/EpisodeData";

import SettingsEpisodeEdit from "@/components/SettingsEpisode/SettingsEpisodeEdit";
import SettingsEpisodeSubtitles from "@/components/SettingsEpisode/SettingsEpisodeSubtitles";

import SettingsSectionHeader from "@/components/Settings/SettingsSectionHeader";

export default {
    name: "SettingsEpisode",
    data() {
        return {
            episodeData: new EpisodeData({})
        }
    },
    async created() {
        if (this.$route.params.id)
            this.episodeData = await EpisodeData.loadEpisode(this.$route.params.id);
    },
    methods: {
        async saveEpisode(episodeData) {
            if (this.$route.params.seriesId)
                this.episodeData.seriesId = this.$route.params.seriesId;
            const result = await EpisodeData.saveEpisode(episodeData);
            if (result) {
                this.episodeData = result;
                this.$router.push(`${episodeData.id}`);
            }
        },
        async saveSubtitles(episodeData) {
            await EpisodeData.saveSubtitles(episodeData);
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
        "v-episode-edit": SettingsEpisodeEdit,
        "v-episode-subtitles": SettingsEpisodeSubtitles
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
