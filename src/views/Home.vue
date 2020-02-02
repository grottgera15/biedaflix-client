<template>
	<div id="wrapper">
		<Logo />
		<MemoryStatus />
		<div id="series-wrapper">
			<div class="series">
				<div class="serie">
                    <HomeSeriesBar :seriesData="serieNew"/>
					<transition name="fade">
						<div class="info">
							<HomeSeriesCover :seriesData="serieNew"/>
							<div class="episodes">
								<HomeEpisodeData :episodeData="episode" />
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Logo from "@/components/Logo";
import MemoryStatus from "@/components/MemoryStatus";

import HomeSeriesBar from "@/components/Home/HomeSeriesBar";
import HomeSeriesCover from "@/components/Home/HomeSeriesCover";
import SeriesData from "@classes/SeriesData";

import HomeEpisodeData from "@/components/Home/HomeEpisodeData";
import EpisodeData from "@classes/EpisodeData";

import series from "@/files/series";

export default {
	data: function() {
		return {
			series: series,
			activeSerie: -1,
			episode: new EpisodeData("Rozdział 1", 1, 1, "12.11.2019", true),
			serieNew: new SeriesData(
				"Mandalorian",
                "Samotny łowca głów przemierza najdalsze zakątki galaktyki, z dala od władzy Nowej Republiki.",
                true,
                require("@files/images/logos/theMandalorian.png"),
                require("@files/images/theMandalorian.mp4")
			)
		};
	},
	components: {
		Logo,
        MemoryStatus,
        HomeSeriesBar,
		HomeSeriesCover,
		HomeEpisodeData
	},
	methods: {
		setActive: function(id) {
			if (this.activeSerie == id) {
				this.activeSerie = -1;
				return;
			}
			this.activeSerie = id;
		}
	}
};
</script>


<style lang="sass" scoped>
@import "@styles/fonts"
    
$episodes-column-padding: 4px
a
    color: unset
    text-decoration: unset

#wrapper
    margin: 24px 0
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-template-areas: ". logo ."  ". memory-status ." ". main ."
    grid-row-gap: 16px
    @media screen and (max-width: 1600px)
        grid-template-columns: 0.5fr 1fr 0.5fr
    @media screen and (max-width: 1200px)
        grid-template-columns: 0.25fr 1fr 0.25fr
    @media screen and (max-width: 720px)
        grid-template-columns: 1fr
        grid-template-areas: "logo" "memory-status" "main"

    #series-wrapper
        grid-area: main
        .series
            display: grid
            .serie
                .info
                    position: relative
                    overflow: hidden
                    transition-duration: 1s 
                    transition-timing-function: linear
                    background-color: inherit
                    z-index: 999
                    @media screen and (max-width: 720px)
                        box-shadow: 0 2px 8px #00000080
                    
                    .episodes
                        display: grid
                        grid-template-columns: repeat(1, 1fr)
                        grid-column-gap: 8px
                        .episodec
                            position: relative
                            padding: 16px 48px
                            transition-duration: 0.5s
                            cursor: pointer
                            background-color: #151515
                            border: 1px solid #ffffff17
                            border-top: 0
                            display: grid
                            grid-template-columns: [date] auto [name] 2fr [addons] 1fr
                            align-items: center
                            grid-column-gap: 4px
                            @media screen and (max-width: 1200px)
                                grid-template-columns: [date] auto [name] 3fr [addons] auto
                                border-left: 0
                                border-right: 0
                            &:hover
                                padding-left: 56px
                            .number, .title,
                            .release-date
                                font-size: 8pt
                                font-weight: 700
                                letter-spacing: 0.5px
                                display: inline-block
                            .number
                                grid-column-start: date
                            .title
                                font-size: 10pt
                                font-weight: 300
                                grid-column-start: name
                            .addons
                                grid-column-start: addons
                                text-align: right
                                .release-date
                                    display: inline-block
                            .progress-bar
                                width: 100%
                                height: 2px
                                position: absolute
                                bottom: 0
                                background-color: #ffffff17
                                .progress-bar-fill
                                    background-color: white
                                    height: inherit
                                    opacity: 0.5
                        .episode-not-availablec
                            cursor: default
                            color: #ffffff4f
                            &:hover
                                padding-left: 48px
.fade-enter-to, .fade-leave 
    max-height: 1000px
    opacity: 1

.fade-enter, .fade-leave-to 
    max-height: 0px
    opacity: 0

</style>
