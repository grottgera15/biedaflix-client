export default class SourceData {
    
    constructor(name, logo) {
        this.id = undefined;
        this.name = name;
        this._logo = logo;
    }

    static CreateFromDatabase(id, name, logo) {
        let sourceData = new SourceData(name, logo);
        sourceData.id = id;
        return sourceData;
    }

    get logo() {
        if (this._logo instanceof File)
            return URL.createObjectURL(this._logo);
        return this._logo;
    }
}