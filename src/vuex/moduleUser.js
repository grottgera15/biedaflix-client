import UserMutations from "./mutations/UserMutations";

import authResponses from "@/enums/authResponses";

const moduleAuth = {
    state: {
        user: undefined
    },
    getters: {
        user: function (state) {
            return state.user;
        },
        accessCheck: (state) => ({ operations }) => {
            if (!state.user)
                return authResponses.notLogged;
            if (!state.user.accepted)
                return authResponses.notAccepted;
            else if (operations.length === 0)
                return authResponses.granted;
            let operationsObject = new Object();
            for (let operation of operations) {
                operationsObject[operation] = false;
                for (let role of state.user.roles) {
                    if (role.operations[operation] === true) {
                        operationsObject[operation] = true;
                        break;
                    }
                }
            }
            return !(Object.values(operationsObject).includes(false, 0)) ? authResponses.granted : authResponses.noAuthority;
        }
    },
    mutations: {
        [UserMutations.SetUser]: function (state, refreshTokenFunction) {
            state.user = refreshTokenFunction;
        },
        [UserMutations.DeleteUser]: function (state) {
            state.user = undefined;
        },
    }
}

export default moduleAuth;