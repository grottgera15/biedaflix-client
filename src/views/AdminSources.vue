<template>
    <div>
        <v-section-header>Źródła</v-section-header>
        <ul class="sources-list">
            <li class="source-edit" v-for="(source, i) in sources" :key="i">
                <v-source-edit :source="source"/>
            </li>
        </ul>
        <v-normal-button @click="addSource()">Dodaj nowe źródło</v-normal-button>
    </div>
</template>

<script>
import AdminSourceEdit from "@/components/AdminSource/AdminSourceEdit";
import AdminSectionHeader from "@/components/Admin/AdminSectionHeader";

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
        "v-section-header": AdminSectionHeader,
        "v-source-edit": AdminSourceEdit
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
