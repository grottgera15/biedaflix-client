import axios from "axios";
import operationsEnum from "@/enums/operations";

export default class RoleData {
    constructor({ id, name, allowedOperations }) {
        this.id = id;
        this.name = name;
        this.operations = {};
        for (let operation in operationsEnum) {
            if (allowedOperations.indexOf(operation) != -1)
                this.operations[operation] = true;
            else
                this.operations[operation] = false;
        }
    }

    static loadRoles() {
        return new Promise((resolve => {
            axios.get(`${process.env.VUE_APP_API_PATH}/roles`, {
                withCredentials: true
            }).then(response => {
                let result = [];
                for (let role of response.data) {
                    result.push(new RoleData(role));
                }
                resolve(result);
            }).catch(error => {
                throw error;
            });
        }));
    }
}