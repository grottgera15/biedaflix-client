<template>
	<div id="app">
		<!-- <router-view/> -->
		<div id="wrapper">
			<div class="series">
				<div class="serie" v-for="serie in series" :key="serie.id">
					<div class="name">{{serie.name}}</div>
                    <button class = "right-scroll">Test</button>
					<div class="episodes">
						<div class="episode" v-for="episode in serie.episodes" :key="episode.id">
							<div
								class="background"
								v-if="!episode.upcoming"
								:style="{'background-image': 'url(' + require('../files/images/thumbnails/' + (episode.thumbnail)) + ')'}"
							/>
							<div class="information" v-if="!episode.upcoming">
								<div class="text-wrapper">
									<span class="number">{{episode.episode}}</span> -
									<span class="title">{{episode.name}}</span>
									<div class="duration">{{episode.duration}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import series from "../files/series.json";
export default {
	data: function() {
		return {
			series: series
		};
	}
};
</script>


<style scoped lang="sass">
$app-margins: 64px
$episodes-column-padding: 4px

#app
    width: 100%
    height: 100%
    display: grid
    grid-template-columns: $app-margins [main] 1fr $app-margins

#wrapper
    grid-column-start: main
    .series
        display: grid
        .serie
            margin-bottom: 48px
            overflow: hidden
            .name
                font-size: 24pt
                font-weight: 700
                margin: 12px 0

            .right-scroll
                position: absolute
                z-index: 99999
                right: 0
                width: 64px
                height: 180px

            .episodes
                display: grid
                grid-auto-flow: column
                grid-auto-columns: min-content
                grid-column-gap: $episodes-column-padding
                align-items: top
                    
                .episode
                    position: relative
                    height: 180px
                    width: calc((100vw - 148px) / 6)
                    cursor: pointer
                    box-shadow: 0 2px 4px #00000036
                    overflow: hidden

                    .background
                        background-position: center
                        background-size: cover
                        transition-duration: 0.3s
                        width: 100%
                        height: 100%
                        position: absolute

                    .information
                        width: 100%
                        height: 100%
                        opacity: 0
                        position: relative
                        background: linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)
                        transition-duration: 0.3s
                        font-size: 12pt
                        .text-wrapper
                            position: absolute
                            bottom: 0
                            width: calc(100%-24px)
                            margin: 12px
                            .number
                                font-weight: 700
                            .title
                                font-weight: 400
                            .duration
                                font-size: 9pt
                        &:hover
                            opacity: 100

</style>
