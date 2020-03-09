import axios from "axios";

export default class EpisodeData {
    constructor({name, seriesId, id, seasonNumber, episodeNumber, releaseDate, magnetLink, status, videoSources, subtitles, thumbs}) {
        this.name = name;
        this.id = id;
        this.seriesId = seriesId;
        this.seasonNumber = seasonNumber;
        this.episodeNumber = episodeNumber;
        this.releaseDate = releaseDate;
        this.subtitles = {};
        this.magnetLink = magnetLink;
        this.status = status;
        this.videoSources = videoSources;
        this.subtitles = subtitles;
        this.thumbs = thumbs;
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

    static loadEpisode({episodeId}) {
        return new Promise(resolve => {
            axios.get(`${process.env.VUE_APP_API_PATH}/episodes/${episodeId}`, {
                withCredentials: true
            }).then(response => {
                resolve(new EpisodeData(response.data));
            }).catch(error => {
                throw error;
            });
        })
    }

    static saveEpisode(episode) {
        return new Promise(resolve => {
            if (episode.id === undefined) {
                axios.post(`${process.env.VUE_APP_API_PATH}/episodes`, episode, {
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