<template>
    <div class="content">
        <ul class="sources-list">
            <li class="source-edit" v-for="(source, i) in sources" :key="i">
                <AdminSourceEdit :source="source"/>
            </li>
        </ul>
        <v-normal-button @click="addSource()">Dodaj nowe źródło</v-normal-button>
    </div>
</template>

<script>
import AdminSourceEdit from "@/components/AdminSource/AdminSourceEdit";

import NormalButton from "@/components/Forms/Buttons/NormalButton";

import SourceData from "@classes/SourceData.js";

import loadSourcesMixin from "@mixins/loadSources.js";

export default {
    name: "AdminSources",
    methods: {
        addSource() {
            this.sources.push(new SourceData({name: ""}));
        }
    },
    components: {
        "v-normal-button": NormalButton,
        AdminSourceEdit
    },
    mixins: [
        loadSourcesMixin
    ]
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
