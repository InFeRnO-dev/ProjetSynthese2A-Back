module.exports = class User {
    constructor(email, password, id_droits) {
        this.email = email
        this.password = password
        this.id_droits = id_droits
    }
}