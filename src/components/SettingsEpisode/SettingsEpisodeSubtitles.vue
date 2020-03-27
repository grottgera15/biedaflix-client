<template>
    <form v-on:submit.prevent>
        <ul>
            <li>
                <v-file-input
                    name="pl"
                    :id="`pl`"
                    :label="`Polskie napisy`"
                    v-model="episodeData.subtitles.pl"
                />
            </li>
        </ul>
        <v-full-width-button @click="saveSubtitles()">Zapisz napisy</v-full-width-button>
    </form>
</template>

<script>
import SettingsFileInput from "@/components/Forms/Settings/SettingsFileInput";
import FullWidthButton from "@/components/Forms/Buttons/FullWidthButton";

import EpisodeData from "@classes/EpisodeData";

export default {
    name: "SettingsEpisodeSubtitles",
    props: {
        episodeData: {
            type: EpisodeData,
            required: true
        }
    },
    methods: {
        saveSubtitles() {
            this.$emit("save-subtitles", this.episodeData);
        }
    },
    components: {
        "v-file-input": SettingsFileInput,
        "v-full-width-button": FullWidthButton
    }
};
</script>

<style lang="sass" scoped>
    
</style>