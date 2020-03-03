export default class SourceData {
    constructor(name, logoPath) {
        this.id = undefined;
        this.name = name;
        this._logo = {
            file: undefined,
            path: logoPath
        }
    }

    get logo() {
        if (this._logo.file)
            return URL.createObjectURL(this._logo.file);
        return this._logo.path;
    }
}