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
    display: flex
    flex-direction: column
    min-width: 33.33%
    margin: 24px auto
    
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
                    
.fade-enter-to, .fade-leave 
    max-height: 1000px
    opacity: 1

.fade-enter, .fade-leave-to 
    max-height: 0px
    opacity: 0

</style>
