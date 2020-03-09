import axios from "axios";

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

    static loadSources() {
        return new Promise(resolve => {
            axios.get(`${process.env.VUE_APP_API_PATH}/streamingSources`, {
                withCredentials: true
            }).then (response => {
                let sources = [];
                response.data.forEach((source) => {
                    sources.push(new SourceData(source));
                });
                resolve(sources);
            }).catch(error => {
                throw error;
            });
        });
    }
}