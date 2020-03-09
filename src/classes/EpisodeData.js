import axios from "axios";

export default class EpisodeData {
    constructor({name, seriesId, id, seasonNumber, episodeNumber, releaseDate, magnetLink}) {
        this.name = name;
        this.id = id;
        this.seriesId = seriesId;
        this.seasonNumber = seasonNumber;
        this.episodeNumber = episodeNumber;
        this.releaseDate = releaseDate;
        this.subtitles = {};
        this.magnetLink = magnetLink;
    }

    fullNumber () {
        return `S${this.seasonNumber}:O${this.episodeNumber}`;
    }
    
    addSubtitles(subtitles) {
        this.subtitles = { ...this.subtitles, ...subtitles};
    }

    containLanguage(language) { 
        if (Object.keys(this.subtitles).includes(language, 0))
            return true;
        return false;
    }

    static saveEpisode(episode) {
        return new Promise(resolve => {
            if (episode.id === undefined) {
                axios.post(`${process.env.VUE_APP_API_PATH}/episode`, episode, {
                    headers: {
                        "content-type": "application/json"
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