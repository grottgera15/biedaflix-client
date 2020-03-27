import axios from "axios";

export default class EpisodeData {
    constructor({ id, seasonNumber, episodeNumber, name, status, releaseDate, videoSources = {}, subtitles = {}, thumbs = [] }) {
        //Episode information
        this.id = id;
        this.seasonNumber = seasonNumber;
        this.episodeNumber = episodeNumber;
        this.name = name;
        this.status = status;
        this.releaseDate = new Date(releaseDate);

        //Episode files
        this.videoSources = videoSources;
        this.subtitles = subtitles;
        this.thumbs = thumbs;
    }

    fullNumber() {
        return `S${this.seasonNumber}:O${this.episodeNumber}`;
    }

    addSubtitles(subtitles) {
        this.subtitles = { ...this.subtitles, ...subtitles };
    }

    containLanguage(language) {
        if (Object.keys(this.subtitles).includes(language, 0))
            return true;
        return false;
    }

    static async saveEpisode(episodeData) {
        episodeData.releaseDate = new Date(episodeData.releaseDate).valueOf();
        if (!episodeData.id)
            this._createEpisode(episodeData);
        else
            this._saveEpisode(episodeData);
    }

    static async _createEpisode(episodeData) {
        const response = await axios.post(`${process.env.VUE_APP_API_PATH}/episodes`, episodeData, {
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true
        });
        if (response.status === 201)
            return new EpisodeData(response.data);
        else
            throw new Error('Something went wrong on creating new Episode!', response);
    }

    static async _saveEpisode(episodeData) {
        const response = await axios.patch(`${process.env.VUE_APP_API_PATH}/episodes/${episodeData.id}`, episodeData, {
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true
        });
        if (response.status === 200)
            return new EpisodeData(response.data);
        else
            throw new Error(`Something went wrong on saving Episode ${episodeData.id}!`, response);
    }


    static async saveSubtitles(episodeData) {
        let subtitlesFormData = new FormData();
        subtitlesFormData.append("language", "PL");
        subtitlesFormData.append("file", episodeData.subtitles["pl"]);
        const response = await axios.post(`${process.env.VUE_APP_API_PATH}/episodes/${episodeData.id}/subtitles`, subtitlesFormData, {
            headers: {
                "content-type": "multipart/form-data"
            },
            withCredentials: true
        });
        if (response.status === 201)
            return true;
        else
            return false;
    }

    static async loadEpisode(episodeId) {
        const response = await axios.get(`${process.env.VUE_APP_API_PATH}/episodes/${episodeId}`, {
            withCredentials: true
        });
        if (response.status === 200)
            return new EpisodeData(response.data);
    }

    static async deleteEpisode(episodeId) {
        const response = await axios.delete(`${process.env.VUE_APP_API_PATH}/episodes/${episodeId}`, {
            withCredentials: true
        });
        if (response.status === 204)
            return true;
        else
            throw new Error(`Something went wrong on deleting episode ${episodeId}!`, response);
    }
}