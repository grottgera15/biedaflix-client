export default class SourceData {

    constructor({id, name, file, path}) {
        this.id = id;
        this.name = name;
        this.file = file;
        this.path = path;
    }

    get logo() {
        if (this.file instanceof File)
            return URL.createObjectURL(this.file);
        return this.path;
    }
}