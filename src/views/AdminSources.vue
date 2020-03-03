<template>
    <div class="content">
        <ul class="sources-list">
            <li class="source-edit" v-for="(source, i) in sources" :key="i">
                <AdminSourceEdit :source="source"/>
            </li>
        </ul>
        <Button @click="addSource()">Dodaj nowe źródło</Button>
    </div>
</template>

<script>
import AdminSourceEdit from "@/components/AdminSource/AdminSourceEdit";

import Button from "@/components/Forms/Buttons/Button";
import axios from "axios";

import SourceData from "@classes/SourceData.js";

export default {
    name: "AdminSources",
    mounted() {
        this.loadSources();
    },
    data: function() {
        return {
            sources: []
        };
    },
    methods: {
        addSource() {
            this.sources.push(new SourceData("", undefined));
        },
        loadSources() {
            axios
                .get("http://api.biedaflix.pl/streamingSource", {
                    withCredentials: true
                })
                .then(res => {
                    console.log(res.data);
                    for (let source of res.data) {
                        this.sources.push(new SourceData(source.name, source.resourcePath));
                    }
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    components: {
        Button,
        AdminSourceEdit
    }
};
</script>


<style scoped lang="sass">
@import "@styles/variables"
.content

    .sources-list
        list-style: none
        margin: 0
        padding: 0


            


</style>
