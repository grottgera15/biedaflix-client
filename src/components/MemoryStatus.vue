<template>
	<div class="memory-status">
		<div class="bar">
			<div
				class="fill"
				:style="{
                width: (memory.taken/memory.maximum * 100) + '%'
            }"
			></div>
		</div>Obecny stan zajętej przestrzeni dyskowej {{memory.taken}}GB / {{memory.maximum}}GB.
	</div>
</template>

<script>
export default {
	name: "MemoryStatus",
	data() {
		return {
			memory: {
				maximum: 250,
				taken: 37.5
			}
		};
	}
};
</script>

<style lang="sass" scoped>
    @import "../styles/fonts.sass"
    @import "../styles/variables.sass"

    .memory-status
        grid-area: memory-status
        padding: 24px
        font-size: 8pt
        font-weight: 700
        letter-spacing: 0.5px
        cursor: default
        color: #ffffffa3
        text-transform: uppercase

        .bar
            margin-bottom: 4px
            background-color: #ffffffa3
            height: 4px
            width: 100%
            position: relative

            .fill
                background-color: $main-color
                position: absolute
                height: 4px
</style>