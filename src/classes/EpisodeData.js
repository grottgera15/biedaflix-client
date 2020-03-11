import axios from "axios";

export default class EpisodeData {
    constructor({ id, seasonNumber, episodeNumber, name, status, releaseDate, videoSources, subtitles, thumbs }) {
        //Episode information
        this.id = id;
        this.seasonNumber = seasonNumber;
        this.episodeNumber = episodeNumber;
        this.name = name;
        this.status = status;
        this.releaseDate = releaseDate;

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

    static async saveEpisode(form, episodeId = null) {
        if (!episodeId)
            this._createEpisode(form);
        else
            this._saveEpisode(form, episodeId);
    }

    static async _createEpisode(form) {
        const response = await axios.post(`${process.env.VUE_APP_API_PATH}/episodes`, form, {
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

    static async _saveEpisode(form, episodeId) {
        const response = await axios.patch(`${process.env.VUE_APP_API_PATH}/episodes/${episodeId}`, form, {
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true
        });
        if (response.status === 200)
            return new EpisodeData(response.data);
        else
            throw new Error(`Something went wrong on saving Episode ${episodeId}!`, response);
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