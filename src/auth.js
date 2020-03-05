import axios from "axios";
import cookie from "js-cookie";

async function login({ login, password }) {
    if (login === undefined || password === undefined)
        throw new ReferenceError("You need to provide login and password to login function!");
    axios.post(`http://api.biedaflix.pl/login`, JSON.stringify({ login, password }), {
        header: {
            'content-type': 'application/json'
        }, withCredentials: true
    }).then(response => {
        if (response.status === 200) {
            refreshToken();
        } else {
            return response.status;
        }
    }).catch(error => {
        console.error('Internal client error or network problems!', error);
        return error;
    })
}

async function auth() {
    axios.post(`http://api.biedaflix.pl/refreshToken`, {}, {
        withCredentials: true
    }).then(response => {
        if (response.status === 200) {
            refreshToken();
        } else {
            return response.status;
        }
    }).catch(error => {
        console.error('Internal client error or network problems!', error);
        return error;
    });
}

async function refreshToken() {
    if (!cookie.get('jwt_token') ||
        !cookie.get('jwt_token_expiry') ||
        new Date(cookie.get('jwt_token_expiry')) >= Date.now()) {
        auth();
    } else {
        setTimeout(async () => {
            auth();
        }, new Date(cookie.get('jwt_token_expiry')) - Date.now() - 6000);
    }
}

export default { login, auth }