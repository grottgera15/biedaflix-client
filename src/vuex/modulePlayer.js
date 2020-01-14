import PlayerMutations from "./PlayerMutations.js";

const modulePlayer = {
    state: {
        duration: 0,
        currentTime: 0,
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
        [PlayerMutations.BufferedSet]: function(state, buffered) {
            state.buffered = buffered;
        },
        [PlayerMutations.CurrentTimeSet]: function(state, currentTime) {
            state.currentTime = currentTime;
        },
        [PlayerMutations.PlayerStateSet]: function(state, isPlaying) {
            state.isPlaying = isPlaying;
        },
        [PlayerMutations.PendingSet]: function(state, isWaitingForBuffer) {
            state.isWaitingForBuffer = isWaitingForBuffer;
        }
        
    }
}

export default modulePlayer;