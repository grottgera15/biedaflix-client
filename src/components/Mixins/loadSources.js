import axios from "axios";
import SourceData from "@classes/SourceData";

export default {
    data: function() {
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
            .get("http://api.biedaflix.pl/streamingSource", {
                withCredentials: true
            })
            .then(res => {
                for (let source of res.data) {
                    this.sources.push(SourceData.CreateFromDatabase(source.id, source.name, source.resourcePath));
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
            for(let source of this.sources) {
                sources[source.id] = source.name;
            }
            return sources;
        }
    }
}