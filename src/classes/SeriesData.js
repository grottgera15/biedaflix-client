export default class SeriesData {
    constructor(name, description, onGoing, logo, cover) {
        this.name = name;
        this.description = description;
        if (typeof (onGoing) !== "boolean")
            throw new TypeError("onGoing must by of type Boolean!");
        this.onGoing = onGoing;
        this.files = {};
        this.files['logo'] = logo;
        this.files['cover'] = cover;
    }
}