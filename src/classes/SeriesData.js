import axios from "axios";
import Api from "@classes/Api";
import EpisodeData from "./EpisodeData";

export default class SeriesData {
    constructor({ id, name, description, banner = { file: undefined, path: undefined }, logo = { file: undefined, path: undefined }, sourceId, status }) {
        this.id = id;
        this.name = name;
        if (!this.name)
            this.name = ""
        this.description = description;
        if (!this.description)
            this.description = ""
        this.banner = banner;
        this.logo = logo;
        this.status = status;
        this.sourceId = sourceId;
        this.seasons = {};
    }


    addSeason(seasonNumber) {
        if (!this.seasons[seasonNumber])
            this.seasons[seasonNumber] = [];
        return false;
    }

    addEpisode(seasonNumber, episode) {
        if (!this.seasons[seasonNumber]) {
            this.addSeason(seasonNumber);
        }
        this.seasons[seasonNumber].push(new EpisodeData(episode));
        return true;
    }

    getEpisodes(seasonNumber) {
        if (this.seasons[seasonNumber])
            return this.seasons[seasonNumber];
        return [];
    }

    static loadSeries({seriesId, apiParams}) {
        return new Promise(resolve => {
            let apiParamsPath = apiParams ? Api.paramsToPath(apiParams) : ""
            axios.get(`${process.env.VUE_APP_API_PATH}/series/${seriesId}?${apiParamsPath}`, {
                withCredentials: true
            }).then(response => {
                resolve(this.createSeriesFromJSON(response.data));
            }).catch(error => {
                throw error;
            })
        })
    }

    static loadAllSeries({apiParams}) {
        return new Promise(resolve => {
            let apiParamsPath = apiParams ? Api.paramsToPath(apiParams) : ""
            axios.get(`${process.env.VUE_APP_API_PATH}/series?${apiParamsPath}`, {
                withCredentials: true
            }).then(response => {
                let seriesList = [];
                for (let series of response.data) {
                    seriesList.push(this.createSeriesFromJSON(series));
                }
                resolve(seriesList);
            })
        })
    }

    static createSeriesFromJSON(data) {
        let series = new SeriesData(data);
        for (let season in data.seasons) {
            series.addSeason(season);
            for (let episode of data.seasons[season]) {
                series.addEpisode(season, episode);
            }
        }
        return series; 
    }

    static saveSerie(serie) {
        return new Promise(resolve => {
            if (serie.id === undefined) {
                let formData = new FormData();
                formData.append("name", serie.name);
                formData.append("description", serie.description);
                formData.append("sourceId", serie.sourceId);
                formData.append("status", serie.status);
                formData.append("logo", serie.logo.file);
                formData.append("banner", serie.banner.file);
                axios.post(`${process.env.VUE_APP_API_PATH}/series`, formData, {
                    headers: {
                        "content-type": "multipart/form-data"
                    },
                    withCredentials: true
                }).then(response => {
                    resolve(response.data);
                }).catch(error => {
                    throw error;
                });
            }
        });
    }
}