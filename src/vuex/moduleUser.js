import UserMutations from "./mutations/UserMutations";

const moduleAuth = {
    state: {
        refreshToken: undefined
    },
    mutations: {
        [UserMutations.SetRefreshToken]: function(state, refreshTokenFunction) {
            state.refreshToken = refreshTokenFunction;
        },
        [UserMutations.CancelRefreshToken]: function(state) {
            state.refreshToken = undefined;
        }
    }
}

export default moduleAuth;