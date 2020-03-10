import axios from "axios";
import cookie from "js-cookie";
import jwt from "jsonwebtoken";

import store from "./store";
import UserMutations from "@vuexMutations/UserMutations";

async function login({ login, password }) {
    if (login === undefined || password === undefined)
        throw new ReferenceError("You need to provide login and password to login function!");
    axios.post(`${process.env.VUE_APP_API_PATH}/login`, { login, password }, {
        header: {
            'content-type': 'application/json'
        }, withCredentials: true
    }).then(() => {
        updateUser();
        auth();
        return true;
    }).catch(() => {
        return false;
    })
}

async function refreshToken() {
    axios.post(`${process.env.VUE_APP_API_PATH}/refreshToken`, {}, {
        withCredentials: true,
        validateStatus: ((status) => {
            return status >= 200 && status <= 401;
        })
    }).then(() => {
        updateUser();
        auth();
        return true;
    }).catch((error) => {
        Promise.reject(error);
        return false;
    });
}

async function auth() {
    if (!cookie.get('jwt_token') ||
        !cookie.get('jwt_token_expiry') ||
        new Date(cookie.get('jwt_token_expiry')) >= Date.now() - 6000) {
        return await refreshToken();
    } else {
        if (!store.getters.user)
            updateUser();
        setTimeout(async () => {
            await refreshToken();
        }, cookie.get('jwt_token_expiry') - Date.now() - 6000);
    }
    return true;
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