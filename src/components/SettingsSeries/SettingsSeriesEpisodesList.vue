<template>
    <div>
        <div class="serie-episodes">
            <ol class="serie-episodes__list">
                <header class="serie-episodes__list__header serie-episodes__list--grid">
                    <span>Tytuł</span>
                    <span>Dostępność</span>
                    <span>Data</span>
                </header>
                <li
                    v-for="episode in seriesData.getEpisodes(currentSeason)"
                    :key="episode.episodeNumber"
                    class="serie-episodes__list__episode serie-episodes__list--grid"
                    @click="editEpisode(episode.id)"
                >
                    <span>{{episode.episodeNumber}}</span>
                    <span>{{episode.name}}</span>
                    <span>{{episode.available}}</span>
                    <span>{{episode.releaseDate}}</span>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
import SeriesData from "@classes/SeriesData.js";

export default {
    name: "SettingsSerieEpisodesList",
    methods: {
        editEpisode(episodeId) {
            this.$router.push({path: `/settings/series/${this.seriesData.id}/episode/${episodeId}`});
        }
    },
    props: {
        currentSeason: {
            type: [String, Number],
            required: true
        },
        seriesData: {
            type: SeriesData,
            required: true
        }
    }
};
</script>

<style lang="sass" scoped>
.serie-episodes

    &__list
        list-style: none
        padding: 0
        $order-width: 15%
        $title-width: 50%
        $availability-width: 20%
        $data-width: 15%

        &__header
            :nth-child(1)
                grid-area: title                    
            :nth-child(2)
                grid-area: availability
            :nth-child(3)
                grid-area: date

        &__episode
            opacity: .75
            cursor: pointer

            &:hover
                opacity: 1

            :nth-child(1)
                grid-area: order

            :nth-child(2)
                grid-area: title  

            :nth-child(3)
                grid-area: availability
                
            :nth-child(4)
                grid-area: date

        &--grid
            padding-bottom: 6px
            display: grid
            grid-template-columns: 10% 50% 20% 20%
            grid-template-areas: "order title availability date"
</style>