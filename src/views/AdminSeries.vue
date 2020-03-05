<template>
    <div>
        <v-section-header>Seriale</v-section-header>
        <v-series-list :seriesData="seriesData" />
        <router-link :to="{path: 'adminSerie'}">
            <v-normal-button>Dodaj nowy serial</v-normal-button>
        </router-link>
    </div>
</template>

<script>
import AdminSeriesList from "@/components/AdminSeries/AdminSeriesList";
import AdminSectionHeader from "@/components/Admin/AdminSectionHeader";

import NormalButton from "@/components/Forms/Buttons/NormalButton";
import axios from "axios";

export default {
    name: "AdminSeries",
    mounted() {
        this.loadSeries();
    },
    data: function() {
        return {
            seriesData: []
        };
    },
    methods: {
        loadSeries() {
            axios
                .get(`${process.env.VUE_APP_API_PATH}/series`, {
                    withCredentials: true
                })
                .then(res => {
                    console.log(res.data);
                    this.seriesData = res.data;
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    components: {
        "v-normal-button": NormalButton,
        "v-series-list": AdminSeriesList,
        "v-section-header": AdminSectionHeader
    }
};
</script>


<style scoped lang="sass">
</style>
