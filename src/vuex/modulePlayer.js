import PlayerMutations from "./PlayerMutations.js";

const modulePlayer = {
    state: {
        duration: 0,
        currentTime: 0,
        newTime: 0,
        volume: {
            main: 1,
            secondary: 0
        },
        isReady: false,
        isPlaying: false,
        isWaitingForBuffer: false,
        buffered: []
    },
    mutations: {
        [PlayerMutations.ReadinessSet]: function(state, isReady) {
            state.isReady = isReady;
        },
        [PlayerMutations.DurationSet]: function(state, duration) {
            state.duration = duration;
        },
        [PlayerMutations.CurrentTimeSet]: function(state, currentTime) {
            state.currentTime = currentTime;
        },
        [PlayerMutations.VolumeSet]: function(state, volume) {
            state.volume.main = volume;
        },
        [PlayerMutations.VolumeMute]: function(state) {
            if (state.volume.main > 0) {
                state.volume.secondary = state.volume.main;
                state.volume.main = 0;  
            } else {
                state.volume.main = state.volume.secondary;
                state.volume.secondary = 0;
            }
        },
        [PlayerMutations.BufferedSet]: function(state, buffered) {
            state.buffered = buffered;
        },
        [PlayerMutations.PlayerStateSet]: function(state, isPlaying) {
            state.isPlaying = isPlaying;
        },
        [PlayerMutations.PendingSet]: function(state, isWaitingForBuffer) {
            state.isWaitingForBuffer = isWaitingForBuffer;
        },
        [PlayerMutations.NewTimeSet]: function(state, newTime) {
            state.newTime = newTime;
        }
        
    }
}

export default modulePlayer;