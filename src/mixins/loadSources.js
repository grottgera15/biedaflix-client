import axios from "axios";
import SourceData from "@classes/SourceData";

export default {
    data: function () {
        return {
            sources: new Array()
        }
    },
    created() {
        this.loadSources();
    },
    methods: {
        loadSources() {
            axios
                .get(`${process.env.VUE_APP_API_PATH}/streamingSources`, {
                    withCredentials: true
                })
                .then(res => {
                    for (let source of res.data) {
                        this.sources.push(new SourceData({ id: source.id, name: source.name, path: source.path }));
                    }
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    computed: {
        sourcesSelectObject() {
            let sources = new Object();
            for (let source of this.sources) {
                sources[source.id] = source.name;
            }
            return sources;
        }
    }
}