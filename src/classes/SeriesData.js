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

    static async loadSeries({ seriesId, apiParams = { showSeasons: undefined } }) {
        const apiParamsPath = apiParams ? Api.paramsToPath(apiParams) : '';
        const response = await axios.get(`${process.env.VUE_APP_API_PATH}/series/${seriesId}?${apiParamsPath}`, {
            withCredentials: true
        });
        if (response.status === 200)
            return this.createSeriesFromJSON(response.data);
        else
            throw new Error(`Something went wrong on loading series ${seriesId}!`, response);
    }

    static async loadAllSeries({ apiParams = { showSeasons: undefined, status: undefined, sourceId: undefined } }) {
        const apiParamsPath = apiParams ? Api.paramsToPath(apiParams) : '';
        const response = await axios.get(`${process.env.VUE_APP_API_PATH}/series?${apiParamsPath}`, {
            withCredentials: true
        });
        if (response.status === 200) {
            const seriesList = []
            response.data.forEach(series => seriesList.push(this.createSeriesFromJSON(series)));
            return seriesList;
        } else
            throw new Error(`Something went wrong on loading all series!`, response);

    }

    static async saveSeries(form, seriesId = null ) {
        if (!seriesId)
            return await this._createSeries(form);
        else
            return await this._saveSeries(form, seriesId);
    }

    static async _createSeries(form) {
        const formData = new FormData(form);
        const response = await axios.post(`${process.env.VUE_APP_API_PATH}/series`, formData, {
            headers: {
                'content-type': 'multiplart/form-data'
            },
            withCredentials: true
        });
        if (response.status === 201)
            return this.createSeriesFromJSON(response.data);
        else
            throw new Error('Something went wrong on creating series!', response);
    }

    static async _saveSeries(form, seriesId) {
        const formData = new FormData(form);
        const response = await axios.patch(`${process.env.VUE_APP_API_PATH}/series/${seriesId}`, formData, {
            headers: {
                'content-type': 'multiplart/form-data'
            },
            withCredentials: true
        });
        if (response.status === 200)
            return this.createSeriesFromJSON(response.data);
        else
            throw new Error(`Something went wrong on updating series ${seriesId}!`, response);
    }

    static async deleteSeries(seriesId) {
        const response = await axios.delete(`${process.env.VUE_APP_API_PATH}/series/${seriesId}`, {
            withCredentials: true
        });
        if (response.status === 204)
            return true;
        else
            throw new Error(`Something went wrong on deleting series ${seriesId}`, response);
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

}