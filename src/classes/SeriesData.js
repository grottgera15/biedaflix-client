export default class SeriesData {
    constructor(name, description, onGoing, logoPath, bannerPath) {
        this.name = name;
        this.description = description;
        this.banner = {
            path: bannerPath
        };
        this.logo = {
            path: logoPath
        }
        this.onGoing = onGoing;
        this.seasons = {};
    }

    getBanner() {
        return this.banner.path;
    }

    getLogo() {
        return this.logo.path;
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
}