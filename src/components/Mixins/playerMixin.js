export default {
    methods: {
        // Time formatting
        TimeToPercentage: function (time) {
            return (time / this.duration) * 100;
        },
        PercentageToTime: function (percentage) {
            return percentage * this.duration;
        },
        TimeFormatted: function (time) {
            let minutesPart = Math.floor(time % 60);
            return (
                Math.floor(time / 60) +
                ":" +
                minutesPart.toLocaleString("en-US", { minimumIntegerDigits: 2 })
            );
        }
    },
    computed: {
        source: function () {
            return this.$store.state.app.currentSource;
        },
        isReady: function () {
            return this.$store.state.player.isReady;
        },
        isPlaying: function () {
            return this.$store.state.player.isPlaying;
        },
        isWaitingForBuffer: function () {
            return this.$store.state.player.isWaitingForBuffer;
        },
        currentTime: function () {
            return this.$store.state.player.currentTime;
        },
        duration: function () {
            return this.$store.state.player.duration;
        },
        buffered: function () {
            return this.$store.state.player.buffered;
        }
    }
}