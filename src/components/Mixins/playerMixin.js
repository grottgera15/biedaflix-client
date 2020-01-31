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
            let secondsPart = Math.floor(time % 60);
            let minutesPart = Math.floor(time / 59);
            if (minutesPart > 59) {
                let hoursPart = Math.floor(minutesPart / 60);
                minutesPart = minutesPart - hoursPart * 60;
                return `${hoursPart}:${this.TimeDigits(minutesPart)}:${this.TimeDigits(secondsPart)}`;
            } else {
                return `${minutesPart}:${this.TimeDigits(secondsPart)}`;
            }
        },
        TimeDigits: function (time) {
            return time.toLocaleString("en-US", {minimumIntegerDigits: 2});
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
        volume: function() {
            return this.$store.state.player.volume.main;
        },
        duration: function () {
            return this.$store.state.player.duration;
        },
        buffered: function () {
            return this.$store.state.player.buffered;
        },
        newTime: function() {
            return this.$store.state.player.newTime;
        },
        settingsPopUp: function() {
            return this.$store.state.player.popups.settings;
        },
        fullscreen: function() {
            return this.$store.state.player.fullscreen;
        }
    }
}