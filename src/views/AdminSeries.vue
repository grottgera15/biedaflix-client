<template>
	<div class="content">
		<ul>
			<li>
				<div class="name">Mandalorian</div>
				<div class="episodes">8 / 8</div>
				<div class="status">Zakończony</div>
				<router-link to="AdminSeriesEdit">
					<button>Edytuj</button>
				</router-link>
			</li>
		</ul>
		<router-link :to="{path: 'adminSeriesEdit'}">
			<Button>Dodaj nowy serial</Button>
		</router-link>
	</div>
</template>

<script>
import Button from "@/components/Forms/Buttons/Button";
import axios from "axios";

export default {
	name: "AdminSeries",
	mounted() {
		this.loadSeries();
	},
	data: function() {
		return {};
	},
	methods: {
		loadSeries() {
			axios
				.get("http://api.biedaflix.pl/api/series", {
					withCredentials: true
				})
				.then(res => {
					console.log(res.data);
				})
				.catch(err => {
					throw err;
				});
		}
	},
	components: {
		Button
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
