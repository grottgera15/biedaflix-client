<template>
	<div class="content">
		<ul>
			<li 
				v-for="(serie, i) in series"
				:key="i"
			>
				<div class="name">{{serie.name}}</div>
				<div class="episodes">0 / 8</div>
				<div class="status">{{serie.onGoing}}</div>
				<router-link to="AdminSeriesEdit">
					<button>Edytuj</button>
				</router-link>
			</li> 
		</ul>
		<router-link :to="{path: 'adminSeriesEdit'}">
			<v-normal-button>Dodaj nowy serial</v-normal-button>
		</router-link>
	</div>
</template>

<script>
import NormalButton from "@/components/Forms/Buttons/NormalButton";
import axios from "axios";

export default {
	name: "AdminSeries",
	mounted() {
		this.loadSeries();
	},
	data: function() {
		return {
			series: undefined
		};
	},
	methods: {
		loadSeries() {
			axios
				.get("http://api.biedaflix.pl/series", {
					withCredentials: true
				})
				.then(res => {
					console.log(res.data);
					this.series = res.data;
				})
				.catch(err => {
					throw err;
				});
		}
	},
	components: {
		"v-normal-button": NormalButton
	}
};
</script>


<style scoped lang="sass">
@import "@styles/variables"
.content

    ul
        list-style: none
        margin: 0
        padding: 0

        li
            padding: 16px 24px
            display: flex
            font-size: 10pt
            font-weight: 300
            color: #ffffffa3
            vertical-align: middle
            align-items: center
            justify-content: space-between
            border-bottom: 1px solid #ffffff17

            .name
                display: block
                font-size: 14pt
                font-weight: 300
                color: #ffffffa3
                width: 35%

            .episodes, .status
                text-align: left
                width: 20%

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
            
    button
        margin-top: 8px


</style>
