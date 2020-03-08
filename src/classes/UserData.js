// import axios from "axios";

import RoleData from "@classes/RoleData";
import axios from "axios";

export default class UserData {
    constructor({ id, email, username, roles, accepted }) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.roles = [];
        for (let role of roles)
            this.roles.push(new RoleData(role));
        this.accepted = accepted;
    }

    removeRole(roleId) {
        this.roles = this.roles.filter(role => role.id != roleId);
    }

    get rolesId() {
        let roles = [];
        this.roles.forEach(role => roles.push(role.id))
        return roles;
    }

    static saveAdministrateUser(userData) {
        if (userData.id != undefined)
            return new Promise((resolve) => {
                axios.put(`${process.env.VUE_APP_API_PATH}/administrateUser?id=${userData.id}`, JSON.stringify({
                    accepted: userData.accepted,
                    roles: userData.rolesId
                }), {
                    headers: {
                        "content-type": "application/json"
                    }, withCredentials: true
                }).then(() => {
                    resolve(userData);
                }).catch(error => {
                    throw error;
                });
            });
    }

    static deleteUser(userData) {
        if (userData.id === undefined)
            return;
        return new Promise((resolve) => {
            axios.delete(`${process.env.VUE_APP_API_PATH}/administrateUser?id=${userData.id}`, {
                withCredentials: true
            }).then(() => {
                resolve(undefined);
            }).catch(error => {
                throw error;
            })
        });
    }

    // static loadUser({id}) {
    //     return new Promise((resolve) => {
    //         // axios.get(`${process.env.VUE_APP_API_PATH}/`)
    //         resolve();
    //     })
    // }
}