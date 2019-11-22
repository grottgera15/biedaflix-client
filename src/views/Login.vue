<template>
	<div id="app">
		<div id="wrapper">
			<div class="header">Zaloguj się</div>
            <form autocomplete="off">
			<div class="inputs">
				<div class="input">
					<label v-bind:class="[{'label-minimalized': labelsClicked['email']}]">Adres e-mail</label>
					<input type="Text" id="email" @focus="MinimalizeLabel"/>
				</div>
				<div class="input">
                    <label v-bind:class="[{'label-minimalized': labelsClicked['password']}]">Hasło</label>
					<input type="Password" id="password" @focus="MinimalizeLabel"/>
				</div>
                <button>
                    Zaloguj się
                </button>
			</div>
            </form>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
            labelsClicked: {
                "email": false,
                "password": false
            }
        };
	},
	methods: {
        MinimalizeLabel(event) {
            this.labelsClicked[event.target.id] = true;
            console.log(this.labelsClicked);
        }
    }
};
</script>


<style scoped lang="sass">

#app
    width: 100%
    height: 100%
    display: grid
    grid-template-columns: 1.5fr [main] 1fr 1.5fr
    @media screen and (max-width: 1600px)
        grid-template-columns: 1fr [main] 1fr 1fr
    @media screen and (max-width: 1200px)
        grid-template-columns: 0.5fr [main] 1fr 0.5fr
    @media screen and (max-width: 720px)
        grid-template-columns: [main] 1fr

#wrapper
    grid-column-start: main
    margin-top: 128px
    padding: 0 24px
    .header
        grid-column-start: name
        font-size: 18pt
        font-weight: 700
        padding: 16px 48px
        border-bottom: 1px solid #ffffff17  
    .inputs
        margin-top: 16px
        button
            letter-spacing: 0.5px
            font-weight: 700
            font-family: inherit
            width: 100%
            padding: 16px                
            border: 1px solid #f86356
            border-radius: 4px
            color: white
            background-color: #f86356
            cursor: pointer
            transition-duration: 0.5s
            &:hover
                box-shadow: 0 2px 10px #00000080
            &:focus
                outline: unset !important
        .input
            position: relative
            margin-bottom: 16px
            color: #ffffffa3
            font-family: inherit    
            label
                pointer-events: none
                position: absolute
                top: 50%
                transform: translateY(-50%)
                left: 24px
                font-size: 10pt
                font-weight: 500
                transition-duration: 0.2s
            .label-minimalized
                font-size: 8pt
                transform: unset
                top: 8px
                color: #f86356
            input
                letter-spacing: 0.5px
                font-weight: 700
                font-family: inherit
                width: calc(100% - 2*24px)
                background-color: #212121
                padding: 22px 24px 10px 24px
                border: 1px solid #ffffff17
                border-radius: 4px
                color: inherit
                transition-duration: 0.5s
                cursor: pointer
                &:focus
                    color: white
                    box-shadow: 0 2px 10px #00000080
                    outline: unset !important
                    cursor: unset !important

</style>
