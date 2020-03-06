export default class UserData {
    constructor ({id, email, username, roles, accepted}) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.roles = roles;
        this.accepted = accepted;
    }
}