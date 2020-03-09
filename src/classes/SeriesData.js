import axios from "axios";

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
        this.seasons[seasonNumber].push(episode);
        return true;
    }

    getEpisodes(seasonNumber) {
        if (this.seasons[seasonNumber])
            return this.seasons[seasonNumber];
        return [];
    }

    static loadSeries(seriesId, includeSeasons = false) {
        return new Promise(resolve => {
            axios.get(`${process.env.VUE_APP_API_PATH}/series?id=${seriesId}&showSeasons=${includeSeasons}`, {
                withCredentials: true
            }).then(response => {
                resolve(new SeriesData(response.data));
            }).catch(error => {
                throw error;
            })
        })
    }

    static saveSerie(serie) {
        return new Promise(resolve => {
            if (serie.id === undefined) {
                let formData = new FormData();
                formData.append("name", serie.name);
                formData.append("description", serie.description);
                formData.append("sourceId", serie.sourceId);
                formData.append("status", serie.status);
                formData.append("logo", serie._logo);
                formData.append("banner", serie._banner);
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