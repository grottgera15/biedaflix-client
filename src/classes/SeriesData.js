export default class SeriesData {
    constructor(name, description, availability, status, logoPath, bannerPath) {
        this.name = name;
        this.description = description;
        this.banner = {
            file: undefined,
            path: bannerPath
        };
        this.logo = {
            file: undefined,
            path: logoPath
        }
        this.availability = availability;
        this.status = status;
        this.seasons = {};
    }

    setBanner(path) {
        this.banner.path = path;
    }

    getBanner() {
        if (this.banner.file instanceof File) 
            return URL.createObjectURL(this.banner.file);
        return this.banner.path;
    }

    setLogo(path) {
        this.logo.path = path;
    }

    getLogo() {
        if (this.logo.file instanceof File) 
            return URL.createObjectURL(this.logo.file);
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