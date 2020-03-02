<template>
	<div class="content">
		<ul>
			<li>
				<div class="name">Mandalorian</div>
				<div class="episodes">8 / 8</div>
				<div class="status">Zakończony</div>
                <router-link to="AdminSeriesEdit"><button>Edytuj</button></router-link>
			</li>
			<li>
				<div class="name">What We Do in the Shadows</div>
				<div class="episodes">10 / 10</div>
				<div class="status">Zakończony</div>
                <button>Edytuj</button>
			</li>
            <li>
				<div class="name">Pennyworth</div>
				<div class="episodes">10 / 10</div>
				<div class="status">Zakończony</div>
                <button>Edytuj</button>
			</li>
            <li>
				<div class="name">Godfather of Harlem</div>
				<div class="episodes">10 / 10</div>
				<div class="status">Zakończony</div>
                <button>Edytuj</button>
			</li>
            <li>
				<div class="name">Star Trek: Picard</div>
				<div class="episodes">2 / 10</div>
				<div class="status">W trakcie</div>
                <button>Edytuj</button>
			</li>
			<li>
				<div class="name">Beastars</div>
				<div class="episodes">12 / 12</div>
				<div class="status">Zakończony</div>
                <button>Edytuj</button>
			</li>
			<li>
				<div class="name">Dorohedoro</div>
				<div class="episodes">8 / 12</div>
				<div class="status">W trakcie</div>
                <button>Edytuj</button>
			</li>
		</ul>
		<Button>Dodaj nowy serial</Button>
	</div>
</template>

<script>
import Button from "@/components/Forms/Buttons/Button";

export default {
	name: "AdminSeries",
	data: function() {
		return {
			user: {
				email: null
			}
		};
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
