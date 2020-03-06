import axios from "axios";
import cookie from "js-cookie";

import router from "./router";

import jwt from "jsonwebtoken";

import store from "./store";
import UserMutations from "@vuexMutations/UserMutations";

async function login({ login, password, successPath = '/' }) {
    if (login === undefined || password === undefined)
        throw new ReferenceError("You need to provide login and password to login function!");
    axios.post(`${process.env.VUE_APP_API_PATH}/login`, { login, password }, {
        header: {
            'content-type': 'application/json'
        }, withCredentials: true
    }).then(response => {
        updateUser();
        auth();
        router.push(successPath);
        return response.status;
    }).catch(error => {
        console.error('Internal client error or network problems!', error);
        return { error, status: error.status };
    })
}

async function refreshToken() {
    axios.post(`${process.env.VUE_APP_API_PATH}/refreshToken`, {}, {
        withCredentials: true
    }).then(response => {
        updateUser();
        auth();
        return response.status;
    }).catch(error => {
        console.error('Internal client error or network problems!', error);
        return { error, status: error.status };
    });
}

async function auth() {
    if (!cookie.get('jwt_token') ||
        !cookie.get('jwt_token_expiry') ||
        new Date(cookie.get('jwt_token_expiry')) >= Date.now() - 6000) {
        console.log("quick refresh");
        await refreshToken();
    } else {
        setTimeout(async () => {
            console.log("quick-refresh");
            await refreshToken();
        }, cookie.get('jwt_token_expiry') - Date.now() - 6000);
    }
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