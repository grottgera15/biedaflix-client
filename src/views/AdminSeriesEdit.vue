<template>
	<div class="content">
		<form v-on:submit.prevent>
			<div class="page-title">
				<h2>Szczegóły serialu</h2>
				<button>Cofnij zmiany</button>
				<button>Zapisz</button>
			</div>
			<label>
				Tytuł (pole wymagane)
				<input type="text" placeholder="Dodaj tytuł" v-model="serieData.name" />
			</label>
			<div class="series-cover">
				<div class="series-cover__logo">
					<img :src="serieData.getLogo()" />
				</div>
				<div class="series-cover__background">
					<video autoplay muted loop>
						<source :src="serieData.getBanner()" type="video/mp4" />
					</video>
				</div>
				<div class="series-cover__description">
					<span v-html="serieData.description" />
				</div>
			</div>
			<label>
				Opis serialu (pole wymagane)
				<textarea
					rows="4"
					cols="50"
					placeholder="Opisz serial dla użytkowników"
					v-model="serieData.description"
				/>
			</label>
			<label>
				Logo serialu
				<input type="file" id="file" @change="previewFiles($event)" ref="logo" />
			</label>
			<label>
				Wideo okładka serialu
				<input type="file" id="file" ref="background" />
			</label>
			<label>
				Widoczność
				<select>
					<option>Publiczny</option>
					<option>Niedostępny</option>
				</select>
			</label>
			<label>
				Status
				<select>
					<option>Zapowiedziany</option>
					<option>Trwający</option>
					<option>Zakończony</option>
				</select>
			</label>
		</form>
		<button @click="loadFromIMDB()">Załaduj odcinki z IMDB</button>
		<form v-on:submit.prevent class="serie-seasons">
			<ol class="serie-seasons__list">
				<li v-for="(season, i) in seasons" :key="i">
					<button>Sezon {{i}}</button>
				</li>
			</ol>
		</form>
		<div class="serie-episodes">
			<ol class="serie-episodes__list">
				<header class="serie-episodes__list__header serie-episodes__list--grid">
					<span>Tytuł</span>
					<span>Dostępność</span>
					<span>Data</span>
				</header>
				<li
					v-for="episode in serieData.getEpisodes(currentSeason)"
					:key="episode.episodeNumber"
					class="serie-episodes__list__episode serie-episodes__list--grid"
				>
					<span>{{episode.episodeNumber}}</span>
					<span>{{episode.name}}</span>
					<span>{{episode.available}}</span>
					<span>{{episode.releaseDate}}</span>
				</li>
			</ol>
			<Button>Dodaj nowy odcinek</Button>
		</div>
	</div>
</template>

<script>
import Button from "@/components/Forms/Buttons/Button";

import SeriesData from "@classes/SeriesData.js";
import EpisodeData from "../classes/EpisodeData.js";

import Axios from "axios";

export default {
	name: "AdminSeriesEdit",
	data: function() {
		return {
			serieData: new SeriesData(
				"The Mandalorian",
				"Samotny łowca głów przemierza najdalsze zakątki galaktyki, z dala od władzy Nowej Republiki.",
				false,
				require("@files/images/logos/theMandalorian.png"),
				require("@files/images/theMandalorian.mp4")
			),
			currentSeason: 1
		};
	},
	components: {
		Button
	},
	computed: {
		seasons() {
			return this.serieData.seasons;
		}
	},
	methods: {
		previewFiles: function(event) {
			console.log(event.target.files);
			this.test = URL.createObjectURL(event.target.files[0]);
		},
		loadFromIMDB: function() {
			Axios.get(
				`http://www.omdbapi.com/?apikey=27bf7fe6&t=${this.serieData.name}&r=json&type=series&Season=${this.currentSeason}`,
				{}
			).then((res, err) => {
				if (err) throw err;
				for (let imdbEpisode of res.data.Episodes) {
					let skipEpisode = false;
					for (let episode of this.serieData.getEpisodes(
						this.currentSeason
					)) {
						if (episode.episodeNumber === imdbEpisode.Episode) {
							skipEpisode = true;
							break;
						}
					}
					if (skipEpisode) continue;
					this.serieData.addEpisode(
						this.currentSeason,
						new EpisodeData(
							imdbEpisode.Title,
							this.currentSeason,
							imdbEpisode.Episode,
							false,
							imdbEpisode.Released
						)
					);
					this.$forceUpdate();
				}
			});
		}
	}
};
</script>


<style scoped lang="sass">
@import "@styles/variables"
.content

    .page-title
        display: flex
        flex-direction: row

    .series-cover
        height: 350px
        position: relative

        &__logo
            position: absolute
            padding: 24px 48px
            width: calc(100% - 2 * 48px)

            img
                max-width: 50%
                max-height: 36px
                opacity: 1

        &__description
            padding: 24px 48px
            position: absolute
            bottom: 0
            overflow: hidden
            cursor: default
            text-shadow: 2px 2px 10px black

        &__background   
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
                height: 100%
                width: 100%
            
    button
        margin-top: 8px

    .serie-seasons
        &__list
            list-style: none
            padding: 0
            li
                button


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
