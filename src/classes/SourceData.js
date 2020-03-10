import axios from "axios";

export default class SourceData {

    constructor({ id, name, logo = { file: undefined, path: undefined } }) {
        this.id = id;
        this.name = name;
        this.logo = logo;
    }

    static async loadSources() {
        const response = await axios.get(`${process.env.VUE_APP_API_PATH}/streamingSources`, {
            withCredentials: true
        });
        if (response.status === 200) {
            let sources = [];
            response.data.forEach((source) => {
                sources.push(new SourceData({ name: source.name, id: source.id, logo: { path: source.path } }));
            });
            return sources;
        } else
            throw new Error("Something went wrong on loading sources!", response);
    }

    static async saveSource(source) {
        if (!source.id)
            return await this._saveSource(source);
        else
            return await this._updateSource(source);
    }

    static async _saveSource(source) {
        let formData = new FormData();
        formData.append("name", source.name);
        formData.append("logo", source.logo.file);
        const response = await axios.post(`${process.env.VUE_APP_API_PATH}/streamingSources`, formData, {
            headers: { "content-type": "multipart/form-data" },
            withCredentials: true
        });
        if (response === 201)
            return new SourceData({ id: response.data.id, name: response.data.name, logo: { path: response.data.path } });
        else
            throw new Error("Something went wrong on creating source!", response);
    }

    static async _updateSource(source) {
        let formData = new FormData();
        formData.append("name", source.name);
        if (source.logo.file)
            formData.append("logo", source.logo.file);
        const response = await axios.patch(`${process.env.VUE_APP_API_PATH}/streamingSources/${source.id}`, formData, {
            headers: { "content-type": "multipart/form-data" },
            withCredentials: true
        });
        if (response === 200)
            return new SourceData({ id: response.data.id, name: response.data.name, logo: { path: response.data.path } });
        else
            throw new Error("Something went wrong on updating source!", response);
    }

    static async deleteSource(sourceId) {
        const response = axios.delete(`${process.env.VUE_APP_API_PATH}/streamingSources/${sourceId}`, {
            withCredentials: true
        });
        if (response === 204)
            return true;
        else if (response !== 400)
            throw new Error("Something went wrong on deleting source!", response);
    }
}