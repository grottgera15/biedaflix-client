export default {
    computed: {
        source: function() {
			return this.$store.state.app.currentSource;
		},
		isReady: function() {
			return this.$store.state.player.isReady;
		},
		isPlaying: function() {
			return this.$store.state.player.isPlaying;
        },
        isWaitingForBuffer: function() {
            return this.$store.state.player.isWaitingForBuffer;
        },
		currentTime: function() {
			return this.$store.state.player.currentTime;
		}
    }
}