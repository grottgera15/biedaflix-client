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

import SourceData from "@classes/SourceData.js";

import loadSourcesMixin from "@mixins/loadSources.js";

export default {
    name: "AdminSources",
    methods: {
        addSource() {
            this.sources.push(new SourceData("", undefined));
        }
    },
    components: {
        Button,
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
