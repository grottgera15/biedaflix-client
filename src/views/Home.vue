<template>
    <div>
        <ul class="series-list" v-if="seriesList">
            <li class="series-list__element" v-for="series in seriesList" :key="series.id">
                <header class="series-list__element__header" @click="setActive(series.id)">
                    <div>{{series.name}}</div>
                    <div>{{seriesStatuses.get(series.name)}}</div>
                </header>
                <transition name="display-half">
                    <div v-show="series.id === activeSeries" class="series-list__element__content">
                        <v-serie-banner :seriesData="series" />
                        <ol
                            class="series-list__element__season"
                            v-for="(season, i) in series.seasons"
                            :key="i"
                        >
                            {{`Sezon ${i}`}}
                            <li
                                class="series-list__element__season__episodes"
                                v-for="episode in season"
                                :key="episode.id"
                                :episodeData="episode"
                                @click="play(episode.id)"
                            >
                                <span class="series-list__element__season__episodes__number">{{`S${i}:O${episode.episodeNumber}`}}</span>
                                <span>{{episode.name}}</span>
                                <span class="series-list__element__season__episodes__status">{{episodeStatuses.get(episode.status)}}</span>
                            </li>
                        </ol>
                    </div>
                </transition>
            </li>
        </ul>
    </div>
</template>

<script>
import seriesStatuses from "@/enums/seriesStatuses";
import episodeStatuses from "@/enums/episodeStatuses";

import SerieBanner from "@/components/Serie/SerieBanner";

import SeriesData from "@classes/SeriesData";

export default {
    name: "Home",
    data() {
        return {
            seriesList: [],
            seriesStatuses: seriesStatuses,
            episodeStatuses: episodeStatuses,
            activeSeries: undefined
        };
    },
    async created() {
        this.seriesList = await SeriesData.loadAllSeries({
            apiParams: {
                showSeasons: true
            }
        });
    },
    components: {
        "v-serie-banner": SerieBanner
    },
    methods: {
        setActive: function(id) {
            id === this.activeSeries
                ? (this.activeSeries = undefined)
                : (this.activeSeries = id);
        },
        play(id) {
            this.$router.push({
                path: "/player",
                query: {
                    id: id
                }
            });
        }
    }
};
</script>


<style lang="sass" scoped>
@import "@styles/fonts"
@import "@styles/variables"

.series-list
    list-style: none
    margin: 0
    padding: 0

    &__element
        position: relative
        z-index: 0

        &__header
            display: flex
            justify-content: space-between
            cursor: pointer
            padding: 1em
            border-bottom: 1px solid $bright-dark-color
            background-color: $dark-color
            position: relative
            z-index: 1

        &__content
            z-index: -1

        &__season
            padding: 1em
            margin: 0

            &__episodes
                display: flex
                padding: .5em 0
                list-style: none
                opacity: 0.7
                transition-duration: .2s
                cursor: pointer

                &__number
                    margin-right: .5em

                &__status
                    margin-left: auto

                &:hover
                    opacity: 1
                
.display-half-enter-to, .display-half-leave
    animation: displaySeries .4s

.display-half-enter, .display-half-leave-to
    display: none

@keyframes displaySeries
    0%
        opacity: 0
        margin-top: -1.5em
        padding-bottom: 0em
    100%
        opacity: 1
        margin-top: 0
        padding-bottom: 1.5em

</style>
