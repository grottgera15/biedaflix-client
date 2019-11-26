<template>
    <div
        class="video-wrapper"
        ref="wrapper"
        @mousemove="OnMouseMoved"
        :class="{'hide-cursor': !visualElements.visibility}"
    >
        <div class="waiting-screen" v-show="!this.info.canPlay" />
        <video
            preload="auto"
            name="media"
            kind="captions"
            ref="video"
            muted
            @timeupdate="OnTimeUpdated"
            @durationchange="OnDurationChanged"
            @canplay="OnCanPlay"
            @pause="OnPause"
            @play="OnPlay"
            @playing="OnPlaying"
            @waiting="OnWaiting"
            @click="OnVideoSingleClicked"
            :currentTime="info.currentTime"
            :class="{'video-buffering' : info.waiting}"
        >
            <source src="http://maksymilianlakomy.pl/SeeS01E01.mp4#t=200" type="video/mp4" />Your browser does not support the video tag.
        </video>
        <div
            class="subtitles-wrapper"
            :class="{'subtitles-wrapper-menu-visible': visualElements.visibility,
            'video-buffering': info.waiting}"
        >
            <p>
                Test test lorem ipsum
                <br />test test.
            </p>
        </div>
        <div class="menu-wrapper">
            <transition name="slide-bottom">
                <div class="menu" v-show="visualElements.visibility">
                    <div class="wrapper">
                        <div
                            class="progress-bar"
                            @mouseenter="visualElements.onBar = true"
                            @mouseleave="visualElements.onBar = false"
                            @mousemove="OnMouseOverBar"
                            @click="ChangeTime"
                        >
                            <div class="bar-mouse-over-popup" v-show="visualElements.onBar" :style="{'left': (TimeToPercentage(info.newTime) + '%')}" v-html="newTimeFormated"></div>
                            <div class="bar" :class="{'bar-full-size': visualElements.onBar}">
                                <div
                                    class="bar-buffered"
                                    v-for="(buffer, i) in info.buffered"
                                    :key="i"
                                    :style="{left: TimeToPercentage(buffer.start) + '%',
                                        right: (100-TimeToPercentage(buffer.end)) + '%'}"
                                />
                                <div
                                    class="bar-current-time"
                                    :style="{width: TimeToPercentage(info.currentTime) + '%'}"
                                />
                            </div>
                        </div>
                        <div class="buttons">
                            <div class="left">
                                <div
                                    class="button"
                                    @mouseover="OnMouseOverButton('playing')"
                                    @mouseleave="OnMouseLeftButton()"
                                >
                                    <img
                                        src="../files/menu/Start Button.svg"
                                        :class="{'img-hover': mouse.currentButton=='playing'}"
                                    />
                                </div>
                                <div
                                    class="button"
                                    @mouseover="OnMouseOverButton('audio')"
                                    @mouseleave="OnMouseLeftButton()"
                                >
                                    <img
                                        src="../files/menu/Audio Full Button.svg"
                                        :class="{'img-hover': mouse.currentButton=='audio'}"
                                    />
                                    <div
                                        class="audio-popup-wrapper"
                                        v-show="mouse.currentButton=='audio'"
                                    >
                                        <div class="bar-volume">
                                            <div class="bar-volume-fill" />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="current-time"
                                >{{currentTimeFormated}} / {{durationTimeFormated}}</div>
                            </div>
                            <div class="right">
                                <div
                                    class="button"
                                    @mouseover="OnMouseOverButton('subtitles')"
                                    @mouseleave="OnMouseLeftButton()"
                                >
                                    <img
                                        src="../files/menu/Subtitles Button.svg"
                                        :class="{'img-hover': mouse.currentButton=='subtitles'}"
                                    />

                                        <div
                                            class="subtitles-popup-wrapper"
                                            v-show="mouse.currentButton=='subtitles'"
                                        >
                                            <div class="subtitles-popup">Napisy</div>
                                        </div>
                                </div>
                                <div
                                    class="button"
                                    @mouseover="OnMouseOverButton('full-screen')"
                                    @mouseleave="OnMouseLeftButton()"
                                >
                                    <img
                                        src="../files/menu/Full Screen Button.svg"
                                        :class="{'img-hover': mouse.currentButton=='full-screen'}"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    name: "Player",
    data: function() {
        return {
            info: {
                duration: null,
                currentTime: null,
                newTime: null,
                canPlay: false,
                buffered: [],
                playing: false,
                waiting: false
            },
            visualElements: {
                visibility: false,
                onBar: false
            },
            mouse: {
                lastMovementTime: Date.now(),
                currentButton: null
            },
            subtitles: []
        };
    },
    methods: {
        OnCanPlay: function(event) {
            this.info.canPlay = true;
            event.srcElement.play();
        },
        OnPause: function() {
            this.info.playing = false;
        },
        OnPlay: function() {
            this.info.playing = true;
            this.info.waiting = false;
        },
        OnPlaying: function() {
            this.info.playing = true;
            this.info.waiting = false;
        },
        OnWaiting: function() {
            this.info.waiting = true;
        },
        OnDurationChanged: function(event) {
            this.info.duration = event.srcElement.duration;
        },
        OnMouseMoved: function() {
            this.mouse.lastMovementTime = Date.now();
        },
        OnTimeUpdated: function(event) {
            this.info.currentTime = event.srcElement.currentTime;
            this.CheckInactivity(event), this.CheckBuffered(event);
        },
        OnMouseOverBar: function(event) {
            let boundingClientRect = event.srcElement.getBoundingClientRect();
            let mousePositionPercentage =
                (event.clientX - boundingClientRect.left) /
                boundingClientRect.width;
            this.info.newTime = this.PercentageToTime(mousePositionPercentage);
        },
        OnMouseOverButton: function(buttonName) {
            this.mouse.currentButton = buttonName;
        },
        OnMouseLeftButton: function() {
            this.mouse.currentButton = null;
        },
        OnVideoSingleClicked: function(event) {
            if (this.info.playing) event.srcElement.pause();
            else event.srcElement.play();
        },
        ChangeTime: function() {
            this.$refs.video.currentTime = this.info.newTime;
        },
        CheckInactivity: function() {
            this.visualElements.visibility =
                Date.now() < this.mouse.lastMovementTime + 2 * 1000;
        },
        CheckBuffered: function(event) {
            let buffered = event.srcElement.buffered;
            let bufferedArray = [];
            for (let i = 0; i < buffered.length; i++) {
                bufferedArray.push({
                    start: buffered.start(i),
                    end: buffered.end(i)
                });
            }
            this.info.buffered = bufferedArray;
        },
        TimeToPercentage: function(time) {
            return (time / this.info.duration) * 100;
        },
        PercentageToTime: function(percentage) {
            return percentage * this.info.duration;
        }
    },
    computed: {
        currentTimeFormated: function() {
            let minutesPart = Math.floor(this.info.currentTime % 60);

            return (
                Math.floor(this.info.currentTime / 60) +
                ":" +
                minutesPart.toLocaleString("en-US", { minimumIntegerDigits: 2 })
            );
        },
        durationTimeFormated: function() {
            let minutesPart = Math.floor(this.info.duration % 60);

            return (
                Math.floor(this.info.duration / 60) +
                ":" +
                minutesPart.toLocaleString("en-US", { minimumIntegerDigits: 2 })
            );
        },
        newTimeFormated: function() {
            let minutesPart = Math.floor(this.info.newTime % 60);

            return (
                Math.floor(this.info.newTime / 60) +
                ":" +
                minutesPart.toLocaleString("en-US", { minimumIntegerDigits: 2 })
            );
        }
    }
};
</script>

