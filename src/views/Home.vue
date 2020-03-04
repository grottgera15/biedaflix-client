<template>
	<div id="wrapper">
		<div id="series-wrapper">
			<div class="series">
				<div class="serie">
                    <HomeSeriesBar :seriesData="serieNew"/>
					<transition name="fade">
						<div class="info">
							<v-serie-banner :seriesData="serieNew"/>
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

import HomeSeriesBar from "@/components/Home/HomeSeriesBar";
import SerieBanner from "@/components/Serie/SerieBanner";
import SerieData from "@classes/SerieData";

import HomeEpisodeData from "@/components/Home/HomeEpisodeData";
import EpisodeData from "@classes/EpisodeData";

import series from "@/files/series";

export default {
	data: function() {
		return {
			series: series,
			activeSerie: -1,
			episode: new EpisodeData("Rozdział 1", 1, 1, "12.11.2019", true),
			serieNew: new SerieData(
				"Mandalorian",
                "Samotny łowca głów przemierza najdalsze zakątki galaktyki, z dala od władzy Nowej Republiki.",
                true,
                require("@files/images/logos/theMandalorian.png"),
                require("@files/images/theMandalorian.mp4")
			)
		};
	},
	components: {
        HomeSeriesBar,
		"v-serie-banner": SerieBanner,
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
