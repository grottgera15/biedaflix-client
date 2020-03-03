<template>
    <form v-on:submit.prevent>
        <AdminTextInput
            v-model="source.name"
            :label="`Nazwa`"
            :id="`name`"
            :placeholder="`Wpisz nazwę źródła`"
            :required="true"
            :validated="validateName(source.name)"
        />
        <br />
        <div class="source-edit__logo" v-show="source.logo != undefined">
            <img :src="source.logo" />
            <button @click="chooseFile()">Edytuj</button>
        </div>
        <div class="source-edit__upload" v-show="source.logo === undefined">
            <button @click="chooseFile()">Dodaj</button>
            <input
                type="file"
                ref="hiddenFileInput"
                @change="changeFile($event)"
            />
        </div>
        <button @click="save()">Zapisz</button>
    </form>
</template>

<script>
import SourceData from "@classes/SourceData.js";
import AdminTextInput from "@/components/Forms/Admin/AdminTextInput";

import axios from "axios";

export default {
    name: "AdminSourceEdit",
    props: {
        source: {
            type: SourceData,
            required: true
        }
    },
    components: {
        AdminTextInput
    },
    methods: {
        chooseFile() {
            this.$refs.hiddenFileInput.click();
        },
        changeFile(event) {
            if (event.target.files[0])
                this.source.file = event.target.files[0];
        },
        validateName(name) {
            if (name.length <= 0) return false;
            return true;
        },
        save() {
            let formData = new FormData();
            formData.append("name", this.source.name);
            formData.append("logo", this.source.file);
            axios.post("http://api.biedaflix.pl/streamingSource", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            }).then((res) => {
                console.log (res);
            }).catch((err) => {
                throw err;
            })
        }
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.source-edit
    padding: 16px 24px
    font-size: 10pt
    font-weight: 300
    color: #ffffffa3
    border-bottom: 2px solid #ffffff17

    &__logo
        height: 100px
        width: fit-content
        margin: auto
        position: relative

        img
            height: 100%
            text-align: center

        button
            position: absolute
            left: 4px
            bottom: 4px 

    &__upload
        input
            width: .1px
            height: .1px

    button
        font-size: inherit
        font-family: inherit
        color: white
        border: unset
        outline: none
        padding: 4px 16px        
        background-color: $main-color
        margin: 0
        text-transform: uppercase
        font-weight: 700
        font-size: 8pt
        cursor: pointer
</style>