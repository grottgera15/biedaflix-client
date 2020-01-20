import PlayerMutations from "./PlayerMutations.js";

const modulePlayer = {
    state: {
        duration: 0,
        currentTime: 0,
        newTime: 0,
        timeChangesQueue: [],
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