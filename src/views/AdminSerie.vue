<template>
	<div class="content">
		<AdminSerieEdit 
			:serieData="serieData"
		/>
		<div class="page-title">
			<h2>Sezony i odcinki</h2>
			<div class="page-title__buttons-right">
				<v-small-button>Cofnij zmiany</v-small-button>
				<v-small-button>Zapisz</v-small-button>
			</div>
		</div>
		<v-small-button @click="loadFromIMDB()">Załaduj odcinki z IMDB</v-small-button>
		<form v-on:submit.prevent class="serie-seasons">
			<ol class="serie-seasons__list">
				<li v-for="(season, i) in seasons" :key="i">
					<v-small-button>Sezon {{i}}</v-small-button>
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
			<v-normal-button>Dodaj nowy odcinek</v-normal-button>
		</div>
	</div>
</template>

<script>
import AdminSerieEdit from "@/components/AdminSerie/AdminSerieEdit";

import NormalButton from "@/components/Forms/Buttons/NormalButton";
import SmallButton from "@/components/Forms/Buttons/SmallButton";

import SerieData from "@classes/SerieData.js";
import EpisodeData from "../classes/EpisodeData.js";

// import AdminTextInput from "@/components/Forms/Admin/AdminTextInput";
// import AdminFileInput from "@/components/Forms/Admin/AdminFileInput";
// import AdminTextArea from "@/components/Forms/Admin/AdminTextArea";
// import AdminSelect from "@/components/Forms/Admin/AdminSelect";

import loadSourcesMixin from "@mixins/loadSources.js";

import axios from "axios";

export default {
	name: "AdminSerie",
	data: function() {
		return {
			serieData: undefined,
			currentSeason: 0
		};
	},
	created() {
		if (this.$route.query.serie === undefined)
			this.serieData = new SerieData({});
	},
	mixins: [
		loadSourcesMixin
	],
	components: {
		"v-normal-button": NormalButton,
		"v-small-button": SmallButton,
		AdminSerieEdit
		// AdminTextInput,
		// AdminFileInput,
		// AdminTextArea,
		// AdminSelect
	},
	computed: {
		seasons() {
			return this.serieData.seasons;
		},
		nameValidation() {
			if (this.serieData.name.length <= 0)
				return false;
			return true;
		},
		descriptionValidation() {
			if (this.serieData.description.length <= 0) 
				return false;
			return true;
		}
	},
	methods: {
		previewFiles: function(event) {
			console.log(event.target.files);
			this.test = URL.createObjectURL(event.target.files[0]);
		},
		saveSerie: function() {
			let formData = new FormData();
			formData.append("name", this.serieData.name);
			formData.append("description", this.serieData.description);
			formData.append("sourceId", this.serieData.sourceId);
			formData.append("onGoing", true);
			formData.append("banner", this.serieData.bannerFile);
			formData.append("logo", this.serieData.logoFile);
			axios.post(`http://api.biedaflix.pl/series`, formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				},
				withCredentials: true
			}).then((res) => {
				console.log(res);
			}).catch((err) => {
				throw err;
			})
		},
		loadFromIMDB: function() {
			axios.get(
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
        align-items: center
        justify-content: space-between
        border-bottom: 1px solid white
        margin-bottom: 24px

        &__buttons-right
            button
                margin-left: 4px
            :last-child()
                margin-left: unset

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

</style>
