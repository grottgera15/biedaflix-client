import axios from "axios";
import cookie from "js-cookie";
import jwt from "jsonwebtoken";

import store from "./store";
import UserMutations from "@vuexMutations/UserMutations";

async function login({ login, password }) {
    if (login === undefined || password === undefined)
        throw new ReferenceError("You need to provide login and password to login function!");

    const response = await axios.post(`${process.env.VUE_APP_API_PATH}/login`, { login, password }, {
        header: {
            'content-type': 'application/json'
        },
        withCredentials: true,
        validateStatus: function (status) {
            return status >= 200 && status <= 401;
        }
    });

    if (response.status === 200) {
        updateUser();
        startTokenRefreshment();
        return true;
    } else {
        return false;
    }
}

async function refreshToken() {
    const response = await axios.post(`${process.env.VUE_APP_API_PATH}/refreshToken`, {}, {
        withCredentials: true,
        validateStatus: function (status) {
            return status >= 200 && status <= 401;
        }
    });
    if (response.status === 200) {
        updateUser();
        startTokenRefreshment();
        return true;
    } else {
        return false;
    }
}

function startTokenRefreshment() {
    setTimeout(async () => {
        refreshToken();
    }, cookie.get('jwt_token_expiry') - Date.now() - 6000);
}

async function auth() {
    if (store.getters.user)
        return true;
    const result = await refreshToken();
    return result;
}

import UserData from "@classes/UserData";

function updateUser() {
    let token = cookie.get("jwt_token");
    if (!token)
        throw new ReferenceError();
    let user = new UserData(jwt.decode(token).user);
    store.commit(UserMutations.SetUser, user);
    return;
}

export default { login, auth }