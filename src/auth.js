import axios from "axios";
import cookie from "js-cookie";

async function login({ login, password }) {
    if (login === undefined || password === undefined)
        throw new ReferenceError("You need to provide login and password to login function!");
    axios.post(`${process.env.VUE_APP_API_PATH}/login`, { login, password }, {
        header: {
            'content-type': 'application/json'
        }, withCredentials: true
    }).then(response => {
        if (response.status === 200) {
            auth();
            return response.status;
        } else {
            return response.status;
        }
    }).catch(error => {
        console.error('Internal client error or network problems!', error);
        return error;
    })
}

async function refreshToken() {
    axios.post(`${process.env.VUE_APP_API_PATH}/refreshToken`, {}, {
        withCredentials: true
    }).then(response => {
        if (response.status === 200) {
            auth();
        } else {
            return response.status;
        }
    }).catch(error => {
        console.error('Internal client error or network problems!', error);
        return error;
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

export default { login, auth }