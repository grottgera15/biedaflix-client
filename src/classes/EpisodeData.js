export default class EpisodeData {
    constructor(name, seasonNumber, episodeNumber, available, releaseDate) {
        this.name = name;
        this.episodeNumber = episodeNumber;
        this.seasonNumber = seasonNumber;
        this.available = available;
        this.releaseDate = releaseDate;
        this.subtitles = {};
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
}