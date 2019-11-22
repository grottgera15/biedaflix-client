<template>
	<div id="app">
		<!-- <router-view/> -->
        <div id="menu">
            <div class = "logo">
                <img src = "../files/images/BiedaFlix500px.png"/>
            </div>
        </div>
		<div id="wrapper">
			<div class="series">
				<div class="serie" v-for="serie in series" :key="serie.id">
					<div class="bar" @click="setActive(serie.id)">
						<div class="title" :class="serie.id == activeSerie ? 'active' : ''">{{serie.name}}</div>
						<div class="on-going" v-if="serie.onGoing">W TRAKCIE</div>
					</div>
					<transition name="fade">
						<div class="info" v-show="activeSerie == serie.id">
							<div class="description-wrapper">
								<div class="logo" v-if="serie.info.logo">
									<img :src="require('../files/' + serie.info.logo)" />
								</div>
								<div class="background">
									<video autoplay muted loop>
										<source :src="require('../files/' + serie.info.cover)" type="video/mp4" />
									</video>
								</div>
								<!-- <div
									class="background"
									:style="'background-image: url(' +  require('../files/' + serie.info.cover) + ');'"
								/>-->

								<div class="description">{{serie.info.description}}</div>
							</div>
							<div class="episodes">
								<router-link :to="{name: 'about', params: {sources: episode.sources.video, pathSubs: episode.sources.subs}}"
									class="episode"
									v-for="episode in serie.episodes"
									:key="episode.id"
									:class="{'episode-not-available': !episode.available}"
								>
									<span class="number">{{episode.episode}}</span>
									<span class="title">{{episode.name}}</span>
									<span class="addons">
										<span
											class="release-date"
											v-if="episode.releaseDate && !episode.available"
										>{{episode.releaseDate}}</span>
									</span>
									<div class="progress-bar" v-if="episode.available">
										<div class="progress-bar-fill" style="width: 5%" />
									</div>
								</router-link>
							</div>
						</div>
					</transition>
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
			series: series,
			activeSerie: -1
		};
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


<style scoped lang="sass">
$episodes-column-padding: 4px

#app
    width: 100%
    height: 100%
    display: grid
    grid-template-columns: 1fr [main] 1fr 1fr
    @media screen and (max-width: 1600px)
        grid-template-columns: 0.5fr [main] 1fr 0.5fr
    @media screen and (max-width: 1200px)
        grid-template-columns: 0.25fr [main] 1fr 0.25fr
    @media screen and (max-width: 720px)
        grid-template-columns: [main] 1fr

a
    color: unset
    text-decoration: unset

#menu
    grid-column-start: main
    display: grid
    margin: 8px 0
    .logo
        img
            max-height: 24px

#wrapper
    grid-column-start: main
    .series
        display: grid
        .serie
            .bar
                display: grid
                grid-template-columns: [name] 2fr [info] 1fr
                border-bottom: 1px solid #ffffff17
                cursor: pointer
                padding: 16px 24px
                color: #ffffffa3
                align-items: center
                background-color: inherit
                z-index: 999999
                transition-duration: 0.3s
                .title
                    grid-column-start: name
                    font-size: 14pt
                    font-weight: 300
                .active
                    color: white
                .on-going
                    font-size: 8pt
                    text-align: right
                    font-weight: 700
                    letter-spacing: 0.5px
                    color: white
                &:hover
                    color: white
            .info
                position: relative
                overflow: hidden
                transition-duration: 1s 
                transition-timing-function: linear
                background-color: inherit
                z-index: 999
                @media screen and (max-width: 720px)
                    box-shadow: 0 2px 8px #00000080
                .description-wrapper
                    height: 350px
                    position: relative
                    .background   
                        object-fit: cover
                        position: absolute
                        z-index:-999
                        background-size: cover
                        opacity: 0.75
                        background-position: top center
                        width: 100%
                        height: 350px
                        &:before
                            content: ""
                            width: 100%
                            height: 350px
                            position: absolute
                            background: linear-gradient(50deg, rgba(21,21,21,1) 0%, rgba(21,21,21,0) 100%)
                        video
                            object-fit: cover
                            min-height: 100%
                            width: 100%
                    .logo
                        position: absolute
                        padding: 24px 48px
                        width: calc(100% - 2 * 48px)
                        img
                            max-width: 50%
                            max-height: 36px
                            opacity: 1
                    .description
                        padding: 24px 48px
                        position: absolute
                        bottom: 0
                        overflow: hidden
                        cursor: default
                        text-shadow: 2px 2px 10px black
                .episodes
                    display: grid
                    grid-template-columns: repeat(1, 1fr)
                    grid-column-gap: 8px
                    .episode
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
                    .episode-not-available
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