<style scoped lang="sass">

.hide-cursor
    cursor: none

.video-wrapper
    position: relative
    overflow: hidden
    width: 100vw
    height: 100vh

    .waiting-screen
        position: absolute
        width: 100%
        height: 100%
        background-color: black
        z-index: 9999999999
        cursor: default

    video
        background-color: black
        margin: auto
        object-fit: contain
        width: 100%
        height: 100%

    .video-buffering
        opacity: 0.5
        transition-duration: 0.1s
        filter: blur(5px)

    .menu-wrapper
        position: absolute
        width: 100%
        bottom: 0
        left: 0
        .menu
            bottom: 0
            position: absolute
            width: calc(100% - 2*32px)
            height: 64px
            padding: 48px 32px
            background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)
            .wrapper
                .progress-bar
                    height: calc(4px + 2*12px)
                    width: 100%
                    cursor: pointer
                    position: relative
                    .bar
                        height: 4px
                        width: 100%
                        margin: 12px 0
                        background-color: #ffffff40
                        position: absolute
                        transition-duration: 0.15s
                        pointer-events: none
                        box-shadow: 0px 0px 8px black
                        .bar-buffered
                            height: inherit
                            position: absolute
                            background-color: #ffffff90
                        .bar-current-time
                            height: inherit
                            position: absolute
                            left: 0
                            background-color: #f86356
                    .bar-mouse-over-popup
                        position: absolute
                        bottom: 32px
                        opacity: 0.75
                        transform: translateX(-50%)
                        pointer-events: none
                    .bar-full-size
                        margin: 10px 0
                        height: 8px
                .buttons
                    display: grid
                    grid-template-columns: [left] 1fr [right] 1fr
                    height: 24px
                    padding: 8px 0
                    .left, 
                    .right
                        grid-column-start: left
                        grid-template-columns: repeat( auto-fit, minmax(24px, max-content) )
                        grid-column-gap: 16px
                        display: grid
                        align-items: center
                        .current-time
                            width: 100%
                            opacity: 0.75
                            font-size: 12pt
                        .button
                            height: 24px
                            position: relative
                            cursor: pointer
                            img 
                                position: absolute
                                transition-duration: 0.2s
                                opacity: 0.75
                                width: 24px
                            .img-hover
                                transform: scale(1.25)
                                opacity: 1
                    .right
                        justify-content: right
                        grid-column-start: right
                .audio-popup-wrapper
                    position: relative
                    bottom: 0
                    height: inherit
                    width: calc(75px + 24px + 16px)
                    overflow: hidden
                    .bar-volume
                        float: right
                        position: relative
                        width: 75px
                        height: 4px
                        background-color: #ffffff40
                        top: 50%
                        transform: translateY(-50%)
                        .bar-volume-fill
                            position: absolute
                            top: 0
                            left: 0
                            width: 50%
                            height: inherit
                            background-color: white
                .subtitles-popup-wrapper
                    position: absolute
                    bottom: 100%
                    width: auto
                    height: auto
                    padding-bottom: 16px
                    right: -100%
                    .subtitles-popup
                        position: relative
                        height: 150px
                        width: 100px
                        background-color: #151515
                        border-radius: 4px
                        padding: 16px 24px                    

    .subtitles-wrapper
        position: absolute
        bottom: 64px
        width: 100%
        text-align: center
        transition-duration: 0.5s
        pointer-events: none
        p
            font-family: 'Roboto Slab', serif
            font-size: 28pt
            letter-spacing: .5pt
            text-shadow: 0px 0px 4px black, 0px 0px 10px black
            cursor: unset
    .subtitles-wrapper-menu-visible
        bottom: 128px

.slide-bottom-enter-active, .slide-bottom-leave-active 
    transition-duration: 0.5s
    opacity: 1
    transform: TranslateY(0%)

.slide-bottom-enter, .slide-bottom-leave-to
    transition-duration: 0.5s
    opacity: 0
    transform: TranslateY(25%)


</style>
