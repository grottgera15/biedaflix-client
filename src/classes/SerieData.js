export default class SerieData {
    constructor({name, description, availability, status, logo, banner, sourceId}) {
        this.name = name;
        if (!this.name)
            this.name = ""
        this.description = description;
        if (!this.description)
            this.description = ""
        this._banner = banner;
        this._logo = logo;
        this.availability = availability;
        if (!this.availability)
            this.availability = "unavailable"
        this.status = status;
        if (!this.status)
            this.status = "ended"
        this.sourceId = sourceId;
        this.seasons = {};
    }

    get bannerFile() {
        if (this._banner instanceof File)
            return this._banner;
        return undefined;
    }

    get banner() {
        if (this._banner instanceof File)
            return URL.createObjectURL(this._banner);
        return this._banner;
    }

    set banner(value) {
        this._banner = value;
    }

    get logoFile() {
        if (this._logo instanceof File)
            return this._logo;
        return undefined;
    }

    get logo() {
        if (this._logo instanceof File) 
            return URL.createObjectURL(this._logo);
        return this._logo;
    }

    set logo(value) {
        this._logo = value;
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