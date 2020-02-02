export default class EpisodeData {
    constructor(name, seasonNumber, episodeNumber, releaseDate, available) {
        this.name = name;
        this.seasonNumber = seasonNumber;
        this.episodeNumber = episodeNumber;
        this.releaseDate = releaseDate;
        this.available = available;
    }

    fullNumber () {
        return `S${this.seasonNumber}:O${this.episodeNumber}`;
    }
}